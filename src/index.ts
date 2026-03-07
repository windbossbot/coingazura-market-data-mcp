#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const MARKET_MOOD_URL =
  "https://coingazura-agent-endpoint.kimrla112.workers.dev/resources/market-mood-snapshot";
const YIELD_CANDIDATES_URL =
  "https://coingazura-agent-endpoint.kimrla112.workers.dev/resources/yield-candidates-latest";
const ALLOWED_HOST = "coingazura-agent-endpoint.kimrla112.workers.dev";

type MarketMoodOutput = {
  timestamp: string;
  resource: string;
  moodScore: number;
  classification: string;
  riskBias: string;
  actionHint: string;
  timeframe: string;
  inputs?: {
    fearGreedIndex?: number | null;
    btcDominancePct?: number | null;
    marketCapChange24hPct?: number | null;
  };
  note?: string;
};

type YieldCandidate = {
  chain: string;
  project: string;
  symbol: string;
  apy: number;
  apyBase: number | null;
  apyReward: number | null;
  tvlUsd: number;
  stableLike: boolean;
  riskNote: string;
  source: string;
  fetchedAt: string;
};

type YieldCandidatesOutput = {
  timestamp?: string;
  chain?: string | null;
  minApy?: number | null;
  minTvlUsd?: number | null;
  stableOnly: boolean;
  count: number;
  items: YieldCandidate[];
  requested?: {
    chain?: string | null;
    minApy?: number | null;
    minTvlUsd?: number | null;
    stableOnly?: boolean;
    maxItems?: number | null;
  };
};

type StableExitRiskOutput = {
  checkedSymbol: string;
  checkedChain?: string | null;
  exitRiskLevel: "low" | "medium" | "high";
  recommendation: string;
  riskReasons: string[];
  saferCandidates: Array<{
    project: string;
    symbol: string;
    chain: string;
    apy: number;
    tvlUsd: number;
    riskNote: string;
  }>;
  marketMood: {
    moodScore: number;
    classification: string;
    riskBias: string;
  };
};

const server = new McpServer({
  name: "coingazura-market-data-mcp-server",
  version: "0.1.1"
});

async function fetchJson<T>(baseUrl: string, params: Record<string, string>): Promise<T> {
  const url = new URL(baseUrl);
  if (url.hostname !== ALLOWED_HOST) {
    throw new Error(`Blocked outbound host: ${url.hostname}`);
  }
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    signal: AbortSignal.timeout(10_000),
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Resource fetch failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

function normalizeMarketMoodResponse(raw: any): MarketMoodOutput {
  return {
    timestamp: String(raw.timestamp ?? new Date().toISOString()),
    resource: String(raw.resource ?? "market_mood_snapshot"),
    moodScore: Number(raw.moodScore ?? 50),
    classification: String(raw.moodClassification ?? raw.classification ?? "neutral"),
    riskBias: String(raw.riskBias ?? "balanced"),
    actionHint: String(raw.actionHint ?? "wait for confirmation"),
    timeframe: String(raw.timeframe ?? "1d"),
    inputs: raw.inputs ?? undefined,
    note: raw.note ?? undefined
  };
}

function normalizeYieldCandidatesResponse(raw: any): YieldCandidatesOutput {
  return {
    timestamp: raw.timestamp ? String(raw.timestamp) : undefined,
    chain: raw.chain ? String(raw.chain) : undefined,
    minApy: raw.minApy == null ? undefined : Number(raw.minApy),
    minTvlUsd: raw.minTvlUsd == null ? undefined : Number(raw.minTvlUsd),
    stableOnly: Boolean(raw.stableOnly),
    count: Number(raw.count ?? 0),
    requested: raw.requested ?? undefined,
    items: Array.isArray(raw.items)
      ? raw.items.map((item: any) => ({
          chain: String(item.chain ?? ""),
          project: String(item.project ?? ""),
          symbol: String(item.symbol ?? ""),
          apy: Number(item.apy ?? 0),
          apyBase: item.apyBase == null ? null : Number(item.apyBase),
          apyReward: item.apyReward == null ? null : Number(item.apyReward),
          tvlUsd: Number(item.tvlUsd ?? 0),
          stableLike: Boolean(item.stableLike),
          riskNote: String(item.riskNote ?? ""),
          source: String(item.source ?? ""),
          fetchedAt: String(item.fetchedAt ?? "")
        }))
      : []
  };
}

function buildStableExitRisk(
  mood: MarketMoodOutput,
  candidates: YieldCandidatesOutput,
  stableSymbol: string,
  preferredChain?: string
): StableExitRiskOutput {
  const checkedSymbol = stableSymbol.toUpperCase();
  const riskReasons: string[] = [];

  const matching = candidates.items.filter((item) => item.symbol.toUpperCase().includes(checkedSymbol));
  const saferCandidates = candidates.items
    .filter((item) => item.stableLike)
    .filter((item) => (preferredChain ? item.chain.toLowerCase() === preferredChain.toLowerCase() : true))
    .filter((item) => item.tvlUsd >= 5_000_000)
    .filter((item) => item.apy <= 30)
    .slice(0, 3)
    .map((item) => ({
      project: item.project,
      symbol: item.symbol,
      chain: item.chain,
      apy: item.apy,
      tvlUsd: item.tvlUsd,
      riskNote: item.riskNote
    }));

  let exitRiskLevel: "low" | "medium" | "high" = "low";
  let recommendation = "hold with normal monitoring";

  if (mood.riskBias === "defensive" || mood.classification === "fear") {
    riskReasons.push("market mood is defensive");
    exitRiskLevel = "medium";
    recommendation = "reduce aggression and prefer safer parking options";
  }

  if (matching.some((item) => item.apy > 50)) {
    riskReasons.push("matching yield candidate has unusually high APY");
    exitRiskLevel = "high";
    recommendation = "consider partial exit or rotation into safer stable candidates";
  }

  if (matching.some((item) => item.tvlUsd < 5_000_000)) {
    riskReasons.push("matching yield candidate has relatively low TVL");
    exitRiskLevel = "high";
    recommendation = "avoid concentration and rotate only with stricter size control";
  }

  if (matching.some((item) => /reward token share high|low tvl/i.test(item.riskNote))) {
    riskReasons.push("risk note flags reward-token dependence or low liquidity");
    if (exitRiskLevel === "low") {
      exitRiskLevel = "medium";
      recommendation = "monitor closely and prefer cleaner stable venues";
    }
  }

  if (riskReasons.length === 0) {
    riskReasons.push("no immediate stress signal from current market mood or filtered yield snapshot");
  }

  return {
    checkedSymbol,
    checkedChain: preferredChain ?? null,
    exitRiskLevel,
    recommendation,
    riskReasons,
    saferCandidates,
    marketMood: {
      moodScore: mood.moodScore,
      classification: mood.classification,
      riskBias: mood.riskBias
    }
  };
}

server.registerTool(
  "coingazura_get_market_mood_snapshot",
  {
    title: "COINGAZURA Market Mood Snapshot",
    description:
      "Return a compact crypto market mood snapshot using fear-and-greed, BTC dominance, and market cap change inputs.",
    inputSchema: {
      fearGreedIndex: z.number().min(0).max(100).optional().describe("Optional 0-100 fear and greed score"),
      btcDominancePct: z.number().min(0).max(100).optional().describe("Optional BTC dominance percent"),
      marketCapChange24hPct: z.number().min(-100).max(100).optional().describe("Optional total market cap 24h percent change"),
      timeframe: z.string().optional().describe("Optional timeframe label such as 1d")
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false
    }
  },
  async ({ fearGreedIndex, btcDominancePct, marketCapChange24hPct, timeframe }) => {
    const raw = await fetchJson<any>(MARKET_MOOD_URL, {
      ...(fearGreedIndex == null ? {} : { fearGreedIndex: String(fearGreedIndex) }),
      ...(btcDominancePct == null ? {} : { btcDominancePct: String(btcDominancePct) }),
      ...(marketCapChange24hPct == null ? {} : { marketCapChange24hPct: String(marketCapChange24hPct) }),
      ...(timeframe ? { timeframe } : {})
    });
    const output = normalizeMarketMoodResponse(raw);
    return {
      content: [{ type: "text", text: JSON.stringify(output, null, 2) }],
      structuredContent: output
    };
  }
);

server.registerTool(
  "coingazura_get_yield_candidates",
  {
    title: "COINGAZURA Yield Candidates",
    description:
      "Return filtered stable/high-yield candidate rows with APY, chain, TVL, and risk note for quick parking scans.",
    inputSchema: {
      chain: z.string().optional().describe("Optional chain filter such as Base or Ethereum"),
      minApy: z.number().min(0).optional().describe("Optional minimum APY filter"),
      minTvlUsd: z.number().min(0).optional().describe("Optional minimum TVL filter"),
      stableOnly: z.boolean().optional().describe("Optional stable-only filter"),
      maxItems: z.number().int().min(1).max(10).optional().describe("Optional max rows to return")
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false
    }
  },
  async ({ chain, minApy, minTvlUsd, stableOnly, maxItems }) => {
    const raw = await fetchJson<any>(YIELD_CANDIDATES_URL, {
      ...(chain ? { chain } : {}),
      ...(minApy == null ? {} : { minApy: String(minApy) }),
      ...(minTvlUsd == null ? {} : { minTvlUsd: String(minTvlUsd) }),
      ...(stableOnly == null ? {} : { stableOnly: String(stableOnly) }),
      ...(maxItems == null ? {} : { maxItems: String(maxItems) })
    });
    const output = normalizeYieldCandidatesResponse(raw);
    return {
      content: [{ type: "text", text: JSON.stringify(output, null, 2) }],
      structuredContent: output
    };
  }
);

server.registerTool(
  "coingazura_get_stable_exit_risk",
  {
    title: "COINGAZURA Stable Exit Risk",
    description:
      "Return a compact stablecoin exit-risk read using live market mood and live yield candidate context.",
    inputSchema: {
      stableSymbol: z.string().min(2).describe("Stable symbol or symbol fragment such as USDC or USDT"),
      chain: z.string().optional().describe("Optional preferred chain such as Base or Ethereum"),
      minTvlUsd: z.number().min(0).optional().describe("Optional minimum TVL filter for candidate comparison"),
      maxItems: z.number().int().min(1).max(10).optional().describe("Optional max candidate rows to inspect")
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false
    }
  },
  async ({ stableSymbol, chain, minTvlUsd, maxItems }) => {
    const [moodRaw, yieldRaw] = await Promise.all([
      fetchJson<any>(MARKET_MOOD_URL, {}),
      fetchJson<any>(YIELD_CANDIDATES_URL, {
        stableOnly: "true",
        ...(chain ? { chain } : {}),
        ...(minTvlUsd == null ? {} : { minTvlUsd: String(minTvlUsd) }),
        ...(maxItems == null ? {} : { maxItems: String(maxItems) })
      })
    ]);

    const mood = normalizeMarketMoodResponse(moodRaw);
    const yields = normalizeYieldCandidatesResponse(yieldRaw);
    const output = buildStableExitRisk(mood, yields, stableSymbol, chain);

    return {
      content: [{ type: "text", text: JSON.stringify(output, null, 2) }],
      structuredContent: output
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

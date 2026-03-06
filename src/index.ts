import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

type MarketMoodOutput = {
  moodScore: number;
  classification: string;
  riskBias: string;
  actionHint: string;
  timeframe: string;
};

type YieldCandidate = {
  protocol: string;
  symbol: string;
  chain: string;
  apy: number;
  tvlUsd: number;
  riskNote: string;
  source: string;
};

const server = new McpServer({
  name: "coingazura-market-data-mcp-server",
  version: "0.1.0"
});

function deriveMarketMood(
  fearGreedIndex = 50,
  btcDominancePct = 55,
  marketCapChange24hPct = 0,
  timeframe = "1d"
): MarketMoodOutput {
  const momentumBias = marketCapChange24hPct >= 0 ? 5 : -5;
  const dominanceBias = btcDominancePct >= 58 ? -3 : btcDominancePct <= 50 ? 3 : 0;
  const moodScore = Math.max(0, Math.min(100, fearGreedIndex + momentumBias + dominanceBias));

  let classification = "neutral";
  let riskBias = "balanced";
  let actionHint = "wait for confirmation";

  if (moodScore >= 70) {
    classification = "greed";
    riskBias = "risk-on";
    actionHint = "watch for overheated continuation or fast pullback";
  } else if (moodScore <= 30) {
    classification = "fear";
    riskBias = "defensive";
    actionHint = "favor protection and look for selective mean-reversion only";
  } else if (moodScore >= 56) {
    classification = "constructive";
    riskBias = "measured risk-on";
    actionHint = "bias long only if structure and liquidity confirm";
  } else if (moodScore <= 44) {
    classification = "cautious";
    riskBias = "risk-off";
    actionHint = "reduce aggression and tighten invalidation";
  }

  return { moodScore, classification, riskBias, actionHint, timeframe };
}

function getMockYieldCandidates(
  chain?: string,
  minApy = 0,
  minTvlUsd = 0,
  stableOnly = false,
  maxItems = 5
): YieldCandidate[] {
  const candidates: YieldCandidate[] = [
    {
      protocol: "Aave",
      symbol: "USDC",
      chain: "Base",
      apy: 6.8,
      tvlUsd: 145000000,
      riskNote: "blue-chip lending venue, rate can compress quickly",
      source: "coingazura_yield_snapshot"
    },
    {
      protocol: "Morpho",
      symbol: "USDT",
      chain: "Ethereum",
      apy: 9.4,
      tvlUsd: 82000000,
      riskNote: "higher rate, strategy crowding risk",
      source: "coingazura_yield_snapshot"
    },
    {
      protocol: "Fluid",
      symbol: "USDC",
      chain: "Arbitrum",
      apy: 7.1,
      tvlUsd: 38000000,
      riskNote: "monitor liquidity migration and incentives",
      source: "coingazura_yield_snapshot"
    },
    {
      protocol: "Pendle",
      symbol: "sUSDe",
      chain: "Ethereum",
      apy: 14.2,
      tvlUsd: 61000000,
      riskNote: "non-stable strategy risk and basis sensitivity",
      source: "coingazura_yield_snapshot"
    }
  ];

  return candidates
    .filter((item) => !chain || item.chain.toLowerCase() === chain.toLowerCase())
    .filter((item) => item.apy >= minApy)
    .filter((item) => item.tvlUsd >= minTvlUsd)
    .filter((item) => !stableOnly || ["USDC", "USDT"].includes(item.symbol))
    .slice(0, maxItems);
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
    const output = deriveMarketMood(fearGreedIndex, btcDominancePct, marketCapChange24hPct, timeframe);
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
    const output = {
      count: 0,
      items: getMockYieldCandidates(chain, minApy, minTvlUsd, stableOnly, maxItems)
    };
    output.count = output.items.length;
    return {
      content: [{ type: "text", text: JSON.stringify(output, null, 2) }],
      structuredContent: output
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

# COINGAZURA Market Data MCP

<!-- mcp-name: io.github.windbossbot/coingazura-market-data -->

Read-only MCP server for COINGAZURA live crypto market mood, stable exit risk, and yield candidate snapshots.

## Tools

- `coingazura_get_market_mood_snapshot`
  - Returns a compact market mood read from the live COINGAZURA `market_mood_snapshot` resource.
- `coingazura_get_yield_candidates`
  - Returns filtered live yield candidates from the COINGAZURA `yield_candidates_latest` resource.
- `coingazura_get_stable_exit_risk`
  - Returns a compact stablecoin exit-risk read using live market mood and live yield candidate context.

## Why This Exists

This MCP is for quick risk-aware market reads, not broad exchange coverage.

It is designed for:

- deciding whether current mood is aggressive, neutral, or defensive
- checking if a stable/yield venue looks too hot or too thin
- giving an agent a compact crypto risk brief without wallet permissions

## Requirements

- Node.js 20+

## Install

```bash
npm install
```

## Run

```bash
npm run build
npm start
```

## Verification

```bash
npm run smoke:live
npm run visibility:check
```

These checks are the MCP version of the runtime smoke/visibility discipline used in other lanes:

- `smoke:live` confirms live resource endpoints respond with expected keys
- `visibility:check` confirms package and listing docs still expose the minimum release metadata

## Example Uses

Example prompts a client can ask:

- "Get the latest crypto market mood snapshot and tell me if the regime looks defensive."
- "Show up to 5 Base yield candidates above 5% APY with TVL filters."
- "Check stable exit risk for USDC on Base and suggest safer alternatives if needed."

Expected output style:

- compact JSON
- short risk language
- read-only recommendations only

## Update And Upload

Use the project release guide for repeatable edit, verify, git push, and npm publish steps:

- `UPDATE_AND_UPLOAD_GUIDE.md`

## Install With npx

```bash
npx -y coingazura-market-data-mcp
```

## Current Scope

- Read-only only
- No trading or wallet actions
- No authentication required for the initial local version
- Live fetch from COINGAZURA resource endpoints
- Fixed network targets only

## Quality Rule

- installs matter, but quality matters first
- new tools should not be added just to increase tool count
- every new tool must justify:
  - clear user value
  - narrow scope
  - low ambiguity
  - low trust / security drag
- if a tool feels broad, shallow, or weakly differentiated, keep it in draft instead of shipping it

## Security Notes

- No arbitrary URL fetches
- No wallet permissions
- No transaction execution
- Outbound requests are restricted to fixed COINGAZURA resource endpoints

## Data Sources

- `market_mood_snapshot`
- `yield_candidates_latest`

## Notes

This version uses live read-only COINGAZURA resource endpoints and is designed for local stdio MCP usage first.

## Registry Readiness

- npm package published and versioned
- stdio transport documented
- fixed outbound hosts only
- official MCP registry metadata prepared in `server.json`

## Cross-Lane Idea Exchange

Execution stays in this repo.

Reusable ideas are tracked separately in:

- `C:\Users\GWLin\workspace_shared_ideas`
- `C:\Users\GWLin\workspace_mcp\coingazura-market-data-mcp\CROSS_LANE_NOTES.md`

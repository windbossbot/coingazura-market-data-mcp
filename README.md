# COINGAZURA Market Data MCP

Read-only MCP server for COINGAZURA live crypto market mood, stable exit risk, and yield candidate snapshots.

## Tools

- `coingazura_get_market_mood_snapshot`
  - Returns a compact market mood read from the live COINGAZURA `market_mood_snapshot` resource.
- `coingazura_get_yield_candidates`
  - Returns filtered live yield candidates from the COINGAZURA `yield_candidates_latest` resource.
- `coingazura_get_stable_exit_risk`
  - Returns a compact stablecoin exit-risk read using live market mood and live yield candidate context.

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

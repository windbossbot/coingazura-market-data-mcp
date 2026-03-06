# COINGAZURA Market Data MCP

Read-only MCP server for crypto market mood and yield candidate snapshots.

## Tools

- `coingazura_get_market_mood_snapshot`
  - Returns a compact market mood read based on fear-and-greed, BTC dominance, and market cap change.
- `coingazura_get_yield_candidates`
  - Returns filtered stable/high-yield candidates with APY, chain, TVL, and risk notes.

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

## Current Scope

- Read-only only
- No trading or wallet actions
- No authentication required for the initial local version

## Data Sources

- COINGAZURA market mood snapshot
- COINGAZURA yield candidates snapshot

## Notes

This first version is intentionally narrow. It is designed for local stdio MCP usage and marketplace submission preparation.

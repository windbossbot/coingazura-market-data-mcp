# [MCP] Marketplace Field Map

Updated: 2026-03-11

Purpose:

- map marketplace form fields to the current best copy
- reduce inconsistent manual edits

## Source Of Truth

- `README.md`
- `LAUNCHGUIDE.md`
- `MCP_MARKETPLACE_COPY_20260311.md`

## Fields

### Name

COINGAZURA Market Data MCP

### Tagline

Read-only crypto risk snapshot MCP for market mood, yield scans, and stable exit checks

### Description

COINGAZURA Market Data MCP is a read-only MCP server for compact crypto risk checks.

It is built for users and agents that want a quick market read without trading permissions, wallet access, or broad exchange complexity.

Current tools:

- `coingazura_get_market_mood_snapshot`
- `coingazura_get_yield_candidates`
- `coingazura_get_stable_exit_risk`

Why trust it:

- live read-only resource-backed outputs
- compact JSON shaped for agent use
- fixed outbound host policy
- narrow first-install scope

### Category

Finance

### Pricing Model

Free

### Use Cases

crypto sentiment checks, market mood snapshot, yield candidate scan, stable parking scan, stable exit risk check, agent-safe risk brief

### Getting Started

"Get the latest crypto market mood snapshot and tell me if risk looks defensive."

"Show Base yield candidates above 5 APY with TVL filter."

"Check stable exit risk for USDC on Base and list safer candidates if needed."

### Tags

crypto, finance, market-data, yield, sentiment, read-only, risk, stablecoin, mcp

### Documentation URL

https://github.com/windbossbot/coingazura-market-data-mcp

### Version

0.1.6

### Changelog

Added registry-ready metadata, tightened listing copy, kept fixed-host read-only boundaries, and preserved live verification checks before release.

## Guardrails

- do not mention only two tools
- do not imply hosted endpoint exists yet
- do not imply trading, wallet, or portfolio execution

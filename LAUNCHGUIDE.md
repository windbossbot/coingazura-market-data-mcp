# COINGAZURA Market Data MCP Launch Guide

## Listing Details

- Name: COINGAZURA Market Data MCP
- Short Description: Read-only MCP server for live crypto market mood, stable exit risk, and yield candidate snapshots.
- Category: Finance
- Tags:
  - crypto
  - market-data
  - yield
  - sentiment
  - read-only
  - mcp

## What It Does

COINGAZURA Market Data MCP provides compact read-only tools for:

- crypto market mood snapshot
- fear and greed style sentiment read
- yield candidate snapshot
- stable parking scan inputs
- stable exit risk read

This server is intentionally narrow and safe for first-time MCP usage. It fetches live read-only COINGAZURA resource data, does not place trades, does not move funds, and does not require wallet permissions.

## Current Tools

### 1. coingazura_get_market_mood_snapshot

Returns a compact market mood read from the live COINGAZURA market mood resource using:

- fear and greed score
- BTC dominance
- market cap change
- timeframe label

Output includes:

- moodScore
- classification
- riskBias
- actionHint
- timeframe

### 2. coingazura_get_yield_candidates

Returns filtered live yield candidate rows with:

- project
- symbol
- chain
- APY
- TVL
- risk note
- source

### 3. coingazura_get_stable_exit_risk

Returns a compact stablecoin defense read with:

- exitRiskLevel
- recommendation
- riskReasons
- saferCandidates
- marketMood

## Setup Requirements

- Node.js 20 or later
- npm

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

## Run

```bash
npm start
```

## Install With npx

```bash
npx -y coingazura-market-data-mcp
```

## Transport

- stdio

## Security / Safety

- read-only only
- no wallet actions
- no order execution
- no token transfers
- no destructive tools

## Source

- GitHub: https://github.com/windbossbot/coingazura-market-data-mcp

## Recommended Audience

- traders who want a compact market mood read
- agents that need a simple crypto sentiment input
- users looking for stable/yield candidate snapshots

## Status

- live resource-backed local stdio version
- remote hosted endpoint not yet provided

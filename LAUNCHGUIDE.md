# COINGAZURA Market Data MCP Launch Guide

## Listing Details

- Name: COINGAZURA Market Data MCP
- Short Description: Read-only MCP server for crypto market mood and yield candidate snapshots.
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

This server is intentionally narrow and safe for first-time MCP usage. It does not place trades, move funds, or require wallet permissions.

## Current Tools

### 1. coingazura_get_market_mood_snapshot

Returns a compact market mood read from:

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

Returns filtered yield candidate rows with:

- protocol
- symbol
- chain
- APY
- TVL
- risk note
- source

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

- initial public scaffold
- local stdio version first
- remote hosted endpoint not yet provided

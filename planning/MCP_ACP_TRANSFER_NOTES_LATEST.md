# [MCP] ACP Transfer Notes (Latest)

Updated: 2026-03-15

## Purpose

- capture ACP-side operating patterns worth reusing in MCP planning
- avoid re-learning the same monetization and listing lessons
- keep lane boundaries clear by recording source references

## Source References

Referenced only, not edited here:

- `C:\Users\GWLin\workspace_coingazura\ACP_OPERATING_BRIEF.md`
- `C:\Users\GWLin\workspace_coingazura\OFFER_CHANGE_SYNC_CHECKLIST.md`
- `C:\Users\GWLin\workspace_coingazura\MARKET_RESEARCH_LATEST.md`
- `C:\Users\GWLin\workspace_coingazura\BACKGROUND_PROCESS_POLICY_LATEST.md`
- `C:\Users\GWLin\workspace_coingazura\BACKUP_RETENTION_POLICY_LATEST.md`

## Reusable ACP Patterns

### 1. Listing Sync Discipline

Before any public wording or pricing change:

- check live listing state
- check profile/listing wording drift
- verify runtime or delivery status before claiming readiness

### 2. Market Scan Before Pricing

Before paid conversion:

- compare competing offers and positioning
- confirm the product has a front-door value users can understand quickly
- avoid vague premium language with no delivery boundary

### 3. Runtime Status Before Claims

ACP operations treat runtime status as proof before making live claims.

MCP equivalent:

- `npm run release:check`
- npm/GitHub/marketplace version alignment
- no stale server metadata

### 4. Backup / Retention Before High-Impact Changes

ACP keeps backup thinking before editing live offerings.

MCP equivalent:

- preserve current canonical docs
- consolidate same-purpose notes before adding more
- avoid random new draft files when a current latest file already exists

## Current MCP Constraint

- ACP CLI was not available in the current MCP shell (`acp` command not found)
- because of lane boundary and environment constraint, ACP learnings were imported as operating notes only
- actual ACP runtime or seller changes should stay in the VIRTUAL lane unless `CENTRAL` directs otherwise

## Candidate Future ACP Handoff From MCP

- market mood brief as a paid ACP deliverable
- stable exit risk brief as a paid ACP deliverable
- yield candidate safety filter as a paid ACP deliverable
- premium compact risk brief bundle using MCP logic as source

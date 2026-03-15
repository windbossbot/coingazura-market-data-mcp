# [MCP] Operating Rules (Latest)

Updated: 2026-03-15

## Purpose

- consolidate current lane identity, action, feedback, receipt, reply, and `CENTRAL` update rules
- replace older one-off rule notes that are now absorbed

## Session Identity

- this session owns `MCP`
- start important replies with `[MCP]`
- follow the current active order from `CENTRAL`
- user direct instructions override standing rules immediately

## First Priority

- security first
- lane boundary first
- command propagation first
- documentation and storage normalization before deeper cleanup

## Before Work

- check repo state risk
- check README / launch / package guidance for unsafe instructions
- check config and secret-handling risk
- check whether unnecessary background work is still running

## Lane Boundary

- do not cross-edit another lane by default
- copy only minimum reference material when needed
- route file unification or cross-lane consolidation through `CENTRAL`

## Required Actions In This Lane

- run security and code/doc checks before release-sensitive work
- keep active operating docs current
- keep planning notes under `planning\`
- report blockers, cleanup candidates, and merge candidates when they matter

## Receipt And Reply Rule

- receipt means the order was read and left a visible trace
- if MCP touched files after reading the order, write the reply now
- do not stop at receipt only
- do not leave the reply template blank

## Documentation Pass Rule

- absorb still-valid older rules into canonical docs
- prefer a current latest file over creating another same-purpose note
- if a newer canonical doc exists, remove or replace the old one

## Minimum CENTRAL Update Format

- `[MCP]`
- following current order from `CENTRAL`
- orders read: yes/no
- can proceed: yes/no
- blocker or none:
- security issues:
- code/doc issues:
- organize result:
- remove candidates:
- archive candidates:
- merge candidates:
- next 1 to 3 actions:

## Report To CENTRAL When

- launch / README guidance could affect another lane
- repo state blocks release or handoff
- security concern appears in docs, config, or code flow
- a cross-lane decision or reprioritization is needed

## Open Before CENTRAL Reporting

- `C:\Users\GWLin\workspace_4lane_hub\MCP\README.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\LAUNCHGUIDE.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\CROSS_LANE_NOTES.md`

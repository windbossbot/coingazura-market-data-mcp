# MCP -> CENTRAL Update Rule

Updated: 2026-03-11

## Purpose

- `MCP` owns server code and documentation work.
- `CENTRAL` owns priority, dependency, security watch, and next-step decisions.
- `MCP` should describe work as following the current main order from `CENTRAL`.

## Session Identification Rule

- start important replies with `[MCP]`
- state clearly that this session owns `MCP`

## Current Main Order

- first order is `security first`
- treat repo state, launch docs, and cross-lane execution guidance as security-sensitive
- if the user gives a direct instruction, follow it first even if it overrides the standing order

## Report To CENTRAL When

- before changing launch or README guidance that affects another lane
- after repo state changes in a way that blocks release or handoff
- when uncommitted work needs prioritization
- when a security concern appears in docs, config, or code flow
- before starting a new cross-lane task
- at end of session with next 1 to 3 actions

## Send The Update Here

- `C:\Users\GWLin\workspace_4lane_hub\CENTRAL`

## Minimum Update Format

- current state in 3 lines
- exact files checked
- blocker or dependency
- next 1 to 3 actions

## Open First Before Reporting

- `C:\Users\GWLin\workspace_4lane_hub\MCP\README.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\LAUNCHGUIDE.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\CROSS_LANE_NOTES.md`

## If A Request Is Needed

- ask `CENTRAL` for decision, security review, or missing dependency handling
- if the request needs evidence, create or update a note in `C:\Users\GWLin\workspace_4lane_hub\CENTRAL`
- if reprioritization or a new order is needed, raise an order request to `CENTRAL`

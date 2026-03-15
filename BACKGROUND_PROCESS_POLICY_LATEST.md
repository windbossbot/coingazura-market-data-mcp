# [MCP] Background Process Policy

Updated: 2026-03-14

## Always Keep

- no persistent MCP background worker is required by default
- keep only the user-intended MCP runtime session if it was launched on purpose

## Stop After Task

- temporary `pwsh.exe` or `powershell.exe` launched only for one inspection
- one-shot `npm run` checks used only for validation
- duplicate debug launches of:
  - `node dist/index.js`
  - `tsx src/index.ts`

## Do Not Stop Blindly

- blank-command `pwsh.exe` with unknown origin
- user-started consoles
- any process not clearly launched by the current MCP task

## End-Of-Task Rule

1. inspect process command lines first
2. stop only processes whose command line clearly matches this repo
3. leave unknown background processes alone and report them instead

## Current Status

- no MCP-specific scheduled task found
- no persistent MCP service process was required or left behind during the latest check

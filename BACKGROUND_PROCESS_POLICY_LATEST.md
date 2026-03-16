# [MCP] Background Process Policy

Updated: 2026-03-16

## Pre-Run Cleanup Rule

- before re-running the same script, check whether the same script path is already alive
- before using a local port, check whether that port is already bound
- propose targeted cleanup first, not blind cleanup

Suggested Windows commands:

```powershell
Get-CimInstance Win32_Process |
  Where-Object { $_.CommandLine -match 'workspace_4lane_hub\\MCP' -and $_.CommandLine -match 'dist\\index.js|src\\index.ts' } |
  Select-Object ProcessId, Name, CommandLine
```

```powershell
Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -eq 3000 } |
  Select-Object LocalAddress, LocalPort, OwningProcess
```

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
3. keep local servers or dashboards alive if the user still needs to inspect them
4. if a process is intentionally kept alive, report PID and manual stop command
5. leave unknown background processes alone and report them instead

## Kill Rule

- do not propose blind cleanup
- pre-kill is allowed only for:
  - the exact same MCP script path being relaunched
  - a clearly duplicated temporary process from the current task
- do not kill:
  - unknown shells
  - user-started consoles
  - unknown `node.exe`
  - processes without a clear link to the current MCP task

## Temp Cleanup Rule

- one-shot temp logs or cache files should be deleted after the task when safe
- canonical `LATEST` files and intended release artifacts should be preserved

## Current Status

- no MCP-specific scheduled task found
- no persistent MCP service process was required or left behind during the latest check

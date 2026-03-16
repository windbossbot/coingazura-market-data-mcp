# [MCP] Operating Brief

## Canonical Paths

- Workspace root: `C:\Users\GWLin\workspace_4lane_hub\MCP`
- Entry source: `C:\Users\GWLin\workspace_4lane_hub\MCP\src\index.ts`
- Built server: `C:\Users\GWLin\workspace_4lane_hub\MCP\dist\index.js`

## Quick Commands

- build:
  - `npm run build`
- release check:
  - `npm run release:check`
- local start:
  - `npm start`
- visibility only:
  - `npm run visibility:check`

## Pre-Run Cleanup Commands

Use these before relaunching the same script or checking a local port.

Find same-script processes:

```powershell
Get-CimInstance Win32_Process |
  Where-Object { $_.CommandLine -match 'workspace_4lane_hub\\MCP' -and $_.CommandLine -match 'dist\\index.js|src\\index.ts' } |
  Select-Object ProcessId, Name, CommandLine
```

Find a port owner:

```powershell
Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -eq 3000 } |
  Select-Object LocalAddress, LocalPort, OwningProcess
```

Targeted stop after confirming it is the exact MCP task process:

```powershell
taskkill /PID <pid> /F
```

## Keep-Alive Rule

- one-shot checks should end immediately
- keep a local server alive only if the user still needs to inspect it
- if left running, report PID and manual stop command in the final note

## Release References

- `C:\Users\GWLin\workspace_4lane_hub\MCP\RELEASE_CHECKLIST_LATEST.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\UPDATE_AND_UPLOAD_GUIDE.md`
- local-only publish auth note stays untracked

# [MCP] Internal File Scope Audit

Updated: 2026-03-14

## Summary

- root should hold publishable files and active operating files
- `planning\` should hold internal proposals, drafts, and checklists
- no active MCP runtime helper script was found that should be removed now

## Keep In Root

- `README.md`
- `LAUNCHGUIDE.md`
- `SECURITY.md`
- `package.json`
- `package-lock.json`
- `server.json`
- active order / receipt / reply files
- latest operating policy files

## Keep In Planning

- marketplace copy drafts
- paid readiness drafts
- score-raise backlog
- current internal checklist
- planning archive

## Out Of Scope But Needed

- `node_modules`
- `dist`
- `.gitignore`
- `.npmignore`
- `LICENSE`
- `tsconfig.json`

## No Immediate Broken Root References

- current root/read-first references resolve after latest normalization pass

## Recommended Next Pass

1. decide which root operating files should remain local-only vs committed
2. keep planning file creation under `planning\`
3. if another same-purpose latest file appears, consolidate before adding more

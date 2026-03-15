# [MCP] Release Checklist (Latest)

Updated: 2026-03-15

## Purpose

- provide one repeatable release checklist for code, docs, security, and publish work
- prevent drift between local fixes, public docs, npm, and marketplace state
- make upload work predictable instead of memory-based

## 1. Scope Check

- change belongs to `MCP` lane only
- user request is reflected in the planned release scope
- no unrelated files are included

## 2. Security Check

- read-only scope still explicit
- no wallet, signing, transfer, or exchange execution added
- no arbitrary URL fetch added
- fixed outbound host rule still intact
- no token, key, or auth value appears in tracked files
- public docs do not expose internal-only operator procedures
- `npm audit --json` returns 0 vulnerabilities

## 3. Version And Metadata Check

- `package.json` version is correct
- `server.json` version matches `package.json`
- `src/index.ts` server version matches `package.json`
- GitHub, npm, and marketplace wording do not drift from actual scope

## 4. Docs Check

- `README.md` matches current tool count and scope
- `LAUNCHGUIDE.md` matches current tool count and scope
- security wording does not overclaim or understate risk
- hosted endpoint is not implied if unavailable
- paid wording is not used before support/hosted boundary is real

## 5. Verification Check

- `npm run release:check` passes
- live smoke check passes
- visibility check passes
- expected npm pack output is clean

## 6. File Hygiene Check

- active operating docs stay in root only when they are truly current
- planning-only notes stay under `planning/`
- same-purpose files are consolidated instead of duplicated
- stale draft/backlog docs are deleted or archived intentionally
- local-only operator notes stay local-only and untracked

## 7. Background Check

- no unnecessary MCP runtime or helper process is left running
- no temporary publish or debug process is left without purpose

## 8. Publish Check

- local auth state is valid
- package version is newer than current npm version
- local-only publish auth note is available if needed
- `.npmrc` is not tracked

## 9. Post-Release Check

- push completed
- npm publish completed if intended
- resulting npm version matches release target
- registry/marketplace follow-up is noted if needed

## Stop Conditions

Do not release if any of these are true:

- version drift remains
- security wording or auth handling is exposed in tracked docs
- public copy implies features not actually available
- release checks fail
- package contents contain unrelated or accidental files

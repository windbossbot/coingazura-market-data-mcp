# [MCP] Documentation System Policy (Latest)

Updated: 2026-03-15

## Purpose

- define where MCP documents belong
- reduce clutter in the repo root
- document when to consolidate, archive, or delete notes

## Root Should Hold

- publishable project files
- active operating policy files
- current read-first / canonical control files
- current receipt / reply file

Examples:

- `README.md`
- `LAUNCHGUIDE.md`
- `SECURITY.md`
- `package.json`
- `package-lock.json`
- `server.json`
- `START_HERE_MCP.md`
- `MCP_OPERATING_RULES_LATEST.md`
- `MCP_REPLY_WITH_TIME_20260311.md`
- `*_LATEST.md` active policy files

## Planning Should Hold

- marketplace copy drafts
- growth and monetization research
- ACP transfer notes
- internal indexes
- future-facing product or pricing drafts

## Local-Only Should Hold

- machine auth notes
- local token recovery notes
- anything that exposes operator-only steps

These should stay untracked.

## Consolidation Rule

- if two files serve the same current purpose, keep one canonical file
- if an older note is fully absorbed into a current latest file, delete the old note
- if historical context is still useful, archive it instead of keeping it as current

## Delete Rule

Delete when all are true:

- the file is fully absorbed elsewhere
- no current read-first file points to it
- it no longer contains unique operating value

## Archive Rule

Archive instead of delete when:

- the file has historical reasoning still worth keeping
- the content may be useful for later comparison
- removal is not clearly safe

## Current MCP Decision

- one-off rule notes that were absorbed into `MCP_OPERATING_RULES_LATEST.md` can be removed
- root should keep current policies and current canonical docs only
- planning should stay small and current

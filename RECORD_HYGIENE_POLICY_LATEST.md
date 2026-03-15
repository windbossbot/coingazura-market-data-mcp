# [MCP] Record Hygiene Policy

Updated: 2026-03-14

## Purpose

- keep current operating files easy to find
- prevent planning notes from cluttering the publishable root
- archive or remove old internal records only after explicit review

## Canonical Current

- `README.md`
- `LAUNCHGUIDE.md`
- `SECURITY.md`
- `package.json`
- `server.json`
- active order / receipt / reply files
- `planning\CHECKLIST_MCP_QUALITY_CURRENT.md`

## Planning Files

- drafts and proposals belong under `planning\`
- historical snapshots belong under `planning\archive\`

## Removal Rule

1. do not remove active order files blindly
2. do not remove publishable root files without checking references first
3. remove or archive only named internal snapshots after a replacement exists

## Current Example

- old `CHECKLIST_MCP_QUALITY_20260307.md` was removed after replacement by `planning\CHECKLIST_MCP_QUALITY_CURRENT.md`

## Review Trigger

- after large documentation changes
- after score-raise planning sessions
- before committing internal doc reorganizations

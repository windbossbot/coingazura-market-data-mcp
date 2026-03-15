# COINGAZURA Market Data MCP Update And Upload Guide

This guide is the default flow for making changes and uploading them safely.

Always run together with:

- `C:\Users\GWLin\workspace_4lane_hub\MCP\RELEASE_CHECKLIST_LATEST.md`

## 1. Edit

Change only the files needed for the update.

Common targets:

- `src/index.ts`
- `README.md`
- `LAUNCHGUIDE.md`
- `SECURITY.md`
- `server.json`
- `package.json`

## 2. Verify Locally

Run from the MCP project root:

```bash
npm run build
npm run release:check
```

What this does:

- confirms TypeScript build passes
- confirms the npm package can be packed cleanly
- confirms live checks still pass before a release

If you only changed docs, still run `npm run release:check` before upload.

## 3. Check What Changed

```bash
git status --short
git diff
```

Make sure only intended files changed.

Before a release, confirm version alignment across:

- `package.json`
- `server.json`
- `src/index.ts`

Then walk through:

- `RELEASE_CHECKLIST_LATEST.md`

## 4. Commit

```bash
git add src/index.ts README.md LAUNCHGUIDE.md SECURITY.md package.json server.json UPDATE_AND_UPLOAD_GUIDE.md
git commit -m "Update MCP docs and release flow"
```

Adjust the file list and commit message to match the actual change.

## 5. Push To GitHub

```bash
git push origin main
```

If you are working on a branch, push that branch instead.

## 6. Publish To npm

Only do this when the package contents changed and you want a new installable release.

First bump the version:

```bash
npm version patch
```

Use `minor` or `major` only when the change really justifies it.

If local-only untracked planning notes are present and you intentionally do not want to commit them, either clean the working tree first or use `npm version patch --force` carefully.

Then publish:

```bash
npm publish --access public
```

If npm publish fails because of security-key or 2FA policy, do not guess.

- use the local-only operator publish note kept outside tracked repo content
- do not write actual token handling steps or token values into public repo docs

Known behavior in this repo:

- successful local publish depends on valid npm publish auth
- a later failure happened because that auth state expired
- browser login alone is not enough when npm publish requires stronger auth

## 7. Fast Rule For When To Publish

Publish:

- tool behavior changed
- package metadata changed
- install experience changed
- launch guide or README changed in a way users need from npm

Do not publish yet:

- scratch notes changed
- local-only planning files changed
- incomplete experiments are still in progress

## 8. Recommended Release Order

Use this order every time:

1. Edit files
2. `npm run release:check`
3. `git status --short`
4. Commit
5. Push
6. Bump version
7. `npm publish --access public`

## 9. Current Notes

- paid conversion is intentionally out of scope for now
- keep the MCP read-only and narrow unless a new tool has strong quality justification
- npm publish auth details should stay in local-only operator notes, not tracked docs

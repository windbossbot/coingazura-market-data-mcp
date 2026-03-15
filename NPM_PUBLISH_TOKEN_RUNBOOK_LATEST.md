# [MCP] npm Publish Token Runbook

Updated: 2026-03-15

## Purpose

- prevent repeat npm publish failures caused by expired or wrong-scope tokens
- keep the known-good token creation method written down
- never store the actual token value in repo files

## When To Use This

- `npm publish --access public` fails with 2FA or permission errors
- the previous granular publish token expired
- a new machine or shell needs publish access

## Known-Good Token Form Inputs

Create a new npm granular access token with these inputs:

- token name: `coingazura-market-data-mcp-publish`
- description: `Temporary publish token for coingazura-market-data-mcp package release`
- bypass two-factor authentication (2FA): enabled
- allowed IP ranges: leave blank unless a stable office IP is intentionally enforced
- packages and scopes permissions: change from `No access` to `Read and write`
- package scope: allow the MCP package publish target used by this repo
- organizations permissions: `No access`
- expiration: `90 days` for the current operator choice

## Previously Successful Token Snapshot

The earlier working token had these known properties:

- token name: `coingazura-market-data-mcp-publish`
- description: `Temporary publish token for coingazura-market-data-mcp package release`
- bypass 2FA: enabled
- package permission: `Read and write`
- organizations permission: `No access`
- created: `2026-03-07`
- last used: `2026-03-13`
- expired: `2026-03-14`
- inferred earlier expiration choice: about `7 days`

## Important Note About Expiration

- the previous publish token worked because bypass 2FA was enabled
- the previous publish token later expired, which blocked `0.1.7` npm publish
- current operating choice: use `90 days` instead of short-lived default-style rotation
- record the next renewal date outside the repo

## Safe Local Install

After generating the token, update the user npm auth file only:

- file: `C:\Users\GWLin\.npmrc`
- line format: `//registry.npmjs.org/:_authToken=...`

Do not:

- paste the token into this repo
- commit the token
- write the token into markdown docs
- echo the token in terminal logs that may be copied elsewhere

## Publish Flow After Token Update

Run from:

- `C:\Users\GWLin\workspace_4lane_hub\MCP`

Commands:

```bash
npm whoami
npm publish --access public
```

Expected state:

- `npm whoami` returns `coingazura`
- `npm publish` no longer asks for USB/security-key flow
- package version advances on npm instead of failing on 2FA policy

## If Publish Still Fails

Check in this order:

1. token is not expired
2. bypass 2FA is enabled on the token
3. package permission is `Read and write`
4. `C:\Users\GWLin\.npmrc` is using the new token
5. package version is newer than the last published npm version

## Security Rule

- treat the token as machine secret material
- rotate it if exposed, pasted, or committed by mistake
- if publish is no longer needed on a machine, remove the token from `C:\Users\GWLin\.npmrc`

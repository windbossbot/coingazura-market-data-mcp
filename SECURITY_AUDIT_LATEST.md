# [MCP] Security Audit

Updated: 2026-03-15

## Scope

- MCP server code
- launch and install guidance
- package metadata
- local and future hosted-service risk

## Current Findings

### High

1. No current high-severity issue found in the local read-only scope.

### Medium

2. Version drift was a trust and deployment risk.
- `src/index.ts` and `server.json` had stale version values relative to the published package
- current state: aligned to `0.1.7`

3. npm publish auth depended on a time-limited bypass-2FA token.
- previous npm release flow relied on a granular token with `bypass 2FA`
- once that token expired, local publish failed even though browser login still worked
- current mitigation: document the exact token creation method in `NPM_PUBLISH_TOKEN_RUNBOOK_LATEST.md`

4. Future hosted mode would need stronger service-side controls.
- current package is local stdio first
- if remote serving is added later, add:
  - rate limiting
  - abuse monitoring
  - sanitized error responses
  - logging policy
  - support boundary

### Low

5. Public resource host is visible in source and docs.
- current use is read-only and fixed-host only
- keep it that way: no secrets, admin notes, or private operator details should ever be exposed through public resources

## Current Status

- `npm audit --json`: 0 vulnerabilities
- fixed outbound host restriction: yes
- arbitrary URL input: no
- wallet/signing/transfer capability: no
- direct secret-bearing config in this repo: not observed
- publish token value stored in repo docs: no
- local npm auth secret exists outside repo in `C:\Users\GWLin\.npmrc`: yes

## Operator Rules

1. do not paste secrets, tokens, or private service details into docs or marketplace copy
2. do not expose internal stack traces or verbose upstream failure details in future hosted responses
3. do not add arbitrary fetch capability without separate security review
4. if hosted mode is introduced, treat it as a separate security gate
5. keep npm publish tokens only in `C:\Users\GWLin\.npmrc`, never in repo files
6. if a publish token expires or is rotated, update the runbook and remove stale assumptions

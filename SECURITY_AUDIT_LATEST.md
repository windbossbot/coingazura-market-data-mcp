# [MCP] Security Audit

Updated: 2026-03-14

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
- current state: aligned to `0.1.6`

3. Future hosted mode would need stronger service-side controls.
- current package is local stdio first
- if remote serving is added later, add:
  - rate limiting
  - abuse monitoring
  - sanitized error responses
  - logging policy
  - support boundary

### Low

4. Public resource host is visible in source and docs.
- current use is read-only and fixed-host only
- keep it that way: no secrets, admin notes, or private operator details should ever be exposed through public resources

## Current Status

- `npm audit --json`: 0 vulnerabilities
- fixed outbound host restriction: yes
- arbitrary URL input: no
- wallet/signing/transfer capability: no
- direct secret-bearing config in this repo: not observed

## Operator Rules

1. do not paste secrets, tokens, or private service details into docs or marketplace copy
2. do not expose internal stack traces or verbose upstream failure details in future hosted responses
3. do not add arbitrary fetch capability without separate security review
4. if hosted mode is introduced, treat it as a separate security gate

# Security Policy

## Scope

COINGAZURA Market Data MCP is a read-only MCP server.

Current guarantees:

- no wallet access
- no signing
- no order execution
- no token transfers
- no file writes
- fixed outbound resource targets only

## Network Access

This package makes outbound HTTPS requests only to these COINGAZURA-controlled read-only resource endpoints:

- `https://coingazura-agent-endpoint.kimrla112.workers.dev/resources/market-mood-snapshot`
- `https://coingazura-agent-endpoint.kimrla112.workers.dev/resources/yield-candidates-latest`

No arbitrary remote URL input is accepted from users.

## Supported Versions

- `0.1.x`

## Reporting

If you find a security issue, open a private report through the repository security flow or file an issue with enough detail to reproduce safely.

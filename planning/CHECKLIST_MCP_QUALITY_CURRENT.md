# [MCP] Quality Checklist Current

Updated: 2026-03-13

## Install / Run

- `npx -y coingazura-market-data-mcp` install path still works
- `npm run release:check` passes before release
- package version, npm version, marketplace version stay aligned
- `server.json` version stays aligned with `package.json`

## Trust / Safety

- read-only scope is explicit
- wallet, trade, and transfer permissions are explicitly absent
- fixed outbound host rule is explicit
- `npm audit --json` returns 0 vulnerabilities before release

## Data Value

- data is live, not mock
- each tool has a clear reason to exist
- output is compact and agent-usable
- stable exit risk use case stays visible in docs and marketplace copy

## Marketplace / Score

- tagline and description do not drift from actual scope
- docs do not undercount tool count
- example prompts are present
- hosted endpoint is not implied when unavailable
- pricing claims do not outrun delivery capability

## Paid Readiness

- free tier remains credible on its own
- paid plan is not announced before hosted/support boundaries exist
- premium differentiators are concrete, not vague

## File Hygiene

- active order files stay at repo root
- planning notes stay under `planning/`
- archive or remove decisions are named explicitly before action

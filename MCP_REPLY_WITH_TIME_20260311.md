# [MCP]

following current order from `CENTRAL`

date_kst: 2026-03-15
time_kst: 18:57:21
orders read: yes
can proceed: yes
blocker or none: none
path drift found:
- active MCP docs still had older `workspace_mcp\coingazura-market-data-mcp` references
- canonical lane root is `C:\Users\GWLin\workspace_4lane_hub\MCP`

normalized files:
- `README.md`
- `MCP_CENTRAL_UPDATE_RULE_20260311.md`
- `RECORD_REGISTRY_LATEST.md`

security issues:
- `npm audit --json` 기준 취약점 0건
- 고정 호스트 기반 read-only 구조 유지
- 추가 즉시 이슈는 보이지 않음

code/doc issues:
- `npm run release:check` 통과
- README, LAUNCHGUIDE, package metadata, server tarball 정합성은 현재 양호
- 내부 planning 문서와 active order 문서의 위치를 분리해 루트 clutter를 줄였음
- 작업트리에 미추적 운영 문서가 남아 있어 공개 저장소 대상 파일과 로컬 운영 파일 경계는 계속 분리 관리가 필요

organize result:
- active order / receipt / reply files는 루트 유지
- planning / proposal / checklist 문서는 `planning\` 아래로 분리
- VIRTUAL의 latest-policy 패턴을 따라 MCP에도 `*_LATEST.md` 운영 문서를 정착시켰음

canonical docs:
- `START_HERE_MCP.md`
- `MCP_REPLY_WITH_TIME_20260311.md`
- `SECURITY_AUDIT_LATEST.md`
- `BACKGROUND_PROCESS_POLICY_LATEST.md`
- `RECORD_HYGIENE_POLICY_LATEST.md`
- `RECORD_REGISTRY_LATEST.md`
- `INTERNAL_FILE_SCOPE_AUDIT_20260314.md`

old rules absorbed:
- receipt 후 reply 즉시 작성 규칙
- background task review 규칙
- service-security 우선 규칙
- path/storage normalization 규칙

remove candidates:
- none now
- 현재는 삭제보다 분리와 archive가 더 안전함

archive candidates:
- none now
- the older 2026-03-07 checklist snapshot was removed after current checklist replacement

cleanup candidates:
- `C:\Users\GWLin\workspace_4lane_hub\MCP\CROSS_LANE_NOTES.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\MCP_ACTION_ORDER_20260311.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\MCP_CENTRAL_UPDATE_RULE_20260311.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\MCP_FEEDBACK_ORDER_20260311.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\SESSION_IDENTITY_ORDER.md`
- `C:\Users\GWLin\workspace_4lane_hub\MCP\START_HERE_MCP.md`

merge candidates:
- none inside MCP without additional `CENTRAL` order
- `START_HERE_MCP.md`, `SESSION_IDENTITY_ORDER.md`, `MCP_ACTION_ORDER_20260311.md`, `MCP_FEEDBACK_ORDER_20260311.md` are related, but merging them could hide active ownership and order boundaries
- cross-lane document unification, if desired, should be routed through `CENTRAL`

duplicate candidates:
- `MCP_CENTRAL_UPDATE_RULE_20260311.md` 일부 내용은 최신 `START_HERE_MCP.md`와 `MCP_REPLY_WITH_TIME_20260311.md`에 이미 흡수됨

stale candidates:
- `MCP_CENTRAL_UPDATE_RULE_20260311.md` 의 일부 경로/운영 지시가 최신 normalization 이전 기준이었음

next 1 to 3 actions:
- keep active order files in root and planning notes under `planning\`
- decide whether current internal order files should remain untracked or be committed as local operating docs
- refresh `CENTRAL` with organize / archive result if needed

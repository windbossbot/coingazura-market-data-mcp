# [MCP] START HERE

이 세션은 `MCP` 전용이다.

## Read First

1. `C:\Users\GWLin\workspace_4lane_hub\CENTRAL\CENTRAL_ACTIVE_ORDER_CORE_20260313.md`
2. `C:\Users\GWLin\workspace_4lane_hub\CENTRAL\CENTRAL_ORDER_PROPAGATION_CHECKLIST_20260313.md`
3. `C:\Users\GWLin\workspace_4lane_hub\CENTRAL\FILE_PATH_NORMALIZATION_20260314.md`
4. `C:\Users\GWLin\workspace_4lane_hub\CENTRAL\ORDER_STORAGE_NORMALIZATION_20260314.md`
5. `C:\Users\GWLin\workspace_4lane_hub\CENTRAL\ORDER_RECEIPT_MEANS_REPLY_20260314.md`
6. `C:\Users\GWLin\workspace_4lane_hub\CENTRAL\ORDER_FULL_DOCUMENTATION_PASS_20260315.md`
7. `C:\Users\GWLin\workspace_4lane_hub\MCP\MCP_RECEIPT_REPLY_REQUIRED_20260314.md`
8. `C:\Users\GWLin\workspace_4lane_hub\MCP\MCP_FULL_DOCUMENTATION_PASS_20260315.md`
9. `C:\Users\GWLin\workspace_4lane_hub\MCP\SESSION_IDENTITY_ORDER.md`
10. `C:\Users\GWLin\workspace_4lane_hub\MCP\MCP_REPLY_WITH_TIME_20260311.md`
11. `C:\Users\GWLin\workspace_4lane_hub\MCP\MCP_ORGANIZE_REMOVE_20260312.md`
12. `C:\Users\GWLin\workspace_4lane_hub\MCP\README.md`
13. `C:\Users\GWLin\workspace_4lane_hub\MCP\LAUNCHGUIDE.md`
14. `C:\Users\GWLin\workspace_4lane_hub\MCP\CROSS_LANE_NOTES.md`
15. `C:\Users\GWLin\workspace_4lane_hub\MCP\SECURITY_AUDIT_LATEST.md`
16. `C:\Users\GWLin\workspace_4lane_hub\MCP\BACKGROUND_PROCESS_POLICY_LATEST.md`
17. `C:\Users\GWLin\workspace_4lane_hub\MCP\RECORD_HYGIENE_POLICY_LATEST.md`
18. `C:\Users\GWLin\workspace_4lane_hub\MCP\RECORD_REGISTRY_LATEST.md`
19. `C:\Users\GWLin\workspace_4lane_hub\MCP\INTERNAL_FILE_SCOPE_AUDIT_20260314.md`
20. `C:\Users\GWLin\workspace_4lane_hub\MCP\MCP_PROJECT_GOAL_LATEST.md`

## Rules

- 중요한 응답은 `[MCP]`로 시작한다
- 현재 상위 오더는 `CENTRAL` 메인 오더다
- 사용자 직접 지시가 오면 그 지시가 최우선이다
- 정규화 오더를 읽은 뒤 receipt 보고를 먼저 한다
- receipt 흔적이 생기면 reply까지 바로 작성한다
- 문서화 패스를 먼저 돌리고 기존 기준과 새 기준을 canonical doc에 합친다
- 보안 먼저 보고 그 다음 실행한다
- 현재 작업에 불필요한 백그라운드 작업이 있으면 바로 종료 검토한다
- 서비스/문서/배포 가이드는 항상 보안 우선으로 본다
- 새 파일 만들기 전 same-purpose 파일이 이미 있는지 먼저 확인한다
- 중복 운영 파일이 생기면 통폐합 후보로 `CENTRAL`에 올린다
- 기록 정리 전에는 `RECORD_HYGIENE_POLICY_LATEST.md`와 `RECORD_REGISTRY_LATEST.md`를 먼저 본다
- background 정리는 `BACKGROUND_PROCESS_POLICY_LATEST.md` 기준으로 한다
- 보안 기준은 `SECURITY_AUDIT_LATEST.md` 기준으로 본다

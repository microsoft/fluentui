# Phase 2 — Batch 4 report (2026-07-29)

First batch under the batch-scoped regime and the full settled contract from
birth: **portal, overflow, menu, popover, dialog, drawer, carousel,
swatch-picker, toast, table** (commits `0139446cf7`…`79194de9a2` + seams
`46e8873693`). No statics ever existed for these; markers/lowercase/fallback-
only data-\*/tight transitions applied in one pass.

## Validation (batch-scoped)

- **Scoped VR gate: 10 new sets, all pass, zero retries** (portal 2, popover 10,
  toast 46, dialog 63, menu 64, drawer 76, swatch-picker 7, table 162 — 34
  previously-validated sets skipped via seeded results). The three
  fuiSelector-migrated story kinds passed pixel-identical — pre-conversion
  baselines were captured while table's statics were still valid, so both eras
  capture true hover.
- Per-package tests green in all 10; conformance (component-has-group-marker
  default) live from birth; portal (no isConformant suite) carries a local
  D15.1 assertion instead.
- **Seam audit results**: drawer→react-nav (3 D9 wirings), popover→react-charts
  (11 selector sites — 4 were regex-matched assertions passing VACUOUSLY
  against nothing), table→VR stories (5 fuiSelector migrations). All repaired,
  nav 280/280, charts 912/912, snapshot diffs verified three-shapes-only.
- Coverage notes: overflow and carousel have no capturable VR stories —
  validated via tests, seams, and (overflow) the charts Legend-Overflow suite.

## Deferred (recorded)

- react-components suite: overflowClassNames re-export + api.md regen + the
  no-deprecated lint decision — suite pass planned with Phase 3.
- scripts/cypress base.config.ts lacks a css-module rule (pre-existing since
  batch 2) — Phase 3.
- react-menu useValidateNesting fui-MenuGrid\* literals — re-point in batch 5
  when menu-grid-preview converts.

No metrics leg (batch-scoped regime): metrics re-run happens at the final gate.

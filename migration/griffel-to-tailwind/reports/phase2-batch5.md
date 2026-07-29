# Phase 2 — Batch 5 report (2026-07-29) — MASS CONVERSION COMPLETE

Final needs-conversion batch: **combobox, nav, teaching-popover,
menu-grid-preview, calendar-compat, datepicker-compat, timepicker-compat**
(commits `84843e63ef`…`86e56fda9b` + ledger `c80304aa7c`). recipes and
theme-designer reclassified `special` (docs/demo projects, no library build —
agents correctly refused to force conversions).

## Validation (batch-scoped)

- **Scoped gate: 48/48 sets** — 4 new capturable sets all clean first attempt
  (combobox 135, calendar-compat 8, datepicker-compat 24, timepicker-compat 3);
  nav (15 components), teaching-popover (12), menu-grid-preview have no VR
  stories — green test suites + seam audits.
- Compat-size expectation held only for calendar (4 heavy modules); datepicker
  was single-surface; timepicker is the smallest package in the repo.
- Seams: menu-grid conversion re-pointed react-menu's fui-MenuGrid\* validation
  literals (menu tests green); teaching-popover composes over converted
  popover/button at l2 with the two-marker declaration; timepicker's dead
  `.fui-Combobox__clearIcon` cypress selector + umbrella api.md regen handled
  by the finisher agent (separate commit).
- Migration-wide finding (recipes agent): the public docsite storybook has NO
  css-modules/Tailwind wiring — queued for Phase 3/specials (same treatment
  the VR storybook got).

**Every ordinary package in the repo is now converted.** Remaining: 13 specials,
Phase 3 cleanup, final full-suite gate + metrics for the PR report.

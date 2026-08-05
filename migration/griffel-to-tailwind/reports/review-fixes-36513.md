# Review fixes — external review of PR microsoft/fluentui#36513

Per-item verification + fix log. Each section records the verification verdict with
evidence, the fix, and the gate results. Zero-tolerance VR protocol per
`validation/README.md` (fresh `--skip-nx-cache` builds both legs, staleness guard,
`--maxDiffPixels 0`).

## Item 11 — Pie.tsx `wrapTextInsideDonut` document-wide (MEDIUM) — CONFIRMED, fixed

Commit: `a50ef4522c` (shared with item 10). Date: 2026-08-05.

### Verification

- **Document-global: CONFIRMED.** `wrapTextInsideDonut` (utilities.ts) did
  `d3SelectAll(`.${selectorClass}`)` — document scope. `Pie.tsx:29` passed
  `pieInsideDonutStringClassName`, the CSS-module local shared by every Pie instance, so
  mounting one Pie re-wrapped the center text of EVERY mounted DonutChart with the
  mounting Pie's `maxWidth = innerRadius * 2 − TEXT_PADDING`. Empirically demonstrated:
  the new multi-donut jest test run against the pre-fix code fails exactly there —
  chart A (innerRadius 60, single-line value) ends up with 3 tspans after chart B
  (innerRadius 35) mounts.
- **Pre-migration behavior:** dead code. Under Griffel the argument was a multi-token
  `mergeClasses` composition interpolated into `` `.${selectorClass}` ``, producing a
  descendant chain matching nothing — no wrapping ever ran in v9 (ledger react-charts
  notes; commit `a160a27eab`). ANY wrapping is post-migration behavior.
- **C1 intent (on record, `a160a27eab`):** "C1's conversion accidentally revived it
  (pixel-neutral — text fits one line). Export the single module local and pass it
  directly so the revival is robust, not accidental." The revival decision is
  deliberate and stands — nothing in it endorses cross-instance scope, which is an
  accident of `selectAll`'s default document scope inherited from v8. Scoping to the
  owning chart preserves the C1 intent (wrapping live) and is pixel-identical for
  single-chart rendering (a scoped selection resolves to the same element the
  document-wide one matched when only one donut exists).
- **Stale-effect claim: CONFIRMED.** Effect deps were `[]` — radius/value changes never
  re-wrapped. Worse, a `valueInsideDonut` change was silently LOST: the wrap replaces
  React's text child with tspans (`text.text(null)`), so React's later `commitTextUpdate`
  wrote to a detached text node.

### Fix

- `utilities.ts` — `wrapTextInsideDonut(selectorClass, maxWidth, root?: Element | null)`:
  `undefined` = legacy document-wide `selectAll` (back-compat for external callers),
  `null` = no-op ("no node yet"), Element = `d3Select(root).selectAll(...)`.
- `Pie.tsx` — passes its own `<g>` via a new ref; effect deps
  `[props.innerRadius, props.valueInsideDonut]`; the now-unused file-top
  `react-hooks/exhaustive-deps` disable removed; `<text>` keyed by
  `value-inside-donut-${props.valueInsideDonut}` so a value change recreates the node
  d3 had rewritten (fixes the detached-text-node swallow above).

### Gates

- New tests: `Pie.test.tsx` multi-donut behavior test (two DonutCharts, different radii
  — each keeps its own wrap; FAILS pre-fix, passes post-fix);
  `UtilityUnitTests.test.ts` scoped-wrap unit test (root-scoped call wraps inside the
  root only, `null` no-ops, outside text byte-identical).
- `charts-donutchart` VR set 3/3 pixel-clean at zero tolerance (see the combined VR
  table under item 10 — all 19 sets were re-run because item 10 touches
  CartesianChart, which underlies them).
- Full react-charts jest: 917 passed / 86 skipped / 1003 = exact 912/86/998 baseline
  plus the 5 new tests; 321/321 snapshots pass untouched (zero churn).

## Item 10 — CartesianChart axis measurement document-global (MEDIUM) — CONFIRMED, fixed

Commit: `a50ef4522c` (shared with item 11). Date: 2026-08-05.

### Verification

- **CONFIRMED.** `calculateLongestLabelWidth` (utilities.ts) resolved its font-probe
  selector via `document.querySelector(query)` — first match in the DOCUMENT. Five
  CartesianChart call sites feed margins/tick math from it: `CartesianChart.tsx:173`
  (y-axis, `.${cartesianYAxisClassName} text` → `startFromX` → `margins.left`) and four
  x-axis sites in `_calcMaxLabelWidthWithTransform`
  (`CARTESIAN_XAXIS_TEXT_SELECTOR` → rotation/truncation/wrap label-space and
  `hideTickOverlap` tick-count suppression). Both selector tokens are shared by every
  CartesianChart instance (hashed module local / retained identity literal), so with
  multiple charts every chart measured the FIRST chart's axis typography.
- **Pre-migration behavior:** all five sites were dead selectors under Griffel
  (multi-token `mergeClasses` interpolation → descendant chain matching nothing →
  hardcoded `600 10px "Segoe UI"` fallback; documented in the file's own conversion
  comments and the ledger note "CartesianChart same latent dead selector"). The
  migration deliberately revived the measurement (C2 — margins sized from the painted
  font); the DOCUMENT-GLOBAL resolution scope is the unintended part. The reviewer's
  framing is confirmed with one nuance: pre-migration the selector matched nothing at
  all (fallback font), it was not per-instance-correct — so the migration did not
  _break_ correct scoping, it revived a measurement into an incorrectly-scoped query.
- Note: `getTextSize`/`createWrapOfXLabels` (the other half of x-axis wrapping) already
  accept a `container` and were not flagged; unchanged.

### Fix

- `utilities.ts` — `calculateLongestLabelWidth(labels, query, container?: HTMLElement | null)`:
  `undefined` = legacy document scope (external callers — VBC/GVBC/VSBC pass no query at
  all and are unaffected), `null` = no scope yet → fallback font, element = scoped
  `container.querySelector`.
- `CartesianChart.tsx` — all five sites pass `chartContainer.current`. The y-axis site
  runs from effects (ref always attached). The x-axis sites run during render: on the
  FIRST render the ref is `null` → fallback font, which is exactly what the unscoped
  query yielded then too (the chart's own axis DOM did not exist yet to be matched) —
  single-chart rendering is pixel-identical by construction, and re-renders measure the
  chart's OWN axis.

### Gates

- New tests (`UtilityUnitTests.test.ts`, "calculateLongestLabelWidth container
  scoping"): two chart containers with different inline axis fonts (30px chart FIRST in
  document order, 20px second); scoped calls copy the PROVIDED container's font (20px /
  30px respectively), omitted container documents the legacy first-in-document behavior
  (30px), `null` yields the hardcoded fallback font.
- **VR: ALL 19 charts sets re-run — 187/187 pixel-clean at zero tolerance, zero pixel
  diffs.** Same set list, filters, and expects as the C7 full re-validation
  (`vr-c6c7-full.log`): annotationonlychart 6, areachart 9, chartannotationlayer 9,
  charttable 6, donutchart 3, funnelchart 12, gaugechart 12, groupedverticalbarchart
  12, heatmapchart 12, horizontalbarchart 11, horizontalbarchartwithaxis 12, legend 9,
  linechart 14, polarchart 12, sankeychart 12, scatterchart 9, sparklinechart 3,
  verticalbarchart 12, verticalstackedbarchart 12. Both legs fresh `--skip-nx-cache`
  builds, build logs checked for zero cache-replay lines, dist mtimes confirmed
  rewritten. Baseline captured from the pre-fix tree (fix stashed);
  candidate from the fixed tree.
- Full react-charts jest at baseline + 5 new tests (see item 11); lint 0 errors
  (438 → 439 warnings: the new test file's standard `import/no-extraneous-dependencies`
  shape carried by every test file in the package — net of removing Pie.tsx's stale
  disable); `nx run react-charts:type-check` clean.

### Cross-session note (both items)

A parallel session was fixing other review items in the same working tree during the VR
runs; the capture staleness guard tripped twice on its edits (dialog CSS, carousel CSS)
and each time the affected sets were re-captured after another fresh `--skip-nx-cache`
rebuild — no capture was taken from a stale bundle (the only
`--baseline-from-current-bundle` use was the sanctioned baseline-leg exception, sourcing
the already-verified pre-fix bundle). The parallel deltas never touched
`packages/charts` sources; with 187/187 clean pairs, attribution questions are moot —
both the parallel deltas and this fix are proven pixel-inert for every charts story.

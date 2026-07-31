# Charts batch C5 — SankeyChart, PolarChart, HorizontalBarChartWithAxis, AnnotationOnlyChart

Date: 2026-07-30. Branch `styling/tailwind-css-modules`. Full contract in one pass
(conversion + group marker + lowercase idents + no statics + D15/D16), batch-scoped
validation per the RUNBOOK process rule. C3 (`2effe21b26`) / C4 (`0847349995`) were the
templates.

## Converted

| Component                  | Module                                  | Hook                                  | Notes                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | --------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SankeyChart                | `SankeyChart.module.css`                | `useSankeyChartStyles`                | 9 styled locals, ALL l1 (own root `<div>` — no CartesianChart); marker `group/fui-sankey-chart`; `chartWrapper` keeps its Griffel conditional (`reflowProps?.mode === 'min-width'`); consumer args for `nodes`/`links`/`nodeTextContainer`/`toolTip` stay commented out (fidelity); **literal `nodeName`/`tempText` d3 pair stays GLOBAL** (ledger note — see below) |
| PolarChart                 | `PolarChart.module.css`                 | `usePolarChartStyles`                 | 6 locals, all l1 (own root); marker `group/fui-polar-chart`; shared `gridLine` slice expressed as a two-class selector list + per-slot opacity rules; `chartWrapper` → consumer pass-through (Gauge/Donut precedent)                                                                                                                                                 |
| HorizontalBarChartWithAxis | `HorizontalBarChartWithAxis.module.css` | `useHorizontalBarChartWithAxisStyles` | `.opacity-change-on-hover`/`.bar-label` l1 (own SVG elements); `.root` identity-only at l2 (CartesianChart's element) + marker `group/fui-horizontal-bar-chart-with-axis` forwarded via `styles={{ ...props.styles, root: styles.root }}` AFTER `{...props}` (M2, HeatMapChart precedent incl. the `props.styles?.root` join); `xAxisTicks` composes to `''`         |
| AnnotationOnlyChart        | `AnnotationOnlyChart.module.css`        | `useAnnotationOnlyChartStyles`        | 3 locals, all l1; marker `group/fui-annotation-only-chart` on the `root` slot (the outer container div has no class channel — react-tooltip "outermost slot" precedent); hook stays argument-less; NO classNames constant added (the Griffel source never had one; D16.5 narrows existing statics, it does not add public surface)                                   |

Statics narrowed to `{ root: marker }` with the @deprecated-for-styling JSDoc pattern:
`sankeyChartClassNames`, `polarChartClassNames`, `hbcWithAxisClassNames`.
AnnotationOnlyChart never exported statics, so none was added. Repo-wide grep: zero
non-test references to the removed `fui-sc__*` / `fui-polar__*` / `fui-hbcwa__*` statics
outside the styles files themselves (plus regenerable snapshots).

Fidelity notes:

- **SankeyChart literal class-name pair (ledger constraint honoured).** `.nodeName` /
  `.tempText` are a d3 text-measurement seam: `_computeNodeAttributes` measures node-name
  widths via `select('.nodeName')` + injected `attr('class', 'tempText')` elements and
  `selectAll('.tempText').remove()`, against the literal `<g className="nodeName">` in
  `_createNodes`. They carry NO styles anywhere, so nothing moved into the module — they
  stay literal global strings in the TSX, with comments at both sites and in the module
  header citing the ledger note. No `:global(...)` CSS rule was needed because no
  stylesheet selects them. `SankeyChart.test.tsx`'s `getByClass(container, /nodeName/i)`
  keeps passing untouched for the same reason.
- **HBCWA consumer-root channel (HeatMapChart precedent).** The Griffel hook never read
  `props.styles`, but the consumer's `styles.root` still reached the root under Griffel
  through CartesianChart's own hook (HBCWA spreads `{...props}` onto CartesianChart). The
  explicit `styles={{ ... }}` override would have cut that channel, so `props.styles?.root`
  joins the hook's root composition. The three Griffel-era slots keep their
  no-consumer-argument shape verbatim.
- **HBCWA `xAxisTicks`** had an EMPTY Griffel slice (`{}`) + a removed static → the slot
  now composes to `''`; the key stays for the public styles contract (VSBC known-dead-slot
  precedent). `opacityChangeOnHover` is likewise unconsumed by this component's own JSX —
  rule carried, slot kept.
- Frozen literals carried verbatim: Sankey `stroke-width: 3px` (links), `fill: #F5F5F5`
  (nodes); Polar `stroke-width: 1px` (grid lines) — literals, not strokeWidth tokens, so
  the D4-addendum `var(--spacing-*)` mapping does not apply. Spacing per D4: 8px →
  `*-horizontal-s` / `gap-y-vertical-s`, 4px → `*-vertical-xs`.
- Sankey `.tool-tip` inlined from `getTooltipStyle()` byte-identical to
  VerticalBarChart/VSBC `.tooltip`; Sankey `.chart-title` inlined from
  `getChartTitleStyles()` byte-identical to DonutChart/GaugeChart/FunnelChart
  `.chart-title`.
- `HighContrastSelector` slices narrowed to `@variant forced-colors` (Sankey ×4 incl. the
  `& text` descendant slice on `.node-text-container`; HBCWA ×1 `stroke: CanvasText`) —
  the C1/C2 behaviour-preserving call, documented per module.
- AnnotationOnlyChart's dynamic per-instance styling (width/minHeight/paper/font/padding,
  plot background) was always INLINE STYLE in the component — untouched.

## Common.styles.ts — factories REMOVED (consumers verdict)

`getTooltipStyle` / `getAxisTitleStyle` / `getBarLabelStyle` / `getMarkerLabelStyle` /
`getChartTitleStyles` are deleted from `src/utilities/Common.styles.ts`, along with the
`@griffel/react`, `tokens/typographyStyles`, and `HighContrastSelector` imports.
Evidence: after SankeyChart's conversion a repo grep finds ZERO remaining references to
any factory anywhere in `packages/charts/react-charts` (src, stories, etc.) outside the
file itself; the factories were internal-only (`utilities/index.ts` re-exports them but
the package public `src/index.ts` never exposed `utilities/index`; no `.api.md`/docs
reference). VegaDeclarativeChart and ChartAnnotationLayer (C6 scope) consume only the
**`TitleStyles` type** — which stays, along with `CHART_TITLE_PADDING` and
`getChartTitleInlineStyles` (the non-Griffel surface). The file header documents the
removal and where each factory's compiled output now lives.

## VR evidence (all zero tolerance, fresh --skip-nx-cache builds both legs, 0 cache-replay lines)

New coverage added BEFORE conversion (D17); baselines captured from the pre-conversion
bundle (built 2026-07-30 16:51 PT), candidates from the post-conversion bundle (built
17:06 PT). Popover-open baselines visually verified to contain the open callout before
conversion (Sankey: "node4 / 2 / From node0" + stream-hover selection state; Polar:
"Math / Mike / 120"; HBCWA: "Oranges range / Oranges / 10%").

- `charts-sankeychart` — NEW, 12 baselines (Basic / DefaultColors / PopoverOpen ×
  base/RTL/DarkMode; PopoverOpen dispatches mouseover with clientX/Y on the first link
  `path[role="img"]` — HeatMapChart technique; DefaultColors exercises the
  DEFAULT_NODE_COLORS cyclic assignment). **12/12 clean.**
- `charts-polarchart` — NEW, 12 baselines (Basic circle grid / Polygon+clockwise /
  PopoverOpen × base/RTL/DarkMode; mouseover on the first `circle[role="img"]`).
  **12/12 clean.**
- `charts-horizontalbarchartwithaxis` — NEW, 12 baselines (Basic numeric-y / StringYAxis
  rounded / PopoverOpen × base/RTL/DarkMode; mouseover with clientX/Y on the first
  `rect[role="option"]`). String/numeric data only — no date axes (machine-TZ rule).
  **12/12 clean.**
- `charts-annotationonlychart` — NEW, 6 baselines (Basic / StyledWithTitle ×
  base/RTL/DarkMode; no popover — the component renders no callout). **6/6 clean.**

All 14 prior chart sets re-validated against the post-conversion bundle, zero retries:

| Set                            | Pairs | Result |
| ------------------------------ | ----- | ------ |
| charts-areachart               | 9     | PASS   |
| charts-charttable              | 6     | PASS   |
| charts-donutchart              | 3     | PASS   |
| charts-funnelchart             | 12    | PASS   |
| charts-gaugechart              | 12    | PASS   |
| charts-groupedverticalbarchart | 12    | PASS   |
| charts-heatmapchart            | 12    | PASS   |
| charts-horizontalbarchart      | 11    | PASS   |
| charts-legend                  | 9     | PASS   |
| charts-linechart               | 14    | PASS   |
| charts-scatterchart            | 9     | PASS   |
| charts-sparklinechart          | 3     | PASS   |
| charts-verticalbarchart        | 12    | PASS   |
| charts-verticalstackedbarchart | 12    | PASS   |

Batch total: **178/178 clean** (42 new + 136 existing), zero retries. (Charts sources live
outside capture.mjs's `packages/react-components` staleness walk, so the guard was
supplemented the C3/C4 way: both legs built `--skip-nx-cache` with the log checked for
zero cache-replay lines and `dist/storybook` mtimes confirmed rewritten.)

## Jest

`node node_modules/jest/bin/jest.js -u --ci` in `packages/charts/react-charts/library`:
**912 passed / 86 skipped / 998 — exactly the pre-batch baseline** (1 suite skipped —
`DeclarativeChartRTL`, `describe.skip`d before this migration; its snapshot still holds
`fui-sc__*` strings but is skip-inert and regenerates whenever the suite is re-enabled).
321 snapshots: 25 updated across 3 suites (SankeyChart, HorizontalBarChartWithAxis,
AnnotationOnlyChart), 296 passed.

- Snapshot churn script-verified pure class churn (`.scratch/c5-snap-churn.js`, the C4
  normalized-diff incl. whole-line class-attribute removals): after normalizing
  `class="…"` attributes away, OLD and NEW snapshots are line-identical — **0 non-class
  diffs** across 14209/8318/271 normalized lines.
- Component-test seam (ce8a605313 precedent, test-only): `HorizontalBarChartWithAxis.test.tsx`
  queried `/barLabel/i` (regex over the removed `fui-hbcwa__barLabel` static, in the
  hideLabels length-0 assertion). Re-pointed at the module class map via
  `getByExactClass(container, hbcwaStyles['bar-label'])`; mechanism unchanged (whether
  labels render is still the component's `hideLabels` decision). The ChartPopover callout
  queries in the same file were already re-pointed in C3 — untouched and coherent.
  SankeyChart/AnnotationOnlyChart tests had no queries against removed statics
  (Sankey's `/nodeName/i` targets the preserved literal).

## Other gates

- Type-check: `nx run react-charts:type-check` clean.
- ESLint: `nx run react-charts:lint --skip-nx-cache` 0 errors / 438 warnings — the exact
  pre-batch total (C4 report figure), i.e. zero NEW warnings; every warning shown in
  touched files is a pre-existing shape (export-all, extraneous-dev-deps on test imports,
  no-shadow, jsx-no-bind, AnnotationOnlyChart's pre-existing ResizeObserver globals). The
  four hook files and four modules emit ZERO warnings.
- `@griffel` imports: zero remain in the four converted folders. Package-wide, the ONLY
  remaining Griffel consumer in react-charts src is
  `CommonComponents/Annotations/ChartAnnotationLayer` (C6 scope).
- Package build (`nx run react-charts:build --skip-nx-cache`): `dist/styles.css` emits all
  21 new locals (`fuicm-sankey-chart-*` ×9, `fuicm-polar-chart-*` ×6,
  `fuicm-horizontal-bar-chart-with-axis-*` ×3, `fuicm-annotation-only-chart-*` ×3);
  `*.styles.raw.js` no longer generated for any of the four; class-map JS
  (`*.module.css.js`) emitted in `lib`/`lib-commonjs`.

## Seams touched

- `HorizontalBarChartWithAxis.tsx`: added `styles={{ ...props.styles, root: styles.root }}`
  after the `{...props}` spread on its CartesianChart render (marker channel, M2).
- `SankeyChart.tsx`: comment-only — ledger-note citations at both `nodeName`/`tempText`
  literal sites.
- `HorizontalBarChartWithAxis.test.tsx`: test-only query re-point (above).
- `utilities/Common.styles.ts`: Griffel factories removed (section above).
- `ResponsiveContainer.module.css`: comment-only update to the D2a5 transitional note —
  **SankeyChart was the LAST wrapped chart with unlayered Griffel root atomics.** Every
  chart a ResponsiveContainer can wrap now takes its root slices from layered modules
  (ChartAnnotationLayer, the one Griffel holdout, is not a ResponsiveContainer subject;
  VegaDeclarativeChart has no styles hook — bare className/style pass-through). The rules
  are therefore ELIGIBLE for promotion to `fui.components.l2`, but per the batch
  instruction the promotion is DEFERRED to the final plumbing batch so it lands with its
  own scoped VR gate.

## Adjudications

None — no VR diffs to adjudicate anywhere in the batch. (One process note, not an
adjudication: the first candidate-leg storybook build invocation was piped through `tail`,
which masked its real outcome and left `dist/storybook` unwritten; it was re-run cleanly
and the capture provenance above refers to the verified 17:06 build. No baseline or
candidate was captured from an unverified bundle.)

# Charts batch C4 — GaugeChart, FunnelChart, ChartTable, HeatMapChart

Date: 2026-07-30. Branch `styling/tailwind-css-modules`. Full contract in one pass
(conversion + group marker + lowercase idents + no statics + D15/D16), batch-scoped
validation per the RUNBOOK process rule. C3 (`2effe21b26`, reports/charts-c3.md) was the
template.

## Converted

| Component    | Module                    | Hook                    | Notes                                                                                                                                                                                                                                                                                                                           |
| ------------ | ------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GaugeChart   | `GaugeChart.module.css`   | `useGaugeChartStyles`   | 18 styled locals, ALL l1 (own root `<div>` — no CartesianChart); marker `group/fui-gauge-chart` on its own root; `limits`/`sublabel` share one rule (identical atomic sets); `chartWrapper` slot → consumer pass-through (Donut precedent); `calloutInfoContainer` was never returned by the hook — unchanged                   |
| FunnelChart  | `FunnelChart.module.css`  | `useFunnelChartStyles`  | 6 locals, all l1; marker `group/fui-funnel-chart`; consumer `className` position preserved; `text`/`calloutContentRoot` are known-dead slots kept for the public contract (VSBC `tooltip` precedent) — documented in the module header                                                                                          |
| ChartTable   | `ChartTable.module.css`   | `useChartTableStyles`   | 6 locals, all l1; marker `group/fui-chart-table`; the commented-out `props.styles?.*` consumer arguments are PRESERVED as comments (consumer styles deliberately not applied today — fidelity, not a fix); static-only `chart` slot deleted (never consumed); `border: strokeWidthThick` → `var(--spacing-thick)` (D4 addendum) |
| HeatMapChart | `HeatMapChart.module.css` | `useHeatMapChartStyles` | `.text` l1; `.root` identity-only at l2 (CartesianChart's element, VSBC precedent) + `.callout-content-root` at l2 (decorates ChartPopover's element via `calloutProps.styles`); marker `group/fui-heat-map-chart` forwarded via `styles={{ ...props.styles, root: classes.root }}` after the `{...props}` spread (M2)          |

Statics narrowed to `{ root: marker }` with the @deprecated-for-styling JSDoc pattern:
`gaugeChartClassNames`, `funnelClassNames`, `chartTableClassNames`,
`heatmapChartClassNames`. None is re-exported from any `index.ts` (each component's
`index.ts` exports only the component + types); repo-wide grep confirmed zero non-test
consumers of the removed statics outside the four styles files themselves (plus
regenerable snapshots in DeclarativeChart/VegaDeclarativeChart).

Fidelity notes:

- **HeatMapChart consumer-root channel.** The Griffel hook commented out
  `props.styles?.root`, but the consumer's `styles.root` still reached the root under
  Griffel through CartesianChart's own hook (HeatMapChart spreads `{...props}` onto
  CartesianChart). The explicit `styles={{ … }}` override would have cut that channel, so
  `props.styles?.root` joins the hook's root composition — the rendered surface is
  identical. `text`/`calloutContentRoot` keep their commented-out consumer arguments.
- Funnel root's `align-items: center` without `display: flex` carried verbatim (inert
  unless a consumer makes the root a flex container — pure re-expression).
- Frozen literals carried verbatim: `line-height: 16px`/`22px` (Gauge callout),
  `border-top: 1px solid var(--colorNeutralStroke1)`, `opacity: 0.85`. Spacing per D4
  amendment: 8px → `*-horizontal-s`, 10px → `*-vertical-m-nudge`, 13px → `mt-13`
  (no step), 238px → `max-w-238` (Legends numeric-utility precedent).
- GaugeChart `chartValue` font-size stays a per-breakpoint SVG ATTRIBUTE written by the
  component; only `font-weight`/`fill` are CSS.
- `getChartTitleStyles()` (`Common.styles.ts`, shared with SankeyChart/DonutChart/…) NOT
  converted — its compiled output inlined byte-identical to DonutChart's `.chart-title`
  in all three consumers here. `Common.styles.ts` untouched.
- `ResponsiveContainer.module.css` transitional note (D2 amendment 5) updated: Gauge and
  Funnel moved from the "still-Griffel unlayered atomics" list to the converted list —
  the unlayered ResponsiveChild rules still beat their now-l1 `width/height: 100%` slices,
  preserving the old last-argument winner. Rules stay UNLAYERED until SankeyChart /
  VegaDeclarativeChart (and the other remaining charts) convert.
- d3 audit: none of the four does class-based d3 selection (`selectAll`/`classed(`/
  `attr('class'`) — GaugeChart's `d3Select` is id-based text wrapping; HeatMapChart uses
  d3 scale/format only. No single-token d3 class exports needed.

## VR evidence (all zero tolerance, fresh --skip-nx-cache builds both legs, 0 cache-replay lines)

New coverage added BEFORE conversion (D17); baselines captured from the pre-conversion
bundle, candidates from the post-conversion bundle. Popover-open baselines visually
verified to contain the open callout before conversion (Gauge: "Current value is 50/100" +
legend rows; Funnel: stage/value; HeatMap: legend + value + ratio).

- `charts-gaugechart` — NEW, 12 baselines (Basic / SingleSegmentRounded / PopoverOpen ×
  base/RTL/DarkMode; PopoverOpen takes default + popover-open snapshots via executeScript
  mouseover on `#gauge-chart-arc-0`). **12/12 clean.**
- `charts-funnelchart` — NEW, 12 baselines (Basic / StackedVertical / PopoverOpen ×
  base/RTL/DarkMode; mouseover on `#funnel-segment-1`). **12/12 clean.**
- `charts-heatmapchart` — NEW, 12 baselines (Basic / SortedByValue / PopoverOpen ×
  base/RTL/DarkMode; mouseover with clientX/Y on the first `g[role="img"]`). String x/y
  axes on purpose — date axes format through the machine's local timezone (the same seam
  behind the jest timezone skips) and must not be encoded into a baseline. **12/12 clean.**
- `charts-charttable` — NEW, 6 baselines (Basic / StyledCells × base/RTL/DarkMode; no
  popover — ChartTable renders no callout). **6/6 clean.**

Existing 10 chart sets (the 8 pre-C3 sets + C3's two) re-validated against the
post-conversion bundle, zero retries:

| Set                            | Pairs | Result |
| ------------------------------ | ----- | ------ |
| charts-areachart               | 9     | PASS   |
| charts-donutchart              | 3     | PASS   |
| charts-horizontalbarchart      | 11    | PASS   |
| charts-legend                  | 9     | PASS   |
| charts-linechart               | 14    | PASS   |
| charts-scatterchart            | 9     | PASS   |
| charts-sparklinechart          | 3     | PASS   |
| charts-verticalbarchart        | 12    | PASS   |
| charts-verticalstackedbarchart | 12    | PASS   |
| charts-groupedverticalbarchart | 12    | PASS   |

Batch total: **136/136 clean** (42 new + 94 existing), zero retries.

## Jest

`node node_modules/jest/bin/jest.js -u --ci` in `packages/charts/react-charts/library`:
**912 passed / 86 skipped / 998 — exactly the pre-batch baseline** (1 suite skipped, same
as baseline). 321 snapshots: 36 updated across 3 suites (GaugeChart, HeatMapChart,
VegaDeclarativeChart), 285 passed.

- Snapshot churn script-verified pure class churn (`.scratch/c4-snap-churn.js`, C3 method
  extended to tolerate whole-line class-attribute removals — e.g. Gauge's `chartWrapper`
  lost its class attribute entirely): after normalizing `class="…"` attributes away, OLD
  and NEW snapshots are line-identical — **0 non-class diffs** across 5609/4345/5766
  normalized lines.
- Component-test seam (ce8a605313 precedent, test-only): `GaugeChart.test.tsx` queried
  `/chartValue/i` (×3) and `/calloutContentRoot/i` (×13) — regexes over the removed
  `fui-gc__*` statics. Re-pointed at the module class map via
  `getByExactClass(container, gaugeStyles['chart-value' | 'callout-content-root'])`;
  mechanism unchanged (the ellipsis text, `font-size` attribute, and popover open/closed
  presence are runtime values the component still writes). Jest-ident collision check:
  ChartPopover skips rendering its own `calloutContentRoot` div whenever a
  `customizedCallout` is provided (GaugeChart's case), so the shared
  `fuicm-callout-content-root` test ident matches only Gauge's element.
  FunnelChart/HeatMapChart tests had no class queries against the removed statics
  (HeatMapChart already goes through `fuiSelector` + `Legends.module.css` per
  ce8a605313).

## Other gates

- Type-check: `nx run react-charts:type-check` clean.
- ESLint: `nx run react-charts:lint` 0 errors / 438 warnings — all warnings in touched
  files are pre-existing shapes (extraneous-dev-deps on test imports, no-shadow,
  jsx-no-bind at untouched lines); the four hook files and four modules emit ZERO
  warnings. `nx run vr-tests-react-components:lint` clean (0 warnings in the new story
  files — no post-capture lint fixes needed this batch).
- `@griffel` imports: zero remain in the four converted folders.
- Package build (`nx run react-charts:build --skip-nx-cache`): `dist/styles.css` emits the
  new locals (`fuicm-gauge-chart-*`, `fuicm-funnel-chart-*`, `fuicm-chart-table-*`,
  `fuicm-heat-map-chart-*`, 34 occurrences); `*.styles.raw.js` no longer generated for the
  four components; class-map JS (`*.module.css.js`) emitted in `lib`/`lib-commonjs`.

## Seams touched

- `HeatMapChart.tsx`: added `styles={{ ...props.styles, root: classes.root }}` after the
  `{...props}` spread on its CartesianChart render (marker channel, M2).
- `ResponsiveContainer.module.css`: comment-only update to the D2a5 transitional note
  (remaining-consumers list).
- `GaugeChart.test.tsx`: test-only query re-points (above).

## Adjudications

None — no VR diffs to adjudicate anywhere in the batch.

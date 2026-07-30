# Charts batch C3 — VerticalStackedBarChart, GroupedVerticalBarChart, ChartPopover, ResponsiveContainer

Date: 2026-07-30. Branch `styling/tailwind-css-modules`. Full contract in one pass
(conversion + group marker + lowercase idents + no statics + D15/D16), batch-scoped
validation per the RUNBOOK process rule.

## Converted

| Component                             | Module                               | Hook                                        | Notes                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------- | ------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| VerticalStackedBarChart               | `VerticalStackedBarChart.module.css` | `useVerticalStackedBarChartStyles`          | 3 styled slots at l1 (`opacity-change-on-hover`, `tooltip`, `bar-label`) + l2 identity `.root`; marker `group/fui-vertical-stacked-bar-chart` forwarded to CartesianChart's root via `styles` prop (M2, VerticalBarChart precedent)                                                                                                                                                  |
| GroupedVerticalBarChart               | `GroupedVerticalBarChart.module.css` | `useGroupedVerticalBarChartStyles_unstable` | Same shape as VSBC; marker `group/fui-grouped-vertical-bar-chart`; old statics were the `fui-gvbc**…` typo strings                                                                                                                                                                                                                                                                   |
| ChartPopover                          | `ChartPopover.module.css`            | `usePopoverStyles_unstable`                 | 14 styled locals at l1 + identity `.callout-container` (own element → l1) carrying `group/fui-chart-popover`; `isCartesian` stays a conditional class pair; component's inline `mergeClasses` → `clsx`                                                                                                                                                                               |
| ResponsiveContainer (ResponsiveChild) | `ResponsiveContainer.module.css`     | `useResponsiveChildStyles`                  | Rules UNLAYERED per D2 amendment 5 (subject elements owned by the wrapped charts — mixed converted/unconverted set; Sankey/Gauge/Funnel/Polar roots carry unlayered Griffel `width/height:100%` atomics with identical values). Transitional: moves to `fui.components.l2` when the remaining charts convert. Marker `group/fui-responsive-child` rides the injected `root` fragment |

Statics narrowed to `{ root: marker }` with the @deprecated-for-styling JSDoc pattern:
`verticalstackedbarchartClassNames`, `groupedVerticalBarChartClassNames`,
`popoverClassNames`, `responsiveChildClassNames`. None of the four is re-exported from any
`index.ts` (internal-only constants); repo-wide grep confirmed zero non-test consumers of
the removed statics outside react-charts.

Fidelity quirk preserved verbatim: VSBC's `opacityChangeOnHover` composition appends
`props.href ? 'pointer' : 'default'` — literal class TOKENS no stylesheet defines
(upstream bug; the `<rect>`s set the real `cursor` attribute separately). Kept because the
conversion is a pure re-expression of the rendered DOM.

ChartPopover portal note: `<Popover inline>` mounts the surface in place (no Portal), and
module CSS is a document-level stylesheet either way — converted classes verified applying
on the popover surface content in VR (see below).

## VR evidence (all zero tolerance, fresh --skip-nx-cache builds both legs, 0 cache-replay lines)

New coverage added BEFORE conversion (D17), baselines captured from the pre-conversion
bundle, candidates from the post-conversion bundle:

- `charts-verticalstackedbarchart` — NEW, 12 baselines (Basic / RoundedWithLines /
  PopoverOpen × base/RTL/DarkMode; PopoverOpen takes default + popover-open snapshots via
  the LineChart executeScript mouseover technique). **12/12 clean.**
- `charts-groupedverticalbarchart` — NEW, 12 baselines (Basic / WideBarsWithLabels /
  PopoverOpen × base/RTL/DarkMode). **12/12 clean.**
- Popover-open baselines visually verified to contain the open callout (date header,
  legend text, colored border, Y value) before conversion.
- Post-capture story lint fixes (committed form vs the bundles both legs were captured
  from): VSBC types moved to `import type` (zero emitted-code difference) and GVBC's
  `barwidth={24}` removed — verified inert, since `GroupedVerticalBarChart.tsx` passes its
  own `barwidth={_barWidth}` to CartesianChart AFTER the `{...props}` spread, overriding
  the story prop in both captured legs. Future re-captures from committed source remain
  comparable against these baselines.

Existing 8 chart sets re-validated against the post-conversion bundle, zero retries:

| Set                       | Pairs                                     | Result |
| ------------------------- | ----------------------------------------- | ------ |
| charts-areachart          | 9                                         | PASS   |
| charts-donutchart         | 3                                         | PASS   |
| charts-horizontalbarchart | 11                                        | PASS   |
| charts-legend             | 9                                         | PASS   |
| charts-linechart          | 14 (incl. its own popover hover snapshot) | PASS   |
| charts-scatterchart       | 9                                         | PASS   |
| charts-sparklinechart     | 3                                         | PASS   |
| charts-verticalbarchart   | 12                                        | PASS   |

Total: 94/94 clean.

## Jest

`node node_modules/jest/bin/jest.js --ci` in `packages/charts/react-charts/library`:
**912 passed / 86 skipped / 998 — exactly the pre-batch baseline.** 321 snapshots pass.

- 75 snapshots regenerated across 10 suites (removed statics + module classes + markers).
  Script-verified pure class churn: 547 changed snapshot lines on each side match 1:1
  after normalizing `class="…"` attributes — zero non-class changes.
- Dependent-test seam (C2 precedent ce8a605313, test-only): 2 tests in
  `HorizontalBarChartWithAxis.test.tsx` (unconverted component) queried ChartPopover's
  removed `fui-cart__calloutContentX/Y` statics via `getByClass` regex. Re-pointed at
  `ChartPopover.module.css` locals via `getByExactClass`; mechanism unchanged (assertions
  read rendered `textContent`, which is untouched).
- Component-test seam in the batch itself: `VerticalStackedBarChart.test.tsx` queried
  `path.fui-vsbc__opacityChangeOnHover`; re-pointed at the module class map (opacity is
  still an element ATTRIBUTE written by the component — mechanism unchanged).

## Other gates

- ESLint + type-check: react-charts clean (see ledger note for command results).
- `@griffel` imports: zero remain in the four converted folders (Annotations/ excluded —
  unconverted, out of batch scope).
- `Common.styles.ts` factories untouched (shared; `getTooltipStyle`/`getBarLabelStyle`
  values inlined from compiled AOT output, byte-identical to VerticalBarChart's copies).

## Seams touched

- `VerticalStackedBarChart.tsx` / `GroupedVerticalBarChart.tsx`: added
  `styles={{ ...props.styles, root: classes.root }}` after the `{...props}` spread on
  their CartesianChart render (marker channel, M2).
- `ResponsiveContainer.tsx`: `mergeClasses` → `clsx` in the cloneElement styles injection,
  argument order preserved (consumer first, responsive-child fragment last).
- `ChartPopover.tsx`: `mergeClasses` → `clsx` (one inline composition site).

## Adjudications

None — no VR diffs to adjudicate anywhere in the batch.

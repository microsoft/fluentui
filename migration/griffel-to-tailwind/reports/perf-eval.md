# Client performance evaluation — Griffel vs Tailwind + CSS Modules

Executes `PERF_EVAL_SPEC.md`. Measured 2026-07-28, one machine, one browser session, legs
interleaved per component.

- **BEFORE** = `838ce80485` (parent of the pilot commit `ffd84a7b36`), built in a dedicated
  worktree with Griffel AOT confirmed in the output.
- **AFTER** = `e6fa6e476b` (HEAD of `styling/tailwind-css-modules`, batch 3 complete).
- Raw per-cell data: `../metrics/perf-eval/{Component}-{Scenario}.json` (25 files).

---

## Bottom line

The migration moved styling work **out of JavaScript and into the browser's style engine**.
Both halves of that trade are real and both are large.

1. **The `mergeClasses` win is universal and big.** Commit time (React render + the styles
   hook + DOM mutation) is faster on the AFTER leg in **all 25 cells**, median **−45.1%**,
   range −74.8% to −12.0%. Button — the designated benchmark — mounts 100 instances with
   **−74.8%** commit time.

2. **Selector matching got uniformly more expensive.** Style recalculation is slower on the
   AFTER leg in every traced cell: median **+28.7%** on the mount scenarios (range +15.1% to
   +40.3%). The converted CSS carries 205 `:where()` selectors and 128 `[data-*]` selectors
   where Griffel had 0 and 26, and 22,903 selector characters where Griffel had 12,925.

3. **On mount, the win wins.** 18 of 25 cells are net faster (≥5%), 3 flat, 4 slower. Every
   one of the 4 slower cells is scenario E.

4. **On re-render, there is a cliff — and the user's data-attribute concern is confirmed,
   but not for the reason one would guess.** Toggling a state prop across 100 instances is
   **+147.9% (Button)** and **+157.3% (Switch)** slower end-to-end. It is entirely style
   recalculation (+173.8% / +204.3%); commit is still faster (−26.7% / −13.4%).
   The cost is **not** paid for _writing_ `data-*` attributes — Switch writes none on toggle.
   It is paid for _matching selectors that carry a `[data-_]` alternative\*. See
   [The scenario-E cliff](#the-scenario-e-cliff).

---

## What was measured

### Harness

`apps/perf-test-react-components` was investigated first, as the spec requires. It is a
flamegrill/puppeteer **V8 tick sampler** (`scripts/perf-test-flamegrill`): it reports sample
counts, not milliseconds, requires a full repo build, and has no React Profiler, DOM-stats or
style-recalculation capability. Not serviceable for this spec, so the spec's fallback was
taken: a dedicated Vite harness in `.scratch/perf-eval/`.

Both legs are the **same harness source**, built twice. The only thing that differs is where
the 9 packages that changed between the two commits resolve from:

```
react-avatar  react-badge   react-button  react-divider  react-field
react-label   react-provider react-switch  react-tooltip
```

That set is the exact intersection of (a) the runtime dependency closure of the 5 components
plus FluentProvider — 22 packages — and (b) `git diff --name-only 838ce80485 HEAD`. The other
13 packages in the closure (`react-theme`, `react-utilities`, `react-tabster`,
`react-jsx-runtime`, `react-portal`, …) are byte-identical between the commits and are shared,
so tokens, focus outlines and the JSX runtime are **held constant by construction**, not by
assumption. `yarn.lock` and the root `package.json` are identical between the two commits, so
both legs also run the same React (19.2.0), react-dom, `@griffel/react` (1.5.32) and `clsx`.

Each leg loads its real shipped CSS mechanism: Griffel runtime injection on BEFORE; the
`react-tailwind-theme` artifact once per document plus each package's `dist/styles.css`
(pulled in by the generated `*.module.css.js` side-effect import) on AFTER.

### Measurement protocol

One persistent React root under one `FluentProvider`. Every measurement is a `flushSync`
state update on that root, so `createRoot` and provider cost sit **outside** the clock and
cannot dilute the signal. React element creation also happens before the clock starts.

Each timed window records two numbers:

| Metric           | What it contains                                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **commit**       | `flushSync(render)` — React reconciliation, the styles hook (`mergeClasses` vs `clsx` + `data-*` writes), Griffel's `useInsertionEffect` bookkeeping, and DOM mutation |
| **style+layout** | a forced `offsetHeight` read afterwards — the style recalculation and layout the commit invalidated, i.e. selector matching                                            |

- **A/B (1 instance):** 25 mount windows summed per sample. `performance.now()` resolves to
  5 µs even cross-origin-isolated; a single Divider mount is tens of microseconds. Summing 25
  puts each sample where quantisation is noise, not signal. Identical on both legs.
- **C/D (100 instances):** 1 window per sample.
- **E:** 100 instances mounted and laid out untimed, then the timed window is the state-prop
  flip. Per component: Divider `appearance→brand`, Badge `filled→outline`, Switch
  `checked→true`, Button `disabled→true`, Avatar `shape→square`.
- 5 warm-up windows discarded, then **31 measured** (unthrottled) / 21 (4× throttled and
  React Profiler). Median and p75 reported, with IQR/median as the spread figure.

### The override scenarios (B and D)

The spec requires the BEFORE leg's `mergeClasses` to do real work and the AFTER leg to
arbitrate an equivalent conflict in the cascade. Both override files declare the **same 22
properties with the same values across the same four altitudes**, with deliberate
cross-altitude collisions (`background-color` between altitudes 1–2, `font-size` between 1–3,
`color` between 1–4, the four radii between 3–4):

| Altitude   | BEFORE               | AFTER                      |
| ---------- | -------------------- | -------------------------- |
| app global | `makeStyles` slice 1 | `@layer fui.components.l3` |
| page rules | `makeStyles` slice 2 | `@layer fui.components.l4` |
| utility    | `makeStyles` slice 3 | `@layer fui.utilities`     |
| consumer   | `makeStyles` slice 4 | unlayered rule             |

BEFORE merges the four with `mergeClasses` and passes one className, which the component's own
`useXStyles_unstable` then has to sequence-parse, property-map and dedup against its own
atomics — for Button that is a 16-argument `mergeClasses` on the root fed by 7 `useStyles`
hooks. AFTER passes a 4-token string (`ovr-app ovr-page ovr-util ovr-consumer`); all
arbitration happens in the cascade.

---

## Validity checks

These ran before any timing was believed.

1. **Both legs render the same thing.** For all 5 components × {plain, overridden, toggled},
   the component element's computed values for 14 properties (`display`, `color`,
   `background-color`, `font-size`, `font-weight`, `line-height`, `padding-top`,
   `padding-left`, `border-top-left-radius`, `border-top-width`, `min-width`, `height`,
   `box-shadow`, `opacity`) and its `getBoundingClientRect()` were compared between legs.
   **Zero mismatches in 15/15 cells.** The overridden boxes differ from the plain ones on both
   legs, which proves the overrides actually take effect rather than being silently dropped.

2. **The stylesheet surfaces were equalised.** The AFTER bundle ships one static stylesheet
   containing every converted component's CSS from page load; Griffel injects lazily on first
   render. Left alone, the BEFORE document would have held only the rules for the component
   under test and every AFTER recalculation number would have been inflated by CSS the BEFORE
   leg had not loaded. The harness therefore renders one plain and one overridden instance of
   all five components at bootstrap, before any warm-up, forcing Griffel to inject the same
   breadth. Result:

   | Leg    | Sheets | Style rules | Selectors | `[data-*]` selectors | `:where()` selectors | Selector chars | CSS chars |
   | ------ | -----: | ----------: | --------: | -------------------: | -------------------: | -------------: | --------: |
   | before |     10 |         653 |       716 |                   26 |                    0 |         12,925 |    68,875 |
   | after  |      5 |         454 |       637 |                  128 |                  205 |         22,903 |    93,073 |

   The AFTER leg matches **fewer** rules and **fewer** selectors — its penalty is that each
   selector is bigger and more of them are attribute- or `:where()`-qualified.

3. **The style-recalculation scope is identical.** The Chrome trace reports the same
   `elementCount` recalculated on both legs in all 15 traced cells (Button E: 2,000 both;
   Switch E: 11,000 both). Nothing about the AFTER leg invalidates a _wider_ subtree. Every
   regression below is **cost per element recalculated**.

4. **Two independent methods agree.** Wall-clock `style+layout` and the trace's
   `UpdateLayoutTree` duration give the same story to within a few points (Button E: +173.8%
   wall-clock vs +198.0% trace; Switch E: +204.3% vs +227.6%), and the 4× CPU-throttled run
   reproduces it again (+149.7% / +183.5% end-to-end).

---

## Results

### 1. Headline — total window (commit + forced style/layout), median ms

| Component | Sc  | Before median (ms) | After median (ms) | Δ median | Before p75 | After p75 |   Δ p75 | Before IQR/med | After IQR/med | Verdict    |
| --------- | --- | -----------------: | ----------------: | -------: | ---------: | --------: | ------: | -------------: | ------------: | :--------- |
| Divider   | A   |              0.915 |             0.760 |   -16.9% |      1.087 |     0.858 |  -21.1% |        26.230% |       17.434% | faster     |
| Divider   | B   |              0.845 |             0.765 |    -9.5% |      0.900 |     0.845 |   -6.1% |         9.763% |       12.745% | faster     |
| Divider   | C   |              2.210 |             2.270 |    +2.7% |      2.725 |     2.325 |  -14.7% |        35.860% |       25.110% | flat       |
| Divider   | D   |              2.145 |             1.885 |   -12.1% |      2.180 |     2.005 |   -8.0% |         3.613% |        8.090% | faster     |
| Divider   | E   |              1.210 |             1.300 |    +7.4% |      1.270 |     1.340 |   +5.5% |         7.438% |        5.577% | **slower** |
| Badge     | A   |              0.765 |             0.630 |   -17.6% |      0.948 |     0.745 |  -21.4% |        29.412% |       27.778% | faster     |
| Badge     | B   |              0.710 |             0.580 |   -18.3% |      0.767 |     0.605 |  -21.2% |        10.915% |        7.759% | faster     |
| Badge     | C   |              1.610 |             1.340 |   -16.8% |      1.935 |     1.377 |  -28.8% |        42.547% |       18.284% | faster     |
| Badge     | D   |              1.400 |             1.090 |   -22.1% |      1.452 |     1.135 |  -21.9% |         9.107% |        7.798% | faster     |
| Badge     | E   |              0.665 |             0.685 |    +3.0% |      0.740 |     0.767 |   +3.7% |        12.782% |       14.234% | flat       |
| Switch    | A   |              1.810 |             1.715 |    -5.2% |      2.167 |     2.018 |   -6.9% |        29.972% |       36.297% | faster     |
| Switch    | B   |              1.745 |             1.615 |    -7.4% |      3.072 |     2.700 |  -12.1% |        86.676% |       82.353% | faster     |
| Switch    | C   |              3.430 |             3.295 |    -3.9% |      4.060 |     3.875 |   -4.6% |        22.741% |       23.369% | flat       |
| Switch    | D   |              3.410 |             3.210 |    -5.9% |      3.567 |     3.428 |   -3.9% |         9.091% |        9.034% | faster     |
| Switch    | E   |              4.325 |            11.130 |  +157.3% |      4.787 |    11.565 | +141.6% |        15.145% |        6.289% | **slower** |
| Button    | A   |              0.870 |             0.565 |   -35.1% |      0.955 |     0.618 |  -35.3% |        18.104% |       18.142% | faster     |
| Button    | B   |              0.770 |             0.540 |   -29.9% |      0.865 |     0.563 |  -35.0% |        17.208% |        8.796% | faster     |
| Button    | C   |              1.865 |             0.905 |   -51.5% |      2.640 |     1.383 |  -47.6% |        56.837% |       63.812% | faster     |
| Button    | D   |              1.760 |             0.945 |   -46.3% |      1.833 |     1.030 |  -43.8% |         8.239% |       11.640% | faster     |
| Button    | E   |              3.275 |             8.120 |  +147.9% |      3.647 |     8.455 | +131.8% |        13.435% |        8.005% | **slower** |
| Avatar    | A   |              1.065 |             0.740 |   -30.5% |      1.260 |     0.875 |  -30.6% |        31.455% |       24.662% | faster     |
| Avatar    | B   |              0.935 |             0.695 |   -25.7% |      1.018 |     0.743 |  -27.0% |        15.775% |        9.712% | faster     |
| Avatar    | C   |              2.210 |             1.935 |   -12.4% |      3.165 |     1.970 |  -37.8% |        51.131% |       18.992% | faster     |
| Avatar    | D   |              2.130 |             1.475 |   -30.8% |      2.292 |     1.540 |  -32.8% |        10.798% |        8.644% | faster     |
| Avatar    | E   |              0.835 |             0.960 |   +15.0% |      0.868 |     1.000 |  +15.3% |         7.485% |        5.990% | **slower** |

A window is 25 mounts for A/B and 100 instances for C/D/E; `perUnitUs` in the JSON gives the
normalised per-instance figure.

### 2. Where the time moved — commit vs style/layout, median ms

| Component | Sc  | Commit before | Commit after | Δ commit | Style+layout before | Style+layout after | Δ style+layout |
| --------- | --- | ------------: | -----------: | -------: | ------------------: | -----------------: | -------------: |
| Divider   | A   |         0.435 |        0.230 |   -47.1% |               0.495 |              0.535 |          +8.1% |
| Divider   | B   |         0.340 |        0.200 |   -41.2% |               0.495 |              0.570 |         +15.2% |
| Divider   | C   |         0.835 |        0.615 |   -26.3% |               1.270 |              1.635 |         +28.7% |
| Divider   | D   |         0.720 |        0.395 |   -45.1% |               1.415 |              1.495 |          +5.7% |
| Divider   | E   |         0.410 |        0.250 |   -39.0% |               0.790 |              1.045 |         +32.3% |
| Badge     | A   |         0.370 |        0.180 |   -51.4% |               0.410 |              0.440 |          +7.3% |
| Badge     | B   |         0.310 |        0.150 |   -51.6% |               0.400 |              0.430 |          +7.5% |
| Badge     | C   |         0.855 |        0.390 |   -54.4% |               0.800 |              0.930 |         +16.3% |
| Badge     | D   |         0.600 |        0.220 |   -63.3% |               0.790 |              0.865 |          +9.5% |
| Badge     | E   |         0.270 |        0.195 |   -27.8% |               0.400 |              0.490 |         +22.5% |
| Switch    | A   |         1.065 |        0.920 |   -13.6% |               0.765 |              0.815 |          +6.5% |
| Switch    | B   |         0.960 |        0.765 |   -20.3% |               0.770 |              0.835 |          +8.4% |
| Switch    | C   |         1.945 |        1.560 |   -19.8% |               1.470 |              1.740 |         +18.4% |
| Switch    | D   |         1.845 |        1.425 |   -22.8% |               1.545 |              1.795 |         +16.2% |
| Switch    | E   |         0.930 |        0.805 |   -13.4% |               3.400 |             10.345 |        +204.3% |
| Button    | A   |         0.505 |        0.220 |   -56.4% |               0.350 |              0.340 |          -2.9% |
| Button    | B   |         0.420 |        0.170 |   -59.5% |               0.350 |              0.370 |          +5.7% |
| Button    | C   |         1.290 |        0.325 |   -74.8% |               0.580 |              0.550 |          -5.2% |
| Button    | D   |         1.025 |        0.310 |   -69.8% |               0.715 |              0.635 |         -11.2% |
| Button    | E   |         0.450 |        0.330 |   -26.7% |               2.840 |              7.775 |        +173.8% |
| Avatar    | A   |         0.600 |        0.290 |   -51.7% |               0.440 |              0.455 |          +3.4% |
| Avatar    | B   |         0.485 |        0.240 |   -50.5% |               0.430 |              0.470 |          +9.3% |
| Avatar    | C   |         1.475 |        0.855 |   -42.0% |               0.770 |              1.065 |         +38.3% |
| Avatar    | D   |         1.250 |        0.525 |   -58.0% |               0.875 |              0.940 |          +7.4% |
| Avatar    | E   |         0.415 |        0.365 |   -12.0% |               0.420 |              0.600 |         +42.9% |

### 3. Chrome trace — style recalculation and layout, ms per iteration

| Component | Sc  | Recalc before | Recalc after | Δ recalc | Elements recalculated before | after | Layout before | Layout after | Δ layout |
| --------- | --- | ------------: | -----------: | -------: | ---------------------------: | ----: | ------------: | -----------: | -------: |
| Divider   | C   |         0.696 |        0.906 |   +30.1% |                         4000 |  4000 |         0.645 |        0.583 |    -9.5% |
| Divider   | D   |         0.729 |        0.940 |   +28.9% |                         4000 |  4000 |         0.603 |        0.685 |   +13.6% |
| Divider   | E   |         1.442 |        1.885 |   +30.7% |                         7000 |  7000 |         0.531 |        0.528 |    -0.5% |
| Badge     | C   |         0.338 |        0.435 |   +28.6% |                         2000 |  2000 |         0.396 |        0.404 |    +2.1% |
| Badge     | D   |         0.360 |        0.465 |   +29.2% |                         2000 |  2000 |         0.409 |        0.457 |   +11.8% |
| Badge     | E   |         0.657 |        0.913 |   +38.9% |                         4000 |  4000 |         0.341 |        0.425 |   +24.7% |
| Switch    | C   |         0.816 |        1.039 |   +27.4% |                         6000 |  6000 |         0.791 |        0.785 |    -0.8% |
| Switch    | D   |         0.907 |        1.136 |   +25.2% |                         6000 |  6000 |         0.938 |        0.912 |    -2.8% |
| Switch    | E   |         3.175 |       10.402 |  +227.6% |                        11000 | 11000 |         1.367 |        1.358 |    -0.7% |
| Button    | C   |         0.221 |        0.262 |   +18.4% |                         1000 |  1000 |         0.386 |        0.362 |    -6.2% |
| Button    | D   |         0.259 |        0.297 |   +15.1% |                         1000 |  1000 |         0.395 |        0.455 |   +15.0% |
| Button    | E   |         2.607 |        7.769 |  +198.0% |                         2000 |  2000 |         0.388 |        0.406 |    +4.6% |
| Avatar    | C   |         0.408 |        0.572 |   +40.3% |                         2000 |  2000 |         0.448 |        0.379 |   -15.4% |
| Avatar    | D   |         0.435 |        0.575 |   +31.9% |                         2000 |  2000 |         0.403 |        0.496 |   +23.2% |
| Avatar    | E   |         0.840 |        1.106 |   +31.7% |                         4000 |  4000 |         0.429 |        0.331 |   -22.9% |

**Layout is a non-event** — it moves both directions by small amounts and never explains a
result. Every regression in this evaluation is style _recalculation_.

### 4. React Profiler `actualDuration` and 4× CPU throttling, median ms

| Component | Sc  | Profiler before | Profiler after |      Δ | 4× total before | 4× total after |       Δ |
| --------- | --- | --------------: | -------------: | -----: | --------------: | -------------: | ------: |
| Divider   | A   |           0.205 |          0.200 |  -2.4% |           6.025 |          4.665 |  -22.6% |
| Divider   | B   |           0.155 |          0.150 |  -3.2% |           5.225 |          4.375 |  -16.3% |
| Divider   | C   |           0.770 |          0.590 | -23.4% |           9.275 |          8.235 |  -11.2% |
| Divider   | D   |           0.410 |          0.415 |  +1.2% |           9.460 |          8.825 |   -6.7% |
| Divider   | E   |           0.220 |          0.225 |  +2.3% |           5.615 |          5.670 |   +1.0% |
| Badge     | A   |           0.180 |          0.160 | -11.1% |           5.120 |          4.175 |  -18.5% |
| Badge     | B   |           0.120 |          0.105 | -12.5% |           4.915 |          3.485 |  -29.1% |
| Badge     | C   |           0.530 |          0.230 | -56.6% |           5.855 |          4.620 |  -21.1% |
| Badge     | D   |           0.235 |          0.240 |  +2.1% |           6.505 |          4.670 |  -28.2% |
| Badge     | E   |           0.180 |          0.280 | +55.6% |           2.995 |          3.195 |   +6.7% |
| Switch    | A   |           0.910 |          0.905 |  -0.5% |          13.610 |         12.445 |   -8.6% |
| Switch    | B   |           0.750 |          0.590 | -21.3% |          11.155 |         10.320 |   -7.5% |
| Switch    | C   |           1.650 |          1.565 |  -5.2% |          16.375 |         16.200 |   -1.1% |
| Switch    | D   |           1.470 |          1.495 |  +1.7% |          16.910 |         15.730 |   -7.0% |
| Switch    | E   |           0.740 |          0.640 | -13.5% |          21.150 |         59.970 | +183.5% |
| Button    | A   |           0.215 |          0.180 | -16.3% |           5.550 |          3.905 |  -29.6% |
| Button    | B   |           0.335 |          0.120 | -64.2% |           4.670 |          3.480 |  -25.5% |
| Button    | C   |           0.330 |          0.315 |  -4.5% |           7.250 |          4.070 |  -43.9% |
| Button    | D   |           0.330 |          0.320 |  -3.0% |           7.900 |          4.845 |  -38.7% |
| Button    | E   |           0.245 |          0.240 |  -2.0% |          16.730 |         41.775 | +149.7% |
| Avatar    | A   |           0.280 |          0.265 |  -5.4% |           6.670 |          5.210 |  -21.9% |
| Avatar    | B   |           0.205 |          0.185 |  -9.8% |           5.945 |          4.365 |  -26.6% |
| Avatar    | C   |           0.710 |          0.560 | -21.1% |           9.505 |          6.625 |  -30.3% |
| Avatar    | D   |           0.535 |          0.520 |  -2.8% |          10.075 |          7.100 |  -29.5% |
| Avatar    | E   |           0.335 |          0.530 | +58.2% |           3.850 |          4.585 |  +19.1% |

Profiler numbers come from a `react-dom/profiling` build of the same harness, so `<Profiler>`
reports real `actualDuration` at production speed.

**Read the Profiler column carefully — it is much flatter than the commit column, and that is
itself a finding.** `actualDuration` covers the render phase only. Griffel's per-instance
style insertion runs in `useInsertionEffect`, which fires in the **commit** phase. So the
BEFORE leg's `mergeClasses` cache hits look cheap to the Profiler while the insertion-effect
bookkeeping it still performs — 7 style hooks per Button, on every instance, on every commit —
lands in the commit window instead. Anyone who has previously profiled Griffel with
`<Profiler>` alone and concluded it was cheap was measuring the wrong phase.

### 5. DOM accounting, per instance

| Component | Sc  | Attrs before | after | `data-*` before | after | class chars before | after | class tokens before | after |
| --------- | --- | -----------: | ----: | --------------: | ----: | -----------------: | ----: | ------------------: | ----: |
| Divider   | C   |            6 |     8 |               0 |     2 |                357 |   100 |                  40 |     4 |
| Divider   | D   |            6 |     8 |               0 |     2 |                510 |   139 |                  58 |     8 |
| Badge     | C   |            1 |     2 |               0 |     1 |                 45 |    79 |                   5 |     3 |
| Badge     | D   |            1 |     2 |               0 |     1 |                213 |   118 |                  25 |     7 |
| Switch    | C   |           18 |    22 |               0 |     4 |                253 |   277 |                  25 |    14 |
| Switch    | D   |           18 |    22 |               0 |     4 |                449 |   316 |                  48 |    18 |
| Button    | C   |            2 |     3 |               0 |     1 |                 19 |    42 |                   2 |     2 |
| Button    | D   |            2 |     3 |               0 |     1 |                215 |    81 |                  25 |     6 |
| Avatar    | C   |            6 |     7 |               0 |     1 |                 74 |   137 |                   7 |     5 |
| Avatar    | D   |            6 |     7 |               0 |     1 |                270 |   176 |                  30 |     9 |

The AFTER leg adds **1–4 `data-*` attributes per instance** and removes class tokens. In the
**overridden** case — the realistic one for a consumer applying overrides — the AFTER
className string is much shorter for every component (Button 215 → 81 chars, 25 → 6 tokens).
In the **plain-defaults** case the AFTER string is longer for 4 of 5 components, because
Griffel collapses default styling into a single `makeResetStyles` class (a plain Button is
literally `class="fui-Button r1f29ykk"`) while CSS-Modules names are verbose.

None of this shows up as a cost. The extra attributes are written during commit, and commit is
faster on the AFTER leg in every cell.

### 6. Harness bundle size (secondary; `metrics/` owns the authoritative bundle numbers)

| Leg    |      JS |    CSS |   Total |
| ------ | ------: | -----: | ------: |
| before | 366,641 |      0 | 366,641 |
| after  | 275,693 | 71,646 | 347,339 |

−5.26% for an app importing all five components plus FluentProvider.

---

## Analysis

### The win: `mergeClasses` really was expensive

Commit time is faster on the AFTER leg in **all 25 cells**, median −45.1%. It scales with how
much `mergeClasses` had to do:

- Button root: `mergeClasses` with **16 arguments** fed by **7 `useStyles` hook calls**, plus
  a 5-argument merge on the icon slot → `clsx` with 5 arguments and 6 `data-*` writes.
  100 plain mounts: **1.290 ms → 0.325 ms (−74.8%)**.
- Badge, whose Griffel implementation is enum-heavy: **−54.4% (C)**, **−63.3% (D)**.
- Switch, which does the least merging of the five (a large share of its commit cost is 6 DOM
  elements per instance, unchanged by the migration): only **−19.8% (C)**.

The override scenarios support the mechanism. At 100 instances, the commit-time win is
**larger** with consumer overrides present than without, for four of five components:

| Component | C (plain) | D (overridden) |
| --------- | --------: | -------------: |
| Divider   |    −26.3% |         −45.1% |
| Badge     |    −54.4% |         −63.3% |
| Switch    |    −19.8% |         −22.8% |
| Avatar    |    −42.0% |         −58.0% |
| Button    |    −74.8% |         −69.8% |

Button is the exception, and plausibly because its plain case is already dominated by the
16-argument merge — there is little headroom left for a consumer class to add.

One methodological note on this table: scenarios run A→E within a single page load, so later
scenarios are warmer than earlier ones. Comparing C against D _within a leg_ is therefore not
safe. Comparing the _between-leg delta_ at C against the between-leg delta at D is safe,
because the warming applies identically to both legs — and that is what the figures above are.

### The cost: layered `:where()` + attribute selectors match more slowly

Style recalculation is slower on the AFTER leg in **every traced cell**, median +28.7% on
mount, with an identical number of elements recalculated. The converted stylesheet is
structurally different in exactly the way that predicts this:

|                                 | before |  after |
| ------------------------------- | -----: | -----: |
| style rules                     |    653 |    454 |
| selectors                       |    716 |    637 |
| selectors containing `[data-*]` |     26 |    128 |
| selectors containing `:where()` |      0 |    205 |
| total selector characters       | 12,925 | 22,903 |

Griffel emits flat single-class atomic selectors (`.f1ewtqcl`), which Blink matches out of a
class-keyed bucket almost for free. The converted CSS emits fewer but far heavier selectors —
`.fuicm-Button-module__root--p9Rg:where([disabled], [data-disabled], :disabled, [data-disabled-focusable])`
is one rule, but matching it means evaluating a four-alternative selector list, three of whose
alternatives are attribute selectors. Per shipped stylesheet:

| Package       | Selectors | `[data-*]` | `:where()` | Sibling combinators |
| ------------- | --------: | ---------: | ---------: | ------------------: |
| react-button  |        97 |         28 |         70 |                   1 |
| react-switch  |        76 |         30 |         45 |                  22 |
| react-divider |        44 |         16 |         16 |                   0 |
| react-badge   |        79 |         19 |         19 |                   0 |
| react-avatar  |       161 |         30 |         50 |                   0 |

On mount this is comfortably outweighed by the commit win. It is not on update.

### The scenario-E cliff

Scenario E is the only place the migration loses badly, and the data separates the cause
cleanly. The five components split into two groups by **what their toggle changes**:

| Component  | What the AFTER leg's toggle changes                                  | Δ style+layout | Δ trace recalc |
| ---------- | -------------------------------------------------------------------- | -------------: | -------------: |
| Divider    | adds a CSS-Modules class (`__brand`)                                 |         +32.3% |         +30.7% |
| Badge      | swaps CSS-Modules classes (`filled-brand` → `outline outline-brand`) |         +22.5% |         +38.9% |
| Avatar     | adds a CSS-Modules class (`__square`)                                |         +42.9% |         +31.7% |
| **Button** | **writes `data-disabled="true"`; className unchanged**               |    **+173.8%** |    **+198.0%** |
| **Switch** | **flips native `checked`; className and `data-*` unchanged**         |    **+204.3%** |    **+227.6%** |

The class-toggling three land at +22% to +43% — the same magnitude as their mount-path
recalculation penalty. Nothing special happens on update for them.

Button and Switch are 4–7× worse than that, and the reason is the **shape of the state
selectors**, not the attributes on the element:

```css
/* react-button/dist/styles.css — 28 rules of this shape */
.fuicm-Button-module__root--p9Rg:where([disabled], [data-disabled], :disabled, [data-disabled-focusable])

/* react-switch/dist/styles.css — 30 rules of this shape, 22 with a sibling combinator */
.fuicm-Switch-module__input--EVJr:where([data-checked], :checked) ~ .fuicm-Switch-module__indicator--ivKK > *
```

The Griffel originals expressed the same states with plain pseudo-classes and, crucially,
**decided the state in JavaScript**: `useRootDisabledStyles` is a set of ordinary property
blocks whose classes JS adds when `disabled` is true. Toggling `disabled` on the BEFORE leg is
a class-list change against flat atomic selectors. On the AFTER leg it is an attribute/state
change against a selector list that must be re-evaluated.

**Switch is the decisive case.** `react-switch` never writes `data-checked` anywhere — its
only `data-*` attributes are `data-orientation`, `data-size`, `data-label-position` on the root
and `data-size` on the label, and none of them change when `checked` flips. Scenario E for
Switch mutates exactly one thing: the native `checked` state of an `<input type="checkbox">`.
It is still **+204.3%**. So the cost cannot be attributed to writing data attributes; it is the
cost of matching `:where([data-checked], :checked)` — a two-alternative list where Griffel had
a bare `:checked` — multiplied across 30 rules, 22 of which also carry a general sibling
combinator.

This is the honest answer to the question that motivated the evaluation. The data attributes
themselves are not what hurts. **Adding `[data-*]` alternatives to state selectors is.**

### Cold start

The first (discarded) window after the styles have been pre-injected shows no systematic
first-render penalty on either leg on the mount scenarios; Button C is −48.9% cold, in line
with its steady-state −51.5%. Scenario E's cold window reproduces the cliff (Button +111.9%,
Switch +192.5%), confirming it is not a warm-cache artefact. Cold numbers are in the JSON
(`coldFirstWindowMs`) and are noisier than the medians — treat them as directional.

---

## Bottom line per scenario

| Sc    | Scenario              | Verdict                                                                                                                                                                                                                                                                             |
| ----- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A** | Mount 1, plain        | **Faster on all 5.** −5.2% (Switch) to −35.1% (Button). Fixed per-component overhead genuinely dropped.                                                                                                                                                                             |
| **B** | Mount 1, overridden   | **Faster on all 5.** −7.4% to −29.9%. `mergeClasses` doing real work is exactly where the AFTER leg pulls ahead.                                                                                                                                                                    |
| **C** | Mount 100, plain      | **Faster on 3, flat on 2.** −51.5% (Button) to +2.7% (Divider). Commit wins everywhere; on Divider and Switch the +28% recalculation penalty eats the win.                                                                                                                          |
| **D** | Mount 100, overridden | **Faster on all 5.** −5.9% to −46.3%. The at-scale worst case is the migration's best showing — every component improves.                                                                                                                                                           |
| **E** | Re-render 100         | **Slower on 4, flat on 1.** Class-toggling components are flat to mildly slower: Badge +3.0% (flat), Divider +7.4%, Avatar +15.0%. Components whose state selectors carry `[data-*]` alternatives fall off a cliff: **Button +147.9%**, **Switch +157.3%**. This is the regression. |

---

## Caveats and uncontrolled variance

- **Single machine, single session, headless Chromium.** Absolute milliseconds are not
  portable; only the paired deltas are. Legs were interleaved per component to keep drift from
  masquerading as a leg difference. The suite was run three times; across those runs Switch E's
  style+layout penalty was +206.6% / +205.8% / +204.3% and Button E's was +221.4% / +227.0% /
  +173.8% (the third run is the one reported here, taken after the stylesheet-equalisation
  change described below). The cliff is reproducible; its exact magnitude for Button is not
  stable to better than ~50 points.
- **Spread is high on some cells.** Switch B has IQR/median near 87% on both legs — it is the
  noisiest cell in the matrix and its −7.4% should not be leaned on. Scenario C cells run
  20–64% IQR/median because a 100-instance mount competes with whatever else the renderer is
  doing. The C/D/E medians for Button, Badge and Avatar sit far outside their spread; the small
  Divider and Switch C/D deltas do not, and are reported as flat.
- **Timer granularity is 5 µs** (verified in-page, cross-origin isolated). Scenario A/B samples
  sum 25 mounts to stay well clear of it.
- **`useInsertionEffect` attribution.** The BEFORE leg's Griffel insertion bookkeeping lands in
  the commit window, not in `actualDuration`. That is a true cost of the mechanism, but it does
  mean the commit column is not purely "className computation".
- **Non-target dependencies are pinned to HEAD for both legs** (`react-theme`,
  `react-utilities`, `react-tabster`, …). Those files are identical between the two commits, so
  this is a control, not a confound — but a Griffel focus-outline change landing in
  `react-tabster` later would not be captured here.
- **The AFTER leg carries the whole harness's CSS from page load; the BEFORE leg was forced to
  pre-inject the same breadth** so the surfaces are comparable. Without that step, the median
  style-recalculation penalty across the ten mount cells (C and D) measured **+36.7%**; with it,
  **+28.7%**. Those two figures come from different runs, so part of the 8-point gap is
  run-to-run noise — but the direction is right and roughly a fifth of the naive mount-path
  regression was harness artefact rather than migration cost.
- **`data-*` attributes were not measured in isolation from selector shape** for Button, where
  both change together. Switch supplies the isolation (selector shape changes, attributes do
  not) and shows the same magnitude, which is why the report attributes the cliff to selector
  shape. A direct experiment — republishing Button's CSS without the `[data-disabled]`
  alternative and re-running E — would settle it conclusively and is not done here.
- **Scenario E toggles a different prop per component** by necessity. Comparisons across
  components in scenario E are therefore weaker than comparisons between legs within a
  component.

---

## Follow-ups this evaluation suggests

1. **Audit `[data-*]` alternatives in state selectors, starting with `react-switch`.** Its
   `:where([data-checked], :checked)` pattern is on 30 rules and `data-checked` is never
   written by the component. If it exists only as a consumer escape hatch, the cost/benefit is
   poor: it is buying an unused hook for a 3× style-recalculation penalty on every toggle.
2. **Do the same for `react-button`'s `:where([disabled], [data-disabled], :disabled,
[data-disabled-focusable])`.** `[disabled]` and `:disabled` are duplicates of each other on a
   `<button>`; `data-disabled` duplicates the native attribute the component already writes.
   `data-disabled-focusable` is the only alternative that carries information the others do not.
3. **Add an update-path scenario to whatever perf gate ships with this migration.** Every
   regression found here is on the update path, and all four mount scenarios would have passed
   a gate that only measured mounts.
4. **Re-run this evaluation after the Phase 3 D14 hook rewrite** (pure non-mutating hooks). The
   `data-*` writes measured here happen via direct mutation of `state.root`; the functional
   rewrite changes that code path.

---

## Reproduction

Everything lives in `.scratch/perf-eval/` (gitignored, not part of the deliverable):

```
before-tree/          git worktree at 838ce80485, node_modules junctioned from the main tree
harness/              the Vite harness (one source, built per leg)
dist/{before,after,before-prof,after-prof}/
run.mjs               Playwright driver: timing, timing-4x, profiler, dom, trace passes
analyze.mjs           writes ../../migration/griffel-to-tailwind/metrics/perf-eval/*.json
tables.mjs            regenerates the markdown tables in this report
results/              raw pass output + summary.txt
```

```sh
cd .scratch/perf-eval/harness
for leg in after before; do for prof in 0 1; do
  PERF_LEG=$leg PERF_PROFILING=$prof node ../../../node_modules/vite/bin/vite.js build
done; done
cd .. && node run.mjs && node analyze.mjs && node tables.mjs
```

The BEFORE worktree needed one unrelated fix to build: `packages/react-conformance`'s
`tsconfig.lib.json` lacks `esModuleInterop`, so its `.d.ts` emission fails against the shared
`chalk` types. `react-conformance` is a devDependency of every component package and its
failure blocks nx's `^build`; adding `esModuleInterop: true` in the worktree copy only is
sufficient and touches nothing in the runtime dependency closure.

---

## CORRECTION (2026-07-28, variant-matrix follow-up — metrics/perf-eval/variants/)

The selector-matching attribution above is **refuted by direct experiment**. A
six-leg CSS-variant matrix on Switch scenario E (pooled n=93/leg, all legs
verified computed-style + geometry equivalent, within-leg IQR 0.625–0.830ms
vs 0.440ms total between-leg spread):

| Leg                                                 | Median (ms) | Δ vs current |
| --------------------------------------------------- | ----------: | -----------: |
| current (dual `[data-*], :native` alternatives)     |      11.605 |            — |
| native-only (no `[data-*]` alternatives)            |      11.165 |        −3.8% |
| data-only + attribute write                         |      11.310 |        −2.5% |
| named-group compiled shape (root class + root attr) |      11.585 |        −0.2% |
| self-scoped ceiling (attr on styled element)        |      11.270 |        −2.9% |

**Selector policy is not the lever.** Removing every `[data-*]` alternative,
every sibling combinator, and 36% of selector text moves nothing outside noise.
The named-group shape (nyt-games pattern) is equal-at-best — and worst on trace
attribution, recalculating 12,000 elements vs 11,000 (root-stamped class +
attribute widens invalidation) while reintroducing an un-hashed global class.

**The scenario-E cliff is transition processing.** Diagnostic legs: stripping
`transition-*` declarations drops the after leg 11.605 → 2.110ms. Re-running
BOTH original bundles with `transition-property: none` forced:

| Leg              | As shipped | Transitions suppressed | Attributable to transitions |
| ---------------- | ---------: | ---------------------: | --------------------------: |
| before (Griffel) |      4.380 |                  2.353 |                 2.027 (46%) |
| after (migrated) |     11.535 |                  2.545 |                 8.990 (78%) |

With transitions suppressed the migration's re-render penalty is **+8.2%** — the
ordinary mount-path selector cost. The declared transitions are byte-identical
across legs, yet cost 4.4× more in the migrated CSS. One contributor is
isolated: Griffel emitted literal `translateX(20px)`; the migration emits
`translateX(calc(20px * var(--base-scale)))` — collapsing that indirection
(equivalence-verified) recovers ~1ms of the ~9ms. **The remaining ~8ms is
unexplained** and is the next experiment; it is flagged, not guessed at.

Consequences for the follow-ups listed above: the "dead selector weight" sweep
is demoted — `[data-checked]` alternatives on Switch are still dead code by
inspection, but removing them is hygiene, not performance. The open perf
question is now entirely about transition/var() indirection in transitioned
properties.

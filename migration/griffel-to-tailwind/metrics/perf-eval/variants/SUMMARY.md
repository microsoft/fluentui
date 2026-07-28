# Switch scenario-E selector-policy experiment

Follow-up to `migration/griffel-to-tailwind/reports/perf-eval.md` §"The scenario-E cliff".
Measured 2026-07-28, one machine, one browser session, all legs prepared before any
measurement and then run back to back. Scenario E only (toggle `checked` across 100 mounted
Switch instances), 5 discarded warm-ups + 31 measured windows per cell,
3 repetitions with the leg order reshuffled each time from seed `20260728`.

---

## Bottom line

**No selector policy makes any difference.** All five candidates and the control land inside
a 0.5 ms band around 11.4 ms. The named-group hypothesis is answered: it is not faster.

**The cliff is not selector matching at all — it is CSS transitions.** With transitions
suppressed, the original BEFORE and AFTER bundles measure **2.353 ms vs 2.545 ms** — the
+157% scenario-E regression collapses to **+8.2%**.

---

## 1. Candidate policies — the answer to the question

Median of all pooled samples (n = 93 per leg), plus IQR as a spread figure.
Every leg below is computed-style and geometry equivalent to `current` in BOTH checked states.

| Leg            | Median (ms) | Δ vs current |    p25 |    p75 |   IQR | IQR/med | Commit | Style+layout |
| -------------- | ----------: | -----------: | -----: | -----: | ----: | ------: | -----: | -----------: |
| `current`      |  **11.605** |            — | 11.390 | 12.025 | 0.635 |    5.5% |  0.890 |       10.690 |
| `current-flat` |  **11.305** |        -2.6% | 11.085 | 11.710 | 0.625 |    5.5% |  0.890 |       10.380 |
| `native-only`  |  **11.165** |        -3.8% | 10.940 | 11.575 | 0.635 |    5.7% |  0.855 |       10.330 |
| `data-write`   |  **11.310** |        -2.5% | 11.020 | 11.660 | 0.640 |    5.7% |  0.910 |       10.295 |
| `named-group`  |  **11.585** |        -0.2% | 11.325 | 11.955 | 0.630 |    5.4% |  0.960 |       10.525 |
| `self-scoped`  |  **11.270** |        -2.9% | 11.000 | 11.830 | 0.830 |    7.4% |  0.990 |       10.275 |

Per-repetition medians, to show the ordering is drift and not signal:

| Leg            |  rep 1 |  rep 2 |  rep 3 |
| -------------- | -----: | -----: | -----: |
| `current`      | 11.600 | 11.485 | 11.765 |
| `current-flat` | 11.215 | 11.380 | 11.280 |
| `native-only`  | 11.130 | 11.175 | 11.270 |
| `data-write`   | 11.190 | 11.315 | 11.320 |
| `named-group`  | 11.540 | 11.530 | 11.635 |
| `self-scoped`  | 11.290 | 11.360 | 11.115 |

The spread _within_ a leg (IQR 0.625–0.830 ms) is larger than the entire spread _between_
legs (0.440 ms, 11.165–11.605 ms).
`native-only` is nominally the fastest and `current` the slowest, but the gap is ~0.4 ms on an
11.4 ms window and the ranking is not stable across repetitions.

## 2. Chrome trace — style-recalculation attribution

| Leg                      | Style recalc (ms/iter) | Δ vs current | Layout (ms/iter) | Elements recalculated |
| ------------------------ | ---------------------: | -----------: | ---------------: | --------------------: |
| `current`                |                 10.732 |            — |            1.373 |                 11000 |
| `current-flat`           |                 10.196 |        -5.0% |            1.386 |                 11000 |
| `native-only`            |                 10.167 |        -5.3% |            1.368 |                 11000 |
| `data-write`             |                 10.102 |        -5.9% |            1.361 |                 11000 |
| `named-group`            |                 10.389 |        -3.2% |            1.431 |                 12000 |
| `self-scoped`            |                  9.828 |        -8.4% |            1.345 |                 11000 |
| `diag-no-state`          |                  0.825 |       -92.3% |            0.731 |                  7000 |
| `diag-no-universal`      |                 10.085 |        -6.0% |            1.444 |                 10000 |
| `diag-no-transition`     |                  1.474 |       -86.3% |            1.213 |                 11000 |
| `diag-literal-transform` |                  9.921 |        -7.6% |            1.357 |                 11000 |
| `diag-literal-geometry`  |                  9.614 |       -10.4% |            1.461 |                 11000 |

The traced recalculation agrees with the wall clock: the five candidate policies sit within
~0.9 ms of each other and of the control. Element counts are identical (11,000) for every
candidate except `named-group`, which recalculates 12,000 — moving the state attribute onto
the root widens what the toggle invalidates.

## 3. What the stylesheet actually changed

| Leg            | Selector chars | `[data-*]` sel. | `:where()` | `:is()` | sibling `~` | state alternatives |
| -------------- | -------------: | --------------: | ---------: | ------: | ----------: | -----------------: |
| `current`      |           5432 |              35 |         39 |       0 |          20 |                100 |
| `current-flat` |           5432 |              35 |         39 |       0 |          20 |                100 |
| `native-only`  |           4887 |              16 |         39 |       0 |          20 |                 67 |
| `data-write`   |           4473 |              35 |         39 |       0 |          20 |                 33 |
| `named-group`  |           4011 |              35 |         39 |      21 |           0 |                 33 |
| `self-scoped`  |           3489 |              35 |         27 |       0 |           0 |                 33 |

All six legs carry the same 47 style rules and 48 selectors — only their SHAPE differs.
`self-scoped` removes every sibling combinator and cuts state alternatives from 100 to 33,
a 36% reduction in selector text, and buys nothing.

Representative rule for the thumb transform in each leg:

```css
/* current */
.fuicm-Switch-module__input--EVJr:where([data-checked], :checked) ~ .fuicm-Switch-module__indicator--ivKK > *
/* native-only */
.fuicm-Switch-module__input--EVJr:where(:checked) ~ .fuicm-Switch-module__indicator--ivKK > *
/* data-write */
.fuicm-Switch-module__input--EVJr:where([data-checked]) ~ .fuicm-Switch-module__indicator--ivKK > *
/* named-group */
.fuicm-Switch-module__indicator--ivKK:is(:where(.fui-g-switch[data-checked]) *) > *
/* self-scoped */
.fuicm-Switch-module__indicator--ivKK[data-checked] > *
```

## 4. What each policy writes to the DOM on toggle

| Leg           | Element          | Written on checked                              |
| ------------- | ---------------- | ----------------------------------------------- |
| `current`     | input            | native `checked` only — nothing written         |
| `native-only` | input            | native `checked` only — nothing written         |
| `data-write`  | input            | `data-checked=""`                               |
| `named-group` | root             | static class `fui-g-switch` + `data-checked=""` |
| `self-scoped` | indicator, label | `data-checked=""` on each styled element        |

Attribute writing is not measurably expensive: `data-write`, `named-group` and `self-scoped`
all write attributes that `current` does not, and all three are within noise of it. Commit
time is flat across every leg (≈0.9 ms).

## 5. Attribution — where the 11.4 ms actually goes

These legs deliberately break something and are **not shippable**; they exist only to
bracket the cost. `diag-no-universal`, `diag-literal-transform` and `diag-literal-geometry`
happen to remain fully equivalent; `diag-no-state` and `diag-no-transition` do not.

| Diagnostic leg           | Median (ms) | Δ vs current | Equivalent? | What it removes                                                   |
| ------------------------ | ----------: | -----------: | ----------- | ----------------------------------------------------------------- |
| `diag-no-state`          |   **1.010** |       -91.3% | no          | every checked/disabled rule deleted — the floor                   |
| `diag-no-universal`      |  **11.140** |        -4.0% | yes         | `.indicator > *` becomes `.indicator > svg`                       |
| `diag-no-transition`     |   **2.110** |       -81.8% | no          | all `transition-*` declarations                                   |
| `diag-literal-transform` |  **11.490** |        -1.0% | yes         | `translateX(calc(20px * var(--base-scale)))` → `translateX(20px)` |
| `diag-literal-geometry`  |  **10.550** |        -9.1% | yes         | all `--base-scale` / `--spacing` indirection → literals           |

- Removing the **transitions** takes 11.4 ms → 2.110 ms. That is the whole cliff.
- The **universal selector** `> *` costs nothing.
- The **`var(--base-scale)` indirection** in transitioned values costs ~1 ms — real, but ~10%.

## 6. Cross-check against the original BEFORE/AFTER bundles

The Griffel source declares **byte-identical** transitions to the migration:
`transition-property: background, border, color` on the indicator and `transform` on the
thumb, same durations and easing. So the finding above had to be checked against the real
BEFORE leg. `before-check.mjs` drives the main evaluation's already-built bundles and runs
Switch scenario E twice per leg — as shipped, and with `transition-property: none` forced.

| Leg    | As shipped (ms) | Transitions suppressed (ms) | Attributable to transitions |
| ------ | --------------: | --------------------------: | --------------------------: |
| before |           4.380 |                       2.353 |            2.027 ms (46.3%) |
| after  |          11.535 |                       2.545 |            8.990 ms (77.9%) |

As shipped the gap is **+163.4%** (4.380 → 11.535 ms), reproducing the
main evaluation's +157.3%. With transitions suppressed the same two bundles measure
**2.353 ms vs 2.545 ms — +8.2%**, which is the ordinary mount-path selector penalty,
not a cliff.

**The entire scenario-E regression is transition processing.** Both legs declare the same
transitions, but Griffel's cost 2.027 ms and the migration's cost 8.990 ms — 4.4x more for the
same declared animation. The selector-shape difference the main evaluation blamed accounts
for 0.192 ms of the 7.155 ms gap.

## 7. Verdict on named groups

`named-group` measured 11.585 ms against the control's 11.605 ms — -0.2%, inside the noise band. It also
recalculated _more_ elements than any other leg (12,000 vs 11,000) because the static
`fui-g-switch` class and `data-checked` both land on the root, widening what the toggle
invalidates. The expectation that it would not perform better than the current solution is
**confirmed**, and the cost side is real: a completely static, non-CSS-Modules literal class
has to be added to every root, which reintroduces a global un-hashed class name into a
stylesheet whose whole point was scoping.

## 8. Caveats

- Single machine, single session, headless Chromium. Only paired deltas are portable.
- Legs 4 and 5 require a flattened stylesheet. `current-flat` is the validity control for
  that step: it measured 11.305 ms against `current`'s 11.605 ms, so flattening is not a
  confound.
- `native-only` drops only the `[data-*]` alternatives. `[disabled]` and
  `[aria-disabled="true"]` are retained because `disabledFocusable` writes `aria-disabled`
  rather than `disabled`, so the native pseudo-class alone is not equivalent.
- `data-write` writes `data-checked` on the `<input>`, not the root: the shipped selector
  shape anchors state on the input, so a root write would not match. The root-anchored
  root-writing variant is exactly what `named-group` measures.
- Scenario E is not disabled-state exercised, so the `[data-disabled]`-only substitutions in
  `data-write` / `named-group` / `self-scoped` are inert here. They are still in the
  stylesheet and still matched against.
- Why the same declared transitions cost 4.4x more on the migrated stylesheet is NOT settled
  by this experiment. `diag-literal-geometry` shows the `--base-scale` indirection is ~1 ms
  of the ~9 ms. The remaining ~8 ms is unexplained and is the obvious next experiment.

## 9. Reproduction

```sh
cd .scratch/perf-eval/variants
node build-css.mjs && node build-diag-css.mjs
(cd harness && node ../../../../node_modules/vite/bin/vite.js build)
node prepare.mjs
node run.mjs --pass=equivalence,timing,trace --reps=3
node before-check.mjs
node report.mjs
```

Nothing under `packages/` or `migration/` is modified: `build-css.mjs` reads the shipped
`react-switch/library/dist/styles.css` and writes transformed copies into `css/`.

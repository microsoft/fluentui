# Does dual-selector ORDER affect the scenario-E cliff? — No.

Date: 2026-08-04 · Branch: `styling/tailwind-css-modules` · HEAD `8a6cb4143d` ·
Experiment only — nothing here shipped; all CSS edits were post-build transforms inside the
gitignored `.scratch/perf-eval/` harness, `packages/` sources untouched throughout
(`git status` verified identical before and after against a recorded snapshot).

Follow-up to `perf-will-change.md` (whose harness, control bundle, anchor and protocol this
run reuses) and `perf-eval.md` (CORRECTION + post-tightening). Established context taken as
given: the scenario-E cliff is transition processing inside style recalculation; five levers
are tested-dead (selector policy incl. dual-vs-single, named groups, transition tightening,
data-attr write cost, `will-change`). The prior selector-policy legs tested REMOVING one
alternative from the dual selectors; the one untested selector dimension was the ORDER of the
two alternatives within the list. That is what this run measures.

## Bottom line

**Order does not matter.** Swapping the `[data-*]` / native-pseudo alternatives in every dual
list — E-cell scoped (28 swaps) or bundle-wide (30 swaps) — moves scenario-E totals by at
most ±0.48% on the tightened components, inside the Divider drift band (±1.2% in this
session), with per-repetition medians fully interleaved with control. Style recalculation —
where the cliff lives — is flat in the decomposed trace. This is the **sixth tested-dead
lever**, and it closes the selector dimension entirely: neither the presence, the shape, nor
now the order of the dual alternatives is a measurable input to the cliff.

## What the dual selectors actually are (discovery worth recording)

The built CSS contains **zero top-level dual selector lists** (`.x[data-checked], .x:checked`
style — counted programmatically: 0). Every dual pair in the bundle lives inside a functional
pseudo argument list:

```css
:where([data-checked],:checked)
:where([disabled],[data-disabled],:disabled,[aria-disabled=true])
:where(:not([disabled],[data-disabled],:disabled,[aria-disabled=true]))
```

This makes the swap cascade-irrelevant **by construction**: `:where()` contributes zero
specificity regardless of arguments. Every swap site was still classified — all 30 sit inside
a `:where()` context (`zeroSpecificityContext: true` for 30/30) and the two alternatives of
every pair carry equal specificity anyway ((0,1,0) each) — so the excluded-list count is
**0, with no exclusions needed**.

## Design

Same harness, protocol and statistics as the will-change run (`.scratch/perf-eval/`,
scenario E = toggle a state prop across 100 mounted instances, 5 discarded warm-ups + 31
measured windows per cell, leg order reshuffled per cell from seed `20260805`, one
machine-exclusive headless-Chromium session, pooled medians; suppression bracket 3 reps).

| Leg         | Bundle            | What it is                                                                                                                                                                                                                                                   |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **before**  | `dist/before`     | original Griffel bundle — contemporaneous anchor, re-run this session                                                                                                                                                                                        |
| **control** | `dist/wc-control` | migrated bundle built from HEAD — **reused from the will-change run**: the only commit since its build is the report itself (`git diff --stat` shows 1 file, `reports/perf-will-change.md`; no `packages/` change), verified by commit history + dist mtimes |
| **so1**     | `dist/so1`        | control CSS with dual-pair order swapped in the E-cell component families only (Switch + button/compound/menu/split/toggle-button)                                                                                                                           |
| **so1wide** | `dist/so1-wide`   | control CSS with dual-pair order swapped bundle-wide (the transform is a cheap postcss pass, so the wide sub-leg was run too)                                                                                                                                |

control/so1/so1wide share **byte-identical JS**; only the CSS asset differs, and since the
transform is a pure reorder, all three CSS files are exactly **99,423 bytes**.

### The swap (recorded per-site in `.scratch/perf-eval/selector-order/css-diffs.json`)

Within one argument list, for every pair whose data-attribute name minus the `data-` prefix
equals a native state pseudo-class name in the same list, the two alternatives exchange
positions; all other alternatives keep theirs:

```css
:where([data-checked],:checked)                              -> :where(:checked,[data-checked])
:where([disabled],[data-disabled],:disabled,[aria-disabled=true])
                                          -> :where([disabled],:disabled,[data-disabled],[aria-disabled=true])
```

Swap counts (0 excluded in both legs):

| Site type                            | SO1 (E-cell) | SO1-wide |
| ------------------------------------ | -----------: | -------: |
| `:where` `[data-checked]↔:checked`   |            7 |        7 |
| `:where` `[data-disabled]↔:disabled` |           15 |       17 |
| `:not` `[data-checked]↔:checked`     |            3 |        3 |
| `:not` `[data-disabled]↔:disabled`   |            3 |        3 |
| **Total**                            |       **28** |   **30** |

The 2 extra SO1-wide sites are the Label disabled rules (`fuicm-label-root` /
`fuicm-label-required`) — the only dual lists outside the E-cell families in the bundle.

### Match probe — what the engine actually evaluates (in-page `matches()`, both legs)

- **Switch input, toggled:** matches `:checked` only — NOT `[data-checked]`. So in control
  the matching alternative is **last** in the checked pair and the swap moves it to
  **first**; if list evaluation short-circuited profitably on first match, Switch is the cell
  built to show it.
- **Button root, toggled:** matches `[disabled]`, `[data-disabled]` AND `:disabled` — the
  position-1 alternative `[disabled]` already matches pre-swap (the swap only exchanges
  positions 2↔3 behind it), so Button doubles as a same-CSS-different-order null control.

### Equivalence — verified before any timing

Full computed-style + geometry fingerprint of one instance's subtree in both toggle states,
all four legs, 41 properties — held to a **stricter bar than prior runs**: among migrated
legs a pure reorder has NO intended diffs, so the pass required zero diffs of any kind.

- so1 vs control and so1wide vs control: **0 diffs of any kind**, all 3 components × both
  states.
- control vs before: only the 2 known intended `transition-property` diffs per tightened
  component — re-confirming post-tightening equivalence on the reused control build.

## Results

### 1. Scenario-E total (commit + forced style/layout), pooled median ms, n = 186/cell (6 reps × 31)

| Component | Leg     | Median (ms) |    p25 |    p75 | IQR/med | Commit | Style+layout |
| --------- | ------- | ----------: | -----: | -----: | ------: | -----: | -----------: |
| Switch    | before  |       4.528 |  4.336 |  4.833 |  10.96% |  0.978 |        3.488 |
| Switch    | control |      11.800 | 11.555 | 12.110 |   4.70% |  0.950 |       10.785 |
| Switch    | so1     |      11.830 | 11.570 | 12.269 |   5.91% |  0.958 |       10.848 |
| Switch    | so1wide |      11.780 | 11.545 | 12.120 |   4.88% |  0.955 |       10.763 |
| Button    | before  |       3.285 |  3.210 |  3.446 |   7.19% |  0.480 |        2.798 |
| Button    | control |       8.343 |  8.120 |  8.744 |   7.48% |  0.373 |        7.885 |
| Button    | so1     |       8.305 |  8.136 |  8.846 |   8.55% |  0.375 |        7.883 |
| Button    | so1wide |       8.303 |  8.066 |  8.813 |   8.99% |  0.373 |        7.863 |
| Divider   | before  |       1.260 |  1.240 |  1.290 |   3.97% |  0.455 |        0.805 |
| Divider   | control |       1.290 |  1.275 |  1.315 |   3.10% |  0.260 |        1.028 |
| Divider   | so1     |       1.290 |  1.270 |  1.325 |   4.26% |  0.260 |        1.025 |
| Divider   | so1wide |       1.305 |  1.285 |  1.340 |   4.21% |  0.265 |        1.035 |

Per-repetition medians — every migrated pairing **interleaves** with control (contrast wc1 in
the prior run, which separated in all 6 reps):

| Component | Leg     |  rep 1 |  rep 2 |  rep 3 |  rep 4 |  rep 5 |  rep 6 |
| --------- | ------- | -----: | -----: | -----: | -----: | -----: | -----: |
| Switch    | control | 11.745 | 11.770 | 11.850 | 11.885 | 11.750 | 11.775 |
| Switch    | so1     | 12.375 | 11.740 | 11.800 | 11.805 | 11.840 | 12.045 |
| Switch    | so1wide | 12.050 | 11.660 | 11.715 | 11.715 | 11.825 | 11.780 |
| Button    | control |  8.325 |  8.290 |  8.385 |  8.400 |  8.225 |  8.340 |
| Button    | so1     |  8.385 |  8.305 |  8.345 |  8.330 |  8.315 |  8.265 |
| Button    | so1wide |  8.285 |  8.335 |  8.370 |  8.315 |  8.210 |  8.220 |

### 2. Deltas vs control

| Component | Leg     |   Δ total | Δ total % | Δ commit % | Δ style+layout % |
| --------- | ------- | --------: | --------: | ---------: | ---------------: |
| Switch    | so1     | +0.030 ms |    +0.25% |     +0.79% |           +0.58% |
| Switch    | so1wide | −0.020 ms |    −0.17% |     +0.53% |           −0.21% |
| Button    | so1     | −0.038 ms |    −0.45% |     +0.67% |           −0.03% |
| Button    | so1wide | −0.040 ms |    −0.48% |      0.00% |           −0.29% |
| Divider   | so1     |  0.000 ms |     0.00% |      0.00% |           −0.24% |
| Divider   | so1wide | +0.015 ms |    +1.16% |     +1.92% |           +0.73% |

Divider's ±1.2% is the drift band; every swapped-leg delta sits inside it.

**Griffel anchor (contemporaneous, same session):** control vs before is **+160.6%** on
Switch (4.528 → 11.800 ms) and **+154.0%** on Button (3.285 → 8.343 ms) — the cliff
reproduces on the reused control build, in family with the prior sessions' +161.8%/+148.0%
(will-change run) and +157.3%/+147.9% (main evaluation).

### 3. Trace — style recalc is flat (ms/iter, 10 traced iterations, single run per cell)

| Component | Leg     | Style recalc | Elements | Layout |
| --------- | ------- | -----------: | -------: | -----: |
| Switch    | before  |        3.252 |   11,000 |  1.382 |
| Switch    | control |       10.761 |   12,000 |  1.438 |
| Switch    | so1     |       10.857 |   12,000 |  1.404 |
| Switch    | so1wide |       10.863 |   12,000 |  1.467 |
| Button    | before  |        2.822 |    2,000 |  0.396 |
| Button    | control |        7.616 |    2,000 |  0.403 |
| Button    | so1     |        7.621 |    2,000 |  0.389 |
| Button    | so1wide |        7.482 |    2,000 |  0.377 |

Switch recalc +0.9% on both swapped legs, Button +0.06% (so1) / −1.8% (so1wide) — no
consistent direction, magnitudes inside the trace pass's known single-run noise (the prior
run read ±1.6–2.8% on legs the pooled clock showed as ≤1.1%). Paint/pre-paint/layerize below
the trace floor on Switch/Button in every leg, as before.

### 4. Transition-suppression bracket (3 reps)

| Component | Leg     | As shipped | Suppressed | Attributable to transitions |
| --------- | ------- | ---------: | ---------: | --------------------------: |
| Switch    | before  |      4.528 |      2.355 |               2.173 (48.0%) |
| Switch    | control |     11.800 |      2.700 |               9.100 (77.1%) |
| Switch    | so1     |     11.830 |      2.665 |               9.165 (77.5%) |
| Switch    | so1wide |     11.780 |      2.675 |               9.105 (77.3%) |
| Button    | before  |      3.285 |      1.265 |               2.020 (61.5%) |
| Button    | control |      8.343 |      0.725 |               7.618 (91.3%) |
| Button    | so1     |      8.305 |      0.720 |               7.585 (91.3%) |
| Button    | so1wide |      8.303 |      0.725 |               7.578 (91.3%) |

The transition-attributable cost moves +0.7%/+0.1% (Switch) and −0.4%/−0.5% (Button) — noise.
Both the transition and the non-transition halves of the bracket are order-insensitive.

## Verdict

**No — dual-selector order does not matter, anywhere measured.**

- Pooled totals: ≤0.48% on every swapped cell, inside the drift band, per-rep medians
  interleaved with control.
- Style recalculation — the cliff — flat within single-run trace noise, both scopes.
- The Switch cell was purpose-built to detect a first-match short-circuit (the matching
  `:checked` moved from last to first in all 7 checked lists) and detected nothing; the
  Button cell (matching alternative already first, swap behind it) agreed at zero.
- With this, the selector dimension is closed three ways: alternatives removed
  (dual-vs-single, prior run), selector shape/policy (prior run), and now order — all dead.
  Consistent with the CORRECTION's mechanism: the cost is per-transitioned-property work
  inside recalc, not selector matching.

## Recommendation

No change to the conversion. Dual-list ordering is perf-neutral, so keep the existing
convention (`[data-*]` alternatives first, native pseudo last) purely as a readability/
consistency rule. This was the last untested selector dimension; per the post-tightening
conclusion, further converted-CSS edits should be justified by correctness or size only, and
the open ~8 ms question remains owned by the Blink-level transition-processing diagnostic.

## Reproduction

Everything lives in `.scratch/perf-eval/selector-order/` (gitignored): `build-css.mjs`
(postcss + postcss-selector-parser transform, per-site record in `css-diffs.json`),
`run.mjs` (equivalence / matchprobe / timing / trace / suppressed passes), `analyze.mjs`,
`results/` (raw JSON + `summary.txt`), `git-status-before.txt` (tree-state snapshot).

```sh
# control reused from the will-change run (dist/wc-control); no rebuild needed — verify:
git diff --stat 3dea025d77..HEAD   # must show only report files, no packages/
cd .scratch/perf-eval/selector-order
node build-css.mjs                                  # writes dist/so1, dist/so1-wide
node run.mjs --pass=equivalence,matchprobe
node run.mjs --pass=timing --reps=6
node run.mjs --pass=trace,suppressed --reps=3
node analyze.mjs
```

## Caveats

- Single machine, single session, headless Chromium — only paired deltas are portable.
- The trace pass is one run per cell; its recalc numbers carry the usual single-run noise and
  are read only as "flat", not as precise deltas.
- The finding is about order WITHIN `:where()`/`:not()` argument lists — the only dual form
  this bundle contains. Top-level dual lists (`.x[data-checked], .x:checked`) do not occur in
  the built CSS (count: 0), so their order-sensitivity is untested here and irrelevant to
  this dialect as shipped.
- The suppression pass is diagnostic, not equivalence-verified (by construction); its
  universal-selector overhead means attributable figures are slight underestimates
  (Divider's ~−0.17 ms floor this session, same as prior runs).
- Legs were built by transforming the built CSS asset rather than editing `*.module.css`
  sources and rebuilding — same technique as the variant matrix and will-change runs; the
  zero-diff computed-style equivalence pass is what makes the routes interchangeable for
  runtime measurement.

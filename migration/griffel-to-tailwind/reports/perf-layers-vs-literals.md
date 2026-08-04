# Is the E-cliff `@layer` structure (A) or var()/calc() in transitioned VALUES (B)? — Both no. But literal-everything recovers a measured slice.

Date: 2026-08-04 · Branch: `styling/tailwind-css-modules` · HEAD `cfc71f2204` ·
Experiment only — nothing here shipped; all legs are post-build CSS transforms inside the
gitignored `.scratch/perf-eval/` harness, `packages/` sources untouched throughout
(`git status` verified identical to the pre-experiment snapshot before this commit — the
only commit is this report).

Follow-up to `perf-where-wrapper.md` (whose harness, control bundle, anchor and protocol
this run reuses) and `perf-eval.md` (CORRECTION + post-tightening). These were the LAST TWO
structural differences between the migrated CSS and Griffel's untested as causes of the
E-cliff's transition-attributable cost:

- **Hypothesis A (user's): `@layer`.** The migrated sheet wraps everything in `@layer
fui.*`; Griffel had no layers. Does removing the layer structure change the
  transition-attributable cost?
- **Hypothesis B: custom-property/calc indirection in transitioned-property VALUES.**
  Griffel's transitioned properties carried literal values; migrated ones run through
  `var()`/`calc()` chains. Does resolving ALL of them to literals close the gap?

## Bottom line

**A: No — de-layering is byte-flat on every instrument (9th tested-dead lever).**
**B: No as stated — literalizing every transitioned-property value moves nothing (10th
dead lever). But the bounding leg (literal-EVERYTHING in E-cell scope) is the first
separated positive of the series: −0.78 ms Switch / −1.07 ms Button, all of it inside the
transition-attributable bracket — 11.5% / 19.8% of the migrated-vs-Griffel gap. The var
cost that matters lives in the NON-transitioned declarations.**

- **LY1 (all `@layer` stripped):** totals +0.28% Switch / +0.94% Button / −0.78% Divider;
  transition-attributable bracket +0.42% / +1.03%; suppressed baseline flat. The cascade
  arbitration mechanism (layer order vs specificity+source-order) costs nothing measurable
  at recalc time in either half of the bracket.
- **LT1 (every transitioned-property value literal, 198 declarations):** totals +0.06% /
  +1.97% / +0.39%; attributable +0.36% / +2.02%. Null. This also settles the CORRECTION's
  ~1 ms candidate: collapsing `translateX(calc(20px * var(--base-scale)))` and every other
  transitioned value buys nothing — consistent with the variant matrix's own
  `diag-literal-transform` at −1.0%.
- **LT2 (literal-everything in E-cell scope, 365 declarations):** Switch **11.7575 →
  10.9775 ms (−6.63%)**, Button **8.25 → 7.18 ms (−12.97%)**, separated from control in
  **6/6 reps on both**; Divider (untouched CSS) −0.77% = drift. Suppressed baselines move
  +0.02 / +0.01 ms — i.e. **the entire gain is transition-attributable**. This reproduces
  the variant matrix's `diag-literal-geometry` (−9.1%, old bundle) on the current control
  and localizes it: var()/calc() resolution work in rules applicable to the toggled
  elements is re-done during transition processing, and its cost scales with the
  bundle-wide indirection in those rules — not with the transitioned values themselves.
- **Fraction of the transition-attributable gap explained: A none, B-as-stated none,
  total var indirection 11.5% (Switch) / 19.8% (Button).** The remaining ~5.4–6.1 ms is
  still owned by the Blink transition-processing diagnostic.

## Design

### Legs (all post-build transforms of the control CSS; JS byte-identical)

| Leg         | Bundle            | What it is                                                                                                                                                                                                 |
| ----------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **before**  | `dist/before`     | original Griffel bundle — contemporaneous anchor, re-run this session                                                                                                                                      |
| **control** | `dist/wc-control` | migrated bundle built from HEAD `3dea025d77` — reused; `git log 3dea025d77..HEAD` shows only 4 report commits (`8a6cb4143d`, `1350988449`, `cc08e66bc1`, `cfc71f2204`), no `packages/` change              |
| **ly1**     | `dist/ly1`        | control CSS with **all `@layer` statements/blocks stripped**, rules re-emitted in ascending layer-priority order (winner analysis below)                                                                   |
| **lt1**     | `dist/lt1`        | control CSS with **every declaration of a transitioned property** (any property named in an E-cell `transition-property` list) **plus the `transition-*` longhands themselves** resolved to literal values |
| **lt2**     | `dist/lt2`        | bounding leg: **every** var()/calc()-carrying declaration in E-cell scope resolved (LT1 ⊂ LT2)                                                                                                             |

The LY1+LT1 combined leg was gated on BOTH hypotheses showing signal; neither did, so it
was not run. LT2 was run despite LT1's null because the one historical positive of the
whole evaluation (variant matrix `diag-literal-geometry`, −9.1% ≈ 1 ms on the
pre-tightening bundle) sat in var-indirection but NOT in LT1's scope — LT2 either bounds
the mechanism at zero or reproduces it; it reproduced it.

### LY1 — de-layering and the winner analysis

The control sheet's layer structure: 26 `@layer` statements (24 repeats of the ordering
statement `fui.theme, fui.base, fui.components, fui.components.l1..l5, fui.utilities`,
plus `@layer properties;` and `@layer fui.utilities;`) and 38 layer blocks. Layer priority
resolved from declaration order: `properties < fui.theme < fui.base < fui.components.l1 <
l2 < l3 < l4 < fui.utilities < (unlayered)`.

De-layering is NOT cascade-neutral by construction: with layers, order arbitrates winners
regardless of specificity; unlayered, specificity decides first. Mitigation, per the
where-unwrap method, preferring reordering over exclusion:

1. **Re-emission in ascending layer-priority order** (top-level buckets: properties 1
   node, fui.theme 2, fui.base 12, l1 295, l2 101, l3 1, l4 1, fui.utilities 1, unlayered
   10 — the 8 `@property` rules, the consumer override rule and the rest; within-bucket
   source order preserved; rule and declaration counts verified unchanged). This preserves
   every cross-layer winner whose specificity does not invert the layer order — and every
   same-layer pair trivially, since within-layer order is untouched.
2. **`!important` audit:** 0 occurrences bundle-wide (importance would invert layer
   priority and reordering could not express it) — asserted, not assumed.
3. **Winner analysis** over all 568 leaf rules (nesting-resolved selectors, max-spec over
   alternatives; harness-applicability + state-disjointness predicate identical to the
   where-unwrap run, `:hover` applicable): **52 cross-layer conflict pairs
   winner-compared, 0 disjointness vetoes, 0 flips — 0 adjustments and 0 exclusions
   needed.** A pair flips only if the higher-layer rule has strictly LOWER specificity
   than its co-applicable lower-layer conflict partner; no such pair exists. The
   environment-scoped list (applicability filter dropped): **94 pairs, 0 flips** — for
   this bundle the de-layered ordering is winner-identical in a full environment too, not
   just in the harness. (One conservative refinement over the where-unwrap machinery:
   subjects are pseudo-element-aware, so a `::before` rule and an element rule are never
   counted as conflicting — without it, 2 false-positive Avatar pairs would have drawn
   needless specificity bumps.)

So for this single-origin sheet the layer semantics are fully order-expressible, and LY1
is a pure structural change: same rules, same selectors, same declarations, no layers.

### LT1 / LT2 — literal values and their ground truth

Transitioned-property set, read from the E-cell components' own `transition-property`
lists (Switch indicator: 6 color longhands @ 200ms; Switch thumb: `transform` @ 200ms;
Button root: 6 color longhands @ 100ms): `background-color`, `border-top/right/bottom/
left-color`, `color`, `transform`. Divider declares no transitions (drift control, CSS
untouched by construction in LT1; LT2 touches only E-cell scope, so Divider is untouched
there too).

**Ground truth = runtime computed values read from the control page** (stated per the
design choice offered; not static token-file resolution): every custom property referenced
in E-cell declarations was read via `getComputedStyle().getPropertyValue()` on the
provider, Switch root/input/indicator/thumb and Button root, in both toggle states — 80
var names, of which **71 read uniform non-empty values across every probed site** and 9
are element-scoped (`--fui-focus-*` ×8, `--fui-Button__icon--spacing`) and excluded.
`--base-scale` (defined `calc(1rem/16px)`, unregistered) was resolved numerically from the
verified 16px root font-size → **1**. All 47 names in LT1's scope are in the uniform 71 —
hard-asserted before build.

Transform counts (the count instrument; per-declaration substitution with a paren-aware
var() parser — nested fallbacks like `var(--spacing, calc(1px * var(--base-scale)))`
defeat regexes — plus a dimension-checked calc() evaluator over px/rem/number arithmetic):

| Leg     | Decls resolved | var() occurrences | calc() collapsed | Skipped (element-scoped vars) | CSS bytes (control 99,423) |
| ------- | -------------: | ----------------: | ---------------: | ----------------------------: | -------------------------: |
| **lt1** |        **198** |               198 |                4 |                             0 |             94,268 (−5.2%) |
| **lt2** |        **365** |               389 |              119 |                            12 |            89,030 (−10.5%) |

LT1 per property: color 65, background-color 63, border-_-color 4×15, transform 4 (the
`translate(calc(±20px|±16px _ var(--base-scale)))`chains →`translate(±20px|±16px)`),
transition-duration 3 (`var(--durationNormal|Faster)`→`200ms`/`100ms`),
transition-timing-function 3 (`var(--curveEasyEase)`→`cubic-bezier(0.33,0,0.67,1)`).
Post-check: **0 var()/calc() remaining in scoped declarations** on both legs (source-level
scan); LT2's 12 skipped declarations are focus-indicator and Button-icon rules whose vars
are element-scoped — none applicable to any measured or probed harness state. LY1 CSS is
94,987 bytes (−4.5%, the removed layer preludes).

### Protocol

Same as the will-change / selector-order / class-vs-attr / where-unwrap runs: scenario E =
toggle a state prop across 100 mounted instances (Switch `checked`, Button `disabled`,
Divider `appearance` as drift control), 5 discarded warm-ups + 31 measured windows per
cell, leg order reshuffled per cell from seed `20260811`, one machine-exclusive
headless-Chromium session, pooled medians over 6 reps (n = 186/cell); trace 10 iterations
single run; suppression bracket 3 reps. Two measurement blocks, each with its own
contemporaneous control and before legs interleaved: {before, control, ly1, lt1} and
{before, control, lt2}; no cross-block comparisons are made.

## Equivalence — zero-diff, verified before any timing

Full computed-style + geometry fingerprint (41 properties + rects) of one instance's
subtree, base + toggled states on all three components **plus the real-mouse Button
`:hover` state** (probe-verified `matches(':hover')`, 400 ms settle):

- **ly1 vs control, lt1 vs control, lt1 vs ly1, lt2 vs control: 0 diffs of any kind**, all
  components × all states. The de-layered ordering and both literal substitutions
  reproduce the shipped rendering exactly — the 0-flip static analysis and the runtime
  ground truth are both confirmed by the arbiter.
- control vs before: only the known intended `transition-property` diffs (2 rows Switch,
  3 rows Button, 0 Divider) — re-confirming post-tightening equivalence on the reused
  control, in both measurement blocks.

## Liveness — the instruments confirm each transform is live (the will-change lesson)

In-page probes per leg: the toggled Switch input matches its `:where([data-checked],
:checked)` rules and the sibling indicator rule; the toggled Button matches
`[disabled]`/`:disabled`; the decisive application probe (indicator background-color
changes on toggle) passes on every leg. CSSOM instruments:

| Leg     | Layer rules (block+stmt) | E-cell rules | var-decls on transitioned props (CSSOM) | thumb transform (toggled)   | durations   |
| ------- | -----------------------: | -----------: | --------------------------------------: | --------------------------- | ----------- |
| control |                  38 + 26 |          232 |                                     170 | `matrix(1, 0, 0, 1, 20, 0)` | 0.2s / 0.1s |
| ly1     |                **0 + 0** |          232 |                                     170 | `matrix(1, 0, 0, 1, 20, 0)` | 0.2s / 0.1s |
| lt1     |                  38 + 26 |          232 |                                   **0** | `matrix(1, 0, 0, 1, 20, 0)` | 0.2s / 0.1s |
| lt2     |                  38 + 26 |          232 |                                   **0** | `matrix(1, 0, 0, 1, 20, 0)` | 0.2s / 0.1s |

(The CSSOM var-decl count of 170 vs the source-level 198 is the usual CSSOM nested-rule
counting artifact — the source-level post-check is exact: 198 → 0.) The literal 200 ms /
100 ms durations and the literal `translate(20px)` are live and computing identically.

## Results

### 1. Block 1 — {before, control, ly1, lt1}, pooled median ms, n = 186/cell

| Component | Leg     | Median (ms) |    p25 |    p75 | IQR/med | Commit | Style+layout |
| --------- | ------- | ----------: | -----: | -----: | ------: | -----: | -----------: |
| Switch    | before  |       4.438 |  4.275 |  4.764 |  11.01% |  0.970 |        3.415 |
| Switch    | control |      11.683 | 11.460 | 11.934 |   4.06% |  0.935 |       10.678 |
| Switch    | ly1     |      11.715 | 11.476 | 12.045 |   4.85% |  0.930 |       10.718 |
| Switch    | lt1     |      11.690 | 11.490 | 11.949 |   3.92% |  0.945 |       10.675 |
| Button    | before  |       3.335 |  3.200 |  3.469 |   8.06% |  0.480 |        2.840 |
| Button    | control |       8.260 |  8.040 |  8.770 |   8.84% |  0.370 |        7.835 |
| Button    | ly1     |       8.338 |  8.113 |  8.830 |   8.61% |  0.370 |        7.910 |
| Button    | lt1     |       8.423 |  8.116 |  9.264 |  13.62% |  0.370 |        7.990 |
| Divider   | before  |       1.260 |  1.235 |  1.290 |   4.37% |  0.455 |        0.805 |
| Divider   | control |       1.290 |  1.275 |  1.315 |   3.10% |  0.260 |        1.025 |
| Divider   | ly1     |       1.280 |  1.261 |  1.310 |   3.81% |  0.260 |        1.015 |
| Divider   | lt1     |       1.295 |  1.275 |  1.330 |   4.25% |  0.265 |        1.030 |

Deltas vs control: **ly1 +0.28% / +0.94% / −0.78%; lt1 +0.06% / +1.97% / +0.39%**
(Switch / Button / Divider). Per-repetition medians interleave with control in all 6 reps
for both legs on all components (no separation anywhere — contrast wu1's clean 6/6
separation in the previous run):

| Component | Leg     |  rep 1 |  rep 2 |  rep 3 |  rep 4 |  rep 5 |  rep 6 |
| --------- | ------- | -----: | -----: | -----: | -----: | -----: | -----: |
| Switch    | control | 11.620 | 11.745 | 11.700 | 11.615 | 11.655 | 11.680 |
| Switch    | ly1     | 11.610 | 11.660 | 11.785 | 11.630 | 11.760 | 11.815 |
| Switch    | lt1     | 11.525 | 11.700 | 11.530 | 11.685 | 11.850 | 11.725 |
| Button    | control |  8.410 |  8.140 |  8.205 |  8.355 |  8.230 |  8.195 |
| Button    | ly1     |  8.300 |  8.425 |  8.355 |  8.225 |  8.320 |  8.350 |
| Button    | lt1     |  8.355 |  9.510 |  8.235 |  8.365 |  8.310 |  8.240 |
| Divider   | control |  1.280 |  1.290 |  1.300 |  1.290 |  1.285 |  1.295 |
| Divider   | ly1     |  1.295 |  1.300 |  1.280 |  1.270 |  1.280 |  1.270 |
| Divider   | lt1     |  1.280 |  1.285 |  1.295 |  1.300 |  1.330 |  1.285 |

(Button lt1 rep 2 is a one-off 9.510 outlier; it inflates lt1's pooled p75/IQR and its
+1.97% — the other five reps sit inside control's band.)

**Griffel anchor:** control vs before is **+163.3%** Switch (4.438 → 11.683) and
**+147.7%** Button (3.335 → 8.260) — in family with +157.3%/+147.9% (main evaluation),
+161.8%/+148.0% (will-change), +160.6%/+154.0% (selector-order), +156.5%/+149.6%
(class-vs-attr), +163.8%/+150.4% (where-wrapper). The cliff is intact on the reused
control; block 2 reproduces it again at +160.8%/+146.3%.

### 2. Block 2 — {before, control, lt2}, pooled median ms, n = 186/cell

| Component | Leg     | Median (ms) |    p25 |    p75 | IQR/med | Commit | Style+layout |            Δ vs control |
| --------- | ------- | ----------: | -----: | -----: | ------: | -----: | -----------: | ----------------------: |
| Switch    | before  |       4.508 |  4.305 |  4.834 |  11.73% |  0.965 |        3.460 |                       — |
| Switch    | control |      11.758 | 11.476 | 12.049 |   4.87% |  0.940 |       10.748 |                       — |
| Switch    | **lt2** |  **10.978** | 10.771 | 11.260 |   4.45% |  0.940 |        9.955 |  **−6.63%** (−0.780 ms) |
| Button    | before  |       3.350 |  3.256 |  3.501 |   7.31% |  0.490 |        2.850 |                       — |
| Button    | control |       8.250 |  8.035 |  8.835 |   9.70% |  0.370 |        7.845 |                       — |
| Button    | **lt2** |   **7.180** |  6.966 |  7.641 |   9.40% |  0.370 |        6.745 | **−12.97%** (−1.070 ms) |
| Divider   | before  |       1.270 |  1.241 |  1.295 |   4.23% |  0.460 |        0.808 |                       — |
| Divider   | control |       1.295 |  1.270 |  1.335 |   5.02% |  0.260 |        1.030 |                       — |
| Divider   | lt2     |       1.285 |  1.265 |  1.319 |   4.18% |  0.260 |        1.025 |                  −0.77% |

Per-repetition medians — **lt2 separates from control in 6/6 reps on Switch (10.850–11.055
vs 11.590–11.960, no overlap) and 6/6 on Button (6.985–7.240 vs 8.125–8.320, no
overlap)**; Divider interleaves (its CSS is untouched — clean drift control, unlike wu1's
shared-sheet contamination):

| Component | Leg     |  rep 1 |  rep 2 |  rep 3 |  rep 4 |  rep 5 |  rep 6 |
| --------- | ------- | -----: | -----: | -----: | -----: | -----: | -----: |
| Switch    | control | 11.610 | 11.960 | 11.820 | 11.910 | 11.590 | 11.800 |
| Switch    | lt2     | 11.000 | 11.045 | 11.045 | 10.850 | 10.920 | 11.055 |
| Button    | control |  8.175 |  8.125 |  8.225 |  8.305 |  8.250 |  8.320 |
| Button    | lt2     |  7.085 |  7.195 |  7.240 |  6.985 |  7.150 |  7.210 |
| Divider   | control |  1.305 |  1.285 |  1.290 |  1.285 |  1.285 |  1.295 |
| Divider   | lt2     |  1.285 |  1.265 |  1.295 |  1.290 |  1.285 |  1.285 |

The commit half is identical (0.94/0.94, 0.37/0.37) — the whole LT2 gain is style+layout,
as it must be for a CSS-value transform.

### 3. Trace — style recalc (ms/iter, 10 traced iterations, single run per cell)

| Component | Leg (block 1) | Recalc | Δ vs control | Elements |     | Leg (block 2) |     Recalc | Δ vs control | Elements |
| --------- | ------------- | -----: | -----------: | -------: | --- | ------------- | ---------: | -----------: | -------: |
| Switch    | before        |  3.350 |            — |   11,000 |     | before        |      3.188 |            — |   11,000 |
| Switch    | control       | 10.667 |            — |   12,000 |     | control       |     10.877 |            — |   12,000 |
| Switch    | ly1           | 10.705 |        +0.4% |   12,000 |     | **lt2**       | **10.083** |    **−7.3%** |   12,000 |
| Switch    | lt1           | 10.754 |        +0.8% |   12,000 |     |               |            |              |          |
| Button    | before        |  2.761 |            — |    2,000 |     | before        |      2.752 |            — |    2,000 |
| Button    | control       |  7.518 |            — |    2,000 |     | control       |      7.592 |            — |    2,000 |
| Button    | ly1           |  7.527 |        +0.1% |    2,000 |     | **lt2**       |  **6.361** |   **−16.2%** |    2,000 |
| Button    | lt1           |  7.464 |        −0.7% |    2,000 |     |               |            |              |          |
| Divider   | before        |  1.505 |            — |    7,000 |     | before        |      1.565 |            — |    7,000 |
| Divider   | control       |  1.962 |            — |    7,000 |     | control       |      1.952 |            — |    7,000 |
| Divider   | ly1           |  1.948 |        −0.7% |    7,000 |     | lt2           |      1.958 |        +0.3% |    7,000 |
| Divider   | lt1           |  1.941 |        −1.1% |    7,000 |     |               |            |              |          |

Invalidation width unchanged everywhere; layout a non-event throughout. The LT2 gain is
per-element recalc cost, corroborating the pooled clock.

### 4. Transition-suppression bracket (3 reps) — the verdict instrument

| Component | Leg     | As shipped | Suppressed | Attributable to transitions | Δ attributable vs control |
| --------- | ------- | ---------: | ---------: | --------------------------: | ------------------------: |
| Switch    | before  |      4.438 |      2.345 |               2.093 (47.2%) |                         — |
| Switch    | control |     11.683 |      2.670 |               9.013 (77.1%) |                         — |
| Switch    | ly1     |     11.715 |      2.665 |               9.050 (77.3%) |                    +0.42% |
| Switch    | lt1     |     11.690 |      2.645 |               9.045 (77.4%) |                    +0.36% |
| Button    | before  |      3.335 |      1.255 |               2.080 (62.4%) |                         — |
| Button    | control |      8.260 |      0.720 |               7.540 (91.3%) |                         — |
| Button    | ly1     |      8.338 |      0.720 |               7.618 (91.4%) |                    +1.03% |
| Button    | lt1     |      8.423 |      0.730 |               7.693 (91.3%) |                    +2.02% |
| Divider   | before  |      1.260 |      1.425 |                   −0.165 ms |                         — |
| Divider   | control |      1.290 |      1.455 |                   −0.165 ms |                         — |
| Divider   | ly1     |      1.280 |      1.450 |                   −0.170 ms |                         — |
| Divider   | lt1     |      1.295 |      1.455 |                   −0.160 ms |                         — |

Block 2:

| Component | Leg     | As shipped | Suppressed | Attributable to transitions | Δ attributable vs control |
| --------- | ------- | ---------: | ---------: | --------------------------: | ------------------------: |
| Switch    | before  |      4.508 |      2.355 |               2.153 (47.8%) |                         — |
| Switch    | control |     11.758 |      2.660 |               9.098 (77.4%) |                         — |
| Switch    | **lt2** |     10.978 |      2.680 |           **8.298** (75.6%) |     **−0.800 ms (−8.8%)** |
| Button    | before  |      3.350 |      1.260 |               2.090 (62.4%) |                         — |
| Button    | control |      8.250 |      0.715 |               7.535 (91.3%) |                         — |
| Button    | **lt2** |      7.180 |      0.725 |           **6.455** (89.9%) |    **−1.080 ms (−14.3%)** |
| Divider   | before  |      1.270 |      1.440 |                   −0.170 ms |                         — |
| Divider   | control |      1.295 |      1.460 |                   −0.165 ms |                         — |
| Divider   | lt2     |      1.285 |      1.460 |                   −0.175 ms |                         — |

Two decisive readings:

- **Neither LY1 nor LT1 moves the attributable bracket** (+0.4% to +2.0%, all inside the
  session's noise band), and neither moves the suppressed baseline (Switch 2.645–2.670,
  Button 0.720–0.730 across all three migrated legs). Notably, de-layering costs nothing
  at baseline either — unlike wu1's ~12–16% surcharge, the layered/unlayered sheet forms
  are match-time equivalent.
- **LT2's entire gain sits in the attributable half**: suppressed moves +0.020 / +0.010 ms
  (noise) while attributable drops 0.800 / 1.080 ms. Var()/calc() resolution is nearly
  free in the single suppressed recalc pass, and expensive inside transition processing —
  which re-resolves the applicable declarations (before-change style + transition setup),
  multiplying the per-declaration indirection cost.

**Gap-explained accounting** (migrated-vs-Griffel transition-attributable gap): Switch —
control gap 6.920 ms (block 1) / 6.945 ms (block 2); ly1 6.958 ms (−0.5% explained), lt1
6.953 ms (−0.5%), **lt2 6.145 ms (11.5% explained)**. Button — control gap 5.460 / 5.445
ms; ly1 5.538 (−1.4%), lt1 5.613 (−2.8%), **lt2 4.365 (19.8% explained)**. The transition
cost ratio vs Griffel moves from 4.23× to 3.86× on Switch (9.098/2.153 → 8.298/2.153) and
from 3.61× to 3.09× on Button.

## Verdicts

**A — `@layer`: No.** Stripping every layer statement and block (26 + 38), with winner
order preserved by re-emission (0 adjustments needed, 0 residual flips even
environment-wide), is flat on totals (+0.28%/+0.94%/−0.78%), flat on trace recalc
(+0.4%/+0.1%/−0.7%), and flat on both halves of the suppression bracket. The **9th
tested-dead lever**. Layer arbitration costs nothing measurable at style-recalc time in
this bundle — the cliff is indifferent to it.

**B — var()/calc() in transitioned VALUES: No, as stated.** Resolving all 198 transitioned-
property and transition-longhand declarations to runtime-verified literals — including the
`--base-scale` transform chains the CORRECTION flagged — moves nothing: totals
+0.06%/+1.97%, attributable +0.36%/+2.02%. The **10th dead lever**. The hypothesis's
mechanism (per-frame re-resolution of the animated property's endpoint values) is not
where the cost is.

**But the generalized indirection IS a real, partial contributor — via the
NON-transitioned declarations.** LT2 (LT1 + the other 167 var/calc declarations in E-cell
scope: spacing/geometry, radii, fonts, shadows, outlines) is the first leg of the entire
series to separate 6/6 reps in the fast direction on both components, and its gain is
entirely transition-attributable: **0.80 ms of Switch's 6.95 ms gap (11.5%), 1.08 ms of
Button's 5.45 ms gap (19.8%)**. Mechanism, by subtraction: transition processing re-does
style resolution work over the applicable rules of the toggled elements; each var()/calc()
hop in ANY declaration of those rules — not just the animated ones — is paid again there,
while costing ~nothing in the ordinary (suppressed) recalc path. This also retro-explains
the variant matrix: `diag-literal-geometry` −9.1% was real and is reproduced;
`diag-literal-transform` −1.0% was the null LT1 confirms.

## Recommendation

**No change to the conversion from hypothesis A or B — and the layer structure and the
token indirection of transitioned values are both now measured innocent.**

On the LT2 positive, be honest about what shipping it would entail before spending it:

- **Mechanizable:** build-time var resolution is a deterministic postcss pass (this
  experiment's own `build-css.mjs` is 90% of it: paren-aware substitution, dimension-
  checked calc evaluation, element-scoped-var skips).
- **But it interacts with theming.** Resolved literals freeze the values of ONE theme
  under ONE provider nesting; the tokens exist precisely so themes and nested
  `FluentProvider`s can swap them at runtime. A resolved sheet breaks theme switching
  unless it is generated per theme and scoped per provider subtree — a build/distribution
  model change (per-theme stylesheet artifacts), not a CSS tweak. Partial variants (e.g.
  resolving only non-color geometry, which is theme-stable) would keep theming intact but
  capture only part of the 0.8–1.1 ms; how much is not measured here.
- **Proportion:** the full literal-everything ceiling recovers 11.5%/19.8% of the
  transition-attributable gap. Switch scenario E would move from +161% to roughly +144%
  vs Griffel — real, but not the cliff. Per the post-tightening discipline (converted-CSS
  edits justified by correctness or size, not predicted E-gains), this is a documented
  option with a measured ceiling, not a recommendation to ship.

The open ~5.4–6.1 ms per-component gap remains owned by the Blink transition-processing
diagnostic: with layers, selector shape/order/wrapper/contents, data-attributes,
will-change, declared-longhand count, and now transitioned-value indirection all measured
dead, and total var indirection bounded at ~12–20%, the remaining cost is in how Blink
processes a state change on transition-carrying elements under this stylesheet — not in
any structural property of the stylesheet that has been expressible as a CSS transform so
far.

## Reproduction

Everything lives in `.scratch/perf-eval/layers-literals/` (gitignored): `resolve-vars.mjs`
(runtime var ground truth → `vars.json`), `build-css.mjs` (both transforms + winner
analysis + `css-diffs.json` with per-leg SHA1s and counts), `run.mjs` (equivalence /
liveness / timing / trace / suppressed), `analyze.mjs`, `results/` (raw JSON +
`summary.txt`, `summary-lt2.txt`), `../layers-literals-git-status-pre.txt` (tree-state
snapshot).

```sh
# control reused from the will-change run (dist/wc-control); verify:
git log --oneline 3dea025d77..HEAD          # must show only report commits, no packages/
cd .scratch/perf-eval/layers-literals
node resolve-vars.mjs                       # runtime ground truth from the control page
node build-css.mjs --lt2                    # writes dist/ly1, dist/lt1, dist/lt2
node run.mjs --pass=equivalence,liveness
node run.mjs --pass=timing --reps=6
node run.mjs --pass=trace,suppressed --reps=3
node analyze.mjs
# block 2 (LT2 with its own contemporaneous anchor):
node run.mjs --pass=equivalence,liveness --legs=before,control,lt2
node run.mjs --pass=timing --reps=6 --legs=before,control,lt2
node run.mjs --pass=trace,suppressed --reps=3 --legs=before,control,lt2
node analyze.mjs --suffix=-lt2 --legs=before,control,lt2
```

## Caveats

- Single machine, single session, headless Chromium — only paired deltas are portable.
  Blocks 1 and 2 each carry their own interleaved control and before cells; no number is
  compared across blocks.
- The trace pass is one run per cell; it corroborates direction only. The pooled clock
  (n=186/cell) is the verdict number.
- **The LT legs are harness-scoped by construction**: literals are the runtime values of
  the ONE theme the harness mounts. Rules matching states the equivalence pass does not
  visit (focus, active, RTL, forced-colors) carry resolved literals verified only by the
  uniform runtime read, not by the zero-diff arbiter. The 12 LT2 skips (element-scoped
  `--fui-focus-*`, `--fui-Button__icon--spacing`) apply to rules that match no harness
  element at all.
- LY1's winner analysis found 0 flips harness-scoped AND environment-scoped for this
  bundle — but that is a property of this sheet (uniform `:where()`-gated specificity
  discipline), not of de-layering in general; the provider's runtime-injected token styles
  live in separate unlayered sheets and are untouched by the transform.
- Button lt1's rep-2 outlier (9.510 vs 8.235–8.365 elsewhere) inflates its pooled median
  by ~0.1 ms; its +1.97% should be read against the other five reps interleaving with
  control, and its suppression-bracket +2.02% inherits the same inflation.
- The suppression pass is diagnostic, not equivalence-verified (by construction); its
  universal-selector overhead means attributable figures are slight underestimates
  (Divider's −0.16 to −0.175 ms floor this session, same mechanism as prior runs).
- Legs were built by transforming the built CSS asset rather than editing sources and
  rebuilding — same technique as the variant matrix and all four selector-series runs; the
  zero-diff computed-style equivalence pass is what makes the routes interchangeable for
  runtime measurement.
- LT2's 76-declaration first-draft residue (mangled nested fallbacks) was caught by the
  count instrument before any measurement; the shipped-here build has 0 residual calc and
  0 remaining var in scope, and the measured `dist/lt1` is byte-identical (SHA1) to the
  block-1 build.

# Does `will-change` address the scenario-E cliff? — No.

Date: 2026-08-04 · Branch: `styling/tailwind-css-modules` · HEAD `3dea025d77` ·
Experiment only — nothing here shipped; all CSS edits were post-build transforms inside the
gitignored `.scratch/perf-eval/` harness, `packages/` sources untouched throughout
(`git status` verified identical before and after).

Follow-up to `perf-eval.md` (CORRECTION + post-tightening sections) and
`.scratch/perf-eval/variants/SUMMARY.md`. Established context this experiment takes as given:
the scenario-E re-render cliff (Button ~+148%, Switch ~+157% vs Griffel) is **transition
processing inside style recalculation**; selector policy, named groups, longhand-count
tightening and data-attr writes are tested-dead levers; ~8 ms of the ~9 ms transition cost was
unexplained. Question here: does hinting the transitioned properties with `will-change` move it?

## Bottom line

**`will-change` does not touch the cliff.** Style recalculation — where the entire regression
lives — is unchanged to within ±0.4% on both tightened components. The one measured effect is a
**Switch-only −5.3% total** (−0.63 ms of an 11.9 ms window) that the trace attributes entirely
to **layout** (1.433 → 0.889 ms/iter), not recalc, and that persists with transitions
suppressed — i.e. it is a compositing-layer side effect of `will-change: transform` on the
thumb, not a reduction of transition processing. It is bought with **100 extra composited
layers** (one per instance). Button — where the transitioned longhands are colors only —
moves 0%.

## Design

Same harness, protocol and statistics as the variant matrix / post-tightening runs
(`.scratch/perf-eval/`, scenario E = toggle a state prop across 100 mounted instances,
5 discarded warm-ups + 31 measured windows per cell, leg order reshuffled per cell from seed
`20260804`, one machine-exclusive headless-Chromium session, pooled medians).

| Leg         | Bundle                  | What it is                                                                                                                                                         |
| ----------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **before**  | retained `dist/before`  | original Griffel bundle — **contemporaneous anchor**, re-run in this session, not a recorded number                                                                |
| **control** | fresh `dist/wc-control` | migrated bundle freshly built from HEAD `3dea025d77` (all 9 leg packages changed since the post-tightening build `80d12b596f`, so `dist/after2` was not reusable)  |
| **wc1**     | `dist/wc1`              | control CSS + **static will-change**: inserted immediately after each targeted `transition-property` declaration, same rule / selector / layer                     |
| **wc2**     | `dist/wc2`              | control CSS + **scoped will-change**: three appended rules that arm the same hints only while the FluentProvider subtree is hovered ("hint before the transition") |

control/wc1/wc2 share byte-identical JS; only the CSS asset differs. Components: Switch
(checked toggle), Button (disabled toggle), **Divider as drift control** (no transition sites;
its CSS is identical in every migrated leg).

### Exact CSS diffs (recorded in `.scratch/perf-eval/will-change/css-diffs.json`)

**W1 — 3 injection sites** (the only `transition-property` declarations under the Button-root /
Switch class tokens in the built CSS):

```css
/* @layer fui.base .fuicm-switch-indicator-541abe */
transition-property: background-color, border-top-color, border-right-color, border-bottom-color, border-left-color,
  color;
+will-change: background-color, border-top-color, border-right-color, border-bottom-color, border-left-color, color;

/* @layer fui.base .fuicm-switch-indicator-541abe > * (the thumb) */
transition-property: transform;
+will-change: transform;

/* @layer fui.base .fuicm-button-root-605c69 */
transition-property: background-color, border-top-color, border-right-color, border-bottom-color, border-left-color,
  color;
+will-change: background-color, border-top-color, border-right-color, border-bottom-color, border-left-color, color;
```

**W2 — 3 appended rules**, shipped rules untouched:

```css
.fuicm-fluent-provider-root-1654ea:hover .fuicm-button-root-605c69 {
  will-change: background-color, border-top-color, border-right-color, border-bottom-color, border-left-color, color;
}
.fuicm-fluent-provider-root-1654ea:hover .fuicm-switch-indicator-541abe {
  will-change: background-color, border-top-color, border-right-color, border-bottom-color, border-left-color, color;
}
.fuicm-fluent-provider-root-1654ea:hover .fuicm-switch-indicator-541abe > * {
  will-change: transform;
}
```

CSS bytes: control 99,423 → wc1 99,663 → wc2 99,877.

One implementation finding worth keeping: the provider's static class is instance-suffixed
(`fui-FluentProvider_r_0_`), so a `.fui-FluentProvider:hover` scope **matches nothing** — the
first wc2 build silently measured an inert rule until an in-page computed-`will-change` probe
caught it. The scope must anchor on the stable CSS-Modules class. All numbers below are from
the fixed build, and every armed cell was probe-verified
(`getComputedStyle(...).willChange` on first and last instance) before being trusted.

### Equivalence — verified before any timing

Full computed-style + geometry fingerprint of one instance's subtree in both toggle states, all
four legs, 41 properties including `will-change`:

- **0 render mismatches** in all 9 comparisons × components.
- wc1 vs control: exactly the intended `will-change` diffs on exactly the intended elements —
  Switch indicator `<div>` + thumb `<svg>` (4 rows), Button root `<button>` (2 rows).
- wc2 vs control (idle, no hover): **0 diffs of any kind** — the scoped variant is free when
  not armed.
- control vs before: only the 2 known intended `transition-property` diffs per tightened
  component (Griffel's 21 longhands vs the tightened 6), re-confirming the post-tightening
  equivalence result on a fresh HEAD build.

## Results

### 1. Scenario-E total (commit + forced style/layout), pooled median ms, n = 186/cell (6 reps × 31)

| Component | Leg     | Median (ms) |    p25 |    p75 | IQR/med | Commit | Style+layout |
| --------- | ------- | ----------: | -----: | -----: | ------: | -----: | -----------: |
| Switch    | before  |       4.553 |  4.318 |  4.798 |  10.54% |  0.995 |        3.465 |
| Switch    | control |      11.918 | 11.595 | 12.230 |   5.33% |  0.965 |       10.870 |
| Switch    | **wc1** |  **11.288** | 11.014 | 11.575 |   4.97% |  0.955 |       10.295 |
| Switch    | wc2     |      11.908 | 11.556 | 12.258 |   5.89% |  0.975 |       10.850 |
| Button    | before  |       3.368 |  3.286 |  3.520 |   6.94% |  0.490 |        2.878 |
| Button    | control |       8.353 |  8.113 |  8.760 |   7.75% |  0.370 |        7.933 |
| Button    | **wc1** |   **8.445** |  8.120 |  8.959 |   9.93% |  0.378 |        8.008 |
| Button    | wc2     |       8.383 |  8.140 |  8.835 |   8.29% |  0.375 |        7.943 |
| Divider   | before  |       1.275 |  1.245 |  1.300 |   4.31% |  0.455 |        0.810 |
| Divider   | control |       1.295 |  1.266 |  1.329 |   4.83% |  0.260 |        1.028 |
| Divider   | wc1     |       1.310 |  1.275 |  1.340 |   4.96% |  0.270 |        1.035 |
| Divider   | wc2     |       1.295 |  1.275 |  1.330 |   4.25% |  0.265 |        1.030 |

Per-repetition medians (Switch wc1 is below control in **all 6 reps** with no overlap —
wc1 11.21–11.385 vs control 11.78–12.11; every other migrated pairing interleaves):

| Component | Leg     |  rep 1 |  rep 2 |  rep 3 |  rep 4 |  rep 5 |  rep 6 |
| --------- | ------- | -----: | -----: | -----: | -----: | -----: | -----: |
| Switch    | control | 11.780 | 12.110 | 11.965 | 11.880 | 11.820 | 11.940 |
| Switch    | wc1     | 11.385 | 11.330 | 11.210 | 11.270 | 11.270 | 11.245 |
| Switch    | wc2     | 11.845 | 11.980 | 11.880 | 12.000 | 11.945 | 11.820 |
| Button    | control |  8.250 |  8.320 |  8.450 |  8.300 |  8.325 |  8.430 |
| Button    | wc1     |  8.460 |  8.595 |  8.440 |  8.420 |  8.285 |  8.400 |
| Button    | wc2     |  8.370 |  8.445 |  8.365 |  8.320 |  8.395 |  8.360 |

### 2. Deltas vs control

| Component | Leg        |       Δ total |  Δ total % | Δ commit % | Δ style+layout % |
| --------- | ---------- | ------------: | ---------: | ---------: | ---------------: |
| Switch    | **wc1**    | **−0.630 ms** | **−5.29%** |     −1.04% |       **−5.29%** |
| Switch    | wc2 (idle) |     −0.010 ms |     −0.08% |     +1.04% |           −0.18% |
| Button    | wc1        |     +0.093 ms |     +1.11% |     +2.03% |           +0.95% |
| Button    | wc2 (idle) |     +0.030 ms |     +0.36% |     +1.35% |           +0.13% |
| Divider   | wc1        |     +0.015 ms |     +1.16% |     +3.85% |           +0.73% |
| Divider   | wc2        |      0.000 ms |         0% |     +1.92% |           +0.24% |

Divider's ±1.2% is the drift band. Button wc1/wc2 sit inside it. Switch wc1's −5.29% is
outside it and reproduced in all 6 repetitions.

**Griffel anchor (contemporaneous, same session):** control vs before is **+161.8%** on Switch
(4.553 → 11.918 ms) and **+148.0%** on Button (3.368 → 8.353 ms) — reproducing the main
evaluation's +157.3% / +147.9% within its declared stability bands. The cliff is intact on
current HEAD, and this comparison needs no non-contemporaneous caveat.

### 3. Trace — where wc1's −0.63 ms actually is (ms/iter, 10 traced iterations)

| Component | Leg     | Style recalc | Elements |    Layout | Paint / PrePaint / Layerize |
| --------- | ------- | -----------: | -------: | --------: | :-------------------------- |
| Switch    | before  |        3.333 |   11,000 |     1.373 | below trace floor           |
| Switch    | control |       10.854 |   12,000 |     1.433 | below trace floor           |
| Switch    | **wc1** |   **10.856** |   12,000 | **0.889** | below trace floor           |
| Switch    | wc2     |       11.121 |   12,000 |     1.457 | below trace floor           |
| Button    | before  |        2.858 |    2,000 |     0.386 | below trace floor           |
| Button    | control |        7.435 |    2,000 |     0.373 | below trace floor           |
| Button    | wc1     |        7.557 |    2,000 |     0.377 | below trace floor           |
| Button    | wc2     |        7.644 |    2,000 |     0.381 | below trace floor           |
| Divider   | control |        1.958 |    7,000 |     0.587 | 0.0016 / 0.0020 / 0.0005    |
| Divider   | wc1     |        1.989 |    7,000 |     0.601 | 0.0017 / 0.0021 / 0.0006    |

Two decisive rows:

- **Style recalculation — the cliff — does not move.** Switch 10.854 → 10.856 (+0.01%);
  Button 7.435 → 7.557 (+1.6%, and wc2 is +2.8% — this is the trace pass's single-run noise,
  the pooled wall clock says +1.1%/+0.4%). The mechanism the CORRECTION identified (transition
  processing inside recalc) is exactly as expensive with the hint as without it.
- **Switch wc1's whole saving is layout: 1.433 → 0.889 ms/iter (−0.544, −38.0%)** — matching
  the pooled wall-clock delta (−0.630 ms) almost exactly. Paint/pre-paint/layerize are at or
  below the trace floor in every Switch/Button cell on every leg; there was never any
  paint-side cost for `will-change` to save.

### 4. Layer accounting — the cost side (CDP LayerTree, 100 toggled instances mounted)

| Cell               | before | control |     wc1 | wc2 idle | wc2 armed |
| ------------------ | -----: | ------: | ------: | -------: | --------: |
| Switch layer count |      5 |       5 | **105** |        5 |   **105** |
| Button layer count |      5 |       5 |       5 |        5 |         5 |

`will-change: transform` on the thumb promotes **one composited layer per Switch instance**.
The color-longhand hints promote nothing (Button and the Switch indicator stay unpromoted) —
which cleanly isolates the active ingredient: **the entire −5.3% comes from the promoted
transform thumb**, since Button carries the identical color hint and moves 0%. GPU memory per
layer is not exposed by this protocol surface; layer count is the measured proxy, and it
scales linearly and unboundedly with instance count.

### 5. Scoped variant (W2) — armed behaviour

With the mouse parked over the surface (probe-verified armed on every cell, first and last
instance; the armed state survives the per-window remounts because the provider element
persists), 3 reps, n = 93/cell:

| Component | armed control | armed wc1 | armed wc2 | wc1 vs control | wc2 vs control |
| --------- | ------------: | --------: | --------: | -------------: | -------------: |
| Switch    |        11.855 |    11.210 |    11.250 |         −5.44% |     **−5.10%** |
| Button    |         8.200 |     8.185 |     8.255 |         −0.18% |         +0.67% |

W2 behaves exactly as designed: **free when idle** (0 equivalence diffs, −0.08% timing,
5 layers), **equal to the static ceiling when armed** (−5.10% vs wc1's −5.44%, 105 layers).
But the ceiling is W1, and W1 does not address the cliff.

### 6. Transition-suppression bracket — is the saving transition processing? No.

Same suppression stylesheet as the variant matrix (`transition-property: none !important`),
3 reps:

| Component | Leg     | As shipped | Suppressed | Attributable to transitions |
| --------- | ------- | ---------: | ---------: | --------------------------: |
| Switch    | before  |      4.553 |      2.385 |               2.168 (47.6%) |
| Switch    | control |     11.918 |      2.660 |               9.258 (77.7%) |
| Switch    | **wc1** |     11.288 |  **2.200** |               9.088 (80.5%) |
| Switch    | wc2     |     11.908 |      2.695 |               9.213 (77.4%) |
| Button    | before  |      3.368 |      1.255 |               2.113 (62.7%) |
| Button    | control |      8.353 |      0.715 |               7.638 (91.4%) |
| Button    | wc1     |      8.445 |      0.745 |               7.700 (91.2%) |
| Button    | wc2     |      8.383 |      0.735 |               7.648 (91.2%) |

The transition-attributable cost on Switch moves 9.258 → 9.088 ms (−1.8%) — inside noise, like
every other lever tested against it. And the tell: **with transitions suppressed entirely, wc1
is still 0.46 ms faster than control** (2.200 vs 2.660). The −0.63 ms is
transition-independent layout work on the promoted thumbs, not a dent in the ~9 ms of
transition processing. The unexplained ~8 ms remains unexplained and untouched.

## Verdict

**No — `will-change` does not address the E-cliff, on either component, in either form.**

- The cliff is transition processing inside style recalculation; recalc is byte-flat under the
  hint (Switch +0.01%, Button +1.6% single-trace / +1.1% pooled).
- Button (color longhands only): zero effect, zero layers, zero everything.
- Switch: −5.3% total, fully accounted for by layout on the 100 thumb layers that
  `will-change: transform` promotes, and still present with transitions suppressed. It shrinks
  the +161.8% regression to roughly +148% — the same magnitude the `calc(var(--base-scale))`
  collapse buys, and similarly cosmetic against a 2.6× cliff.
- This is the fourth tested-dead lever, after selector policy, named groups and
  longhand-count tightening. The elimination now covers: declared longhand count, selector
  shape, attribute writes, layout, paint, **and compositor hinting**. What remains is what the
  post-tightening report already concluded: a Blink-level diagnostic of what recalc does
  per transitioned property for a layered CSS-Modules rule vs a Griffel flat atomic rule.

## Ship considerations (if the Switch −5% were ever wanted anyway)

- **Memory / layer explosion:** one composited layer per Switch instance, unbounded — 100
  switches = 100 extra layers (measured 105 vs 5). This is precisely the documented failure
  mode of blanket `will-change`, and it is the entire source of the win.
- **Antialiasing risk:** promoted-layer AA changes were **not** VR-adjudicated here (nothing
  ships from this experiment). Exposure is limited: the only promoted element is the thumb
  `<svg>` — no text on a promoted layer on either component. Any ship attempt would still need
  the VR gate to rule, per the zero-tolerance protocol.
- **The scoped (W2) pattern is technically sound** — computed-equivalent and 0 layers when
  idle, full W1 behaviour under hover, survives re-renders — and one integration lesson is
  recorded above (never anchor on `fui-FluentProvider`; the static class is
  instance-suffixed). Worth remembering if a future _transform-animation_ surface wants a
  hover-armed hint; not worth shipping for this.

## Recommendation

Do not ship `will-change` in the converted CSS. It leaves the actual regression mechanism
untouched and its one small win pays in exactly the currency (per-instance composited layers)
that `will-change` guidance warns about. The open ~8 ms question stays owned by the
transition-processing diagnostic; per the post-tightening conclusion, further edits to the
converted CSS should continue to be justified by correctness or size, not predicted
scenario-E gains.

## Reproduction

Everything lives in `.scratch/perf-eval/will-change/` (gitignored): `build-css.mjs` (leg
construction + `css-diffs.json`), `run.mjs` (equivalence / timing / trace / layers / armed /
suppressed passes), `probe-armed.mjs` (hover-persistence probe), `analyze.mjs`,
`results/` (raw JSON + `summary.txt`).

```sh
npx nx run-many -t build -p react-avatar,react-badge,react-button,react-divider,react-field,react-label,react-provider,react-switch,react-tooltip
cd .scratch/perf-eval/harness && PERF_LEG=after node ../../../node_modules/vite/bin/vite.js build
# copy dist/after -> dist/wc-control, restore dist/after from dist/after1
cd ../will-change && node build-css.mjs
node run.mjs --pass=equivalence,timing,trace,layers --reps=6
node run.mjs --pass=armed,suppressed --reps=3
node analyze.mjs
```

## Caveats

- Single machine, single session, headless Chromium — only paired deltas are portable.
- The trace pass is one run per cell; its per-cell recalc numbers are noisier than the pooled
  wall clock (Button wc1/wc2 recalc read +1.6%/+2.8% in trace vs +1.1%/+0.4% pooled). The
  Switch layout attribution is trusted because it matches the pooled wall-clock delta and the
  layer-count mechanism.
- The suppression pass is diagnostic, not equivalence-verified (by construction), identical in
  method to the prior reports' brackets, and its universal-selector overhead means
  attributable figures are slight underestimates (Divider's ~−0.15 ms floor, same as before).
- W1/W2 were built by injecting declarations into the built CSS asset rather than editing
  `*.module.css` sources and rebuilding — same technique as the variant matrix. The in-page
  equivalence pass (computed styles including `will-change` on every element of the subtree)
  is what makes the two construction routes interchangeable for runtime measurement.
- Scenario E arms W2 via hover over one instance; real-world arming coverage (which instances
  a pointer can arm at once) is a UX question outside this harness's scope.

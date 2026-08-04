# Does replacing `[data-*]` SELECTORS with constant global CLASSES move the E-cliff? — No.

Date: 2026-08-04 · Branch: `styling/tailwind-css-modules` · HEAD `1350988449` ·
Experiment only — nothing here shipped. This experiment required BOTH CSS and JS changes:
the CSS legs are post-build transforms inside the gitignored `.scratch/perf-eval/` harness,
and the JS leg was built by temporarily patching two working-tree hooks
(`useSwitchStyles.styles.ts`, `useButtonStyles.styles.ts`), building the leg bundle, then
reverting — `git status` verified byte-identical to the pre-experiment snapshot immediately
after the build and again before this commit; the reverted packages were rebuilt so `lib/`
outputs are unpatched too. The only commit is this report.

Follow-up to `perf-selector-order.md` (whose harness, control bundle, anchor and protocol
this run reuses) and `perf-eval.md` (CORRECTION + post-tightening). Established context
taken as given: the scenario-E cliff is transition processing inside style recalculation;
six levers are tested-dead (selector policy incl. dual-vs-single, named groups, transition
tightening, data-attr write cost, `will-change`, dual-list order). The one untested selector
dimension left: **attribute-selector vs class-selector matching cost on the same element,
same state, same logic** — the user's design: constant global classes representing the
data-attribute property/value pairs, swapped into the variant selectors, toggled via clsx on
exactly the condition that drives the data-attribute write (the `data-*` WRITES stay).

## Bottom line

**Class-vs-attribute selector form does not matter — the seventh tested-dead lever.**
With all 82 `[data-*]` selector sites in the E-cell scope swapped to constant classes and
the classes live on the DOM (equivalence- and liveness-verified), scenario-E totals move
**+0.02% (Switch)** and **−0.57% (Button)** vs control — inside the Divider drift band
(±0.77% this session), per-repetition medians fully interleaved. Style recalculation — where
the cliff lives — is flat in the decomposed trace (Switch −0.24%, Button +0.02%), and the
transition-attributable cost is flat in the suppression bracket (+0.5% / −1.1%). The
attribute→class replacement dimension is closed.

## Design

### The two legs (both required, built once each)

| Leg         | Bundle            | What it is                                                                                                                                                                                                                            |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **before**  | `dist/before`     | original Griffel bundle — contemporaneous anchor, re-run this session                                                                                                                                                                 |
| **control** | `dist/wc-control` | migrated bundle built from HEAD — reused from the will-change run; `git diff --stat 3dea025d77..HEAD` shows only 2 report files, no `packages/` change                                                                                |
| **cajs**    | `dist/cajs`       | **JS-side null control**: hooks patched to append `fui-dx-*` classes mirroring every `data-*` write (same conditions, same values), rebuilt; CSS **byte-identical to control** (same sha1). Classes on the DOM, nothing selects them. |
| **ca1**     | `dist/ca1`        | **the experiment leg**: same JS as cajs (byte-identical, sha1 `4b993ed21f`); CSS with all 82 E-cell `[data-*]` selector sites swapped to the class selectors                                                                          |

- JS side: `clsx(styles.root, 'group/fui-switch', <fui-dx-* mirrors>, state.root.className)`
  — Switch adds `fui-dx-orientation-{horizontal|vertical}`, `fui-dx-size-${size}`,
  `label && fui-dx-label-position-${labelPosition}`, `checked === true && fui-dx-checked`,
  and the disabled mirror on its exact existing condition; Button adds `fui-dx-size-${size}`,
  `icon && [fui-dx-icon-position, fui-dx-icon-position-${iconPosition}]`,
  `iconOnly && fui-dx-icon-only`, `disabled && fui-dx-disabled`,
  `disabledFocusable && fui-dx-disabled-focusable`, `!children && fui-dx-empty`. No
  MutationObserver mirroring anywhere — the class rides the same hook write path as the
  attribute. Rebuilding the two packages left both `dist/styles.css` files hash-identical
  (only JS changed), and the leg harness build emitted a CSS asset byte-identical to
  control's — confirming the JS patch had zero CSS side effects.
- CSS side: postcss + postcss-selector-parser transform over the built control CSS,
  E-cell scope only (rules whose ancestor-resolved chain matches
  `fuicm-(switch|button|compound-button|menu-button|split-button|toggle-button)-`).
  Mapping is mechanical: `[data-X]` → `.fui-dx-X`, `[data-X=V]` → `.fui-dx-X-V`. The native
  alternatives in the dual lists (`[disabled]`, `:disabled`, `:checked`,
  `[aria-disabled=true]`, `:empty`, `:focus-within`) are untouched.
- **No bundle-wide sub-leg.** The JS side cannot be done wide cheaply: every other
  component's hook would need the mirror patch, and `data-fui-focus-*` would need
  `react-tabster` — one of the 13 shared packages the harness pins across legs by
  construction, so patching it would break the harness's own control. Scoped to E-cells,
  as the design anticipated.

### Mapping table and swap counts (recorded per-site in `.scratch/perf-eval/class-vs-attr/css-diffs.json`)

82 sites swapped, E-cell `[data-` occurrences 82 → 0, out-of-scope occurrences 206 → 206
(unchanged). All 82 sites sit inside a `:where()` context (`zeroSpecificityContext` 82/82) —
and the swap is cascade-invariant even outside one, since an attribute selector and a class
selector are both (0,1,0) and `:not()`/`:is()` take the max over alternatives.

| Attribute form                 | Constant class                  | Sites |
| ------------------------------ | ------------------------------- | ----: |
| `[data-disabled]`              | `.fui-dx-disabled`              |    18 |
| `[data-fui-focus-visible]`     | `.fui-dx-fui-focus-visible`     |    12 |
| `[data-checked]`               | `.fui-dx-checked`               |    10 |
| `[data-size=small]`            | `.fui-dx-size-small`            |     9 |
| `[data-disabled-focusable]`    | `.fui-dx-disabled-focusable`    |     9 |
| `[data-size=large]`            | `.fui-dx-size-large`            |     5 |
| `[data-label-position=above]`  | `.fui-dx-label-position-above`  |     3 |
| `[data-icon-only]`             | `.fui-dx-icon-only`             |     3 |
| `[data-label-position=before]` | `.fui-dx-label-position-before` |     2 |
| `[data-label-position=after]`  | `.fui-dx-label-position-after`  |     2 |
| `[data-empty]`                 | `.fui-dx-empty`                 |     2 |
| `[data-icon-position]`         | `.fui-dx-icon-position`         |     2 |
| `[data-fui-focus-within]`      | `.fui-dx-fui-focus-within`      |     1 |
| `[data-orientation=vertical]`  | `.fui-dx-orientation-vertical`  |     1 |
| `[data-icon-position=before]`  | `.fui-dx-icon-position-before`  |     1 |
| `[data-icon-position=after]`   | `.fui-dx-icon-position-after`   |     1 |
| `[data-size=medium]`           | `.fui-dx-size-medium`           |     1 |

The two tabster-written forms (`data-fui-focus-visible/-within`, 13 sites) have no class
writer — tabster is out of cheap reach (above). They are selector-shape-only swaps: the
liveness pass confirms neither attribute ever appears in this harness (nothing is focused),
so those alternatives are equally inert on every leg and still exercise the matching-cost
dimension under test. A shipped version would need tabster to write the classes.

Bundle accounting: CSS 99,423 → 99,505 bytes (+82); JS 269,814 (control) → 270,223
(cajs/ca1, +409). cajs CSS sha1 == control CSS sha1; cajs JS sha1 == ca1 JS sha1.

### Protocol

Same as the will-change / selector-order runs: scenario E = toggle a state prop across 100
mounted instances (Switch `checked`, Button `disabled`, Divider `appearance` as drift
control), 5 discarded warm-ups + 31 measured windows per cell, leg order reshuffled per cell
from seed `20260806`, one machine-exclusive headless-Chromium session, pooled medians over
6 reps (n = 186/cell); trace + suppression bracket 3 reps.

## Equivalence — verified before any timing

Full computed-style + geometry fingerprint of one instance's subtree in both toggle states,
all four legs, 41 properties. Among migrated legs nothing is intended, so the bar is zero
diffs of any kind:

- cajs vs control, ca1 vs control, ca1 vs cajs: **0 diffs of any kind**, all 3 components ×
  both states (9 comparisons). The class swap reproduces the attribute selectors' rendering
  exactly, in both states.
- control vs before: only the 2 known intended `transition-property` diffs per tightened
  component (0 on Divider) — re-confirming post-tightening equivalence on the reused control.

## Liveness — the leg is live, not silently inert (the will-change lesson)

In-page probes on cajs and ca1, with control as negative control:

- **The classes toggle.** Switch root: base
  `[fui-dx-orientation-horizontal, fui-dx-size-medium, fui-dx-label-position-after]`,
  toggled adds `fui-dx-checked`. Button root: base `[fui-dx-size-medium]`, toggled adds
  `fui-dx-disabled`. Control carries no `fui-dx-*` anywhere.
- **The swapped rules match.** Toggled Switch root `matches('.fui-dx-checked')` ✓; input
  matches the full swapped descendant selector
  `.fuicm-switch-root-292ad4:where(.fui-dx-label-position-after) .fuicm-switch-input-7214bc` ✓
  and the swapped checked list `:where(.fui-dx-checked,:checked)` ✓ (via `:checked`).
  Toggled Button root matches `.fui-dx-disabled` ✓ and the full swapped disabled list ✓.
- **Stylesheet side.** ca1: 62 CSSOM rules contain a `.fui-dx-` selector, **0** E-cell rules
  contain `[data-` (source-level: 82 → 0 occurrences). cajs: 0 and 43 respectively —
  the intended null. Tabster attributes confirmed absent throughout on every leg.

## Results

### 1. Scenario-E total (commit + forced style/layout), pooled median ms, n = 186/cell (6 reps × 31)

| Component | Leg     | Median (ms) |    p25 |    p75 | IQR/med | Commit | Style+layout |
| --------- | ------- | ----------: | -----: | -----: | ------: | -----: | -----------: |
| Switch    | before  |       4.565 |  4.333 |  4.933 |  13.14% |  1.015 |        3.510 |
| Switch    | control |      11.708 | 11.501 | 12.109 |   5.19% |  0.960 |       10.685 |
| Switch    | cajs    |      11.860 | 11.543 | 12.169 |   5.28% |  1.000 |       10.720 |
| Switch    | ca1     |      11.710 | 11.451 | 12.099 |   5.53% |  0.988 |       10.640 |
| Button    | before  |       3.350 |  3.281 |  3.470 |   5.63% |  0.490 |        2.855 |
| Button    | control |       8.360 |  8.121 |  8.963 |  10.06% |  0.378 |        7.933 |
| Button    | cajs    |       8.295 |  8.071 |  8.766 |   8.38% |  0.390 |        7.858 |
| Button    | ca1     |       8.313 |  8.078 |  8.859 |   9.40% |  0.400 |        7.870 |
| Divider   | before  |       1.280 |  1.255 |  1.310 |   4.30% |  0.465 |        0.810 |
| Divider   | control |       1.300 |  1.281 |  1.340 |   4.52% |  0.265 |        1.035 |
| Divider   | cajs    |       1.300 |  1.276 |  1.330 |   4.13% |  0.265 |        1.030 |
| Divider   | ca1     |       1.310 |  1.275 |  1.359 |   6.39% |  0.270 |        1.038 |

Per-repetition medians — every migrated pairing interleaves with control:

| Component | Leg     |  rep 1 |  rep 2 |  rep 3 |  rep 4 |  rep 5 |  rep 6 |
| --------- | ------- | -----: | -----: | -----: | -----: | -----: | -----: |
| Switch    | control | 11.695 | 11.700 | 11.845 | 11.900 | 11.675 | 11.625 |
| Switch    | cajs    | 11.835 | 11.705 | 11.735 | 12.075 | 11.975 | 11.730 |
| Switch    | ca1     | 11.670 | 11.735 | 11.635 | 12.075 | 11.595 | 11.880 |
| Button    | control |  8.280 |  8.360 |  8.325 |  8.305 |  8.295 |  8.805 |
| Button    | cajs    |  8.310 |  8.420 |  8.195 |  8.210 |  8.235 |  8.430 |
| Button    | ca1     |  8.360 |  8.270 |  8.355 |  8.240 |  8.335 |  8.270 |

### 2. Deltas vs control

| Component | Leg            |   Δ total | Δ total % | Δ commit % | Δ style+layout % |
| --------- | -------------- | --------: | --------: | ---------: | ---------------: |
| Switch    | cajs (JS-only) | +0.153 ms |    +1.30% |     +4.17% |           +0.33% |
| Switch    | **ca1 (full)** | +0.003 ms |    +0.02% |     +2.86% |           −0.42% |
| Button    | cajs (JS-only) | −0.065 ms |    −0.78% |     +3.31% |           −0.95% |
| Button    | **ca1 (full)** | −0.048 ms |    −0.57% |     +5.96% |           −0.79% |
| Divider   | cajs           |  0.000 ms |     0.00% |      0.00% |           −0.48% |
| Divider   | ca1            | +0.010 ms |    +0.77% |     +1.89% |           +0.24% |

Divider's ±0.77% is the drift band this session; every experiment-leg total sits inside it.
The commit upticks (+2.9% to +6.0%) are the extra clsx arguments plus the className diff on
toggle — +0.022 to +0.040 ms absolute, an order of magnitude below the cells' IQRs — and
style+layout, where the cliff lives, absorbs nothing.

**Griffel anchor (contemporaneous, same session):** control vs before is **+156.5%** on
Switch (4.565 → 11.708 ms) and **+149.6%** on Button (3.350 → 8.360 ms) — in family with
+157.3%/+147.9% (main evaluation), +161.8%/+148.0% (will-change run) and +160.6%/+154.0%
(selector-order run). The cliff is intact on the reused control build.

### 3. Trace — style recalc is flat (ms/iter, 10 traced iterations, single run per cell)

| Component | Leg     | Style recalc | Elements | Layout |
| --------- | ------- | -----------: | -------: | -----: |
| Switch    | before  |        3.118 |   11,000 |  1.417 |
| Switch    | control |       10.721 |   12,000 |  1.430 |
| Switch    | cajs    |       11.069 |   12,000 |  1.489 |
| Switch    | ca1     |       10.695 |   12,000 |  1.533 |
| Button    | before  |        2.740 |    2,000 |  0.396 |
| Button    | control |        7.566 |    2,000 |  0.397 |
| Button    | cajs    |        7.473 |    2,000 |  0.377 |
| Button    | ca1     |        7.568 |    2,000 |  0.383 |
| Divider   | control |        1.960 |    7,000 |  0.600 |
| Divider   | ca1     |        1.965 |    7,000 |  0.600 |

Recalc on the full leg: Switch **−0.24%**, Button **+0.02%** vs control. cajs reads
+3.2%/−1.2% — no consistent direction, inside the trace pass's known single-run noise (the
pooled clock puts cajs at +0.3%/−0.9% on style+layout). One accounting worth recording:
**invalidation width did not grow** — the class writes on the root ride the same commit as
the existing `data-checked`/`data-disabled` writes, and elements recalculated stay at
12,000/2,000 on both experiment legs, exactly control's numbers.

### 4. Transition-suppression bracket (3 reps)

| Component | Leg     | As shipped | Suppressed | Attributable to transitions |
| --------- | ------- | ---------: | ---------: | --------------------------: |
| Switch    | before  |      4.565 |      2.390 |               2.175 (47.6%) |
| Switch    | control |     11.708 |      2.685 |               9.023 (77.1%) |
| Switch    | cajs    |     11.860 |      2.700 |               9.160 (77.2%) |
| Switch    | ca1     |     11.710 |      2.645 |               9.065 (77.4%) |
| Button    | before  |      3.350 |      1.250 |               2.100 (62.7%) |
| Button    | control |      8.360 |      0.720 |               7.640 (91.4%) |
| Button    | cajs    |      8.295 |      0.765 |               7.530 (90.8%) |
| Button    | ca1     |      8.313 |      0.760 |               7.553 (90.9%) |

Transition-attributable cost on the full leg: Switch +0.5%, Button −1.1% vs control — noise,
like every other lever tested against it. Both halves of the bracket are insensitive to the
selector form.

## Verdict

**No — replacing data-attribute selectors with constant global class selectors does not
change state-toggle re-render cost, at any decomposition level measured.**

- Pooled totals: +0.02% (Switch) / −0.57% (Button), inside the ±0.77% drift band, per-rep
  medians interleaved with control.
- Style recalculation — the cliff — flat (−0.24% / +0.02% trace; −0.42% / −0.79% pooled
  style+layout).
- Transition-attributable cost flat (+0.5% / −1.1%).
- The JS-only null (cajs) shows the mirror classes themselves cost nothing measurable
  beyond a ~0.03 ms commit uptick.
- This is the **seventh tested-dead lever**, and it completes the selector dimension in
  every direction now tested: alternatives removed, selector shape/policy, dual-list order,
  and attribute-vs-class form — all dead. Consistent with the CORRECTION's mechanism: the
  cliff is per-transitioned-property work inside recalc, indifferent to how the state
  selectors are spelled.

## Recommendation

**No change to the conversion — do not ship this.** The perf case is zero, and shipping
would cost real contract ground:

- It would reintroduce **unhashed global classes** for component state — precisely what
  D16 removed (the BEM statics) and what D15.1 confines to the single named-group marker
  per component. 17 new public-looking `fui-dx-*` tokens would be a de facto API surface
  consumers would start selecting against.
- The tabster-driven states (`data-fui-focus-visible/-within`) would need `react-tabster`
  itself to write classes, widening the change beyond the component packages.
- The data-attribute writes must stay regardless (group-variant consumers read them), so
  shipping would mean maintaining BOTH representations of every state forever, toggled by
  parallel logic that can drift.

The open ~8 ms question remains owned by the Blink-level transition-processing diagnostic;
per the post-tightening conclusion, further converted-CSS edits should be justified by
correctness or size only.

## Reproduction

Everything lives in `.scratch/perf-eval/class-vs-attr/` (gitignored): `build-css.mjs`
(postcss transform + mapping/site record in `css-diffs.json`), `run.mjs`
(equivalence / liveness / timing / trace / suppressed passes), `analyze.mjs`, `results/`
(raw JSON + `summary.txt`), `git-status-before.txt` (tree-state snapshot).

```sh
# control reused from the will-change run (dist/wc-control); verify:
git diff --stat 3dea025d77..HEAD          # must show only report files, no packages/
# JS leg (the only step that touches the working tree — revert immediately after):
#   1. patch useSwitchStyles.styles.ts / useButtonStyles.styles.ts clsx compositions
#      with the fui-dx-* mirrors listed above
npx nx run-many -t build -p react-switch,react-button
mv .scratch/perf-eval/dist/after .scratch/perf-eval/dist/after-preexp-backup
cd .scratch/perf-eval/harness && PERF_LEG=after node ../../../node_modules/vite/bin/vite.js build && cd ..
cp -r dist/after dist/cajs && rm -rf dist/after && mv dist/after-preexp-backup dist/after
#   2. git checkout -- <the two hook files>; nx run-many again to restore lib/
cd class-vs-attr && node build-css.mjs     # writes dist/ca1
node run.mjs --pass=equivalence,liveness
node run.mjs --pass=timing --reps=6
node run.mjs --pass=trace,suppressed --reps=3
node analyze.mjs
```

## Caveats

- Single machine, single session, headless Chromium — only paired deltas are portable.
- The trace pass is one run per cell; its recalc numbers carry the usual single-run noise
  (cajs ±3%) and are read only as "flat", not as precise deltas; the pooled clock is the
  verdict number.
- The two tabster attribute forms were swapped without a class writer; they are inert on
  every leg in this harness (verified — the attributes never appear), so their swap tests
  selector-evaluation cost only, which is the dimension under test. Focus-path behaviour
  of the swapped CSS was NOT exercised and would break if this shipped without tabster
  changes — one more reason not to ship it.
- Scope is E-cell families only; a bundle-wide leg was not built (JS side not cheaply
  possible, see Design). Given the E-cell result is zero at the site of the cliff itself,
  a wide leg has nothing left to detect.
- The suppression pass is diagnostic, not equivalence-verified (by construction); its
  universal-selector overhead means attributable figures are slight underestimates
  (Divider's ~−0.15 ms floor, same as prior runs).
- cajs and ca1 share byte-identical JS that differs from control's JS (the patched hooks),
  so control↔ca1 spans both a JS and a CSS difference; cajs is the interposed null that
  separates them, and both deltas are inside the drift band anyway.

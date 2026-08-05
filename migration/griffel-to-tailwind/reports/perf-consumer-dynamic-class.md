# Consumer-side dynamic className: clsx concat vs `mergeClasses` re-merge — measured, flat, and the premise's mechanism corrected

Date: 2026-08-05 · Branch: `styling/tailwind-css-modules` · main HEAD `4e5e0935`, BEFORE
worktree `838ce804` · Chromium 141.0.7390.37 (Playwright, headless) · Experiment only —
nothing ships except this report; all instruments live in the gitignored
`.scratch/perf-eval/consumer-class/` and harness additions in `.scratch/perf-eval/harness/`;
`packages/` sources untouched in BOTH trees (git status verified byte-identical to the
pre-experiment snapshots, `consumer-class/git-status-pre-{main,before}.txt`).

Extends `perf-eval.md` with the one update-path case not yet measured: the **consumer**
conditionally changing the `className` it passes to components at runtime. Prior coverage:
initial render with a consumer class is faster post-migration (scenarios B/D, all
components), and steady-state re-render with unchanged classes is ~flat post-remedy
(`perf-property-remedy.md`). Untested until now: the passed string itself **changing** on
every flip.

## Bottom line

**Consumer-side dynamic class application is cheap in both worlds, and the migration is
flat-to-slightly-faster on the component that matters (Button −5%), slightly slower on the
control (Divider +6%).** There is no Griffel merge cliff to escape and no migration cliff
to fear:

| Cell (100 instances, per flip)           | Griffel (ms) | Migrated (ms) |      Δ | migrated:Griffel |
| ---------------------------------------- | -----------: | ------------: | -----: | ---------------: |
| **CC1 Button** — class a↔b               |        0.600 |         0.570 |  −5.0% |             0.95 |
| CC2 Button — class a↔undefined           |        0.595 |         0.560 |  −5.9% |             0.94 |
| CC3 Button — re-render, class unchanged  |        0.320 |         0.265 | −17.2% |             0.83 |
| CC1 Divider — class a↔b                  |        0.995 |         1.055 |  +6.0% |             1.06 |
| CC2 Divider — class a↔undefined          |        0.975 |         1.050 |  +7.7% |             1.08 |
| CC3 Divider — re-render, class unchanged |        0.295 |         0.245 | −16.9% |             0.83 |

Net class-change cost over an identical re-render (CC1 − CC3), per instance per flip:
**Button 2.80 µs (Griffel) vs 3.05 µs (migrated); Divider 7.00 vs 8.10 µs.** Inside that
net cost the two worlds trade the same two ingredients as everywhere else in this series:
the **JS ingredient is smaller after** (commit: Button −14.3%, Divider −38.1% on CC1) and
the **style-recalc ingredient is larger after** (Button +8.0%, Divider +39.6%), netting to
approximately zero. Both worlds invalidate **exactly the same number of elements** on the
flip (differenced: 100/flip for Button — the roots only; 300/flip for Divider), so the
recalc delta is the familiar per-element selector cost, not wider invalidation.

**The premise's mechanism is corrected by source + profile, not just by timing.** The
expectation was that a changed consumer class is a `mergeClasses` cache miss on every flip.
It is not, for plain consumer strings: `mergeClasses`' memoization key (`sequenceMatch`)
is built **only** from `___`-prefixed sequence hashes emitted by `makeStyles`/AOT
(`@griffel/core/mergeClasses.esm.js` — a string with no `___` never enters the cache key
and is concatenated into `resultClassName` outside the merge machinery). `app-marker-a` →
`app-marker-b` therefore changes only a string concat; the parse/dedupe/variant resolution
never re-runs. The CPU profile confirms it: `mergeClasses` self-time hits are **identical
with and without the class flip** (12 hits in CC1-repeat, 12 in CC3-repeat, 600 flips
each). What Griffel does pay on every call — hit or miss — is the per-argument parse loop
(`indexOf('___')` over 16 root arguments for Button), which is why its commit is 13–38%
slower than `clsx` here despite never missing cache. A consumer class that IS
`makeStyles`-produced (sequence-prefixed) takes the other path, but even that is one miss
per never-before-seen combination and then cached forever; the alternating case would hit
cache from the third flip on. Not measured here — CC is the plain-string case an app's own
stylesheet produces.

---

## Design

New scenario (CC), added to the retained series harness (`.scratch/perf-eval/harness/`,
one source built per leg — the same both-world method as the mechanism diagnostic). N=100
mounted instances; the component's own state props are **pinned** in every mode — the only
thing the flip may change is the consumer-provided `className`:

- **CC1 `swap`** — `className={cond ? 'app-marker-b' : 'app-marker-a'}`: the string
  changes on every instance every flip (the headline).
- **CC2 `presence`** — `className={cond ? 'app-marker-a' : undefined}`.
- **CC3 `stable`** — `className='app-marker-a'` constant; the flip changes only a parent
  prop, so all 100 instances re-render (fresh elements, no memo bailout) and the styles
  hook re-runs with unchanged inputs. Calibration: isolates re-render + steady-state hook
  cost so CC1 − CC3 is the class-change ingredient alone.

Components: **Button** (rich merge surface: 16-argument root `mergeClasses` fed by 7
styles hooks on the Griffel leg, per `perf-eval.md`; root class string
`fui-Button r1f29ykk app-marker-a` before vs `fuicm-button-root-605c69 group/fui-button
app-marker-a` after — both DOM-probed this session) and **Divider** as the series' drift
control (heaviest Griffel token list: 40 root class tokens per `perf-eval.md` §5).

**Consumer CSS**: `.app-marker-a` / `.app-marker-b` defined in an app-level stylesheet
bundled with **identical content in both legs** (`harness/src/consumer.css`), styling only
`text-decoration-color` — chosen because it is (a) in neither world's Button
`transition-property` list (Griffel: `background, border, color`; migrated: the 6
tightened color longhands — both read from computed style this session, below), (b)
non-inherited, and (c) layout- and paint-inert while still observable in computed style.

**Bundles**: fresh from current HEAD — NOT the retained `dist/wc-control`, which predates
the shipped `@property` remedy. The 9 leg packages + `react-tailwind-theme` were rebuilt
via nx at `4e5e0935`; verified before any timing: **0 `@property` rules** in the
`cc-after` bundle CSS and in all 10 rebuilt package stylesheets (the remedy's
registry-clean state). The BEFORE leg builds from the retained `838ce804` worktree exactly
as every prior session. Stylesheet surface at load: before 651 style rules / 11 sheets
(Griffel pre-injected by the harness's equalisation step), after 603 rules / 3 sheets.

**Protocol**: series-standard. Per window: mount base untimed, settle style+layout, then
time the flip (`flushSync` commit + forced `offsetHeight` style/layout, reported
separately). 31 windows + 5 discarded warm-ups per cell visit; **6 repetitions** with leg
order shuffled per cell per rep (seed 20260805); pooled **n = 186/cell**; one
machine-exclusive headless session per pass. Timer resolution measured in-page: 5 µs.
A secondary **flip-in-place** pass (mount once, 62 alternating a↔b flips on the same
mounted elements, 3 reps, steady state = flips 5–61, n = 171) covers the truest consumer
shape — results agree with the remount protocol everywhere (tables below).

## Liveness and no-transition proof (all hard-asserted before timing)

Per leg × component × mode (12 cells), probed on instance 1 and instance 100:

- the marker class **actually alternates in the DOM** (swap: `app-marker-a` present on all
  roots at base, `app-marker-b` after flip; presence: absent → present; stable: constant);
- both bundles' consumer CSS **applies**: computed `text-decoration-color` reads
  `rgb(1, 2, 3)` ↔ `rgb(4, 5, 6)` (swap) in both worlds — a silent 404 of either leg's
  stylesheet would have failed the assertion, not shipped a bogus number;
- **`document.getAnimations()` returns 0 after every flip** in all 12 cells — no CSS
  transition or animation starts, so the known transition story (`perf-mechanism-
diagnostic.md`) is fully excluded from these measurements;
- computed `transition-property` on the Button root: `background, border, color` (before)
  vs `background-color, border-top-color, border-right-color, border-bottom-color,
border-left-color, color` (after) — the documented tightening, neither containing the
  marker property. Divider computes `all` with `transition-duration: 0s` in both worlds
  (its known no-transition default); the getAnimations probe confirms nothing starts.

CC3's re-render is real, not a bailout: its commit medians (0.320/0.265 ms) reproduce the
mechanism diagnostic's independent K=0 cell (100 mounted, 0 toggled: 0.315/0.265 ms) to
within 5 µs, and the profile shows `useButton_unstable` / `useButtonStyles_unstable` /
`mergeClasses` frames sampled during CC3.

## Anchor — session tied to the series

Original scenario E, 3 reps pooled (n = 93), same session:

| Component | Griffel (ms) | Migrated (ms) | This series post-remedy (`perf-property-remedy.md`) |
| --------- | -----------: | ------------: | --------------------------------------------------- |
| Button E  |        3.275 |         3.455 | 3.4 vs 3.4–3.5                                      |
| Switch E  |        4.410 |         5.365 | 4.4 vs 5.3–5.4                                      |

Both cells reproduce the post-remedy state within the series' established variance — the
machine and bundles are continuous with the prior sessions' numbers.

---

## Results

### 1. Pooled timing — total per flip of 100 instances (remount protocol, n = 186/cell)

| Component | Mode         | Leg    | Median (ms) |   p25 |   p75 | IQR/med | Commit med | Style+layout med |
| --------- | ------------ | ------ | ----------: | ----: | ----: | ------: | ---------: | ---------------: |
| Button    | CC1 swap     | before |       0.600 | 0.580 | 0.615 |    5.8% |      0.350 |            0.250 |
| Button    | CC1 swap     | after  |       0.570 | 0.560 | 0.595 |    6.1% |      0.300 |            0.270 |
| Button    | CC2 presence | before |       0.595 | 0.575 | 0.610 |    5.9% |      0.345 |            0.250 |
| Button    | CC2 presence | after  |       0.560 | 0.545 | 0.595 |    8.9% |      0.300 |            0.260 |
| Button    | CC3 stable   | before |       0.320 | 0.305 | 0.340 |   10.9% |      0.317 |            0.000 |
| Button    | CC3 stable   | after  |       0.265 | 0.260 | 0.285 |    9.4% |      0.265 |            0.000 |
| Divider   | CC1 swap     | before |       0.995 | 0.975 | 1.024 |    4.9% |      0.440 |            0.555 |
| Divider   | CC1 swap     | after  |       1.055 | 1.035 | 1.085 |    4.7% |      0.273 |            0.775 |
| Divider   | CC2 presence | before |       0.975 | 0.955 | 1.005 |    5.1% |      0.420 |            0.555 |
| Divider   | CC2 presence | after  |       1.050 | 1.025 | 1.070 |    4.3% |      0.263 |            0.780 |
| Divider   | CC3 stable   | before |       0.295 | 0.280 | 0.315 |   11.9% |      0.295 |            0.000 |
| Divider   | CC3 stable   | after  |       0.245 | 0.231 | 0.264 |   13.3% |      0.243 |            0.000 |

Deltas (after vs before): Button CC1 **−5.0%** (commit −14.3%, style+layout +8.0%), CC2
−5.9%, CC3 −17.2%. Divider CC1 **+6.0%** (commit −38.1%, style+layout +39.6%), CC2 +7.7%,
CC3 −16.9%. CC2 tracks CC1 within noise in both worlds — toggling presence costs the same
as swapping; what is paid for is "the class attribute changed on 100 roots", not which or
how many marker tokens changed. Per-rep medians move ≤0.03 ms in every cell across all 6
reps (raw JSON `results/raw-timing.json`); the leg orderings were shuffled per cell per
rep, and no rep contradicts the pooled ordering.

CC3's own −17% is the already-reported steady-state re-render win (styles hook + commit
cheaper after; matches the diagnostic's K=0 cell), present here as the calibration floor.

### 2. Flip-in-place steady state (mount once, alternate a↔b, flips 5–61, n = 171)

| Component | Mode   | Griffel (ms) | Migrated (ms) |
| --------- | ------ | -----------: | ------------: |
| Button    | swap   |        0.585 |         0.545 |
| Button    | stable |        0.305 |         0.245 |
| Divider   | swap   |        0.950 |         1.040 |
| Divider   | stable |        0.280 |         0.220 |

Same story as the remount protocol (Button −6.8%, Divider +9.5%), on long-lived elements
flipping both directions — the literal shape of a consumer's conditional className.

### 3. Trace — recalc decomposition and invalidation breadth (10 iterations/cell)

Trace windows include the untimed per-window mount, so CC3 (whose flip invalidates
nothing — wall-clock style+layout is 0.000) doubles as the mount baseline; **CC1 − CC3 is
the flip-only ingredient**:

| Component | Cell                    | Recalc ms/iter before | after | Elements/iter before |   after |
| --------- | ----------------------- | --------------------: | ----: | -------------------: | ------: |
| Button    | CC1 swap                |                 0.476 | 0.527 |                  200 |     200 |
| Button    | CC3 stable              |                 0.222 | 0.253 |                  100 |     100 |
| Button    | **flip-only (CC1−CC3)** |                 0.254 | 0.274 |              **100** | **100** |
| Divider   | CC1 swap                |                 1.271 | 1.695 |                  700 |     700 |
| Divider   | CC3 stable              |                 0.707 | 0.917 |                  400 |     400 |
| Divider   | **flip-only (CC1−CC3)** |                 0.564 | 0.778 |              **300** | **300** |

- **Invalidation breadth is identical between worlds in every cell.** A changed class on
  100 Button roots recalculates exactly the 100 roots in both worlds; Divider's flip
  recalculates 300 (root + its two pseudo-element-bearing children per instance)
  in both worlds. The migration does not widen consumer-class invalidation.
- The flip-only recalc premium (after vs before) is Button +7.9%, Divider +37.9% —
  matching the wall-clock style+layout deltas above and the series' long-established
  per-element selector cost (Divider's mount-path recalc penalty was +28.9–30.1% in
  `perf-eval.md` §3).
- Scripting trace events (`FunctionCall`) are 0.023–0.030 ms/iter in all 8 cells — flat.
- Layout: Button ~0.36 ms/iter both worlds all cells; Divider ~0.58–0.63 — world-equal,
  a non-event as everywhere in this series.

### 4. CPU profile — named hot frames (unminified builds of the same source, flip-in-place, 600 flips)

Effective sampling interval ~570 µs (Chromium clamps the requested 100 µs), so per-frame
numbers are coarse and directional; used for attribution only.

| Leg × mode     | Top self-time frames (share of samples)                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| before, swap   | `forceStyleAndLayout` 40.9% · `always` (tabster) 5.3% · `getMetadataFromSlotComponent` 3.7% · `jsxsSlot` 3.2% · `useButton_unstable` 3.0% · **`mergeClasses` 1.7% (12 hits ≈ 6.9 ms /600 flips)** |
| after, swap    | `forceStyleAndLayout` 49.2% · `always` 4.8% · `getMetadataFromSlotComponent` 4.2% · `setAttribute` 3.5% · `jsxsSlot` 3.0% · **`clsx` 0.3% (2 hits ≈ 1.1 ms /600 flips)**                          |
| before, stable | `getMetadataFromSlotComponent` 7.6% · `always` 7.0% · … · **`mergeClasses` 3.4% (12 hits ≈ 7.3 ms /600 flips)**                                                                                   |
| after, stable  | `always` 9.4% · `updateProperties` 9.1% · `getMetadataFromSlotComponent` 8.8% · `useButton_unstable` 7.1% (`clsx` below sampling floor)                                                           |

Three attribution facts:

1. **The dominant cost of a consumer class flip in BOTH worlds is style recalculation**
   (the `forceStyleAndLayout` frame — the forced recalc the flip invalidated), not
   className computation. Everything else is ordinary React/slot machinery.
2. **`mergeClasses` does the same work whether the consumer class changes or not** — 12
   hits in swap, 12 in stable (≈ 0.11 µs per instance-flip at face value). The
   "cache-miss on every flip" mechanism does not exist for plain strings; its cost is the
   always-paid argument parse, which is also why Griffel's commit loses to `clsx` by a
   constant 0.05–0.17 ms per flip of 100 instances across the cells without any miss
   occurring.
3. The migrated leg's `clsx` is at the sampling floor (2 hits/600 flips) — consumer-side
   class concatenation is effectively free; its visible commit cost is React writing the
   attribute (`setAttribute`/`updateProperties` frames), which both worlds pay.

### 5. Per-instance, per-flip accounting (µs, medians from §1)

| Metric                                 | Griffel | Migrated | migrated:Griffel |
| -------------------------------------- | ------: | -------: | ---------------: |
| Button: total per instance (CC1/100)   |    6.00 |     5.70 |             0.95 |
| Button: net class-change (CC1−CC3)/100 |    2.80 |     3.05 |             1.09 |
| — of which commit (JS)                 |    0.33 |     0.35 |             1.06 |
| — of which style recalc                |    2.50 |     2.70 |             1.08 |
| Divider: total per instance            |    9.95 |    10.55 |             1.06 |
| Divider: net class-change per instance |    7.00 |     8.10 |             1.16 |

## Verdict, and what it means for consumers

- **Cost of consumer-side dynamic class application: ~2.8–8.1 µs per instance per flip
  depending on component and world; migrated:Griffel ratio 0.95–1.08 on the total, 1.09–
  1.16 on the isolated class-change ingredient.** The migration made the JS half cheaper
  and the recalc half dearer; on Button they net to a 5% win, on Divider a 6% loss.
- **Budget framing**: an application flipping a conditional className on **100 Button
  instances in one interaction pays ~0.57 ms end-to-end (migrated) vs ~0.60 ms (Griffel)**
  — about 3.5% of a 60 fps frame budget, in both worlds, including the full re-render.
  The class-change ingredient alone is ~0.3 ms per 100 instances. No plausible
  consumer-scale dynamic-class pattern approaches a frame budget in either world.
- The user's initial-render and steady-state premises were already measured (faster;
  ~flat). The untested middle case now is too: **there is no hidden merge cost on the
  Griffel side to have escaped, and no new cliff on the migrated side.** The only
  systematic consumer-visible difference is the familiar one — per-element style-recalc
  premium on class-flip invalidation (Button +8%, Divider +40% on that ingredient) —
  measured at +0.20 µs (Button) to +2.20 µs (Divider) per instance-flip.
- Sub-leg CC2 shows presence-toggling and string-swapping are indistinguishable; apps need
  not prefer one conditional-className shape over the other for performance.

## Caveats

- Single machine, single session per pass, headless Chromium 141.0.7390.37; only paired,
  interleaved deltas are portable. Spread is tight (IQR/med 4.3–13.3% on all 12 timing
  cells) and per-rep medians never reorder any conclusion.
- The consumer classes here are **plain strings styled by app CSS** — the stated scenario.
  A consumer alternating `makeStyles`-produced classes exercises `mergeClasses`' cached
  sequence path instead (first-occurrence miss, then cached); that case is bounded by the
  already-measured B/D overrides but was not isolated here.
- The marker property is deliberately transition- and layout-inert. A consumer class that
  changes transitioned properties re-enters the transition story
  (`perf-mechanism-diagnostic.md`) on top of these numbers, in either world; one that
  changes layout adds world-equal layout cost.
- CC3's trace recalc of 100 elements/iter is the untimed per-window remount's recalc (its
  timed flip invalidates nothing — wall-clock style+layout 0.000 ms both worlds); the
  differenced flip-only rows rely on that reading, and the wall-clock split (§1)
  corroborates it independently.
- Profile sampling was clamped to ~570 µs effective; frame shares under ~2% carry few
  hits (`clsx` 2, `mergeClasses` 12) and are order-of-magnitude attribution, not precise
  costs. Profiles came from unminified builds of the same source (never used for
  magnitudes); timing came from the standard minified builds.
- Divider's CC1 commit asymmetry (0.440 vs 0.273 ms) is consistent with its Griffel root
  carrying the series' largest merge surface (40 class tokens, `perf-eval.md` §5), but
  commit internals were not further decomposed here.

## Reproduction

Everything lives in `.scratch/perf-eval/` (gitignored):

```sh
cd .scratch/perf-eval/harness
# packages first: npx nx run-many -t build -p <9 leg packages>,react-tailwind-theme
for leg in before after; do
  PERF_LEG=$leg PERF_OUT=cc-$leg node ../../../node_modules/vite/bin/vite.js build
  PERF_LEG=$leg PERF_OUT=cc-$leg-src PERF_MINIFY=0 node ../../../node_modules/vite/bin/vite.js build
done
cd ../consumer-class
node run.mjs --pass=liveness            # hard-asserted; fails loudly
node run.mjs --pass=timing --reps=6
node run.mjs --pass=repeat,anchor
node run.mjs --pass=trace
node run.mjs --pass=profile             # uses the cc-*-src bundles
node tables.mjs                         # results/tables.md
```

Harness additions: `runCC`, `runCCRepeat`, `mountCC`, `probeCC` in
`harness/src/main.jsx`; `harness/src/consumer.css`; `PERF_MINIFY` knob in
`harness/vite.config.mjs`. Retained bundles from prior reports were not overwritten
(`PERF_OUT=cc-*`). Raw data: `consumer-class/results/raw-{liveness,timing,repeat,anchor,
trace,profile}.json` + `tables.md`.

# Mechanism diagnostic: the E-cliff is Blink's `@property` transition-start penalty — found, quantified, and remediable

Date: 2026-08-04 · Branch: `styling/tailwind-css-modules` · HEAD `cd601b3ac4` ·
Chromium 141.0.7390.37 (Playwright 1.56.1, headless) · Experiment only — nothing shipped;
all instruments live in the gitignored `.scratch/perf-eval/mechanism/`, `packages/` sources
untouched throughout (`git status` verified byte-identical to the pre-experiment snapshot).

Closes the question left open by `perf-eval.md` (CORRECTION + post-tightening) and the five
experiment reports (`perf-will-change`, `perf-selector-order`, `perf-class-vs-attr`,
`perf-where-wrapper`, `perf-layers-vs-literals`): after ten authoring levers tested dead and
var-indirection bounded at 12–20%, **what IS the remaining ~5.4–6.1 ms of
transition-attributable toggle cost, at the engine level — and can any authoring-side remedy
exist?**

## Bottom line

**The mechanism is found, and it is not a property of the migrated CSS's structure at all.**

Blink charges a page-global surcharge of **~9.1–9.7 µs per started CSS transition** whenever
the document's custom-property registry is non-empty — i.e. whenever **any `@property` rule
at all** exists in any stylesheet. The migration's theme artifact
(`react-tailwind-theme/css/utilities.css`) registers 8 focus-knob properties
(`--fui-focus-outline-*`, `--fui-focus-ring-*`, `syntax:'*'; inherits:false`); the Griffel
bundle registers none. Scenario E starts 700 (Switch) / 600 (Button) transitions per toggle
— identical counts in both worlds, verified two ways — so the surcharge is
700 × ~9.7 µs ≈ **6.8 ms** (Switch) and 600 × ~9.1 µs ≈ **5.5 ms** (Button): precisely the
residual gap this diagnostic was chartered to explain.

The evidence is a clean double dissociation, n = 93/cell, all legs interleaved:

| Leg (Switch E, N=100)                     | Median (ms) |     | Leg (Button E)    | Median (ms) |
| ----------------------------------------- | ----------: | --- | ----------------- | ----------: |
| Griffel (0 registrations)                 |         4.4 |     | Griffel           |         3.4 |
| migrated as shipped (8 registrations)     |        11.8 |     | migrated          |         8.2 |
| **migrated, `@property` stripped**        |     **5.4** |     | **stripped**      |     **3.4** |
| **Griffel + ONE dummy `@property`**       |    **10.6** |     | **Griffel + one** |     **8.0** |
| migrated stripped + ONE dummy `@property` |        11.6 |     | stripped + one    |         8.1 |

Stripping the registrations erases **100% of the Button gap** (3.4 = 3.4) and **~87% of the
Switch gap** (residual +1.0 ms ≈ +23%, in family with the known ordinary selector/var costs).
Injecting a single registration for a **never-referenced dummy property** into the untouched
Griffel bundle reproduces **~92–97% of the migrated cost** (Switch 10.6 vs 11.8, Button 8.0
vs 8.2). The effect is a **step function of registry-non-emptiness** — not of registration
count (8 vs 1: same cost), not of whether the registered properties are used anywhere
(`--mech-dummy` is referenced by nothing), and not of which styling system wrote the CSS.

**An authoring-side remedy exists and is measured**: stop shipping the 8 `@property`
registrations. See [Remedy assessment](#remedy-assessment) — the registrations are
semantically load-bearing (nested-component isolation of focus knobs), and the equivalent
isolation can be had without the registry; and the remedy is fragile at page scope (any
host-page `@property` from any library restores the penalty for everyone, Griffel included).

---

## Established context (cited, not re-derived)

- The E-cliff is transition processing: suppressing `transition-property` collapses the gap
  to +8–15% / −42% (`perf-eval.md` post-tightening §4).
- Byte-identical transition declarations cost ~4.2–4.4× more in the migrated bundle
  (CORRECTION; reproduced in every subsequent run).
- Ten authoring levers dead: selector policy ×4 legs, named groups, longhand tightening,
  `will-change`, `:where` wrapper, `@layer` structure, transitioned-value literals.
  Var-indirection in non-transitioned declarations = 12–20% of the gap
  (`perf-layers-vs-literals.md` LT2) — the only prior positive.
- Recalc breadth was already reported EQUAL between worlds: Switch E 11,000 both legs in the
  main evaluation (validity check 3), 11,000 before vs 12,000 after post-named-groups;
  Button 2,000 = 2,000; Divider 7,000 = 7,000 (`perf-eval.md` §3, post-tightening §3,
  layers-literals §3).

## Design

Two fresh bundles of the SAME harness source with three added instruments, built via a
`PERF_OUT` override so no retained bundle was touched:

| Leg        | Bundle             | Notes                                                                                                                                        |
| ---------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **before** | `dist/mech-before` | Griffel worktree packages, as all prior anchors                                                                                              |
| **after**  | `dist/mech-after`  | HEAD packages; **CSS asset sha1 `05ed0cae12db…` = byte-identical to `dist/wc-control`**, the control every experiment in the series measured |

Harness additions (`window.__perf`): `runMech({instances: N, toggledCount: K})` — scenario E
with N mounted and only the first K toggling; non-toggling instances carry a constant
`perf-bystander` class in both states; at K=N the tree is scenario E's. `runMechRepeat` —
flip the same mounted instances 31× without remounting. `toggleOnce` — one toggle burst left
mounted for animation-inventory probes. Protocol unchanged: 31 iterations + 5 warm-ups per
cell, 3 reps, leg order shuffled per cell (seed 20260818), pooled n = 93/cell, one
machine-exclusive headless session per pass.

Sanity (contemporaneous anchor): original scenario E on the mech bundles reproduces the
cliff — Switch 4.56 → 11.71 (+157%), Button 3.055 → 7.925 (+159%), in family with all six
prior sessions. `runMech(K=100)` tracks E within 0.1–0.8 ms on both legs (it omits the
scenario-B override hook; all comparisons below are within-protocol). Liveness: bystander
class present only on non-toggled instances, toggled indicator background changes, computed
`transition-property` reads Griffel's `background, border, color` vs the tightened 6
longhands — the known intended difference.

---

## Instrument 1 — recalc scope: the breadth hypothesis is dead on arrival

The primary hypothesis (Griffel invalidates ~1 instance while the migrated sheet invalidates
thousands) is **refuted by the already-published counts** (equal elementCounts in every
traced E cell, above) and by fresh per-K traces:

| Cell (Switch)         | before elements/toggle | after |     | Cell (Button) | before | after |
| --------------------- | ---------------------: | ----: | --- | ------------- | -----: | ----: |
| K=0 (no-op re-render) |                    600 |   600 |     | K=0           |    100 |   100 |
| K=1                   |                    605 |   606 |     | K=1           |    101 |   101 |
| K=10                  |                    650 |   660 |     | K=10          |    110 |   110 |
| K=100                 |                  1,100 | 1,200 |     | K=100         |    200 |   200 |

Invalidation grows by ~5–6 elements per toggled Switch instance and ~1 per Button instance
— **identically in both worlds** (the Switch +100 at K=100 is the known named-groups root
`data-checked` write). Button is the limiting case: its recalc scope contains **nothing but
the toggled buttons themselves** — zero bystanders — and its cost is still 2.8× (recalc
2.79 vs 7.69 ms/iter at K=100). The gap is per-toggled-instance **depth**, not breadth.

## Instrument 2 — scaling: cost = K × per-instance price; bystanders are free

Pooled medians (total window, ms; n = 93/cell):

| Cell        | Switch before | Switch after | Button before | Button after |
| ----------- | ------------: | -----------: | ------------: | -----------: |
| N=25 (K=N)  |         1.205 |        3.060 |         0.820 |        2.120 |
| N=50 (K=N)  |         2.280 |        5.900 |         1.625 |        4.090 |
| N=100 (K=N) |         4.400 |       11.835 |         3.330 |        8.215 |
| K=0 /N=100  |         0.940 |        0.860 |         0.315 |        0.265 |
| K=1         |         1.030 |        1.095 |         0.380 |        0.405 |
| K=10        |         1.365 |        2.065 |         0.635 |        1.125 |

- **Both worlds are linear in N** (Switch slopes 42.6 µs vs 117 µs per instance; Button
  33.5 vs 81.3) and **linear in K at fixed N** ((K10−K1)/9: Switch 37.2 vs 108 µs/instance;
  Button 28.3 vs 80.0 — matching the N-slopes). Cost is set by how many instances **toggle**,
  not how many are mounted.
- **At K=1, with 99 transition-declaring bystanders mounted, the two worlds are equal within
  65 µs.** The cliff only exists multiplied by K.
- **Bystander density probe** (parent instrument 4, run as specified): stripping
  `transition-property` from all bystanders via `.perf-bystander, .perf-bystander * { … none
!important }` (strip liveness probe-verified per leg) moves nothing at K=1 or K=10 in
  either world (all deltas ≤ 0.06 ms, legs interleave). Elements that declare transitions but
  don't change state cost nothing, in scope or out.

## Instrument 3 — bracket decomposition: the cost is transition START, not detection

Four arms at N=K=100 (injected page-wide rules; Divider = arm-overhead control), pooled
medians:

| Arm                                                           | Switch before | Switch after | Button before | Button after |
| ------------------------------------------------------------- | ------------: | -----------: | ------------: | -----------: |
| shipped                                                       |         4.385 |       11.645 |         3.410 |        8.340 |
| none (`transition-property: none`)                            |         2.330 |        2.695 |         1.255 |        0.730 |
| inert (`transition-property: letter-spacing`, durations kept) |         2.385 |        2.790 |         1.285 |        0.745 |
| duration0 (`transition-duration: 0s`, property lists kept)    |         2.940 |        3.425 |         1.410 |        0.855 |

Derived (per toggle of 100 instances):

|                                           | Switch before | Switch after | Button before | Button after |
| ----------------------------------------- | ------------: | -----------: | ------------: | -----------: |
| total transition machinery (shipped−none) |         2.055 |        8.950 |         2.155 |        7.610 |
| armed-but-idle machinery (inert−none)     |         0.055 |        0.095 |         0.030 |        0.015 |
| change detection (duration0−none)         |         0.610 |        0.730 |         0.155 |        0.125 |
| **transition start (shipped−duration0)**  |     **1.445** |    **8.220** |     **2.000** |    **7.485** |

Detection is cheap and world-equal (Divider's `transition: all 0s` detection surcharge is
also world-equal at ~0.69 ms). **The entire gap sits in the path that runs only when a
transition actually starts**: 5.7× (Switch) / 3.7× (Button).

## Instrument — animation inventory: identical starts, 4–6× price per start

`document.getAnimations()` and CDP `Animation.animationStarted` after one toggle burst agree
exactly, in both worlds: **Switch 700** CSSTransitions (100 × {background-color, 4 border
colors, color} on the indicator + 100 × transform on the thumb), **Button 600** (100 × the 6
color longhands on the root). A per-element computed-value diff confirms the same 6–7
properties change by the same amounts in both worlds. (An earlier trace-event count
suggesting Button 300 vs 600 was a trace artifact; the two ground-truth methods refute it.)

Per-started-transition price (start cost ÷ starts): **Switch 2.1 µs before → 11.7 µs after;
Button 3.3 µs → 12.5 µs.** The mechanism's surcharge: **9.7 µs (Switch) / 9.1 µs (Button)
per started transition** — 600–700 starts × ~9.4 µs = 5.5–6.8 ms = the residual gap.

## Instrument — slice tracing: the surcharge lives inside `Document::recalcStyle`

Extended-category traces (`blink`, `blink_style`, `blink.animations`,
`disabled-by-default-blink.debug`, …; instrumented numbers comparable within-pass only):

- Both worlds pay a **similar post-recalc chunk** (~2.5 ms/iter instrumented, between
  `UpdateLayoutTree` and the end of `Document::UpdateStyleAndLayout`) when transitions start
  — the common animation bookkeeping (creating the 600–700 CSSTransitions).
- The migrated leg pays an **additional ~7.9 ms/iter inside `Document::recalcStyle`**
  (shipped 44.4 vs none 36.5 per 10 iterations ×3 recalcs) that the Griffel leg does not
  (12.66 vs 12.60 — flat). The registry surcharge is style-resolution work during recalc.
- **SelectorStats** (per-selector match timings): match attempts do NOT increase from the
  none arm to the shipped arm in either world (Switch after 252k → 216k; before 223k →
  190k). The surcharge is **not selector re-matching** — it is per-element style
  re-application/interpolation work.

## Instrument — repeat-toggle: the penalty persists on long-lived elements

Flipping the same 100 mounted instances 31× without remounting (transitions from the
previous flip being replaced each time): steady-state (flips 5–30, pooled n = 78) — Switch
5.8 before vs 12.55 after; Button 4.0 vs 8.6; first-ever flip statistically identical to
steady state. Not a cold-start artifact; every toggle of mounted transition-carrying UI pays
it. (Both worlds run ~1.3 ms hotter per flip in this mode than in the remount protocol —
transition replacement costs both equally.)

## The step-function experiments

1. **noprop** — `dist/mech-after` CSS with the 8 `@property` blocks + the `@layer
properties` statement/fallback block removed (99,423 → 98,422 bytes; everything else
   byte-identical; computed-style + geometry fingerprint of Switch/Button subtrees in both
   states: **0 mismatches** vs control). The `@supports`-gated universal fallback rule was
   probe-verified **inert in this Chrome** (`CSS.supports` = false), so the active
   ingredient is the registrations alone. Result: Switch 11.8 → **5.4**, Button 8.2 →
   **3.4**, separated from control in 3/3 reps with no overlap.
2. **oneprop** — noprop + `@property --mech-dummy {syntax:"*"; inherits:false;}`, a property
   **no rule and no element references**. Result: Switch **11.6**, Button **8.1** — the full
   cost returns. CSSOM-verified registration counts per leg: 0 / 8 / 0 / 1.
3. **symmetry** — untouched Griffel bundle + the same dummy registration in a `<style>` tag.
   Result: Switch 4.5 → **10.6**, Button 3.4 → **8.0**. The penalty is styling-system-
   independent; Griffel atomics pay it identically once any registration exists.

### Engine reading

The measured behavior: with `document.GetPropertyRegistry()` holding ≥1 registration, the
transition-start path inside style recalc runs a per-element slow branch costing ~9–10 µs
per started transition; with an empty registry it short-circuits to ~2–3 µs. Blink's
transition code is visibly parameterized on the registry — per-start
`InterpolationTypesMap(registry, document)` construction
(`css_animations.cc` `CalculateTransitionUpdateForPropertyHandle`, `style_cascade.cc`
`ApplyInterpolation`), registry-gated custom-property checks in the same functions, and the
before/after-change-style machinery (`CalculateBeforeChangeStyle` →
`StyleResolver::BeforeChangeStyleForTransitionUpdate`, a cascade re-application) are the
implicated region; the base-computed-style optimization additionally documents a
custom-property carve-out (`CanReuseBaseComputedStyle`: "Animating a custom property can
have side effects on other properties via variable references"). The exact branch was not
conclusively pinned to a single line from source inspection and does not need to be: the
step function is established behaviorally with a never-referenced registration on both
styling systems, on Chromium 141. This is fair to characterize as a **Chromium optimization
gap** — the fast path keys on "any registration exists" rather than "a registered property
could actually transition here" — and is worth an upstream report.

---

## Remedy assessment

**Yes — an authoring-side remedy exists, it is concrete, and its ceiling is measured.**

The 8 registrations live in `packages/react-components/react-tailwind-theme/css/utilities.css`
and exist for one documented reason: `inherits: false` guarantees a focus knob set on one
component can never leak into a nested one (SplitButton renders a Button inside a Button),
and `syntax:'*'` with no initial-value makes unset knobs guaranteed-invalid so `var()`
fallbacks apply.

- **Option A (recommended candidate): drop the registrations; enforce isolation by reset.**
  Unregistered, unset knobs still resolve to their `var()` fallbacks (nothing sets them at
  page level), so rendering is unchanged by construction except for the leak case. The leak
  protection can be reproduced without the registry by resetting the 8 knobs to `initial`
  (guaranteed-invalid for unregistered custom properties) in each focus-styled component's
  root rule — 8 extra declarations per root rule, in the cascade layer the component already
  owns. Cost: bytes plus ordinary apply work, which the suppressed baselines bound as
  negligible. **Measured ceiling of the removal: Button E +145% → ±0% vs Griffel; Switch E
  +165% → +23%** (residual 1.0 ms = the ordinary selector/var costs previously bounded).
- **Option B: keep the registrations and accept the cost**, on the grounds that any host
  page carrying its own `@property` (Tailwind v4 apps emit them routinely, as do other
  design systems) puts BOTH worlds on the slow path anyway — measured: Griffel + one
  registration is within 2–11% of the migrated bundle. In `@property`-carrying hosts the
  migration has no material transition regression **today**; in registry-clean hosts it has
  the full cliff. Option A makes FluentUI registry-clean but cannot control the host page.
- **Either way, file the Chromium issue.** The surcharge is page-global, step-function, and
  paid by transitions on properties that have nothing to do with any registered property; a
  narrower engine gate would eliminate the class of problem for everyone.

What this diagnostic closes: the prior series' conclusion that "the residual is how Blink
processes a state change under this stylesheet" is now refuted in its stylesheet-shape
reading — layers, selectors, values, and declarations were all innocent; the trigger was two
lines of `@property` in the theme, and the ten dead levers stay dead for the right reason
(none of them touched the registry).

Accounting against the charter: mechanism attributed (registry-gated transition-start slow
path), price = **~9.4 µs per started transition** (~5.6–6.6 ms per 100-instance toggle at
6–7 transitions/instance; equivalently ~5.5–6.5 µs per recalc-scope element at Switch's
~1,150-element scope, though element count is not the driver — start count is), fraction of
the residual gap explained: **~100% (Button), ~87% (Switch)** by direct removal; ~92–97%
reproduced in reverse on Griffel by injection.

## Caveats

- Single machine, single session per pass, headless Chromium 141.0.7390.37; only paired,
  interleaved deltas are portable. The engine behavior itself is version-specific and may
  change in future Chromium; re-verify before acting on the numbers a year from now.
- Firefox/Safari were not measured; whether their transition paths carry an equivalent
  registry gate is unknown.
- The noprop equivalence fingerprint covers base and toggled states of the E components; the
  focus states the registered knobs exist for were NOT visited (nothing in the harness sets
  a knob, so fallback-equality holds by construction there — but a shipped Option A must
  VR-gate focus rendering and the SplitButton nesting case specifically).
- `runMech` K<N cells re-render all N instances through React each window (only K change
  props/DOM); commit cost is therefore ~flat in K while style cost scales — the style
  column carries the verdict, and commit is reported separately throughout.
- The slice-trace pass carries SelectorStats instrumentation overhead (~2–5× on matching);
  it is used only for within-pass structure, never for cross-pass magnitudes.
- The oneprop/symmetry dummy uses `syntax:'*'; inherits:false` like the shipped knobs;
  other registration shapes (typed syntax, initial values, `inherits:true`) were not
  varied. The step function is established for this shape; the engine reading predicts
  shape-independence but that is not measured here.
- The earlier trace-event Animation-count asymmetry (Button 300 vs 600) is recorded as a
  trace artifact; both ground-truth inventories disagree with it. No conclusion rests on it.

## Reproduction

Everything lives in `.scratch/perf-eval/mechanism/` (gitignored): `run.mjs` (passes:
sanity, scaling, sctrace, brackets, bystander, slices), `animations-repeat.mjs`,
`probe-noprop.mjs`, `probe-oneprop.mjs`, `probe-symmetry.mjs`, `results/` (raw JSON +
`summary.txt`), plus the fetched Blink sources (`css_animations.cc`, `style_resolver.cc`,
`style_cascade.cc`, `interpolation_types_map.cc`) for the engine-reading citations.
Harness additions are in `.scratch/perf-eval/harness/src/main.jsx` (`runMech`,
`runMechRepeat`, `toggleOnce`) and `vite.config.mjs` (`PERF_OUT`); retained bundles from
prior reports were not overwritten (`dist/mech-after`'s CSS is sha1-identical to
`dist/wc-control`).

```sh
cd .scratch/perf-eval/harness
PERF_LEG=after  PERF_OUT=mech-after  node ../../../node_modules/vite/bin/vite.js build
PERF_LEG=before PERF_OUT=mech-before node ../../../node_modules/vite/bin/vite.js build
cd ../mechanism
node run.mjs --pass=sanity
node run.mjs --pass=scaling,sctrace --reps=3
node run.mjs --pass=brackets,bystander --reps=3
node run.mjs --pass=slices
node animations-repeat.mjs
node probe-noprop.mjs        # builds dist/mech-noprop, equivalence + timing
node probe-oneprop.mjs       # builds dist/mech-oneprop (dummy @property)
node probe-symmetry.mjs      # dist/mech-before-prop (Griffel + dummy @property)
```

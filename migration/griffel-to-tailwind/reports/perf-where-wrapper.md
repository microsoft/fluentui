# Is the `:where()` WRAPPER STRUCTURE behind the E-cliff? — No. The wrapper is exonerated.

Date: 2026-08-04 · Branch: `styling/tailwind-css-modules` · HEAD `cc08e66bc1` ·
Experiment only — nothing here shipped; both legs are post-build CSS transforms inside the
gitignored `.scratch/perf-eval/` harness, `packages/` sources untouched throughout
(`git status` verified identical to the pre-experiment snapshot before this commit — the
only commit is this report).

Follow-up to `perf-class-vs-attr.md` (whose harness, control bundle, anchor and protocol
this run reuses) and `perf-eval.md` (CORRECTION + post-tightening). Established context
taken as given: the scenario-E cliff is transition processing inside style recalculation;
seven levers are tested-dead. The user's hypothesis motivating this run: the class-vs-attr
null was surprising — "maybe it has to do with the `:where` wrapper around them, because it
can't just be about transitions — the transitions already existed on the previous style."
Every prior selector leg changed the CONTENTS of `:where()` lists; this experiment removes
the WRAPPER itself.

## Bottom line

**The `:where()` wrapper is not the interaction term — eighth tested-dead lever, and the
cleanest null of the series.**

- **WU2 (`:where` → `:is`, same wrapper structure, non-zero specificity) is byte-flat:**
  Switch **0.00%**, Button **+0.21%**, Divider **0.00%** on pooled totals; recalc trace
  −0.4% / +0.3%; suppression bracket identical to control (Switch 9.1175 ms attributable on
  both). So neither the wrapper's zero-specificity behaviour nor any
  "specificity-related caching" is involved.
- **WU1 (no wrapper at all — lists distributed into plain selectors) is not faster; it is
  slightly SLOWER** (Switch +4.38%, Divider +6.90%, Button +0.15%), and the slowdown is
  **entirely in the non-transition half of the bracket** (suppressed baseline +15.7% /
  +12.5% / +11.8%), while the transition-attributable cost — where the cliff lives — moves
  +1.0% / −0.9% (noise). The WU1 penalty tracks the mechanical side effect of distribution:
  the 173 transformed rules grow from 173 to 277 top-level selectors, and even Divider —
  whose own rules are untouched — pays it, because the stylesheet is shared.
- **Fraction of the migrated-vs-Griffel transition gap explained by the wrapper: none.**
  Switch attributable gap vs Griffel: control 7.010 ms, wu1 7.103 ms, wu2 7.010 ms; Button:
  control 5.590 ms, wu1 5.518 ms, wu2 5.608 ms.

## Design

### Legs (CSS-only transforms; JS byte-identical to control across all migrated legs)

| Leg         | Bundle            | What it is                                                                                                                                                                        |
| ----------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **before**  | `dist/before`     | original Griffel bundle — contemporaneous anchor, re-run this session                                                                                                             |
| **control** | `dist/wc-control` | migrated bundle built from HEAD `3dea025d77` — reused; `git diff --stat 3dea025d77..HEAD` shows only 3 report files, no `packages/` change                                        |
| **wu1**     | `dist/wu1`        | control CSS with every E-cell `:where()` **unwrapped into a distributed plain selector list**: `sel:where(A,B) rest` → `selA rest, selB rest`. No wrapper remains.                |
| **wu2**     | `dist/wu2`        | control CSS with the **same sites** swapped `:where(...)` → `:is(...)` — structurally identical wrapper (same nesting, same list, same argument evaluation), non-zero specificity |

The two legs bracket the hypothesis: if WU1 (no wrapper) were faster but WU2 (different
wrapper) were not, the cost would be the wrapper; if both moved together, it would be
specificity-related; neither moved in the predicted direction, so the wrapper is exonerated.

Example transforms (recorded per-rule in `.scratch/perf-eval/where-unwrap/css-diffs.json`):

```
&:where([data-checked],:checked)                     → &[data-checked],&:checked            (wu1)
&:where([disabled],[data-disabled],:disabled,[aria-disabled=true])
                                                     → &[disabled],&[data-disabled],&:disabled,&[aria-disabled=true]
&:where(:not([data-checked],:checked))               → &:not([data-checked],:checked)
.fuicm-switch-root-292ad4:where([data-size=small]):where(:dir(rtl)) .fuicm-switch-input-7214bc:where([data-checked],:checked)~.fuicm-switch-indicator-541abe>*
   → two fully-distributed plain selectors (cross-product over both lists)
```

### Coverage and counts (the count instrument)

| Metric                                 | control |     wu1 |    wu2 |
| -------------------------------------- | ------: | ------: | -----: |
| `:where(` occurrences, whole bundle    |     322 |     133 |    133 |
| `:where(` occurrences, E-cell scope    | **189** |   **0** |  **0** |
| `:is(` added                           |       — |       0 |    189 |
| rules transformed (E-cell scope)       |       — |     173 |    173 |
| top-level selectors across those rules |     173 |     277 |    173 |
| CSS bytes                              |  99,423 | 101,889 | 98,856 |

**Coverage: 189 of 189 E-cell `:where()` sites unwrapped/swapped — zero exclusions**
(E-cell scope = Switch + button/compound/menu/split/toggle-button families, same regex as
the selector-order and class-vs-attr runs; the 133 out-of-scope sites are untouched).
In-page CSSOM counts confirm per leg: E-cell-classed selectors carry 121 `:where` on
control, 0 on both legs, 121 `:is` on wu2 only (the 121-vs-189 difference is a CSSOM
counting artifact — nested child rules' own `selectorText` is `&:where(...)` without the
`fuicm-` token; the source-level post-check verified 189 → 0 exactly).

### Cascade analysis — why full coverage was admissible despite a non-neutral transform

`:where()` zeroes specificity; both transforms raise it, so a rule that currently loses a
same-layer, same-property conflict by source order could flip to winning. Every leaf rule
bundle-wide (568) had its nesting-resolved selector specificity computed before/after
(`&` resolved as `:is(parent)`; 177 leaves are spec-affected), and winner order was
compared across conflict pairs. The conflict predicate for the measured environment:
same `@layer` chain (across layers, layer order decides regardless of specificity); both
rules applicable in the harness — media that cannot match headless-default Chromium
(`forced-colors: active`, `prefers-reduced-motion: reduce`) and selectors requiring states
that never occur in any measured or probed state (`:active`, `:focus`, `:focus-visible`,
`:focus-within`, `:dir(rtl)`, `[data-fui-focus-*]`) are out, while `:hover` stays IN
because the equivalence pass probes a hovered state; ≥1 shared declared property;
overlapping subject (shared rightmost-compound class, or universal subject in the same
component family); and not state-disjoint (a `[disabled]`-gated rule and a
`:not([disabled])`-gated rule can never match the same element; same for checked and for
conflicting `data-size`/`data-label-position`/`data-icon-position`/`data-orientation`
values).

Result: **106 conflict pairs winner-compared, 30 pairs vetoed as state-disjoint, 0 flips —
0 exclusions needed.** The mechanism: within co-applicable rules, every `:where` list in
scope has uniform-specificity alternatives (verified: 0 non-uniform lists), so raises are
uniform (+(0,1,0) per wrapper) and specificity ties — which is what source-order
precedence relies on — are preserved.

An **environment-scoped** flip list was also computed (applicability filter dropped,
pure-logic disjointness kept): **111 pairs would flip in a full environment** — 96 gated on
non-applying media (forced-colors / prefers-reduced-motion), 15 on never-occurring states
(pressed `:hover:active`/`:active:focus-visible` vs disabled, focus-visible, RTL). This is
the honest measure of "not cascade-neutral by construction": the legs are valid for this
harness (and equivalence-proven, below), but a shipped unwrap would additionally have to
resolve those 111. Nothing here ships, so they are recorded, not resolved. (One nuance:
`[data-disabled-focusable]` is folded into the disabled dimension for disjointness — exact
in this harness where it never occurs, an approximation outside it.)

### Protocol

Same as the will-change / selector-order / class-vs-attr runs: scenario E = toggle a state
prop across 100 mounted instances (Switch `checked`, Button `disabled`, Divider
`appearance` as drift control), 5 discarded warm-ups + 31 measured windows per cell, leg
order reshuffled per cell from seed `20260808`, one machine-exclusive headless-Chromium
session, pooled medians over 6 reps (n = 186/cell); trace + suppression bracket 3 reps.

## Equivalence — verified before any timing, with a hover state added

Full computed-style + geometry fingerprint of one instance's subtree, 41 properties, all
four legs — in base and toggled states for all components **plus a real-mouse `:hover`
state on Button** (the unwrap touches hover rules; the scenario states alone would not
exercise them; hover armed via Playwright mouse, probe-verified `matches(':hover')`,
captured after the 0.1 s transitions settle). Among migrated legs nothing is intended, so
the bar is zero diffs of any kind:

- wu1 vs control, wu2 vs control, wu1 vs wu2: **0 diffs of any kind**, all 3 components ×
  all states (base, toggled, and Button hover). The unwrapped and `:is`-swapped CSS
  reproduce the shipped rendering exactly — the zero-flip static analysis is confirmed by
  the arbiter.
- control vs before: only the known intended `transition-property` diffs (2 rows Switch,
  3 rows Button — the third is the same single diff observed again in the added hover
  state; 0 on Divider), re-confirming post-tightening equivalence on the reused control.

## Liveness — the transformed rules match the toggled elements (the will-change lesson)

In-page probes on control/wu1/wu2: toggled Switch input `matches('.fuicm-switch-input-7214bc:checked')`
✓ and the indicator matches the full unwrapped sibling selector
`.fuicm-switch-input-7214bc:checked~.fuicm-switch-indicator-541abe` ✓; toggled Button root
matches `[disabled]`, `:disabled`, `[data-disabled]` and the full `:is` disabled list ✓;
and the decisive application probe — the Switch indicator background-color changes on
toggle — passes on every leg (the state rules are live, not inert). CSSOM counts per leg as
in the coverage table.

## Results

### 1. Scenario-E total (commit + forced style/layout), pooled median ms, n = 186/cell (6 reps × 31)

| Component | Leg     | Median (ms) |    p25 |    p75 | IQR/med | Commit | Style+layout |
| --------- | ------- | ----------: | -----: | -----: | ------: | -----: | -----------: |
| Switch    | before  |       4.483 |  4.290 |  4.813 |  11.66% |  0.990 |        3.450 |
| Switch    | control |      11.823 | 11.566 | 12.138 |   4.83% |  0.958 |       10.828 |
| Switch    | **wu1** |  **12.340** | 12.104 | 12.715 |   4.95% |  0.955 |       11.320 |
| Switch    | wu2     |      11.823 | 11.536 | 12.214 |   5.73% |  0.960 |       10.805 |
| Button    | before  |       3.348 |  3.245 |  3.466 |   6.61% |  0.485 |        2.855 |
| Button    | control |       8.383 |  8.166 |  8.888 |   8.60% |  0.375 |        7.968 |
| Button    | wu1     |       8.395 |  8.190 |  9.034 |  10.05% |  0.375 |        7.973 |
| Button    | wu2     |       8.400 |  8.136 |  8.873 |   8.76% |  0.375 |        7.945 |
| Divider   | before  |       1.280 |  1.255 |  1.324 |   5.37% |  0.465 |        0.810 |
| Divider   | control |       1.305 |  1.275 |  1.335 |   4.60% |  0.265 |        1.035 |
| Divider   | **wu1** |   **1.395** |  1.375 |  1.420 |   3.23% |  0.270 |        1.125 |
| Divider   | wu2     |       1.305 |  1.280 |  1.334 |   4.12% |  0.265 |        1.035 |

Per-repetition medians — **wu1 separates from control in all 6 reps on Switch (12.29–12.395
vs 11.665–11.95, no overlap) and on Divider (1.38–1.41 vs 1.275–1.325, no overlap)**; every
other migrated pairing interleaves:

| Component | Leg     |  rep 1 |  rep 2 |  rep 3 |  rep 4 |  rep 5 |  rep 6 |
| --------- | ------- | -----: | -----: | -----: | -----: | -----: | -----: |
| Switch    | control | 11.800 | 11.835 | 11.745 | 11.950 | 11.865 | 11.665 |
| Switch    | wu1     | 12.395 | 12.310 | 12.340 | 12.290 | 12.365 | 12.355 |
| Switch    | wu2     | 11.685 | 11.865 | 11.790 | 11.645 | 11.905 | 11.985 |
| Button    | control |  8.325 |  8.400 |  8.465 |  8.395 |  8.265 |  8.390 |
| Button    | wu1     |  8.230 |  8.425 |  8.630 |  8.305 |  8.390 |  8.470 |
| Button    | wu2     |  8.320 |  8.400 |  8.480 |  8.350 |  8.340 |  8.495 |
| Divider   | control |  1.285 |  1.275 |  1.310 |  1.325 |  1.300 |  1.310 |
| Divider   | wu1     |  1.380 |  1.380 |  1.405 |  1.380 |  1.410 |  1.405 |
| Divider   | wu2     |  1.295 |  1.300 |  1.300 |  1.305 |  1.295 |  1.330 |

### 2. Deltas vs control

| Component | Leg     |   Δ total |  Δ total % | Δ commit % | Δ style+layout % |
| --------- | ------- | --------: | ---------: | ---------: | ---------------: |
| Switch    | **wu1** | +0.518 ms | **+4.38%** |     −0.26% |           +4.55% |
| Switch    | wu2     |  0.000 ms |  **0.00%** |     +0.26% |           −0.21% |
| Button    | wu1     | +0.013 ms |     +0.15% |      0.00% |           +0.06% |
| Button    | wu2     | +0.018 ms |     +0.21% |      0.00% |           −0.28% |
| Divider   | **wu1** | +0.090 ms | **+6.90%** |     +1.89% |           +8.70% |
| Divider   | wu2     |  0.000 ms |  **0.00%** |      0.00% |            0.00% |

wu2 Divider at exactly 0.00% puts this session's drift band near zero; wu1's Switch and
Divider deltas sit outside it and separate in 6/6 reps — a small real cost, not noise.
Note Divider: its own rules are untouched in wu1; it pays the cost of the shared
stylesheet's +104 top-level selectors, which is what identifies the WU1 penalty as
baseline selector-matching, not anything about the toggled component.

**Griffel anchor (contemporaneous, same session):** control vs before is **+163.8%** on
Switch (4.483 → 11.823 ms) and **+150.4%** on Button (3.348 → 8.383 ms) — in family with
+157.3%/+147.9% (main evaluation), +161.8%/+148.0% (will-change), +160.6%/+154.0%
(selector-order) and +156.5%/+149.6% (class-vs-attr). The cliff is intact on the reused
control build.

### 3. Trace — style recalc (ms/iter, 10 traced iterations, single run per cell)

| Component | Leg     | Style recalc | Δ vs control | Elements | Layout |
| --------- | ------- | -----------: | -----------: | -------: | -----: |
| Switch    | before  |        3.314 |            — |   11,000 |  1.455 |
| Switch    | control |       10.944 |            — |   12,000 |  1.375 |
| Switch    | **wu1** |   **11.881** |    **+8.6%** |   12,000 |  1.473 |
| Switch    | wu2     |       10.904 |        −0.4% |   12,000 |  1.450 |
| Button    | before  |        2.794 |            — |    2,000 |  0.388 |
| Button    | control |        7.568 |            — |    2,000 |  0.387 |
| Button    | wu1     |        7.926 |        +4.7% |    2,000 |  0.383 |
| Button    | wu2     |        7.589 |        +0.3% |    2,000 |  0.397 |
| Divider   | before  |        1.524 |            — |    7,000 |  0.620 |
| Divider   | control |        1.948 |            — |    7,000 |  0.586 |
| Divider   | **wu1** |    **2.252** |   **+15.6%** |    7,000 |  0.607 |
| Divider   | wu2     |        1.972 |        +1.2% |    7,000 |  0.595 |

Invalidation width is unchanged everywhere (element counts identical per component across
migrated legs). wu1's extra cost is per-element recalc, in the same direction on all three
components; wu2 is flat.

### 4. Transition-suppression bracket (3 reps) — the verdict instrument

| Component | Leg     | As shipped | Suppressed | Attributable to transitions | Δ attributable vs control |
| --------- | ------- | ---------: | ---------: | --------------------------: | ------------------------: |
| Switch    | before  |      4.483 |      2.375 |               2.108 (47.0%) |                         — |
| Switch    | control |     11.823 |      2.705 |               9.118 (77.1%) |                         — |
| Switch    | **wu1** |     12.340 |  **3.130** |               9.210 (74.6%) |                **+1.01%** |
| Switch    | wu2     |     11.823 |      2.705 |               9.118 (77.1%) |                 **0.00%** |
| Button    | before  |      3.348 |      1.275 |               2.073 (61.9%) |                         — |
| Button    | control |      8.383 |      0.720 |               7.663 (91.4%) |                         — |
| Button    | wu1     |      8.395 |      0.805 |               7.590 (90.4%) |                    −0.95% |
| Button    | wu2     |      8.400 |      0.720 |               7.680 (91.4%) |                    +0.23% |
| Divider   | before  |      1.280 |      1.425 |                   −0.145 ms |                         — |
| Divider   | control |      1.305 |      1.445 |                   −0.140 ms |                         — |
| Divider   | wu1     |      1.395 |      1.625 |                   −0.230 ms |                         — |
| Divider   | wu2     |      1.305 |      1.465 |                   −0.160 ms |                         — |

This is the decisive table, and it decomposes wu1's slowdown cleanly:

- **The transition-attributable cost — the cliff — does not move on either leg.** Switch
  +1.01% / 0.00%, Button −0.95% / +0.23%. The hypothesis predicted the unwrap would shrink
  the transition-attributable bracket specifically; it did not.
- **wu1's entire penalty is in the SUPPRESSED half** — the ordinary selector-matching
  baseline: Switch 2.705 → 3.130 (+15.7%), Button 0.720 → 0.805 (+11.8%), Divider 1.445 →
  1.625 (+12.5%). A consistent ~12–16% baseline-recalc surcharge across all three
  components, including transition-free Divider — the signature of the +104 extra top-level
  selectors that distribution creates, not of anything transition-related. On Button the
  baseline is so small (0.72 ms) that the surcharge (+0.085 ms) vanishes in the total;
  on Switch and Divider the baseline is larger and the surcharge shows up in the totals.

**Gap-explained accounting** (migrated-vs-Griffel transition-attributable gap): Switch —
control 9.118 − 2.108 = **7.010 ms**, wu1 **7.103 ms**, wu2 **7.010 ms**. Button — control
7.663 − 2.073 = **5.590 ms**, wu1 **5.518 ms**, wu2 **5.608 ms**. The wrapper explains
**none** of the 4.3× transition-cost ratio (Switch 9.118/2.108 = 4.33 on control; 4.37 on
wu1).

## Verdict

**No — the `:where()` wrapper structure is not the interaction term behind the E-cliff.**

- **Wrapper removed entirely (wu1): no improvement anywhere** — totals move +0.15% to
  +6.90% in the wrong direction, transition-attributable flat (+1.0%/−0.95%). The small
  real slowdown is fully accounted for by the mechanical selector-list inflation of
  distribution (173 → 277 selectors; ~12–16% baseline-recalc surcharge paid even by
  untouched Divider), i.e. it is an artifact of not having a grouping construct at all,
  not evidence about the cliff.
- **Wrapper kept but specificity un-zeroed (wu2): byte-flat on every instrument** (totals
  0.00%/+0.21%/0.00%; recalc −0.4%/+0.3%/+1.2%; suppression bracket identical). So the
  zero-specificity mechanism of `:where` — the one thing that distinguishes it from
  `:is` — costs nothing, and no specificity-keyed caching effect exists at this scale.
- Fraction of the 4.4× transition-attributable gap explained by the wrapper: **none**.
- This is the **eighth tested-dead lever** (selector policy incl. dual-vs-single, named
  groups, transition tightening, data-attr write cost, `will-change`, dual-list order,
  attribute-vs-class form, and now the `:where` wrapper itself). The selector dimension is
  now closed in every direction expressible in the dialect — contents, order, form, and
  wrapper. All evidence continues to point at the CORRECTION's mechanism: the cliff is
  per-transitioned-property work inside recalc, indifferent to how the state selectors are
  spelled or wrapped.

Worth keeping from the negative: **wu2 doubles as a free-standing measurement that
`:where(...)` and `:is(...)` are performance-equivalent in this bundle** — the dialect's
choice of `:where` for its cascade contract costs nothing at match time. And wu1 puts a
number on what the wrapper is worth structurally: removing it costs ~12–16% of baseline
recalc via selector multiplication.

## Recommendation

**No change to the conversion — do not unwrap.** Two independent reasons, either
sufficient:

1. **The perf case is negative**: unwrapping buys nothing on the cliff and costs a real
   baseline-recalc surcharge plus 2.5% CSS growth.
2. **Even a positive result would not have been a mechanical ship.** The dialect's cascade
   contract depends on `:where`'s zero specificity — the D-series decisions build module
   variant rules on "state gates add no weight, source order arbitrates". The analysis
   here measured that dependency directly: 111 conflict pairs would flip winners in a full
   environment (96 behind forced-colors/reduced-motion media, 15 behind
   pressed/focus/RTL states). A positive result would have triggered a design
   conversation about re-founding the cascade contract, not a transform rollout. The
   result being negative, the question is closed without that conversation.

The open ~8 ms question remains owned by the Blink-level transition-processing diagnostic;
per the post-tightening conclusion, further converted-CSS edits should be justified by
correctness or size only.

## Reproduction

Everything lives in `.scratch/perf-eval/where-unwrap/` (gitignored): `build-css.mjs`
(postcss + postcss-selector-parser transforms, nesting-resolved specificity calculator,
harness/environment cascade-flip analysis, per-rule record in `css-diffs.json`), `run.mjs`
(equivalence incl. Button hover / liveness / timing / trace / suppressed passes),
`analyze.mjs`, `results/` (raw JSON + `summary.txt`),
`../where-unwrap-git-status-pre.txt` (tree-state snapshot).

```sh
# control reused from the will-change run (dist/wc-control); verify:
git diff --stat 3dea025d77..HEAD          # must show only report files, no packages/
cd .scratch/perf-eval/where-unwrap
node build-css.mjs                        # writes dist/wu1, dist/wu2 + css-diffs.json
node run.mjs --pass=equivalence,liveness
node run.mjs --pass=timing --reps=6
node run.mjs --pass=trace,suppressed --reps=3
node analyze.mjs
```

## Caveats

- Single machine, single session, headless Chromium — only paired deltas are portable.
- The trace pass is one run per cell; its recalc numbers carry the usual single-run noise
  and corroborate direction only; the pooled clock is the verdict number.
- **Divider is a weaker drift control in this run than in prior runs**: the transforms live
  in the shared stylesheet, so Divider's wu1 cell is not a pure null — and its movement
  (+6.9%, separated 6/6 reps, +12.5% suppressed) is itself the evidence that the wu1
  penalty is stylesheet-baseline, not component-state, cost. wu2's Divider at exactly 0.00%
  supplies the clean drift reading for the session.
- The cascade-neutrality analysis is harness-scoped by design (hover applicable; pressed,
  focus, RTL, forced-colors, reduced-motion not). The 111 environment-scoped flips mean the
  wu1/wu2 CSS as built is NOT safe outside this harness; it was never intended to be.
  The zero-diff equivalence pass (base + toggled + Button hover) is the arbiter for every
  state the measurement visits.
- The equivalence hover state settles for 400 ms before capture (Button transitions are
  0.1 s); mid-transition sampling is excluded by construction, and the hover probe is
  verified armed (`matches(':hover')`) before capture.
- The suppression pass is diagnostic, not equivalence-verified (by construction); its
  universal-selector overhead means attributable figures are slight underestimates
  (Divider's ~−0.14 to −0.23 ms floor this session, same mechanism as prior runs).
- Legs were built by transforming the built CSS asset rather than editing `*.module.css`
  sources and rebuilding — same technique as the variant matrix, will-change,
  selector-order and class-vs-attr runs; the zero-diff computed-style equivalence pass is
  what makes the routes interchangeable for runtime measurement.
- WU1's nested-rule expansion (`&:where(A,B)` → `&A,&B`) preserves per-alternative
  semantics at the rule itself; child rules nested under an expanded parent see
  `:is(list)` semantics (max specificity) rather than per-branch specificity. With 0
  non-uniform lists in scope, the two are identical here; a bundle with mixed-specificity
  lists would need the distinction handled.

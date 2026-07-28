# Phase 2 — Batch 3 report (2026-07-28)

Converted: **react-accordion, react-breadcrumb, react-card, react-field,
react-message-bar, react-rating, react-spinbutton, react-tags, react-toolbar,
react-tree** (commits `ce0c50883d`…`a7b3e1b3bf`, plus `6cad216c17`).

## Validation

- **VR: 34/34 sets pass, zero retries** — the 10 new baselines (845 screenshots:
  accordion 25, breadcrumb 20, card 148, field 30, message-bar 9, rating 43,
  spinbutton 263, tags 182, toolbar 21, tree 104) captured pre-conversion from the
  validated bundle, then diffed at zero tolerance post-conversion; all 24 existing
  sets re-ran in the same sweep as collateral proof for the new l2 compositions.
- Package tests green in all 10 (toolbar's run additionally repaired 5 pre-existing
  dependent-snapshot failures leaking `fuicm-*` classes from earlier batches).
- nx affected test sweep (`--base=9f93465ffd`, 40 projects + 20 dependents): one
  failure, **excluded as pre-existing** — `react-timepicker-compat` `timeMath`
  "day light saving" expects 3 hourly steps across the 2023-11-05 DST fall-back and
  deterministically gets 2 on this machine. Fixed 2023-dated inputs; test last
  touched 2024-06, implementation 2025-08 (both predate the branch); package
  untouched by any batch; absent from every previously green run on this machine.
  Same class as the HeatMapChart environment flake excluded in the charts A/B.

## Metrics (leg: `metrics/batch3/`, methodology D10 — identical to prior legs)

| Metric                         |  Baseline |   Batch 2 |   **Batch 3** | Δ vs baseline |
| ------------------------------ | --------: | --------: | ------------: | ------------: |
| Cold vNext build (s)           |       182 |       183 |       **174** |     **−4.4%** |
| Packages running Griffel AOT   |        62 |        42 |        **33** |           −29 |
| monosize entire-library gz (B) |   326,152 |   314,949 |   **304,432** |     **−6.7%** |
| Build output libJs (B)         | 4,563,422 | 4,240,833 | **4,061,456** |        −11.0% |
| Build output stylesJs (B)      | 1,000,959 |   829,830 |   **741,297** |        −25.9% |
| Build output stylesRaw (B)     |   700,829 |   507,242 |   **385,997** |        −44.9% |
| Build output css (B)¹          |    14,419 |   213,018 |   **328,538** |             — |

¹ Sum of per-package `dist/styles.css` files — an aggregation, not any single
shipped file (established in the batch-2 discussion).

Build-time legs to date: 182 → 178 (b1) → 183 (b2) → 196 (stroke-widths) → **174**,
the first leg meaningfully below baseline.

## Mixed-mode findings (D12 transitional hazards — two found, two fixed)

1. **ToolbarDivider (found by the toolbar agent, repaired in-batch):** while
   ToolbarDivider was still Griffel, its unlayered `display:inline-flex` atomic beat
   converted Divider's layered `display:flex` — a live regression on the tree at the
   time. Repaired by converting ToolbarDivider with the display property deliberately
   authored in `fui.base` (it must lose to nothing).
2. **TagPickerGroup column-gap (found via conformance failure, fixed `6cad216c17`):**
   `useTagPickerGroupStyles_unstable` delegates into converted
   `useTagGroupStyles_unstable`. Under Griffel, tags' columnGap was the last
   mergeClasses argument and always won the column axis; post-conversion the
   picker's unlayered columnGap atomic would have inverted that (e.g. 8px → 4px at
   medium) on a surface with no VR baseline. Fix: `gap` → `rowGap` in the picker's
   makeStyles — a no-op pre-conversion, restores the invariant now. Conformance:
   `make-styles-overrides-win` disabled with rationale; `classname-overrides-win`
   deliberately NOT enabled while the component still composes with mergeClasses.

The delegation-seam audit (who calls a converted package's style hook from outside)
found exactly one such consumer repo-wide for this batch — react-tag-picker. It is
now a standing cookbook checklist item.

## Deliberate scope leftovers

- **react-toolbar is partially converted:** `useToolbarToggleButtonStyles` /
  `useToolbarRadioButtonStyles` stay on Griffel — they restyle react-button's
  ToggleButton, which is itself still Griffel; converting them now would put layered
  rules under its unlayered atomics. Finish when the button family converts.
- **react-accordion keeps `@griffel/react` in dependencies:** one consumer-simulation
  test (`useAccordion.test.tsx`) imports `mergeClasses`; swap to clsx in Phase 3.
- **react-tag-picker `jest.config.js`** overrides `snapshotSerializers` with only the
  Griffel serializer; needs the css-modules serializer added the moment any
  react-tags module class reaches one of its snapshots.
- Catalog variant candidates reported by agents (not added — shared-file discipline):
  accordion `expand-icon-start/end`, `has-icon`/`no-icon`; message-bar intent/layout
  attribute entries; card "has-description" presence. Add in one variants.css pass.

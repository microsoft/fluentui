# S-J batch 1 (of 3) — D2a5 retirement, button family

**Date:** 2026-08-01 · **Branch:** `styling/tailwind-css-modules` · **Decisions:** D2a5
superseding amendment (retirement), D27 (icons CSS at `fui.components.l1`) ·
**Plan:** `reports/griffel-zero-plan.md` §2.2 (S-J row: 62 lines / 14 modules / 3 batches;
batch 1 = button family, 16 lines)

First of the three S-J retirement batches. The 16 button-family unlayered
`:global(.fui-Icon-filled)` / `:global(.fui-Icon-regular)` selector lines move from their
D2a5 unlayered blocks into their modules' own cascade layers. Selectors are unchanged —
`fui-Icon-filled` / `fui-Icon-regular` remain the icons package's public statics
(icons 3.0's `bundleIcon` still emits them via `cx(iconFilledClassName, …)`); ONLY the
layer placement changed.

## 1. Lines moved (16 selector lines, 3 modules)

| module                                                                     | lines | from      | to                  |
| -------------------------------------------------------------------------- | ----: | --------- | ------------------- |
| `react-button/library/src/components/Button/Button.module.css`             |    12 | unlayered | `fui.components.l1` |
| `react-button/library/src/components/ToggleButton/ToggleButton.module.css` |     2 | unlayered | `fui.components.l2` |
| `react-button/library/src/components/MenuButton/MenuButton.module.css`     |     2 | unlayered | `fui.components.l2` |

Altitudes are each module's established one: every Button root-slot rule is l1; every
ToggleButton/MenuButton root slice is l2 (the D2-amendment-2 winner over Button's l1).
Button's block keeps its internal order (subtle → transparent → disabled swap-backs LAST,
hover before hover-active) because within l1 all six pairs tie at 0-2-0 and file position
must go on encoding mergeClasses argument order — same constraint the unlayered block had.
All "must be UNLAYERED" comments (header tables, 6 pointer comments, 3 block heading
comments) replaced with D27 / S-J references.

## 2. Emitted-order / cascade evidence (post-change VR bundle)

Parsed from the built bundle (`apps/vr-tests-react-components/dist/storybook`, fresh
`--skip-nx-cache`, zero cache-replay lines):

- `main.*.iframe.bundle.js`: Button's 6 swap pairs enclosed in `@layer fui.components.l1`;
  MenuButton's `.fuicm-menu-button-expanded-* .fui-Icon-*` in `@layer fui.components.l2`.
- `6686.*.iframe.bundle.js`: ToggleButton's `.fuicm-toggle-button-checked-* .fui-Icon-*`
  in `@layer fui.components.l2`.
- The icons stylesheet's rules (`:where([data-fui-icon])` 0-0-0 inline;
  `[data-fui-icon-hidden]` 0-1-0 none — NOT `:where()`-wrapped) are emitted in
  `@layer fui.components.l1` **AFTER the Button module in document order** (offset 560077
  vs 377884 in `main.*.iframe.bundle.js`).

**The order finding that matters:** because the icons sheet lands LATER in the document at
the same l1 altitude, an equal-specificity component rule would LOSE the within-layer
source-order tiebreak. The retirement is safe at l1 only because every component swap
selector is 0-2-0 against the hide's 0-1-0 — the win is on SPECIFICITY, source order never
arbitrates. Verified live via CDP `CSS.getMatchedStylesForNode` (below), not assumed.
ToggleButton/MenuButton don't even need that: l2 beats l1 on layer order.

Per-rule winners (CDP matched rules, post-change bundle; full JSON
`.scratch/sj1-cdp-post.json`):

| state                                  | contention                                                                   | winner                                     |
| -------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ |
| subtle/transparent hover, pressed      | swap (l1, 0-2-0) vs `[data-fui-icon-hidden]` (l1, 0-1-0, later in doc)       | swap, on specificity → filled shown        |
| disabled + hover/pressed               | swap-back (l1, 0-2-0, later in file) vs appearance swap (l1, 0-2-0, earlier) | swap-back, on file position → regular kept |
| MenuButton `aria-expanded` (open)      | `.expanded` (l2) vs hide (l1)                                                | l2 on layer order → filled shown           |
| ToggleButton checked (+disabled+hover) | `.checked` (l2) vs Button disabled swap-back (l1) vs hide (l1)               | l2 on layer order → filled kept            |

Computed `display` on both `<svg>`s is **identical pre-change vs post-change across all 15
state cases** (`.scratch/sj1-cdp-pre.json` vs `-post.json`, compared field-by-field): the
unlayered→layered move is behavior-neutral at the computed-style level, not just at the
pixel level.

## 3. State-matrix coverage — 7 new VR stories (21 shots)

None of the existing button-family stories combined a bundled icon with the states the
swap rules fire on, so the plan's hover/open/pressed/disabled matrix had NO pixel evidence.
Added (each gets default/hover/pressed via the shared StoryWright steps):

| story (kind / name)                       | matrix legs pinned                                       |
| ----------------------------------------- | -------------------------------------------------------- |
| Button / Subtle with icon                 | hover + pressed swap (args #3)                           |
| Button / Transparent with icon            | hover + pressed swap (args #3)                           |
| Button / Subtle Disabled with icon        | disabled swap-back vs subtle tie (arg #8 beats #3)       |
| Button / Transparent Disabled with icon   | disabled swap-back vs transparent tie                    |
| MenuButton / With icon expanded           | `open` (aria-expanded) swap, l2-vs-l1                    |
| ToggleButton / Checked with icon          | checked swap                                             |
| ToggleButton / Checked Disabled with icon | checked (l2) beats disabled swap-back (l1), even hovered |

Baselines for the 21 new shots were captured from the PRE-change bundle (stories added,
layer move not yet applied — capture.mjs's documented baseline-mode semantics; the
pre-change bundle also re-verified 129/129 + 342/342 existing shots pixel-identical to the
seeded baselines before merging). Merged into `validation/baseline/button` (129→141) and
`validation/baseline/button-family` (342→351) with provenance in each `manifest.json`
(`additions` array). Glyph-variant correctness of those baselines is the CDP pre-change
run: filled hidden at rest, shown on hover/pressed/open/checked, regular restored under
disabled.

## 4. VR gate — per-family, zero tolerance

Fresh `--skip-nx-cache` builds on BOTH legs (pre-change bundle for new-story baselines,
post-change bundle for candidates); capture.mjs staleness guard active on every capture;
zero nx cache-replay lines in either build log.

| set                                          | pairs | verdict                                  |
| -------------------------------------------- | ----: | ---------------------------------------- |
| `button` ("Button Converged")                |   141 | PASS — 141 clean, 0 failed/missing/extra |
| `button-family` (Toggle/Compound/Menu/Split) |   351 | PASS — 351 clean, 0 failed/missing/extra |

492 pairs total at `--maxDiffPixels 0`; diff summaries `.scratch/sj1-diff-button/summary.json`
and `.scratch/sj1-diff-family/summary.json`. The pre-change leg additionally re-verified the
seeded baselines against the stories-added bundle: 129/129 + 342/342 clean with exactly the
21 new shots as expected extras (`.scratch/sj1-prediff-*/summary.json`).

## 5. Other gates

- **Lint**: `react-button` + `vr-tests-react-components` — green (`nx run-many --target=lint`).
- **Jest**: skipped — no package TSX changed. The only TSX touched are VR stories in
  `apps/vr-tests-react-components` (no jest target); the react-button package change is
  CSS-only. (react-button jest last ran green in icons integration 1, unchanged since.)
- Type-check: no TS surface changed; lint (which type-parses the stories) green.

## 6. What batch 1 deliberately did NOT touch

The remaining 46 unlayered lines in 11 modules (nav family 12; menu/tags/tabs/infolabel/
menu-grid/teaching-popover/breadcrumb 34) — batches 2 and 3. Their emitted CSS still shows
the unlayered pattern (verified incidentally in the bundle scan: InteractionTagPrimary,
BreadcrumbButton, InfoButton, Tab all emit after a layer STATEMENT, i.e. unlayered), which
is correct until their batches run.

## 7. Commits

| commit       | scope                                                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `fff0a4c298` | VR state-matrix stories (baselines merged on disk — the baseline dirs are gitignored durable state, provenance in their manifests) |
| `7fb3a06dec` | the 16-line layer moves + comment updates                                                                                          |
| _(next)_     | ledger + this report                                                                                                               |

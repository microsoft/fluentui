# S-J batches 2+3 (of 3) — D2a5 retirement, nav family + the rest

**Date:** 2026-08-01 · **Branch:** `styling/tailwind-css-modules` · **Decisions:** D2a5
superseding amendment (retirement), D27 (icons CSS at `fui.components.l1`) ·
**Plan:** `reports/griffel-zero-plan.md` §2.2 (S-J row; batch 1 = button family, closed in
`reports/sj-batch1.md`). This closes S-J: all remaining unlayered `:global(.fui-Icon-*)`
lines are retired.

Count reconciliation: the plan's "46 remaining lines" is the grep's matching-line count;
of those, **42 are selector lines** (moved here) and 4 are comment-mention lines (MenuItem
×2, MenuGridRow ×1, TeachingPopoverTitle ×1 — all updated to D27/S-J wording). Post-batch
the repo has 58 layered `fui-Icon` selector lines (16 button-family + 42 here), 0 unlayered
(script-verified brace/layer walk over every tracked `*.module.css`).

## 1. Lines moved (42 selector lines, 10 modules) + altitude reasoning

| module                                         | lines | to     | reasoning                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------- | ----: | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| react-nav `NavItem.module.css`                 |     4 | l1     | icon slot's own altitude; base→selected file order kept inside l1 (both 0-2-0)                                                                                                                                                                                                                                                      |
| react-nav `NavCategoryItem.module.css`         |     4 | l1     | same                                                                                                                                                                                                                                                                                                                                |
| react-nav `AppItem.module.css`                 |     2 | l1     | base half only (no selected state)                                                                                                                                                                                                                                                                                                  |
| react-nav `AppItemStatic.module.css`           |     2 | l1     | same                                                                                                                                                                                                                                                                                                                                |
| react-menu `MenuItem.module.css`               |     6 | l1     | ALL THREE blocks in one l1 section — incl. the `useRootBaseStyles` hover half whose own slice is `fui.base`: at base altitude it loses to the icons sheet's l1 hide on LAYER order, so it rides at l1; r<d<h file order preserved within the layer                                                                                  |
| react-menu-grid `MenuGridRow.module.css`       |     2 | l1     | same base-slice elevation as MenuItem's hover half                                                                                                                                                                                                                                                                                  |
| react-infolabel `InfoButton.module.css`        |     6 | l1     | returns to its pre-D2a5 altitude (the original defect site); base→open→hover order kept                                                                                                                                                                                                                                             |
| react-tabs `Tab.module.css`                    |     6 | l1     | `.icon`/`.icon-selected` display swaps + `.circular-filled` forced-colors glyph colours (colours uncontested — icons sheet declares no `color`)                                                                                                                                                                                     |
| react-tags `InteractionTagPrimary.module.css`  |     6 | l1     | `.outline` (arg #4) before `.selected` (arg #5), file order kept — the hover colour tie resolves to `colorNeutralForegroundOnBrand` as before                                                                                                                                                                                       |
| react-breadcrumb `BreadcrumbButton.module.css` |     4 | **l2** | the ToggleButton/MenuButton precedent: the `current` swap-BACK must beat react-button's l1 `subtle` hover/pressed swap on the SAME element. Old form won 0-3-0 vs 0-2-0 on specificity; at l2 layer order decides outright. 0-3-0 marker compound (`group\/fui-breadcrumb-button`) KEPT as anti-tie vs future same-layer contenders |

TeachingPopoverTitle (0 lines): the "future rules MUST be unlayered" authoring instruction
replaced with the post-D27 guidance. Hamburger/NavSubItem pointer comments refreshed.

**The batch-1 cascade finding governs every l1 decision:** the icons stylesheet's l1 rules
are emitted AFTER component modules in document order, so a component swap rule at l1 wins
ONLY on specificity (0-2-0 beats the hide's `[data-fui-icon-hidden]` 0-1-0), never on source
order. Verified per-family in the emitted bundle (`.scratch/sj23-bundle-check.mjs`: all 15
probes enclosed in the expected layer; icons hide at `main.*` offset 560069 vs MenuItem
blocks at 443682–443968, internal r<d<h order intact).

## 2. CDP evidence (22 state cases, pre vs post)

`.scratch/sj23-cdp.mjs` → `sj23-cdp-pre.json` / `sj23-cdp-post.json`: computed
`display` of BOTH `<svg>`s **identical pre vs post in all 22 cases** across nav
(unselected/selected/category/AppItem), menu (rest/hover/disabled-hover/chevron-hover),
menu-grid (rest/hover), tabs (unselected/selected), tags (rest/hover/active), infolabel
(rest/hover/open), breadcrumb (rest/hover/pressed/disabled-hover). Matched-rules winners
(post): every family shows the swap winning on specificity at l1 against the later-in-doc
hide; breadcrumb shows `…group\/fui-breadcrumb-button…` at `[fui.components.l2]` beating
`.fuicm-button-subtle-*:where(:hover)` at `[fui.components.l1]` on layer order.

One non-display delta, adjudicated: NavItem-selected glyph `color` alpha 0.17 (pre) vs
0.165 (post) — the enter/exit keyframes sampled at marginally different page-load progress
between the two bundles (deterministic within each bundle across runs; VR shots with
animations frozen are pixel-identical), not a cascade change.

## 3. State-matrix coverage — 21 new story exports (11 base + RTL/DM/HC variants) / 51 new shots, 2 NEW baseline sets

No VR stories existed at all for react-nav or react-menu-grid (new sets `react-nav` 5,
`react-menu-grid` 8; `@fluentui/react-menu-grid-preview` added to the VR app's deps).
Existing-set gaps filled: Menu bundled-icon hover + disabled swap-back (existing icon
stories used `<span>` icons); Tabs bundled-icon selected + filled-circular HC (existing
used string icons); InteractionTag outline+selected hover/pressed (the arg#4/#5 colour
tie); InfoLabel hover (stories only snapshot `rest`; open was covered by SizesOpen);
Breadcrumb current / current+disabled with icon (the react-button contention had no icon
on a current entry). Baselines captured from the PRE-change bundle (capture.mjs
baseline-mode); pre-change leg also re-verified every existing shot clean first
(`.scratch/sj23-pre-*-diff`: 0 failed / 0 missing, extras = exactly the new shots), then
merged with provenance `additions` in each manifest. Glyph-variant correctness of the new
baselines: the pre-change CDP run + visual reads (filled only on selected/hover/open;
regular kept under disabled/current swap-backs).

## 4. VR gate — per-family, zero tolerance

Fresh `--skip-nx-cache` builds both legs; capture.mjs staleness guard active; zero
cache-replay lines in both build logs (`.scratch/sj23-build-pre.log` / `-post.log`).

| set                   | pairs | verdict |
| --------------------- | ----: | ------- |
| react-nav (NEW)       |     5 | PASS    |
| react-menu-grid (NEW) |     8 | PASS    |
| menu                  |    70 | PASS    |
| react-menu            |    70 | PASS    |
| react-tabs            |   123 | PASS    |
| react-tags            |   197 | PASS    |
| react-infolabel       |    12 | PASS    |
| react-breadcrumb      |    26 | PASS    |

**511 pairs, 0 failed / 0 missing / 0 extra** at `--maxDiffPixels 0`
(`.scratch/sj23-cand-*-diff/summary.json`).

## 5. Other gates

- **Lint**: all 9 touched projects green (`react-nav, react-menu, react-menu-grid-preview,
react-infolabel, react-tabs, react-tags, react-breadcrumb, react-teaching-popover,
vr-tests-react-components`, `--skip-nx-cache`).
- **Jest**: package changes are CSS-only; the jest gate ran with Part 2 (serializer
  retirement) — react-menu, react-tags(-adjacent) families covered there.

## 6. Commits

| commit       | scope                                                                 |
| ------------ | --------------------------------------------------------------------- |
| `c467f6d6b0` | 12 VR state-matrix stories + menu-grid dep (baselines merged on disk) |
| `b4f99d306e` | duplicate-story-id rename (OutlineSelectedWithIcon)                   |
| `aba145371a` | nav family layer moves (batch 2, 12 lines)                            |
| `a09c73a4cd` | remaining layer moves (batch 3, 30 lines + comment-only module)       |

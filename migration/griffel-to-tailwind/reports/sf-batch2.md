# S-F batch 2 — docsite Utilities + react-accordion…react-card stories off Griffel

**Date:** 2026-07-30 · **Branch:** `styling/tailwind-css-modules` · **Worklist:** `reports/sf-worklist.md` (batch 2 of 7, 87 files)

## Scope executed

Batch 2 = `apps/public-docsite-v9/src/Utilities` (21 files: FocusManagement 19, Theme/createCSSRuleFromTheme 2) + story trees of react-accordion (1), react-aria (3), react-avatar (5), react-badge (1), react-breadcrumb (2), react-button (39), react-calendar-compat (3), react-card (12). All 87 are story-makeStyles; batch 2 contains **no doc pages** — no D21/survivor decisions arose.

## Story files (87) — all converted

- **86 via `.scratch/sf-story-codemod.js --batch=2`** (same batch-1 pipeline: Griffel object eval with
  real `@griffel/core` shorthands + `@fluentui/react-theme` tokens → colocated `*.module.css`;
  `mergeClasses` → template literal / `filter(Boolean).join(' ')`; import cleanup + `styles` import
  insertion). Zero eval defects — no missing-token or empty-rule repairs needed this batch.
- **1 by hand:** `react-card/stories/src/Card/CardSelectableIndicator.stories.tsx` — codemod bailed
  (`flex is not defined`: the makeStyles arg spreads a module-scope `const flex = {...}` shared
  object). Hand-converted; the shared-object provenance is noted in the css header.
- **87 new `*.module.css`** files (86 codemod + 1 hand).
- Post-codemod cleanup (`.scratch/sf-shim-cleanup2.js`, batch-2 variant of batch-1's shim cleanup):
  removed `const styles = useStyles()` locals that shadow the module.css import (would be NEW
  `@typescript-eslint/no-shadow` lint errors — 83 files cleaned), dropped shims that became unused,
  CRLF-aware blank-line collapse (81 files), prettier over all 174 touched files.
- 4 shims intentionally kept (`AccordionMotionCustom` useStyles, `AriaLiveAnnouncerDefault`
  useClasses, both Breadcrumb stories' useTooltipStyles) — their locals use non-`styles` names, so
  keeping the hook shape minimizes story-body churn per the batch-1 contract; no shadow, lint green.
- Notable conversions verified by review: `Axis.stories.tsx` dynamic `styles[axis]` incl. kebab
  `grid-linear` key (preserved as-is in the module); `createCSSRuleFromTheme*` stories keep the
  `createCSSRuleFromTheme` runtime usage (it is a theme utility, not Griffel) with makeStyles-only
  parts converted.

## Intentional survivors

None — batch 2 had no doc pages and no mixin-consumer fences.

## Gates

| Gate                                                                                                         | Result                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| type-check: react-accordion/aria/avatar/badge/breadcrumb/button/calendar-compat/card `-stories` (8 projects) | green                                                                                                                                      |
| lint: same 8 projects                                                                                        | green (the 100+ NEW `no-shadow` errors introduced by codemod locals were fixed by the shadow-cleanup pass; zero remaining errors/warnings) |
| `public-docsite-v9:type-check`                                                                               | green                                                                                                                                      |
| `public-docsite-v9:lint`                                                                                     | green                                                                                                                                      |
| `public-docsite-v9:test` (jest)                                                                              | 1 suite / 8 tests green                                                                                                                    |
| package jest                                                                                                 | skipped — no test in the 8 packages imports any `stories/src` file (verified by grep)                                                      |
| `public-docsite-v9:build-storybook`                                                                          | **green — full build, exit 0**; INFRA-1c did not reproduce                                                                                 |
| VR                                                                                                           | not applicable — no batch-2 file is in a VR app                                                                                            |
| zero Griffel symbols in batch-2 files                                                                        | 87/87 clean (verified sweep over all 13 umbrella symbols + `@griffel`)                                                                     |

## Codemod behavior notes (batch 2)

- Only bail class this batch: module-scope shared style object spread into makeStyles (1 file).
  If later batches hit the same shape, hand-convert or extend the eval sandbox with the const.
- New defect class found (and fixed via `sf-shim-cleanup2.js` + CRLF-aware collapse, both reusable):
  codemod leaves `const styles = useStyles()` locals that shadow the new top-level `styles` import —
  batch 1 hit this only in the docsite (noUnusedLocals); in package story trees it surfaces as
  `@typescript-eslint/no-shadow` lint errors instead. The `\n{3,}` blank-line collapse in the
  codemod misses CRLF files.

# S-F batch 3 — react-carousel…react-drawer stories off Griffel

**Date:** 2026-07-30 · **Branch:** `styling/tailwind-css-modules` · **Worklist:** `reports/sf-worklist.md` (batch 3 of 7, 88 files)

## Scope executed

Batch 3 = story trees of react-carousel (11), react-color-picker (8), react-combobox (31: Combobox 17 + Dropdown 14), react-datepicker-compat (12), react-dialog (3), react-divider (6), react-drawer (17). All 88 are story-makeStyles; batch 3 contains **no doc pages** — no D21/survivor decisions arose.

## Story files (88) — all converted

- **87 via `.scratch/sf-story-codemod.js --batch=3 --apply`** (same pipeline as batches 1–2: Griffel
  object eval with real `@griffel/core` shorthands + `@fluentui/react-theme` tokens → colocated
  `*.module.css`; `mergeClasses` → template literal / `filter(Boolean).join(' ')`; import cleanup +
  `styles` import insertion). Zero eval defects — no missing-token or empty-rule repairs needed.
- **1 by hand:** `react-drawer/stories/src/Drawer/DrawerMotionCustom.stories.tsx` — codemod bailed
  (`drawerWidth is not defined`: makeStyles arg references module-scope consts `drawerWidth`/
  `drawerMargin`, same bail class as batch 2's CardSelectableIndicator). Hand-converted; values
  resolved inline in the css with provenance noted in the header; the consts remain in the story
  for the `createPresenceComponent` motion keyframes.
- **88 new `*.module.css`** files (87 codemod + 1 hand).
- Post-codemod cleanup: `.scratch/sf-shim-cleanup2.js --batch=3` (script parameterized this batch —
  previously hardcoded the batch-2 report; blank-line collapse also made genuinely CRLF-aware:
  `/(\r?\n){3,}/ → '$1$1'`). Removed shadowing `const styles = useStyles()` locals + unused plain
  shims in 75 of 87 codemod files; prettier over all 176 touched files.
- **13 shims intentionally kept in 12 files** (10 carousel `useClasses` + CarouselActionCards'
  second `useCardClasses`, DialogMotionCustom `useStyles` → local `classes`, DrawerWithTitle inline
  `useStyles().drawer`) — locals use non-`styles` names or inline calls, so keeping the hook shape
  minimizes story-body churn per the batch-1/2 contract; no shadow, lint green.
- One post-codemod repair: `DividerCustomStyles.stories.tsx` kept a dangling `tokens` import because
  the only remaining "use" was prose inside JSX (`<code>tokens.colorPaletteRedBorder2</code>` —
  the import-cleanup's word-boundary liveness test counts it). Import removed; label updated to
  `var(--colorPaletteRedBorder2)` to match the module.css. New defect class for the codemod notes:
  prose mentions of `tokens.` in JSX text keep the import alive.

## Intentional survivors

None — batch 3 had no doc pages and no mixin-consumer fences.

## Gates

| Gate                                                                                                             | Result                                                                                             |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| type-check: react-carousel/color-picker/combobox/datepicker-compat/dialog/divider/drawer `-stories` (7 projects) | green (one TS6133 dangling-`tokens` error introduced by codemod on DividerCustomStyles — fixed)    |
| lint: same 7 projects                                                                                            | green — zero eslint errors/warnings after the shadow-cleanup pass                                  |
| `public-docsite-v9` gates + build-storybook                                                                      | n/a — batch 3 touches zero docsite files (gate is conditional on docsite files being touched)      |
| package jest                                                                                                     | skipped — no test/spec/cy file in the 7 packages imports any `stories/src` file (verified by grep) |
| VR                                                                                                               | not applicable — no batch-3 file is in a VR app                                                    |
| zero Griffel symbols in batch-3 files                                                                            | 88/88 clean (verified sweep over all 13 umbrella symbols + `@griffel`)                             |

## Codemod behavior notes (batch 3)

- Only bail class: module-scope const referenced inside makeStyles (1 file, DrawerMotionCustom) —
  same shape as batch 2; hand-convert remains the cheapest path at this frequency.
- New minor defect class: import liveness check counts prose occurrences of `tokens.` in JSX text,
  leaving a dangling import (1 file, TS6133 under noUnusedLocals). Caught by type-check; fix by
  hand or teach the cleanup to ignore text nodes if it recurs.
- `sf-shim-cleanup2.js` now takes `--batch=N` (defaults to 2) — batches 4–7 can run it directly.

## Graphify

`graphify update .` skipped per batch-1/2 protocol (stalled both times) — **graphify-out/ graph is
stale** with respect to batch-3 changes (88 story files + 88 new module.css).

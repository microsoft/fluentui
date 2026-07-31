# S-F batch 6 — react-progress…react-tags stories off Griffel

**Date:** 2026-07-30 · **Branch:** `styling/tailwind-css-modules` · **Worklist:** `reports/sf-worklist.md` (batch 6 of 7, 85 files)

## Scope executed

Batch 6 = story trees of react-progress (3), react-provider (5), react-rating (7), react-search (4),
react-select (1), react-skeleton (5), react-slider (1), react-spinbutton (10), react-spinner (3),
react-swatch-picker (11), react-tabs (13), react-tag-picker (3), react-tags (19). All 85 are
story-makeStyles; batch 6 contains **no doc pages**. FluentProviderDefault (batch 5's positive
sweep control) converted normally this batch.

## Story files (85) — all converted

- **85 via `.scratch/sf-story-codemod.js --batch=6 --apply`** — zero bails (first batch with none).
  Two files additionally hand-rewritten after the codemod pass (renderer interop, below).
- **85 new `*.module.css`.**
- Post-codemod cleanup: `.scratch/sf-shim-cleanup2.js --batch=6` (cleaned 68 of 85 — shadowing
  `const styles = useStyles()` locals + unused shims); prettier over all 170 touched files.
  Remaining files keep shims intentionally (module-local hooks with non-`styles` locals) per the
  batch-1/2 minimal-churn contract; no shadow, lint green.

## Renderer-interop stories — renderer-free rewrites (D21), known-changed (D11)

`FluentProviderFrame` and `FluentProviderApplyStylesToPortals` demonstrated Griffel renderer
plumbing (`createDOMRenderer(contentDocument)` + `RendererProvider`) around real FluentProvider
APIs (`targetDocument`, `applyStylesToPortals`). Decision per policy:

- **Not S-H survivors** — the sweep gate requires zero umbrella symbols in batch files, and the
  stories' teaching points (targetDocument / applyStylesToPortals) are FluentProvider APIs that
  outlive Griffel. Rewritten renderer-free per D21: `FrameRenderer` children now receive only the
  external `Document`; all renderer imports/threading removed; `Frame` docs prose now names only
  FluentProvider's `targetDocument`.
- **D11 known-changed annotation** in both files: statically-built story classes do not cross the
  iframe document boundary (accepted, deferred loss); theme tokens still reach the iframe via
  `targetDocument`.

## Post-codemod repairs

1. **NEW codemod eval defect class: pseudo-nested descendant selectors flattened wrong** — 2 files.
   A Griffel rule of shape `':hover': { ['& .child']: {...} }` was emitted as an empty
   `.x:hover {}` plus an **unqualified** `.x .child {...}` rule:
   - `react-tags TagGroupOverflow.module.css` — `.menuItem:hover` nested `& .group\/fui-tag`
     lost the `:hover`; fixed to `.menuItem:hover .group\/fui-tag`, empty rule removed.
   - `react-tag-picker TagPickerSingleLine.module.css` — `.control:focus-within` nested
     `& > .group\/fui-tag-picker-group { flex-wrap: wrap }` emitted unqualified, unconditionally
     overriding the base `nowrap` rule; fixed to `.control:focus-within > .group\/fui-tag-picker-group`.
     Verification: scan of all 85 emitted css files found zero other empty rules; scan of all 85
     original stories for nested-selector patterns found only these 2 plus TabListWithPanels
     (plain `& th`/`& td` descendants, converted correctly). First batch where the eval pipeline
     produced wrong-selector output — teach the codemod if batch 7 has pseudo-nested selectors.
2. **Dangling `tokens` import** (known class) — `FluentProviderNested.stories.tsx`; removed.
3. **Invalid-but-shipped CSS preserved verbatim with comment** —
   `FluentProviderApplyStylesToPortals.module.css` keeps `border: 3x dotted var(--colorPaletteDarkOrangeBorder2)`
   (`3x` is not a length; browsers drop the declaration, matching what Griffel shipped).
4. No `'use client'` demotions (no standalone `.styles.ts` in batch), no css-import collisions,
   no `mergeClasses(cond && x)` `string | false` errors this batch.

## Intentional survivors

None — batch 6 had no doc pages.

## Gates

| Gate                                                                                                                                     | Result                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| type-check: progress/provider/rating/search/select/skeleton/slider/spinbutton/spinner/swatch-picker/tabs/tag-picker/tags `-stories` (13) | green — zero errors (nx run-many; 3 affected projects re-gated after hand css fixes, green)                                   |
| lint: same 13 projects                                                                                                                   | green — zero eslint errors/warnings                                                                                           |
| `public-docsite-v9` gates + build-storybook                                                                                              | n/a — batch 6 touches zero docsite files (gate is conditional)                                                                |
| package jest                                                                                                                             | skipped — no test/spec/cy file in the 13 packages imports any `stories/src` file (verified by grep)                           |
| VR                                                                                                                                       | not applicable — no batch-6 file is in a VR app                                                                               |
| zero Griffel symbols in batch-6 files                                                                                                    | 85/85 clean (13 umbrella symbols + `@griffel`; file-existence 85/85 + batch-7 control `TextAlignment.stories.tsx` still hits) |

## Codemod behavior notes (batch 6)

- Zero bails — no module-scope consts, motionTokens, imported mixins, or template-string samples
  in this family range.
- New defect class (silent, not caught by type-check/lint): pseudo-selector rules containing a
  nested descendant selector flatten to an unqualified descendant rule + empty pseudo rule. Only
  caught by css inspection. Batch-7 pre-flight should grep originals for nested-selector-in-pseudo
  before trusting the eval output.

## Commits

- `215b759dbe` 6a — react-progress/provider/rating/search/select (40 files)
- `131b3a790e` 6b — react-skeleton/slider/spinbutton/spinner (38 files)
- `286e0af061` 6c — react-swatch-picker/tabs (48 files)
- `7d5c1317aa` 6d — react-tag-picker/tags (44 files)
- 6e — ledger + this report

## Graphify

`graphify update .` skipped per batch-1–5 protocol (stalls) — **graphify-out/ graph is stale**
with respect to batch-6 changes (85 story files + 85 new module.css).

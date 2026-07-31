# S-F batch 7 (FINAL) — react-text…react-tree stories off Griffel + retro audit + S-F closure

**Date:** 2026-07-30 · **Branch:** `styling/tailwind-css-modules` · **Worklist:** `reports/sf-worklist.md` (batch 7 of 7, 30 files)

## Scope executed

Batch 7 = story trees of react-text (6), react-textarea (3), react-theme (7 — 6 stories + 1 doc
page), react-timepicker-compat (6), react-toast (3), react-toolbar (1), react-tooltip (1),
react-tree (3). 29 story-makeStyles + 1 doc (`Theme/typography/index.mdx`).

## Story files (29) — all converted

- **28 via `.scratch/sf-story-codemod.js --batch=7 --apply`** — 1 bail.
- **1 by hand:** `react-theme ThemeFonts.stories.tsx` — bail: module const `theme =
teamsLightTheme` referenced in makeStyles (`fontFamily: theme.fontFamilyBase`), the batch-2/3/5
  bail class. The story deliberately renders a Teams-light-theme snapshot, so the value was
  resolved to its literal (`'Segoe UI', 'Segoe UI Web (West European)', -apple-system, …`) in the
  css with a provenance comment. The `theme` const stays for the story's runtime token tables.
- **29 new `*.module.css`.**
- Pre-flight (per batch-6 note): grep of all 30 originals for nested-selector-in-pseudo patterns
  found **zero** — batch 7 has no pseudo-selector rules at all (simplest batch), so defect
  class (6) could not occur. Post-codemod empty-rule scan of all 29 css: zero empty rules.
- Post-codemod cleanup: `.scratch/sf-shim-cleanup2.js --batch=7` (cleaned 26 of 28); prettier over
  all 59 touched files. 2 files keep shims intentionally (non-`styles` locals: ToolbarFarGroup,
  TreeMotionCustom) per the batch-1/2 minimal-churn contract.

## Doc page (1)

`react-theme Theme/typography/index.mdx` — page was already half-rewritten (its first fence was
CSS-Modules dialect); the remaining 3 `makeStyles` fences (Example / Composing / MixedStyles)
were replaced with css+tsx fence pairs that mirror the now-converted sibling story files exactly.
The "authored with makeStyles, still re-exported" transitional paragraph was replaced with a note
that `typographyStyles` remains exported for TypeScript-value consumers. No D21 deletions needed —
the page teaches typography tokens, which outlive Griffel.

## Post-codemod repairs

1. **Dangling `tokens` import** (known class) — `Composing.stories.tsx`; removed.
2. **Invalid-but-shipped CSS preserved verbatim with comment** (batch-6 precedent) —
   `TreeInfiniteScrolling.module.css` + `TreeLazyLoading.module.css` keep `margin: -1` (`'-1'` is
   not a length; browsers drop it, matching what Griffel shipped from `margin: '-1'`).
3. No `'use client'` demotions (no standalone `.styles.ts` in batch), no css-import collisions, no
   `mergeClasses(cond && x)` errors, no motionTokens-in-makeStyles (TreeMotionCustom's
   `motionTokens` usage is runtime `collapseMotion` config, not styling — import retained).

## Gates (batch 7)

| Gate                                                                                        | Result                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type-check: text/textarea/theme/timepicker-compat/toast/toolbar/tooltip/tree `-stories` (8) | green — zero errors (nx run-many, 8 projects + 75 dependency tasks)                                                                                                                                                                       |
| lint: same 8 projects                                                                       | green — zero eslint errors/warnings                                                                                                                                                                                                       |
| `public-docsite-v9` gates + build-storybook                                                 | n/a — batch 7 touches zero docsite files (index.mdx is in the react-theme stories tree)                                                                                                                                                   |
| package jest                                                                                | skipped — no test/spec/cy file in the 8 packages imports any `stories/src` file (verified by grep)                                                                                                                                        |
| VR                                                                                          | not applicable — no batch-7 file is in a VR app                                                                                                                                                                                           |
| zero Griffel symbols in batch-7 files                                                       | 30/30 clean (13 umbrella symbols + `@griffel`; file-existence 30/30; positive control = known-dirty `apps/vr-tests-react-components/src/stories/MakeStyles/MakeStyles.stories.tsx`, fires on makeStyles/mergeClasses/shorthands/@griffel) |

## Retroactive silent-defect audit — batches 1–5 (defect class 6)

Batch 6 discovered that pseudo-selector rules containing nested descendant selectors
(`':hover': { ['& .child']: {…} }`) flatten silently wrong (empty pseudo shell + unqualified
descendant rule, or rule dropped entirely). Batches 1–5 shipped before that discovery; both
symptoms were audited across the full earlier surface. **Result: ZERO defects.** Coverage proof:

1. **Emitted css scan (symptom: empty-rule shell):** all **396** `*.module.css` files created by
   the 20 batch-1–5 conversion commits (`e91f78345c…a6665ae27a`) scanned (comment-stripped) for
   empty rules. **5 empty rules in 3 files** found — every one traced to a _genuinely empty_
   Griffel slot in the pre-conversion original (class handles, correct to keep):
   - `FromV8/ThemeColors/ColorBlock.module.css` `.colorName`/`.colorValue` — original
     `colorName: {}, colorValue: {}`;
   - `useArrowNavigationGroup/Axis.module.css` `.both`/`.horizontal` — original
     `both: {}, horizontal: {}`;
   - `CarouselFirstRunExperience.module.css` `.card` — original `card: {}`.
2. **Originals scan (symptom: rule dropped entirely):** the pre-conversion sources of all
   batch-1–5 modified `.ts/.tsx` files (**400** files, via `git show <commit>~1:<file>`) scanned
   with a brace-balanced parser for any selector-typed key (`':pseudo'`, `'& …'`, `'@media …'`)
   whose object value contains a nested `&` selector key. **Zero hits.**
3. **Scanner validation (positive control):** identical detection run against the batch-6
   pre-conversion originals fires on both known-defective files (`TagGroupOverflow` `:hover`,
   `TagPickerSingleLine` `:focus-within`) and correctly does not fire on `TabListWithPanels`
   (plain top-level `& th`/`& td` descendants, which the codemod converts correctly).

No fixes were needed; no css was changed by the audit. Scan scripts preserved at
`.scratch/b7-audit/{scan-originals.js,scan-control.js,full-sweep.js}`.

## S-F closure summary

- **7/7 batches complete.** 561 worklist files: 511 story-makeStyles, 47 docs, 3 mergeClasses-only.
- **510 `*.module.css` files created** across all 26 S-F conversion commits.
- **1 file deleted:** `Concepts/BuildTimeStyles.mdx` (D21, batch 1).
- **Full-surface sweep (this session):** all 561 files re-swept textually for the 13 umbrella
  symbols + `@griffel` → **547 clean, 13 survivor hits, 1 documented deletion**. Every hit is a
  documented doc-page survivor (below); zero story/scaffolding files retain any Griffel symbol.

### Survivors (13 files, all doc pages, all prose/fence framing — none block S-H compilation)

| Survivor                                                                  | Reason                                                                                                                                                       |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FromV0 `Button.mdx`, `Flex.mdx`, `FlexItem.mdx`, `Grid.mdx`, `Loader.mdx` | Fences consume migration packages' published Griffel mixins; retire with them in S-H (D19) — batch 1                                                         |
| FromV0 `migrate-styles.mdx`                                               | Interim note naming the remaining mixin-consumer samples (D19 framing) — batch 1                                                                             |
| `StylingComponents.mdx`                                                   | "Still using makeStyles?" escape-hatch section (accurate until S-H removes re-exports) — batch 1                                                             |
| `AdvancedConfiguration.mdx`                                               | CSP nonce section (`createDOMRenderer` + `styleElementAttributes`) — only supported nonce path until S-G/D20                                                 |
| `Accessibility/FocusIndicator.mdx`                                        | `GriffelStyle` mention is deprecation framing — batch 1                                                                                                      |
| `SSR/SSR.mdx`, `SSR/Nextjs.mdx`, `SSR/NextJSAppDir.mdx`, `SSR/Remix.mdx`  | Symbol mentions live only in the "Migrating from an older setup?" removal-guidance callouts the batch-1 D21 rewrite added (they tell readers what to delete) |

Additionally (word-only, pass the symbol sweep): react-headless-components-preview stories
`README.md` + `MenuDescription.md` mention "Griffel" as contrast framing ("no Griffel") — batch 4.

### Commits (batch 7 session)

- `4fc440bee3` 7a — react-text/textarea/theme stories + typography docs (31 files)
- `96a8e89307` 7b — react-timepicker-compat/toast/toolbar/tooltip/tree (28 files)
- 7c — ledger + this report

## Graphify

`graphify update .` skipped per batch-1–6 protocol (stalls) — **graphify-out/ graph is stale**
with respect to batch-7 changes (30 files + 29 new module.css).

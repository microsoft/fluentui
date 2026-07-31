# S-F batch 5 — react-motion-components-preview…react-positioning stories off Griffel

**Date:** 2026-07-30 · **Branch:** `styling/tailwind-css-modules` · **Worklist:** `reports/sf-worklist.md` (batch 5 of 7, 87 files)

## Scope executed

Batch 5 = story trees of react-motion-components-preview (50), react-nav (5), react-overflow (13),
react-persona (5), react-popover (11), react-portal (2), react-positioning (1). All 87 are
story-makeStyles; batch 5 contains **no doc pages** — no D21/survivor decisions arose.

## Story files (87) — all converted

- **83 via `.scratch/sf-story-codemod.js --batch=5 --apply`** (same pipeline as batches 1–4).
  Zero eval defects — no missing-token or empty-rule repairs needed.
- **4 by hand:**
  - `StaggerExpandableContainer.stories.tsx` — bail: `ITEM_HEIGHT` module const in makeStyles
    (batch-2/3 bail class). Value (`36px`) resolved inline in css with provenance; the const was
    styles-only and removed (comment left in the story).
  - `RotateCardFlip.stories.tsx` — bail: `motionTokens` referenced in makeStyles (`transition`
    combining `durationSlow`/`curveDecelerateMid`). motionTokens are plain constants, not CSS
    vars — snapshotted `300ms cubic-bezier(0,0,0,1)` into the css with provenance header.
    Runtime `tokens.colorPalette*` usages (pattern colors fed to inline `style`) are not Griffel
    and keep their import.
  - `react-nav CustomMotion.stories.tsx` — bail: `drawerWidth` module const in makeStyles (same
    shape as batch-3 DrawerMotionCustom). `260px` resolved inline in css; the consts remain in
    the story for the custom DrawerMotion/ContentMotion keyframes. Shadowing
    `const styles = useStyles()` local removed, import used directly.
  - `ComposingAtomsDemo.tsx` — bail: "unbalanced parens at useClasses" — **new bail cause**: the
    file's only Griffel is _inside a StackBlitz example template string_ (self-contained Vite app
    teaching makeStyles+tokens); the codemod parsed the string content. Runtime styling already
    lives in `ComposingAtomsDemo.styles.ts` (codemod-converted). The embedded example was
    rewritten off Griffel: plain `src/example.css` added to the StackBlitz file map (tokens →
    `var(--...)`, defined by the example's FluentProvider), example code imports it and uses
    string class names.
- **86 new `*.module.css`** (83 codemod + 3 hand; ComposingAtomsDemo.tsx shares its `.styles.ts`
  css — no fourth file).
- Post-codemod cleanup: `.scratch/sf-shim-cleanup2.js --batch=5` (cleaned 39 of 83 — shadowing
  `const styles = useStyles()` locals + unused shims); prettier over all 173 touched files.
  Remaining files keep shims intentionally (module-local `useClasses`/`useStyles` hooks with
  non-`styles` locals, plus the 5 `.styles.ts` exported hooks) per the batch-1/2 minimal-churn
  contract; no shadow, lint green.

## Post-codemod repairs

1. **`'use client'` demotion — recurred exactly as batch 4 predicted** in all 5 standalone
   `.styles.ts` files (`AtomsDemo`, `ComposingAtomsDemo`, `ComponentsGrid`, `InOutDemo`,
   `VariantsDemo`): codemod inserted the css import above the directive, making it a no-op
   expression. Directive removed per `enforce-use-client` (no client feature remains) and
   exported hooks given `(): typeof styles` return types (`explicit-module-boundary-types`) —
   same resolution as batch 4's 3 files. At 8 total occurrences across two batches, teaching the
   codemod is warranted if batches 6–7 contain standalone `.styles.ts` files.
2. **Prose-mention sweep dirt (self-inflicted)** — two hand-written provenance comments contained
   the literal string `makeStyles`, tripping the textual sweep; reworded. No code effect.
3. No css-import collisions, no `mergeClasses(cond && x)` `string | false` errors, no dangling
   `tokens` imports this batch.

## Intentional survivors

None — batch 5 had no doc pages.

## Gates

| Gate                                                                                                          | Result                                                                                             |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| type-check: motion-components-preview/nav/overflow/persona/popover/portal/positioning `-stories` (7 projects) | green — zero errors (nx run-many, all 7 + 72 dependency tasks)                                     |
| lint: same 7 projects                                                                                         | green — zero eslint errors/warnings after the 5 `.styles.ts` use-client repairs                    |
| `public-docsite-v9` gates + build-storybook                                                                   | n/a — batch 5 touches zero docsite files (gate is conditional)                                     |
| package jest                                                                                                  | skipped — no test/spec/cy file in the 7 packages imports any `stories/src` file (verified by grep) |
| VR                                                                                                            | not applicable — no batch-5 file is in a VR app                                                    |
| zero Griffel symbols in batch-5 files                                                                         | 87/87 clean (13 umbrella symbols + `@griffel`; file-existence 87/87 + control-file check confirms) |

## Codemod behavior notes (batch 5)

- Known bail class (unresolvable identifiers: module consts, motionTokens) — 3 files, hand-convert
  remains the right call at this frequency.
- **New bail cause:** Griffel inside a template-string code sample (StackBlitz demo) — the codemod
  has no way to distinguish string content from code. One file; hand-rewrite of the embedded
  sample (to plain CSS) is both the mechanical fix and the right docs outcome (samples must not
  teach Griffel).
- `'use client'` demotion in standalone `.styles.ts` recurred (5 files; 8 cumulative). Teach the
  codemod to insert css imports _below_ a leading directive if batches 6–7 have `.styles.ts` files.

## Commits

- `581257e2f0` 5a — motion-preview Atoms/Blur/Stagger (41 files)
- `beefbc7a1b` 5b — motion-preview Collapse/Fade/Introduction/Rotate (36 files)
- `86867da11b` 5c — motion-preview Scale/Slide + react-nav (32 files)
- `887b370004` 5d — react-overflow/persona (36 files)
- `a6665ae27a` 5e — react-popover/portal/positioning (28 files)

## Graphify

`graphify update .` skipped per batch-1–4 protocol (stalls) — **graphify-out/ graph is stale**
with respect to batch-5 changes (87 story files + 86 new module.css).

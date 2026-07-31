# S-F batch 4 — react-field…react-motion stories & docs off Griffel

**Date:** 2026-07-30 · **Branch:** `styling/tailwind-css-modules` · **Worklist:** `reports/sf-worklist.md` (batch 4 of 7, 91 files)

## Scope executed

Batch 4 = story trees of react-field (4), react-infolabel (1), react-input (9), react-link (1),
react-list (8), react-menu (7), react-message-bar (5), react-migration-v0-v9 (8),
react-migration-v8-v9 (13), react-motion (33), plus 2 react-headless-components-preview doc pages.
89 story-makeStyles + 2 docs. First batch containing `makeResetStyles` files (8) — the codemod
handles them natively (single class, hook returns a string; verified on FieldSize).

## Story files (89) — all converted

- **84 via `.scratch/sf-story-codemod.js --batch=4 --apply`** (same pipeline as batches 1–3).
  Zero eval defects — no missing-token or empty-rule repairs needed.
- **5 by hand:** all of react-migration-v0-v9's mixin-demo stories
  (`Button`, `Flex`, `Input`, `SliderMixin`, `Spinner` `index.stories.tsx`) — codemod bailed
  (makeStyles args spread the migration package's own published Griffel mixins:
  `v9DisabledCursor`/`v0Icon`, `flexItem.align/pushRow`, `input.fluid/errorIndicator`,
  `slider.fluid`, `spinner.v0Inline/v0SpinnerLabelStyle`). Same bail class as batches 2–3
  (identifiers the eval sandbox can't resolve). Hand-converted: mixin outputs are static plain
  objects (read from `*.mixins.ts`), values snapshotted into the css with provenance headers
  noting each mixin and its D19/S-H retirement; foreign classes wrapped in `:global(...)`
  (`.ui-icon__outline|filled`, react-label's `group\/fui-label` marker). The `Input` story's
  `width: 'block'` (invalid value, browser-dropped) is preserved verbatim with a comment —
  behavior-identical to what Griffel emitted. Mixin-demo framing survives via Description.md
  prose + css/JSX provenance comments; the stories retire with the mixins in S-H (D19).
- **89 new `*.module.css`** (84 codemod + 5 hand).
- Post-codemod cleanup: `.scratch/sf-shim-cleanup2.js --batch=4` (cleaned 42 of 84 — removed
  shadowing `const styles = useStyles()` locals + unused shims); prettier over all 178 touched
  files. **44 files keep shims intentionally** (module-local hooks with non-`styles` locals —
  29 `useClasses`, 8 `useStyles` with non-shadowing locals, slot shims like `useTextStyle`/
  `useStackClassName`/`useListItemRootStyles`, plus the 3 `.styles.ts` exported hooks) per the
  batch-1/2 minimal-churn contract; no shadow, lint green.

## Post-codemod repairs (3 new defect classes for the codemod notes)

1. **`'use client'` directive demoted** — in the 3 standalone `.styles.ts` files (react-motion
   `MotionIntroDemo`, `MotionVsPresenceDemo`, `Cards`) the codemod inserted the css import above
   the directive; prettier then parenthesized it into a no-op `('use client');` expression.
   Post-conversion the directive is itself a lint error (`enforce-use-client`: no client feature
   left once makeStyles is gone) — removed it. The exported hooks in `.styles.ts` also hit
   `explicit-module-boundary-types` (module-local shims don't) — added `: typeof styles` return
   types; `Cards.styles.ts` `useCardClasses` object hoisted to module scope and typed.
2. **css-import name collision** — `react-migration-v8-v9/Stack/index.stories.tsx` already had a
   module-scope v8 `const styles = { root: {...} }` (v8 `styles` prop object, not Griffel); the
   codemod's `import styles from './index.module.css'` collided (5 TS errors: duplicate ident +
   shim resolving to the wrong object). Fixed: import as `shimClasses`, shim dropped, usages
   repointed.
3. **`mergeClasses(cond && x)` single-argument replacement** — codemod left bare
   `cond && classes.x` (type `string | false`) on a `className?: string` prop
   (`react-list/ListActiveElement.stories.tsx:75`, TS2322). Fixed with a ternary
   (`cond ? classes.x : undefined`).

## Doc pages (2) — intentional survivors

| Survivor                                                                | Reason                                                                                                                                                                                                      |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-headless-components-preview/stories/README.md`                   | Griffel mentions are contrast framing of the package's own contract ("No inline styles, no Tailwind, no Griffel — only CSS Modules") — same class as batch-1's deprecation-framing survivors, not teaching. |
| `react-headless-components-preview/stories/src/Menu/MenuDescription.md` | "without Tabster, Griffel, or motion" — describes what the headless package deliberately omits.                                                                                                             |

Neither contains any of the 13 umbrella symbols or `@griffel` — both pass the sweep unchanged.

## Gates

| Gate                                                                                                                         | Result                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type-check: field/infolabel/input/link/list/menu/message-bar/migration-v0-v9/migration-v8-v9/motion `-stories` (10 projects) | green (2 NEW errors introduced by codemod — Stack collision, ListActiveElement `string \| false` — both fixed, see repairs)                                                                                                                                                |
| lint: same 10 projects                                                                                                       | green — zero errors/warnings after fixing the 7 NEW errors in the 3 `.styles.ts` files (use-client + boundary-types)                                                                                                                                                       |
| `public-docsite-v9` gates + build-storybook                                                                                  | n/a — batch 4 touches zero docsite files (gate conditional). NOTE: 6 of the 7 INFRA-1c pragma files (react-motion MotionSlotAPI/PresenceMotionSlotAPI) were converted this batch; `@jsxRuntime` pragmas verified still first-in-file; INFRA-1c itself untested this batch. |
| package jest                                                                                                                 | skipped — no test/spec/cy file in the 11 packages imports any `stories/src` file (verified by grep)                                                                                                                                                                        |
| VR                                                                                                                           | not applicable — no batch-4 file is in a VR app                                                                                                                                                                                                                            |
| zero Griffel symbols in batch-4 files                                                                                        | 91/91 clean (13 umbrella symbols + `@griffel`; list-existence + control-file checks confirm sweep validity)                                                                                                                                                                |

## Codemod behavior notes (batch 4)

- Bail class unchanged in shape (unresolvable identifiers in the eval sandbox) but new in kind:
  imported package mixins rather than module-scope consts. At 5 files, hand-convert remained the
  right call; if batch 5–7 hit imported-mixin spreads, values are again likely static in the
  mixin source.
- Three new mechanical defect classes (above): `'use client'` in standalone `.styles.ts`,
  css-import collision with a pre-existing `styles` binding, and single-conditional
  `mergeClasses` producing `string | false`. All caught by type-check/lint; teach the codemod if
  they recur.
- `makeResetStyles` (first seen this batch, 8 files) converts cleanly — no defects.

## Graphify

`graphify update .` skipped per batch-1/2/3 protocol (stalls) — **graphify-out/ graph is stale**
with respect to batch-4 changes (89 story files + 89 new module.css).

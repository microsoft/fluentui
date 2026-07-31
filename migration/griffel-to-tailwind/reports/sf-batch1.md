# S-F batch 1 — charts stories + docsite Concepts off Griffel

**Date:** 2026-07-30 · **Branch:** `styling/tailwind-css-modules` · **Worklist:** `reports/sf-worklist.md` (batch 1 of 7, 93 files)

## Scope executed

Batch 1 = `charts/react-charts/stories` (20 files) + `apps/public-docsite-v9/src` AccessibilityScenarios/Concepts (73 files): 49 story/scaffolding files, 44 doc pages.

## Story files (49) — all converted

- 48 via `.scratch/sf-story-codemod.js` (Griffel object eval with real `@griffel/core` shorthands +
  `@fluentui/react-theme` tokens → colocated `*.module.css`; hook-shaped shims `useX = () => styles`
  per S-E precedent; `mergeClasses` → template literal / `filter(Boolean).join(' ')`), 1 by hand
  (`DonutChartStyled.stories.tsx` — module-scope `getColorFromToken` calls resolved to their
  light-table constants `#3c51b4` / `#dbdbdb`, provenance comment in the css).
- 46 new `*.module.css` files.
- Post-codemod cleanups: shadowed `const styles = useStyles()` locals removed (docsite has
  `noUnusedLocals`); unused shims dropped; exported shims in `.styles.ts` files restored as
  `export const useXStyles = (): typeof styles => styles;` for their sibling consumers.
- `apps/public-docsite-v9/tsconfig.spec.json`: `types` += `static-assets` (utils.stories.test.tsx
  pulls a story that now imports css — same fix S-E applied to the VR app tsconfig).

## Doc pages (44)

- **25 pages / 60 fences** auto-rewritten by `.scratch/sf-mdx-codemod.js` to the recipes dialect
  (css fence: `@reference '#theme';` + layer order + rules in `@layer fui.components.l4`,
  kebab-case classes; tsx fence: `import styles from './X.module.css'` + `clsx`), plus a repair
  pass (`sf-mdx-repair.js`) for import artifacts.
- **Hand-converted:** FromV0 `Button.mdx`/`Card.mdx` (fences whose originals referenced an
  undefined `colors` — rewritten with `var(--colorNeutralForeground1)`), FromV8 `Image.mdx`
  (keyframes fence + dead-makeStyles fence removed), FromV8 `RadioGroup.mdx` (3 colliding
  single-`root` blocks → one module with 3 classes), FromV8 `Flex.Stack.mdx`/`Flex.StackItem.mdx`
  (redundant `makeStyles` comparison panes dropped — the equivalent plain-CSS panes were already
  there; titled panes retitled `*.module.css`).
- **Prose swaps:** FromV0 Popup/Tooltip, FromV8 Button/Divider/Menu/Tabs prop tables
  ("use makeStyles and className" → CSS Module phrasing); `migrate-styles.mdx` interim note
  updated (remaining makeStyles samples = mixin consumers only).
- **Rewritten wholesale (D21):**
  - `SSR/SSR.mdx`, `SSR/Nextjs.mdx`, `SSR/NextJSAppDir.mdx`, `SSR/Remix.mdx` — renderer plumbing
    (`RendererProvider`/`createDOMRenderer`/`renderToStyleElements`, insertion-point meta tag,
    transform streams, `@griffel/vite-plugin`) removed; pages now teach stylesheet import +
    `SSRProvider` + `FluentProvider` only, each with a short "migrating from an older setup" note.
    Grounding: `useFluentProviderThemeStyleTag` creates its own style element (renderer only
    supplies nonce attributes), and S-E's `scripts/test-ssr` is green with no renderer.
  - `AdvancedConfiguration.mdx` — child-window section drops the renderer; **Media Queries
    Sorting section deleted** (pure Griffel-runtime teaching).
- **Deleted (D21):** `Concepts/BuildTimeStyles.mdx` (teaches installing `@griffel/webpack-loader`;
  no inbound links found; its banner's claim that react-charts is still Griffel-based was stale
  since S-C/S-D).

## Intentional survivors (with reasons)

| Survivor                                                                                                | Reason                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FromV0 `Flex.mdx`, `FlexItem.mdx`, `Grid.mdx` (1 fence), `Loader.mdx` (1 fence), `Button.mdx` (1 fence) | Fences consume the migration packages' Griffel mixins (`flexItem`, `grid`, `spinner.v0SpinnerLabelStyle`, `buttonMigrationStyles.v0Icon`, `makeStyles` re-exported from `@fluentui/react-migration-v0-v9`). The mixins still return `GriffelStyle` and are published API; the docs retire with them in S-H (D19). `migrate-styles.mdx` note now says exactly this. |
| `StylingComponents.mdx` "Still using makeStyles?" section                                               | Accurate transitional content — re-exports exist until S-H; section already frames Griffel as legacy escape hatch.                                                                                                                                                                                                                                                 |
| `AdvancedConfiguration.mdx` CSP section (`createDOMRenderer` + `styleElementAttributes`)                | Still the only supported nonce path for FluentProvider's theme style tag; D20 (Fluent-owned nonce context) lands in S-G, which rewrites this section.                                                                                                                                                                                                              |
| `FocusIndicator.mdx`, `UnprocessedStyles.mdx`, `migrate-styles.mdx`                                     | Griffel mentions are deprecation framing added by earlier rewrites, not teaching.                                                                                                                                                                                                                                                                                  |

Doc fences are prose, not compiled imports — none of these survivors block S-H compilation.

## Gates

| Gate                                        | Result                                                                                                                                                                                                           |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-charts-stories:type-check`           | green                                                                                                                                                                                                            |
| `react-charts-stories:lint`                 | green (pre-existing `no-explicit-any` warnings unchanged; the one NEW error — `styles` shadowing — fixed)                                                                                                        |
| `public-docsite-v9:type-check`              | green                                                                                                                                                                                                            |
| `public-docsite-v9:lint`                    | green                                                                                                                                                                                                            |
| `public-docsite-v9:test` (jest)             | 1 suite / 8 tests green (covers converted `Flex/utils.stories.tsx` CodeExample)                                                                                                                                  |
| charts jest                                 | skipped — no test imports any charts story (verified by grep)                                                                                                                                                    |
| `public-docsite-v9:build-storybook`         | **green — full build, exit 0** (`dist/react` emitted). INFRA-1c (pragma blocker in react-motion/react-tree story files, none touched this batch) did not reproduce on this target; no partial validation needed. |
| VR                                          | not applicable — no batch-1 file is in a VR app                                                                                                                                                                  |
| zero Griffel symbols in batch-1 story files | 49/49 clean (verified sweep)                                                                                                                                                                                     |

## Codemod defects found and fixed during review

- mergeClasses→clsx rename leaked into umbrella import specifiers (repair pass removed).
- Unused `tokens`-only import lines left dangling at fence tails (repair pass removed).
- `tokens.colorPaletteSilverForeground1` (FromV0 Toolbar.mdx) does not exist in react-theme —
  the eval dropped it silently leaving an empty rule; restored as the literal
  `var(--colorPaletteSilverForeground1)` (parity with the original example, which referenced the
  same nonexistent token). Sweep confirmed it was the only missing-token site in batch 1.

# S-H — The Break (umbrella Griffel removal)

**Date:** 2026-07-31 · **Branch:** `styling/tailwind-css-modules` · **Decisions:** D16 (major framing), D19 (umbrella removal), D23 (conformance-griffel retirement), D20.3 (S-G/S-H boundary)

This is the major-version break record: the umbrella stops advertising Griffel, the Griffel
conformance package retires, the migration mixins retire, and the toolchain drops every Griffel
piece that no longer has a consumer. After S-H the only Griffel left in the repo is the
deliberately-frozen `deprecated/` folder and the D11 survivor VR stories.

## 1. Removed public surface

### 1.1 `@fluentui/react-components` (the umbrella) — D19

Removed from `src/index.ts` (verified against `etc/react-components.api.md` regeneration — the
api.md delta is exactly these 15 symbols):

- **12 runtime re-exports** from `@griffel/react`: `__css`, `__resetCSS`, `__resetStyles`,
  `__styles`, `createDOMRenderer`, `makeResetStyles`, `makeStaticStyles`, `makeStyles`,
  `mergeClasses`, `RendererProvider`, `renderToStyleElements`, `shorthands`
- **3 type re-exports**: `GriffelStyle`, `GriffelRenderer`, `GriffelResetStyle`
- **`package.json`**: the `wyw-in-js.tags` block (`makeStyles`/`makeResetStyles` →
  `@griffel/tag-processor`) and the `@griffel/react` dependency

The `/unstable` entrypoint re-exported nothing from Griffel (verified); its api.md is unchanged.
This drops `@griffel/core` from every v9 consumer's first-order install and kills the downstream
Griffel AOT advertisement. Consumers still authoring Griffel styles must depend on
`@griffel/react` directly.

### 1.2 `@fluentui/react-migration-v0-v9` — mixins retirement (D19)

Disposition recorded in sf-batch1/sf-batch4: "the mixins retire with the migration package in
S-H (D19)". Removed (api.md delta is exactly these):

- `flexItem` (align/size/grow/shrink/pushRow/pushColumn), `grid` (columns/rows),
  `input` (error/errorIndicator/fluid/successIndicator), `slider` (fluid),
  `spinner` (v0Inline/v0SpinnerLabelStyle), and the button mixins `v0Icon`, `v9CustomSizeIcon`,
  `v9DisabledCursor`, `v9HoverClasses`, `v9Icon` — 6 `*.mixins.ts` files + tests; the
  mixin-only component folders (`Button/`, `Input/`, `Slider/`, `Spinner/`) are gone entirely.
- Mixin-demo stories deleted: `Migration Shims/V0/{ButtonMixins,InputMixins,SliderMixin,SpinnerMixins}`
  and FlexShim's two `FlexItem*` mixin-comparison stories (**deviation, recorded**: FlexShim's
  `Default` story is kept — the `Flex` shim component itself survives and would otherwise lose
  its only story).
- FromV0 docsite guides rewritten to plain CSS (not deleted — they document surviving shim
  components; only the mixin teaching retired): `Button.mdx` (both icon-integration fences +
  mixin link), `FlexItem.mdx` (full prop table now maps to flexbox declarations),
  `Grid.mdx`, `Flex.mdx`, `Slider.mdx`, `Loader.mdx`, `migrate-styles.mdx` note updated to
  past tense.
- `docs/MIGRATION.md` in react-image: 3 `makeStyles`-from-`@griffel/react` fences → CSS Modules.

### 1.3 `@fluentui/react-conformance-griffel` — retired (D23)

- `griffelTests` unwired from all **55** non-deprecated `src/testing/isConformant.ts` wrappers
  (the two `deprecated/` wrappers — react-alert, react-infobutton — keep it deliberately).
- `'make-styles-overrides-win'` dropped from `disabledTests` in **~190** component test files
  (35 of them lost the now-empty `disabledTests` property). The explanatory migration comments
  stay for the S-I provenance sweep. `classname-overrides-win` (D9) remains the cascade-native
  replacement; its jsdoc/suggestion text no longer references the retired test.
- Package moved to `packages/react-components/deprecated/react-conformance-griffel`
  (react-alert precedent): `eol` nx tag, beachball `disallowedChangeTypes`
  `["major","minor","patch"]` freeze, `## DEPRECATED` README note, api-extractor
  `mainEntryPointFilePath` override for the deeper folder. Published history untouched.
- References repointed: `tsconfig.base.json` / `tsconfig.base.all.json` path entries,
  `.github/CODEOWNERS`, `scripts/beachball/src/config.test.ts` (tools scope),
  `scripts/generators/src/create-package` node reference package → `@fluentui/react-conformance`.

## 2. Tooling purged (and what deliberately stays)

Removed:

- **eslint**: `@griffel/eslint-plugin` + its 4 rules (`hook-naming`, `no-shorthands`,
  `pseudo-element-naming`, `styles-file`) from `packages/eslint-plugin` shared react config,
  legacy config, and the 4 per-app `styles-file: off` overrides (vr-tests, perf-test,
  react-storybook-addon, theme-designer). `@eslint/compat` dropped with its only usage
  (`fixupPluginRules` wrapped the Griffel plugin). Deprecated packages keep linting through the
  shared config — the removed rules were advisory-only for them.
- **Generators**: `react-component` now scaffolds clsx + CSS Modules (`*.module.css` template,
  `group/fui-<kebab>` marker per D15.1/D16.5, clsx compose order per D16.2); `react-library` no
  longer emits the `@griffel/react` dependency, the `@griffel/jest-serializer`
  `snapshotSerializers` line (the repo `jest.preset.js` already ships the css-modules
  serializer), or the conformance-griffel wrapper. Specs updated. This closes the S-A "new
  packages are scaffolded onto Griffel" defect, which had survived to S-H.
- **Root devDeps**: `@griffel/eslint-plugin`, `@griffel/react` (every remaining importer has its
  own manifest entry); `clsx` added (generator version-fill source).
- **Stale package deps**: `@griffel/react` removed from 6 manifests whose sources are
  Griffel-free (public-docsite-v9, component-selector-preview, react-button,
  react-colorpicker-compat, react-icons-compat, react-utilities-compat) and from react-menu
  (its `Menu.cy.tsx` — the last consumer — was converted).

Kept, each with a verified consumer:

| root devDep                | consumer                                                                                                    | retires with                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `@griffel/babel-preset`    | `scripts-babel/preset-v9` → the build executor's per-package AOT gate, live only for `deprecated/` packages | the deprecated packages (executor TODO already tracks it) |
| `@griffel/jest-serializer` | ~59 per-package jest configs                                                                                | S-I sweep                                                 |
| `@griffel/shadow-dom`      | `vr-tests` ShadowDOM utils (D11 survivor)                                                                   | D11 revisit                                               |
| `@griffel/webpack-loader`  | `scripts/storybook/rules.js` `griffelRule`                                                                  | D11 revisit                                               |

The vr-tests `griffelRule` **stays**: the 3 D11 survivor stories (`MakeStyles`,
`MakeStylesPseudo`, `CustomStyleHooks`) and the ShadowDOM stories still exist (checked — not
deleted by the user), so the storybook webpack config still needs to compile Griffel imports.
`scripts/storybook/custom-loader.js`'s `'@griffel'` preset exclusion likewise stays (deprecated
packages' stories still flow through it). `migrate-converged-pkg`'s conditional Griffel logic
(serializer/babelrc emission keyed on a package having `@griffel/react`) is inert post-break and
left for S-I.

## 3. Last live Griffel imports converted

- `react-menu` `Menu.cy.tsx` — DebugPointer `makeStyles` → plain class + `<style>` tag.
- `react-aria` `useActiveDescendant.cy.tsx` — focus-visible debug rule → attribute-selector
  `<style>` tag (Griffel's `[attr]` nesting = `&[attr]`, so the plain selector is equivalent).
- `react-dialog` `Dialog.test.tsx` — custom-surface fixture → clsx + `<style>`.
- `react-button` `useButton.test.tsx` — recomposition fixture `mergeClasses` → clsx.
- `public-docsite-v9-headless` `Introduction.styles.ts` → `Introduction.module.css` (values
  verbatim; the app was already CSS-Modules end-to-end).

## 4. Gates

| gate                                                                       | result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full build (`nx run-many -t build --projects=tag:vNext --parallel=3`)      | **green** — 91 projects + 20 dependent tasks, exit 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| API extractor                                                              | umbrella api.md delta = exactly the 15 removed symbols; react-migration-v0-v9 api.md delta = exactly the mixins; both committed. conformance-griffel api.md regenerated at its new path                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Jest affected sweep (`nx affected -t test --base=071c326bec --parallel=3`) | **green except a fixed set of suites that were already failing in every pre-S-H gate log** (`.scratch/H*-affected-tests.log`): eslint-plugin ban-context-export, scripts-babel preset-v9.spec, scripts-monorepo getDependencies/workspace-utils, scripts-jest v8 preset, scripts-storybook utils.spec, scripts-generators generate-version-files, babel-preset-global-context, babel-preset-storybook-full-source, react-integration-tester e2e, react-timepicker-compat timeMath, visual-regression-assert utils, and the workspace-plugin executor/plugin suites. Same failure identities as pre-S-H (Windows-checkout environment issues / stale local inline snapshots), not S-H regressions. The v8/just-scripts projects (merge-styles, theme, dom-utilities, style-utilities, keyboard-key, date-time-utilities, chart-utilities, test-utilities, react-charting, codemods, scripts-executors, vr-tests-react-components) fail with the pre-existing `spawn jest ENOENT` / hang class present in all four pre-S-H logs — their `test` targets have never passed on this checkout. Every package whose deps/tests S-H touched is green — umbrella, react-menu 484, react-aria 46, react-dialog 123, react-button 198 (+13 pre-existing skips), react-migration-v0-v9 198 (+37 pre-existing skips), react-conformance, react-conformance-griffel, react-alert, react-infobutton. workspace-plugin generator specs: styles-template + library snapshots updated and passing; two platform-noise items remain on Windows (4 `tree.children` ordering assertions — failing **at HEAD too** — and migrate-converged-pkg's `..\\..\\` path-separator assertion, untouched code) |
| SSR (`ssr-tests-v9:test-ssr`)                                              | **green** — full run, "Test finished successfully"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Docsite (`public-docsite-v9:build-storybook`)                              | **green** — the real story-side gate that nothing still needs the removed exports (the INFRA-1c Windows blocker no longer reproduces)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| VR spot gate (fresh `--skip-nx-cache` storybook; zero tolerance)           | **4/4 sets PASS, zero diffs** — `button` (129 shots), `button-family` (342), `menu` (64), `react-portal` (2, provider/portal proxy — no dedicated FluentProvider baseline set exists; provider is exercised by every story). Driver: `.scratch/sh-vr-spot.mjs`, results `.scratch/sh-vr-spot-results.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

## 5. Griffel-zero assertion

`git grep` for `@griffel/` in import/require position across `packages apps scripts tools`,
excluding `packages/react-components/deprecated/` — every survivor, with reason:

| file                                                                                                     | reason                                                                                 |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `apps/vr-tests-react-components/src/stories/MakeStyles/MakeStyles.stories.tsx`                           | D11 survivor VR story (allowed)                                                        |
| `apps/vr-tests-react-components/src/stories/MakeStyles/MakeStylesPseudo.stories.tsx`                     | D11 survivor VR story (allowed)                                                        |
| `apps/vr-tests-react-components/src/stories/CustomStyleHooks.stories.tsx`                                | D11 survivor VR story (allowed)                                                        |
| `apps/vr-tests-react-components/src/stories/ShadowDOM/ShadowDOMDefault.stories.tsx`                      | D11 shadow-DOM survivor (allowed)                                                      |
| `apps/vr-tests-react-components/src/stories/ShadowDOM/utils.tsx`                                         | D11 shadow-DOM utils (allowed)                                                         |
| `packages/eslint-plugin/src/rules/no-restricted-imports/index.test.js` + README                          | rule fixture strings / docs — test data, not executed imports                          |
| `packages/react-components/eslint-plugin-react-components/src/rules/enforce-use-client.spec.ts` + README | rule fixture strings — the rule keeps detecting Griffel usage for external consumers   |
| `tools/workspace-plugin/src/executors/build/{executor.spec.ts,__fixtures__/...greeter.styles.ts}`        | build-executor AOT-path fixtures — the AOT path stays alive for `deprecated/` packages |
| `tools/workspace-plugin/src/executors/build/lib/babel.ts`                                                | comment describing the Griffel-specifier regex (no import)                             |

**Zero live `@griffel/*` imports outside `deprecated/` + the D11 survivors.** Manifest check:
zero `@griffel/*` entries in any non-deprecated `package.json` except
`apps/vr-tests-react-components` (`@griffel/react`, serving the D11 survivors) and the 4
retained root devDeps in §2.

## 6. Consumer migration guidance (the one-paragraph summary)

`@fluentui/react-components` vNEXT no longer exports any Griffel API. If you import
`makeStyles`/`mergeClasses`/`shorthands`/etc. from the umbrella, either (a) migrate your styles
to plain CSS/CSS Modules — component internals are addressed via per-slot `className` props and
the `group/fui-*` identity markers, and unlayered consumer CSS beats the library's `@layer
fui.*` rules by default — or (b) add `@griffel/react` to your own dependencies and import from
it directly; Griffel remains a fine standalone CSS-in-JS library, but Fluent no longer ships,
wraps, or AOT-advertises it. The `wyw-in-js` build-time transform hook is gone with it, and
`@fluentui/react-conformance-griffel` gets no further releases (use `classname-overrides-win`
from `@fluentui/react-conformance`). These land in the same major as the D16 statics removal, so
consumers absorb one styling break, not three.

## 7. Incident note (working-tree safety)

A failed `nano-staged` pre-commit run (the RUNBOOK-documented Windows command-length limit —
"above ~70 staged JS/TS files the command line overflows and husky rolls the commit back";
isolated here as "The command line is too long") rolled back all _unstaged_ working-tree changes
while restoring its backup, beyond the staged-index rollback the RUNBOOK warns about. My
in-flight S-H edits were redone from the session log; the user's uncommitted `CLAUDE.md`
(graphify section) and `.gitignore` (`.scratch/` line) edits were reconstructed verbatim from
the session context. Commits after that were chunked ≤50 files.

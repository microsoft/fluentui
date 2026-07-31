# S-E — Test/VR harness off Griffel (griffel-zero stage S-E)

Date: 2026-07-30 · Branch: `styling/tailwind-css-modules`

Scope per `griffel-zero-plan.md` S-E and `griffel-elimination-evaluation.md` §7: the harness's
OWN Griffel usage — VR story scaffolding under `apps/vr-tests-react-components/`,
`scripts/test-ssr`, and the perf-test scenario. Explicitly out of scope: the icons CSS import
into storybook preview / VR harness (gated on icons-fork adoption, later integration batch),
component library code, and packages' `stories/` trees (S-F). `apps/vr-tests` (v8) had zero
`@griffel` references — nothing to do there.

## 1. VR harness (`apps/vr-tests-react-components`)

### Converted — 21 files, Griffel → colocated `*.module.css` (20 new CSS files in this tree)

Story-file contracts were preserved by keeping hook-shaped `useStyles = () => styles` exports
where multiple stories consume a shared `utils` module, so consuming stories needed no edits
beyond `mergeClasses` removal. Token references became `var(--token)`;
`typographyStyles.subtitle2Stronger` was expanded to its four declarations;
`createArrowStyles({ arrowHeight: 12, ... })` was hand-expanded into `.arrow` CSS
(edge 16.968px / offset -8.484px); directional properties with RTL story variants
(`marginLeft` in Badge label, Tree badges) became logical (`margin-inline-start`) to keep the
flip Griffel's rtl transform provided. Slider's custom-property overrides hard-code the
literal `sliderCSSVars` names (`--fui-Slider__*`), preserving the pre-existing invalid
`##242424` rail value byte-for-byte.

| file                                                             | change                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `stories/Badge/utils.ts` (+`utils.module.css`)                   | 8 classes                                                                 |
| `stories/Badge/BadgeAppearance.stories.tsx`                      | `mergeClasses` → filter/join                                              |
| `stories/Button/utils.ts` (+css)                                 | 1 class                                                                   |
| `stories/Card/Card.stories.tsx` (+`Card.module.css`)             | 3 classes                                                                 |
| `stories/ColorPicker/utils.tsx` (+css)                           | 1 class                                                                   |
| `stories/Link/utils.tsx` (+css)                                  | 2 classes                                                                 |
| `stories/Menu/NestedMenuSmallViewportFlipped.stories.tsx` (+css) | 2 classes                                                                 |
| `stories/Menu/NestedMenuSmallViewportStacked.stories.tsx` (+css) | 1 class                                                                   |
| `stories/Menu/ScrollableMenuSmallViewport.stories.tsx` (+css)    | 5 classes                                                                 |
| `stories/Portal.stories.tsx` (+`Portal.module.css`)              | canary class (CSS-var-insertion transition canary intent preserved)       |
| `stories/Positioning/utils.tsx` (+css)                           | 9 classes incl. expanded arrow + popper-placement globals                 |
| `stories/ProgressBar.stories.tsx` (+css)                         | `.paused *` animation freeze                                              |
| `stories/Skeleton.stories.tsx` (+css)                            | `.paused *` animation freeze                                              |
| `stories/Slider/utils.ts` (+css)                                 | var overrides incl. `:hover`/`:hover:active`                              |
| `stories/SpinButton/SpinButton.stories.tsx` (+css)               | in-render `makeStyles` removed                                            |
| `stories/Spinner.stories.tsx` (+`Spinner.module.css`)            | `makeResetStyles` → class; `.group\/fui-spinner` descendant selector kept |
| `stories/Tag/InteractionTag.stories.tsx` (+css)                  | box-sizing container                                                      |
| `stories/TagPicker.stories.tsx` (+css)                           | 2 classes, `mergeClasses` → template join                                 |
| `stories/Toolbar/Toolbar.stories.tsx` (+css)                     | 1 class                                                                   |
| `stories/Tree.stories.tsx` (+`Tree.module.css`)                  | badges aside                                                              |
| `tsconfig.json`                                                  | `types` += `static-assets` (`*.module.css` declaration)                   |

The app's storybook webpack already resolves `*.module.css` via the shared
`@fluentui/scripts-storybook` rules (commit b0ed9dd7c5) — no build wiring needed.
`griffelRule` stays in the storybook config: survivors below and unconverted packages still
need it; its removal is the tail of S-E per the plan ("then drop griffelRule +
@griffel/webpack-loader") and is NOT possible yet.

### Intentional Griffel survivors — 5 files

| file                                                                                                                                   | reason                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `stories/ShadowDOM/utils.tsx`                                                                                                          | Load-bearing: `createShadowDOMRenderer` + `RendererProvider` inject styles into the shadow root — the mechanism under test. D11 accepted loss; replacement (adoptedStyleSheets/clone) deliberately deferred; stories marked known-changed.                                                                                           |
| `stories/ShadowDOM/ShadowDOMDefault.stories.tsx`                                                                                       | Its `makeStyles` renders INSIDE the shadow root; a module class in the document stylesheet cannot reach it, so conversion would change pixels. Travels with the D11 decision.                                                                                                                                                        |
| `stories/MakeStyles/MakeStyles.stories.tsx`, `stories/MakeStyles/MakeStylesPseudo.stories.tsx`, `stories/CustomStyleHooks.stories.tsx` | D11 prescribes retirement with their baselines ("Griffel-specific VR stories — 11 stories"). **Deletion was denied by the permission system this session** (both `git rm`/`rm` classifier-blocked and `Remove-Item` denied by user). Left byte-identical, reported as pending retirement — delete in a follow-up with user approval. |

Consequence: `@griffel/react` stays in `apps/vr-tests-react-components/package.json` (the five
survivor files import it). It can drop when the three retirement files are deleted and the D11
shadow-DOM replacement lands.

### VR validation — zero tolerance, PASS

Protocol per charts C5–C7: both legs fresh `yarn nx run vr-tests-react-components:build-storybook
--skip-nx-cache` (0 cache-replay lines each; candidate dist mtimes verified newer than sources),
capture via `validation/capture.mjs`, diff via `validation/diff.mjs --maxDiffPixels 0`.

- Baseline (pre-change build): **1438 screenshots / 581 stories**
- Candidate (post-change build): **1438 screenshots / 581 stories**
- `diff.mjs`: **1438 pairs, 1438 clean, 0 failed, 0 missing, 0 extra — PASSED**

Story kinds covered (26 sets, screenshots): Badge Converged 25; Button Converged 129;
CompoundButton 66; MenuButton 60; SplitButton 132; ToggleButton 84; Card Converged 8;
ColorPicker 7; InteractionTag 104; Link Converged (anchor/button/span) 82/66/64; Menu 5;
Portal 2; Positioning 59 (+4 no-decorator, +1 safe-area); ProgressBar 11; Skeleton 21;
Slider 39; SpinButton 263; Spinner 17; TagPicker 44; Toolbar 21; Tooltip 20; Tree 104.
Untouched kinds (Card Converged - Disabled/Interactive/Selectable, Menu Converged - \*,
retained MakeStyles/CustomStyleHooks/Shadow DOM) were excluded — sources unchanged.
Seeded `.scratch/sweep-results.json` untouched.

## 2. `scripts/test-ssr` — 5 files, Griffel-free

The SSR harness asserted Griffel style extraction; the CSS-Modules equivalent asserts markup
render + clean hydration (styles are static CSS; class names are deterministic on both sides via
the existing `cssModulesShimPlugin`).

- `src/utils/renderToHTML.ts` — dropped `RendererProvider`/`createDOMRenderer`/
  `renderToStyleElements`; renders `<App/>` directly; `<head>` no longer embeds extracted styles.
- `src/utils/generateEntryPoints.ts` — hydration entry template no longer wraps in
  `RendererProvider`.
- `src/utils/buildAssets.ts` — `@griffel/core`/`@griffel/react` removed from esbuild externals.
- `src/utils/renderToHTML.test.ts` — fixture rewritten off `makeStyles`; asserts rendered class,
  script src, content (the `data-make-styles-bucket` assertion is gone with the mechanism).
- `src/utils/generateEntryPoints.test.ts` — inline snapshot updated.

Gates: jest 4 suites / 12 tests / 9 snapshots PASS; `apps/ssr-tests-v9` full run (bundle → SSR
render → puppeteer hydration) PASS against converted packages (react-menu, react-tooltip,
react-utilities stories); eslint + tsc clean.

## 3. Perf-test scenario (`apps/perf-test-react-components`)

`src/scenarios/MakeStyles.tsx` was a benchmark whose purpose was measuring Griffel
(evaluation §7: "retire it or repoint it at CSS Modules"). perf-eval measured Griffel-vs-CSS-Modules
in its own harness; what the flamegrill suite loses by retiring is any styling-path scenario, so it
was REPOINTED: identical DOM and computed styles, classes from a colocated
`MakeStylesStyles.module.css`, composition by string concatenation. It now measures the mount cost
of the shipped styling path. The historical filename is kept (scenario ids derive from filenames;
also, file deletion was denied this session, so a rename was not available). `@griffel/core`
dropped from `package.json`; `webpack.config.js` gained `cssModulesRule` (shared chain) with
`*.module.css` excluded from the plain `cssRule`; `tsconfig.app.json` `types` += `static-assets`.

Gates: `nx run perf-test-react-components:bundle --skip-nx-cache` green; `type-check` green;
eslint clean on touched files.

## Gate summary

| gate                                        | result                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------- |
| VR zero-tolerance diff (affected sets)      | PASS 1438/1438, both legs fresh `--skip-nx-cache`                                  |
| `vr-tests-react-components:build-storybook` | green (candidate leg)                                                              |
| SSR: test-ssr jest + ssr-tests-v9 run       | PASS                                                                               |
| perf scenario bundle + type-check           | PASS                                                                               |
| ESLint + tsc on touched files               | clean (pre-existing Charts/library errors unchanged, untouched files)              |
| `@griffel` imports in the three trees       | 0 outside the 5 documented survivors (perf tree: comment-only provenance mentions) |

## Decision points raised

1. **MakeStyles/CustomStyleHooks retirement blocked** — D11 already authorizes deletion; the
   permission system denied file deletion this session. Needs a user-performed (or user-approved)
   `git rm` of `stories/MakeStyles/` and `stories/CustomStyleHooks.stories.tsx`, after which
   `@griffel/react` can leave the VR app's package.json.
2. **Perf scenario name** — content is now CSS Modules under the historical `MakeStyles.tsx`
   name; rename to `CssModules.tsx` (pure `git mv`) at the same follow-up if scenario-id churn
   is acceptable.

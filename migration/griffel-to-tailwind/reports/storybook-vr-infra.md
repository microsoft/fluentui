# Research: storybook-vr-infra

_Generated 2026-07-26 by research workflow wf_7f8b1226-35f (research agents; verify against source before acting on stale claims)._

## Summary

Fluent UI has a complete, locally-runnable VR pipeline: `apps/vr-tests-react-components` is a dedicated Storybook (1578 stories, 107 component groups, exact count from its built `index.json`) driven by StoryWright, a Playwright wrapper that writes PNGs to disk with no cloud dependency; only the _diff_ step is cloud-gated (Azure-hosted `vr-approval-cli`). The repo already contains an unwired, fully local pixelmatch diff CLI at `tools/visual-regression-assert` that I built and proved end-to-end. Critically, `apps/vr-tests-react-components` is the only Storybook in the repo that builds on this Windows machine — `public-docsite-v9` and `public-docsite-v9-headless` both fail with 862 / 156 module errors due to a POSIX-path regex in `react-storybook-addon-export-to-sandbox`. Jest snapshots contain zero Griffel hashes today only because 73 jest configs install `@griffel/jest-serializer`; removing Griffel makes CSS Module hashes leak into 126 `.snap` files, and the `make-styles-overrides-win` conformance test (wired into 57 `isConformant.ts` wrappers, 243 test call sites) mocks `@griffel/react.mergeClasses` and will fail for every converted component.

## Key facts

- `apps/vr-tests-react-components/dist/storybook/index.json` contains exactly **1578 story entries** across **107 distinct titles**; 822 are base stories and 756 are theme/RTL variants (ids containing `rtl`: 256, `dark-mode`: 260, `high-contrast`: 240).
- The VR runner is **StoryWright** (`storywright@0.0.27-storybook7.14`, a Playwright wrapper), invoked from `apps/vr-tests-react-components/package.json` as `storywright --browsers chromium --url dist/storybook --destpath dist/screenshots --waitTimeScreenshot 500 --concurrency 4 --headless true --bailOnStoriesError --stepsApi parameters`. No Screener, no Chromatic anywhere in the repo.
- Screenshot **capture is fully local** — `node_modules/storywright/src/StoryWrightProcessor/PlayWrightExecutor.ts:293` calls `page.screenshot({path})`, writing `{dest}/{kind}.{storyName}.{stepName}.{browser}.png`. I ran it: 43 `Button Converged` stories → **129 PNGs, 1.6 MB, 83 s** at `--concurrency 4`.
- Screenshot **diffing is cloud-gated** — `.github/workflows/pr-vrt-comment.yml` and `.github/workflows/vrt-baseline.yml` shell out to `npx vr-approval-cli@0.5.1 run-diff --threshold 0.04 --cumThreshold 1` after `azure/login` with `AZURE_VRT_CLIENT_ID`/`AZURE_TENANT_ID`/`AZURE_SUBSCRIPTION_ID`.
- A **complete offline pixel-diff CLI already exists and is unwired**: `tools/visual-regression-assert` (pixelmatch 7 + pngjs, `assert`/`report`/`update-baseline`, HTML+MD+JSON reporters, `src/assert.ts:36` `threshold: 0.1`). `grep -rn 'visual-regression-assert'` finds zero consumers outside its own directory. I built it and confirmed it detects a 100-pixel perturbation and exits non-zero.
- Measured: `yarn nx run vr-tests-react-components:build-storybook --skip-nx-cache` → **1m23.199s**, 29 dependent nx tasks, 35 MB output. `apps/vr-tests-react-components/.storybook/main.js` sets `reactDocgen: false` and `lazyCompilation: false` and does not inherit the root `.storybook/main.js`.
- Measured: `yarn nx run public-docsite-v9:build-storybook` **fails on Windows** in 2m0.086s with 862 `Module build failed` errors; `public-docsite-v9-headless` fails in 35.8s with 156. Root cause is `packages/react-components/react-storybook-addon-export-to-sandbox/src/webpack.ts:19` — `/react-storybook-addon-export-to-sandbox\/[a-z/]+.[jt]s$/` never matches the backslash path produced by `scripts/storybook/src/utils.js:160`, so `importMappings` is undefined and `packages/react-components/babel-preset-storybook-full-source/src/modifyImports.ts:32` throws `Object.keys(undefined)`.
- Storybook `globals` URL params drive theme **and** direction on a static build with no source changes — verified via Playwright: `iframe.html?id=button-converged--default&globals=storybook_fluentui-react-addon_theme:teams-high-contrast;storybook_fluentui-react-addon_dir:rtl` yields `bg rgb(0,0,0)`, `dir=rtl`. Constants live in `packages/react-components/react-storybook-addon/src/constants.ts`; resolution order is `parameters.fluentTheme ?? globals[THEME_ID]` in `src/decorators/withFluentProvider.tsx`.
- The addon exposes **7 themes** (`packages/react-components/react-storybook-addon/src/theme.ts`) but VR only exercises 3 — `getStoryVariant.tsx` maps RTL→webLightTheme+dir:rtl, DARK_MODE→webDarkTheme, HIGH_CONTRAST→teamsHighContrastTheme.
- StoryWright forces determinism per story (`StoryWrightProcessor.ts`): fresh BrowserContext, viewport hard-coded **1920×964** (confirmed against a captured PNG header), and an init script setting `caret-color: transparent !important` and `transition-duration/animation-duration: 0ms !important`.
- Step-method usage across `apps/vr-tests-react-components/src`: 230 `.snapshot(`, 55 `.hover(`, 34 `.click(`, 27 `.mouseDown(`, 18 `.focus(`, 18 `.wait(`, 15 `.executeScript(`, 10 `.mouseUp(`, 4 `.keys(`. Stories with no steps get one full-page shot (`PlayWrightExecutor.processStory`, line 169); 16 of 137 story files declare none.
- Docs stories total **~880** — `find packages/react-components -name index.stories.tsx | wc -l` → 163 files, containing 854 re-exported names + 26 direct `export const`. The docsite glob is `**/@(index.stories.@(ts|tsx)|*.mdx)` (`scripts/storybook/src/utils.js:258`), so the 1082 leaf `*.stories.tsx` files are only reachable through those indexes.
- VR covers far more states than docs: Button 44 docs stories vs 159 VR stories (×3 snapshots ≈ 477 images); Drawer 20 vs 76; Dialog 18 vs 63; Tags 27 vs 103. Docs stories carry zero interaction states and no theme matrix.
- Jest snapshots contain **no Griffel hashes** — 141 `.snap` files / 196 entries in `packages/react-components`, 126 with `class=`, and `grep -rl 'class="[^"]*\bf[a-z0-9]{5,}'` returns 0. That is entirely due to `snapshotSerializers: ['@griffel/jest-serializer']` in **73** of 118 package `jest.config.js` files; the serializer strips only classes registered in `@griffel/core`'s `DEFINITION_LOOKUP_TABLE`.
- `packages/react-components/react-conformance-griffel/src/overridesWin.ts` mocks `@griffel/react`'s `mergeClasses` and asserts the consumer `className` is passed last. It is wired into **57** `isConformant.ts` wrappers and reached from **243** test files calling `isConformant(`.
- Storybook's implicit CSS rule already handles CSS Modules: `@storybook/builder-webpack5/dist/presets/custom-webpack-preset.js` registers `{test:/\.css$/, use:[style-loader, css-loader{importLoaders:1}]}`, its bundled css-loader is **6.11.0**, and `dist/utils.js:452` defaults `modules.auto = true` with `IS_MODULES = /\.module(s)?\.\w+$/i`. `packages/react-components/react-headless-components-preview/stories/.storybook/css-modules-webpack.js` only adds `localIdentName: '[name]__[local]--[hash:base64:5]'`.
- **No Tailwind anywhere in the repo** — `grep -rn tailwind --include=package.json` outside `node_modules` is empty. The single artifact, `apps/public-docsite-v9-headless/.storybook/tailwind-sandbox-template.js`, injects `tailwindcss@^4` + `@tailwindcss/vite@^4` into StackBlitz _export_ sandboxes only. Root has `postcss 8.5.10` but only `postcss-loader 4.1.0`.
- `apps/public-docsite-v9-headless` + `packages/react-components/react-headless-components-preview/stories` is the existing CSS-Modules precedent: **47** `*.module.css` files, a 5.6 KB `tokens.css` imported from `preview.js`, and `registerCssModuleRules` in `main.js`.
- `apps/rit-tests-v9` is React-major-version integration testing (`rit.config.js` → React 17/18/19 type-checks + one Cypress spec), not visual regression. The only three Playwright configs (`packages/web-components`, `packages/charts/chart-web-components`, `packages/tokens`) do no image diffing — `grep -rn 'toHaveScreenshot|toMatchImageSnapshot'` outside node_modules returns zero.
- 26 files under `apps/vr-tests-react-components/src` import `@griffel/react`, and three whole story files (`MakeStyles.stories.tsx`, `MakeStylesPseudo.stories.tsx`, `CustomStyleHooks.stories.tsx`) exist to test Griffel itself. The app also declares `@griffel/react` as a direct dependency and registers `rules.griffelRule` in its `.storybook/main.js`.

## Risks

- **Windows blocker: only the VR storybook builds.** `public-docsite-v9` (862 errors, 2m0s) and `public-docsite-v9-headless` (156 errors, 35.8s) both fail because `react-storybook-addon-export-to-sandbox/src/webpack.ts:19` uses a POSIX-only regex against a backslash path from `scripts/storybook/src/utils.js:160`. Since `.storybook/main.js:44` registers that addon for every inheriting config, all 66 per-component storybooks and `chart-docsite` are affected too. Either fix the regex (normalize with `.split(path.sep).join('/')`) or accept that the docsite is not part of the local validation loop on this machine.
- **Jest snapshot hash leakage.** `@griffel/jest-serializer` keys off `@griffel/core`'s runtime tables; once a component's classes come from css-loader it strips nothing, and hashed CSS-Module names land in **126** `.snap` files. Every subsequent CSS edit then produces snapshot churn. Needs a replacement serializer or `localIdentName: '[local]'` under NODE_ENV=test — decided _before_ the first component is converted, not after.
- **`make-styles-overrides-win` conformance test fails for every converted component.** It jest-mocks `@griffel/react.mergeClasses` and asserts call ordering; a component that no longer calls it trips `expect(mergeClasses.mock.calls.length).toBeGreaterThanOrEqual(1)`. Blast radius: 57 `isConformant.ts` wrappers, 243 test files. A `clsx`-equivalent conformance test must land alongside the first conversion.
- **Baseline identity is name-derived, not content-derived.** StoryWright filenames are `{title}.{storyName}.{stepName}.{browser}.png` (`PlayWrightExecutor.getScreenshotPath`). Any rename of a story, `storyName`, or Steps snapshot label silently orphans the baseline — `visual-regression-assert` reports it as `remove` + `add` rather than a diff, which reads as noise in a large migration diff.
- **Storywright fails silently.** My first `test-vr` invocation produced zero screenshots because `chromium_headless_shell-1194` was missing, yet the process exited 0 — `--bailOnStoriesError` only guards per-story errors, not browser launch. A migration harness must assert an expected screenshot count, not trust the exit code.
- **Full VR run is expensive.** 43 Button stories took 83 s at concurrency 4; linear extrapolation to 1578 stories is ~51 minutes per capture pass (consistent with `.github/workflows/pr-vrt.yml`'s `timeout-minutes: 60`), and a before/after comparison needs two passes. Budget partitioning (`--partitionIndex`/`--totalPartitions` exist) or per-package scoping via `--excludePatterns`.
- **Griffel-specific VR stories have no CSS-Modules equivalent.** `MakeStyles.stories.tsx`, `MakeStylesPseudo.stories.tsx` and `CustomStyleHooks.stories.tsx` (11 stories) test Griffel's own behavior — RTL flipping inside nested providers, `customStyleHooks_unstable` overrides, shadow-DOM style injection. These are not convertible and their baselines will be deleted, so the diff report will show removals that are legitimate rather than regressions.
- **The VR app itself depends on Griffel.** 26 files under `apps/vr-tests-react-components/src` import `@griffel/react` for test-harness styling (`Button/utils.ts` `longText`, `Positioning/utils.tsx` boxes/arrows). If Griffel is removed workspace-wide these break; if it is kept for the harness, the VR app cannot prove Griffel is gone.
- **`visual-regression-assert` is unproven in production.** It has zero consumers, has not run in CI since it landed (#34024/#34076), and uses a flat `pixelmatch threshold: 0.1` with `numDiffPixels > 0` as the fail condition — far stricter than the cloud path's `--threshold 0.04 --cumThreshold 1`. Sub-pixel antialiasing differences across OS/GPU will produce false positives unless a tolerance is added.
- **Tailwind v4 requires new toolchain deps with no in-repo precedent.** No `tailwindcss` package is installed; root `postcss-loader` is 4.1.0 (2020-era, only present for the v8 SCSS rule). Adding `@storybook/addon-postcss` is specifically unsafe — `custom-webpack-preset.js` deletes the implicit `.css$` rule when it detects that addon, which also breaks `registerCssModuleRules`.
- **Coverage gap between the two story sets.** The docsite indexes ~880 stories that VR does not cover (and vice versa: VR covers 1578). Components whose only stories are docs stories get no pixel validation at all unless VR stories are added, and the docsite is currently unbuildable here.
- **Cross-platform screenshot non-determinism.** CI captures on `macos-14-xlarge` (arm64); baselines produced on Windows will not match. `visual-regression-assert`'s own `--updateSnapshots` help text warns that in-run snapshot updates are only safe "if you can guarantee that all users and CI are using same OS environment." Font rendering (`preview-head.html` pulls Segoe UI from `c.s-microsoft.com`, requiring network) compounds this.
- **Local repo hygiene note:** I appended `.scratch/` to `.gitignore` (per the project scratch convention) and left measurement artifacts under `.scratch/` including `button-vr-screenshots/` (129 PNGs), build logs, and `globals-probe.js`. `apps/vr-tests-react-components/dist/` and `tools/visual-regression-assert/dist/` now contain real build output. The working tree is otherwise clean apart from pre-existing sibling-agent files (`.scratch_mc.js`, `.scratch_order*.js`, `graphify-out/`).

## Full report

# Storybook + Visual-Regression Infrastructure (fluentui @ master d712b3c8fb)

All timings below were measured on this machine (32 logical cores, reported by StoryWright's own `Cores available on system = 32`). Commands are quoted verbatim.

---

## 1. The Storybooks and how to build/run them

### 1.1 Inventory

| App / package                                                      | Config                                                                   | Purpose                                         | `build-storybook` script                                                                                      |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `apps/vr-tests-react-components`                                   | `apps/vr-tests-react-components/.storybook/main.js`                      | v9 React VR tests                               | `storybook build -o dist/storybook`                                                                           |
| `apps/vr-tests`                                                    | `apps/vr-tests/.storybook/main.js`                                       | v8 VR tests                                     | same                                                                                                          |
| `apps/vr-tests-web-components`                                     | `apps/vr-tests-web-components/.storybook/`                               | web-components VR                               | same                                                                                                          |
| `apps/public-docsite-v9`                                           | `apps/public-docsite-v9/.storybook/main.js`                              | main docs site                                  | `cross-env NODE_OPTIONS=--max_old_space_size=3072 DEPLOY_PATH=/react/ storybook build -o ./dist/react --docs` |
| `apps/public-docsite-v9-headless`                                  | `apps/public-docsite-v9-headless/.storybook/main.js`                     | headless preview docs (**already CSS Modules**) | `storybook build -o ./dist/storybook --docs`                                                                  |
| `apps/chart-docsite`                                               | `apps/chart-docsite/package.json`                                        | charts docs                                     | `storybook build -o ./dist/storybook --docs`                                                                  |
| 66 per-component `packages/react-components/*/stories/.storybook/` | e.g. `packages/react-components/react-button/stories/.storybook/main.js` | single-component dev loop                       | _(no build target; `storybook` dev target only)_                                                              |

Counts from `find packages/react-components -type d -name ".storybook" -not -path "*/node_modules/*" | wc -l` → **69** (66 under `*/stories/`).

### 1.2 Commands and measured cost

**VR Storybook — the one that works.**

```
yarn nx run vr-tests-react-components:build-storybook          # static build
yarn workspace @fluentui/vr-tests-react-components start       # dev server (storybook dev)
```

Measured: `time yarn nx run vr-tests-react-components:build-storybook --skip-nx-cache` → **1m23.199s real**, 29 dependent nx tasks + webpack, **35 MB** output in `apps/vr-tests-react-components/dist/storybook`. It is deliberately lean — `apps/vr-tests-react-components/.storybook/main.js` sets `typescript.reactDocgen: false` ("disable react-docgen-typescript … slows things down a lot") and `builder.lazyCompilation: false`, and it does **not** extend the root `.storybook/main.js`.

**Docs site — currently broken on Windows.**

```
yarn nx run public-docsite-v9:build-storybook
```

Measured: **2m0.086s, exit 1**, `grep -c "Module build failed" .scratch/docsite-build.log` → **862**. Every `*.stories.tsx` fails:

```
TypeError: .\src\AccessibilityScenarios\Accordion.stories.tsx: Cannot convert undefined or null to object
    at Function.keys (<anonymous>)
    at PluginPass.pre (packages/react-components/babel-preset-storybook-full-source/src/modifyImports.ts:32:29)
```

Root cause, confirmed by direct test: `packages/react-components/react-storybook-addon-export-to-sandbox/src/webpack.ts:19` declares

```ts
const addonFilePattern = /react-storybook-addon-export-to-sandbox\/[a-z/]+.[jt]s$/;
```

but `loadWorkspaceAddon` (`scripts/storybook/src/utils.js:81,160`) returns `path.join(packageRootPath, 'temp', 'preset.ts')` — a **backslash** path on Windows. `getAddonOptions` therefore returns `{}`, `importMappings` is `undefined`, and `modifyImports.ts:32` calls `Object.keys(undefined)`. Verified:

```
preset name as generated: C:\...\react-storybook-addon-export-to-sandbox\temp\preset.ts
regex matches? false      posix form matches? true
```

The same failure hits `public-docsite-v9-headless` (`time yarn nx run public-docsite-v9-headless:build-storybook` → **35.806s, exit 1, 156 errors**) and, by inheritance from `.storybook/main.js` (which registers the addon at line 44), every per-component `stories/.storybook` dev server and `chart-docsite`.

**Dev servers.** `apps/public-docsite-v9/package.json` → `storybook dev --port 3000`; per-component ones are nx-inferred by `tools/workspace-plugin/src/plugins/workspace-plugin.ts:650` (`storybook dev`, no fixed port). `.agents/skills/visual-test/SKILL.md` documents the port-discovery dance (Storybook picks a random high port; two listening sockets, pick by `Content-Type: text/html`).

---

## 2. How VR tests enumerate states, themes, RTL — and whether it runs locally

### 2.1 Runner: StoryWright (not Screener/Chromatic)

`apps/vr-tests-react-components/package.json`:

```
"test-vr": "yarn run -T storywright --browsers chromium --url dist/storybook --destpath dist/screenshots --waitTimeScreenshot 500 --concurrency 4 --headless true --bailOnStoriesError --stepsApi parameters"
```

`node_modules/storywright/package.json` → `storywright@0.0.27-storybook7.14`, deps `playwright ^1.34.3`. nx wires `test-vr` → `dependsOn: ["build-storybook"]` (`nx.json:54`).

**Enumeration** (`node_modules/storywright/src/StoryWrightProcessor/GetStoriesV2.js`): reads `window.__STORYBOOK_PREVIEW__.extract()` from the static `iframe.html`, then pulls `story.parameters.storyWright.steps`. Fallback path reads `stories.json` (steps not processed). Stories tagged `no-screenshot` are skipped (`StoryWrightProcessor.ts`, `tags.includes("no-screenshot")` — grep finds **zero** uses in this repo).

**Per-story browser setup** (`StoryWrightProcessor.ts`): fresh `BrowserContext` per story, viewport hard-coded `1920 × 964`, plus an init script injecting

```css
* {
  caret-color: transparent !important;
}
* > * {
  transition-duration: 0ms !important;
  animation-duration: 0ms !important;
}
```

Verified: the PNGs I captured are exactly `1920 × 964`.

**Steps API** (`node_modules/storywright/src/StoryWright/Steps.ts`): `snapshot(name, {cropTo})`, `click`, `hover`, `mouseDown`, `mouseUp`, `focus`, `keys`, `setValue`, `clearValue`, `executeScript`, `wait(ms|selector)`, `waitForNotFound`, `cssAnimations`, `url`, `end`. `cropTo` switches to `elementScreenshot` instead of full-page.

Usage across `apps/vr-tests-react-components/src` (`grep -rhoE "\.(snapshot|hover|click|…)\(" | sort | uniq -c`):

```
230 .snapshot(   135 .end(     55 .hover(   34 .click(   27 .mouseDown(
 18 .wait(        18 .focus(   15 .executeScript(  10 .mouseUp(   4 .keys(
```

Canonical hover/press pattern — `apps/vr-tests-react-components/src/stories/Button/utils.ts`:

```ts
export const steps = new Steps()
  .snapshot('default')
  .hover('#button-id')
  .snapshot('hover')
  .mouseDown('#button-id')
  .snapshot('pressed')
  .end();
```

Stories with **no** steps get exactly one full-page screenshot (`PlayWrightExecutor.processStory`, line 169). 16 of 137 story files declare no `storyWright` parameter.

### 2.2 Themes / RTL / high contrast

Two independent mechanisms:

**(a) Explicit per-story variants** — `apps/vr-tests-react-components/src/utilities/getStoryVariant.tsx` clones a story, sets `parameters.{theme,dir,mode:'vr-test'}`, appends a decorator wrapping in `<FluentProvider applyStylesToPortals={false} theme dir>`. Map: `RTL → webLightTheme + dir:rtl`, `DARK_MODE → webDarkTheme`, `HIGH_CONTRAST → teamsHighContrastTheme`. Only 3 of the 7 available themes are exercised.

From the built `index.json` (`apps/vr-tests-react-components/dist/storybook/index.json`):

```
entries: 1578 (all type "story"), distinct titles: 107
ids containing rtl: 256 | dark-mode: 260 | high-contrast: 240  → 756 variants
base (non-variant) stories: 822
```

**(b) Storybook globals via the addon** — `packages/react-components/react-storybook-addon/src/preset/preview.ts` sets `initialGlobals = { THEME_ID: undefined, DIR_ID: undefined, STRICT_MODE_ID: undefined }` with the comment _"allow theme to be set by URL query param"_. `decorators/withFluentProvider.tsx` resolves `parameters.dir ?? globals[DIR_ID]` and `parameters.fluentTheme ?? globals[THEME_ID]` against 7 themes (`src/theme.ts`: web-light/dark, teams-light/dark, teams-light-v21, teams-dark-v21, teams-high-contrast). Constants in `src/constants.ts`: `storybook_fluentui-react-addon_theme` / `_dir`.

**I verified (b) works against a static build with zero source edits** (`.scratch/globals-probe.js`, Playwright + route interception):

```
globals=(none)                                                      → bg rgb(255,255,255) dir ltr
globals=…_theme:web-dark                                            → bg rgb(41,41,41)    dir ltr
globals=…_theme:teams-high-contrast;…_dir:rtl                       → bg rgb(0,0,0)       dir rtl
```

This is the key lever for a themes × RTL matrix harness: `iframe.html?id=<storyId>&viewMode=story&globals=storybook_fluentui-react-addon_theme:<id>;storybook_fluentui-react-addon_dir:<ltr|rtl>`. It works only where the story does not pin `parameters.fluentTheme`/`parameters.dir` — i.e. it works fully for docs stories, and for the 822 base VR stories, but the 756 explicit VR variants pin `parameters.theme` and nest their own provider.

`apps/vr-tests-react-components/.storybook/preview.js` sets `layout:'none'`, `mode:'vr-test'` (strips the addon's 48px/24px padded `FluentExampleContainer`) and disables the `AriaLive` decorator.

### 2.3 Local vs cloud — capture is local, diff is cloud

**Capture is 100% local.** `PlayWrightExecutor.makeScreenshot` → `page.screenshot({path})`. Naming (`getScreenshotPath`, line 372): `{destpath}/{kind}.{storyName}.{stepName}.{browser}.png`, with `/ \ : = " < >` sanitized and non-ASCII stripped, `_N` suffix on collision.

**Proven end-to-end on this machine.** Scoped to Button via `--excludePatterns "^(?!Button Converged\.)"`:

```
time yarn run -T storywright --browsers chromium --url dist/storybook --destpath .scratch-shots \
  --waitTimeScreenshot 500 --concurrency 4 --headless true --stepsApi parameters \
  --excludePatterns "^(?!Button Converged\.)"
→ StoryWright took 83 secs · real 1m25.017s · 129 PNGs · 1.6 MB
```

(43 `Button Converged` stories × 3 snapshots = 129; StoryWright's own log confirmed `story:N/1578`.)

**Prerequisite gotcha:** the first attempt produced **zero** screenshots and still exited 0:

```
** ERROR ** Error: browserType.launch: Executable doesn't exist at …chromium_headless_shell-1194\…
```

`playwright-core/browsers.json` pins `chromium-headless-shell@1194`; only rev 1228 was present. `yarn playwright install chromium` (10.2s) fixed it. Note the silent exit-0 — `--bailOnStoriesError` only guards per-story failures, not browser launch.

**Diff is cloud-gated.** `.github/workflows/pr-vrt.yml` runs `yarn nx affected -t test-vr --nxBail` on `macos-14-xlarge`, `timeout-minutes: 60`, then `.github/scripts/prepare-vr-screenshots-for-upload.js` collates `dist/screenshots` for `['vr-tests-web-components','vr-tests-react-components','vr-tests']` into an artifact. `.github/workflows/pr-vrt-comment.yml` (separate `workflow_run` job) does `azure/login` then:

```
npx vr-approval-cli@0.5.1 run-diff --screenshotsDirectory ./screenshots --buildType pr \
  --ciDefinitionId 'vrt-baseline.yml' --clientType FLUENTUI --locationPrefix 'fluentui-github' \
  --locationPostfix 'vrscreenshots-github' --threshold '0.04' --pipelineId '301' --cumThreshold '1'
```

Requires `AZURE_VRT_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_SUBSCRIPTION_ID`. Baseline is pushed by `.github/workflows/vrt-baseline.yml` on master. `.github/actions/run-publish-vr-screenshot/action.yml` is the older v8 path — its diff steps are entirely commented out with `@TODO`s. No Screener, no Chromatic anywhere.

**Local fallback already exists in-repo and is unwired.** `tools/visual-regression-assert` (`@fluentui/visual-regression-assert`, `tools/visual-regression-assert/package.json`) — pixelmatch 7 + pngjs, CLI with `assert` / `report` / `update-baseline`, EJS HTML + Markdown + JSON reporters (`src/reporters.ts`, `src/template/`). `src/assert.ts:36` uses `pixelmatch(..., { threshold: 0.1 })` and separately flags `dimensions-diff`, `add` (new snapshot) and `remove` (deleted snapshot). `git log` shows it landed in #34024 / #34076, but `grep -rn "visual-regression-assert"` across all `package.json` / `project.json` / `*.yml` outside its own folder returns **nothing** — only a `tsconfig.base.json:217` path alias and a CODEOWNERS entry. It has zero consumers.

**I built and ran it** (`yarn nx run visual-regression-assert:build`, then `assert --baselineDir … --outputPath …` over my 129 Button PNGs with one baseline hand-perturbed by 100 pixels):

```
┌───────────────────────────────────────────────┬───────────┬──────────────────┐
│ Button Converged.Default.default.chromium.png │ ❌ Failed │ Diff pixels: 100 │
└───────────────────────────────────────────────┴───────────┴──────────────────┘
JSON/HTML/Markdown reports generated
🚨 Snapshots changed! Please Review VR Report 🚨
```

128 identical files passed. This is a working, offline baseline↔actual differ.

---

## 3. Story counts: VR vs docs

**VR (`apps/vr-tests-react-components`)** — authoritative, from the built index:

- **1578 stories**, 107 titles, 137 `*.stories.tsx` files.
- Screenshot volume estimate: **~4368** (upper bound; script summed `.snapshot(` calls per file × exports per file — some files declare several Steps chains, so this over-counts). Direct evidence: Button = 43 stories → 129 PNGs (×3).

Top VR groups (from `index.json`): Drawer 76, Dialog 63, InteractionTag 52, Tag 51, Positioning 50, Tree 48, SpinButton 47, SplitButton 44, Button 43, Table-flex 43, Table-table 43, TabList 38, Radio 32, TagPicker 32, Field 30.

**Docs (`packages/react-components/*/stories/`)** — the docsite only globs `**/@(index.stories.@(ts|tsx)|*.mdx)` (`scripts/storybook/src/utils.js:258`), so leaf `*.stories.tsx` files are not indexed directly; `index.stories.tsx` re-exports them.

```
find packages/react-components -name "index.stories.tsx" | wc -l                  → 163
… | xargs grep -hoE "^export \{[^}]*\}" | grep -oE "[A-Za-z0-9_]+" | wc -l        → 854 re-exports
… | xargs grep -hoE "^export const [A-Za-z0-9_]+" | wc -l                         →  26 direct
```

→ **~880 docsite-indexed stories** across 67 `stories/` dirs, plus 24 `.mdx` files in packages and 179 story/mdx files under `apps/public-docsite-v9/src`.

**VR covers far more states.** Per-package comparison (docs count from `index.stories.tsx` exports; VR count from `index.json`):

| Component               | docs stories | VR stories         | VR shots (×snapshots) |
| ----------------------- | ------------ | ------------------ | --------------------- |
| Button (all 5 variants) | 44           | 159 across 6 files | ~477                  |
| Table                   | 38           | 86 (flex + table)  | —                     |
| Menu                    | 34           | 36                 | —                     |
| Tags/InteractionTag     | 27           | 103                | —                     |
| Drawer                  | 20           | 76                 | —                     |
| Dialog                  | 18           | 63                 | —                     |
| Card                    | 13           | 55                 | —                     |
| Checkbox                | 9            | 26                 | —                     |

Docs stories are single-state prop showcases (`packages/react-components/react-button/stories/src/Button/ButtonDefault.stories.tsx` is one line). VR stories are exhaustive prop-cross-products **plus** three interaction states per story (default/hover/pressed) **plus** three theme/dir variants. **1578 VR stories vs ~880 docs stories, and VR alone captures hover/pressed/focus.** Docs stories have zero interaction coverage and zero built-in theme matrix (theme is a manual toolbar toggle).

---

## 4. Cleanest harness to build

### 4.1 Which app to piggyback on

**`apps/vr-tests-react-components` — unambiguously.** Reasons:

1. It is the **only** Storybook that builds on Windows (§1.2). The docsite path is blocked by the export-to-sandbox regex bug.
2. Its `main.js` does not inherit the root `.storybook/main.js`, so it carries no `addon-docs`, no `addon-a11y`, no export-to-sandbox, no `previewHead` iframe-resizer (`.storybook/preview-head-template.html`, 657 lines).
3. `reactDocgen: false` and `lazyCompilation: false` → 1m23s builds.
4. `mode: 'vr-test'` already strips decorative padding/background.
5. It already has the interaction-state coverage (§3) that docs stories lack.
6. Its `test-vr` output naming and `dist/screenshots` layout already match `visual-regression-assert`'s `--baselineDir` / actual-dir contract.

Assemble the loop as:

```
yarn nx run vr-tests-react-components:build-storybook
yarn workspace @fluentui/vr-tests-react-components test-vr        # → dist/screenshots/*.png
node tools/visual-regression-assert/bin/visual-regression-assert.js assert \
  --baselineDir src/__snapshots__ --outputPath dist/vrt
```

Baseline capture on `master` (pre-conversion), then re-run per converted package and diff. `visual-regression-assert` already exits 1 on any diff and emits an HTML report with baseline/actual/diff triptychs.

**Enumeration source:** prefer `dist/storybook/index.json` (`{"v":5,"entries":{id:{type,id,name,title,importPath,tags}}}`) over `__STORYBOOK_PREVIEW__.extract()` — it's a static file, 1578 entries, no browser needed. For a themes × RTL matrix on top, drive `iframe.html?id=<id>&viewMode=story&globals=storybook_fluentui-react-addon_theme:<t>;storybook_fluentui-react-addon_dir:<d>` (verified working, §2.2) and reuse StoryWright's file-route trick (`page.route('https://stories/**')` → `route.fulfill({path})`) so no HTTP server is needed. Replicate its determinism settings: viewport 1920×964, `caret-color: transparent`, zero transition/animation duration.

### 4.2 Webpack changes for CSS Modules + Tailwind v4

**CSS Modules: nearly free.** The Storybook 9 webpack5 builder registers an implicit rule (`node_modules/@storybook/builder-webpack5/dist/presets/custom-webpack-preset.js`):

```js
{ test: /\.css$/, sideEffects: true, use: [style-loader, { loader: css-loader, options: { importLoaders: 1 } }] }
```

Confirmed present in the VR build log: `info => Using implicit CSS loaders`. The bundled `css-loader` is **6.11.0** (`node_modules/@storybook/builder-webpack5/node_modules/css-loader`), and in `dist/utils.js:452-454` `modules === undefined` → `auto = true` with `IS_MODULES = /\.module(s)?\.\w+$/i`. **`*.module.css` therefore already works with no config change** — only the class-name readability differs.

`packages/react-components/react-headless-components-preview/stories/.storybook/css-modules-webpack.js` exists precisely to add readability. It locates the built-in rule by `rule.test.source === /\.css$/.source`, finds the `css-loader` entry, and sets:

```js
loader.options = { ...loader.options, modules: { auto: true, localIdentName: '[name]__[local]--[hash:base64:5]' } };
```

It throws a descriptive error if Storybook's internals change. It is consumed by `packages/react-components/react-headless-components-preview/stories/.storybook/main.js` and inherited by `apps/public-docsite-v9-headless/.storybook/main.js`.

Minimal change to `apps/vr-tests-react-components/.storybook/main.js`:

```js
const { registerCssModuleRules } = require('../../../packages/react-components/react-headless-components-preview/stories/.storybook/css-modules-webpack');
// …
webpackFinal(config) {
  registerTsPaths({ config, configFile: tsConfigPath });
  registerRules({ config, rules: [rules.swcRule, rules.griffelRule] });  // griffelRule can stay during hybrid phase
  registerCssModuleRules({ config });
  return config;
}
```

That helper should probably be hoisted into `scripts/storybook/src/rules.js` (alongside `swcRule`/`griffelRule`/`scssRule`/`cssRule`) rather than reached across from a preview package.

**Tailwind v4: needs new dependencies — none exist today.** `grep -rn "tailwind" --include=package.json` outside `node_modules` returns **zero hits**. The only Tailwind artifact in the repo is `apps/public-docsite-v9-headless/.storybook/tailwind-sandbox-template.js`, which injects `tailwindcss: '^4.0.0'` + `@tailwindcss/vite: '^4.0.0'` into StackBlitz **export** sandboxes — it never touches the Storybook build. Note it uses the Vite plugin, not the PostCSS plugin; the Storybook builder here is webpack5, so you need `@tailwindcss/postcss` + a `postcss-loader` in the `.css` chain. Root `package.json` has `postcss 8.5.10` but `postcss-loader 4.1.0` (a 2020-era version, present only for the v8 `scssRule`) — plan on adding `postcss-loader@^8`.

Do **not** add `@storybook/addon-postcss`: `custom-webpack-preset.js` checks `hasPostcssAddon` and, if present, emits `cssLoaders = {}` — the implicit `.css$` rule disappears and `registerCssModuleRules` throws. Insert `postcss-loader` into the existing rule's `use` array (and bump `importLoaders`) instead.

**The `--base-scale` token.** `packages/react-components/react-headless-components-preview/stories/.storybook/tokens.css` (5.6 KB) is the existing precedent for a design-token stylesheet imported once from `preview.js`; `apps/public-docsite-v9-headless/.storybook/preview-head.html` documents why tokens go through `preview.js` (webpack) rather than raw `<link>` tags. Follow that shape for the Tailwind `@theme` block.

---

## 5. Jest snapshots that assert class names

### 5.1 Today: no Griffel hashes leak — because a serializer strips them

```
find packages/react-components -name "*.snap" -not -path "*/node_modules/*" | wc -l   → 141
grep -rhoE "^exports\[\`" packages/react-components --include="*.snap" | wc -l        → 196 entries
grep -rl "class=" packages/react-components --include="*.snap" | wc -l                → 126 files
grep -rl 'class="[^"]*\bf[a-z0-9]\{5,\}' packages/react-components --include="*.snap" → 0
```

Snapshots hold only static `fui-*` names:

```
packages/react-components/react-badge/library/src/components/Badge/__snapshots__/Badge.test.tsx.snap
  <div class="fui-Badge">Default Badge</div>
```

`grep -rhoE 'class="[^"]*"' … --include="*.snap" | sort -u` shows exclusively `fui-*` tokens (`fui-Button fui-ToggleButton`, `fui-CardHeader__description`, …) plus `fui-FluentProvider1`.

The reason is `snapshotSerializers: ['@griffel/jest-serializer']` — present in **73** of 118 `jest.config.js` under `packages/`. `node_modules/@griffel/jest-serializer/src/index.js` reads `DEFINITION_LOOKUP_TABLE` / `DEBUG_RESET_CLASSES` from `@griffel/core` and regex-strips every class Griffel generated. Its `test(val)` returns true only when a token is in Griffel's runtime tables.

**Consequence of the migration:** once a component's classes come from a CSS Module rather than Griffel, `test()` returns false, nothing is stripped, and the css-loader-generated hash lands in the snapshot. Every re-render then produces a diff on any CSS edit — exactly the fragility the serializer was written to prevent. **126 `.snap` files are exposed.** Mitigations: a replacement serializer keyed on the `localIdentName` pattern, or `localIdentName: '[local]'` under `NODE_ENV=test`.

Only `packages/react-components/react-aria/library` among v9 packages has `.snap` files without the serializer (its snapshots contain no Griffel styles). The rest of the serializer-less list is v8/charts: `packages/react`, `packages/react-cards`, `packages/react-experiments`, `packages/react-focus`, `packages/charts/react-charting`, `packages/foundation-legacy`, `packages/theme`, `packages/utilities`, `packages/date-time-utilities`, `packages/react-monaco-editor`, `packages/jest-serializer-merge-styles`.

### 5.2 The bigger breakage: the Griffel conformance test

`packages/react-components/react-conformance-griffel/src/overridesWin.ts` registers the `make-styles-overrides-win` test, which does:

```ts
const mergeClasses = jest.fn().mockImplementation(() => '');
jest.mock('@griffel/react', () => ({ ...jest.requireActual('@griffel/react'), mergeClasses }));
…
expect(mergeClasses.mock.calls).toContainClassNameLastInCalls(className);
expect(mergeClasses.mock.calls).toHaveMergeClassesCalledTimesWithClassName(className, callCount ?? 1);
```

It asserts the consumer's `className` is passed **last** to `mergeClasses`. Wiring:

```
grep -rln "react-conformance-griffel" packages/react-components --include="isConformant.ts" | wc -l  → 57
grep -rln "isConformant(" packages/react-components --include="*.test.tsx" | wc -l                   → 243
```

Every converted component that stops calling `@griffel/react`'s `mergeClasses` fails this test — the mock records zero calls and `expect(mergeClasses.mock.calls.length).toBeGreaterThanOrEqual(1)` throws. A `clsx`/`cx`-equivalent conformance test will be needed, or `extraTests` must be swapped per-package in each `*/src/testing/isConformant.ts`.

### 5.3 Other class assertions

```
grep -rn "toHaveClass" packages/react-components --include="*.test.tsx" | wc -l        → 7
grep -rn "getAttribute('class')|\.className" packages/react-components --include="*.test.tsx" | wc -l → 29
grep -rn "toHaveClass" packages/react-components --include="*.cy.tsx" | wc -l          → 0
```

Only 7 test files import `@griffel/*` directly: `react-accordion/useAccordion.test.tsx`, `react-button/useButton.test.tsx`, `react-dialog/Dialog.test.tsx`, `react-tabs/useTabList.test.tsx`, `react-provider/FluentProvider-node.test.tsx`, and the two conformance matcher tests. 2 Cypress specs import `@griffel/*`.

### 5.4 The VR test app itself uses Griffel

26 files under `apps/vr-tests-react-components/src` import `@griffel/react` (`Button/utils.ts`, `Positioning/utils.tsx`, `Slider/utils.ts`, plus whole story files: `MakeStyles/MakeStyles.stories.tsx`, `MakeStyles/MakeStylesPseudo.stories.tsx`, `CustomStyleHooks.stories.tsx`, `ShadowDOM/*`, …). `MakeStyles`, `MakeStylesPseudo` and `CustomStyleHooks` (11 stories total) are tests _of Griffel itself_ — they have no CSS-Modules equivalent and will need deletion or wholesale rewrite. `apps/vr-tests-react-components/package.json` also declares `@griffel/react` as a direct dependency, and `.storybook/main.js` registers `rules.griffelRule` (`@griffel/webpack-loader`).

## 6. rit-tests-v9 and Playwright configs (not VR)

`apps/rit-tests-v9` is **React major-version integration testing**, not visual. `apps/rit-tests-v9/rit.config.js` runs type-checks against React 17/18/19 (`tsconfig.r17/r18/r19.json`); `src/react-19/components/Tooltip.cy.tsx` is the only runtime test (Cypress). Its `project.json` has `targets: {}`.

Only three Playwright configs exist and none do image diffing: `packages/web-components/playwright.config.ts` (CSR×SSR × chromium/firefox/webkit, `@microsoft/fast-test-harness`), `packages/charts/chart-web-components/playwright.config.ts`, `packages/tokens/playwright.config.ts` (`baseURL: http://localhost:6006`, 1280×720). `grep -rn "toHaveScreenshot|toMatchImageSnapshot"` outside `node_modules` → zero. Playwright's own screenshot-assertion feature is unused.

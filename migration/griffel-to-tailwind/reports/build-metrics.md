# Research: build-metrics

_Generated 2026-07-26 by research workflow wf_7f8b1226-35f (research agents; verify against source before acting on stale claims)._

## Summary

Fluent UI v9 builds through Nx 21.6.10 with a custom inference plugin (`tools/workspace-plugin/src/plugins/workspace-plugin.ts`) whose `build` target is transpile-only: SWC emits per-file ESM (`lib/`) + CJS (`lib-commonjs/`), api-extractor rolls up `dist/*.d.ts`, and there is no bundling. Griffel AOT **is** in the build — every package with `src/**/*.styles.ts` gets a Babel pass with `@griffel/babel-preset` over `lib/**/*.styles.js`, and CJS is then transpiled from the AOT'd ESM, not from source. Bundle size is measured by monosize 0.9.0 over 235 checked-in webpack fixtures (60 nx projects); it measures the built `lib/` artifact (verified: AOT class `r1f29ykk` appears in the fixture bundle) and today counts only `js` assets because the repo's `monosize.config.mjs` omits `assetTypes`. The single largest migration-relevant fact: 46.2% of the minified `react-button` Button fixture bundle and 27.4% of the `@fluentui/react-components` "entire library" bundle is literal CSS text embedded in JS strings — that payload is exactly what moves from the JS column to a CSS column after migration, so the report must compare JS+CSS totals, not JS alone.

## Key facts

- Build is transpile-only, no bundling: `@fluentui/workspace-plugin:build` runs SWC per-file to `lib/` (es6) and `lib-commonjs/` (commonjs), plus api-extractor for `dist/index.d.ts` + `etc/<pkg>.api.md` — target defined at tools/workspace-plugin/src/plugins/workspace-plugin.ts:224-262, executor at tools/workspace-plugin/src/executors/build/executor.ts
- Griffel AOT IS in the build. `tools/workspace-plugin/src/executors/build/lib/babel.ts:26-29` triggers the AOT path whenever `src/**/*.styles.ts` exists; Babel with `@griffel/babel-preset@1.5.8` rewrites `lib/**/*.styles.js` in place, and CJS is then transpiled FROM `lib/` (babel.ts:66-68), not from src
- Babel chain: packages/react-components/react-button/library/.babelrc.json -> .babelrc-v9.json -> scripts/babel/src/preset-v9.js (registers `@griffel` preset with modules @griffel/core, @griffel/react, @fluentui/react-components). 89 package-level .babelrc.json files (`find packages -name .babelrc.json -not -path '*/node_modules/*' | wc -l`)
- `enableGriffelRawStyles: true` also emits a parallel `*.styles.raw.js` per style module (build/lib/babel.ts createStyleRawOutput). Repo-wide these are 719,570 B = 15.2% of shipped lib/ JS and are imported by nothing outside the build executor's own source — pure dead weight in every npm tarball
- Measured cold build times (Windows, nx parallel=3, --skip-nx-cache): react-button:build = 25.9s (+12 dep tasks); react-components:build = 1m56.4s (+70 dep tasks); `nx run-many -t build --projects=tag:vNext` = 3m04.9s for 91 projects (+19 deps)
- Per-package build timings are already instrumented: `NX_VERBOSE_LOGGING=true npx nx run <p>:build --skip-nx-cache 2>&1 | grep 'Execution Timings'` prints `BuildExecutor (X s)` and `GenerateApiExecutor (X s)` (tools/workspace-plugin/src/utils.ts:284-291). No project name on the line — correlate with the preceding `> nx run <p>:build` header
- The tag:vNext build log shows 62 packages running Griffel AOT over 277 `*.styles.js` files — a single grep that should go to zero after migration (`grep -o 'Processing griffel AOT with babel: [0-9]* files' build.log`)
- monosize 0.9.0 / monosize-bundler-webpack 0.4.0 / monosize-storage-git 0.3.4. Config: monosize.config.mjs (root) + one override at packages/react-components/global-context/monosize.config.mjs. 60 nx projects have a `bundle-size` target; 235 `*.fixture.js` files repo-wide, 99 under packages/react-components
- monosize measures raw byte length + gzipSync length of every file in the fixture's output dir (non-recursive) whose extension is in `assetTypes`; default is `['js']` and the repo does NOT set it (node_modules/monosize/dist/utils/readConfig.mjs: KNOWN_ASSET_TYPES = ['js','json','css'], DEFAULT_ASSET_TYPES = ['js']). Output: `<projectRoot>/dist/bundle-size/monosize.json` with a per-extension `assets` map
- monosize measures the BUILT artifact, not source: its webpack config has no tsconfig-paths plugin, `bundle-size` dependsOn `build` (nx.json targetDefaults), and the AOT-only hashed class `r1f29ykk` from lib/components/Button/useButtonStyles.styles.js is present in dist/bundle-size/Button.output/index.js
- PROVEN: monosize's webpack config cannot bundle CSS today — both `import './a.css'` and `import s from './b.module.css'` fail with `Module parse failed: Unexpected token (1:0) ... no loaders are configured`. mini-css-extract-plugin is not installed (`ls node_modules/mini-css-extract-plugin` -> no such file)
- PROVEN fix with zero new deps: webpack 5.108.4 `experiments: { css: true }` + `output.cssFilename` emits `index.css` beside `index.js` in the same dir monosize scans — probe output: `plain: OK emitted [index.css=24B, index.js=44B]`, `module: OK emitted [index.css=26B, index.js=215B]`
- Griffel runtime floor in a consumer bundle (monosize webpack settings, React external): `__styles` from @griffel/react = 4,326 B min / 1,856 B gzip; `makeStyles` (non-AOT) = 35,711 B / 12,712 B; `__styles` from @griffel/core = 1,706 B / 818 B; FluentProvider = 18,908 B / 7,269 B
- CSS-in-JS payload sits in JS string literals: 46.2% of the minified react-button Button fixture (15,092 of 32,675 B) and 27.4% of the `react-components` entire-library fixture (354,320 of 1,294,729 B) is literal CSS text. Repo-wide, AOT `*.styles.js` are 25.7% of importable lib/ JS, and 39.0% of those bytes are CSS text
- gzip does not decompose: Button = 6,051 (JS-only) + 2,776 (CSS-only) vs 8,499 combined; entire library = 266,760 + 50,785 vs 326,152 combined. Never derive a gzip saving by subtraction
- IN-REPO PRECEDENT for shipping CSS from a v9 package (option b): `@fluentui/react-storybook-addon` — src/styles.css copied via build `assets` (project.json:31-38) to dist/styles.css, `files` includes `dist/styles.css`, `exports['./styles.css'] = './dist/styles.css'`, `sideEffects: ['./dist/styles.css']`, documented as `import '@fluentui/react-storybook-addon/styles.css'` (README.md:47). Same pattern in react-storybook-addon-export-to-sandbox
- react-theme-sass is the other precedent but is NOT built: `style: 'sass/tokens.scss'` + `files: [... 'sass']`, and `git ls-files packages/react-components/react-theme-sass/sass` shows the .scss files are hand-committed
- CSS Modules already ship in-repo only in stories: packages/react-components/react-headless-components-preview/stories/src/\*_/_.module.css (40+ files with variant classes, [data-disabled] selectors, var(--token)). The library package itself ships pure JS (files: ['*.md','dist/*.d.ts','lib','lib-commonjs'], sideEffects: false)
- Existing CSS-Modules plumbing: typings/static-assets/index.d.ts declares `*.module.css` ONLY (no plain `*.css`); packages/react-components/react-headless-components-preview/stories/.storybook/css-modules-webpack.js patches Storybook 9's implicit `/\.css$/` rule with `modules: {auto:true, localIdentName:'[name]__[local]--[hash:base64:5]'}`; scripts/test-ssr/src/utils/esbuild-plugin.ts `cssModulesShimPlugin()` shims `/\.module\.css$/` with an identity Proxy
- Storybook builds from TS SOURCE with RUNTIME Griffel, not AOT: root .storybook/main.js calls registerTsPaths(tsconfig.base.json) whose 167 aliases all point at `src/index.ts`, and scripts/storybook/src/loaders/custom-loader.js explicitly strips the `@griffel` and `@fluentui/scripts-babel/preset-v9` presets. Only apps/vr-tests-react-components/.storybook/main.js:28 uses `rules.griffelRule` (@griffel/webpack-loader)
- `public-docsite-v9:build-storybook` FAILS on this checkout: 861 errors `Cannot convert undefined or null to object` at packages/react-components/babel-preset-storybook-full-source/src/modifyImports.ts:32 (`Object.keys(importMappings)` with importMappings undefined). Root cause is consistent with the Windows path-separator miss in `addonFilePattern = /react-storybook-addon-export-to-sandbox\/[a-z/]+.[jt]s$/` at react-storybook-addon-export-to-sandbox/src/webpack.ts:19. CI runs macos-14-xlarge and is unaffected
- nx caching bug: nx.json targetDefaults['build-storybook'].outputs = '{projectRoot}/dist/storybook' but apps/public-docsite-v9/package.json's script writes to './dist/react'. Only the separate `build-storybook:docsite` target declares the correct output
- `monosize compare-reports` cannot run offline: monosize-storage-git/dist/index.mjs:15-18 throws without GITHUB_TOKEN, and the base report exists only as a GitHub Actions artifact from .github/workflows/bundle-size-base.yml. Local A/B must snapshot `packages/**/dist/bundle-size/monosize.json` (collectLocalReport's default glob) or supply a ~15-line filesystem StorageAdapter
- Zero jest configs handle CSS: `grep -rn 'identity-obj-proxy|\.css' --include=jest.config.js packages apps` returns nothing, and jest.preset.js only maps tsconfig paths + React deps. 73 jest.config.js files also register `@griffel/jest-serializer`
- `verify-packaging` is currently a no-op: tools/workspace-plugin/src/executors/verify-packaging/executor.ts:33-37 returns true unless the project has tag `npm:public`, and zero project.json files carry that tag. The target is also only enabled for react-text and react-components (nx.json plugin verifyPackaging.include)
- npm install size baseline: `npm pack --dry-run --json` in packages/react-components/react-button/library -> 185 files, 124,354 B packed, 1,050,635 B unpacked
- Design tokens are already CSS custom properties and are Griffel-independent: packages/tokens/src/tokens.ts maps 467 token names to `var(--tokenName)` strings; FluentProvider writes the theme via a runtime <style> tag (react-provider/library/src/components/FluentProvider/useFluentProviderThemeStyleTag.ts)
- An accepted RFC already targets removing AOT: docs/react-v9/contributing/rfcs/shared/build-system/stop-styles-transforms.md picks 'Option A: Stop pre-processing styles' and explicitly rejects 'Option B: ship both outputs' as harder to maintain with increased install size — evidence against the 'precompiled + also ship sources' shipping option

## Risks

- Jest is an unhandled hard blocker: no jest.config.js in the repo has a CSS moduleNameMapper (verified zero hits), so the first library `src` file that imports a `.css`/`.module.css` breaks every unit test in that package. jest.preset.js must be updated repo-wide BEFORE the first component migrates.
- SSR harness renders CSS via Griffel only. scripts/test-ssr/src/utils/renderToHTML.ts builds <head> exclusively from `renderToStyleElements(renderer)`; with CSS Modules there is no renderer, and the esbuild-emitted .css is never linked. SSR pages would render unstyled. Additionally scripts/test-ssr/src/commands/main.ts turns ANY console.error/warn into a test failure, so loader warnings fail the suite.
- The SSR css-modules shim returns unhashed class names (`key => key`), so SSR and client class names diverge from webpack's hashed output. If the migration relies on hashed locals, the shim must be replaced with a real transform or hydration/class assertions become meaningless.
- monosize measures zero CSS today (assetTypes defaults to ['js']) AND its webpack config cannot even parse a .css import (proven). Without adding `assetTypes: ['js','css']` plus `experiments.css` + `output.cssFilename` to monosize.config.mjs, every post-migration bundle-size number will be a fabricated ~40% 'win' that simply stopped counting the CSS.
- gzip is not additive across the JS/CSS split (measured: splitting costs 3.9% on the Button fixture, saves 2.6% on the entire-library fixture). Any headline number derived by subtracting a CSS gzip from a JS gzip is wrong. Report combined JS+CSS gzip as the primary metric.
- Storybook and monosize measure different artifacts — Storybook builds TS source with runtime Griffel (`makeStyles`, 35.7 kB min floor), monosize builds AOT'd lib/ (`__styles`, 4.3 kB min floor). Cross-comparing their deltas will produce contradictory conclusions.
- public-docsite-v9 and public-docsite-v9-headless `build-storybook` both fail on this Windows checkout (861 / N Babel errors from babel-preset-storybook-full-source modifyImports.ts:32). Storybook-based client-bundle metrics are unobtainable locally until that is fixed or measured on macOS/Linux.
- Every v9 component package is `sideEffects: false`. Any CSS shipping mechanism that relies on a bare `import './x.css'` inside component JS risks bundlers dropping the import. Changing sideEffects to an allowlist across 60+ packages is exactly the kind of change that silently regresses tree-shaking, and there is no in-repo test that would catch it.
- `verify-packaging` cannot enforce correct CSS packaging: it short-circuits to success for every project because no project.json carries the `npm:public` tag, and it only runs for react-text and react-components. New packaging assertions plus the tag must be added or CSS-shipping regressions ship silently.
- nx `build-storybook` outputs are mis-declared for public-docsite-v9 (`dist/storybook` vs the actual `dist/react`), so cached runs restore nothing. All storybook timing/size runs must use --skip-nx-cache and measure the artifact directory explicitly.
- apps/vr-tests-react-components is the pixel-identity harness and is the ONLY storybook running Griffel AOT via @griffel/webpack-loader. Its webpack config must be migrated in lockstep or VR baselines silently compare a Griffel build against a Tailwind build.
- `*.styles.raw.js` (719,570 B, 15.2% of shipped lib/ JS, imported by nothing) shows the repo already carries a dead parallel style output. Any 'ship precompiled + sources' option risks repeating this; also, the raw files must be explicitly removed during migration or install-size comparisons will be flattered/penalized arbitrarily.
- Local before/after comparison cannot use `monosize compare-reports` (requires GITHUB_TOKEN and a GH Actions artifact). A snapshot+diff or a custom filesystem StorageAdapter must be built and validated before the migration starts, or there will be no baseline to compare against.
- 73 jest configs use @griffel/jest-serializer and @fluentui/react-conformance-griffel is a published package with Griffel-specific conformance assertions. These will need replacement, and until they do, 'functions identically' cannot be asserted by the existing test suite.
- Windows measurements in this report (parallel=3, single machine) will not match CI (macos-14-xlarge, NX_PARALLEL=6). Before/after legs must run on the same machine and settings; do not compare a local 'before' to a CI 'after'.

## Full report

# Fluent UI v9 Build System & Migration Measurement Methodology

All numbers below were produced by commands run in this session on `master` @ `d712b3c8fb`, Windows 11, Node v22.12.0, nx `parallel: 3`. Commands are stated inline. Timings are wall-clock, cold (`--skip-nx-cache`), single machine — treat them as _relative_ baselines for before/after, not absolute CI numbers.

---

## 1. Build orchestration

### 1.1 Topology

| Layer            | File                                                                           | Notes                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Task runner      | `nx.json`                                                                      | nx `21.6.10`, `"useInferencePlugins": false`, `"parallel": 3`, `"defaultBase": "master"`, `"useLegacyCache": true` |
| Target inference | `tools/workspace-plugin/src/plugins/workspace-plugin.ts` (922 lines)           | Registered in `nx.json` `plugins[0]`; `include` globs cover `packages/react-components/**/*`                       |
| Package manager  | root `package.json` → `"packageManager": "yarn@4.12.0"`                        | Workspaces include `packages/react-components/*/*` (the `library/` + `stories/` split)                             |
| Release          | `beachball.config.js`, `nx.json` `release.projectsRelationship: "independent"` |                                                                                                                    |

`project.json` files for component packages are near-empty — e.g. `packages/react-components/react-button/library/project.json` declares only `name`, `projectType`, `sourceRoot`, `tags: ["vNext","platform:web"]` and a `test.dependsOn`. **All real targets are synthesized by the workspace plugin.**

`nx.json` `targetDefaults` that matter:

- `build`: `dependsOn: ["^build"]`, `cache: true`, `inputs: ["production","^production","{workspaceRoot}/scripts/api-extractor/api-extractor.*.json"]`
- `bundle-size`: `dependsOn: ["build"]`, `cache: true`
- `build-storybook`: `outputs: ["{projectRoot}/dist/storybook"]`, `inputs: ["default","{workspaceRoot}/.storybook/**","{projectRoot}/.storybook/**"]`, `cache: true`

### 1.2 What `build` of one package actually does

Target definition: `tools/workspace-plugin/src/plugins/workspace-plugin.ts:224-262`

```
executor: '@fluentui/workspace-plugin:build'
options: {
  sourceRoot: 'src',
  outputPathRoot: '{projectRoot}',
  moduleOutput: [ {module:'es6', outputPath:'lib'}, {module:'commonjs', outputPath:'lib-commonjs'} ],   // + lib-amd if tag 'ships-amd'
  enableGriffelRawStyles: true
}
outputs: ['{projectRoot}/lib', '{projectRoot}/lib-commonjs', '{projectRoot}/dist', '{projectRoot}/etc/<pkg>.api.md']
```

`generateApi` defaults to `true` and `clean` defaults to `true` (`tools/workspace-plugin/src/executors/build/lib/shared.ts:45-47`), even though neither appears in the resolved options (verified via `npx nx show project react-button --json`).

Executor flow — `tools/workspace-plugin/src/executors/build/executor.ts`:

1. `cleanOutput(...)` — deletes `lib/`, `lib-commonjs/` first.
2. In parallel: `runBuild(...)` **and** `generateApiExecutor(...)` (api-extractor → `dist/index.d.ts` rollup + `etc/<pkg>.api.md`).
3. `copyAssets(assetFiles)`.

`runBuild` branches (`executor.ts:45-58`):

- `hasStylesFilesToProcess()` → true when `globSync('**/*.styles.ts', {cwd: src})` is non-empty (`lib/babel.ts:26-29`) → **Griffel AOT path**.
- else if `options.reactCompiler` → React Compiler path (no package enables it in `project.json` today).
- else → plain SWC, one pass per `moduleOutput` entry.

**Griffel AOT path** (`lib/babel.ts:31-77`) — this is the critical shape:

1. SWC compiles `src/**/*.{js,ts,tsx}` → `lib/` (ESM), applying the `createStyleRawOutput` transform which copies each `*.styles.js` to `*.styles.raw.js` (untransformed, pre-AOT).
2. Babel runs over `lib/**/*.styles.js` in place, with `babelrc: true` and `babelrcRoots: [projectRoot]`, rewriting `makeStyles`/`makeResetStyles` into `__styles(...)`/`__resetStyles(...)`.
3. CJS output is transpiled **from `lib/`**, not from `src/` — comment at `lib/babel.ts:66-68`: _"we need to override source root to the output path of transpiled ESM+Griffel AOT, because griffel is unable to handle SWC commonjs output"_.

Babel config chain: `packages/react-components/react-button/library/.babelrc.json` → `extends "../../../../.babelrc-v9.json"` → preset `@fluentui/scripts-babel/preset-v9` (`scripts/babel/src/preset-v9.js`) which registers the `@griffel` preset with `modules: [@griffel/core, @griffel/react, @fluentui/react-components]` and a `babel-plugin-module-resolver` alias map built from `tsconfig.base.json#paths` (src→lib rewrite).

There are **89** package-level `.babelrc.json` files (`find packages -name ".babelrc.json" -not -path "*/node_modules/*" | wc -l`).

SWC config is per-package `.swcrc` (`packages/react-components/react-button/library/.swcrc`): `target: es2019`, `externalHelpers: true`, `transform.react.runtime: "classic"`, `minify: false`, `sourceMaps: true`, `exclude` covers `*.spec.*`, `*.test.*`, `*.cy.*`, `/testing`. SWC is driven programmatically via `@swc/core` `transformFile` (`lib/swc.ts:52`), file-by-file — **no bundling, no minification, no tree-shaking at package build time.**

### 1.3 Exact commands + reproducible timing

Cold build, single package (builds its dependency graph via `^build`):

```bash
cd C:/Users/ArrayKnight/Code/fluentui
npx nx reset                                        # optional: nuke daemon + cache
time npx nx run react-button:build --skip-nx-cache
```

→ **25.9 s** (react-button + 12 dependent tasks) — measured.

Cold build, suite package:

```bash
time npx nx run react-components:build --skip-nx-cache
```

→ **1 m 56.4 s** (react-components + 70 dependent tasks) — measured.

Cold build, all v9:

```bash
time npx nx run-many -t build --projects=tag:vNext --skip-nx-cache --parallel=3
```

→ **3 m 04.9 s** for 91 projects + 19 dependent tasks — measured. (`npx nx show projects --projects tag:vNext --with-target build | wc -l` → 91; repo-wide `--with-target build` → 139.)

**Per-package attribution:** the executor emits perf marks (`tools/workspace-plugin/src/utils.ts:284-291`) that surface only under verbose logging:

```bash
NX_VERBOSE_LOGGING=true npx nx run react-text:build --skip-nx-cache 2>&1 | grep "Execution Timings"
# Execution Timings: GenerateApiExecutor (0.82 s)
# Execution Timings: BuildExecutor (0.84 s)
```

The lines carry no project name — correlate with the preceding `> nx run <project>:build` header in the same stream. This is the cheapest way to get a per-package before/after build-time table with zero tooling changes.

Also derivable from the same log, as a proxy for AOT cost:

```bash
grep -o "Processing griffel AOT with babel: [0-9]* files" build.log | awk '{s+=$6;n++} END {print n, s}'
# 62 packages, 277 *.styles.js files transformed  (measured over the tag:vNext run)
```

After migration this line should disappear entirely — it is a direct, binary signal that the AOT step is gone.

**Reproducibility rules for the report:** always `--skip-nx-cache`; pin `--parallel` (nx.json default is 3, CI sets `NX_PARALLEL: 6`); run `npx nx reset` between A/B legs to drop the daemon's in-memory project graph; discard the first run (warms yarn/node module resolution); report median of ≥3.

---

## 2. monosize

### 2.1 Wiring

- Deps (root `package.json`): `monosize@0.9.0`, `monosize-bundler-webpack@0.4.0`, `monosize-storage-git@0.3.4`.
- Root config: `monosize.config.mjs` — webpack bundler with `externals: {react, react/jsx-runtime, react-dom, react/compiler-runtime}`, git storage (`microsoft/fluentui`, workflow `bundle-size-base.yml`, artifact `monosize-bundle-size-report`, path `dist/bundle-size-report.json`), and `reportResolvers.packageName` that strips `@fluentui/`.
- One per-package override exists: `packages/react-components/global-context/monosize.config.mjs` (adds `@fluentui/react-context-selector` to externals). `readConfig` uses `findUp`, so a package-local `monosize.config.mjs` wins.
- Target inference: `workspace-plugin.ts:509-535` — a `bundle-size` target is created iff `bundle-size/` dir **or** `monosize.config.mjs` exists in the project root. Command: `yarn run -T monosize measure`, `cwd: projectRoot`, `outputs: ['{projectRoot}/dist/bundle-size']`.
- Scale: **60** projects with a `bundle-size` target (`npx nx show projects --with-target bundle-size | wc -l`); **235** fixture files repo-wide, **99** under `packages/react-components` (`find packages apps -path "*/bundle-size/*.fixture.js" -not -path "*/node_modules/*" | wc -l`).

Fixtures are trivial import-and-log entry points, e.g. `packages/react-components/react-button/library/bundle-size/Button.fixture.js`:

```js
import { Button } from '@fluentui/react-button';
console.log(Button);
export default { name: 'Button' };
```

`packages/react-components/react-components/bundle-size/` has 4: `ButtonProviderAndTheme`, `MultipleComponents`, `ProviderAndTheme`, `ReactComponents` (the last is `import * as rc from '@fluentui/react-components'` — "entire library").

### 2.2 What it measures

`node_modules/monosize/dist/commands/measure.mjs`:

- Globs `bundle-size/*.fixture.js` relative to cwd, copies each into `dist/bundle-size/`, builds them (default `--build-mode batch` = one multi-entry webpack run, output `<root>/<name>.output/index.js`).
- Webpack config (`node_modules/monosize-bundler-webpack/dist/runWebpack.mjs`): `mode: 'production'`, `target: 'web'`, `cache: memory`, `TerserWebpackPlugin` with `extractComments: false`. **No module rules at all.**
- Measurement (`measureFixtureFromOutputDir`): reads the fixture's output dir **non-recursively**, keeps files whose extension is in `config.assetTypes`, and for each computes `content.byteLength` (`minifiedSize`) and `gzipSync(content).length` (`gzippedSize`). Writes totals + a per-extension `assets` map to `dist/bundle-size/monosize.json`.
- `assetTypes` (`node_modules/monosize/dist/utils/readConfig.mjs`): `KNOWN_ASSET_TYPES = ['js','json','css']`, `DEFAULT_ASSET_TYPES = ['js']`. **The repo's `monosize.config.mjs` does not set `assetTypes`, so today only `js` is measured.**

Verified output shape (`packages/react-components/react-button/library/dist/bundle-size/monosize.json`):

```json
{
  "name": "Button",
  "path": "bundle-size/Button.fixture.js",
  "minifiedSize": 32675,
  "gzippedSize": 8499,
  "assets": { "js": { "minifiedSize": 32675, "gzippedSize": 8499 } }
}
```

**It measures the built artifact, not source.** The monosize webpack config has no `tsconfig-paths` plugin, so `@fluentui/react-button` resolves through the yarn workspace symlink to `package.json#module` → `lib/index.js`. Proven empirically: the AOT-only hashed class `r1f29ykk` (which exists only in `lib/components/Button/useButtonStyles.styles.js`) appears in `dist/bundle-size/Button.output/index.js`.

### 2.3 Exact local commands

Selected packages via nx (builds deps first — `bundle-size` `dependsOn: ["build"]`):

```bash
npx nx run react-button:bundle-size --skip-nx-cache          # measured 29.7s incl. 13 dep tasks
npx nx run react-components:bundle-size --skip-nx-cache      # measured 2m07.3s incl. 71 dep tasks
npx nx run-many -t bundle-size --projects=tag:vNext --skip-nx-cache
npx nx affected -t bundle-size --nxBail                       # what CI runs (.github/workflows/bundle-size.yml)
```

Direct, when `lib/` is already built (fastest inner loop):

```bash
cd packages/react-components/react-button/library
yarn run -T monosize measure                    # 3.3s measured
yarn run -T monosize measure --fixtures 'Button*.fixture.js'
yarn run -T monosize measure --debug            # also writes *.debug/index.js (beautified, dead-code-eliminated)
```

Results land at `<projectRoot>/dist/bundle-size/monosize.json` plus `<Fixture>.output/index.js` per fixture.

### 2.4 Before/after comparison locally

`monosize compare-reports` cannot be used offline: `node_modules/monosize-storage-git/dist/index.mjs:15-18` throws without `GITHUB_TOKEN`, and the base report only exists as a GitHub Actions artifact produced by `.github/workflows/bundle-size-base.yml` on `master`.

Two workable local methods:

**(a) Snapshot + diff (simplest).** `collectLocalReport` (`node_modules/monosize/dist/utils/collectLocalReport.mjs`) defaults to glob `packages/**/dist/bundle-size/monosize.json` from the git root. So:

```bash
git checkout master && npx nx run-many -t bundle-size --projects=tag:vNext --skip-nx-cache
# copy every packages/**/dist/bundle-size/monosize.json into .scratch/baseline/
git checkout migration && npx nx run-many -t bundle-size --projects=tag:vNext --skip-nx-cache
# diff by (packageName, path) on minifiedSize/gzippedSize/assets
```

**(b) Local storage adapter (reuses monosize's reporters).** `StorageAdapter` is just `{ getRemoteReport(branch), uploadReportToRemote(...) }` (`node_modules/monosize/dist/types.d.mts`). A ~15-line FS adapter reading the snapshot lets you run `monosize compare-reports --output=markdown` verbatim, including the per-asset-type diff table (`compareResultsInReports.mjs` → `buildAssetsDiff`, which emits a per-type breakdown when **both** sides carry `assets`).

### 2.5 The blocking change monosize needs for CSS Modules

**Proven, not inferred.** I bundled a plain `import './a.css'` and an `import s from './b.module.css'` through monosize's exact base webpack config (`.scratch/css-in-monosize-webpack.js`):

```
plain:  ERRORS(1) -> Module parse failed: Unexpected token (1:0) | ... no loaders are configured to process this file
module: ERRORS(1) -> Module parse failed: Unexpected token (1:0) | ... no loaders are configured to process this file
```

`mini-css-extract-plugin` is **not installed** (`ls node_modules/mini-css-extract-plugin` → no such file). `css-loader@5.0.1`, `style-loader@2.0.0`, `postcss-loader@4.1.0`, `postcss-modules@4.1.3` are present, but `style-loader` injects CSS into JS (which would _hide_ the CSS in the JS number — wrong for this report).

**Zero-new-dependency fix, verified:** webpack `5.108.4` (the installed version) built-in CSS. `.scratch/css-experiment-probe.js`:

```
webpack version: 5.108.4
plain:  OK emitted [index.css=24B, index.js=44B]
module: OK emitted [index.css=26B, index.js=215B]
```

So the migration only needs, in `monosize.config.mjs`'s existing config enhancer:

```js
config.experiments = { ...config.experiments, css: true };
config.output.cssFilename = '[name]/index.css'; // batch mode uses filename '[name]/index.js'
```

plus `assetTypes: ['js','css']` on the config object. That lands `index.css` beside `index.js` in the same dir monosize scans non-recursively, and every fixture then reports `assets.js` + `assets.css` separately with no fixture edits.

---

## 3. Where the Griffel cost lives (JS bytes vs CSS bytes)

### 3.1 Griffel runtime floor in a consumer bundle

Measured with monosize's exact webpack settings (`.scratch/griffel-floor.js`), React externalized:

| Entry                                                                       | minified | gzip     |
| --------------------------------------------------------------------------- | -------- | -------- |
| `console.log("x")` (baseline)                                               | 17 B     | 37 B     |
| `import { __styles } from '@griffel/core'`                                  | 1,706 B  | 818 B    |
| `import { __styles } from '@griffel/react'` — **the AOT path Fluent ships** | 4,326 B  | 1,856 B  |
| `import { makeStyles } from '@griffel/react'` — runtime path (no AOT)       | 35,711 B | 12,712 B |
| `import { FluentProvider } from '@fluentui/react-provider'`                 | 18,908 B | 7,269 B  |

Two consequences for the report:

- The Griffel _runtime_ that migration deletes is only ~4.3 kB min / ~1.9 kB gzip per app — small.
- The `makeStyles` number (35.7 kB / 12.7 kB) is what an app pays if it consumes non-AOT'd Fluent. It is **8.3× the `__styles` path**. Relevant because the repo has an accepted RFC to stop AOT (`docs/react-v9/contributing/rfcs/shared/build-system/stop-styles-transforms.md`, "Option A: Stop pre-processing styles"); a Tailwind/CSS-Modules migration makes that RFC moot, which is a genuine, quantifiable win to claim.

### 3.2 Where the CSS-in-JS payload actually sits: inside JS string literals

Griffel AOT emits the CSS as string arrays inside the JS module. From `packages/react-components/react-button/library/lib/components/Button/useButtonStyles.styles.js`:

```js
const useRootBaseClassName = /*#__PURE__*/ __resetStyles('r1f29ykk', null, {
  r: [
    '.r1f29ykk{align-items:center;box-sizing:border-box;display:inline-flex;...background-color:var(--colorNeutralBackground1);...',
  ],
});
```

**Shipped `lib/` composition, repo-wide** (`.scratch/repo-lib-breakdown.js`, 88 `lib/` dirs, 3,514 `.js` files, 4,718,516 B):

| Bucket                                        | bytes     | share     |
| --------------------------------------------- | --------- | --------- |
| `*.styles.js` (Griffel AOT, imported)         | 1,027,199 | 21.8%     |
| `*.styles.raw.js` (shipped, never imported)   | 719,570   | 15.2%     |
| everything else                               | 2,971,747 | 63.0%     |
| **AOT share of importable JS (excl. `.raw`)** |           | **25.7%** |

Within those AOT style modules (restricted to `*/library/lib/`, 243 files, 998,751 B): **389,357 B (39.0%) is literal CSS text** (`.scratch/measure-css.js`, counting string literals containing `{`, `}` and `:`).

**Composition of the actual shipped bundles** (`.scratch/bundle-css-share.js` over monosize's minified fixture outputs):

| Fixture                                   | min       | gzip    | CSS text (raw) | CSS text % of min | gzip(CSS alone) | JS-only remainder (raw / gzip) |
| ----------------------------------------- | --------- | ------- | -------------- | ----------------- | --------------- | ------------------------------ |
| `react-button` Button                     | 32,675    | 8,499   | 15,092         | **46.2%**         | 2,776           | 17,583 / 6,051                 |
| `react-button` SplitButton                | 46,572    | 11,521  | 21,839         | **46.9%**         | 3,685           | —                              |
| `react-components` ButtonProviderAndTheme | 66,281    | 19,002  | 15,433         | 23.3%             | 2,852           | —                              |
| `react-components` MultipleComponents     | 226,026   | 68,049  | 33,146         | 14.7%             | 5,740           | —                              |
| `react-components` **entire library**     | 1,294,729 | 326,152 | 354,320        | **27.4%**         | 50,785          | 940,409 / 266,760              |

Caveat to state in the report: `gzip(JS-only) + gzip(CSS-only) ≠ gzip(combined)`. For Button, 6,051 + 2,776 = 8,827 vs. 8,499 combined (splitting _costs_ 3.9%); for the entire library, 266,760 + 50,785 = 317,545 vs. 326,152 (splitting _saves_ 2.6%, because repeated CSS compresses better when co-located). Never present a "gzip saving" derived from subtraction alone.

### 3.3 Fair comparison rule

Today, 100% of styling ships as JS bytes. After migration, some ships as CSS bytes. Therefore:

- **Primary metric:** `assets.js + assets.css` (min and gzip), per fixture, before vs after. This is the number a consumer actually downloads.
- **Secondary metric:** `assets.js` alone — expected to drop sharply (the ~46%/~27% CSS-text share plus the ~4.3 kB Griffel runtime).
- **Never** report only `assets.js` before/after: it would show a fabricated 40%+ "win" that is just accounting.
- **Also report:** npm install size. `npm pack --dry-run --json` in `packages/react-components/react-button/library` → 185 files, **124,354 B packed / 1,050,635 B unpacked**. Note `*.styles.raw.js` is 15.2% of shipped `lib/` JS and is dead weight (`files: ["lib", ...]` includes it; nothing in the repo imports `.styles.raw` — only `tools/workspace-plugin/src/executors/build/**` mentions the string). Migration deletes that entire category.

Design tokens are already CSS custom properties and are orthogonal to Griffel: `packages/tokens/src/tokens.ts` maps 467 token names to `'var(--tokenName)'` strings, and `FluentProvider` writes the theme into a `<style>` tag at runtime (`packages/react-components/react-provider/library/src/components/FluentProvider/useFluentProviderThemeStyleTag.ts`). The `var(--...)` references survive verbatim into CSS Modules output, so token preservation costs nothing.

---

## 4. Is Griffel AOT / `babel-preset-griffel` used in the build?

**Yes, in three places.**

1. **Package builds** — `@griffel/babel-preset@1.5.8` (root `package.json:67`), reached via `packages/*/.babelrc.json` → `.babelrc-v9.json` → `scripts/babel/src/preset-v9.js`, applied by `tools/workspace-plugin/src/executors/build/lib/babel.ts` to `lib/**/*.styles.js`. Confirmed at runtime: build log line `Processing griffel AOT with babel: 5 files` for react-button; 62 packages / 277 files across the `tag:vNext` build.
2. **VR tests** — `apps/vr-tests-react-components/.storybook/main.js:28` registers `rules.griffelRule`, i.e. `@griffel/webpack-loader@2.2.10` with `enforce: 'post'` (`scripts/storybook/src/rules.js:71-87`). This is the only Storybook that AOT-compiles.
3. **Nowhere else.** `public-docsite-v9` (`apps/public-docsite-v9/.storybook/main.js:59`) registers only `rules.scssRule` (+ optional React Compiler). More importantly, `scripts/storybook/src/loaders/custom-loader.js` explicitly strips `@griffel` and `@fluentui/scripts-babel/preset-v9` from any Babel config Storybook picks up (`excludePresets`). **Storybook therefore runs Griffel at runtime, from TS source**, not AOT — because the root `.storybook/main.js` calls `registerTsPaths({configFile: tsconfig.base.json})` and all 167 aliases in `tsconfig.base.json#paths` point at `src/index.ts` (0 point at `lib/`).

Consequence: **Storybook and monosize measure two different things.** monosize = built `lib/` (AOT). Storybook/docsite = TS source (runtime Griffel). Any "docsite bundle got smaller" claim measures a _different_ baseline than the monosize numbers.

Related tooling that assumes Griffel and will need attention: `@griffel/jest-serializer` is configured in **73** `jest.config.js` files (`grep -rln "@griffel/jest-serializer" --include="jest.config.js" packages | wc -l`); `@griffel/eslint-plugin` and `@fluentui/react-conformance-griffel` (a published package, `packages/react-components/react-conformance-griffel`) also exist.

---

## 5. CRITICAL: how a v9 package can ship CSS

### 5.1 What exists today

**No v9 component library ships CSS.** `react-button`, `react-components`, `react-headless-components-preview` all have `files: ["*.md","dist/*.d.ts","lib","lib-commonjs"]`, `sideEffects: false`, and exports maps with only `types`/`node`/`import`/`require`.

Scanning every `package.json` under `packages/` and `apps/` for a `style` field, a CSS entry in `files`, or CSS in `exports` yields exactly 10 hits, of which only three are real:

| Package                                                 | Mechanism                                                | Evidence                                                                                                                                                       |
| ------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`@fluentui/react-storybook-addon`**                   | `assets` copy + subpath export + `sideEffects` allowlist | see below                                                                                                                                                      |
| **`@fluentui/react-storybook-addon-export-to-sandbox`** | identical                                                | `package.json:37,41,46`; `project.json:15`                                                                                                                     |
| **`@fluentui/react-theme-sass`**                        | `style` field + hand-committed `sass/`                   | `package.json` `"style": "sass/tokens.scss"`, `exports["."].style`, `files: [... "sass"]`; `git ls-files` confirms `sass/*.scss` are checked in, not generated |

`@fluentui/react-storybook-addon` is the closest precedent and it is **option (b) done exactly right**:

- `packages/react-components/react-storybook-addon/src/styles.css` (12,729 B) is source.
- `project.json` overrides `build.options.assets: [{ input: "{projectRoot}/src", output: "dist", glob: "styles.css" }]` — the build executor's generic asset copier (`tools/workspace-plugin/src/executors/build/lib/assets.ts`) puts it at `dist/styles.css`.
- `package.json`: `files` includes `"dist/styles.css"`; `exports["./styles.css"] = "./dist/styles.css"`; and critically `"sideEffects": ["./dist/styles.css"]` (an _array_, not `false`).
- Documented consumption, `packages/react-components/react-storybook-addon/README.md:47`: `import '@fluentui/react-storybook-addon/styles.css';`

**CSS Modules already exist in-repo, but only in stories.** `packages/react-components/react-headless-components-preview/stories/src/**/*.module.css` — 40+ files using exactly the target style (variant classes, `[data-disabled]` attribute selectors, `var(--token)` custom properties). Example: `stories/src/Button/button.module.css` + `stories/src/Button/ButtonDefault.stories.tsx` (`import styles from './button.module.css'`). The **library** for that package still ships pure JS.

Supporting infrastructure that already exists for `*.module.css`:

- **TypeScript**: `typings/static-assets/index.d.ts` declares `declare module '*.module.css' { const classes: {readonly [key:string]: string}; export default classes; }`. Component `tsconfig.lib.json` opts in via `"types": ["static-assets","environment"]`. **Note it declares only `*.module.css`, not plain `*.css`.**
- **Storybook**: `packages/react-components/react-headless-components-preview/stories/.storybook/css-modules-webpack.js` exports `registerCssModuleRules({config})`, which locates Storybook 9's built-in `/\.css$/` rule (log line: `info => Using implicit CSS loaders`) and sets `modules: { auto: true, localIdentName: '[name]__[local]--[hash:base64:5]' }` on its `css-loader` entry. Called from that package's `.storybook/main.js` `webpackFinal`. It `throw`s loudly if Storybook's internal rule shape changes.
- **SSR**: `scripts/test-ssr/src/utils/esbuild-plugin.ts` `cssModulesShimPlugin()` resolves `/\.module\.css$/` into a `Proxy` that echoes property names (`styles.foo === 'foo'`), registered in `scripts/test-ssr/src/utils/buildAssets.ts` for both the CJS (node/SSR) and IIFE (browser) esbuild passes.
- **Sandbox export**: `@fluentui/babel-preset-storybook-full-source` has `cssModules` support and fixtures under `src/__fixtures__/storybook-stories-fullsource/css-module-auto-detect/`.

### 5.2 Recommendation

**Option (b) — one `dist/styles.css` per package, exposed as a subpath export, with `sideEffects` listing it — is the least-invasive shipping mechanism, and it is the only one with a working in-repo precedent.**

Per package:

```jsonc
// project.json
"build": { "options": { "assets": [ { "input": "{projectRoot}/src", "output": "dist", "glob": "styles.css" } ] } }
// package.json
"files": ["*.md", "dist/*.d.ts", "dist/styles.css", "lib", "lib-commonjs"],
"exports": { ".": {...}, "./styles.css": "./dist/styles.css", "./package.json": "./package.json" },
"sideEffects": ["./dist/styles.css"]
```

And in `@fluentui/react-components`, a single aggregated `./styles.css` that `@import`s (or is built from) the 68 member packages, so the overwhelmingly common consumer does one import.

Why not the alternatives:

- **(a) `import './Button.css'` inside the component JS.** Rejected on four pieces of evidence:

  1. Every component package is `"sideEffects": false`. A bare CSS import is a side effect; bundlers are entitled to drop it. Flipping to an array per file is 60+ packages × N files of churn and is exactly the class of change that silently regresses tree-shaking.
  2. The build executor's SWC pass globs only `**/*.{js,ts,tsx}` (`lib/swc.ts:35`). Colocated `src/**/*.css` is never emitted to `lib/` unless every package also adds an `assets` glob — so you pay the `assets` cost anyway, then _also_ pay the `sideEffects` cost.
  3. `typings/static-assets/index.d.ts` types `*.module.css` only; a bare `.css` import has no ambient declaration and will not type-check.
  4. `scripts/test-ssr/src/utils/esbuild-plugin.ts` shims `/\.module\.css$/` only. A bare `.css` import in a library would flow into esbuild's native CSS handling, which emits a sibling `.css` file that `scripts/test-ssr/src/utils/renderToHTML.ts` never links (it only injects Griffel's `renderToStyleElements(renderer)` into `<head>`). SSR would silently render unstyled.
  5. It forces every consumer's bundler to have a CSS loader for `node_modules` — a real break for consumers who today can bundle Fluent with zero CSS configuration.

- **(c) precompiled + also ship sources.** This is Option B of the existing RFC (`stop-styles-transforms.md`) and the repo already rejected it: _"Harder to maintain; adds complexity to the build system … Increased install size."_ The repo also already ships a dead parallel output (`*.styles.raw.js`, 719,570 B = 15.2% of `lib/` JS, imported by nothing) — evidence that "ship both" degenerates into shipping dead bytes. Do not repeat it.

**SSR constraints (`apps/ssr-tests-v9`).** `test-ssr` runs on every `type:stories` v9 project (`workspace-plugin.ts` `buildTestSsrTarget`, exclusions in `nx.json` plugin options: `react-theme-stories`, `react-migration-v8-v9-stories`, `react-migration-v0-v9-stories`). Three concrete requirements:

1. `scripts/test-ssr/src/utils/renderToHTML.ts` builds the HTML head purely from `renderToStyleElements(renderer)`. With CSS Modules there is no Griffel renderer, so the harness must instead emit a `<link rel="stylesheet">` (or inline) for the `.css` esbuild produces. Without this change the SSR pages render unstyled and any visual assertion is meaningless.
2. The esbuild CSS-modules shim returns `key => key`, i.e. **unhashed** class names. That is fine for "does it render without errors" but makes SSR/CSR class names diverge from the hashed webpack output. If the migration relies on hashed local names, the shim must be replaced with a real CSS-modules transform or the harness must use the same hashing.
3. `scripts/test-ssr/src/commands/main.ts` `interceptConsoleLogs()` turns **any** `console.error`/`console.warn` during SSR into a hard failure. Any CSS-loader or missing-module warning will fail the suite.

**Jest is an unhandled blocker.** No `jest.config.js` anywhere in `packages/` or `apps/` has a CSS `moduleNameMapper` or `identity-obj-proxy` (`grep -rn "identity-obj-proxy\|\.css" --include="jest.config.js" packages apps` → zero hits), and `jest.preset.js` only maps tsconfig paths + React deps. The moment a library `src/**/*.tsx` imports a `.css` file, every unit test in that package throws on parse. This needs a repo-wide `jest.preset.js` change (`'\\.module\\.css$': 'identity-obj-proxy'` or a custom transform preserving class names) _before_ the first component migrates.

**`verify-packaging` will not catch CSS packaging regressions.** `tools/workspace-plugin/src/executors/verify-packaging/executor.ts:33-37` returns `true` immediately unless the project has the tag `npm:public` — and **zero** projects carry it (`grep -rln "npm:public" --include="project.json" packages apps | wc -l` → 0). The target is also only enabled for `react-text` and `react-components` (`nx.json` plugin `verifyPackaging.include`). If CSS shipping is to be enforced, this executor needs new assertions **and** the tag actually applied.

---

## 6. Storybook builds & the client-bundle-size target

### 6.1 Which app

`npx nx show projects --with-target build-storybook` → 10 projects. The v9 metrics target is **`public-docsite-v9`**:

- `apps/public-docsite-v9/package.json` `build-storybook`: `cross-env NODE_OPTIONS=--max_old_space_size=3072 DEPLOY_PATH=/react/ storybook build -o ./dist/react --docs`
- It aggregates all `@fluentui/react-components` member-package stories plus its own (`apps/public-docsite-v9/.storybook/main.js` via `getPackageStoriesGlob`), so its client bundle is the broadest "everything, as an app" surface in the repo.
- `apps/public-docsite-v9/project.json` also defines `build-storybook:docsite`, an `nx:noop` fan-out that additionally pulls `chart-docsite`, `web-components`, and `public-docsite-v9-headless`.

Secondary/contrast targets worth naming in the report:

- `public-docsite-v9-headless` — smaller, and the **only** storybook that already consumes CSS Modules end to end. Best canary.
- `vr-tests-react-components` — the only storybook with `griffelRule` (AOT). It is the pixel-identity harness (`test-vr` `dependsOn: ["build-storybook"]` in `nx.json`), so its build config must change in lockstep with the migration or VR baselines become meaningless.
- `apps/perf-test-react-components` (`bundle` / `test-perf` targets, `webpack.config.js`) — a real webpack app bundle, but `devtool: 'eval'` and tsconfig-paths-to-source make it useless as a _size_ metric. Use it for runtime perf only.

### 6.2 Two caveats that must be fixed before Storybook numbers mean anything

**(i) `build-storybook` currently fails on this checkout.** Measured:

```bash
npx nx run public-docsite-v9:build-storybook --skip-nx-cache        # FAILED after 1m47.9s
npx nx run public-docsite-v9-headless:build-storybook --skip-nx-cache # FAILED after 1m20.0s
```

861 identical module build failures in the docsite run:

```
TypeError: .\src\AccessibilityScenarios\Accordion.stories.tsx: Cannot convert undefined or null to object
    at PluginPass.pre (packages/react-components/babel-preset-storybook-full-source/src/modifyImports.ts:32:29)
```

`modifyImports.ts:32` is `Object.keys(importMappings)`, so `importMappings` arrived `undefined`. It is populated by `getAddonOptions` in `packages/react-components/react-storybook-addon-export-to-sandbox/src/webpack.ts:67-75`, which finds the preset by regex `addonFilePattern = /react-storybook-addon-export-to-sandbox\/[a-z/]+.[jt]s$/` against `options.presetsList[].name` and falls back to `defaultOptions` (which has **no** `importMappings`) when the find misses. That regex requires forward slashes; on Windows `require.resolve`-derived preset names are backslash paths — consistent with a Windows-only path-separator miss, which would explain why CI (`runs-on: macos-14-xlarge` in both `.github/workflows/pr.yml` and `bundle-size.yml`) is green. HEAD~2 is `78ea7c4de6 feat(react-storybook-addon-export-to-sandbox): remove custom-babel-loader workaround (#36385)`, which touched this exact code path. **Treat Storybook-derived metrics as CI-only until this is confirmed/fixed**, or capture them on a non-Windows machine.

**(ii) Nx caching of `build-storybook` is mis-declared for the docsite.** `nx.json` `targetDefaults["build-storybook"].outputs = ["{projectRoot}/dist/storybook"]`, but `public-docsite-v9`'s script writes to `./dist/react` (verified in the resolved config from `nx show project public-docsite-v9 --json`; only the separate `build-storybook:docsite` target declares `{projectRoot}/dist/react`). A cache hit would restore nothing. Always use `--skip-nx-cache` for timing, and measure the artifact directory explicitly rather than trusting nx outputs.

### 6.3 Recommended storybook metrics

```bash
npx nx reset
time npx nx run public-docsite-v9:build-storybook --skip-nx-cache
# then, over apps/public-docsite-v9/dist/react/assets (or wherever SB9 emits):
#   sum of *.js  (raw + gzip)
#   sum of *.css (raw + gzip)   <- zero today, non-zero after migration
#   total
```

Because Storybook builds from **source** with runtime Griffel (Section 4), the "before" storybook bundle contains `makeStyles` (35.7 kB min / 12.7 kB gzip floor) rather than `__styles` (4.3 kB / 1.9 kB). Do not cross-compare storybook deltas with monosize deltas; report them as two separate tables with an explicit note on which artifact each measures.

---

## Scratch artifacts

Measurement scripts written this session live in `C:/Users/ArrayKnight/Code/fluentui/.scratch/` (already gitignored — `.gitignore:163`): `measure-css.js`, `bundle-css-share.js`, `griffel-share.js`, `griffel-floor.js`, `css-in-monosize-webpack.js`, `css-experiment-probe.js`, `repo-lib-breakdown.js`, plus build logs `vnext-build.log`, `docsite-sb.log`, `headless-nx-sb.log`. They are reusable as-is for the "after" leg. Not deleted — ask before cleanup.

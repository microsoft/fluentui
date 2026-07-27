# Build-time CSS emission + Griffel dead-work gating

_Phase 1.5, workflow wf_b6b62013-472, 2026-07-27._

# Phase 1.5 — package-build CSS emission (D1 + D13) + Griffel dead-work gating

Both tasks are done and all four validations pass with recorded evidence. **No new dependencies were added** — `@tailwindcss/postcss@^4.3.2`, `postcss@8.5.10`, `postcss-modules@4.1.3` were already in the root `package.json` (L110/269/271) and installed. **No `yarn install` was run. Nothing was committed.**

---

## TASK 1 — CSS compilation in the build executor

### New module: `tools/workspace-plugin/src/executors/build/lib/css-modules.ts` (378 lines)

Compiles every `src/**/*.module.css` through `postcss([tailwindcss(), postcssModules(...)])`. `@reference '#theme'` resolves through each package's `imports` field (`"#theme": "@fluentui/react-tailwind-theme/css/index.css"`) with no extra resolver config — `from` is the absolute module path and Tailwind's own resolver does the rest.

**Class names** — `generateScopedName` produces `fuicm-<File>-module__<local>--<hash4>`, e.g. `fuicm-Divider-module__root--LP7J`, `fuicm-Button-module__primary--xDMd`. This mirrors the VR storybook's css-loader `localIdentName` (`fuicm-[name]__[local]--[hash:base64:4]`, `.storybook/main.js:49`) after css-loader's own `.` → `-` sanitisation, so the jest serializer contract (`fuicm-[^\s"']*`, `scripts/jest/src/css-modules/serializer.js:41`) holds. The hash digests `packageName + relPath + localName` rather than CSS bytes, deliberately: names stay stable across cosmetic CSS edits instead of churning `dist/styles.css` on every restyle, while the package name keeps two packages' `.root` distinct.

**(a) `dist/styles.css`** — one aggregated plain-CSS sheet per package, with the canonical order statement prepended **verbatim** ahead of everything:

```
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;
```

Empirically, Tailwind v4.3.3 happened to preserve the statement for the current modules — but per D13 the output is not trusted, so it is prepended regardless; a later identical/partial statement is a no-op under CSS Cascade 5. No theme emission is embedded: `--base-scale` appears **only** as a `var()` fallback inside `calc(var(--spacing, calc(1px * var(--base-scale))) * 8)`, i.e. a _reference_. Declarations (`--base-scale:`) and `:root`/`:host` blocks: **zero in all three packages**.

**(b) Class-map JS + specifier rewrite** — for each module output tree a `<Name>.module.css.js` sibling is generated, then a post-transform pass (precedent: the existing Griffel babel pass over `lib/`) repoints the emitted specifiers. Verified on disk:

- ESM: `import styles from './Divider.module.css'` → `'./Divider.module.css.js'`
- CJS: `_interop_require_default._(require("./Divider.module.css"))` → `require("./Divider.module.css.js")`

The rewrite regex is anchored on the quotes, so it is idempotent (won't re-append `.js`) and ignores bare package specifiers. Each match is checked against a real generated file; a miss logs a loud warning rather than silently leaving a dangling import.

### Stylesheet auto-loading mechanism (D1 (i)/(ii)/(iii))

**The side-effect `import '../../../dist/styles.css'` lives in the ESM class map only.**

| Consumer                   | Resolves via                                       | Gets CSS?          | Why correct                                                                                            |
| -------------------------- | -------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| webpack/vite/rollup client | `exports.import` / `module` → `lib/`               | yes, automatically | class map is imported by the styles hook; its CSS import is protected by `"sideEffects": ["**/*.css"]` |
| plain `node require()`     | `exports.node`/`exports.require` → `lib-commonjs/` | no                 | node cannot parse CSS; the CJS class map has **no** CSS require                                        |
| SSR / node bundle target   | `exports.node` → `lib-commonjs/`                   | no                 | correct — the server bundle shouldn't emit CSS assets; the client leg does                             |

SSR/CJS consumers load the sheet themselves from the new `"./styles.css"` export subpath. Only **one** copy of the CSS ships per package (all class maps point at the same aggregated `dist/styles.css`), and bundlers dedupe the module.

### Package.json updates (three converted packages)

`exports` gains `"./styles.css": "./dist/styles.css"`; `files` gains `"dist/styles.css"`; `sideEffects` was already the required `["**/*.css"]`. This matches the in-repo precedent I verified on `@fluentui/react-storybook-addon` (D1's cited precedent).

### Non-disturbance

The step is gated on `globSync('**/*.module.css')` finding files; unconverted packages pay one glob and produce byte-identical output (proved below). The step runs **serially after** the `runInParallel(runBuild, generateApi)` leg on purpose — it reads `lib*/` (written by runBuild) and writes into `dist/` (written by api-extractor); inside the parallel block it would race both. `nx` `outputs` for `build` already lists `{projectRoot}/dist` (`workspace-plugin.spec.ts:594`), so `dist/styles.css` is cache-covered with no config change.

---

## TASK 2 — Griffel dead-work gating

`hasStylesFilesToProcess` → **`hasGriffelStylesFilesToProcess`** (now async). It still globs `**/*.styles.ts` but additionally requires a real `@griffel/*` **module specifier** (`/['"]@griffel\/[^'"]*['"]/`) — quote-anchored so the migration prose in every converted styles file doesn't count. False positives are the safe direction (they preserve old behaviour).

**Gate granularity — justification.** Package-level for the pipeline choice, because `hasGriffelStylesFilesToProcess` decides the _whole_ compile strategy (the AOT path also forces `lib-commonjs` to be re-transpiled from `lib/` instead of from `src`). Per-file inside that path, because mixed packages exist: react-button has 1 converted + 4 Griffel styles files. So:

- `babel()` filters its `**/*.styles.js` list per file → react-button's AOT count went **5 → 4**, making D10's `grep 'Processing griffel AOT'` metric honest.
- `createStyleRawOutput` checks per file, and for a `.js.map` input takes the decision from the sibling `.js` — otherwise the `.raw.js` / `.raw.js.map` pair would desynchronise for Griffel files (sourcemap contents are not a reliable place to look for an import specifier).

**Result:** react-divider and react-provider leave the Griffel pipeline entirely (no AOT log, no `*.styles.raw.js`); react-button keeps it for its 4 Griffel files and drops the dead Button raw copy.

---

## Additional deliverable: the theme root artifact

The three packages are **unusable without it** — their compiled CSS references `--spacing`/`--base-scale`, which resolve to `0px` when undefined — and `css/index.css` is Tailwind source a plain consumer cannot compile. So D13's "standalone root artifact" now actually exists:

- `react-tailwind-theme/css/emit.css` — `@import './index.css' source(none);` (the `source(none)` trap from CONVERSION_GUIDE is respected).
- `react-tailwind-theme/build.js` — compiles it to `dist/styles.css` (1,516 B: the `@layer` statement, `@layer fui.theme { :root,:host { --base-scale; --spacing } }`, 8 focus-knob `@property` registrations).
- `package.json`: `scripts.build`, `exports["./styles.css"]`, `files`, and an `nx.targets.build` block.

**I deliberately did _not_ add a `project.json`.** The workspace plugin creates its nodes from `project.json` files (`projectConfigGlob`), so one would newly infer lint/format/type-check/verify-packaging targets a CSS-only package cannot satisfy. Instead nx infers a `build` target from the package.json script.

**Bug I caught and fixed while doing this:** `nx.json` `targetDefaults.build` sets `cache: true` for _every_ target named `build`, and an inferred script target declares no `outputs` — so a cache hit would restore nothing and skip the command, leaving `dist/styles.css` absent. Fixed by declaring `inputs`/`outputs` in the package.json `nx` key. Verified empirically: deleted `dist/`, re-ran, nx reported _"read the output from the cache instead of running the command"_ and `styles.css` was restored.

---

## Validation evidence

### 1. Build output shape — `node .scratch/phase15/validate.js` → **ALL CHECKS PASSED** (16 assertions × 3 packages)

Per package: `dist/styles.css` exists · starts with the canonical `@layer` statement · contains `fuicm-` classes (divider 5, button 8, provider 1) · **0** `--base-scale:` declarations · no `:root`/`:host` · no residual `@apply`/`@reference`/`@variant`/`@theme`/`@utility` · **zero dangling `.module.css` specifiers in `lib` and `lib-commonjs`** · ESM class maps import the stylesheet, CJS class maps reference no `.css` · no `*.styles.raw.js` for Griffel-free files · `exports`/`files`/`sideEffects` correct.

Emitted sizes: divider 6,710 B · button 20,057 B · provider 1,297 B · theme 1,516 B.
Packed (`npm pack --dry-run --json`, D10 methodology): divider 26,075 B / 40 files · button 101,124 B / 184 · provider 43,326 B / 52 · theme 12,049 B / 7.

### 2. Node CJS smoke — no crash

From the repo tree _and_ from the installed tarballs via bare specifier (which is what routes through `exports.node`):

```
OK @fluentui/react-divider  -> \@fluentui\react-divider\lib-commonjs\index.js (6 exports)
OK @fluentui/react-button   -> \@fluentui\react-button\lib-commonjs\index.js (31 exports)
OK @fluentui/react-provider -> \@fluentui\react-provider\lib-commonjs\index.js (8 exports)
```

Note: `require('<pkg>/lib-commonjs/index.js')` on an _installed_ package fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` — that is the packages' pre-existing `exports` map (no `./lib-commonjs/*` subpath), unrelated to CSS. It works fine against the repo tree, and the bare specifier is the real consumer entry.

### 3. Consumer smoke — **CONSUMER SMOKE PASSED** (the real proof)

`.scratch/phase15-consumer/`: vite 6 + React 18, four `file:` tarball deps, no Tailwind, no PostCSS config, no Griffel, no nx. `src/main.jsx` imports the theme CSS **once** and nothing else CSS-related — every component stylesheet arrives purely through the generated class maps' side-effect import. Production `vite build` (29.06 kB CSS / 2.90 kB gzip), served via `vite preview`, driven by Playwright/chromium:

```
brandTokenRaw:                "#0f6cbd"          (read live off the provider element)
buttonBackground:             "rgb(15, 108, 189)" === hexToRgb(brandTokenRaw)   ✓
dividerBefore borderTopStyle: "solid"  width: "1px"  color: "rgb(224, 224, 224)" ✓
dividerBefore content:        "\"\""   minWidth: "8px"                          ✓
buttonClasses:  "fui-Button fuicm-Button-module__root--p9Rg fuicm-Button-module__primary--xDMd"
dividerClasses: "fui-Divider fuicm-Divider-module__root--LP7J fuicm-Divider-module__default--6hQf"
pageerror/console errors: none
```

11/11 assertions pass. The `min-width: 8px` check is load-bearing: `@apply min-w-8` compiles to `calc(var(--spacing) * 8)` and silently yields `0px` if the theme artifact is missing — it proves the root-artifact split works end to end. Screenshot at `.scratch/phase15-consumer/smoke.png`.

**Defect found and fixed by this test:** the first `vite build` emitted `[WARNING] Expected identifier but found whitespace [css-syntax-error]`. My `dist/styles.css` banner contained the literal glob `src/**/*.module.css`, whose `**/` **terminates the CSS comment** — the remaining prose was being parsed as CSS in every package's stylesheet. Fixed by removing asterisks from the banner text and adding a runtime `assertNoPrematureCommentEnd()` guard (the package name is interpolated in, so a convention wasn't enough). Post-fix build is warning-free and gzipped CSS dropped 4.72 → 2.90 kB. _(An in-repo-only validation would never have caught this.)_

### 4. Regression — react-badge byte-identical

Baseline captured **before** any change, re-measured twice after (including after prettier formatting), via `.scratch/phase15/hash-out.js` (per-file sha256 + roll-up over `lib/`, `lib-commonjs/`, `dist/`):

```
before: files=104 rollup=7da8d855245d3a261a84e566a484eb9fd70318cff366b0eb200ea9a13feb217f
final : files=104 rollup=7da8d855245d3a261a84e566a484eb9fd70318cff366b0eb200ea9a13feb217f
IDENTICAL (per-file listing matches too)
```

AOT still runs for it: `💅 Griffel RAW styles output enabled` + `Processing griffel AOT with babel: 3 files`, unchanged.

### Supporting checks

- `tsc -p tools/workspace-plugin/tsconfig.lib.json --noEmit` — clean.
- `nx run workspace-plugin:lint` — 0 errors, same 6 pre-existing warnings as before my change, none in my files. All authored files prettier-clean (I formatted the three TS files; `executor.ts`/`babel.ts` were prettier-clean at HEAD, so the deviation was mine).
- `nx run workspace-plugin:test` — the build-executor spec's 5 Griffel-AOT / react-compiler snapshot tests **pass** (the fixture `greeter.styles.ts` genuinely imports `@griffel/react`, so nothing about it changed). Its single failure is a pre-existing Windows path-separator mismatch (`/` vs `\`) that aborts the test at its _first_ assertion, line 103, before reaching my code. **Proved pre-existing** by stashing only my two tracked executor files and re-running at HEAD: identical `1 failed, 4 passed, 5 snapshots passed`. The 10 other failing suites (generators, plugins, clean, assets) are the same class of POSIX-path assumption and are untouched by me.
- Unit tests: react-divider 33/33, react-provider passed, react-button 203 passed / 13 skipped.
- `graphify update .` run (144,650 nodes / 232,688 edges) per project CLAUDE.md.

---

## Deviations from the brief

1. **Added the theme root artifact** (`emit.css` + `build.js` + package.json wiring). Not an explicit deliverable, but validation 3 is impossible without it and the packages are non-functional without it. Kept minimal and nx-graph-safe.
2. **`hasCssModulesToProcess` predicate not exported** — `compileCssModules` self-guards on an empty glob, so a separate exported predicate would be dead code.

## Open questions / risks for the overseer

1. **`@fluentui/react-tailwind-theme` is `"private": true` at version `0.0.0`.** Real consumers cannot install it, so today they have no way to obtain the theme emission. D13 sanctions either publishing it or a suite-level convenience stylesheet — that packaging decision is unmade, and I deliberately did not settle it by side effect. **This is the one thing still blocking "a consumer can `npm install` these three packages and have them work."**
2. **Sourcemap drift:** the specifier rewrite lengthens one import line by 3 chars without regenerating `.js.map`. By the sourcemap format, only mapped columns _after_ the edit point _on that single line_ shift; in practice the specifier is the last mapped token on its line in both ESM and CJS output. Documented in-code; regenerating maps would mean re-running SWC.
3. **AMD (`lib-amd`, tag `ships-amd`)** gets the commonjs class-map shape plus a build warning. No converted package ships AMD; if one ever does, this needs real work.
4. **Stale `dist/styles.css`** if a package's last `*.module.css` is deleted — `cleanOutput` does not clean `dist/` (api-extractor owns it). nx's `{projectRoot}/dist` output covers cache restores, but a local incremental build would keep the orphan.
5. **`'use client'` placement changed for react-divider/react-provider CJS.** Previously `lib-commonjs` was transpiled from `lib` (Griffel path) and SWC had already moved the trailing eslint comment to line 2; now it's compiled straight from `src`, so line 1 reads `'use client'; // eslint-disable-line …`. The directive is still the first statement of the prologue and tests pass, but it is a real diff worth a glance.
6. **Concurrent sibling sessions** were editing `packages/react-conformance/*` (the `classname-overrides-win` test) and `react-tailwind-theme/css/tokens.css` + `scripts/generate-tokens-css.js` during my run. My files are disjoint; I did hit and resolve one collision — a duplicate `"scripts"` key in the theme `package.json` created when my edit landed on top of theirs. Worth re-reading that file before committing.
7. **RUNBOOK/ledger not touched** — per the runbook contract only the overseer writes those. Phase 1.5 boxes 1 and 2 are now satisfied.
8. **`.scratch/` retained** (`phase15/` evidence scripts, `phase15-consumer/` app + `node_modules`). Say the word and I'll clean it up.

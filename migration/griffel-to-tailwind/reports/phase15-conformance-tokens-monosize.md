# Conformance replacement, token registration, monosize CSS counting

_Phase 1.5, workflow wf_b6b62013-472, 2026-07-27._

## Conformance (classname-overrides-win)

## Headline: the brief's central premise was false, and it changed the design

The brief said _"they pass too — mergeClasses also appends consumer className last — prefer default-on if universally true."_ **It is not true.** `mergeClasses` accumulates non-atomic strings (static `fui-*` classes AND the consumer's `className`) into `resultClassName`, then returns `resultClassName + newClassName` where `newClassName` is the sequence hash + **atomic** classes — so the consumer's class lands in the _middle_.

Source: `node_modules/@griffel/core/mergeClasses.cjs.js` line 38 (`resultClassName += className + ' '`) and line 99 (`return resultClassName + newClassName`).

Empirically confirmed by rendering real components (temporary probes, since deleted):

| Component                            | State     | Rendered `class` attribute                                                                                            |
| ------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------- |
| `Badge` (unconverted)                | —         | `fui-Badge r1iycov <consumer> ___g1d9dq0_1moluvk ffp7eso f1phragk`                                                    |
| `Divider` (converted)                | —         | `fui-Divider fuicm-root fuicm-default <consumer>` ✅                                                                  |
| `Button` (converted)                 | —         | `fui-Button fuicm-root fuicm-secondary fuicm-rounded <consumer>` ✅                                                   |
| `ToggleButton` (unconverted sibling) | default   | `… fui-ToggleButton <consumer>` ✅ _(passes only by luck — emits no atomics unchecked)_                               |
| `ToggleButton` (unconverted sibling) | `checked` | `… fui-ToggleButton <consumer>` **+ 46 trailing classes** (1 sequence hash + 45 atomics, counted programmatically) ❌ |

**Two consequences:**

1. **Default-on is impossible.** It would break every unconverted Griffel component repo-wide, including all of v8 (`packages/react`, `packages/react-focus` also consume `@fluentui/react-conformance`). → **opt-in.**
2. **Package-wrapper-wide wiring is also unsafe.** `react-button` is _partly_ converted; the `checked` ToggleButton row above is exactly what a `src/testing/isConformant.ts` registration would newly break. → **per-component opt-in at the `isConformant({…})` call site.**

The `ToggleButton` default row is worth flagging: it passes today purely because an unchecked ToggleButton produces no atomics. That is a latent trap for anyone tempted to enable this test package-wide later — it's documented in both the module JSDoc and the `Button.test.tsx` comment.

## Placement decision: `@fluentui/react-conformance`, not a new package

Chose `packages/react-conformance` over a standalone `react-conformance-tailwind` package because: the test has zero Griffel/Tailwind/CSS-Modules dependencies (it is pure DOM inspection, which is precisely what `react-conformance` already does); every package running conformance already resolves it via tsconfig path aliases; and a new package would need build/api-extractor/nx/beachball scaffolding for one function. Registered as a **named export**, deliberately _not_ in `defaultTests` — `isConformant` iterates `Object.keys(defaultTests)` unconditionally, so `defaultTests` membership _is_ default-on. `react-conformance-griffel` was not touched.

## Design

`classNameOverridesWin` renders once with a consumer `className`, resolves the root via the existing `getTargetElement` (so `getTargetElement` overrides keep working), and asserts:

- (a) the consumer className is **present**;
- (b) **no class follows it** — equivalently, all the component's own classes precede it (the `clsx` contract);
- (c) the component contributed **at least one** class of its own — otherwise the test would pass _vacuously_ and silently hide the exact regression it replaces.

No computed-style assertions, per the brief: jest maps `*.module.css` to a class-name proxy, so jsdom has no stylesheet to resolve.

The assertion logic is split into a pure, module-internal `assertConsumerClassNameWins()` (not exported from the package index, so no public-API growth) so the **failure** paths are unit-testable — otherwise only the passing path could ever be exercised.

I also extracted the previously module-private `getTargetElement` helper from `defaultTests.tsx` into `src/utils/getTargetElement.ts` (made generic over `TProps`) rather than duplicating it. This is the one change touching a file every conformance test in the repo depends on, so I regression-tested it specifically (below).

## Validation evidence

All `--skip-nx-cache`.

**Tests / lint / type-check — the 3 converted packages + conformance + the unconverted control:**
| Project | Result |
|---|---|
| `react-conformance` | 4 suites, **36 passed** (6 new) |
| `react-divider` | 1 suite, **33 passed**, 14 snapshots |
| `react-button` | 9 suites, **203 passed**, 13 skipped |
| `react-provider` | 7 suites, **44 passed**, 12 snapshots |
| `react-badge` (unconverted control) | 3 suites, **68 passed** — no regression |

`nx run-many -t test,lint,type-check` over all five: **Successfully ran**. `generate-api` re-run clean with no tsdoc warnings.

**Negative control (the test has teeth).** Temporarily wired into unconverted `Badge`; it failed exactly as designed and then was reverted (`git checkout`, package re-verified clean at 68/68):

> _It appears that Badge renders class names AFTER the consumer's "className"… These class names come after conformance-consumer-classname: `___g1d9dq0_1moluvk`, `ffp7eso`, `f1phragk` … 2. If this component still composes with Griffel's mergeClasses(), use make-styles-overrides-win instead._

**`getTargetElement` extraction regression** — ran the packages that _override_ it: `react-tooltip` 21, `react-popover` 64, `react-drawer` 152, all passed.

## Deviation you need to sign off on: 11 react-divider snapshots renumbered

Adding any rendering conformance test to a component that calls `useId` shifts React 18's `useId` counter for every later render in that file. Divider's content-bearing snapshots carry `aria-labelledby="divider-_r_N_"`, so 11 of 14 shifted `_r_8_ → _r_9_`.

This is unavoidable (the test must render) and I verified it is **purely** id renumbering with a script, not a DOM/class change: 44 changed lines, 22 add / 22 delete, **every** changed line identical after normalizing `_r_N_` tokens, and **zero** changed lines lacking an id token. `react-button` and `react-provider` needed no snapshot updates.

This does technically break CONVERSION_GUIDE §5's "snapshot diffs must be empty" rule — flagging it explicitly rather than burying it. It is a one-time constant offset; the baseline is stable again afterward.

## Open items for the overseer

1. **Beachball change file** — `@fluentui/react-conformance` gains public API (`CLASSNAME_OVERRIDES_WIN_TEST_NAME`, `classNameOverridesWin`). This branch adds **zero** change files vs `master` (`git diff --name-only master...HEAD -- change/`), so I followed that convention and added none. If release notes are handled at PR time, nothing to do; otherwise one is needed. Note its `beachball.disallowedChangeTypes` forbids `major`/`prerelease`.
2. **RUNBOOK / ledger** — the Phase 1.5 checkbox "`classname-overrides-win` replacement conformance test (D9)" is now satisfiable, but RUNBOOK states _"Only the overseer writes the ledger,"_ so I left both untouched.
3. **Rollout policy for Phase 2** — the cookbook (§4) currently says to add "the replacement conformance test in the package's `isConformant` wrapper." Given the ToggleButton finding, that instruction is wrong for partly-converted packages. Suggest amending §4 to _per-component in the component's `.test.tsx`_, and revisiting a package-wrapper (or default-on) registration only in Phase 3 once no `mergeClasses` call sites remain.
4. **Not mine, do not attribute to me** — `git status` also shows a concurrent Phase 1.5 worker's edits: `dist/styles.css` `exports`/`files` entries in the three packages' `package.json`, plus `react-tailwind-theme/{package.json, css/index.css, build.js, css/tokens.css, css/emit.css, scripts/}`. I left all of them alone.
5. Prettier flags ~17 pre-existing files in `packages/react-conformance` (CRLF working-copy artifact — `types.ts` is flagged despite being unmodified). **My three new files pass Prettier**, and the `lint` target — what CI enforces — is green.

## Token registration (@theme inline)

## Outcome

Generated token registration is in place: **441 of 467 Fluent tokens** now have Tailwind utility names, compiling to **direct `var(--fluentToken)` references**, at **zero byte cost** to the shipped root artifact.

**Two probe findings reversed decisions I had already written**, both documented below.

---

## Files

| File                                                          | Status                                                                      |
| ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `.../react-tailwind-theme/scripts/generate-tokens-css.js`     | new — generator + `--check` verifier (435 lines)                            |
| `.../react-tailwind-theme/css/tokens.css`                     | new — generated, 33,489 B, 441 registrations                                |
| `.../react-tailwind-theme/css/index.css`                      | modified — `@import './tokens.css'` + corrected header                      |
| `.../react-tailwind-theme/package.json`                       | modified — description, `generate-tokens-css` / `verify-tokens-css` scripts |
| `.scratch/layer-probe/check3{,b,c,-final}.mjs`, `probe3.html` | new — probe harness                                                         |

`build.js` and `css/emit.css` in that package are **not mine** — see Concurrency below.

## Placement (justified)

`packages/react-components/react-tailwind-theme/scripts/`, not the repo-root `scripts/` workspace: that workspace holds published tooling packages (own package.json + build), heavyweight for one zero-dep file whose only consumer is this package. Colocating puts generator, artifact and verifier in one directory. Invoked as `node <script.js>` — no `.cmd` shim, no regex/paren args.

## Committed + verify (justified)

- The package has **no build step**; `@reference '#theme'` resolves to `css/index.css` **on disk**. A build-time `tokens.css` would be absent on a fresh clone, breaking every component module compile and jest run until the theme package built.
- Would require a `project.json`, which the adjacent `build.js` **explicitly decided against** (a CSS-only package can't satisfy the inferred lint/type-check/verify-packaging targets). I followed that precedent.
- Tokens change rarely, via PRs to `packages/tokens`; `--check` gives the same drift guarantee. Verified: tampering one key → exit 1 + actionable message; clean after regen.

Parsing is text-based (not `require('@fluentui/tokens')`) so a fresh clone can verify without building. Guarded: asserts the declaration shape, that all 467 values match `var(--x[, fallback])`, and that parsed count equals key-like line count.

## Namespace mapping

Every namespace was **read out of Tailwind v4.3.3's utility registry** (`node_modules/tailwindcss/dist/lib.mjs`), not assumed:

| Fluent          | n   | Namespace                     | Utilities                                                                  |
| --------------- | --- | ----------------------------- | -------------------------------------------------------------------------- |
| `color*`        | 366 | `--color-*`                   | `bg-` `text-` `border-` `fill-` `stroke-` `outline-` `ring-` `decoration-` |
| `shadow*`       | 12  | `--shadow-*`                  | `shadow-*`                                                                 |
| `borderRadius*` | 11  | `--radius-*`                  | `rounded-*`                                                                |
| `fontSize*`     | 10  | `--text-*`                    | `text-*`                                                                   |
| `lineHeight*`   | 10  | `--leading-*`                 | `leading-*`                                                                |
| `curve*`        | 9   | `--ease-*`                    | `ease-*`                                                                   |
| `duration*`     | 8   | **`--transition-duration-*`** | `duration-*`                                                               |
| `zIndex*`       | 8   | `--z-index-*`                 | `z-*`                                                                      |
| `fontWeight*`   | 4   | `--font-weight-*`             | `font-*`                                                                   |
| `fontFamily*`   | 3   | `--font-*`                    | `font-*`                                                                   |

**`duration` is the trap**: the utility's `themeKeys` is `["--transition-duration"]`, _not_ `--duration`. A `--duration-*` registration would have silently produced zero utilities.

zIndex fallbacks carried verbatim: `--z-index-popup: var(--zIndexPopup, 2000)` → `z-popup` → `z-index: var(--zIndexPopup, 2000)`.

Names are unique by construction (generator throws on collision). `font-*` serves both families (`base`/`monospace`/`numeric`) and weights (`regular`/`medium`/`semibold`/`bold`) — disjoint, verified.

## Excluded — 26 tokens

- **`spacingHorizontal*` / `spacingVertical*` (22)** — Tailwind's `--spacing-*` is **axis-agnostic**: registering `--spacing-horizontal-m` yields a correct `px-horizontal-m` _and_ a nonsensical `py-horizontal-m`, with no way to restrict either. It's also the namespace `--spacing-*: initial` deliberately empties so numeric utilities read px via `--base-scale` (D4). The probe-verified `px-(--spacingHorizontalM)` shorthand already covers the need with zero registration.
- **`strokeWidth*` (4)** — no namespace fits. Border widths are bare numbers in v4 (`border-2`, no `--border-width-*`), and the only width namespace that exists, `--stroke-width-*`, drives **SVG** `stroke-width`. Author as `border-(length:--strokeWidthThin)`.

## Two reversals (probe-driven)

**1. `@theme inline reference` → `@theme inline`.** I initially chose `reference` to kill the dead alias. Isolating the mechanism (`check3c.mjs`) showed:

- `inline` alone emits an alias **only** when a utility references it _by name_ (`bg-(--color-neutral-background-1)`). The normal value form needs none.
- Under `source(none)` — which the package mandates anyway — that never happens: **0 aliases**, byte-identical to `reference`.
- `reference` suppresses the alias **even when a by-name reference needs it**, emitting `background-color: var(--color-neutral-background-1)` against an undefined variable — **silently broken CSS**. Rejected; `inline` self-heals.

The brief's premise ("the inline form still emits the alias") was an artifact of the original probe lacking `source(none)`: auto-scan read the literal string out of `entry2.css`/`out2.css` and generated a by-name utility.

**2. `rounded-none` / `ease-linear` are NOT shadowed.** I had written that Tailwind's static utilities win. Compiling proved the opposite — the **Fluent token wins** (`var(--borderRadiusNone)`, `var(--curveLinear)`). Both are value-equivalent to the static they displace, so no visual change. Header corrected.

## Dead-alias bytes — measured

|                                      | raw         | gzip      |
| ------------------------------------ | ----------- | --------- |
| Root artifact **without** tokens.css | 1,515 B     | 454 B     |
| Root artifact **with** tokens.css    | **1,515 B** | **454 B** |
| **Delta**                            | **0**       | **0**     |

Emitted `@layer fui.theme` contains only `--base-scale` and `--spacing`; **0 of 441** registrations reach output.

A self-inflicted regression caught en route: my first header used `/*!` (a **bang** comment, preserved by minifier contract), which put **4,390 raw / 1,639 gzip bytes** of rationale into a 1,515-byte artifact. Switched to plain `/*` (stripped by Tailwind) and cut the shipped header to 1,032 B of provenance + two load-bearing warnings; full rationale lives in the generator source. Net: 0 bytes.

## Import order is load-bearing

`@import './tokens.css'` **must** follow the `@theme static` block. Placed before, `--color-*: initial` (and friends) wipe the registrations — probe-verified: **12 sampled utilities stopped compiling**, silently. Tailwind accepts `@import` after a rule with no error, so nothing warns you. Documented in both files.

## Validation

- **22 sampled utilities** across all 10 namespaces → **21 direct PASS**. Brief's three: `bg-neutral-background-1` → `background-color: var(--colorNeutralBackground1)`; `text-base-300` → `font-size: var(--fontSizeBase300)`; `shadow-8` → `--tw-shadow: var(--shadow8)`. The 1 "FAIL" is a **matcher artifact** — the theme's `hover` custom variant appends `:where(:hover)` before the brace; confirmed compiling correctly by direct inspection.
- **Palette zeroing intact**: `text-red-500`, `bg-blue-500`, `font-sans`, `rounded-lg`, `shadow-md`, `text-2xl`, `leading-tight` — all 7 dead.
- **Divider suite: 33/33 tests, 14/14 snapshots** — identical **with** and **without** my change (A/B'd by reverting to backup and restoring). Jest provably unaffected.
- Prettier clean on all four changed files. Drift guard exits 1 on tamper.
- `graphify update .` run: 144,642 nodes / 232,680 edges.

## Concurrency warning (needs overseer attention)

Another agent is **actively working in this same package and the divider package**. It created `build.js` + `css/emit.css` (the CSS-emission Phase 1.5 item) and edited `Divider.test.tsx` / `library/package.json` / the divider `.snap` mid-session.

This produced a false alarm worth recording: my first divider run showed **11 snapshot failures**. They were caused by that agent adding an `extraTests` conformance test, which renders extra components and shifts React's `useId` counter (`_r_k_` → `_r_l_`); it then ran `jest -u` at 21:45:01, mid-experiment. Not my change — proven by A/B. **I verified my `index.css` diff contains only my own edits** (nothing of theirs clobbered), and their `emit.css` is `@import './index.css' source(none);` — exactly the entry form my final probe compiled.

## Open items for the overseer

1. **`DECISIONS.md` D4 and `CONVERSION_GUIDE.md` are now stale.** D4 states "Tokens are **never** registered in Tailwind `@theme`"; the cookbook says "never put them in `@theme`". This user-settled work supersedes both. I did not edit migration docs — the overseer owns them. Suggested amendment: tokens are registered via `@theme inline` **only**; plain `@theme` remains forbidden; literal `var(--tokenName)` stays valid and unchanged.
2. **`--check` is not wired to a CI target** — deliberate, matching `build.js`'s documented decision not to add a `project.json` here. Exposed as `yarn verify-tokens-css`; wire it when that packaging decision is made.
3. **`--ease-*` is not zeroed** in index.css, so Tailwind's `ease-in`/`ease-out`/`ease-in-out` remain alongside Fluent's `ease-*`. I left the reset list untouched (the guarantee is scoped to the _palette_, and these are CSS spec keywords with no Fluent name collision). Flagging in case strict vocabulary purity is wanted.
4. Nothing committed, per brief.

## monosize js+css

## Facts gathered before changing anything

- `node_modules/monosize/dist/utils/readConfig.mjs`: `KNOWN_ASSET_TYPES = ['js', 'json', 'css']`, `DEFAULT_ASSET_TYPES = ['js']` — confirms CSS is a valid but off-by-default asset type.
- `node_modules/monosize-bundler-webpack/dist/runWebpack.mjs`: the base webpack config has **no** module rule for `.css` at all — any `.css` import throws "You may need an appropriate loader" without a fix.
- `node_modules/webpack/package.json`: installed webpack is `5.108.4`, well above the `5.72` floor where `experiments.css` (native CSS support, no `css-loader` needed) became available.
- `packages/react-components/react-divider/library/package.json` and `react-button/library/package.json` already have `sideEffects: ["**/*.css"]` and a `"./styles.css"` export — the CSS-emission workstream mentioned in the brief had already landed; `dist/styles.css` and the generated `lib/**/*.module.css.js` class-map (which does `import "../../../dist/styles.css"`) already existed for both packages before I touched anything.
- `tools/workspace-plugin/src/plugins/workspace-plugin.ts` (`buildBundleSizeTarget`): the `bundle-size` nx target runs `monosize measure` with `cwd: projectRoot` and depends on `build`, so `yarn nx run <pkg>:bundle-size` rebuilds (regenerating `dist/styles.css`) before measuring.
- `node_modules/monosize/dist/commands/measure.mjs` (`measureFixtureFromOutputDir`): reads files **non-recursively** from each fixture's own output dir and buckets by extension against `assetTypes` — confirms the "CSS must land beside `index.js`" requirement from the brief, and that `output.cssFilename` must mirror `output.filename`'s pattern (`'index.js'` → `'index.css'`; multi-entry `'[name]/index.js'` → `'[name]/index.css'`).

## Change made

`monosize.config.mjs` — added inside the `webpackBundler` config-enhancer callback:

```js
config.experiments = { ...config.experiments, css: true };
config.output = { ...config.output, cssFilename: (config.output?.filename ?? '[name].css').replace(/\.js$/, '.css') };
```

plus `assetTypes: ['js', 'css']` on the top-level config. This is the only source diff (`git diff --stat`: `monosize.config.mjs | 22 ++`). No fixture files needed edits — `Divider.fixture.js` / `Button.fixture.js` etc. already `import { X } from '@fluentui/react-x'`, and once webpack could parse `.css` the existing side-effect import chain (component → generated `.module.css.js` → `dist/styles.css`) just worked.

## Results

Ran `yarn nx run react-divider:bundle-size --skip-nx-cache`, `react-button:bundle-size --skip-nx-cache`, `react-badge:bundle-size --skip-nx-cache`. Each rebuilt the package first (CSS Modules compiled, `dist/styles.css` emitted), then `monosize measure` logged `Asset types: css, js` and produced a `css` bucket in `assets` for the two converted packages.

**react-divider** (baseline was JS-only, from `migration/griffel-to-tailwind/metrics/baseline/monosize-react-divider.json`):
| Fixture | baseline (js) min/gz | after js min/gz | after css min/gz | after combined min/gz | Δ combined |
|---|---|---|---|---|---|
| Divider | 15,077 / 5,398 B | 3,467 / 1,456 B | 6,711 / 1,259 B | 10,178 / 2,715 B | −4,899 B (−32.5%) min, −2,683 B (−49.7%) gz |

**react-button**:
| Fixture | baseline (js) min/gz | after js min/gz | after css min/gz | after combined min/gz | Δ combined |
|---|---|---|---|---|---|
| Button | 32,675 / 8,499 B | 4,965 / 1,992 B | 20,058 / 2,431 B | 25,023 / 4,423 B | −7,652 (−23.4%) min, −4,076 (−48.0%) gz |
| CompoundButton | 39,553 / 9,853 B | 16,683 / 5,581 B | 20,058 / 2,431 B | 36,741 / 8,012 B | −2,812 (−7.1%) min, −1,841 (−18.7%) gz |
| MenuButton | 37,621 / 9,890 B | 14,753 / 5,610 B | 20,058 / 2,431 B | 34,811 / 8,041 B | −2,810 (−7.5%) min, −1,849 (−18.7%) gz |
| SplitButton | 46,572 / 11,521 B | 23,700 / 7,400 B | 20,058 / 2,431 B | 43,758 / 9,831 B | −2,814 (−6.0%) min, −1,690 (−14.7%) gz |
| ToggleButton | 52,331 / 10,633 B | 29,461 / 7,641 B | 20,058 / 2,431 B | 49,519 / 10,072 B | −2,812 (−5.4%) min, −561 (−5.3%) gz |

The `css` asset is identical (20,058 / 2,431 B) across all five Button fixtures because they all pull in the same `react-button/dist/styles.css` — Button's own converted stylesheet — regardless of which composite component is the fixture entry (CompoundButton/MenuButton/SplitButton/ToggleButton stay Griffel per the mixed-mode pilot decision but still import Button's compiled CSS transitively). Per D10, these combined numbers are the tool's own per-file-gzip sum (each asset gzipped independently, then summed) — not a subtraction-derived estimate, and not the gzip of the concatenated output.

**react-badge** (unconverted control): `Badge`, `CounterBadge`, `PresenceBadge` all produced **byte-identical** `minifiedSize`/`gzippedSize` to `migration/griffel-to-tailwind/metrics/baseline/monosize-react-badge.json` (delta 0 on every field), and the `assets` map has only a `js` key — no `css` key appears, confirming `measureFixtureFromOutputDir` only adds an asset-type bucket when a matching file exists, so `assetTypes: ['js','css']` is safe for unconverted packages and doesn't inject a spurious zero-size CSS entry.

## Scope check

`git status --porcelain` limited to the touched paths shows only `monosize.config.mjs` as a file I changed. The generated `dist/bundle-size/monosize.json` outputs are gitignored (`.gitignore:64: dist`) build artifacts, not tracked. Other modified files visible in `git status` (`migration/griffel-to-tailwind/CONVERSION_GUIDE.md`, `react-button`/`react-divider` `library/package.json`, `Button.test.tsx`, `Divider.test.tsx`, its snapshot) pre-date this task — they're the CSS-emission workstream's changes (`sideEffects`, `exports["./styles.css"]`, generated class-map wiring) that the brief said already landed; I did not touch them.

## Notes / deviations

- No fixture import-path adjustments were needed (brief anticipated this might be necessary) — the existing fixtures (`import { Divider } from '@fluentui/react-divider'`, `import { Button } from '@fluentui/react-button'`, etc.) already resolve through the package's `module` field into the ESM class-map chain; enabling `experiments.css` was sufficient.
- Did not touch `migration/griffel-to-tailwind/ledger.json` or check off the RUNBOOK Phase 1.5 checklist item — per `RUNBOOK.md`'s orchestration model ("Only the overseer writes the ledger"), that's Fable's/the overseer's job, not a worker's.
- Kicked off `graphify update .` per the project `CLAUDE.md` post-modification rule; it exceeded the 120s foreground timeout and was moved to background (task id `bgirt0sf4`) — it's index maintenance only and doesn't gate this task's deliverables, which are already verified above.
- Did not run `yarn install` at repo root, and made no commits, per the brief's constraints.

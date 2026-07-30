# Griffel Zero — cross-repo master plan

**Date:** 2026-07-30 · **Status:** plan, no code changed · **Scope:** two repos

| repo                                              | branch                         | role                                                                        |
| ------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------- |
| `C:/Users/ArrayKnight/Code/fluentui`              | `styling/tailwind-css-modules` | Tailwind + CSS Modules migration, contract in `reports/DECISIONS.md` D1–D16 |
| `C:/Users/ArrayKnight/Code/fluentui-system-icons` | `master` (fresh fork)          | `@fluentui/react-icons` source, `packages/react-icons`                      |

## 0. What changed since `griffel-elimination-evaluation.md`

That evaluation's verdict was **"CONDITIONAL YES for source, PERMANENT NO for the installed
dependency graph"**, resting on one premise: `@fluentui/react-icons` is external, ships
`@griffel/react` in `dependencies`, and no in-repo action changes what consumers install. It
therefore recommended D18 option **(a) accept permanently**, and recorded D2a5 (unlayered rules
for `:global(.fui-Icon-*)`) as a permanent feature of the dialect.

**The user forked the icons repo. D18 flips from (a) accept to (c) CONVERT VIA FORK.** The
consequences are not cosmetic:

1. **`yarn why @griffel/core` can return empty.** The evaluation §6 "Dependency end-state" says
   `@griffel/core` + `@griffel/react` + `@griffel/style-types` (~2.4 MB) stay installed for every
   consumer via `@fluentui/react-icons → @griffel/react`. That is the last transitive edge. Cut it
   and "zero Griffel" becomes literally true rather than a claim about `packages/**/src`.
2. **The 5,218 B gzip per-consumer Griffel runtime tax goes away.** (Evaluation §4: esbuild,
   react external, minified+gzipped, for exactly the `{ __styles, makeStaticStyles, mergeClasses }`
   set react-icons reaches. 37.5% of the full `@griffel/react` namespace, on the path of every
   icon module, not tree-shakeable.)
3. **D2a5 stops being permanent.** D2a5's own scope clause (`DECISIONS.md:387`) reads: _"Permanent
   for `@fluentui/react-icons` (D11 keeps it on Griffel, so nothing will ever move those atomics
   into a layer)."_ The fork is exactly the thing that moves those atomics into a layer. The **62
   `:global(.fui-Icon-*)` selector lines across 14 `.module.css` files** become retirable, and the
   proposed "promote the grep to a lint rule" hardening in the evaluation's D18 recommendation
   becomes unnecessary rather than mandatory.

**But the fork is only worth doing if it is publishable and the upstream can accept it.** A fork
that only this monorepo consumes reproduces the evaluation's own argument against option (b): a
repo whose VR baselines are gathered against a package no consumer has. §1.6 and D24 below make
the publishing question a first-class decision, not an afterthought.

---

## 1. Icons-fork workstream

### 1.0 Headline finding: the replacement already exists in the repo

`packages/react-icons/src/headless/` is a **complete, shipped, Griffel-free implementation** of the
icon factories. It is not a sketch:

| file                           | what it does                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| `headless/createFluentIcon.ts` | same signature as `utils/createFluentIcon.ts`, no `useRootStyles`, `cx` not `mergeClasses`  |
| `headless/bundleIcon.tsx`      | applies `data-fui-icon-hidden` to the inactive variant instead of Griffel show/hide classes |
| `headless/useIconState.tsx`    | sets `data-fui-icon-rtl` instead of a Griffel `transform: scaleX(-1)` class                 |
| `headless/shared.ts`           | `cx()` (7-line class joiner), re-exports the `fui-Icon-*` constants from `utils/constants`  |
| `headless/styles.css`          | the entire icon stylesheet, 6 rules                                                         |
| `headless/fonts/styles.css`    | the four `@font-face` blocks, relative URLs so bundlers pull the font files                 |
| `headless/utils.ts`            | mirrors `@fluentui/react-icons/utils` for build transforms                                  |
| `headless/index.ts`            | `./headless` entry, re-exports contexts + factories + constants                             |

It is already wired end to end: `scripts/build.js` copies the CSS into `lib/` and `lib-cjs/` and
calls `addHeadlessExportMap()` to inject `./headless`, `./headless/svg/*`, `./headless/fonts/*`,
`./headless/styles.css` and the `sideEffects` entries into the published manifest; the
`@fluentui/react-icons-atomic-webpack-loader` already exposes `headless: boolean`;
`packages/react-icons-file-type` has the same headless split; `docs/headless.md` and the docsite's
`Icons/Headless` pages document it as a supported (preview) surface; `headless.test.tsx` covers it;
four monosize fixtures measure it (`headless-bundle`, `headless-svg`, `headless-fonts`,
`dynamic-headless-bundle`).

`scripts/build.js:193` states the intent explicitly:

> `NOTE: will be part of package.json once headless is stable. then we can remove this dynamic addition and the related build logic that copies headless assets.`

**So the icons workstream is not "design a Griffel replacement". It is "promote the existing
headless implementation from an alternate entrypoint to the default one, and delete the Griffel
one."** That reframing is what makes this tractable inside a batch regime.

### 1.1 Design options, evaluated against the documented constraints

The evaluation asked for a design bake-off. Here it is, scored against every constraint the icons
repo documents.

**Option A — promote headless (data attributes + shipped static CSS).** `data-fui-icon`,
`data-fui-icon-rtl`, `data-fui-icon-hidden`, `data-fui-icon-font="filled|regular|resizable|light"`,
plus the unchanged `fui-Icon*` classes, styled by a shipped `styles.css`.

**Option B — static CSS file with fixed class names.** Same stylesheet, but the factories emit
`fui-Icon-hidden` / `fui-Icon-rtl` classes rather than data attributes.

**Option C — inline `style` objects on the element.** No stylesheet at all; `display`,
`line-height`, `transform` written as React inline styles.

**Option D — CSS Modules authored in fluentui's Tailwind dialect.** Import `.module.css` from the
icon factories, compiled at package build time per fluentui's D1.

| constraint (as documented)                                                                                                                                                        | A                                                                                                                                                                                                                 | B                                   | C                                                                                  | D                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **1 kB monosize threshold** (`monosize.config.mjs`, `threshold: '1kB'`, absolute per fixture; the pin doc cites it as the reason Griffel is held at 1.6.1)                        | **Passes with headroom.** Measured −5.135 kB min for SVG inline with CSS extraction, −70% for fonts. Already measured by 4 live fixtures.                                                                         | same order of magnitude, unmeasured | Probably passes; adds a per-render object, removes the stylesheet                  | Unmeasured; adds a CSS-Modules build step to a package that has none                              |
| **TypeScript 4.1.6** (allowlisted exception, `single-version-policy.md:27`; the _stated_ reason Griffel cannot move past 1.6.1)                                                   | **Removes the constraint's teeth.** `cx()` and data attributes are ES5-era types; the TS 4.1.6 pin stops being coupled to a dependency's `.d.ts` dialect                                                          | same                                | same                                                                               | same for types, but CSS Modules typing under TS 4.1.6 needs an ambient `*.module.css` declaration |
| **SSR determinism**                                                                                                                                                               | **Best.** Zero runtime style insertion — nothing to hydrate, no `<style>` ordering, no nonce. The only SSR-sensitive path left is color-icon `idPrefix`, already documented as `React.useId()` in `README.md:178` | same                                | same                                                                               | same                                                                                              |
| **RTL via `IconDirectionContext`**                                                                                                                                                | **Unchanged.** `core/useBaseIconState.ts` already resolves `isRtlFlip` from `useIconContext()` for both APIs; only the _expression_ of the flip differs                                                           | unchanged                           | unchanged                                                                          | unchanged                                                                                         |
| **`atomic-webpack-loader` coupling**                                                                                                                                              | **Already supports it** (`headless: boolean` option, `headless/svg` + `headless/fonts` targets). Promotion means the option's default flips or the option disappears                                              | new mapping needed                  | no coupling                                                                        | no coupling                                                                                       |
| **font-subsetting plugin** (relies on `resolve.conditionNames: ['fluentIconFont']` + `optimization.usedExports`; `@font-face` currently emitted by `makeStaticStyles` at runtime) | `fonts/styles.css` moves `@font-face` to a real CSS file with relative URLs, which the plugin's README already documents as the headless path                                                                     | same                                | **Fails** — `@font-face` cannot be an inline style; needs a stylesheet regardless  | works                                                                                             |
| **svg-sprite-subsetting plugin** (operates on `<symbol>` ids in `atoms/svg-sprite/*.svg`, not on class output)                                                                    | **No coupling to class shape.** But `headless/svg-sprite` atoms are conditionally generated and `docs/headless.md:72` says headless sprites are not published — a real gap to close                               | same gap                            | same gap                                                                           | same gap                                                                                          |
| **`fui-Icon-filled` / `fui-Icon-regular` class contract** (fluentui targets it in 62 rules; `AGENTS`-level docs teach `bundleIcon` + these classes)                               | **Preserved.** `headless/bundleIcon.tsx` still applies `iconFilledClassName`/`iconRegularClassName` from the same `utils/constants.tsx`                                                                           | preserved                           | preserved                                                                          | preserved                                                                                         |
| **eslint** (`eslint.config.base.mjs` `griffel()` helper registers `@griffel/eslint-plugin` for `**/*.{ts,tsx}`)                                                                   | `griffel()` helper and the root `@griffel/eslint-plugin` devDep both delete                                                                                                                                       | same                                | same                                                                               | same                                                                                              |
| **API Contract** (`IconsAPIContract.mdx`: no strict semver; only icon removal/rename are sanctioned non-major breaks)                                                             | **Requires renegotiation** — see D26. A styling-mechanism change is neither of the two sanctioned categories                                                                                                      | same                                | same, plus it silently breaks every consumer stylesheet that overrides icon layout | same                                                                                              |

**Recommendation: Option A, promote headless to default.** It is the only option that is already
implemented, already documented, already covered by tests and bundle-size fixtures, and already has
loader support. Options B–D are all _rewrites of a thing that exists_, and none of them clears a
constraint that A does not.

Two caveats that A must answer and the others would not:

- **`style-loader` regression.** `bundle-size-rendering-approaches-comparison.md:50-58` is explicit:
  without `MiniCssExtractPlugin`, headless **font** icons are **+1,344 B min (+13.2%)** because
  webpack's `css-loader` + `style-loader` runtime outweighs Griffel's. SVG inline is roughly
  break-even (−0.098 kB min). The doc's own takeaway is _"With webpack's default `style-loader`
  mode, prefer the Griffel variant"_ — a sentence that cannot survive Griffel's deletion. Promotion
  must either (i) accept the regression for `style-loader`-only font consumers and rewrite that
  guidance, or (ii) ship the base CSS as a tiny inlineable string for that one case. See **D25**.
- **`wrapIcon` is absent from headless by design** (`headless/utils.ts`: _"`wrapIcon` is
  intentionally not provided by the headless API. Importing it via a headless transform is accepted
  breakage."_). That is fine as a preview-surface caveat and irrelevant to fluentui (**0**
  `wrapIcon` references there), but it is not fine for a _default_ API that has shipped `wrapIcon`
  from `@fluentui/react-icons/utils` for years. Promotion requires porting `wrapIcon` — it is 20
  lines and needs no styling, only `useIconState`. Non-negotiable prerequisite.

### 1.2 The layering question — this is what un-permanents D2a5

`headless/styles.css` is **unlayered** plain CSS, and its file header explains why the base rule is
wrapped in `:where()`:

> `Wrapping it in :where() gives it ZERO specificity so any class-based styling always wins,
regardless of stylesheet injection order.`

That reasoning was written for _coexistence with Griffel_ (the two APIs shipping side by side).
Once Griffel is gone it is under-powered for fluentui's purposes, because of the exact rule D2a5
was written about: **cascade layers are compared before specificity, so a layered fluentui rule
loses to an unlayered icons rule no matter how specific it is.** Concretely:

```
[data-fui-icon-hidden] { display: none }                         unlayered, 0-1-0
.fuicm-Button-module__subtle--Fp5L:where(:hover) .fui-Icon-filled  @layer fui.components.l1, 0-2-0
                                                                 ← still LOSES
```

`:where()` on the _base_ rule solves nothing here: the contentious rule is
`[data-fui-icon-hidden]`, which is deliberately not `:where()`-wrapped (it has to beat the base
`display: inline`).

So retiring the 62 unlayered blocks requires the icons stylesheet to be **layered below
`fui.components`**. Two mechanisms, both viable:

- **(i) Icons ships the layer.** Wrap `styles.css` in `@layer fluent.icons { … }` — or publish
  `styles.css` (unlayered, back-compat) alongside `styles.layered.css`. Self-contained; every
  consumer benefits; but it imposes a layer name on the whole ecosystem and is a real behavior
  change for existing headless adopters.
- **(ii) fluentui imports it into a layer.** `@import '@fluentui/react-icons/headless/styles.css'
layer(fui.base);` from fluentui's single root theme artifact (D13 already establishes that one
  root artifact exists and that per-package emission is forbidden). Zero icons-repo change; but it
  only fixes fluentui, and it depends on `@import ... layer()` support in whatever bundles the root
  artifact.

**Recommendation: do (ii) first, keep (i) as the upstreamable improvement.** (ii) is reversible,
fluentui-local, requires no coordination, and is the thing that actually lets the 62 rules move
into `fui.components.l*`. (i) is the right long-term shape for the ecosystem and is the natural
content of the upstream PR. This is **D27**.

Note the ordering dependency this creates: **the 62 unlayered blocks cannot be retired until both
(a) fluentui consumes a headless-default icons build and (b) the layering mechanism is in place.**
Retiring them earlier reproduces the react-button bug the D2a5 postmortem documents, and VR will
not catch it (that postmortem's whole point).

### 1.3 Work breakdown in the icons repo

| step   | scope                                                                                                                                                                                                                                                                                                                                                                                                          | files                                                                                                                              |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **I0** | **Close the headless gaps.** Port `wrapIcon` into `headless/`; generate + publish `headless/svg-sprite` atoms so the sprite path is not orphaned; add a headless `createFluentIcon.svg-sprite`                                                                                                                                                                                                                 | `src/headless/wrapIcon.tsx`, `src/headless/createFluentIcon.svg-sprite.tsx`, `scripts/build.js` conditional at `:231`              |
| **I1** | **Parity gate.** Extend `headless.test.tsx` + `build-verify` so every assertion the Griffel API is under has a headless twin; add monosize fixtures so _every_ Griffel fixture has a headless counterpart (currently 4 of 12)                                                                                                                                                                                  | `src/headless/headless.test.tsx`, `bundle-size/*.fixture.js`                                                                       |
| **I2** | **Promote.** Make `utils/*` re-export the headless implementations; delete `*.styles.ts`; delete the `@griffel` babel preset step in `scripts/build.js:100-133`; fold the dynamic `addHeadlessExportMap` entries into the static `package.json` `exports`                                                                                                                                                      | 9 files under `src/utils/`, `scripts/build.js`                                                                                     |
| **I3** | **Fonts.** Replace the `makeStaticStyles` `@font-face` block with `fonts/styles.css`; decide the `style-loader` guidance rewrite (**D25**)                                                                                                                                                                                                                                                                     | `src/utils/fonts/createFluentFontIcon.styles.ts` (delete), `.tsx` (repoint), `docs/bundle-size-rendering-approaches-comparison.md` |
| **I4** | **`react-icons-file-type`.** Same promotion; it already has `src/headless/FileTypeIcon.tsx` and `sideEffects: ['**/headless/styles.css']`                                                                                                                                                                                                                                                                      | `src/FileTypeIcon.styles.ts`, `package.json`                                                                                       |
| **I5** | **Dependency + tooling purge.** Drop `@griffel/react` from both packages' `dependencies`; drop the root `resolutions` block; drop root devDeps `@griffel/babel-preset`, `@griffel/eslint-plugin`, `@griffel/react`, `@griffel/webpack-extraction-plugin`, `@griffel/webpack-loader`; delete the `griffel()` helper from `eslint.config.base.mjs` and its call sites; convert `icon-app`'s 2 `makeStyles` files | `package.json` (root + 2), `eslint.config.base.mjs`, 4 `eslint.config.mjs`, `packages/icon-app/src/{app,shared}.tsx`               |
| **I6** | **Docs.** Rewrite `docs/headless.md` (it becomes "the API", not "an alternative"), the `RenderingApproaches.mdx` Griffel column, `IconsDescription.md`, `IconsHeadless.md`, `single-version-policy.md`'s install-time-overrides section, and the `Headless` docsite section                                                                                                                                    | ~8 md/mdx files                                                                                                                    |
| **I7** | **Publish.** Per **D24** below                                                                                                                                                                                                                                                                                                                                                                                 | `package.json` name/version, release workflow                                                                                      |

### 1.4 The pin renegotiation (`single-version-policy.md`)

The pin doc's closing line is the plan's authority to act:

> _"Remove these overrides once the packages move off TypeScript 4.1.6 and the bundle cost has been
> re-measured."_

I5 satisfies it in the stronger form — the packages move off _Griffel_, so both stated reasons
become moot at once:

- **Reason 1 (types).** Nothing left whose `.d.ts` TS 4.1.6 must parse. The `typescript@4.1.6`
  allowlist entry can _stay_ (it is about the declarations react-icons **emits** for legacy
  consumers, a separate contract) but it stops blocking anything.
- **Reason 2 (bundle size).** The `FileTypeIcon` fixture's ~1.1 kB Griffel-upgrade cost becomes a
  measurement of a package that no longer has Griffel. The 1 kB threshold survives unchanged — and
  I1's headless fixtures are exactly what it should be gating instead.

**The 1 kB threshold does not need renegotiating; it needs re-pointing.** That distinction matters:
the threshold exists because the headless fixtures are small enough that a 10% relative default is
too tight (`monosize.config.mjs` comment). Post-conversion, _every_ fixture is small, so the
absolute threshold becomes more load-bearing, not less. Recorded as **D28**.

### 1.5 Validation strategy in the icons repo

The icons repo has no VR harness — that is the single biggest methodological difference from the
fluentui regime, and it must be stated rather than papered over. What it has instead:

| gate                                                      | what it proves                                                        | run by                                 |
| --------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------- |
| `yarn deps:check` (syncpack)                              | single-version policy, no stray devDeps outside root                  | `pr.yml` "Single Version Policy Check" |
| `nx affected -t lint` (`@nx/dependency-checks`)           | each publishable package declares exactly the runtime deps it imports | `pr.yml` "Lint"                        |
| `nx affected -t type-check:infra`                         | infra typechecks under root TS 5.0.4                                  | `pr.yml` "Type Check Infra"            |
| `yarn build` + `build-verify` (vitest)                    | metadata integrity, build transforms, color render                    | `pr.yml` "Build"                       |
| `nx affected -t test` (vitest, incl. `headless.test.tsx`) | behavior parity                                                       | `pr.yml` "Test"                        |
| `nx affected -t bundle-size` + `monosize compare-reports` | **1 kB absolute per-fixture regression vs the base branch**           | `pr.yml` "Bundle-Size"                 |
| docsite storybook artifact                                | manual visual check — the closest thing to VR                         | `pr.yml` artifact upload               |

**The icons-repo equivalent of fluentui's "VR diff clean" gate is: `headless.test.tsx` parity +
monosize `compare-reports` green + a manual pass over the `docsite-storybook-build` artifact.**
That is weaker than VR and should be written into the PR as a known limitation. Two mitigations
worth the cost:

1. **Use fluentui as the visual harness.** fluentui _has_ the VR suite and **250 `bundleIcon`
   call sites**. Wiring the forked build into fluentui (§2) and running the existing VR sets is a
   stronger visual gate than anything the icons repo can run on its own. This makes the two
   workstreams interleave rather than serialize — see §5.
2. **Add a Playwright DOM-assertion test** for the four behaviors the stylesheet owns
   (`display` on bundled pairs, `transform` under RTL, `forced-color-adjust` under
   `forced-colors: active`, font-family per variant). `playwright` is already a root devDep and
   `pr.yml` already installs chromium.

### 1.6 Publishing the fork

Three mechanisms, and the choice determines whether the migration's claims are honest (**D24**):

| mechanism                                                                                                            | fluentui gets a real install? | consumers benefit? | reversible? | cost                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| **(1) `resolutions` override to a git dependency**                                                                   | yes (git tarball)             | **no**             | trivially   | fastest; but reproduces the evaluation's own objection to option (b) — testing what nobody ships                         |
| **(2) yarn `portal:`/workspace link during development, `resolutions` for CI**                                       | yes                           | no                 | trivially   | good for the inner loop, not a shipping story                                                                            |
| **(3) publish under a scoped name** (e.g. `@arrayknight/fluentui-react-icons`) **+ `resolutions` alias in fluentui** | yes (npm)                     | **yes**            | yes         | requires npm publish rights, a name decision, and an alias entry in 39 fluentui manifests or one root `resolutions` line |
| **(4) upstream PR to `microsoft/fluentui-system-icons`**                                                             | eventually                    | yes                | n/a         | unbounded timeline; the evaluation already flagged this as out of the fork's control                                     |

**Recommendation: (2) during development → (3) for the PR → (4) as the standing intent.** (3) with
a single root `resolutions` alias (`"@fluentui/react-icons": "npm:@arrayknight/fluentui-react-icons@^2.0.334"`)
avoids touching 39 manifests and keeps the declared ranges honest. File (4) as a tracking issue on
day one and keep the fork's diff shaped as an upstreamable PR — which the headless-promotion
framing already does, since it is upstream's own stated direction (`scripts/build.js:193`).

---

## 2. fluentui-side integration

### 2.1 Consuming the forked icons

fluentui declares `@fluentui/react-icons` in **39 manifests**: `^2.0.245` ×36, `^2.0.306` ×1,
`^2.0.239` ×1, `^2.0.237` ×1. The fork is at **2.0.334**. Under the alias approach the declared
ranges stay as they are and a single root `resolutions` entry redirects them all.

fluentui's actual API surface against react-icons is narrow — **250 `bundleIcon`**, **3
`IconDirectionContextProvider`**, and **zero** `wrapIcon` / `createFluentIcon` / `useIconState`.
Every one of those is present in `headless/index.ts` today. **There is no fluentui-side API
migration.** The only integration work is:

1. the `resolutions` alias (1 line),
2. **the CSS import** — the one genuinely new obligation. `docs/headless.md:27` is emphatic:
   _"You **must** import the headless CSS file — this is the key difference from the standard API,
   which injects styles at runtime."_ fluentui must add it to the root theme artifact (D13's single
   root artifact is the natural home) **and** to every harness that renders icons outside that
   artifact: the storybook preview, `vr-tests-react-components`, `public-docsite-v9`,
   `perf-test-react-components`, and the `starter-templates/src/react-components-vite` template
   (which the evaluation §7 already flagged as pinning `@fluentui/react-icons@^2.0.311`).
3. **the layer wrapper** — `@import '…/headless/styles.css' layer(fui.base);` per §1.2 (ii).

Item 2 is the highest-risk item in the entire cross-repo plan, and it fails _silently and
globally_: a missing import means every icon everywhere loses `display: inline`, RTL flip, HCM
`forced-color-adjust`, and — for bundled pairs — **both variants render at once**. It is exactly
the class of defect the D2a5 postmortem says VR is the only thing that catches, and it is
repo-wide rather than per-component. **Gate it with an explicit assertion, not with VR alone:** a
build-time check that the emitted root CSS contains the `[data-fui-icon]` rule, plus a jest/CDP
assertion on one bundled-icon story.

### 2.2 Retiring the D2a5 unlayered blocks

**62 selector lines, 14 files:**

| package                 | file                               | lines |
| ----------------------- | ---------------------------------- | ----: |
| react-button            | `Button.module.css`                |    12 |
| react-menu              | `MenuItem.module.css`              |     8 |
| react-tags              | `InteractionTagPrimary.module.css` |     6 |
| react-tabs              | `Tab.module.css`                   |     6 |
| react-infolabel         | `InfoButton.module.css`            |     6 |
| react-nav               | `NavItem.module.css`               |     4 |
| react-nav               | `NavCategoryItem.module.css`       |     4 |
| react-breadcrumb        | `BreadcrumbButton.module.css`      |     4 |
| react-menu-grid-preview | `MenuGridRow.module.css`           |     3 |
| react-nav               | `AppItemStatic.module.css`         |     2 |
| react-nav               | `AppItem.module.css`               |     2 |
| react-button            | `ToggleButton.module.css`          |     2 |
| react-button            | `MenuButton.module.css`            |     2 |
| react-teaching-popover  | `TeachingPopoverTitle.module.css`  |     1 |

Retirement is **not** "delete the rules". The rules express real behavior (swap filled/regular on
hover, on `open`, on pressed, and the disabled swap-back). Retirement means **moving each unlayered
block back into the layer that mirrors its `mergeClasses` argument order**, per D2a5's own sentence:
_"when the owner converts, the rules return to the layer that mirrors their mergeClasses argument."_
The fork makes react-icons a converted owner.

Sequence per file: move block into layer → run that package's VR set → confirm the filled/regular
swap still fires. Group the 14 files into 3 batches by package family (button family 16 lines / nav
family 12 / the rest 34) so a regression is bisectable.

**Do not start this before §2.1 items 2 and 3 are both landed and verified.** Ordering is the whole
risk.

### 2.3 Dependency end-state (fluentui)

With the fork consumed and the umbrella exports removed (D19):

- **0** `@griffel/*` entries in any first-party `package.json` (the evaluation counted 28 across 21
  manifests).
- `yarn why @griffel/core` → **empty**. This is the sentence the evaluation said could not be
  written.
- Dev install drops the ~21.5 MB of `@griffel/{babel-preset,webpack-loader,eslint-plugin,shadow-dom,jest-serializer,react}` the evaluation measured, **plus** the ~2.4 MB runtime trio it said would stay.
- Consumer bundles drop the **5,218 B gzip** floor.
- `packages/react-components/deprecated/` (12 files, 3 packages) remains out of scope by definition
  and is the only place the grep still hits.

---

## 3. The already-evaluated fluentui stages, woven in

The evaluation's S-A..S-I stages stand. What the fork changes is **ordering and one gate**:

| stage                       | change from the evaluation                                                                                                                                                                                                                                                                                                                                             | depends on icons workstream?                       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **S-A Free wins**           | unchanged — 4 stale deps, 6 test/fixture files, `tools/workspace-plugin` generator templates. **Do first, it is independent of everything.** The generator fix is a defect: new packages are currently scaffolded onto Griffel                                                                                                                                         | no                                                 |
| **S-B/S-C/S-D Charts**      | unchanged — 9 batches, and the D17 VR-coverage question is untouched by the fork. Charts has **0** `:global(.fui-Icon-*)` references (evaluation §3), so it never contends with icons                                                                                                                                                                                  | no — **run in parallel with the icons workstream** |
| **S-E Harness**             | unchanged (28 VR story files, `scripts/test-ssr`, perf-test scenario), **plus** the icons CSS import must be added to the storybook preview and VR harness — fold that in                                                                                                                                                                                              | yes, for the CSS import                            |
| **S-F Stories & docs**      | unchanged in size (498 stories + 42 doc pages), **but** D21's docsite rewrite gets easier: the SSR guides currently teach installing `@griffel/webpack-loader`; with the fork there is no Griffel to teach at all, so those pages become deletions rather than rewrites                                                                                                | partially                                          |
| **S-G Core specials**       | `react-provider`'s `TextDirectionProvider` removal is **unblocked earlier**: the evaluation §6 notes it is needed "only so that consumer-authored Griffel styles keep flipping" and that react-icons has its own `IconDirectionContextProvider` — which the fork keeps unchanged. The CSP-nonce path (`useRenderer_unstable`) still needs its Fluent-owned replacement | no                                                 |
| **S-H The break**           | unchanged (12 umbrella exports + 3 types + `wyw-in-js` block + dep; retire `react-conformance-griffel`; drop babel preset / eslint rules / root devDeps)                                                                                                                                                                                                               | no                                                 |
| **NEW S-J D2a5 retirement** | the 62 lines, 3 batches — **new stage, did not exist in the evaluation because it was deemed permanent**                                                                                                                                                                                                                                                               | **yes, hard dependency**                           |
| **S-I Sweep**               | unchanged (~216 provenance comments, 59 jest serializer entries, RFC/handbook docs), **plus** the D2a5 authoring rule leaves `CONVERSION_GUIDE.md §2` and `DECISIONS.md:381` gets a superseding amendment                                                                                                                                                              | yes                                                |

**The critical-path insight: only S-E (partially), S-J and S-I depend on the icons work.** Charts —
the largest fluentui surface, 9 batches — is completely independent. Run them concurrently.

---

## 4. Decision resolutions

### 4.1 D17–D23 restated with fork-changed recommendations

| #       | decision                                                         | recommendation                                                                                                                                                                                                                                                                                                             | changed by fork?         |
| ------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **D17** | Charts VR coverage — prerequisite, and how much?                 | **Unchanged: extend VR to all 23 chart components before converting.** Charts covers 6 of 23 (26%) today; the 17 uncovered include the 5 largest styles files. 22 jest snapshots do not catch a `fill` or an anchor. The D2a5 postmortem is the argument. **Still the single largest open question in the fluentui half.** | no                       |
| **D18** | `@fluentui/react-icons`: accept / patch / upstream               | **FLIPPED — (c) CONVERT VIA FORK.** Promote the existing headless implementation to default (§1.1 Option A), publish per D24, consume in fluentui per §2.1. The evaluation's fallback hardening (promote the `fui-Icon-filled` grep to a lint rule) becomes **unnecessary**, not mandatory — D2a5 is retired, not enforced | **YES — the whole plan** |
| **D19** | Umbrella re-exports: remove in the D16 major, or hold            | **Unchanged: remove, staged behind S-F.** The fork strengthens it — with react-icons converted, the umbrella becomes the _only_ remaining first-order `@griffel/react` install for consumers, so removing it is what completes the graph rather than one of two things that must both happen                               | strengthened             |
| **D20** | `react-provider` CSP nonce + `TextDirectionProvider`             | **Split them.** Nonce: unchanged — build a Fluent-owned nonce context. `TextDirectionProvider`: **removable with D19 and no longer coupled to icons at all**, since the fork's `IconDirectionContextProvider` is untouched by the conversion                                                                               | partially                |
| **D21** | Docsite Griffel AOT guides: rewrite / retire / keep as legacy    | **Retire, don't rewrite.** `BuildTimeStyles.mdx`, `SSR/Remix.mdx`, `SSR/NextJSAppDir.mdx`, `Migration/FromV8/**`, `styles-handbook.md` exist to teach installing `@griffel/webpack-loader` / `babel-preset` / `vite-plugin`. Post-fork there is no Griffel anywhere in the stack, so there is no reduced version to keep   | strengthened             |
| **D22** | `perf-test-react-components/src/scenarios/MakeStyles.tsx`        | **Retire it.** It is a benchmark whose subject is Griffel and it holds the last `@griffel/core` app-manifest entry. Post-fork the A/B has no arm B. If a perf data point is wanted, replace it with a CSS-Modules scenario measuring the same interaction                                                                  | strengthened             |
| **D23** | `@fluentui/react-conformance-griffel` — retire or keep published | **Retire.** 64 in-repo importers; `make-styles-overrides-win` already sits in `disabledTests` in 172 files; `classname-overrides-win` (D9) already replaces its one live test. Retire in the same major as D19/D16 so consumers absorb one break, not three                                                                | no                       |

### 4.2 New decisions the icons work raises

| #       | decision                                                                                                                                                                    | recommendation                                                                                                                                                                                                                          | why it cannot be defaulted                                                                                                                                                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D24** | **Fork naming, versioning and publishing.** Scoped npm name + `resolutions` alias, git dependency, or workspace link?                                                       | **`portal:` during dev → publish scoped (e.g. `@arrayknight/fluentui-react-icons@2.0.334-headless.0`) + one root `resolutions` alias for the PR.** Keep the upstream version lineage in the version string so the provenance is legible | Determines whether the migration's "zero Griffel" claim is about `node_modules` or about a hypothetical. A git-dep-only fork reproduces the evaluation's own objection to option (b): validating against a package no consumer has                        |
| **D25** | **The `style-loader` font regression.** Headless fonts are **+1,344 B min (+13.2%)** without CSS extraction, and the repo's own doc says "prefer the Griffel variant" there | **Accept the regression; rewrite the guidance to "enable CSS extraction".** Optionally ship the ~500-byte base stylesheet as an inlineable export for the one bad case                                                                  | Deleting Griffel deletes the recommended remedy the doc points at. Someone must decide whether that population is served, warned, or dropped — and the doc must stop recommending a thing that no longer exists                                           |
| **D26** | **API-contract renegotiation.** `IconsAPIContract.mdx` sanctions exactly two non-major breaking changes: icon removal and icon renaming. A required CSS import is neither   | **Ship the promotion as a major (`3.0.0`) on the fork, and amend the contract doc to name "styling-mechanism change" as a third category requiring a major.** Do not smuggle it into a patch                                            | The doc's stated policy is that minor+patch both ship as PATCH bumps. A silent patch that makes every icon lose its layout unless a new CSS import is added is precisely the failure the doc's own "failing build > blank icons" principle argues against |
| **D27** | **Where the layer wrapper lives.** Icons ships `@layer fluent.icons { … }`, or fluentui `@import`s with `layer(fui.base)`?                                                  | **fluentui-side `layer()` import now; icons-side layered variant as the upstream PR.** See §1.2                                                                                                                                         | This is the mechanism that retires D2a5's 62 lines. Getting it wrong silently reproduces the react-button bug that survived a clean VR history                                                                                                            |
| **D28** | **The 1 kB monosize threshold post-Griffel.** Keep absolute 1 kB, tighten, or return to the 10% relative default?                                                           | **Keep 1 kB absolute, and re-point it: add headless fixtures for the 8 Griffel fixtures that lack one (I1).** Do not renegotiate the number                                                                                             | The threshold exists because headless fixtures are small enough that 10% relative is too tight. Post-conversion _every_ fixture is small, so the absolute threshold carries more weight, not less                                                         |
| **D29** | **`wrapIcon` in the headless API.** Port it, or ship the documented "accepted breakage"?                                                                                    | **Port it.** Accepted breakage is defensible for a preview entrypoint, not for the default API of a package that has exported `wrapIcon` from `/utils` for years. It needs no styling — only `useIconState`                             | It is the only public API surface that headless does not cover. Irrelevant to fluentui (**0** references) but not to the ecosystem                                                                                                                        |
| **D30** | **Headless SVG sprites.** `docs/headless.md:72` says headless sprites are not published; `scripts/build.js:231` generates the atoms only conditionally                      | **Close the gap in I0.** Sprites are alpha, but shipping a default API where one of three documented rendering approaches is unavailable is a regression, not a preview caveat                                                          | Promotion makes headless the default; a default cannot have a hole where an advertised rendering approach used to be                                                                                                                                      |

---

## 5. Batch and stage plan

fluentui runs the batch-scoped regime from `RUNBOOK.md` (3–6 units per batch; per-batch validation =
the batch's own VR sets + immediate seams only; full sweeps reserved for phase boundaries and the
final gate). The icons repo has no equivalent regime, so one is proposed: **one step per PR, gated
by `pr.yml` + a manual docsite-artifact pass**, since every icons step touches the whole package at
once and cannot be subdivided by component.

### 5.1 Sequence

```
        ICONS REPO                                  FLUENTUI REPO
        ──────────                                  ─────────────
week 0  I0 headless gaps (wrapIcon, sprites)   ║    S-A free wins  (1 batch)
        I1 parity gate (tests + fixtures)      ║    S-B charts prereqs — D17 VR extension (1 batch)
        ─────────────────────────────────────  ║
week 1  I2 promote headless → default          ║    S-C charts C1–C7 (7 batches)
        I3 fonts / @font-face → CSS            ║
        ─────────────────────────────────────  ║
week 2  I4 react-icons-file-type               ║    S-C continues
        I5 dependency + tooling purge          ║    S-D charts plumbing (1 batch)
        I6 docs                                ║
        ─────────────────────────────────────  ║
week 3  I7 publish (D24)                       ║    ══ JOIN ══
                                               ║    S-K1 consume fork: resolutions alias + CSS import + layer()
                                               ║    S-K2 harness CSS imports (storybook, VR, docsite, perf, starter-template)
                                               ║         → FULL VR RUN (this is the icons workstream's real visual gate)
        ─────────────────────────────────────  ║
week 4+                                        ║    S-E harness (2 batches)
                                               ║    S-F stories & docs (6–10 batches)
                                               ║    S-G core specials (1 batch)
                                               ║    S-H the break (1 batch)
                                               ║    S-J D2a5 retirement — 62 lines, 3 batches
                                               ║    S-I sweep (1 batch)
```

The two columns are independent until the **JOIN**. That is the plan's main efficiency claim, and
it rests on a measured fact: charts has **0** `:global(.fui-Icon-*)` references, so the largest
fluentui surface never touches the icons contract.

### 5.2 Batch sizes and gates

| stage    | repo     | batches | gate                                                                                                                     |
| -------- | -------- | ------: | ------------------------------------------------------------------------------------------------------------------------ |
| I0       | icons    |       1 | `test` + `build-verify` green; new headless tests fail before the port, pass after                                       |
| I1       | icons    |       1 | 12 monosize fixtures have headless twins; `compare-reports` green vs base                                                |
| I2       | icons    |       1 | `headless.test.tsx` parity; `deps:check`; `lint`; **`compare-reports` shows the expected DROP**, not just no-regression  |
| I3       | icons    |       1 | font fixtures; `@font-face` present in emitted CSS; subsetting plugin e2e (`test/src/e2e-barrel-headless-fonts.js`)      |
| I4       | icons    |       1 | file-type fixtures; `deps:check`                                                                                         |
| I5       | icons    |       1 | **`grep -r "@griffel" --exclude-dir=node_modules` returns 0 in the icons repo**; `yarn.lock` has no `@griffel/*`         |
| I6       | icons    |       1 | docsite builds; manual artifact pass                                                                                     |
| I7       | icons    |       1 | published artifact installs clean in a scratch project                                                                   |
| S-A      | fluentui |       1 | build + affected tests                                                                                                   |
| S-B      | fluentui |       1 | new VR baselines accepted for 17 chart components                                                                        |
| S-C      | fluentui |       7 | per-batch VR + 22 snapshots                                                                                              |
| S-D      | fluentui |       1 | build metrics; **0** `.styles.raw.js` (−155,388 B)                                                                       |
| **S-K1** | fluentui |   **1** | **root CSS contains `[data-fui-icon]`; one bundled-icon CDP assertion; icons stylesheet resolves inside `fui.base`**     |
| **S-K2** | fluentui |   **1** | **FULL VR RUN — the icons conversion's actual visual gate**                                                              |
| S-E      | fluentui |       2 | full VR run                                                                                                              |
| S-F      | fluentui |    6–10 | docsite renders; story-count assertion                                                                                   |
| S-G      | fluentui |       1 | full VR + SSR                                                                                                            |
| S-H      | fluentui |       1 | full sweep, API-extractor review                                                                                         |
| **S-J**  | fluentui |   **3** | **per-family VR (button 16 lines / nav 12 / rest 34); filled↔regular swap verified on hover, `open`, pressed, disabled** |
| S-I      | fluentui |       1 | grep returns only `deprecated/`                                                                                          |

**Totals: 8 icons PRs + ~27–31 fluentui batches** (the evaluation's ~22–26, plus S-K1, S-K2 and
S-J's 3).

### 5.3 Definition of done

**Zero `@griffel/*` anywhere in either repo's non-deprecated dependency graph.** Concretely, all
seven must hold:

1. `rg "@griffel/" --glob '!node_modules'` in **fluentui-system-icons** → **0 hits** (source,
   manifests, lockfile, eslint configs, docs).
2. `rg "@griffel/" --glob '!node_modules' --glob '!migration/**' --glob '!**/CHANGELOG.md'` in
   **fluentui** → hits only under `packages/react-components/deprecated/` (12 files, 3 packages,
   out of scope by definition) and dated RFCs under `docs/react-v9/contributing/rfcs/`.
3. `yarn why @griffel/core` → **not found**, in both repos.
4. **0** `@griffel/*` entries in any `package.json` in either repo (fluentui's 28 across 21
   manifests; icons' 2 runtime + 5 root devDeps + 3 `resolutions`).
5. `rg ":global\(\.fui-Icon-" -g '*.module.css'` in fluentui → the count may stay at 62, but **0**
   of them sit in an unlayered block; D2a5 is superseded in `DECISIONS.md` and its authoring rule is
   removed from `CONVERSION_GUIDE.md §2`.
6. **0** `*.styles.raw.js` outside `deprecated/` in fluentui (from 197,686 B / 60 files today, of
   which 155,388 B / 48 files is charts).
7. A consumer bundle importing one Fluent icon contains **no Griffel runtime** — verified by the
   same esbuild+gzip method the evaluation used for the 5,218 B baseline, re-run against the forked
   package.

---

## Appendix — source of every claim

| claim                                                                                              | source                                                                                       |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 12 Griffel-importing source files in the icons repo                                                | `rg "from '@griffel" packages/*/src` — 9 `react-icons/src/utils/**`, 1 file-type, 2 icon-app |
| `@griffel/react ^1.6.1` in `dependencies`, v2.0.334                                                | `packages/react-icons/package.json`                                                          |
| pin rationale: TS 4.5+ `.d.ts` syntax vs pinned 4.1.6; ~1.1 kB on `FileTypeIcon` vs 1 kB threshold | `docs/single-version-policy.md:46-55`                                                        |
| "Remove these overrides once the packages move off TypeScript 4.1.6"                               | `docs/single-version-policy.md:54-55`                                                        |
| headless bundle-size deltas (−13.5% SVG, −70% fonts, −56% sprites, +13.2% fonts w/ style-loader)   | `packages/react-icons/docs/bundle-size-rendering-approaches-comparison.md`                   |
| `:where()` rationale + coexistence-with-Griffel comment                                            | `packages/react-icons/src/headless/styles.css` header                                        |
| "will be part of package.json once headless is stable"                                             | `packages/react-icons/scripts/build.js:193`                                                  |
| `wrapIcon` accepted breakage                                                                       | `packages/react-icons/src/headless/utils.ts`                                                 |
| headless sprites not published                                                                     | `packages/react-icons/docs/headless.md:72`                                                   |
| "You **must** import the headless CSS file"                                                        | `packages/react-icons/docs/headless.md:27`                                                   |
| two sanctioned non-major breaking changes                                                          | `packages/docsite/stories/Icons/IconsAPIContract.mdx`                                        |
| `data-fui-icon` set for both APIs; RTL from `IconDirectionContext`                                 | `packages/react-icons/src/core/useBaseIconState.ts`                                          |
| loader `headless: boolean` option                                                                  | `packages/react-icons-atomic-webpack-loader/README.md`                                       |
| CI gate list                                                                                       | `.github/workflows/pr.yml` job "Build npm packages"                                          |
| 1 kB absolute threshold + its rationale                                                            | `packages/react-icons/monosize.config.mjs`                                                   |
| 62 `:global(.fui-Icon-*)` lines / 14 files, per-file counts                                        | `rg ":global\(\.fui-Icon-" -g '*.module.css' packages` in fluentui                           |
| 250 `bundleIcon`, 3 `IconDirectionContextProvider`, 0 `wrapIcon`/`createFluentIcon`/`useIconState` | `rg` over fluentui `packages` + `apps`                                                       |
| 39 `@fluentui/react-icons` manifest entries (36×`^2.0.245`)                                        | `rg '"@fluentui/react-icons":' --include=package.json` in fluentui                           |
| D2a5 permanence clause, CDP evidence, react-button bug                                             | `migration/griffel-to-tailwind/reports/DECISIONS.md:372-438`                                 |
| 5,218 B gzip, 28 manifest entries, 197,686 B AOT, charts feature census, S-A..S-I stages           | `migration/griffel-to-tailwind/reports/griffel-elimination-evaluation.md`                    |
| batch regime (3–6 units, batch-scoped validation)                                                  | `migration/griffel-to-tailwind/RUNBOOK.md:28,35-43`                                          |

---

## User amendments (2026-07-30) — decisions resolved

1. **D24 RESOLVED — contribute-back model, not divergence.** The forks exist to
   create progress and contribute upstream via PRs from our fork copies. No
   scoped npm publish, no permanent git dependency. Local dev/testing MAY point
   fluentui's dependency at the fork, but that override MUST be reverted before
   the fluentui PR so it behaves as expected against published packages. The
   fluentui PR documents that **the icons upstream merge is a dependency of the
   UI merge** (sequencing note in the PR body). D26's contract amendment
   becomes part of the upstream icons PR conversation.
2. **Headless promotion approach: APPROVED** ("absolutely the way to go").
3. **D27 RESOLVED (initial) — fluentui-side `@import … layer(…)`, assigned to
   the LOWEST component layer: `fui.components.l1`.** User's pick, held loosely
   ("we can see how that plays out") — the retirement batches' VR gates
   validate it; if l1 ties with component rules misbehave, revisit altitude.
4. **Documentation requirement:** it must be explicit — in DECISIONS, the
   cookbook, and the icons-side docs — that `@fluentui/react-icons` styles are
   UNLAYERED by default, and correct behavior inside the fluentui layering
   system requires assigning them into the layer mechanism via the
   layer-scoped import.
5. **D17 default adopted:** charts batches extend VR coverage as they go —
   new stories captured as pre-conversion baselines per batch (the
   baseline-before-convert ethos), rather than relaxing the gate.

## User amendment 2 (2026-07-30) — PR topology

**Exactly TWO PRs total**: (1) the icons fork's master → microsoft/fluentui-system-icons;
(2) the UI fork's main branch → its origin. No per-stage PRs, no feature
branches — all work lands directly on each fork's main branch. The I0–I7
stages become a continuous commit stream on the icons fork's master, reviewed
as one upstream PR. fluentui note: the migration currently lives on
`styling/tailwind-css-modules`; at PR time the fork's main is fast-forwarded
to that head so the PR originates from main per this amendment (no history
surgery mid-execution).

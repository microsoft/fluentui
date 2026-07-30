# Can Griffel be COMPLETELY eliminated from non-deprecated code?

**Date:** 2026-07-30 · **Branch:** `styling/tailwind-css-modules` · **Status:** evaluation only, no code changed.

**Verdict up front: CONDITIONAL YES for source code, PERMANENT NO for the installed dependency
graph.** Every `@griffel/*` import in non-deprecated first-party source can be removed with the
shipped Tailwind v4 + CSS Modules dialect — the cookbook applies to `react-charts` essentially
unmodified, and the residual runtime uses in `react-provider` are replaceable. But
`@fluentui/react-icons` declares `@griffel/react` as a runtime **dependency**, so `@griffel/core`
stays in every consumer's `node_modules` and in every consumer's bundle regardless of what this
fork does. "Zero Griffel" is reachable for `packages/**/src`; it is not reachable for
`yarn why @griffel/core`.

---

## 1. Method and scope

All counts below come from `rg` over the working tree at HEAD (`071c326bec`), excluding
`node_modules/`, `.yarn/`, `graphify-out/`, `packages/graphify-out/`, `yarn.lock`,
`migration/**` (this migration's own prose), and `CHANGELOG*`. Raw data:
`.scratch/griffel-files.txt`, `.scratch/griffel-refs.json`.

Byte measurements are esbuild bundles (`--bundle --minify --format=esm`, react external) of
synthetic entrypoints against the installed `@griffel/*`, gzip via `zlib.gzipSync`. Scripts in
`.scratch/`.

`packages/react-components/deprecated/` (12 files, 3 packages: `react-alert`, `react-infobutton`,
`react-virtualizer`) is **out of scope by definition** and is excluded from every "remaining"
number unless called out.

---

## 2. Inventory

**389 files, 596 reference lines** contain `@griffel/`. 12 files are under `deprecated/`, leaving
**377 non-deprecated files**. Classified by what the reference actually _is_:

| kind                                                        | lines | files | load-bearing?                  |
| ----------------------------------------------------------- | ----: | ----: | ------------------------------ |
| runtime value import (`import { … } from '@griffel/react'`) |    94 |    86 | **yes**                        |
| type-only import (`import type { GriffelStyle }`)           |    17 |    16 | **yes** (compile)              |
| `package.json` dep entry                                    |    28 |    21 | **yes**                        |
| jest `snapshotSerializers` wiring                           |    65 |    59 | **yes** (test infra)           |
| `.babelrc.json` AOT fixtures                                |     2 |     1 | fixture only                   |
| markdown / MDX prose                                        |    74 |   ~40 | docs                           |
| code comments (migration provenance notes)                  |  ~216 |     — | **no** — prose in `//`/`/* */` |

The comment bulk is this migration's own audit trail: 147 lines are variants of
"`make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses…" and 60+ are
"`@griffel/jest-serializer` STAYS/DROPPED because…". These are documentation, not coupling; they
cost nothing to leave and should be swept only at the very end.

### 2.1 Runtime value imports by owner

| owner                                                                | files | nature                                                   |
| -------------------------------------------------------------------- | ----: | -------------------------------------------------------- |
| `packages/charts/react-charts/library/src`                           |    29 | **real component styling** — 25 `*.styles.ts` + 4 `.tsx` |
| `apps/vr-tests-react-components/src`                                 |    28 | VR story-local layout wrappers                           |
| `tools/workspace-plugin`                                             |     6 | generator templates + AOT executor fixtures              |
| `packages/react-components/react-conformance-griffel/src`            |     4 | `mergeClasses` matchers                                  |
| `scripts/test-ssr/src`                                               |     4 | SSR harness (`RendererProvider`, `createDOMRenderer`)    |
| `packages/react-components/react-provider/library/src`               |     2 | **`useRenderer_unstable`, `TextDirectionProvider`**      |
| `packages/eslint-plugin/src`                                         |     3 | rule config + rule tests                                 |
| `packages/react-components/eslint-plugin-react-components/src`       |     3 | `enforce-use-client` fixtures                            |
| `packages/react-components/react-components/src/index.ts`            |     2 | **the umbrella re-export**                               |
| `packages/react-components/react-tabster/src`                        |     1 | `shorthands.borderColor`                                 |
| per-package `*.test.tsx` / `*.cy.tsx`                                |     5 | button, dialog, menu, aria, provider-node                |
| `apps/public-docsite-v9-headless`, `apps/perf-test-react-components` |     2 | demo/benchmark scenarios                                 |

### 2.2 `@griffel/*` in `package.json` (21 manifests, 28 entries)

**Root** (`package.json`, devDependencies): `@griffel/babel-preset@1.5.8`,
`@griffel/eslint-plugin@^2.0.0`, `@griffel/jest-serializer@1.1.24`, `@griffel/react@^1.5.32`,
`@griffel/shadow-dom@0.2.2`, `@griffel/webpack-loader@2.2.10`.

**Shipped packages declaring `@griffel/react` in `dependencies`** (10 non-deprecated):

| package                                        | src actually imports Griffel?             |
| ---------------------------------------------- | ----------------------------------------- |
| `@fluentui/react-components` (umbrella)        | yes — the 12 re-exports (§5)              |
| `@fluentui/react-provider` (+ `@griffel/core`) | **yes — 2 runtime imports**               |
| `@fluentui/react-tabster`                      | **yes — 1 (`shorthands`)** + 3 type lines |
| `@fluentui/react-positioning`                  | type-only (2 lines)                       |
| `@fluentui/react-charts`                       | **yes — 29 files**                        |
| `@fluentui/react-conformance-griffel`          | yes — 4 matcher files                     |
| `@fluentui/react-menu`                         | **no** — only `Menu.cy.tsx` (Cypress)     |
| `@fluentui/react-button`                       | **no** — only `useButton.test.tsx`        |
| `@fluentui/react-utilities-compat`             | **no — stale dep, zero references**       |
| `@fluentui/react-icons-compat`                 | **no — stale dep**                        |
| `@fluentui/react-colorpicker-compat`           | **no — stale dep**                        |
| `@fluentui/component-selector-preview`         | **no — stale dep**                        |

Apps: `public-docsite-v9` (`@griffel/react`), `vr-tests-react-components` (`@griffel/react`),
`perf-test-react-components` (`@griffel/core`). Tooling: `@fluentui/eslint-plugin`
(`@griffel/eslint-plugin`).

**Four packages ship a `@griffel/react` runtime dependency with zero source references** — those
are deletable today, no conversion required, and two more (`react-menu`, `react-button`) become
deletable the moment their single test file is rewritten.

### 2.3 Test / build infrastructure

- **jest serializers**: 44 configs use `['@griffel/jest-serializer', cssModules.snapshotSerializer]`,
  15 use `['@griffel/jest-serializer']` alone, 14 use `[cssModules.snapshotSerializer]` alone.
  The 15 griffel-only configs belong to packages with no converted CSS; the 44 dual configs are the
  converted packages keeping the Griffel serializer defensively (their own comments say so).
- **AOT**: 60 `*.styles.raw.js` build artifacts remain on disk, **197,686 B** total — **48 files /
  155,388 B from `react-charts`**, 12 from the 3 deprecated packages. Zero from converted packages.
  D10's 719,570 B baseline is therefore already down 72.5%; charts is the entire remaining
  non-deprecated share.
- **eslint**: `packages/eslint-plugin/src/configs/react/config.js` loads `@griffel/eslint-plugin`
  and enables 4 rules (`hook-naming`, `no-shorthands`, `pseudo-element-naming`, `styles-file`);
  `legacy.js` turns `no-shorthands` off; line 162 turns `styles-file` off for a path group.
- **conformance**: 64 `.ts/.tsx` files import `@fluentui/react-conformance-griffel`;
  `make-styles-overrides-win` appears in 205 files / 415 lines, **172 of them inside `disabledTests`
  arrays** — i.e. the test is already switched off almost everywhere it is named.
- **storybook**: `scripts/storybook/src/rules.js` still exports `griffelRule`
  (`@griffel/webpack-loader`) per D8's "keep until Phase 3".
- **babel**: `scripts/babel/src/preset-v9.js` registers the `@griffel` preset with explicit
  `modules` for `@griffel/core` + `@griffel/react`; `tools/workspace-plugin/src/executors/build/lib/babel.ts`
  gates the raw-styles emit on `GRIFFEL_SPECIFIER_REGEX`.
- **generators**: `tools/workspace-plugin` templates still scaffold new components with
  `import { makeStyles, mergeClasses } from '@griffel/react'` and new libraries with a
  `@griffel/react` dep + Griffel serializer. **New packages created today are born on Griffel.**

---

## 3. Surface 1 — `packages/charts/react-charts`

**Not in the migration ledger at all** (88 packages tracked: 60 validated / 24 no-styles / 4 done;
no charts entry). This is greenfield for the regime.

### Size

26 `*.styles.ts` files, **2,292 lines**; largest are `useChartAnnotationLayer.styles.ts` (215),
`useGaugeChartStyles.styles.ts` (191), `useHorizontalBarChartStyles.styles.ts` (167),
`useCartesianChartStyles.styles.ts` (164), `useChartPopoverStyles.styles.ts` (162),
`useLegendsStyles.styles.ts` (154), `utilities/Common.styles.ts` (153). Median is ~58 lines —
comparable to the converted leaf packages. 23 component directories, 4 of which also call
`mergeClasses` in render (`ChartPopover.tsx` ×2, `ChartAnnotationLayer.tsx` ×6, `Legends.tsx` ×2,
`ResponsiveContainer.tsx` ×4).

### Does the cookbook apply?

**Yes, more cleanly than the average converted package.** Measured across `library/src`:

| Griffel feature                             | count | cookbook status           |
| ------------------------------------------- | ----: | ------------------------- |
| `makeStyles({ … })` flat object literal     |    49 | §1–§2, direct             |
| `mergeClasses`                              |   185 | §3 → `clsx`               |
| `tokens.*`                                  |   172 | D4 → `var(--token)`       |
| `shorthands.*`                              | **0** | —                         |
| `makeResetStyles`                           | **0** | —                         |
| `makeStaticStyles`                          | **0** | —                         |
| `@keyframes` / `animationName`              | **0** | —                         |
| `createFocusOutlineStyle` / focus factories | **0** | D6 blocker does not apply |
| `:global(.fui-Icon-*)`                      | **0** | D2a5 does not apply       |
| `@media`                                    |     2 | §2, direct                |
| `::after`                                   |     1 | §2, direct                |

Every `makeStyles` call is the plain `makeStyles({ slot: { … } })` form — no dynamic style
functions, no runtime-parameterised style generation. There are no keyframes, no reset styles, no
static styles, no shorthands, no focus factories, and no react-icons contention. The five patterns
that produced the `special` routing list in `CONVERSION_GUIDE.md §562` are all absent.

### The three things that ARE charts-specific

1. **SVG presentation attributes as CSS.** `Common.styles.ts` emits `fill`, `textAnchor`,
   `forcedColorAdjust`, `stroke`-family properties into `GriffelStyle` objects. These are ordinary
   CSS properties in a `.module.css` file — the dialect expresses them natively (and D4's
   `--stroke-width-*` namespace, per `CONVERSION_GUIDE.md:152`, already exists precisely to drive
   SVG `stroke-width`). **No dialect gap.** The only care needed is that Tailwind's `fill-*`
   utilities are colour-scale-bound; use arbitrary-property form or plain declarations.

2. **`HighContrastSelector` (35 uses).** `utilities/utilities.ts:1962` defines it as
   `'@media screen and (-ms-high-contrast: active), screen and (forced-colors: active)'` and it is
   used as a computed object key inside style objects. CSS Modules take the media query literally;
   the converted form is D2a5-adjacent (`@variant forced-colors`, which per
   `CONVERSION_GUIDE.md:393` **must be the outer wrapper**). Mechanical, but 35 sites and a known
   build trap — worth a cookbook line rather than per-site improvisation.

3. **6 helper factories returning `GriffelStyle`** (`getTooltipStyle`, `getAxisTitleStyle`,
   `getBarLabelStyle`, `getMarkerLabelStyle`, `getChartTitleStyles`, plus `TitleStyles`), spread into
   `makeStyles` at 21 `as GriffelStyle` cast sites. These are the exact shape of the
   `createArrowStyles` / `createSlideStyles` "style factory" special already solved in
   `react-positioning` (ledger: _validated, specials S1_). Route them the same way: the factory
   becomes a shared `.module.css` composition or a plain exported class name.
   `Common.styles.ts` is **not** exported from `src/index.ts`, so unlike `react-positioning` this
   is a package-internal refactor with no public-API consequence.

**Nothing here the dialect cannot express.**

### Validation feasibility — this is the real risk

| harness                                                   | coverage                                                                                                                                  |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| VR (`apps/vr-tests-react-components/src/stories/Charts/`) | **6 story files, 48 stories, 6 story kinds**                                                                                              |
| story kinds                                               | `Charts/DonutChart`, `Charts/Legend`, `Charts/HorizontalBarChart`, `Charts/LineChart`, `Charts/VerticalBarChart`, `Charts/SparkLineChart` |
| component dirs covered                                    | **6 of 23 (26%)**                                                                                                                         |
| jest                                                      | 26 test files, **22 `.snap`**                                                                                                             |
| package storybook                                         | 110 `*.stories.tsx` under `packages/charts/react-charts/stories/` — **not in the VR harness**                                             |

D8's regime is "VR diff clean" per package. For charts that gate is **only meetable for 6 of 23
components** as things stand. The 17 uncovered components include the largest styles files
(`GaugeChart` 191, `ChartAnnotationLayer` 215, `CartesianChart` 164, `SankeyChart` 93,
`FunnelChart` 75, `PolarChart` 89, `ChartTable` 78, `HeatMapChart` 51).

Worse, charts are SVG-heavy and data-driven: a broken `fill` on an axis label is exactly the class
of defect that the D2a5 postmortem shows VR is the _only_ thing that catches, and 22 jest snapshots
across 26 tests will not catch a colour or an anchor. **VR extension is a prerequisite, not a
nice-to-have** — this is the single largest new decision charts forces (D17, §8).

Charts also carries the last non-deprecated AOT load: 48 `.styles.raw.js` / **155,388 B**, plus a
`jest.config.js` that must keep `cssModules.snapshotSerializer` (its comment already explains why a
project-level `snapshotSerializers` replaces rather than merges the preset's array) and a nontrivial
d3 `moduleNameMapper` block that must survive untouched.

### Batch estimate (under the 3–6 packages/run regime)

Charts is one package, so batching is by component group. Grouping by shared style surface and by VR
coverage:

| batch       | components                                                                                      | styles LOC | VR?           |
| ----------- | ----------------------------------------------------------------------------------------------- | ---------: | ------------- |
| C0 (prereq) | `Common.styles.ts` factories + `HighContrastSelector` cookbook entry + VR story extension       |        153 | —             |
| C1          | DonutChart (+Pie, +Arc), Sparkline, Legends                                                     |       ~377 | **yes**       |
| C2          | LineChart, VerticalBarChart, HorizontalBarChart                                                 |       ~286 | **yes**       |
| C3          | AreaChart, ScatterChart, VerticalStackedBarChart, GroupedVerticalBarChart                       |       ~198 | new VR needed |
| C4          | CartesianChart, ChartPopover, ResponsiveContainer/child                                         |       ~362 | new VR needed |
| C5          | GaugeChart, FunnelChart, ChartTable, HeatMapChart                                               |       ~395 | new VR needed |
| C6          | SankeyChart, PolarChart, HorizontalBarChartWithAxis, AnnotationOnlyChart                        |       ~274 | new VR needed |
| C7          | ChartAnnotationLayer                                                                            |        215 | new VR needed |
| C8          | package plumbing: drop `@griffel/react` dep, drop Griffel serializer, verify 0 `.styles.raw.js` |          — | —             |

**9 batches.** C1–C2 are the only ones the current harness can gate; C0 must deliver VR coverage for
the other 17 components or the regime is being run blind.

---

## 4. Surface 2 — `@fluentui/react-icons` (external)

### What it actually is

`@fluentui/react-icons@2.0.311` declares **`"@griffel/react": "^1.0.0"` in `dependencies`** (not
peer, not dev) and `"sideEffects": false`. **12 files** under `lib/utils/` import Griffel — and it is
not just `bundleIcon`:

- `createFluentIcon.js` + `createFluentIcon.styles.js` — **every single icon** goes through this
- `useIconStyles.styles.js`, `useIconState.js`
- `bundleIcon.js` + `bundleIcon.styles.js`
- `fonts/createFluentFontIcon.js` + `.styles.js`

Reachable symbols in the shipped (non-`.raw`) files: `__styles`, `makeStaticStyles`, `mergeClasses`.

D11 already recorded this as out of scope; D2 amendment 5 (D2a5) is the styling consequence.

### Measured cost of option (a) — accept permanently

**Runtime bytes.** esbuild, react external, minified, gzipped:

| entry                                                                             |          min |        gzip |
| --------------------------------------------------------------------------------- | -----------: | ----------: |
| `{ __styles, makeStaticStyles, mergeClasses }` — exactly what react-icons reaches | **12,124 B** | **5,218 B** |
| `{ __styles }` alone (floor)                                                      |      4,352 B |     1,961 B |
| `import { bundleIcon, AddFilled, AddRegular }` (realistic minimal icon use)       |      6,965 B |     3,149 B |
| full `@griffel/react` namespace (for scale)                                       |     39,280 B |    13,912 B |

So **any consumer that imports any Fluent icon pays ~5.2 KB gzip of Griffel runtime**, permanently,
no matter what this fork does. That is 37.5% of the full Griffel namespace. It is not tree-shakeable
away — `createFluentIcon` is on the path of every icon module.

**Install graph.** `@griffel/core` (2.0 MB on disk) + `@griffel/react` (298 KB) +
`@griffel/style-types` (55 KB) remain in `node_modules` for every consumer.

**Dialect cost.** The D2a5 unlayered rule. Measured on the converted tree: **62 selector lines across
14 `.module.css` files** target `:global(.fui-Icon-filled)` / `:global(.fui-Icon-regular)` and must
live in an unlayered block, ordered by `mergeClasses` argument order, forever. Every future
conversion must run the `fui-Icon-filled` grep (`CONVERSION_GUIDE.md:195`,
`DECISIONS.md:407`) — a rule enforced today by human memory, which is precisely how react-button's 12
broken rules survived a clean VR history.

### Options

**(a) Accept permanently — current state.** Cost is quantified above: 5.2 KB gzip per consumer, 62
unlayered selector lines, one permanent authoring rule. Zero work. Zero divergence between what the
repo tests and what consumers install.

**(b) Fork/patch in-repo.** Mechanically small — a yarn `patch:` entry replacing
`lib/utils/bundleIcon.styles.js` and `createFluentIcon.styles.js` with plain CSS classes would
remove the Griffel import. **But it fixes nothing that matters.** Consumers install the real npm
package; a patch only changes this monorepo's storybook and docsite. The result is a repo whose VR
baselines and CDP evidence are gathered against a package that no consumer has — the exact
stale-artifact/false-confidence failure mode the D2a5 postmortem was written about. It also silently
invalidates the 62 unlayered rules locally while leaving them load-bearing in production.
**Recommend against.**

**(c) Upstream conversion.** The correct fix. `microsoft/fluentui-system-icons` would need to emit
plain CSS for `createFluentIcon`/`bundleIcon` and ship a stylesheet. Requires a coordinated major of
an independently-versioned package used far outside Fluent v9, plus a decision about whether icons
carry a layer. Out of this fork's control; timeline unbounded.

**Recommendation for THIS fork: (a), with one hardening.** Accept it permanently and stop relying on
a remembered grep — promote the D2a5 check to a lint rule in
`packages/react-components/eslint-plugin-react-components` (or a `.module.css` gate in the CSS-emit
build step) that fails when a rule whose subject is `:global(.fui-Icon-*)` sits inside a `@layer`
block. That converts the fork's single permanent Griffel concession from a discipline problem into a
build failure. File (c) upstream as a tracking issue; never let the migration depend on it.

---

## 5. Surface 3 — the umbrella's Griffel re-exports (D7)

`packages/react-components/react-components/src/index.ts:19–33` re-exports **12 runtime symbols**
(`__css`, `__resetCSS`, `__resetStyles`, `__styles`, `createDOMRenderer`, `makeResetStyles`,
`makeStaticStyles`, `makeStyles`, `mergeClasses`, `RendererProvider`, `renderToStyleElements`,
`shorthands`) and **3 types** (`GriffelStyle`, `GriffelRenderer`, `GriffelResetStyle`) from
`@griffel/react`. The manifest also carries a `wyw-in-js.tags` block mapping `makeStyles` and
`makeResetStyles` to `@griffel/tag-processor` — i.e. the umbrella actively advertises itself as a
Griffel AOT source for downstream builds.

### What breaks if removed — the "near-zero in-repo consumers" premise is FALSE

**557 in-repo files** import at least one of these symbols _from `@fluentui/react-components`_:

| symbol                  |   files | stories | docs/MDX | app src |
| ----------------------- | ------: | ------: | -------: | ------: |
| `makeStyles`            | **541** |     498 |       37 |       6 |
| `mergeClasses`          |      69 |      62 |        4 |       3 |
| `shorthands`            |      15 |       8 |        4 |       3 |
| `makeResetStyles`       |      13 |      13 |        0 |       0 |
| `RendererProvider`      |       8 |       2 |        6 |       0 |
| `createDOMRenderer`     |       7 |       2 |        5 |       0 |
| `renderToStyleElements` |       4 |       0 |        4 |       0 |
| `GriffelRenderer`       |       1 |       0 |        1 |       0 |

Only **8 files** are non-story, non-doc app source (all under
`apps/public-docsite-v9/src/Concepts/Migration/`). So the _library_ audit was right — but 498 stories
and 42 doc pages are not incidental: **they are the published, rendered documentation of the design
system.** Every story that teaches "here is how you style a Fluent app" currently teaches Griffel.
Leaving them is not a compile problem; it is a contradiction between the shipped implementation and
the shipped example.

External consumers are the deliberate D7 contract and would break on removal — that is the intended
breaking change, same framing the fork already accepted for the D16 BEM statics.

### Recommendation: remove, in the same major as D16, staged

Keeping the re-exports costs: `@griffel/react` stays a `dependencies` entry of the umbrella (so
`@griffel/core` is a first-order install for _every_ v9 consumer, not just icon users); the
`wyw-in-js` block keeps the Griffel AOT toolchain alive downstream; and up to **12,943 B gzip** enters
a consumer bundle the moment they touch any of the 12 symbols.

Deprecate-harder is the worst option — it holds the dependency and the toolchain while getting none
of the reduction, and D7 already marked them deprecated, so a second deprecation pass buys nothing.

Removing them in a _different_ major from D16 makes consumers absorb two breaking styling changes.
The fork already decided statics go; Griffel exports should ride the same major.

The staging that makes it tractable:

1. **Convert the 541 story/doc files off `makeStyles` first.** This is the bulk of the work, it is
   mechanical (`makeStyles` → co-located `.module.css`), it is independently valuable, and it is
   fully reversible. It also removes `@griffel/react` from `apps/public-docsite-v9` and
   `apps/vr-tests-react-components`.
2. **Then delete the 12 exports + 3 types + the `wyw-in-js` block + the dep** — a ~20-line diff once
   step 1 lands.

An optional intermediate that reduces blast radius without holding the dependency: move the 12
symbols to a separate `@fluentui/react-components/griffel-compat` entrypoint for one major. This
guarantees tree-shaking, makes the deprecation legible in import statements, and gives external
consumers a mechanical migration. It is a real D17-class decision, not a default.

---

## 6. Surface 4 — type-only and test-only residue

### Type-only (17 lines, 16 files)

- `react-charts` — 12 files, `import type { GriffelStyle }`. Disappears with §3.
- `react-tabster/src/focus/createFocusOutlineStyle.ts` — `GriffelStyle` **plus a runtime
  `shorthands.borderColor` at lines 59 and 62.** The ledger marks react-tabster `done` with
  "zero converted-package consumers remain — triage-verified", so these factories are already
  dead weight for first-party code; 61 files still _name_ them but the converted ones reference the
  shared focus-ring CSS utility (D6), not the factory. **Verify, then delete the factories outright**
  rather than convert them.
- `react-tabster/src/focus/createCustomFocusIndicatorStyle.ts` — `GriffelStyle` + a
  `import type { makeResetStyles }` used only to spell a parameter type, with a standing
  `// TODO: Use the type directly from @griffel/react`. Replaceable with a local structural type.
- `react-positioning/src/createArrowStyles.ts`, `createSlideStyles.ts` — `GriffelStyle` in the
  **public option types** (D7 calls these out by name). Ledger says the package is validated as
  specials S1 with the factories ported; only the type annotation remains. Replace with
  `React.CSSProperties`-shaped local type or the package's own exported style type. **This is a
  public `.d.ts` change** — external code passing a `GriffelStyle` object still structurally
  type-checks, so the break is low-risk but real.

### `react-provider` — the one genuine runtime blocker

```
useFluentProvider.ts:3   import { useRenderer_unstable } from '@griffel/react';   // → renderer.styleElementAttributes
renderFluentProvider.tsx:8 import { TextDirectionProvider } from '@griffel/react'; // wraps the whole tree
```

- `useRenderer_unstable()` is read for `styleElementAttributes` and fed to
  `useFluentProviderThemeStyleTag` — this is the **CSP-nonce path for the theme `<style>` tag** that
  D11 explicitly deferred ("keeps its existing nonce path via the retained renderer context until
  Phase 3 decides its replacement"). Replacement: a Fluent-owned nonce context (a few lines), since
  the only thing consumed is an attributes bag.
- `TextDirectionProvider` feeds Griffel's RTL flip. Post-migration, first-party CSS uses logical
  properties + `:dir(rtl)` (D5) and does not need it; `@fluentui/react-icons` has its own
  `IconDirectionContextProvider` (already imported on the adjacent line). It is therefore needed
  **only** so that consumer-authored Griffel styles keep flipping — i.e. it is part of the same
  compat contract as §5 and should be removed with it, not before.

Both are small. Neither is expressible as "convert a styles file"; both need explicit design.
`react-provider` also holds the only `@griffel/core` dependency among shipped packages.

### Test / build infrastructure — what can be deleted, and when

| item                                                                                                                                                                | delete when                                  | notes                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4 stale `@griffel/react` deps (`react-utilities-compat`, `react-icons-compat`, `react-colorpicker-compat`, `component-selector-preview`)                            | **now**                                      | zero references; ledger already flags "verify no stray imports during Phase 3 sweep"                                                                |
| `react-menu` + `react-button` deps                                                                                                                                  | after their 1 test/cy file each is rewritten |                                                                                                                                                     |
| 59 `@griffel/jest-serializer` entries                                                                                                                               | per package, as it reaches zero Griffel      | 44 already run dual with `cssModules.snapshotSerializer`                                                                                            |
| root devDep `@griffel/jest-serializer`                                                                                                                              | when the last package config drops it        |                                                                                                                                                     |
| `@fluentui/react-conformance-griffel` (whole package)                                                                                                               | after §3 + §5                                | 64 importers; `make-styles-overrides-win` is already in `disabledTests` in 172 files. Its `classname-overrides-win` replacement (D9) already exists |
| `griffelRule` in `scripts/storybook/src/rules.js` + root `@griffel/webpack-loader`                                                                                  | after §3 and the story rewrite (§5)          | D8 said "keep until Phase 3"; charts + 528 Griffel stories are what still need it                                                                   |
| `@griffel` preset in `scripts/babel/src/preset-v9.js` + root `@griffel/babel-preset` (8.1 MB installed)                                                             | after charts (§3)                            | charts is the only non-deprecated AOT consumer left: 48 files / 155,388 B                                                                           |
| `GRIFFEL_SPECIFIER_REGEX` raw-styles path in `tools/workspace-plugin/.../babel.ts` + its `__fixtures__`                                                             | with the preset                              |                                                                                                                                                     |
| 4 `@griffel/*` eslint rules + root/plugin `@griffel/eslint-plugin` (5.1 MB)                                                                                         | after all source is converted                | `no-shorthands` etc. are dead rules once no styles file uses Griffel                                                                                |
| `tools/workspace-plugin` generator templates (`use__componentName__Styles.styles.ts__tmpl__`, `react-library/files/package.json__tmpl__`, `jest.config.js__tmpl__`) | **early — treat as a defect**                | new packages are currently scaffolded onto Griffel                                                                                                  |
| `scripts/test-ssr` (`RendererProvider`/`createDOMRenderer`/`renderToStyleElements`, 4 files + `buildAssets.ts` externals)                                           | after §5                                     | the SSR harness asserts Griffel style extraction; needs a CSS-Modules equivalent, not deletion                                                      |
| `enforce-use-client.spec.ts` fixtures (3 lines) + `eslint-plugin/src/rules/no-restricted-imports/index.test.js` (3 lines)                                           | anytime                                      | pure test fixtures using `@griffel/react` as an arbitrary module name; swap the string                                                              |
| root `@griffel/shadow-dom`                                                                                                                                          | with the D11 shadow-DOM decision             | already an accepted loss                                                                                                                            |
| ~216 provenance comment lines                                                                                                                                       | last, one sweep                              | zero coupling                                                                                                                                       |

### Dependency end-state

**If react-icons stays as-is (recommended):**
`@griffel/*` leaves **every first-party `package.json`** — all 28 entries removable. But
`yarn why @griffel/core` still resolves, via `@fluentui/react-icons → @griffel/react → @griffel/core`,
for the monorepo and for every consumer. `@griffel/core` + `@griffel/react` + `@griffel/style-types`
stay installed (~2.4 MB). Consumer bundles keep **5,218 B gzip**. The 6 dev-only packages
(`babel-preset` 8.1 MB, `webpack-loader` 7.9 MB, `eslint-plugin` 5.1 MB, `shadow-dom`,
`jest-serializer`, `react`) **do** leave — ~21.5 MB of dev install.

**If react-icons is patched (b):** identical for consumers; the repo's own install loses
`@griffel/*` entirely, at the price of testing something nobody ships.

**If react-icons converts upstream (c):** `@griffel/*` leaves the graph completely. Only then is
"zero Griffel" literally true.

---

## 7. Surface 5 — everything else the grep found

- **`apps/vr-tests-react-components`** (28 files): story-local `makeStyles` wrappers for layout —
  9 `{ makeStyles, shorthands }`, 9 `{ makeStyles }`, 3 `{ makeStyles, mergeClasses, shorthands }`,
  plus 1 `RendererProvider` (ShadowDOM stories) and 1 `makeResetStyles`. Harness code, not shipped.
  Convertible in one batch; the ShadowDOM ones are already a D11 accepted loss. **Must be done before
  `griffelRule` can leave the storybook webpack config.**
- **`apps/public-docsite-v9`** (4 files + dep): 8 `Concepts/Migration/**` source files plus MDX pages
  (`BuildTimeStyles.mdx`, `SSR/Remix.mdx`, `SSR/NextJSAppDir.mdx`, `Migration/FromV8/**`) that
  _document Griffel AOT setup as the recommended consumer workflow_. These are **content decisions,
  not conversions** — the docsite currently instructs consumers to install
  `@griffel/webpack-loader` / `@griffel/babel-preset` / `@griffel/vite-plugin`. Rewriting them is
  required for the migration to be coherent, and is the docs half of §5.
- **`apps/public-docsite-v9-headless/src/Introduction.styles.ts`** (1): trivial.
- **`apps/perf-test-react-components/src/scenarios/MakeStyles.tsx`** (1, `@griffel/core`): a
  _benchmark scenario whose purpose is measuring Griffel_. Retire it or repoint it at CSS Modules —
  a deliberate choice about what the perf suite measures.
- **`docs/react-v9/contributing/rfcs/**`** (5 files) and
`packages/react-components/react-image/library/docs/MIGRATION.md`,
`react-conformance-griffel/README.md`, `styles-handbook.md`: historical RFCs and handbooks.
  Leave the RFCs (they are dated records); the styles handbook and the conformance README need
  rewriting or retiring.
- **`packages/react-components/react-theme-sass`, `theme-designer`, `recipes`,
  `react-migration-v0-v9`, `react-migration-v8-v9`, `react-aria`, `react-motion*`,
  `react-storybook-addon`**: 1–3 refs each, all comments, jest config, or single test files. Sweep,
  not conversion.
- **`starter-templates/src/react-components-vite`**: not in the Griffel file list but pins
  `@fluentui/react-icons@^2.0.311` — worth checking its Vite config for a Griffel plugin when §5
  lands.

---

## 8. Verdict, plan, and the decisions required

### Verdict

**CONDITIONAL YES on source; NO on the dependency graph.**

- **Yes:** every non-deprecated first-party `@griffel/*` import is removable with the shipped
  dialect. `react-charts` — the largest remaining surface — is the _easiest_ package in the repo by
  Griffel-feature count (zero shorthands, zero reset/static styles, zero keyframes, zero focus
  factories, zero icon contention). No dialect gap was found anywhere in the inventory.
- **Conditional on three things:** (1) VR coverage for 17 of 23 chart components, without which the
  D8 gate cannot be met; (2) a decision to rewrite 541 story/doc files off umbrella `makeStyles`;
  (3) explicit designs for `react-provider`'s nonce path and `TextDirectionProvider`.
- **No, permanently, on the graph:** `@fluentui/react-icons` ships `@griffel/react` as a runtime
  dependency used by `createFluentIcon` — i.e. by every icon. **5,218 B gzip** of Griffel runtime
  reaches every consumer bundle that imports any Fluent icon, and no in-repo action changes that.
  D2a5 is therefore a permanent feature of the dialect, not a transitional one.

### Staged work plan (3–6 units per batch, batch-scoped validation per RUNBOOK)

| stage                      | scope                                                                                                                                                                   |  batches | gate                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------: | -------------------------------------- |
| **S-A. Free wins**         | delete 4 stale deps; rewrite 6 test/fixture files (button, menu, dialog, aria, provider-node, 2 eslint fixture files); fix `tools/workspace-plugin` generator templates |        1 | build + affected tests                 |
| **S-B. Charts prereqs**    | extend VR to the 17 uncovered chart components; `HighContrastSelector` + SVG-property cookbook entries; convert `Common.styles.ts` factories                            |        1 | new baselines accepted                 |
| **S-C. Charts conversion** | C1–C7 above                                                                                                                                                             |        7 | per-batch VR + 22 snapshots            |
| **S-D. Charts plumbing**   | drop dep, drop Griffel serializer, assert zero `.styles.raw.js` (−155,388 B)                                                                                            |        1 | build metrics                          |
| **S-E. Harness**           | 28 VR story files; `scripts/test-ssr` CSS-Modules equivalent; perf-test scenario decision; then drop `griffelRule` + `@griffel/webpack-loader`                          |        2 | full VR run                            |
| **S-F. Stories & docs**    | 498 stories + 42 doc pages off umbrella `makeStyles`; rewrite `BuildTimeStyles.mdx` / SSR guides                                                                        | **6–10** | docsite renders; story count assertion |
| **S-G. Core specials**     | `react-provider` nonce context + `TextDirectionProvider` removal; `react-tabster` factory deletion; `react-positioning` type swap                                       |        1 | full VR + SSR                          |
| **S-H. The break**         | delete 12 umbrella exports + 3 types + `wyw-in-js` block + dep; retire `react-conformance-griffel`; drop `@griffel` babel preset, eslint rules, remaining root devDeps  |        1 | full sweep, API-extractor review       |
| **S-I. Sweep**             | ~216 provenance comments, 59 jest serializer entries, RFC/handbook docs                                                                                                 |        1 | grep returns only `deprecated/`        |

**~22–26 batches.** S-F is the largest and least technically interesting; it is also the one that
cannot be skipped if the shipped docs are to stop teaching Griffel.

### New decisions required (D17+)

| #       | decision                                                                                                                                                                                                      | why it can't be defaulted                                                                                                                                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D17** | **Charts VR coverage is a prerequisite, and how much.** Extend `vr-tests-react-components` to all 23 chart components, or accept conversion of 17 components gated only by 22 jest snapshots?                 | D8 says "VR diff clean" per package. Charts can meet that for 26% of itself. Either the gate moves or the harness grows — and the D2a5 postmortem is the argument for growing it.                                                           |
| **D18** | **`@fluentui/react-icons`: accept (a), patch (b), or upstream (c).** Recommendation: (a) + promote the D2a5 `fui-Icon-filled` grep to an enforced lint/build rule.                                            | Determines whether "Griffel eliminated" is a claim about source or about `node_modules`, and whether 62 unlayered selector lines are permanent. Also determines whether the PR can honestly say "zero Griffel".                             |
| **D19** | **Umbrella re-exports: remove in the D16 major, or hold.** Recommendation: remove, staged behind S-F; optionally via a one-major `@fluentui/react-components/griffel-compat` entrypoint.                      | Removing them is what actually drops `@griffel/react` from every consumer's first-order install. It costs 541 in-repo file rewrites and a second breaking change — the fork accepted one for statics; this asks whether they ride together. |
| **D20** | **Ownership of `react-provider`'s CSP nonce and `TextDirectionProvider`.** Build a Fluent-owned nonce context; remove `TextDirectionProvider` with D19 (not before).                                          | D11 deferred it explicitly. It is the only remaining _runtime_ Griffel coupling in a shipped component package, and `TextDirectionProvider`'s removal is only safe once consumer Griffel is no longer a supported path.                     |
| **D21** | **Docsite content: do the Griffel AOT setup guides get rewritten, retired, or kept as legacy?** (`BuildTimeStyles.mdx`, `SSR/Remix.mdx`, `SSR/NextJSAppDir.mdx`, `Migration/FromV8/**`, `styles-handbook.md`) | These pages instruct consumers to install Griffel build tooling. Leaving them makes the shipped documentation contradict the shipped implementation; rewriting them is a docs project, not a conversion.                                    |
| **D22** | **`apps/perf-test-react-components/src/scenarios/MakeStyles.tsx`**: retire, or keep as a Griffel-vs-CSS-Modules A/B?                                                                                          | The scenario exists to measure Griffel. Keeping it holds `@griffel/core` in an app manifest; retiring it removes a data point the PR's perf story might want.                                                                               |
| **D23** | **`@fluentui/react-conformance-griffel` — retire the package or keep it published?** 64 in-repo importers; `classname-overrides-win` (D9) already replaces its one live test.                                 | It is a published package with external consumers writing v9 components; deleting it is itself a breaking change with the same shape as D19.                                                                                                |

---

## Appendix — reproduction

```bash
# inventory
rg -l "@griffel/" --glob '!node_modules' --glob '!graphify-out/**' \
   --glob '!packages/graphify-out/**' --glob '!yarn.lock' --glob '!migration/**' \
   --glob '!.yarn/**' --glob '!**/CHANGELOG.md'          # 733 raw -> 389 after filtering

node .scratch/classify.js        # kind breakdown (596 lines)
node .scratch/deps.js            # 28 package.json entries, by field
node .scratch/umbrella-syms.js   # 557 umbrella consumers, by symbol/bucket

# byte measurements
esbuild <entry>.mjs --bundle --minify --format=esm --external:react --external:react-dom
node -e "console.log(require('zlib').gzipSync(require('fs').readFileSync('<out>')).length)"

# charts feature census
rg -c "makeStyles|mergeClasses|shorthands\.|makeResetStyles|makeStaticStyles" \
   packages/charts/react-charts/library/src

# D2a5 permanent surface
rg -c ":global\(\.fui-Icon-" packages --glob '!node_modules' -g '*.module.css'   # 62 / 14 files

# remaining AOT
find packages -name "*.styles.raw.js" -not -path "*/node_modules/*" -printf "%s\n" \
  | awk '{s+=$1} END {print s, NR}'                                              # 197686 60
```

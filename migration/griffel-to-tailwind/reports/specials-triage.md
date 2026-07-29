# Specials triage — the last unconverted surface

**Date:** 2026-07-28
**Branch:** `styling/tailwind-css-modules`
**Scope:** the 13 packages carrying `status: "special"` in `migration/griffel-to-tailwind/ledger.json`, plus the
Phase-3-adjacent infra items that gate them.
**Mode:** read-only triage. Nothing was converted; no package files were modified.

Ledger state at triage time: **51 validated / 13 special / 24 no-styles / 0 needs-conversion**.

---

## 1. Headline

Three of the four things that made this set look hard have already been solved by the mass conversion,
and the triage confirms it against the tree rather than against the ledger notes (several of which are
now stale):

- **D6 is discharged.** `react-tabster`'s Griffel focus factories were flagged as a _blocker_ ("used by 46
  styles files; convert to shared CSS utilities FIRST"). The shared `fui-focus-outline` utility landed in
  `react-tailwind-theme` and 51 packages converted onto it. The factories now have **zero** consumers among
  converted component packages.
- **D9 is discharged.** The conformance replacement for `make-styles-overrides-win` exists and is documented
  in-tree.
- **`react-portal-compat` is already adapted.** It has no Griffel dependency at all and its provider-class
  regex was already updated for the converted `FluentProvider`.

What is genuinely left is **six ordinary cookbook conversions**, **three bespoke items**, **four
retire/deprecate items** — and **two infra gaps that are currently more urgent than any of the packages**,
because one of them means the public docsite renders all 51 already-converted packages unstyled.

---

## 2. Classification table

| #   | Package                     |   Styles files | Class | One-line verdict                                                                  |
| --- | --------------------------- | -------------: | ----- | --------------------------------------------------------------------------------- |
| 1   | `react-slider`              |              1 | **A** | Runtime vars are JS-written inline styles; CSS only reads them                    |
| 2   | `react-color-picker`        |              4 | **A** | Same; shares `--fui-Slider*` namespace with #1 — convert together                 |
| 3   | `react-positioning`         |              1 | **A** | Only `SafeZoneArea` has real CSS; factories are type-only and already transcribed |
| 4   | `react-tabs`                |              3 | **A** | Measured-rect hook and `makeStyles` share one file — split, don't redesign        |
| 5   | `react-tag-picker`          |              7 | **A** | ResizeObserver writes a **public** CSS var name that must survive verbatim        |
| 6   | `react-migration-v0-v9`     |             14 | **A** | "Attachment runtime width" is a plain inline style, not a Griffel concern         |
| 7   | `react-migration-v8-v9`     |              3 | **B** | Real v8 merge-styles ⇄ layered-CSS collision; needs a written adjudication first  |
| 8   | `recipes`                   |              2 | **B** | Docs project with no build target; its styles are _teaching material_             |
| 9   | `theme-designer`            | 2 (+13 inline) | **B** | App-shaped; no `dist/styles.css` contract; `makeStyles` inside a render body      |
| 10  | `react-tabster`             |              0 | **C** | No CSS of its own; D6 blocker discharged — deprecate-and-retire                   |
| 11  | `react-components`          |              0 | **C** | D7 settles it: re-exports stay, marked deprecated                                 |
| 12  | `react-conformance-griffel` |              0 | **C** | Replacement shipped; only deprecated packages still consume it                    |
| 13  | `react-portal-compat`       |              0 | **C** | Griffel-free and already adapted; ledger note is stale                            |

**Totals:** 6 × A (30 styles files) · 3 × B (7 styles files + ~13 inline call sites) · 4 × C (0 styles files).

---

## 3. Class A — convertible with the standard cookbook

All six were flagged for "runtime" behaviour. In every case the runtime part is **JavaScript writing a CSS
custom property**, and the stylesheet only ever _reads_ it with `var()`. Nothing about that requires Griffel;
it is the identical arrangement already shipped in validated `react-carousel` and `react-table`.

### A1 · `react-slider` — 1 styles file

- Var names are plain string constants: `Slider.constants.ts:2-10` (`--fui-Slider--direction`,
  `--fui-Slider--progress`, `--fui-Slider__thumb--size`, `--fui-Slider__rail--size`, …).
- They reach the DOM as an inline `style` attribute — visible in the committed snapshot,
  `__snapshots__/Slider.test.tsx.snap:7`: `style="--fui-Slider--direction: 90deg; --fui-Slider--progress: 50%;"`.
- Griffel surface: `useSliderStyles.styles.ts:3` (`makeStyles`, `mergeClasses`), four `makeStyles` blocks at
  L35/L120/L188/L237.
- Focus rings: `useSliderStyles.styles.ts:4,106,111` — `createFocusOutlineStyle` → shared `fui-focus-outline`
  utility per D6 (precedent: `react-switch`, `react-infolabel`).
- **VR coverage: yes** — `apps/vr-tests-react-components/src/stories/Slider/` (2 story files).

### A2 · `react-color-picker` — 4 styles files

- Same archetype: `ColorArea.test.tsx:18`, `ColorSlider.test.tsx:20`, `AlphaSlider.test.tsx:33` all show the
  vars arriving as inline `style` attributes.
- **Hard coupling to A1.** `ColorSlider` re-declares react-slider's exact var names
  (`useColorSliderStyles.styles.ts:16-21`) and `ColorArea` reads one directly:
  `useColorAreaStyles.styles.ts:24` → `` const thumbSizeVar = `--fui-Slider__thumb--size`  ``. These two packages
  must move in the same batch, or the names must be treated as a frozen cross-package contract.
- Focus rings: `useColorAreaStyles.styles.ts:6,72` (`createFocusOutlineStyle`).
- Griffel surface includes `makeResetStyles` (`useColorSliderStyles.styles.ts:38`,
  `useColorAreaStyles.styles.ts:29`) → the `fui.base` bucket-order treatment used in `react-swatch-picker`.
- **VR coverage: yes** — `stories/ColorPicker/` (1 story file). Has `cypress.config.ts` → gated on INFRA-2.

### A3 · `react-positioning` — 1 styles file

The ledger note ("style factories + runtime middlewares") overstates the work.

- The factories **only type-import Griffel**: `createArrowStyles.ts:2` and `createSlideStyles.ts:2` are both
  `import type { GriffelStyle }`. They are pure data functions returning plain objects.
- They were **already transcribed** into `react-tooltip` and `react-popover` during batch 4 (see the
  react-popover ledger note). D7 settles that they stay exported.
- Remaining in-repo consumer of `createArrowStyles`: `apps/vr-tests-react-components/src/stories/Positioning/utils.tsx:2,44`.
  `createSlideStyles` has **zero** in-repo consumers.
- The only real CSS is `hooks/useSafeZoneArea/SafeZoneArea.styles.ts:6` (`makeStyles`) plus
  `SafeZoneArea.tsx:3` (`mergeClasses`) — one internal debug/safe-zone surface.
- **VR coverage: yes** — `stories/Positioning/` (3 story files, incl. `PositioningSafeArea.stories.tsx`).
  Has `cypress.config.ts` → gated on INFRA-2.

### A4 · `react-tabs` — 3 styles files

- The one wrinkle: `useTabAnimatedIndicator.styles.ts` mixes **both concerns in one file** — the measurement
  hook (`getBoundingClientRect` at L54-55, `useAnimationFrame` at L86, L108) and `makeStyles` at L18.
  The conversion must _split_ the file: CSS → `.module.css`, hook stays TypeScript. This is mechanical, not
  a redesign.
- Vars `--fui-Tab__indicator--offset` / `--scale` (L14-15) again arrive as inline styles —
  `__snapshots__/Tab.test.tsx.snap:10`, `TabList.test.tsx.snap:80`.
- Focus rings: `useTabStyles.styles.ts:4,313,327` (`createCustomFocusIndicatorStyle`).
- **VR coverage: none** (no `Tabs`/`TabList` dir under `apps/vr-tests-react-components/src/stories/`).
  Validate via tests + seam audit + computed-style probes — the `react-nav` / `react-menu-grid-preview`
  precedent from batch 5.

### A5 · `react-tag-picker` — 7 styles files

- **Public API constraint.** `--fui-TagPickerControl-aside-width` is declared in the package's public types:
  `TagPickerControl.types.ts:26`. It is exported as a const from `useTagPickerControlStyles.styles.ts:19` and
  written at runtime by `useTagPickerControl.tsx:80`
  (`innerRef.current?.style.setProperty(tagPickerControlAsideWidthToken, …)`). The const must survive the
  conversion as a plain TS export with a byte-identical name.
- Second runtime write: `useTagPickerInput.tsx:187` (`input.style.setProperty(…, '100%')`).
- `useResizeObserverRef.ts` is pure JS — no styling concern.
- Jest: this package's config needs the css-modules serializer once `react-tags` classes reach its snapshots
  (already flagged in the `react-tags` ledger note).
- **VR coverage: none.** Has `cypress.config.ts` → gated on INFRA-2.

### A6 · `react-migration-v0-v9` — 14 styles files

- The "Attachment runtime width" flag is a false alarm: `Attachment.tsx:47` is
  `` style={{ width: `${progress}%` }} `` — an ordinary React inline style with no Griffel involvement.
- Coupling worth noting: this package imports its styling primitives from the **suite**, not from Griffel
  directly — `Attachment.styles.ts:3`:
  `import { createCustomFocusIndicatorStyle, makeResetStyles, makeStyles, tokens } from '@fluentui/react-components';`
  Under D7 the suite keeps re-exporting these, so nothing breaks; but this package is the reason the suite
  re-exports cannot simply be deleted.
- Also uses tabster focus factories at `List/ListItem/useListItemStyles.styles.ts:5,24`.
- **VR coverage: none.** Largest single A item — 14 files justifies its own batch.

---

## 4. Class B — genuinely bespoke

### B1 · `react-migration-v8-v9` — v8 merge-styles ⇄ layered CSS (D11)

Only 3 styles files, but the smallest code with the largest decision attached.

- The mixing is real and file-level, not incidental:
  - `Stack/StackShim.tsx:3-5` imports `mergeClasses` from `@griffel/react` **and** `classNamesFunction` from
    `@fluentui/react` (v8 merge-styles) in the same component.
  - `Stack/stackUtils.ts:1,117-118` builds and returns v8 `IStyle` objects.
  - `Checkbox/CheckboxShim.tsx:5-6` uses `ICheckboxStyles` / `ICheckboxStyleProps` / `classNamesFunction`.
- **The seam:** v8 merge-styles injects its rules **unlayered** at runtime into the same document. A converted
  module class living at `fui.components.l1` would _lose_ every collision against v8's unlayered output — the
  same class of failure the `react-infolabel` note documents for unconverted PopoverSurface, but permanent
  here, because v8 is never going to be converted.
- D11 already records this package as "converts last (special), given v8 interop"; D7 assumed a per-package
  conversion.
- **Bespoke work:** write a decision (a new D-entry) choosing between
  (a) leave these three files on Griffel indefinitely and document the exemption, or
  (b) author them **unlayered** so they sit in the same specificity regime as v8, or
  (c) convert and accept documented losses on Stack/Checkbox shims.
  Only after that decision is any code written. Note this package also carries react-integration-tester
  targets (`project.json` → `test-rit--17--test`, `test-rit--19--test`) that exercise real v8/v9 co-rendering.

### B2 · `recipes` — docs project, and the styles are the documentation

Two distinct reasons this is not a cookbook conversion:

1. **No build contract.** `project.json` tags `type:stories`; `sourceRoot` is `src/` with **no `library/`
   subfolder**; `package.json` is `private: true` and its `exports` map has **no `./styles.css` entry** — the
   thing all 53 converted packages have. `dist/styles.css` is not merely unbuilt, it is not expressible.
2. **The Griffel code is teaching material.** The files live under
   `src/recipes/media-object/code-snippets/` — `MediaObjectStyles.styles.ts:1,3,12,38` and
   `MediaObject.tsx:3,23,29,48,61-62`, plus the `src/templates/Example.styles.ts:2,4` /
   `Example.tsx:4,13` template. These are rendered to users as _how to write Fluent styles_. Converting them
   changes what the docs teach, which is an authoring-guidance decision, not a mechanical port.

Additional finding worth confirming during the work: `recipes/.storybook/main.js:4` globs
`'../stories/**/*.mdx'` and `'../stories/**/index.stories.@(ts|tsx)'`, but the package has **no `stories/`
directory** — its source is `src/`. Pre-existing inconsistency, unrelated to styling, but it will surface the
moment anyone tries to build this storybook.

**Depends on INFRA-1** — its storybook inherits the root config.

### B3 · `theme-designer` — app-shaped

- Shape: `private: true`, **no `library/` subfolder**, has `public/` and its own `.storybook/` — this is an
  application living in `packages/`, not a shipped library. No `./styles.css` export.
- Surface is wider than the ledger's "2 styles files": **13 `makeStyles` call sites across 13 files**, and
  most are inline in `.tsx` rather than in `.styles.ts` — `Content.tsx:13`, `Demo.tsx:36`, `Header.tsx:27`,
  `Nav.tsx:10`, `ExportPanel.tsx:25`, `AccessibilityList.tsx:29`, `ColorTokens/TokenList.styles.ts:4`,
  `ThemeDesigner.styles.ts`.
- One pattern the cookbook does not cover: `Export/ExportLink.tsx:74` calls `makeStyles({…})` **inside a
  component body**. That has no CSS-Modules equivalent and needs a hand-written answer.
- Like `recipes`, it imports `makeStyles` from the suite (`Content.tsx:2`, `Nav.tsx:2`), not from Griffel.
- **Depends on INFRA-1.**

---

## 5. Class C — no styling-migration work remains

### C1 · `react-tabster` — the D6 blocker is discharged

- **It has no CSS of its own.** Entire Griffel surface in `src/`: `createFocusOutlineStyle.ts:2`
  (`shorthands` — the only value import) and type-only imports at `createFocusOutlineStyle.ts:3`,
  `createCustomFocusIndicatorStyle.ts:2-3`. Zero `makeStyles`, zero `makeResetStyles`.
- The ledger's "used by 46 styles files; convert FIRST" is **historical**. Remaining callers repo-wide:
  - 4 Class-A specials: `react-color-picker`, `react-slider`, `react-tabs`, `react-migration-v0-v9`
  - 2 deprecated packages: `deprecated/react-alert/…/useAlertStyles.styles.ts:5,82`,
    `deprecated/react-infobutton/…/useInfoButtonStyles.styles.ts:5,99`
  - 1 re-export: `react-components/src/index.ts:35-36`
  - 3 docsite stories: `apps/public-docsite-v9/src/Utilities/FocusManagement/useFocusableGroup/{Default,Limited,LimitedTrapFocus}.stories.tsx:8,21`
  - 1 **leftover in a validated package** — see the seam in §7.
- D6 states the JS helpers "remain exported until Phase 3 cleanup". So: **no conversion**; this becomes a
  deprecate-and-retire item once the four Class-A callers land.

### C2 · `react-components` — settled by D7, not by conversion

- Zero styles files. `src/index.ts:2-16` re-exports 12 Griffel symbols (`__css`, `__resetCSS`,
  `__resetStyles`, `__styles`, `createDOMRenderer`, `makeResetStyles`, `makeStaticStyles`, `makeStyles`,
  `mergeClasses`, `RendererProvider`, `renderToStyleElements`, `shorthands`) plus 3 types
  (`GriffelStyle`, `GriffelRenderer`, `GriffelResetStyle`); `:35-36` re-exports the tabster focus helpers.
- D7 is explicit: _"Griffel symbol re-exports from the suite package remain (consumers may use them
  standalone); marked deprecated in the PR, removed in a later major."_
- Real consumers exist inside this repo — `react-migration-v0-v9` and `theme-designer` both import
  `makeStyles` from the suite — so removal is not available now regardless.
- **Work:** deprecation JSDoc + the D13 decision on whether the suite ships an aggregated convenience
  stylesheet. No conversion.

### C3 · `react-conformance-griffel` — replacement already shipped

- The D9 item "replacement test needed" is **done**: `packages/react-conformance/src/classNameOverridesWin.tsx`
  is the replacement and says so in its own header — _"This is the replacement for `make-styles-overrides-win`
  (in `@fluentui/react-conformance-griffel`) for components that have moved off Griffel to plain `clsx`
  composition."_ Siblings `componentHasGroupMarker.tsx` and `hasStaticClassNames.tsx` complete the flip
  recorded in the ledger's `staticsRemoval` entry.
- Remaining consumers of the Griffel package: **only the two deprecated packages** —
  `deprecated/react-alert/src/testing/isConformant.ts:8` and
  `deprecated/react-infobutton/src/testing/isConformant.ts:8` — plus a generator **fixture string** in
  `tools/workspace-plugin/src/generators/migrate-converged-pkg/index.spec.ts:1249,1278`.
- **Out of scope:** it is Griffel test infra for Griffel components. It retires with the deprecated packages.
  The generator fixture should stop emitting it for new packages.

### C4 · `react-portal-compat` — already adapted; ledger note is stale

- **Zero Griffel dependency.** `package.json` dependencies are exactly
  `@fluentui/react-portal-compat-context`, `@fluentui/react-tabster`, `@swc/helpers`. Zero styles files.
- The "regex-couples to provider className" concern is **already resolved in the file**.
  `PortalCompatProvider.tsx:11-23` carries migration-aware comments citing `DECISIONS.md` D16.1/D16.5, and
  `:23` reads:
  ```ts
  const CLASS_NAME_REGEX = new RegExp(`([^\\s]*${fluentProviderClassNames.root}\\w+)`, 'g');
  ```
  The `\w+` is deliberate — it matches the **runtime** `fui-FluentProvider<useId>` theme class and never the
  bare BEM static that D16.1 removed. The `react-provider` pilot note already records this as
  "empirically verified identical".
- **Work:** flip the ledger status. No code.

---

## 6. Infra items that intersect the specials

### INFRA-1 · Storybook CSS-modules + Tailwind wiring exists in exactly one place — CRITICAL

A repo-wide grep for `cssModulesRule|tailwindPostcssLoader|@tailwindcss/postcss` across every storybook
config returns **one file**: `apps/vr-tests-react-components/.storybook/main.js`. That file has the complete,
well-commented wiring — `cssModulesRule` (css-loader `modules.getLocalIdent` + `@tailwindcss/postcss` +
`globalize-group-markers`), `tailwindThemeRule`, a local `tailwind-theme.css` entry, and
`excludeTailwindCssFromDefaultCssRule()` to narrow the builder's implicit rule.

Nothing else has any of it:

| Config                                            | What it registers                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| `.storybook/main.js` (root)                       | `rules.swcRule` only                                                   |
| `scripts/storybook/src/rules.js:32-34`            | `cssRule` = `['style-loader','css-loader']` — no `modules`, no postcss |
| `apps/public-docsite-v9/.storybook/main.js`       | rootMain + `rules.scssRule` (+ optional reactCompilerRule)             |
| `apps/ssr-tests-v9/.storybook/main.js`            | rootMain, unmodified                                                   |
| ~40 × `packages/**/stories/.storybook/main.js`    | rootMain, unmodified (verified: `react-badge`)                         |
| `recipes/.storybook`, `theme-designer/.storybook` | rootMain, unmodified                                                   |

**Consequence.** The vr-tests config states the failure mode in its own comment: builder-webpack5's implicit
`/\.css$/` rule "would swallow `*.module.css` as global CSS and hand back an empty class map." On top of that,
every converted module opens with `@reference '#theme'` (Tailwind v4) and uses `@apply` — without the Tailwind
PostCSS pass those are emitted raw and are not valid CSS. So **the public docsite, ssr-tests, chart-docsite and
every per-package stories storybook currently render all 51 converted packages unstyled.** This outranks any
individual specials package.

**Fix shape:** promote the vr-tests wiring into `scripts/storybook/src/rules.js` as shared `cssModulesRule` /
`tailwindThemeRule` + the `excludeTailwindCssFromDefaultCssRule` narrowing, register them in the root
`.storybook/main.js`, and add a root `tailwind-theme.css` entry. Keep `griffelRule` alongside while specials
remain unconverted — the vr-tests config does exactly this and comments why.

**Sub-item 1-a (small, already 90% built).** The export-to-sandbox addon _already supports_ CSS modules —
`react-storybook-addon-export-to-sandbox/src/public-types.ts:46-51`,
`babel-preset-storybook-full-source/src/fullsource.ts:27-28,170-177`, `modifyImports.ts:21,58-60` — but the
root `.storybook/main.js` never passes the option, so `webpack.ts:23` defaults it to `cssModules: false`.
Enable it so sandbox exports carry module sources.

**Sub-item 1-b (blocks local verification on this machine).** D8 records that the docsite storybooks fail on
Windows via a POSIX-path regex. Still present:
`react-storybook-addon-export-to-sandbox/src/webpack.ts:19` →
`const addonFilePattern = /react-storybook-addon-export-to-sandbox\/[a-z/]+.[jt]s$/;`
Backslash paths never match. This must be fixed to verify INFRA-1 locally at all.

### INFRA-2 · Cypress has no CSS rule

`scripts/cypress/src/base.config.ts` initialises `baseWebpackConfig.module.rules = []` and the only rule ever
pushed is the `esbuild-loader` entry for `/\.(ts|tsx)$/`. There is no css, css-modules, or postcss rule
anywhere in the file, and a grep for `css-loader|style-loader|postcss` across all **37** `cypress.config.ts`
files in the repo returns nothing — no package overrides it.

Any `.cy.tsx` that mounts a component importing a `.module.css` therefore cannot bundle.

- **Specials affected:** `react-color-picker`, `react-positioning`, `react-tag-picker`, `react-tabster`,
  `react-portal-compat` all ship `cypress.config.ts`.
- **Verify first:** ~20 _already-converted_ packages also ship cypress configs (`react-avatar`, `react-menu`,
  `react-table`, `react-toast`, `react-popover`, `react-drawer`, `react-dialog`, `react-tree`, …). The
  `react-infolabel` ledger note records only a _type-level_ fix (`static-assets` in `tsconfig.cy.json`), which
  would not help the webpack bundle. This is very likely a latent red across those packages. Establish the
  true baseline before blaming any specials batch for it.

**Fix shape:** add a `.module.css` rule to `baseWebpackConfig` mirroring the storybook one — same
`getLocalIdent` from `scripts/css-modules/ident.js`, same `@tailwindcss/postcss` + `globalize-group-markers`
chain — so the three pipelines (build, storybook, cypress) stay on one ident scheme, as
`scripts/css-modules/ident.js` already promises for build + storybook + jest.

### Already-solved infra (no action)

`jest.preset.js:48-69` already ships `moduleNameMapper` for `\.module\.css$` →
`scripts/jest/src/css-modules/proxy.js` and `snapshotSerializers` → `scripts/jest/src/css-modules/serializer.js`,
with a documented caveat about the 85 per-package configs that replace the serializer array. The D9 jest
blocker is closed.

---

## 7. Seams found during triage (report-only, not part of any batch's own scope)

1. **`react-avatar` is `validated` but retains a Griffel focus factory.** The ledger records 4 styles files,
   but only 3 `.module.css` exist (`Avatar`, `AvatarGroup`, `AvatarGroupItem`).
   `AvatarGroupPopover/useAvatarGroupPopoverStyles.styles.ts:3,98` still imports and calls
   `createCustomFocusIndicatorStyle`. Fold into the tabster retirement batch (S6).
2. **Griffel-specific VR stories still present.** `apps/vr-tests-react-components/src/stories/MakeStyles/`
   (2 story files). D11 says these retire with their baselines and get listed explicitly in the PR.
3. **Docsite stories use the tabster factories directly** —
   `apps/public-docsite-v9/src/Utilities/FocusManagement/useFocusableGroup/{Default,Limited,LimitedTrapFocus}.stories.tsx:8,21`.
   These are documentation _about_ focus management; they need the same authoring-guidance call as `recipes`.
4. **`recipes/.storybook/main.js:4` points at a non-existent `stories/` directory** (source is `src/`).

---

## 8. Recommended execution order

Respecting the RUNBOOK regime — batches of 3-6 related packages, **batch-scoped validation** (the batch's own
VR sets plus only the directly-touched seams; full sweeps reserved for phase boundaries and the final PR gate),
bottom-up dependency order.

### S0 · Infra unblock — **do this first, before any package**

`INFRA-1` (+1-a, +1-b) and `INFRA-2`. No package conversion in this batch.
Rationale: INFRA-1 is a live defect against the 51 _already-converted_ packages, not a specials prerequisite —
it is the single highest-value item in the whole remaining set. INFRA-2 gates three of the six Class-A packages.
**Gate:** the docsite storybook builds on this machine and renders one known converted component correctly
styled; one converted package's cypress suite goes green (and the pre-existing baseline is recorded either way).

### S1 · Runtime-var cluster, VR-backed — `react-slider` + `react-color-picker` + `react-positioning`

6 styles files. Grouped because slider and color-picker **share the `--fui-Slider*` var namespace** and cannot
safely move apart, and because all three are the "JS writes the var, CSS reads it" archetype.
**This is the only remaining batch with real pixel coverage** — 6 VR story files across `Slider/`,
`ColorPicker/`, `Positioning/`. Depends on S0 (color-picker + positioning ship cypress configs).
**Gate:** scoped VR on those 3 story dirs at zero tolerance + tests + build.

### S2 · Runtime-var cluster, probe-validated — `react-tabs` + `react-tag-picker`

10 styles files. No VR stories for either → the batch-5 `react-nav` / `react-menu-grid-preview` protocol:
tests + seam audit + Chromium computed-style probes. Two named risks to carry into the work:
`useTabAnimatedIndicator.styles.ts` must be **split** (hook stays TS, CSS moves out), and
`--fui-TagPickerControl-aside-width` must survive **byte-identical** because `TagPickerControl.types.ts:26`
makes it public API. Depends on S0 (tag-picker ships a cypress config).

### S3 · `react-migration-v0-v9` — alone

14 styles files, the largest single remaining conversion, no VR coverage. Standalone on size alone.
Watch the suite-import coupling (`Attachment.styles.ts:3`) — this package is the reason the D7 re-exports
must stay alive through S6.

### S4 · `react-migration-v8-v9` — decision first, code second

3 styles files. **Do not open an editor until the layering adjudication is written** as a new D-entry
(layered / unlayered / documented-loss against v8's unlayered merge-styles). Small code, large decision;
its react-integration-tester targets are the natural gate.

### S5 · Docs + app surfaces — `recipes` + `theme-designer`

4 `.styles.ts` files plus ~13 inline `makeStyles` call sites in theme-designer. **Hard-depends on S0** — both
inherit the root storybook config and neither has a `dist/styles.css` contract to validate against.
Needs one authoring-guidance decision up front (does Fluent's own documentation teach Griffel or
Tailwind/CSS-Modules?), which also settles seam #3.

### S6 · Retirement sweep — `react-tabster` + `react-components` + `react-conformance-griffel` + `react-portal-compat`

Zero styles files across all four. Deprecation JSDoc on the suite re-exports (D7), retire the tabster focus
factories once S1-S3 have removed their last live callers, stop the workspace generator from scaffolding
`react-conformance-griffel` into new packages, flip the stale `react-portal-compat` ledger row, clear the
`react-avatar` leftover (seam #1), and retire the `MakeStyles` VR stories (seam #2).
**Must be last** — every earlier batch depends on the re-exports it deprecates.

---

## 9. Sized worklist

| Batch  | Contents                                                      |       Styles files | Validation available               | Size                | Risk                                             |
| ------ | ------------------------------------------------------------- | -----------------: | ---------------------------------- | ------------------- | ------------------------------------------------ |
| **S0** | INFRA-1 (+1a, +1b), INFRA-2                                   |                  0 | build + render check + cy baseline | S–M                 | **High** — touches every storybook               |
| **S1** | slider, color-picker, positioning                             |                  6 | **VR** (6 story files) + tests     | M                   | Low — archetype proven, pixel-gated              |
| **S2** | tabs, tag-picker                                              |                 10 | tests + seams + probes             | M                   | Med — no pixel gate; public var name; file split |
| **S3** | migration-v0-v9                                               |                 14 | tests + seams                      | M–L                 | Med — volume, no pixel gate                      |
| **S4** | migration-v8-v9                                               |                  3 | integration-tester + adjudication  | S code / L decision | **High** — v8 unlayered collision                |
| **S5** | recipes, theme-designer                                       | 2 + 2 (+13 inline) | storybook render only              | M                   | Med — no dist contract; docs semantics           |
| **S6** | tabster, react-components, conformance-griffel, portal-compat |                  0 | type-check + consumer sweep        | S                   | Low — deprecation and bookkeeping                |

**Totals:** 35 styles files convert (S1-S5) out of the 37 the specials carry; the remaining 2 are
`theme-designer`'s, counted in S5 alongside its inline call sites. Four packages (S6) convert nothing at all.

**Critical path:** S0 → S1 → S2 → S3 → S6, with S4 and S5 parallelisable against S1-S3 once their respective
decisions are written (S4's layering adjudication, S5's documentation-authoring call).

---

## 10. Ledger corrections this triage implies

Recommended, but **not applied** — this pass was read-only.

| Package                     | Current note                                      | Correction                                                                                                   |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `react-tabster`             | "convert to shared CSS utilities FIRST (D6)"      | D6 discharged; zero converted-package consumers remain; retire, don't convert                                |
| `react-conformance-griffel` | "replacement test needed (D9)"                    | Replacement shipped — `react-conformance/src/classNameOverridesWin.tsx`; only deprecated packages consume it |
| `react-portal-compat`       | "v8 interop; regex-couples to provider className" | Already adapted in-file (D16.1/D16.5 comments); zero Griffel deps                                            |
| `react-migration-v0-v9`     | "Attachment runtime width"                        | Plain React inline style (`Attachment.tsx:47`) — not a Griffel concern                                       |
| `react-positioning`         | "Style factories + runtime middlewares"           | Factories are type-only and already transcribed; one real styles file (`SafeZoneArea`)                       |
| `react-avatar`              | `validated`, 4 styles files                       | Only 3 `.module.css`; `AvatarGroupPopover` still Griffel — reopen as a seam                                  |

INFRA-1c: docsite full build blocked by 7 story files with '/\*_ @jsxRuntime automatic _/' + pragma conflict (react-motion x6, react-tree x1) — bisected independent of S0 config; NOT yet A/B'd against master. Fix or A/B in Phase 3.

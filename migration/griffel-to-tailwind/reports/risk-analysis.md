# Research: risk-analysis

_Generated 2026-07-26 by research workflow wf_7f8b1226-35f (research agents; verify against source before acting on stale claims)._

## Summary

Griffel is not a CSS-cascade system — it is a two-level ordering machine (a JS property-map merge in `mergeClasses` that _deletes_ losing classes, plus a bucket+priority stylesheet ordering that discards authored source order), and neither level has an equivalent in flat CSS Modules. I found 23 machine-verified places across 12 files where `mergeClasses` application order contradicts source-declaration order on a shared property (plus the Button `shape`-vs-`size` `borderRadius` case), 126 `makeResetStyles` bases whose subordination depends purely on bucket `r` preceding bucket `d`, and an RTL surface where Griffel rewrites _values_ (gradients, transforms, box-shadow, 4-value shorthands, keyframe bodies) that logical properties cannot cover. The `@layer` question resolves favorably — unlayered consumer CSS, plain or Griffel-atomic, always beats layered Fluent CSS for normal declarations — but only if 100% of Fluent's CSS is layered, and it introduces a brand-new failure mode where Fluent now loses to any unlayered third-party reset. The largest non-obvious blockers are `"sideEffects": false` in 83 of 85 packages (which will tree-shake CSS imports away silently) and a public API surface of 180 style hooks + 193 classNames objects + a 194-key `customStyleHooks_unstable` contract defined entirely in `mergeClasses` terms.

## Key facts

- `mergeClasses` merges JS property-maps with `Object.assign` and the later argument DELETES the earlier class from the DOM — it is not a CSS cascade (`node_modules/@griffel/core/mergeClasses.esm.js`); the repo documents the semantic at `docs/react-v9/contributing/rfcs/react-components/styles-handbook.md:217` and enforces it with the `make-styles-overrides-win` conformance test (`packages/react-components/react-conformance-griffel/src/overridesWin.ts`)
- Griffel discards authored source order entirely: rules are placed into `<style>` elements sorted by `styleBucketOrdering = ['r','d','l','v','w','f','i','h','a','s','k','t','m','c']` (reset → default → pseudo-classes → reset-at-rules → keyframes → at-rules → @media → @container), in `node_modules/@griffel/core/renderer/getStyleSheetForBucket.esm.js`. In-repo acknowledgement: `packages/react-components/react-positioning/library/src/createSlideStyles.ts:61` — `// Note: at-rules have more specificity in Griffel`
- Every Griffel selector is exactly one class (`node_modules/@griffel/core/runtime/compileAtomicCSSRule.esm.js`: `const classNameSelector = '.' + className`), so specificity is uniformly flat and bucket order is the sole tiebreaker
- `makeResetStyles` classes are opaque strings that never enter the property-map merge (`node_modules/@griffel/core/__resetStyles.esm.js` returns a bare class; `mergeClasses` concatenates any string lacking the `___` SEQUENCE_PREFIX). The 126 reset bases lose to variant classes ONLY because bucket `r` is emitted before bucket `d` — verified via `resolveResetStyleRules({...})` returning `{r:[...], s:[...]}`
- Shorthands get `data-priority="-1"` and reserve longhand keys with sentinel `0`: verified `resolveStyleRules({padding:'3px 8px'})` → map `{Byoj8tv:0,uwmqm3:0,z189sj:0,z8tnut:0,B0ocmuz:'f1qu6h98'}`, css `[".f1qu6h98{padding:3px 8px;}",{"p":-1}]`. Merging A-then-B keeps both classes (longhand wins by priority sheet); B-then-A deletes the longhand classes. Neither behavior exists in plain CSS
- 23 confirmed literal-vs-literal `mergeClasses` order inversions across 12 files (via `node .scratch/.scratch_order2.js`), e.g. `packages/react-components/react-link/library/src/components/Link/useLinkStyles.styles.ts:132-145` applies `styles.inverted`(L107)/`styles.brand`(L116) before `styles.disabled`(L79) on shared `color` — source-ordered CSS would render disabled Links with the inverted color
- `packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts:566-580` applies `rootStyles[size]`(L572) before `rootStyles[shape]`(L575) while `circular`(L284)/`square`(L288) are declared before `small`(L291-294)/`large`(L307-310); all four set `borderRadius`. Same inversion repeats in `useRootFocusStyles` (L466/470 vs L495/499)
- Griffel emits BOTH LTR and RTL classes per flippable declaration and selects at runtime from `TextDirectionProvider` — verified `resolveStyleRules({paddingLeft:'4px',textAlign:'left',backgroundImage:'linear-gradient(to right,…)'})` yields `.fycuoez{padding-left}`/`.f8wuabp{padding-right}`, `.f1o700av{text-align:left}`/`.fes3tcz{text-align:right}`, and both gradient directions. It does NOT use `[dir]` selectors or logical properties
- rtl-css-js flips VALUES, not just property names — empirically: `linear-gradient(to right)`→`to left`, `translate(-100%)`→`translate(100%)`, `box-shadow 2px 0`→`-2px 0`, `border-radius 4px 8px 12px 16px`→`8px 4px 16px 12px`, `padding 1px 2px 3px 4px`→`1px 4px 3px 2px`, `cursor:e-resize`→`w-resize`, `transform-origin:left top`→`right top`; but `translateX(var(--x))` is UNCHANGED. Logical properties cover none of these
- 87 of 261 v9 `.styles.ts` files (33%) contain physical L/R properties; as object keys: paddingLeft 62, paddingRight 67, marginLeft 39, marginRight 32, textAlign 40, left 63, right 46. Plus 179 `padding:` shorthands and 242 `shorthands.*` calls (211 of them `shorthands.borderColor`)
- Griffel auto-flips keyframe bodies and emits a second RTL `@keyframes` (`resolveResetStyleRules.esm.js` calls `convert(keyframeObject)`); only 12 `animationName` occurrences across 5 files, but `packages/react-components/react-skeleton/library/src/components/SkeletonItem/useSkeletonItemStyles.styles.ts:12-16,55-62` combines a flipped keyframe, a flipped base transform, and a flipped gradient
- `@fluentui/react-motion` has ZERO Griffel dependency — `packages/react-components/react-motion/library/package.json` describes it as "utilities & motion definitions using Web Animations API", and `library/src/hooks/useAnimateAtoms.ts:127` calls `element.animate(...)`. `react-motion-components-preview` likewise depends only on `@fluentui/react-motion` and `react-utilities`. All motion migrates untouched
- Zero true Griffel runtime interpolation exists: `rg -l "makeStyles" --glob "packages/react-components/*/library/lib/**/*.js"` returns 0 — everything ships pre-compiled as `__styles`/`__resetStyles` (see `packages/react-components/react-button/library/lib/components/Button/useButtonStyles.styles.js`). Even `Object.fromEntries(Array.from({length:10},…))` in `react-tree/.../useTreeItemStyles.styles.ts:53-60` is statically evaluated
- All runtime-varying styling already uses inline `style` / CSS custom properties and survives unchanged: Slider (`useSliderState.tsx:42-46`), Tab indicator (`useTabAnimatedIndicator.styles.ts:135-136`), positioning (`middleware/maxSize.ts:54-62`, `matchTargetSize.ts:20`, `usePositioningSlideDirection.ts:65-66`), Toast (`state/vanilla/getPositionStyles.ts`), Tree levels >10 (`useTreeItemStyles.styles.ts:83-88`), Avatar colors (`useAvatar.tsx:35`)
- The only parameterized style AUTHORING is build-time factories returning `GriffelStyle`: `react-positioning/library/src/createArrowStyles.ts` (+`createArrowHeightStyles`), `createSlideStyles.ts`, and `react-tabster/src/focus/createFocusOutlineStyle.ts`/`createCustomFocusIndicatorStyle.ts` — the latter used in 46 v9 styles files and accepting an arbitrary `customizeSelector` function (4 files, e.g. `useTreeItemStyles.styles.ts:44-46`)
- Iframe styling depends on `createDOMRenderer(contentDocument)` + `RendererProvider targetDocument` (`packages/react-components/react-provider/stories/src/Provider/FluentProviderFrame.stories.tsx:43,79-85`, story text: "A FluentProvider does not cross an iframe boundary"); shadow DOM depends on `createShadowDOMRenderer(root)` from `@griffel/shadow-dom` 0.2.2 (`apps/vr-tests-react-components/src/stories/ShadowDOM/utils.tsx:1-17`). Static stylesheets cross neither boundary
- The CSP nonce for Fluent's theme `<style>` is sourced from the Griffel renderer: `packages/react-components/react-provider/library/src/components/FluentProvider/useFluentProvider.ts:66,71` reads `useRenderer_unstable().styleElementAttributes`, applied at `useFluentProviderThemeStyleTag.ts:59,124`, asserted at `FluentProvider-node.test.tsx:53-70`
- `react-portal-compat` is SAFE — `packages/react-components/react-portal-compat/src/PortalCompatProvider.tsx` only copies `fui-FluentProviderN` CSS-variable scoping classes onto portal elements (`element.classList.add(...cssVariablesClasses)`), not style rules
- SSR flows live in `scripts/test-ssr/src/utils/renderToHTML.ts:16,29,31` (`createDOMRenderer` → `RendererProvider` → `renderToStyleElements`) and `generateEntryPoints.ts:23,29,34-36`; `apps/ssr-tests-v9` holds only the story fixtures. A `<link>` replaces them, but `renderFluentProvider.tsx:44-52` separately emits an inline `<style dangerouslySetInnerHTML>` for theme vars during SSR and `useFluentProviderThemeStyleTag.ts:117,138-153` relocates it to `<head>` on hydration — both must be preserved
- Public API surface: 180 `useXStyles_unstable` hooks and 193 `xClassNames` objects exported from `packages/react-components/react-components/src/index.ts`; 12 Griffel symbols re-exported (`makeStyles`, `mergeClasses`, `createDOMRenderer`, `RendererProvider`, `renderToStyleElements`, `shorthands`, `__styles`, …) plus `GriffelStyle`/`GriffelRenderer`/`GriffelResetStyle` types
- `customStyleHooks_unstable` is a 194-key public extension point (`packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts`) wired into 193 component files via `useCustomStyleHook_unstable('useXStyles_unstable')(state)` (e.g. `react-button/.../Button.tsx:19`); `packages/react-components/react-utilities/src/compose/getSlotClassNameProp.ts` exists solely to let those hooks re-append the user className after their own — the entire mechanism is defined in `mergeClasses` ordering terms
- Static `fui-*` classes are always the FIRST `mergeClasses` argument (`useButtonStyles.styles.ts:567,585`) and pass through untouched as non-atomic strings; they are guarded by `component-has-static-classnames-object` (`packages/react-conformance/src/defaultTests.tsx:253-292`) across 839 `isConformant` call sites, and are referenced as selectors 191 times across 22 files (e.g. `& .${splitButtonClassNames.primaryActionButton}`) — every such selector needs `:global()` in a CSS Module
- 83 of 85 v9 packages declare `"sideEffects": false` (`rg -n '"sideEffects"' --glob "packages/react-components/**/package.json" -g '!node_modules' --no-filename | sort | uniq -c` → 77+6 false, 2 arrays) — a bare `import './x.module.css'` will be tree-shaken away by webpack/Rollup
- 73 `jest.config.js` files register `@griffel/jest-serializer` (which strips atomic classes so snapshots read `class="fui-Badge fui-CounterBadge"`); 141 `.snap` files exist and 126 contain `class=` — all churn unless an equivalent CSS-Modules serializer is written
- Build pipeline has no CSS-Modules path for `.css`: `scripts/storybook/src/rules.js:31-34` `cssRule` is `['style-loader','css-loader']` with no `modules: true`, and the only `modules: true` rule (`scssRule` :38-69) is `.scss`-only with `exclude: [/node_modules/]`; `monosize.config.mjs`'s webpack bundler has no CSS rule and there are 108 bundle-size fixtures
- `packages/react-components/eslint-plugin-react-components/src/rules/enforce-use-client.ts:119-124` lists `makeStyles`/`makeResetStyles`/`makeStaticStyles` as RSC-unsafe, driving 251 `'use client'` directives in `.styles.ts` files — CSS Modules are RSC-safe so this rule and those directives become stale
- The Fluent theme is CLASS-scoped, not `:root`-scoped: `packages/react-components/react-provider/library/src/components/FluentProvider/createCSSRuleFromTheme.ts:24-33` emits `.fui-FluentProviderN { --colorNeutralBackground1: …; }`. 467 tokens / 459 keys per theme, values shaped `var(--tokenName)` unprefixed, 11 theme exports — Tailwind v4 `@theme` writes to `:root` and cannot express nested-provider theme scoping
- `@layer` is currently used ONLY in `packages/web-components/src/**` (dialog, drawer, menu-item, progress-bar) — never in v9 React; and `!important` appears only 7 times in 1 file (`react-badge/.../usePresenceBadgeStyles.styles.ts:84-101`), which is the file whose semantics invert once Fluent CSS becomes layered
- Griffel appends its first `<style>` bucket to the END of `<head>` (`getStyleSheetForBucket` → `insertBefore(tag, null)` when no bucket elements exist), so today a plain (non-Griffel) consumer class of equal specificity LOSES to Fluent — post-migration with `@layer` it will WIN. `createDOMRenderer` accepts an `insertionPoint` option (`node_modules/@griffel/core/renderer/createDOMRenderer.esm.js:20`) that some consumers may rely on
- In-repo precedent for the target convention already exists: `packages/react-components/react-headless-components-preview/stories/src/**/*.module.css` (plain CSS Modules with `data-*` selectors, relying on source order) and `packages/react-components/babel-preset-storybook-full-source/src/__fixtures__/**/css-module-*` fixtures
- 57 files import `@fluentui/react-conformance-griffel` (per-package `src/testing/isConformant.ts`); its `make-styles-overrides-win` test jest-mocks `@griffel/react`'s `mergeClasses` and will fail for 100% of migrated components. 20+ components already opt out via `disabledTests: ['make-styles-overrides-win']`
- `@fluentui/react-migration-v8-v9` mixes v8 `IStyle`/`ITheme` with Griffel `makeStyles` (`library/src/components/Stack/StackShim.styles.ts:3`, `StackItemShim.styles.ts:3`, `Checkbox/Checkbox.styles.ts:3`, `Stack/stackUtils.ts:1,117-118`) and coexists with v8 `@fluentui/merge-styles` (`packages/merge-styles/src/Stylesheet.ts`, own nonce at :397-398) — once v9 is layered, unlayered v8 merge-styles wins every tie in mixed apps
- Scale metrics: 261 v9 `.styles.ts` files, 410 `makeStyles(` + 126 `makeResetStyles(` calls, 516 `mergeClasses(` call sites in 230 library-src files; within `.styles.ts` alone 487 `mergeClasses` calls averaging 4.06 args (max 27 in `react-text/.../useTextStyles.styles.ts`), 77 calls with ≥6 args, 15 with ≥10; 1086 v9 story files of which 427 use `makeStyles`; 137 VR test story files
- `:global()` appears only 5 times in v9 src — 4 in `packages/react-components/react-positioning/library/src/createArrowStyles.ts:104-116` (`[data-popper-placement^=…]`) and 1 in `packages/react-components/react-tabster/src/focus/constants.ts:2` (`KEYBOARD_NAV_SELECTOR`). `@noflip` appears 5 times, all in `createArrowStyles.ts:98,109,116`

## Risks

- BLOCKER — `"sideEffects": false` in 83 of 85 v9 packages will cause webpack/Rollup to tree-shake `import './x.module.css'` away, shipping unstyled components with no build error. Must flip to `"sideEffects": ["*.css"]` and verify `"files"` includes emitted CSS, before any pilot conversion is trusted.
- BLOCKER — no build path exists for CSS Modules today: `scripts/storybook/src/rules.js:31-34` has no `modules: true` for `.css`, the only modules rule excludes `node_modules`, and `monosize.config.mjs`'s webpack bundler (108 fixtures) has no CSS rule at all. Consumer-bundler behavior for `.module.css` imported from `node_modules` (Next.js in particular) must be validated before committing to shipping raw CSS Modules rather than pre-bundled CSS.
- HIGH — Naive object-order → CSS-source-order translation produces silent visual regressions. 23 confirmed inversions in 12 files plus the Button `shape`/`size` `borderRadius` case; 40 files flagged by the broader scan need manual triage. No existing unit test catches these; only VR screenshots would, and only if the affected variant combination is in a story.
- HIGH — The 126 `makeResetStyles` bases have NO mechanism other than bucket ordering keeping them below variant classes. A flat `:where()`-based CSS Module with the reset written last in the file inverts every base/variant relationship in the library. Explicit `@layer` sublayers mirroring `mergeClasses` argument order are mandatory, not optional.
- HIGH — RTL cannot be solved by logical properties alone. Value-level flips (gradients, `translate()`, box-shadow x-offset, 4-value shorthands, `cursor`, `transform-origin`, keyframe bodies) require hand-authored `[dir=rtl]`/`:dir(rtl)` rules. `[dir=]` costs a specificity step that defeats the `:where()`-flatness plan; `:dir()` is the specificity-safe option but is a newer baseline and needs an explicit browser-support decision. Griffel also currently forbids mixing LTR/RTL classes on one element (dev error in `mergeClasses`), so nested-direction behavior will change.
- HIGH — Once Fluent CSS is layered, it loses to ANY unlayered third-party CSS regardless of specificity: normalize.css, Bootstrap, unlayered Tailwind Preflight, or a host app's `button { … }` will override Fluent styles that Griffel currently wins. This is a brand-new failure mode with no analogue today and will surface only in real consumer apps, not in this repo's Storybook.
- HIGH — `!important` semantics invert under layers. Consumers who used `!important` to defeat unlayered Griffel will find their override now LOSES to `@layer fui`'s `!important` (`usePresenceBadgeStyles.styles.ts:84-101`). Conversely Fluent's own `!important` becomes stronger than intended.
- HIGH — Iframe and shadow-DOM scenarios have no static-CSS equivalent. `createDOMRenderer(targetDocument)` / `createShadowDOMRenderer(root)` are the only way Fluent styles reach a foreign Document or ShadowRoot today; a `<link>` in the host document reaches neither. Requires new runtime infrastructure (stylesheet cloning into iframes, `adoptedStyleSheets` for shadow roots) and new public API. Host-app usage is unmeasurable from this repo.
- HIGH — Massive public API break: 180 `useXStyles_unstable`, 193 `xClassNames`, a 194-key `customStyleHooks_unstable` contract wired into 193 components, `createFocusOutlineStyle`/`createCustomFocusIndicatorStyle` returning `GriffelStyle`, `getSlotClassNameProp_unstable`, and 12 re-exported Griffel symbols. The documented recomposition and custom-styling contracts are defined entirely in `mergeClasses` terms and have no CSS-Modules translation.
- MEDIUM-HIGH — CSP nonce plumbing is sourced from the Griffel renderer (`useRenderer_unstable().styleElementAttributes`). Removing `RendererProvider` orphans the only channel by which apps supply a nonce for Fluent's runtime theme `<style>`; a replacement provider must ship in the same release.
- MEDIUM-HIGH — Theme scoping is class-based per `FluentProvider` (467 tokens, nested providers = nested scopes). Tailwind v4's `@theme` writes to `:root` and cannot express this. Any Tailwind utility whose value resolves from `@theme` at `:root` will not respond to a nested `FluentProvider theme={...}`. Only `--base-scale` is safe to route through Tailwind's theme.
- MEDIUM-HIGH — Shorthand/longhand determinism (`p:-1`) is unreplicable in flat CSS. 179 `padding:` shorthands and 242 `shorthands.*` calls currently rely on two distinct Griffel mechanisms; converting them naively will produce order-dependent padding/border bugs. Safest path is to eliminate shorthands entirely in the emitted CSS (longhands only), which conflicts with `@apply`-based Tailwind utility usage.
- MEDIUM — Test infrastructure churn is repo-wide: `make-styles-overrides-win` (57 packages) fails by construction and needs replacing with a computed-style assertion; 126 `.snap` files churn because `@griffel/jest-serializer` (73 jest configs) will not strip CSS-Module hashes; 108 monosize fixtures break; 251 `'use client'` directives and the `enforce-use-client` rule become stale.
- MEDIUM — 191 cross-component selector references to `fui-*` static classes across 22 files (heaviest: SplitButton, ToggleButton, ColorSlider) each need `:global()`. Any one missed is a silently hashed selector that matches nothing — a whole-slot styling failure with no build error.
- MEDIUM — `customizeSelector` (a selector-transform function, 4 call sites) and the parameterized style factories (`createArrowStyles(options)`, `createArrowHeightStyles(n)`, `createSlideStyles(n)`, `createFocusOutlineStyle({style})` used in 46 files) are function-shaped style generators with no CSS-Modules equivalent. Each needs a bespoke resolution into concrete rules or `calc()`-over-vars.
- MEDIUM — Mixed v8/v9 apps regress: v8 `@fluentui/merge-styles` is unlayered, so once v9 moves into `@layer` it loses every equal-specificity tie to v8. `@fluentui/react-migration-v8-v9` shims (StackShim, StackItemShim, CheckboxShim) sit exactly on that seam.
- LOW-MEDIUM — Cascade-layer registration order is fixed by first appearance of the layer name; a consumer stylesheet that declares layers before Fluent's CSS loads can invert the intended relationship. Fluent must emit a bare `@layer fui.…;` statement as early as possible and treat the layer names as public API.
- LOW — The 12 `animationName` keyframe definitions (5 files) lose Griffel's automatic RTL keyframe twin and name hashing. Small surface, but Skeleton's wave animation visibly reverses direction in RTL if missed.

## Full report

> Every count below was produced by a command shown inline. Griffel versions in play: `@griffel/react ^1.5.32` (declared by 71 packages), resolved `@griffel/core 1.19.2`, `@griffel/shadow-dom 0.2.2`, `@griffel/webpack-loader 2.2.10`, `@griffel/babel-preset 1.5.8`, `@griffel/jest-serializer 1.1.24` (`package.json:67-72`, `node_modules/@griffel/core/package.json`).

---

# 0. The mental model you have to replace

Griffel is **not** a CSS-cascade system with hashed classes. It is a **two-level ordering machine**, and both levels are invisible in the authored source:

**Level 1 — JS property-map merge (`mergeClasses`).** `node_modules/@griffel/core/mergeClasses.esm.js` collects the property-map of each argument out of `DEFINITION_LOOKUP_TABLE` and does `Object.assign.apply(Object, [{}].concat(sequenceMappings))`. The later argument **deletes** the earlier argument's atomic class from the emitted `class` attribute. Nothing reaches CSS to be "cascaded over" — the loser is simply not on the element.

**Level 2 — bucket + priority stylesheet ordering.** `node_modules/@griffel/core/renderer/getStyleSheetForBucket.esm.js` defines `styleBucketOrdering`:

```
['r','d','l','v','w','f','i','h','a','s','k','t','m','c']
 reset  default  link visited focus-within focus focus-visible hover active
 reset-at-rules  keyframes  at-rules  @media  @container
```

Every Griffel rule is placed into a `<style data-make-styles-bucket="X" data-priority="N">` element and those elements are kept sorted by `(bucketIndex, priority)`. Authored source order is **discarded**. Verified empirically:

```
$ node -e "const {resolveStyleRules}=require('@griffel/core'); console.log(JSON.stringify(resolveStyleRules({padding:'3px 8px',borderRadius:'4px',color:'red',':hover':{color:'blue'},'@media (forced-colors: active)':{color:'green'}})))"
[{...,"B0ocmuz":"f1qu6h98",...},
 {"d":[[".f1qu6h98{padding:3px 8px;}",{"p":-1}],
       [".ff3glw6{border-radius:4px;}",{"p":-1}],
       ".fe3e8s9{color:red;}"],
  "h":[".f10q6zxg:hover{color:blue;}"],
  "m":[["@media (forced-colors: active){.f13a6lk2{color:green;}}",{"m":"(forced-colors: active)"}]]}]
```

Three semantics fall out of that one output and none of them exist in plain CSS Modules:

- **shorthands get `p: -1`** → a shorthand always loses to a longhand, no matter where it was authored;
- **`:hover` goes to bucket `h`, `@media` to bucket `m`** → at-rules always win ties against non-at-rules. The repo already knows this: `packages/react-components/react-positioning/library/src/createSlideStyles.ts:61` carries the comment `// Note: at-rules have more specificity in Griffel`;
- **every selector is exactly one class** (`node_modules/@griffel/core/runtime/compileAtomicCSSRule.esm.js`, `const classNameSelector = '.' + className`) → specificity is uniformly flat, so bucket order is the _only_ tiebreaker.

`makeResetStyles` is a third case: `node_modules/@griffel/core/__resetStyles.esm.js` returns a bare class string, and `mergeClasses` treats any string without the `___` `SEQUENCE_PREFIX` as opaque (`resultClassName += className + ' '`). **Reset classes never participate in the Level-1 merge at all.** Their subordination to variant classes is _purely_ "bucket `r` is emitted before bucket `d`". Verified:

```
$ node -e "const {resolveResetStyleRules}=require('@griffel/core'); console.log(JSON.stringify(resolveResetStyleRules({color:'red',padding:'3px 8px',':hover':{color:'blue'},'@media (forced-colors: active)':{color:'green'}})))"
["ry5p49z",null,{"r":[".ry5p49z{color:red;padding:3px 8px;}",".ry5p49z:hover{color:blue;}"],
                "s":["@media (forced-colors: active){.ry5p49z{color:green;}}"]}]
```

Scale of what depends on this: **126 `makeResetStyles(` and 410 `makeStyles(` calls across 261 `.styles.ts` files** (`rg -o "\bmakeResetStyles\(" --glob "packages/react-components/**/*.styles.ts" -g '!node_modules' --no-filename | wc -l`; same for `makeStyles`; `find packages/react-components -name "*.styles.ts" -not -path "*/node_modules/*" | wc -l`), consumed by **516 `mergeClasses(` call sites in 230 files** (`rg -o "mergeClasses\(" --glob "packages/react-components/**/library/src/**/*.ts*" -g '!node_modules' -g '!*.test.*' -g '!*.cy.tsx' --no-filename | wc -l`).

Also note the whole v9 surface ships **pre-compiled**: `packages/react-components/react-button/library/lib/components/Button/useButtonStyles.styles.js` contains `__resetStyles("r1f29ykk", null, {r:[...], s:[...]})` and `__styles({...})`, and `rg -l "makeStyles" --glob "packages/react-components/*/library/lib/**/*.js"` returns **0 files** — i.e. there is no runtime style _authoring_ to preserve, only runtime _insertion_.

---

# 1. `mergeClasses` order semantics — where CSS Modules source order breaks

The repo documents the semantic explicitly at `docs/react-v9/contributing/rfcs/react-components/styles-handbook.md:217`:

> "Unlike native CSS, the output of mergeClasses() is affected by the order of the classes passed in, allowing for control over priority of style overrides."

and enforces the tail-position rule with a dedicated conformance test, `packages/react-components/react-conformance-griffel/src/overridesWin.ts` (`OVERRIDES_WIN_TEST_NAME = 'make-styles-overrides-win'`, asserts `toContainClassNameLastInCalls(className)`).

### 1a. Measured: 23 confirmed order inversions in 12 files

I wrote a parser (`.scratch/.scratch_order2.js`, run with `node .scratch/.scratch_order2.js`) that, for every `.styles.ts`, extracts the declaration order of keys inside each `makeStyles({...})` and the application order of literal `stylesVar.key` references inside each `mergeClasses(...)`, then reports pairs where **the key applied later in `mergeClasses` was declared earlier in the source AND both declare a common top-level CSS property**. Restricted to literal-vs-literal (unambiguous) pairs:

```
HIGH-CONFIDENCE (literal-key vs literal-key) ORDER INVERSIONS: 23
FILES: 12
```

The full list (each one is a place where naive "translate the object to a `.module.css` in the same order" produces the **wrong** pixel):

| File                                                                                                                                                        | Hook                          | Applied first → later                                                                                  | Declared order                          | Conflicting property                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------- | ----------------------------------------------- |
| `packages/react-components/react-link/library/src/components/Link/useLinkStyles.styles.ts`                                                                  | `useStyles`                   | `inverted` → `disabled`                                                                                | `disabled`(L79) before `inverted`(L107) | `color`                                         |
| same                                                                                                                                                        | `useStyles`                   | `brand` → `disabled`                                                                                   | `disabled`(L79) before `brand`(L116)    | `color`                                         |
| `packages/react-components/react-field/library/src/components/Field/useFieldStyles.styles.ts`                                                               | `useLabelStyles`              | `horizontal`/`horizontalSmall`/`horizontalLarge` → `vertical`/`verticalLarge` (6 pairs)                | vertical\* declared first               | `paddingTop`,`paddingBottom`                    |
| `packages/react-components/react-badge/library/src/components/PresenceBadge/usePresenceBadgeStyles.styles.ts`                                               | `useStyles`                   | `statusUnknown`/`outOfOffice`/`outOfOfficeAvailable`/`outOfOfficeBusy` → `statusOutOfOffice` (4 pairs) | `statusOutOfOffice` first               | `color`                                         |
| `packages/react-components/react-rating/library/src/components/RatingItem/useRatingItemStyles.styles.ts`                                                    | `useIndicatorStyles`          | `filled`→`brand`, `filled`→`marigold`, `brandFilled`→`marigold`                                        | brand/marigold first                    | `color`                                         |
| `packages/react-components/react-label/library/src/components/Label/useLabelStyles.styles.ts`                                                               | `useStyles`                   | `required` → `disabled`                                                                                | `disabled` first                        | `color`                                         |
| `packages/react-components/react-image/library/src/components/Image/useImageStyles.styles.ts`                                                               | `useStyles`                   | `block` → `fitFill`                                                                                    | `fitFill` first                         | `width`                                         |
| `packages/react-components/react-dialog/library/src/components/DialogActions/useDialogActionsStyles.styles.ts`                                              | `useStyles`                   | `gridPositionStart` → `gridPositionEnd`                                                                | `gridPositionEnd` first                 | `justifySelf`,`gridColumnStart`,`gridColumnEnd` |
| `packages/react-components/react-combobox/library/src/components/Option/useOptionStyles.styles.ts`                                                          | `useStyles`                   | `multiselectCheck` → `selectedCheck`                                                                   | `selectedCheck` first                   | `visibility`                                    |
| `packages/react-components/react-nav/library/src/components/NavSubItem/useNavSubItemStyles.styles.ts`                                                       | `useNavSubItemSpecificStyles` | `smallBase` → `base`                                                                                   | `base` first                            | `paddingInlineStart`                            |
| `packages/react-components/react-calendar-compat/.../CalendarDay/useCalendarDayStyles.styles.ts` and `.../CalendarPicker/useCalendarPickerStyles.styles.ts` | `useRootStyles`               | `normalize` → `base`                                                                                   | `base` first                            | `boxSizing`,`padding`                           |
| `packages/react-components/react-teaching-popover/.../useTeachingPopoverCarouselFooterButtonStyles.styles.ts`                                               | `useStyles`                   | `brandPrevious` → `brandNext`                                                                          | `brandNext` first                       | `color`,`backgroundColor`,`hover`               |

Concrete walk-through of the Link case — `packages/react-components/react-link/library/src/components/Link/useLinkStyles.styles.ts:132-145`:

```ts
state.root.className = mergeClasses(
  linkClassNames.root, styles.root, styles.focusIndicator,
  ...,
  backgroundAppearance === 'inverted' && styles.inverted,   // declared L107
  backgroundAppearance === 'brand' && styles.brand,         // declared L116
  inline && styles.inline,
  disabled && styles.disabled,                              // declared L79  ← wins today
  state.root.className,
);
```

Today a disabled Link on an inverted background is `colorNeutralForegroundDisabled`. In a source-ordered `.module.css` it would render `colorBrandForegroundInverted` — a silent visual regression not caught by any unit test.

### 1b. Cross-axis inversions the literal-only scan cannot see

`packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts` — `mergeClasses` at L566-580 applies `rootStyles[size]` (L572) **before** `rootStyles[shape]` (L575), but in the object literal `circular`(L284) and `square`(L288) are declared **before** `small`(L291-294) and `large`(L307-310), and all four set `borderRadius`. Griffel: `circular` wins → `borderRadiusCircular`. Source-ordered CSS: `small`/`large` win → `borderRadiusMedium`. Every `<Button shape="circular" size="small|large">` renders wrong. The identical inversion repeats in `useRootFocusStyles` (`circular` L466 / `square` L470 declared before `small` L495 / `large` L499; applied `rootFocusStyles[size]` then `rootFocusStyles[shape]`).

The unrestricted scan (`node .scratch/.scratch_order.js`) reports **395 candidate pairs across 40 files**; most are false positives from mutually-exclusive enum axes, but the Button case above proves the class is real and manual triage of those 40 files is required.

### 1c. Shorthand-vs-longhand: a Griffel semantic with **no** CSS Modules equivalent

Verified merge behaviour:

```
$ node -e "const {resolveStyleRules:r}=require('@griffel/core');
  const a=r({padding:'3px 8px'}), b=r({paddingBottom:'1px',paddingTop:'1px'});
  console.log(JSON.stringify(a[0]), JSON.stringify(a[1]));
  console.log(JSON.stringify(b[0]));
  console.log('A then B:',JSON.stringify(Object.assign({},a[0],b[0])));
  console.log('B then A:',JSON.stringify(Object.assign({},b[0],a[0])));"

A map: {"Byoj8tv":0,"uwmqm3":0,"z189sj":0,"z8tnut":0,"B0ocmuz":"f1qu6h98"}
A css: {"d":[[".f1qu6h98{padding:3px 8px;}",{"p":-1}]]}
B map: {"Byoj8tv":"f1brlhvm","z8tnut":"f1sl3k7w"}
A then B: {"Byoj8tv":"f1brlhvm",...,"B0ocmuz":"f1qu6h98"}   ← BOTH classes on element, p:-1 makes longhand win
B then A: {"Byoj8tv":0,"z8tnut":0,...,"B0ocmuz":"f1qu6h98"} ← longhand classes DELETED
```

A shorthand reserves the longhand keys with sentinel `0` and registers itself under its own key with `data-priority="-1"`. So Griffel gives you _both_ "shorthand deletes later-merged longhands" **and** "shorthand always loses to a co-present longhand regardless of order". Plain CSS gives you neither: a shorthand declaration wipes all its longhands within its own block, and cross-rule it is pure source order.

In-repo exposure: **179 `padding:` shorthand declarations** (`rg -o "^\s+padding: " --glob "packages/react-components/**/*.styles.ts" --no-filename | wc -l`). Live example — `useButtonStyles.styles.ts` `small` sets `padding: '3px 8px'` (L292) while `smallWithIcon` sets `paddingBottom`/`paddingTop` (L296-299), and `useRootIconOnlyStyles.small` (L504-509) sets `padding` again but is applied _later_ in `mergeClasses` (L578). Three-way shorthand/longhand interleave, resolved today by two independent mechanisms.

Separately, `shorthands.*` helpers **do** expand at the source level (verified: `shorthands.borderColor('transparent')` → `{borderTopColor, borderRightColor, borderBottomColor, borderLeftColor}`), and are used **242 times**:

```
$ rg -o "shorthands\.[a-zA-Z]+" --glob "packages/react-components/**/*.styles.ts" --no-filename | sort | uniq -c | sort -rn
    211 shorthands.borderColor
     16 shorthands.borderWidth
     12 shorthands.borderStyle
      2 shorthands.padding
      1 shorthands.margin
      1 shorthands.borderRadius
```

### 1d. Why `:where()` alone does not restore determinism

`migration/griffel-to-tailwind/README.md` specifies `@custom-variant name (&:where([data-...="..."], :pseudo));` with the rationale "`:where()` keeps specificity flat so consumer overrides win". Correct for consumers — but it means every Fluent rule ties at 0-1-0 and **source order becomes the sole tiebreaker**, which is exactly the mechanism Griffel deliberately discarded. Determinism has to be restored explicitly: either (a) emit rules in `mergeClasses` order rather than declaration order, or (b) use nested sub-layers (`@layer fui.reset, fui.base, fui.size, fui.shape, fui.state, fui.disabled;`) that mirror the argument order of `mergeClasses`. Option (b) also naturally reproduces bucket `r` < bucket `d` for the 126 `makeResetStyles` bases and the `p:-1` shorthand demotion.

---

# 2. Consumer `className` overrides + `@layer` — the compatibility crux

### 2a. Two distinct consumer populations, different mechanics today

**(i) Consumer passes a _plain_ (non-Griffel) class.** `mergeClasses` does not merge it — it concatenates it verbatim (`node_modules/@griffel/core/mergeClasses.esm.js`: `if (sequenceIndex === -1) { resultClassName += className + ' '; }`). So today a plain consumer class competes **purely on CSS cascade** against Griffel's runtime-injected `<style>` elements. Griffel appends its first bucket element to the end of `<head>` (`getStyleSheetForBucket` → `head.insertBefore(tag, findInsertionPoint(...))`, and `findInsertionPoint` returns `insertionPoint ? insertionPoint.nextSibling : null` when no bucket elements exist yet ⇒ `insertBefore(tag, null)` ⇒ append). **Consequence: today, a plain consumer class of equal specificity typically LOSES to Fluent**, unless the consumer bumped specificity or used `!important` or configured `createDOMRenderer({ insertionPoint })` (option exists, `node_modules/@griffel/core/renderer/createDOMRenderer.esm.js:20`).

**(ii) Consumer passes a Griffel class.** It carries the `___` sequence prefix, joins the Level-1 property map, and being last **deletes** Fluent's atomic class for that property. It always wins, deterministically, regardless of CSS. This is the documented, conformance-tested contract. In-repo proxy for how common this is: **427 of 1086 v9 story files use `makeStyles`** (`rg -l "makeStyles" --glob "packages/react-components/**/stories/**/*.stories.tsx" | wc -l`; `find packages/react-components -name "*.stories.tsx" -not -path "*/node_modules/*" | wc -l`), e.g. `packages/react-components/react-provider/stories/src/Provider/FluentProviderFrame.stories.tsx:63` `<Button className={styles.button}>`.

### 2b. Does unlayered consumer CSS always beat `@layer`'d Fluent CSS? **Yes — for normal declarations.**

CSS Cascade Level 5 sorts, within one origin, by cascade layer _before_ specificity. Unlayered normal declarations behave as if they are in a final implicit layer that comes after all named layers. So for normal (non-`!important`) declarations:

- consumer plain CSS (unlayered, any specificity, any source position) **>** any `@layer fui.*` Fluent rule. ✅
- consumer Griffel atomics — injected at runtime into `<head>`, unlayered (`compileAtomicCSSRule.esm.js` only wraps in `@layer` when the _authored_ style object contained a `layer` at-rule; `rg -n "@layer" --glob "packages/**/*.ts*" -g '!node_modules'` finds `@layer` **only** in `packages/web-components/src/**` — the FAST/web-components side, never in v9 React) — therefore also **>** any `@layer fui.*` rule. ✅

So `@layer` actually _strengthens_ consumer overrides for both populations, and case (i) gets **more** override power than it has today. That is a behavior change in the permissive direction and is the safest part of the plan.

### 2c. The three ways this still bites

1. **`!important` inverts under layers.** An `!important` declaration inside a layer beats an `!important` declaration outside it, and earlier layers beat later layers for `!important`. Fluent uses `!important` in exactly one place — `packages/react-components/react-badge/library/src/components/PresenceBadge/usePresenceBadgeStyles.styles.ts:84,85,92,93,100,101` (7 occurrences, `& svg { width/height: Npx !important }`), which today is unlayered. If that moves into `@layer fui.*`, it will start beating consumer `!important` overrides it currently ties with. Consumers who used `!important` to defeat Griffel (the standard workaround for population (i)) will find their override now **loses** to `@layer fui`'s `!important`.
2. **Fluent loses to third-party unlayered resets.** Today Griffel's `<style>` sits at the end of `<head>`, so `.r1f29ykk{margin:0}` (Button reset, `packages/react-components/react-button/library/lib/.../useButtonStyles.styles.js`, bucket `r`) beats an app's `normalize.css`/Bootstrap `button { margin: 0 }`. Post-migration, `@layer fui { .root { margin: 0 } }` (0-1-0, layered) **loses** to `button { … }` (0-0-1, unlayered). Any host app shipping a global reset, Bootstrap, or Tailwind Preflight _outside_ a layer will visually break Fluent components. This is a brand-new failure mode with no analogue today.
3. **Layer-order registration race.** Named layer order is fixed by first appearance of the layer name in the document. If a consumer's stylesheet declares its own `@layer` before Fluent's CSS loads, Fluent's layer may sort _after_ theirs and Fluent will start winning against their layered overrides. Fluent must emit a bare `@layer fui.reset, fui.base, …;` statement as early as possible, and document the layer names as public API.

**Net answer to the posed question: yes, unlayered consumer CSS (plain or Griffel) always wins over layered Fluent CSS for normal declarations — but the guarantee only holds if 100% of Fluent's emitted CSS is inside a layer.** Any leak (Tailwind base/preflight, a stray `@apply` at top level, the runtime theme `<style>`) breaks it. Note the runtime theme rule is _already_ unlayered and must stay that way — it only sets custom properties (`packages/react-components/react-provider/library/src/components/FluentProvider/createCSSRuleFromTheme.ts` emits `.fui-FluentProviderN { --colorNeutralBackground1: …; }`), and custom-property resolution is unaffected by layer sorting in a way that matters here.

---

# 3. RTL — the biggest under-estimated line item

Griffel does **not** use logical properties or `[dir]` selectors. `resolveStyleRules` emits **two parallel class names per flippable declaration** and `mergeClasses` picks one at runtime from `TextDirectionProvider` (`packages/react-components/react-provider/library/src/components/FluentProvider/renderFluentProvider.tsx:42`). Verified:

```
$ node -e "const {resolveStyleRules:r}=require('@griffel/core');
  console.log(JSON.stringify(r({paddingLeft:'4px',textAlign:'left',backgroundImage:'linear-gradient(to right, red, blue)'})))"
[{"uwmqm3":["fycuoez","f8wuabp"],"fsow6f":["f1o700av","fes3tcz"],"Bcmaq0h":["f17s2d7p","fhnd7gt"]},
 {"d":[".fycuoez{padding-left:4px;}",".f8wuabp{padding-right:4px;}",
       ".f1o700av{text-align:left;}",".fes3tcz{text-align:right;}",
       ".f17s2d7p{background-image:linear-gradient(to right, red, blue);}",
       ".fhnd7gt{background-image:linear-gradient(to left, red, blue);}"]}]
```

### 3a. Property-name flips (logical properties CAN cover these)

```
$ for p in paddingLeft paddingRight marginLeft marginRight textAlign left right direction; do
    echo "key $p: $(rg -o "^\s+$p:" --glob 'packages/react-components/**/*.styles.ts' -g '!node_modules' --no-filename | wc -l)"; done
key paddingLeft: 62      key paddingRight: 67
key marginLeft: 39       key marginRight: 32
key textAlign: 40        key left: 63
key right: 46            key direction: 2
```

Plus (substring counts, `rg -o <name> --glob 'packages/react-components/**/*.styles.ts' --no-filename | wc -l`): `borderTopLeftRadius` 9, `borderTopRightRadius` 15, `borderBottomLeftRadius` 15, `borderBottomRightRadius` 19, `borderLeftColor` 5, `borderRightColor` 18, `borderLeftWidth` 2, `borderRightWidth` 3, `borderLeftStyle` 1, `borderRightStyle` 6. Existing logical usage is tiny by comparison: `paddingInline` 6, `marginInline` 11, `insetInline` 0.

**87 of 261 v9 `.styles.ts` files (33%) contain at least one physical L/R property:**

```
$ rg -l "^\s+(paddingLeft|paddingRight|marginLeft|marginRight|left|right|textAlign|float|borderLeft|borderRight|borderTopLeftRadius|borderTopRightRadius|borderBottomLeftRadius|borderBottomRightRadius):" --glob "packages/react-components/**/*.styles.ts" -g '!node_modules' | wc -l
87
```

### 3b. **Value-level** flips — logical properties do NOT cover these at all

`rtl-css-js/core` (Griffel's flipper) rewrites _values_, not just keys. Empirically confirmed against the installed copy:

```
$ node -e "const c=require('rtl-css-js/core'); [['backgroundImage','linear-gradient(to right, red 0%, blue 100%)'],['transform','translate(-100%)'],['boxShadow','2px 0 0 0 red'],['borderRadius','4px 8px 12px 16px'],['padding','1px 2px 3px 4px'],['cursor','e-resize'],['transformOrigin','left top'],['float','left'],['transform','translateX(var(--x)) scaleX(var(--s))']].forEach(([k,v])=>console.log(k,'|',v,'=>',JSON.stringify(c.convertProperty(k,v))))"

backgroundImage | linear-gradient(to right, …)   => to left
transform       | translate(-100%)               => translate(100%)
boxShadow       | 2px 0 0 0 red                  => -2px 0 0 0 red
borderRadius    | 4px 8px 12px 16px              => 8px 4px 16px 12px
padding         | 1px 2px 3px 4px                => 1px 4px 3px 2px
cursor          | e-resize                       => w-resize
transformOrigin | left top                       => right top
float           | left                           => right
transform       | translateX(var(--x)) scaleX(…) => UNCHANGED  ← note the asymmetry
```

Live cases that break silently if you only swap to logical properties:

- `packages/react-components/react-skeleton/library/src/components/SkeletonItem/useSkeletonItemStyles.styles.ts:12-16,55-62` — keyframe `transform: 'translate(100%)'` + base `transform: 'translate(-100%)'` + `backgroundImage: linear-gradient(to right, …)`. Griffel flips **all three**, including the _keyframes object_ (`node_modules/@griffel/core/runtime/resolveResetStyleRules.esm.js` calls `convert(keyframeObject)` and emits a second `@keyframes` under an RTL-hashed name). The Skeleton wave animates the wrong way in RTL if this is not hand-authored.
- `packages/react-components/react-tabs/library/src/components/Tab/useTabAnimatedIndicator.styles.ts:36-40` — `transformOrigin:'left'` (**flips**) next to `transform: translateX(var(--fui-Tab__indicator--offset))` (**does not flip**). The exact mixed behaviour must be reproduced.
- **179 `padding:` shorthands** and 4-value `borderRadius`/`margin` — all value-flipped today.

### 3c. Nested-direction and `@noflip`

- Because Griffel bakes direction into the _class choice_, nested `dir` subtrees work with zero specificity cost and `mergeClasses` actively guards against mixing (`mergeClasses.esm.js` dev error: _"a passed string contains an identifier … that has different direction setting than other classes. This is not supported."_). Replacing this with `[dir="rtl"] .x` costs a specificity step (0-2-0), which then defeats the `:where()` flatness plan; `:dir(rtl)` is the specificity-safe alternative but is a newer baseline feature and must be an explicit browser-support decision.
- Griffel's `/* @noflip */` escape hatch is used in exactly **5 places, all in one file**: `packages/react-components/react-positioning/library/src/createArrowStyles.ts:98,109,116` (`rg -o "@noflip" --glob "packages/react-components/**/*.ts" --no-filename | wc -l` → 5; `rg -l` → 1 file). These are load-bearing: the popover arrow must NOT flip because the placement attribute already encodes direction.
- Components that already branch on `dir` at runtime and would need reconciling with a CSS-only approach: `packages/react-components/react-spinner/library/src/components/Spinner/useSpinnerStyles.styles.ts:262` (`dir === 'rtl' && spinnerStyles.rtlTail`, conic-gradient masks — value-level, not flippable), `packages/react-components/react-avatar/library/src/components/AvatarGroupItem/useAvatarGroupItemStyles.styles.ts:195`, `packages/react-components/react-calendar-compat/library/src/components/CalendarDayGrid/useWeekCornerStyles.styles.ts:118-130`, `packages/react-components/react-utilities/src/utils/getRTLSafeKey.ts:7`.

---

# 4. Runtime-dependent styles — almost all survive unchanged

Griffel is fully build-time evaluated (0 shipped `lib/` files import `makeStyles`, §0), so **there are no true Griffel-interpolation cases to port.** Everything dynamic already goes through inline `style` or `element.style.setProperty`, and all of it survives the migration verbatim:

| Component                                       | Mechanism                                               | Evidence                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Slider                                          | CSS vars via `style` attr                               | `packages/react-components/react-slider/library/src/components/Slider/useSliderState.tsx:42-46` sets `--fui-Slider--direction`, `--fui-Slider--progress`, `--fui-Slider--steps-percent`; consumed in `useSliderStyles.styles.ts:132-158`. Var names in `Slider.constants.ts`                                                                                                               |
| ColorPicker (ColorArea/ColorSlider/AlphaSlider) | same pattern                                            | `useColorAreaStyles.styles.ts:17-24`, `useColorSliderStyles.styles.ts:16-21`, `useAlphaSliderStyles.styles.ts:19-22`                                                                                                                                                                                                                                                                       |
| Tab animated indicator                          | CSS vars from `getBoundingClientRect`                   | `useTabAnimatedIndicator.styles.ts:50-60` (measurement), `:135-136` (var write)                                                                                                                                                                                                                                                                                                            |
| Positioning                                     | direct `style.setProperty`                              | `packages/react-components/react-positioning/library/src/middleware/maxSize.ts:54-62`, `matchTargetSize.ts:20`, `usePositioningSlideDirection.ts:65-66`, `constants.ts:12-13`                                                                                                                                                                                                              |
| Headless positioning (anchor API)               | direct `style.setProperty`                              | `packages/react-components/react-headless-components-preview/library/src/hooks/usePositioning/usePositioning.ts:75-140`                                                                                                                                                                                                                                                                    |
| Toast placement                                 | computed inline style object                            | `packages/react-components/react-toast/library/src/state/vanilla/getPositionStyles.ts` (returns `{top,left,right,bottom,transform}`; dir-aware `start`/`end` swap)                                                                                                                                                                                                                         |
| Tree indentation                                | 10 static classes + inline var fallback beyond level 10 | `packages/react-components/react-tree/library/src/components/TreeItem/useTreeItemStyles.styles.ts:53-90` — the `Object.fromEntries(Array.from({length:10}, …))` generator **is** statically evaluated by Griffel's transform (compiled output at `.../library/lib/components/TreeItem/useTreeItemStyles.styles.js:13` is `__styles({...})`), so the 10 classes must be hand-written in CSS |
| Avatar colors                                   | 1-of-N named color class chosen by hash                 | `packages/react-components/react-avatar/library/src/components/Avatar/useAvatar.tsx:35` `avatarColors[getHashCode(...) % avatarColors.length]` — enum-class selection, no interpolation                                                                                                                                                                                                    |
| Attachment progress (migration-v0-v9)           | inline `style={{width: \`${progress}%\`}}`              | `packages/react-components/react-migration-v0-v9/library/src/components/Attachment/Attachment.tsx:47`                                                                                                                                                                                                                                                                                      |

**The only genuinely parameterized style _authoring_ is a set of build-time factories** whose call-site arguments become part of the emitted CSS — these are the cases a `.module.css` file cannot express and must be resolved into concrete rules (or into CSS `calc()` over vars):

- `packages/react-components/react-positioning/library/src/createArrowStyles.ts` (`createArrowStyles(options)`, `createArrowHeightStyles(arrowHeight)` — `--fui-positioning-arrow-height/offset` computed as `1.414 * arrowHeight`); called from `react-tooltip/.../useTooltipStyles.styles.ts` and `react-popover/.../usePopoverSurfaceStyles.styles.ts`
- `packages/react-components/react-positioning/library/src/createSlideStyles.ts` (`createSlideStyles(mainAxis)` — deprecated but still exported)
- `packages/react-components/react-tabster/src/focus/createFocusOutlineStyle.ts` + `createCustomFocusIndicatorStyle.ts` — used in **46 v9 styles files** (`rg -c "createFocusOutlineStyle|createCustomFocusIndicatorStyle" --glob "packages/react-components/**/*.styles.ts" | wc -l`). Its `customizeSelector` option takes an arbitrary selector-transform _function_ (4 files use it, e.g. `useTreeItemStyles.styles.ts:44-46` rewrites the selector to `${selector} > .fui-TreeItemLayout, ${selector} > .fui-TreeItemPersonaLayout`). Both are **public API** exported from `@fluentui/react-components` (`packages/react-components/react-components/src/index.ts:34-35`) and return `GriffelStyle` — see §8.

---

# 5. Animations

- **`makeStyles` keyframes: only 12 occurrences across 5 files** (`rg -o "animationName" --glob "packages/react-components/**/*.styles.ts" --no-filename | wc -l` → 12; `rg -l` → 5): `react-spinner/.../useSpinnerStyles.styles.ts` (4), `react-nav/.../sharedNavStyles.styles.ts` (3), `react-skeleton/.../useSkeletonItemStyles.styles.ts` (2), `react-toast/.../Timer/useTimerStyles.styles.ts` (1), `react-motion/stories/src/Tokens/Cards.styles.ts` (1). Small surface — but see §3b: Griffel **auto-flips keyframe bodies for RTL and emits a second `@keyframes` block**, and it hashes the animation name (`RESET_HASH_PREFIX + hashString(...)` in `resolveResetStyleRules.esm.js`). Hand-authored `@keyframes` in CSS Modules get scoped by css-loader but do **not** get an RTL twin.
- **`@fluentui/react-motion` has zero Griffel involvement.** `packages/react-components/react-motion/library/package.json` — `"description": "A package with utilities & motion definitions using Web Animations API"`, dependencies are only `react-shared-contexts`, `react-utilities`, `@swc/helpers`. `packages/react-components/react-motion/library/src/hooks/useAnimateAtoms.ts:127` calls `element.animate(animationKeyframes, animationParams)`; `types.ts:1` `type AtomCore = { keyframes: Keyframe[] } & KeyframeEffectOptions`. `@fluentui/react-motion-components-preview` likewise has no Griffel dependency (only `@fluentui/react-motion`, `react-utilities`). **All motion migrates untouched** — this is the single lowest-risk area.

---

# 6. Portals, iframes, shadow DOM — static stylesheets do not cross document boundaries

Griffel's renderer is _per-document_ and per-root. This is the mechanism that lets Fluent style content in a foreign `Document` or `ShadowRoot`, and **a static `.css` bundle emitted into the host document has no equivalent**.

| Scenario                                                                                                                    | In-repo evidence                                                                                                                                                                                                                                                                                                                 | Post-migration hazard                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **iframe** — `createDOMRenderer(contentDocument)` + `<RendererProvider targetDocument>` + `<FluentProvider targetDocument>` | `packages/react-components/react-provider/stories/src/Provider/FluentProviderFrame.stories.tsx:43,79-85` (story text: _"A FluentProvider does not cross an iframe boundary. To render into iframes pass a proper `Document` instance to `targetDocument`…"_)                                                                     | The parent document's `<link>`/`<style>` does **not** apply inside the iframe. Components render **completely unstyled** unless the app manually clones the stylesheet into the iframe document. No API currently exists for that. |
| **iframe + portals**                                                                                                        | `packages/react-components/react-provider/stories/src/Provider/FluentProviderApplyStylesToPortals.stories.tsx:34,86-88`                                                                                                                                                                                                          | same                                                                                                                                                                                                                               |
| **Shadow DOM**                                                                                                              | `apps/vr-tests-react-components/src/stories/ShadowDOM/utils.tsx:1-17` uses `createShadowDOMRenderer(root)` from `@griffel/shadow-dom` (dep pinned at `package.json:71`), plus `PortalMountNodeProvider value={root}`. Stories: `ShadowDOMDefault.stories.tsx`, `ShadowDOMPortal.stories.tsx`                                     | Document-level stylesheets do not pierce a shadow boundary. Requires `adoptedStyleSheets` + a `CSSStyleSheet` constructed from the bundled CSS — new runtime infrastructure and a new public API.                                  |
| **Portals to `document.body`**                                                                                              | `packages/react-components/react-portal/library/src/components/Portal/usePortal.ts`; `packages/react-components/react-portal-compat/src/PortalCompatProvider.tsx` copies `fui-FluentProviderN` theme classes onto the portal element via `element.classList.add(...cssVariablesClasses)`                                         | ✅ Safe. This only propagates **CSS-custom-property scoping classes**, not style rules. Static CSS in the same document applies to portaled nodes normally.                                                                        |
| **`nonce` / CSP**                                                                                                           | `packages/react-components/react-provider/library/src/components/FluentProvider/useFluentProvider.ts:66,71` reads `useRenderer_unstable().styleElementAttributes`; `useFluentProviderThemeStyleTag.ts:59,124` applies them to the theme `<style>`; test at `FluentProvider-node.test.tsx:53-70` asserts `<style nonce="random">` | The nonce is sourced **from the Griffel renderer**. Removing `RendererProvider` orphans the only channel by which apps supply a CSP nonce for Fluent's runtime theme `<style>`. A replacement provider is mandatory.               |

`createDOMRenderer` call sites to audit: `scripts/test-ssr/src/utils/renderToHTML.ts:16`, `scripts/test-ssr/src/utils/generateEntryPoints.ts:29`, `apps/perf-test-react-components/src/scenarios/MakeStyles.tsx:4`, `packages/react-components/react-provider/library/src/components/FluentProvider/FluentProvider-node.test.tsx:55`, plus the two stories above. It is also **re-exported publicly** (`packages/react-components/react-components/src/index.ts:7`).

---

# 7. SSR — replacement is simpler, but two things depend on the Griffel API

The SSR harness is at `scripts/test-ssr/` (not `apps/ssr-tests-v9/`, which only holds the stories consumed by it):

- `scripts/test-ssr/src/utils/renderToHTML.ts:16,29,31` — `createDOMRenderer()` → `renderToString(<RendererProvider renderer>…)` → `renderToString(<>{renderToStyleElements(renderer)}</>)` → the resulting `<style>` markup is spliced into `<head>`.
- `scripts/test-ssr/src/utils/generateEntryPoints.ts:23,29,34-36` — generates hydration entry points that wrap `<App>` in `<RendererProvider renderer={createDOMRenderer()}>`. Snapshot-asserted at `generateEntryPoints.test.ts:58-71`.
- `apps/ssr-tests-v9/src/stories/{Menu,Tooltip,Utilitites}/**` — the fixtures.
- Design doc: `docs/react-v9/contributing/rfcs/shared/build-system/ssr-testing.md:187-189`.

A static `<link rel="stylesheet">` genuinely replaces all of that. **But two SSR paths are Griffel-independent and must keep working:**

1. `packages/react-components/react-provider/library/src/components/FluentProvider/renderFluentProvider.tsx:44-52` renders an **inline `<style dangerouslySetInnerHTML>`** in the tree when `!canUseDOM()`, carrying `state.serverStyleProps.cssRule` (the theme CSS-variable rule) and `state.serverStyleProps.attributes` (the nonce). This is the theme, not component styles — it survives, but its nonce comes from the Griffel renderer (§6).
2. `useFluentProviderThemeStyleTag.ts:117,138-153` (`useHandleSSRStyleElements`) relocates the SSR-emitted `<style>` into `document.head` during render to avoid hydration mismatches, and `:97` detects SSR by `styleElement.textContent.length > 0`. That hydration dance must be preserved verbatim.

`renderToStyleElements` and `RendererProvider` are both **public exports** (`packages/react-components/react-components/src/index.ts:12-13`), so removing them is a major-version API break regardless of whether the internal harness still needs them.

---

# 8. Direct exports — the breaking-change surface is very large

From `packages/react-components/react-components/src/index.ts`:

```
$ rg -o "use[A-Za-z]+Styles_unstable" packages/react-components/react-components/src/index.ts | sort -u | wc -l   →  180
$ rg -o "^\s+[a-zA-Z0-9]+ClassNames," packages/react-components/react-components/src/index.ts | sort -u | wc -l    →  193
```

- **180 `useXStyles_unstable` hooks are public** (`useButtonStyles_unstable`, `useMenuItemStyles_unstable`, … full list in the file). Their signature `(state) => state` and their side effect (mutating `state.<slot>.className` via `mergeClasses`) is the documented recomposition contract (`docs/react-v9/contributing/patterns/basic-recomposition.md`).
- **193 `xClassNames` objects are public** and additionally guarded by the conformance test `component-has-static-classnames-object` (`packages/react-conformance/src/defaultTests.tsx:253-292`), which asserts the export exists at package top level and that keys map to `fui-<Component>` / `fui-<Component>__<slot>`. Applied via **839 `isConformant` call sites** (`rg -o "isConformant" --glob "packages/react-components/**/*.test.tsx" --no-filename | wc -l`).
- **The static `fui-*` classes are always the first `mergeClasses` argument**, e.g. `useButtonStyles.styles.ts:567` `buttonClassNames.root`, `:585` `buttonClassNames.icon`. They are non-atomic strings so `mergeClasses` passes them through untouched (§2a). **They must remain literal, unhashed classes in the DOM** — this means CSS Modules must not hash them, and any Fluent-internal rule that targets them needs `:global()`.
- **191 cross-component selector references** to those static classes across **22 files** (`rg -o "\\\$\{[a-zA-Z]+ClassNames\.[a-zA-Z]+\}" --glob "packages/react-components/**/*.styles.ts" --no-filename | wc -l` → 191; `rg -l` → 22). Heaviest: `react-button/.../SplitButton/useSplitButtonStyles.styles.ts` (dozens of `& .${splitButtonClassNames.primaryActionButton}`), `react-button/.../ToggleButton`, `react-color-picker/.../ColorSlider` (`:focus-visible ~ .${colorSliderClassNames.thumb}`). Every one becomes `:global(.fui-…)` in a CSS Module.
- **`createFocusOutlineStyle` / `createCustomFocusIndicatorStyle` are public and return `GriffelStyle`** (`packages/react-components/react-components/src/index.ts:34-35`, `:49-50` for the option types). Consumers spread them into their own `makeStyles`. There is no CSS-Modules-shaped replacement for "an object you spread into a CSS-in-JS call".
- **Griffel itself is re-exported**: `__css`, `__resetCSS`, `__resetStyles`, `__styles`, `createDOMRenderer`, `makeResetStyles`, `makeStaticStyles`, `makeStyles`, `mergeClasses`, `RendererProvider`, `renderToStyleElements`, `shorthands`, plus types `GriffelStyle`, `GriffelRenderer`, `GriffelResetStyle` (`index.ts:2-16`). Also `typographyStyles`/`TypographyStyles` (Griffel-shaped style objects) from `@fluentui/tokens`.
- **`customStyleHooks_unstable` is a documented 194-key extension point.** `packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts` declares 194 `useXStyles_unstable: CustomStyleHook` keys; **193 component files call `useCustomStyleHook_unstable('useXStyles_unstable')(state)`** immediately after the built-in hook (`rg -l "useCustomStyleHook_unstable\('" --glob "packages/react-components/**/*.tsx" | wc -l` → 193; e.g. `packages/react-components/react-button/library/src/components/Button/Button.tsx:19`). The RFC is `docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md`. `packages/react-components/react-utilities/src/compose/getSlotClassNameProp.ts` exists solely to let those hooks re-append the user's `className` _after_ their own classes — i.e. the whole mechanism is defined in terms of `mergeClasses` ordering.

---

# 9. Legacy interop

- **`@fluentui/react-portal-compat`** — `packages/react-components/react-portal-compat/src/PortalCompatProvider.tsx` matches `fui-FluentProvider\w+` classes out of `useThemeClassName()` and stamps them on v8 portal elements so CSS variables resolve. Purely custom-property plumbing; **survives**, provided `fluentProviderClassNames.root` keeps its shape and the theme rule keeps being generated by `createCSSRuleFromTheme`. The regex at `:9` is a hard coupling to that naming (`const CLASS_NAME_REGEX = new RegExp(\`([^\\s]\*${fluentProviderClassNames.root}\\w+)\`, 'g')`) and the file carries a "Keep in sync with useFluentProviderThemeStyleTag.ts" comment.
- **`@fluentui/react-migration-v8-v9`** — shims mixing v8 `IStyle`/`ITheme` types with Griffel `makeStyles`: `library/src/components/Stack/StackShim.styles.ts:3`, `StackItemShim.styles.ts:3` (both `makeStyles` from `@griffel/react`), `Checkbox/Checkbox.styles.ts:3` (`makeStyles` from `@fluentui/react-components`), and `Stack/stackUtils.ts:1,117-118` importing `IStyle`/`ITheme` from v8. These live in the same DOM as v8's `@fluentui/merge-styles` (`packages/merge-styles/src/Stylesheet.ts`, which has its own `<style>` injection and its own `nonce` handling at `:397-398`). Today both v8 merge-styles and Griffel are unlayered and fight on source order; post-migration Fluent v9 becomes layered and **v8's merge-styles output will unconditionally win** every tie against v9 in mixed apps.
- **`@fluentui/react-migration-v0-v9`** — `library/src/components/Attachment/Attachment.tsx:47` uses inline `style` for progress; safe.
- **`@fluentui/react-conformance-griffel`** — imported by **57 files** (`rg -l "react-conformance-griffel" --glob "packages/**/*.ts" -g '!node_modules' | wc -l`), each a per-package `src/testing/isConformant.ts`. The `make-styles-overrides-win` test **jest-mocks `@griffel/react`'s `mergeClasses`** and asserts it was called with the user className last. It will fail for 100% of migrated components and must be replaced with a DOM/computed-style assertion. 20+ components already opt out via `disabledTests: ['make-styles-overrides-win']` (e.g. `react-dialog/.../Dialog.test.tsx:25`, `react-menu/.../Menu.test.tsx:23`, `react-drawer/.../Drawer.test.tsx:36`).

### Build/test infrastructure coupling (not in the brief, but blast-radius-relevant)

- **`"sideEffects": false` in 83 of 85 v9 packages** (`rg -n '"sideEffects"' --glob "packages/react-components/**/package.json" -g '!node_modules' --no-filename | sort | uniq -c` → 77+6 = 83 `false`, 2 arrays). A bare `import './button.module.css'` is a side-effect-only import and **webpack/Rollup will tree-shake it away**, shipping unstyled components. Every one of those 83 manifests needs `"sideEffects": ["*.css"]`, and `"files"` (currently `["*.md","dist/*.d.ts","lib","lib-commonjs"]`, `packages/react-components/react-button/library/package.json:47-52`) must be checked to actually include the emitted CSS.
- **73 `jest.config.js` files register `@griffel/jest-serializer`** (`rg -ln "griffel/jest-serializer" --glob "**/jest.config.js" -g '!node_modules' | wc -l`). It strips atomic classes so snapshots read `class="fui-Badge fui-CounterBadge"` (`packages/react-components/react-badge/library/src/components/CounterBadge/__snapshots__/CounterBadge.test.tsx.snap`). **141 `.snap` files exist, 126 contain `class=`** — CSS-Module hashed classes will not be stripped by that serializer, so all 126 churn unless an equivalent serializer is written.
- **Webpack CSS-Modules config gap.** `scripts/storybook/src/rules.js:31-34` `cssRule` is `['style-loader','css-loader']` with **no `modules: true`**; the only `modules: true` rule (`scssRule`, `:38-69`) is `.scss`-only and carries `exclude: [/node_modules/]`. `monosize.config.mjs`'s webpack bundler (`node_modules/monosize-bundler-webpack/`) has no CSS rule at all, and there are **108 bundle-size fixtures** (`find packages/react-components -path "*bundle-size*" -name "*.fixture.js" | wc -l`) that will fail to build on first CSS import.
- **The `enforce-use-client` ESLint rule is keyed on Griffel**: `packages/react-components/eslint-plugin-react-components/src/rules/enforce-use-client.ts:119-124` lists `makeStyles`, `makeResetStyles`, `makeStaticStyles` as RSC-unsafe. **251 `.styles.ts` files start with `'use client';`** (`rg -l "^'use client';" --glob "packages/react-components/**/*.styles.ts" | wc -l`). CSS Modules are RSC-safe, so this rule and 251 directives become stale — a real (positive) behavior change worth an explicit decision.
- **Existing precedent for the target style already lives in the repo**: `packages/react-components/react-headless-components-preview/stories/src/**/*.module.css` (e.g. `Button/button.module.css`) — plain CSS Modules with `data-*` attribute selectors (`.button[data-disabled]`), relying on **source order** (`.secondary` after `.button`). Also `packages/react-components/babel-preset-storybook-full-source/src/__fixtures__/**/css-module-*` shows the storybook tooling already handles `.module.css` fixtures.
- **Theme scoping is class-based, not `:root`-based.** `createCSSRuleFromTheme.ts:24-33` emits `.fui-FluentProviderN { --colorNeutralBackground1: …; }` — **467 tokens, 459 keys per theme, values shaped `var(--tokenName)` with no prefix** (`node -e "const t=require('./packages/react-components/react-theme/library/lib-commonjs/index.js'); console.log(Object.keys(t.tokens).length, Object.keys(t.webLightTheme).length, t.tokens.colorNeutralBackground1)"` → `467 459 var(--colorNeutralBackground1)`), across 11 exported themes/factories. Tailwind v4's `@theme` writes to `:root`, which **cannot** reproduce per-provider nested theme scoping. The Fluent theme must stay in its class-scoped runtime `<style>`; only `--base-scale` may come from Tailwind's `@theme`.

---

# Top 10 risks by blast radius

| #      | Risk                                                                                                                                                                                                                                                                                                                                                                           | Blast radius                                                                                                                                            | Evidence                                                                                                                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**  | **`mergeClasses` order ≠ source order.** Silent per-variant pixel regressions with no test coverage.                                                                                                                                                                                                                                                                           | **516 call sites / 230 files**; **23 confirmed inversions in 12 files** + the Button `shape`-vs-`size` `borderRadius` case; 40 files need manual triage | `node .scratch/.scratch_order2.js`; `useLinkStyles.styles.ts:132-145` vs `:79,107,116`; `useButtonStyles.styles.ts:566-580` vs `:284-310`                                                            |
| **2**  | **`makeResetStyles` subordination is bucket-order-only.** 126 reset bases lose to variant classes _purely_ because bucket `r` precedes bucket `d`. No specificity, no source order, no property-map dedup carries this. Requires explicit `@layer` sublayers.                                                                                                                  | **126 reset classes**, i.e. the base look of essentially every component                                                                                | `__resetStyles.esm.js` (returns bare string, not in `DEFINITION_LOOKUP_TABLE`); `getStyleSheetForBucket.esm.js` `styleBucketOrdering`; `resolveResetStyleRules` empirical output                     |
| **3**  | **RTL value-level flips.** Logical properties cover key flips only. Gradients, `transform: translate()`, `box-shadow` x-offset, 4-value `border-radius`/`padding`/`margin`, `cursor: e-resize`, `transform-origin`, **and keyframe bodies** are all value-rewritten by `rtl-css-js` and have no CSS equivalent.                                                                | **87/261 styles files (33%)** contain physical properties; 179 `padding:` shorthands; Skeleton/Spinner/Tab visibly break                                | `node -e` rtl-css-js probe above; `useSkeletonItemStyles.styles.ts:12-16,55-62`; `useTabAnimatedIndicator.styles.ts:36-40`                                                                           |
| **4**  | **`sideEffects: false` tree-shakes CSS imports away.** Components ship with zero styles and no build error.                                                                                                                                                                                                                                                                    | **83 of 85 v9 packages**                                                                                                                                | `rg -n '"sideEffects"' --glob "packages/react-components/**/package.json" -g '!node_modules'`                                                                                                        |
| **5**  | **Layered Fluent CSS loses to unlayered third-party resets.** Brand-new failure mode: any host shipping normalize.css / Bootstrap / unlayered Tailwind Preflight overrides Fluent element-level styles that Griffel currently wins. Also inverts `!important` semantics for consumers who used it to defeat Griffel.                                                           | Every consumer app with a global reset; `!important` inversion hits `usePresenceBadgeStyles.styles.ts:84-101`                                           | CSS Cascade L5 layer sorting; `getStyleSheetForBucket` append-to-head behaviour; only 1 file / 7 `!important` in Fluent today                                                                        |
| **6**  | **Public API break: 180 `useXStyles_unstable` + 193 `xClassNames` + 194-key `customStyleHooks_unstable` + `createFocusOutlineStyle`/`createCustomFocusIndicatorStyle` (`GriffelStyle` returns) + 12 Griffel re-exports.** The entire documented recomposition + custom-styling contract is expressed in `mergeClasses` terms.                                                  | Whole `@fluentui/react-components` surface; **193 components** call `useCustomStyleHook_unstable`                                                       | `packages/react-components/react-components/src/index.ts`; `CustomStyleHooksContext.ts`; `getSlotClassNameProp.ts`; `docs/.../custom-styling.md`                                                     |
| **7**  | **Iframe / shadow-DOM styling has no static-CSS equivalent.** Static stylesheets do not cross a `Document` or `ShadowRoot` boundary; `createDOMRenderer(targetDocument)` / `createShadowDOMRenderer(root)` are the only mechanism today. Also kills the CSP-nonce channel.                                                                                                     | 2 provider stories + 2 VR shadow-DOM stories in-repo, but an unknown and large set of Office/Teams host scenarios                                       | `FluentProviderFrame.stories.tsx:43,79`; `FluentProviderApplyStylesToPortals.stories.tsx:34,86`; `apps/vr-tests-react-components/src/stories/ShadowDOM/utils.tsx:1-17`; `useFluentProvider.ts:66,71` |
| **8**  | **Shorthand/longhand priority (`p:-1`) is unreplicable in flat CSS.** Griffel gives both "shorthand deletes later longhands" and "shorthand always loses to co-present longhand". `:where()`-flattened CSS Modules give neither.                                                                                                                                               | 179 `padding:` shorthands + 242 `shorthands.*` calls; Button size/iconOnly padding chain                                                                | `resolveStyleRules` probe (`{"p":-1}`); `useButtonStyles.styles.ts:292,296-299,504-521,578`; `docs/.../no-css-shorthands-in-make-styles.md`                                                          |
| **9**  | **Test + build infrastructure churn.** 57 packages' `make-styles-overrides-win` conformance tests fail by construction; 73 jest configs + 126 `.snap` files depend on `@griffel/jest-serializer`; storybook webpack has no `.module.css` rule (and excludes `node_modules`); 108 monosize fixtures have no CSS loader; 251 `'use client'` directives become stale.             | Repo-wide CI                                                                                                                                            | `overridesWin.ts`; `rg -ln "griffel/jest-serializer" --glob "**/jest.config.js"`; `scripts/storybook/src/rules.js:31-34,38-45`; `monosize.config.mjs`                                                |
| **10** | **Theme scoping incompatibility + SSR API removal.** 467 tokens are class-scoped per `FluentProvider` (nested providers = nested scopes), which Tailwind's `:root`-based `@theme` cannot express; and `renderToStyleElements`/`RendererProvider`/`createDOMRenderer` are public exports whose removal is a major break even though `<link>` is a simpler internal replacement. | `FluentProvider` nesting (used everywhere), all SSR consumers                                                                                           | `createCSSRuleFromTheme.ts:24-33`; token probe (467/459); `index.ts:7,12-13`; `scripts/test-ssr/src/utils/renderToHTML.ts:16,29,31`; `renderFluentProvider.tsx:44-52`                                |

**Lowest-risk area (for contrast, measured not assumed):** `@fluentui/react-motion` and `@fluentui/react-motion-components-preview` have zero Griffel dependencies and use `element.animate` (Web Animations API) exclusively — they migrate untouched.

_Analysis scripts used are in `.scratch/.scratch_mc.js`, `.scratch/.scratch_order.js`, `.scratch/.scratch_order2.js` (`.scratch/` added to `.gitignore`)._

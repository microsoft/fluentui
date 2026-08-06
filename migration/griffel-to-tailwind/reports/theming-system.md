# Research: theming-system

_Generated 2026-07-26 by research workflow wf_7f8b1226-35f (research agents; verify against source before acting on stale claims)._

## Summary

Fluent UI v9's theme is a flat JS object of 459 string tokens that FluentProvider serializes verbatim into a single CSS rule `.fui-FluentProvider<id> { --tokenName: value; … }`, injected as a `<style>` into `targetDocument.head`. Every token is therefore a plain inherited CSS custom property at runtime, consumable by ANY selector via `var(--colorNeutralForeground1)` from any descendant of the provider element — Griffel is not involved in theming at all. A CSS-Modules/Tailwind world can consume the theme completely unchanged; two in-repo precedents already do (`@fluentui/react-theme-sass` SCSS vars, and `packages/web-components` hand-written CSS). The three things that do NOT come for free are Griffel's automatic RTL flipping (rtl-css-js), the keyborg-driven `[data-fui-focus-visible]` focus indicator, and Griffel's deterministic style-bucket cascade ordering.

## Key facts

- Theming is 100% Griffel-independent: `packages/react-components/react-provider/library/src/components/FluentProvider/createCSSRuleFromTheme.ts` reduces the flat theme object to `--key: value;` pairs and returns one CSS rule string; `useFluentProviderThemeStyleTag.ts` inserts it as rule 0 of a `<style>` appended to `targetDocument.head`.
- The rule selector is `.fui-FluentProvider<id>` where the id comes from `useId(fluentProviderClassNames.root)` (`packages/react-components/react-utilities/src/hooks/useId.ts`) — i.e. the class name is dynamic and must NOT be hardcoded in CSS. Test evidence: `useFluentProviderThemeStyleTag.test.tsx:70` → `".fui-FluentProvider1 {--css-variable-1: 1; --css-variable-2: 2;}"`.
- Every token IS a plain inherited CSS custom property at runtime; `var(--colorNeutralForeground1)` resolves from ANY selector for any DOM descendant of the provider element. It does NOT resolve on `html`/`body` unless the app calls the exported `createCSSRuleFromTheme(':root', theme)` (`apps/public-docsite-v9/src/Utilities/Theme/createCSSRuleFromTheme/createCSSRuleFromThemeDefault.stories.tsx:24`).
- Measured (`node .scratch/theme-probe.js` over `packages/tokens/lib-commonjs/index.js`): all 7 shipped themes — webLightTheme, webDarkTheme, teamsLightTheme, teamsLightV21Theme, teamsDarkTheme, teamsDarkV21Theme, teamsHighContrastTheme — have EXACTLY 459 keys with identical key sets (0 missing / 0 extra vs webLightTheme).
- Measured (`node .scratch/token-diff.js`): `packages/tokens/src/tokens.ts` exposes 467 `var(--x)` entries; `packages/react-components/react-theme-sass/sass/*.scss` exposes 459; the 8-token delta is exactly `zIndexBackground|Content|Overlay|Popup|Messages|Floating|Priority|Debug`, which are in NO theme and carry hardcoded fallbacks (`zIndexPopup: 'var(--zIndexPopup, 2000)'`).
- The generated theme rule for `webLightTheme` is 19,220 characters (`node .scratch/rule-probe.js`), single-rule, all 459 declarations.
- `@fluentui/react-theme-sass` already exists as a non-Griffel consumption layer: `packages/react-components/react-theme-sass/sass/colorTokens.scss:1` = `$colorNeutralForeground1: var(--colorNeutralForeground1);`, package.json exposes `"style": "sass/tokens.scss"`, and `src/index.ts` throws if imported from JS. Parity is enforced by `sass/Sass.test.ts` compiling one `$expected__<token>: $<token>;` line per `webLightTheme` key.
- `packages/web-components/src/theme/design-tokens.ts` (generated at build time) is a second precedent: `export const colorNeutralForeground1 = 'var(--colorNeutralForeground1)';` consumed by hand-written CSS in `packages/web-components/src/button/button.styles.ts` — proving the same `--tokenName` contract works with zero Griffel.
- Griffel flips RTL at compile time producing TWO atomic classes and selects by React context, not DOM: `node_modules/@griffel/core/runtime/resolveStyleRules.esm.js` (convertProperty from rtl-css-js) + `reduceToClassNameForSlots.esm.js` (`dir === 'rtl' ? map[1] : map[0]`) + `node_modules/@griffel/react/makeStyles.esm.js` (`useTextDirection()`). Real output: `packages/react-components/react-label/library/lib/components/Label/useLabelStyles.styles.js` → `uwmqm3: ["fruq291", "f7x41pl"]` = padding-left / padding-right.
- rtl-css-js 1.16.1 (measured, `node .scratch/rtl-probe.js`) has 34 key-swap entries (17 pairs) covering only padding/margin/left-right/border-left-right/border-\*-radius, plus VALUE converters for padding, margin, borderRadius, borderColor/Width/Style, background, backgroundPosition, objectPosition, boxShadow, textShadow, transform, transformOrigin, transition. It does NOT flip `inset`, `clipPath`, `translate`, `rotate`, `gridColumn`. Logical properties (`paddingInlineStart`, `insetInlineStart`) pass through unchanged.
- `FluentProvider` always writes `dir` to the DOM (`useFluentProvider.ts` → `getIntrinsicElementProps('div', { ...props, dir, ... })`; default `'ltr'` from `ProviderContext.ts`), and portal mount nodes get `setAttribute('dir', dir)` (`usePortalMountNode.ts`) — so CSS logical properties and `[dir=rtl]`/`:dir(rtl)` selectors will work after migration.
- Physical-property migration surface in `packages/react-components/**/*.styles.ts` (rg -o counts): paddingRight 73, left: 67, paddingLeft 66, marginLeft 50, right: 50, textAlign 45, marginRight 34, borderRight 33, borderBottomRightRadius 19, borderLeft 17, borderTopRightRadius 15, borderBottomLeftRadius 15, borderTopLeftRadius 9, float 6 — plus boxShadow 85 and transform 76 which rtl-css-js flips by VALUE. Existing logical usage is tiny: marginInline 11, paddingInline 6, marginInlineStart 7, paddingInlineStart 5, and 0 for insetInline*/borderInline*/border\*Radius logical forms.
- `packages/web-components/src/**/*.styles.ts` is the in-repo model for hand-written RTL: `padding-inline` ×26, `margin-inline` ×29, `inset-inline` ×17, `border-inline` ×5, `padding-left` ×1, `margin-left` ×0, plus `:dir(rtl)` at 5 sites (tree-item.styles.ts:93, slider.styles.ts:67/138, tablist.styles.ts:219, rating-display.styles.ts:51).
- Focus indicators use a JS-set attribute, not CSS: `packages/react-components/react-tabster/src/focus/constants.ts` defines `FOCUS_VISIBLE_ATTR = 'data-fui-focus-visible'` and `FOCUS_WITHIN_ATTR = 'data-fui-focus-within'`; `focusVisiblePolyfill.ts` sets/removes it via keyborg; the scope is installed by FluentProvider via `useFocusVisible()` in `useFluentProvider.ts`.
- The exact compiled focus CSS to replicate (from `packages/react-components/react-menu/library/lib/components/MenuItem/useMenuItemStyles.styles.js`): `.X[data-fui-focus-visible]{border-*-color:transparent}` + `.X[data-fui-focus-visible]::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top/right/bottom/left:calc(2px * -1);}` + `@media (forced-colors: active){ .X[data-fui-focus-visible]::after{border-*-color:Highlight} }`, with `:focus`/`:focus-visible { outline-style: none }`.
- Focus-style call sites: `createFocusOutlineStyle` in 22 files, `createCustomFocusIndicatorStyle` in 34 files under `packages/react-components` (rg -l).
- Portals get theme vars because `useFluentProviderContextValues.ts` publishes `themeClassName: applyStylesToPortals ? root.className! : themeClassName` (default `applyStylesToPortals = true`) and `usePortalMountNode.ts` does `mergeClasses(themeClassName, classes.root, options.className)` onto a div appended to `mountNode ?? targetDocument.body`.
- `react-portal-compat` (v8 interop) re-extracts ONLY the variable-hosting classes with `new RegExp('([^\\s]*fui-FluentProvider\\w+)','g')` — `packages/react-components/react-portal-compat/src/PortalCompatProvider.tsx` — with an explicit 'keep in sync' comment pointing at useFluentProviderThemeStyleTag.ts.
- Shadow DOM: `@griffel/shadow-dom` v0.2.2 is a ROOT devDependency only (`package.json:71`), used solely by `apps/vr-tests-react-components/src/stories/ShadowDOM/utils.tsx` (`createShadowDOMRenderer` + `RendererProvider` + `PortalMountNodeProvider`). `FluentProvider`'s `createStyleTag` only ever appends to `targetDocument.head` and its `targetDocument` prop is typed `Document` — it has NO ShadowRoot branch. It works today only because the provider sits outside the shadow root and custom properties inherit across the boundary.
- `packages/web-components/src/theme/set-theme.ts` shows the shadow-capable alternative Fluent already ships for WC: `document.adoptedStyleSheets` (`html { --token }`), `@scope ([data-fluent-theme=...]) { :scope { … } }`, and `shadowRoot.adoptedStyleSheets` (`:host { … }`) with a `documentElement.style` fallback.
- Griffel's cascade is bucket-ordered, not specificity-ordered: `node_modules/@griffel/core/renderer/getStyleSheetForBucket.esm.js:9-35` → `['r','d','l','v','w','f','i','h','a','s','k','t','m','c']`. All atomic classes are specificity (0,1,0); conflicts resolve by bucket order + mergeClasses last-wins. CSS Modules reproduces neither automatically.
- Migration size: 425 `makeStyles(` call sites, 128 `makeResetStyles(` call sites, 2,685 `tokens.<name>` references, 261 `*.styles.ts` files (243 under `*/library/src/`) in `packages/react-components`. `shorthands.borderColor` alone accounts for 213 of 245 shorthands usages.
- 37 distinct component-level `--fui-*` custom properties exist (e.g. `--fui-positioning-arrow-angle`, `--fui-match-target-size`, `--fui-Slider--progress`, `--fui-Avatar-ringWidth`) — set from JS inline styles, consumed in CSS; these port unchanged.

## Risks

- RTL flipping is the single largest correctness risk. Griffel auto-flips ~500 physical-property declarations today (paddingLeft 66 + paddingRight 73 + marginLeft 50 + marginRight 34 + left 67 + right 50 + border-left/right 50 + 4 corner radii 58 + textAlign left/right 11 + float 6, plus VALUE flips in 85 boxShadow and 76 transform declarations). Only ~33 declarations use logical properties today. Every one must be hand-converted; missing any is an invisible LTR-only regression that only RTL VR tests would catch.
- rtl-css-js flips `transform: translateX()`, `box-shadow` x-offset, `text-shadow`, `background-position`, `object-position`, `transform-origin`, `float`, and `cursor: *-resize` by VALUE. CSS logical properties cannot express these; they need explicit `[dir="rtl"]`/`:dir(rtl)` override rules. `:dir()` has narrower browser support than `[dir=rtl]` attribute selectors and does not work through shadow boundaries the same way — pick one and be consistent.
- Semantic divergence: Griffel picks the RTL class from React context (`TextDirectionProvider`), CSS logical properties resolve against computed `direction`. After migration, a raw `<div dir="rtl">` nested inside `FluentProvider dir="ltr"` will flip styles that today do not flip (and vice versa for a FluentProvider whose `dir` prop and DOM attribute disagree). This is a behaviour change, not just a styling change.
- Cascade ordering: Griffel's 14-bucket ordering (`['r','d','l','v','w','f','i','h','a','s','k','t','m','c']`) plus `mergeClasses` property-hash last-wins is what makes :hover/:focus/:active and slot overrides land correctly at uniform (0,1,0) specificity. CSS Modules has neither. Expect widespread state-style precedence bugs unless order/specificity is deliberately re-engineered per component.
- `applyStylesToPortals: true` (the default) copies the provider ROOT className — including its Griffel `body1` typography and `colorNeutralForeground1`/`colorNeutralBackground1` classes — onto every portal mount node. If those Griffel classes vanish, portal/dialog/menu/tooltip content silently loses base typography and colors. The replacement class must be threaded through `ThemeClassNameContext` unchanged.
- The theme class name is dynamic (`useId`-derived: `fui-FluentProviderr0` on React 18, `fui-FluentProvider1` pre-18). No CSS Module or Tailwind rule may reference it. Any code that pattern-matches it (e.g. `react-portal-compat`'s `RegExp('([^\\s]*fui-FluentProvider\\w+)')`) is coupled to `useFluentProviderThemeStyleTag.ts` and has an explicit 'keep in sync' comment — changing the provider className composition breaks v8 interop silently.
- Shadow DOM: removing the Griffel runtime renderer removes `createShadowDOMRenderer`, so component CSS can no longer be injected into a shadow root. Theme vars still inherit, but component styles would not apply. Currently only exercised by `apps/vr-tests-react-components/src/stories/ShadowDOM/*` with `@griffel/shadow-dom` as a root devDependency, so blast radius is small — but those VR tests will fail and the capability disappears.
- `FluentProvider` has no ShadowRoot support of its own (`createStyleTag` only appends to `targetDocument.head`; `targetDocument` is typed `Document`). Any plan that assumes providers can live inside shadow roots is wrong today and will still be wrong after the migration.
- zIndex tokens are NOT in any theme — `tokens.zIndexPopup` etc. resolve purely to their hardcoded fallbacks (`var(--zIndexPopup, 2000)`). A naive 'generate a CSS file from webLightTheme' step will omit all 8 and any Tailwind `@theme` mapping that assumes theme-backed z-index will be empty. Only 2 real usages exist (both `tokens.zIndexContent` in `react-card`), but the portal mount node's hardcoded `z-index: 1000000` in `usePortalMountNodeStyles.styles.ts` must also survive.
- Token values flow into CSS verbatim (only `<`/`>` escaped). Font-family values contain quotes and commas (`"'Segoe UI', 'Segoe UI Web (West European)', …"`) and shadow values contain commas — any Tailwind `@theme` or CSS-var generation step that naively splits on commas or strips quotes will corrupt `fontFamilyBase` and all 12 shadow tokens.
- `@fluentui/react-theme-sass` is version `9.0.0-alpha.30` with `beachball.disallowedChangeTypes: ["major","minor","patch"]` and is not exported from `@fluentui/react-components` — it is effectively frozen prerelease. Depending on it as the migration's token source means depending on an unsupported package; generating an equivalent `.css`/`@theme` file from `@fluentui/tokens` in the build (as `packages/web-components/src/theme/design-tokens.ts` already does) is the safer path.
- Replacing keyborg's `[data-fui-focus-visible]` with native `:focus-visible` would be a behaviour change, not a refactor — keyborg's keyboard-navigation heuristic differs from the UA's. VR tests already script the attribute directly (`apps/vr-tests-react-components/src/stories/Tag/TagShape.stories.tsx:12`, `Link/utils.tsx:44`), so any selector change breaks those tests and the visual contract simultaneously.
- `createFocusOutlineStyle` hardcodes `outlineWidth: '2px'` with a FIXME noting `tokens.strokeWidthThick` caused bugs. A migration that 'cleans this up' to use the token changes rendering. The compiled value is literally `border: 2px solid var(--colorStrokeFocus2)` and `top/right/bottom/left: calc(2px * -1)` — reproduce exactly, including the `calc()` form if byte-identical CSS matters.

## Full report

# Fluent UI v9 theming: mechanism and CSS-Modules/Tailwind consumption

Repo root: `C:/Users/ArrayKnight/Code/fluentui`. All paths below are repo-relative.

---

## 1. tokens object → CSS custom properties: the full mechanism

### 1.1 Package layout

`packages/react-components/react-theme/library/src/index.ts` contains **only re-exports** — it is a thin façade over `@fluentui/tokens`:

```ts
export { teamsDarkTheme, …, webLightTheme, createDarkTheme, …, themeToTokensObject, tokens, typographyStyles } from '@fluentui/tokens';
```

`packages/react-components/react-theme/library/package.json` declares `"dependencies": { "@fluentui/tokens": "1.0.0-alpha.23" }`. The real source lives in `packages/tokens/src/`.

### 1.2 Three distinct artifacts

| Artifact                         | File                                                | Shape                                                                                                                                         |
| -------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Theme object** (values)        | `packages/tokens/src/themes/web/lightTheme.ts` etc. | `{ colorNeutralForeground1: '#242424', borderRadiusMedium: '4px', … }` — flat `Record<string,string>`                                         |
| **`tokens` object** (references) | `packages/tokens/src/tokens.ts`                     | `{ colorNeutralForeground1: 'var(--colorNeutralForeground1)', … }`                                                                            |
| **`typographyStyles`**           | `packages/tokens/src/global/typographyStyles.ts`    | 17 presets (`body1`, `caption1Strong`, `title1`, `display`, …), each `{ fontFamily, fontSize, fontWeight, lineHeight }` built from `tokens.*` |

The theme type is a flat intersection — `packages/tokens/src/types.ts:800-815`:

```ts
export type Theme = FontSizeTokens &
  LineHeightTokens &
  BorderRadiusTokens &
  StrokeWidthTokens &
  HorizontalSpacingTokens &
  VerticalSpacingTokens &
  DurationTokens &
  CurveTokens &
  ShadowTokens &
  ShadowBrandTokens &
  FontFamilyTokens &
  FontWeightTokens &
  ColorPaletteTokens &
  ColorStatusTokens &
  ColorTokens &
  ZIndexTokens;
```

There is **no nesting**. `themeToCSSVariables()` was removed when `Theme` was flattened — `packages/react-components/react-components/docs/MIGRATION-NOTES.md:139-141`. The mapping is purely `key → --key`.

### 1.3 Theme → CSS text

`packages/react-components/react-provider/library/src/components/FluentProvider/createCSSRuleFromTheme.ts`:

```ts
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  const cssVarsAsString = Object.keys(theme).reduce((rule, cssVar) => `${rule}--${cssVar}: ${theme[cssVar]}; `, '');
  return `${selector} { ${escapeForStyleTag(cssVarsAsString)} }`;
}
```

`escapeForStyleTag` replaces only `<` → `\3C ` and `>` → `\3E ` (same file, `CSS_ESCAPE_MAP`). Token values otherwise flow into CSS **verbatim** — quoted font-family lists survive intact.

`packages/tokens/src/themeToTokensObject.ts` produces the reference map for custom themes: `tokens[key] = \`var(--${String(key)})\``.

### 1.4 Where it is written to the DOM

`packages/react-components/react-provider/library/src/components/FluentProvider/useFluentProviderThemeStyleTag.ts`:

- `const styleTagId = useId(fluentProviderClassNames.root)` → `fui-FluentProvider` + id (React 18 `useId()` with `:` stripped; pre-18 an incrementing counter — `packages/react-components/react-utilities/src/hooks/useId.ts:37-60`).
- Line 61: `const rule = React.useMemo(() => createCSSRuleFromTheme(\`.${styleTagId}\`, theme), [theme, styleTagId]);`
- `createStyleTag()` → `target.createElement('style')` + `target.head.appendChild(tag)`, where `target` is `targetDocument`.
- `insertSheet()` → `sheet.deleteRule(0); sheet.insertRule(rule, 0)` — **one rule, replaced in place on theme change**.
- Insertion runs inside `useInsertionEffect` (falls back to `useIsomorphicLayoutEffect` on old React). Cleanup calls `styleTag.current?.remove()`.
- `useHandleSSRStyleElements()` relocates an SSR-emitted `<style id=styleTagId>` from body into `document.head` during render.

Verified rule shape — `useFluentProviderThemeStyleTag.test.tsx:70`:

```
".fui-FluentProvider1 {--css-variable-1: 1; --css-variable-2: 2;}"
```

I generated the real rule for `webLightTheme` with the identical reduce (`node .scratch/rule-probe.js`): **19,220 characters**, e.g.

```css
.fui-FluentProvider1 { --borderRadiusNone: 0; --borderRadiusSmall: 2px; --borderRadiusMedium: 4px; … --shadow64Brand: 0 0 8px rgba(0,0,0,0.30), 0 32px 64px rgba(0,0,0,0.25);  }
```

### 1.5 Where the class lands

`packages/react-components/react-provider/library/src/components/FluentProvider/useFluentProviderStyles.styles.ts`:

```ts
export const fluentProviderClassNames = { root: 'fui-FluentProvider' };
state.root.className = mergeClasses(
  fluentProviderClassNames.root,
  state.themeClassName,
  styles.root,
  state.root.className,
);
```

Rendered DOM (`__snapshots__/FluentProvider.test.tsx.snap`):

```html
<div class="fui-FluentProvider fui-FluentProvider1" dir="ltr">…</div>
```

The same file also puts Griffel classes for `color: tokens.colorNeutralForeground1`, `backgroundColor: tokens.colorNeutralBackground1`, `textAlign: 'left'`, `...typographyStyles.body1` on the provider root.

### 1.6 SSR

`renderFluentProvider.tsx` emits, when `!canUseDOM()`, a `<style dangerouslySetInnerHTML={{ __html: state.serverStyleProps.cssRule }} {...state.serverStyleProps.attributes} />` as the **first child of the provider root div**, before `state.root.children`. `serverStyleProps` is assembled in `useFluentProvider.ts` (`cssRule: rule`, `attributes: { ...renderer.styleElementAttributes, id: styleTagId }`) — this is also the CSP `nonce` path (test at `useFluentProviderThemeStyleTag.test.tsx:92-104`).

### 1.7 Answer to "available to ANY selector?"

**Yes, with one scoping caveat.** The declarations sit on a _class rule_, not `:root`. Custom properties are inherited, so `var(--colorNeutralForeground1)` resolves for **any element that is a DOM descendant of the `.fui-FluentProvider<id>` element** — regardless of which stylesheet, CSS Module, Tailwind utility or inline style asks for it. It does **not** resolve on `html`, `body`, or sibling subtrees unless the app opts in.

Opting in is public API: `createCSSRuleFromTheme` is exported from `packages/react-components/react-provider/library/src/index.ts` and re-exported at `packages/react-components/react-components/src/index.ts:18`. Documented pattern — `apps/public-docsite-v9/src/Utilities/Theme/createCSSRuleFromTheme/createCSSRuleFromThemeDefault.stories.tsx:24`:

```ts
const cssRule = createCSSRuleFromTheme(':root', webLightTheme);
```

with guidance in `createCSSRuleFromThemeBestPractices.md`: create rules at app boot (iterating the theme is costly), prefer `FluentProvider`.

### 1.8 Token counts (measured)

`node .scratch/token-diff.js` (parses `packages/tokens/src/tokens.ts` and `packages/react-components/react-theme-sass/sass/*.scss`):

- `tokens.ts` exposes **467** `var(--x)` entries.
- `react-theme-sass` exposes **459** SCSS variables.
- Delta = exactly the 8 `zIndex*` tokens; **0** sass vars absent from `tokens.ts`.

`node .scratch/theme-probe.js` (requires `packages/tokens/lib-commonjs/index.js`):

- `webLightTheme`, `webDarkTheme`, `teamsLightTheme`, `teamsLightV21Theme`, `teamsDarkTheme`, `teamsDarkV21Theme`, `teamsHighContrastTheme` — **all exactly 459 keys, identical key sets** (0 missing / 0 extra vs `webLightTheme` for every theme).
- **`zIndex*` keys appear in NO theme.** They exist only on the `tokens` object with hardcoded fallbacks — `packages/tokens/src/tokens.ts` tail: `zIndexOverlay: 'var(--zIndexOverlay, 1000)'`, `zIndexPopup: 'var(--zIndexPopup, 2000)'` … `zIndexDebug: 'var(--zIndexDebug, 6000)'`. `ZIndexTokens` is all-optional (`packages/tokens/src/types.ts:712-721`). Real usage: **2 occurrences, both `tokens.zIndexContent`, both in `packages/react-components/react-card/library/src/components/Card/useCardStyles.styles.ts`**.

---

## 2. Which themes ship, and how theme switching works

### 2.1 Shipped themes (7 objects)

`packages/tokens/src/themes/index.ts` exports `teamsDarkTheme`, `teamsDarkV21Theme`, `teamsHighContrastTheme`, `teamsLightTheme`, `teamsLightV21Theme`, `webDarkTheme`, `webLightTheme`. All 7 are re-exported from `@fluentui/react-components` (`packages/react-components/react-components/src/index.ts:58-73`).

| Theme | Definition | Notes |
| ---------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `webLightTheme` | `packages/tokens/src/themes/web/lightTheme.ts` — `createLightTheme(brandWeb)` | |
| `webDarkTheme` | `packages/tokens/src/themes/web/darkTheme.ts` — `createDarkTheme(brandWeb)` | |
| `teamsLightTheme` / `teamsLightV21Theme` | `packages/tokens/src/themes/teams/lightTheme.ts` | `createLightTheme(brandTeams                          | brandTeamsV21)`+`...fontFamilies`from`packages/tokens/src/alias/teamsFontFamilies.ts` |
| `teamsDarkTheme` / `teamsDarkV21Theme` | `packages/tokens/src/themes/teams/darkTheme.ts` | `createTeamsDarkTheme(...)` + teams `fontFamilies` |
| `teamsHighContrastTheme` | `packages/tokens/src/themes/teams/highContrastTheme.ts` | `createHighContrastTheme()` — takes **no brand ramp** |

Factories: `packages/tokens/src/utils/createLightTheme.ts`, `createDarkTheme.ts`, `createTeamsDarkTheme.ts`, `createHighContrastTheme.ts` — each spreads `borderRadius, fontSizes, lineHeights, fontFamilies, fontWeights, strokeWidths, horizontalSpacings, verticalSpacings, durations, curves`, a color-token generator, `colorPaletteTokens`, `colorStatusTokens`, and two `createShadowTokens(...)` calls (neutral + `'Brand'` suffix).

Brand ramps are 16-stop (`10`…`160`) — `packages/tokens/src/global/brandColors.ts` (`brandWeb`, `brandTeams`, `brandTeamsV21`).

Measured value differences (`node .scratch/theme-probe.js`):

- `webLightTheme.colorNeutralForeground1 = "#242424"`; `webDarkTheme` = `"#ffffff"`; `teamsHighContrastTheme` = `"#ffffff"` with `colorBrandBackground = "#ffffff"`.
- `webLightTheme.fontFamilyBase = "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, …"` vs `teamsLightTheme.fontFamilyBase = "-apple-system, BlinkMacSystemFont, \"Segoe UI\", system-ui, …"`.

### 2.2 Switching mechanics

`packages/react-components/react-provider/library/src/components/FluentProvider/useFluentProvider.ts`:

- `const mergedTheme = shallowMerge(parentTheme, theme)` — a nested `FluentProvider` inherits the parent theme and **shallow-merges** its own `PartialTheme` on top.
- `useFluentProviderThemeStyleTag({ theme: mergedTheme, targetDocument, rendererAttributes })`.
- `rule` memo keys on `[theme, styleTagId]`; the insertion effect keys on `[styleTagId, targetDocument, rule, styleElementAttributes]`.

Switching a theme **does not change any class name** — it replaces rule 0 in the same `<style>` sheet with new `--var` values. Test evidence: `useFluentProviderThemeStyleTag.test.tsx` "should update style tag on theme change" asserts an unchanged `selectorText` with new declarations.

Each nested `FluentProvider` gets its own `useId`-derived class and its own `<style>` in head; scoping is by DOM containment.

Storybook's picker (`packages/react-components/react-storybook-addon/src/decorators/withFluentProvider.tsx`) maps 7 ids (`web-light`, `web-dark`, `teams-light`, `teams-dark`, `teams-high-contrast`, `teams-light-v21`, `teams-dark-v21`) to the theme objects and swaps the `theme` prop.

A class-swap alternative is documented at `apps/public-docsite-v9/src/Utilities/Theme/createCSSRuleFromTheme/createCSSRuleFromThemeSwitching.stories.tsx:35-36`:

```ts
const lightThemeCSS = createCSSRuleFromTheme('.fluentui-light-theme', webLightTheme);
const darkThemeCSS = createCSSRuleFromTheme('.fluentui-dark-theme', webDarkTheme);
```

**Migration consequence:** nothing about theme switching is Griffel-coupled. Keep `FluentProvider` verbatim, read `var(--x)` from CSS Modules/Tailwind, and switching keeps working.

---

## 3. RTL: how Griffel flips, where `dir` is set, what hand-written CSS must do

### 3.1 Griffel auto-flips at style-compile time, producing TWO class names

`node_modules/@griffel/core/runtime/resolveStyleRules.esm.js` imports `{ convertProperty, convert } from 'rtl-css-js/core'` and, per declaration:

```js
const rtlDefinition = rtlValue && { key: property, value: rtlValue } || convertProperty(property, value);
const flippedInRtl = rtlDefinition.key !== property || rtlDefinition.value !== value;
const rtlClassName = flippedInRtl ? hashClassName({...}) : undefined;
pushToClassesMap(cssClassesMap, key, className, rtlClassName);  // → [ltrClass, rtlClass] when flipped
```

`node_modules/@griffel/core/runtime/reduceToClassNameForSlots.esm.js` picks at render time:

```js
const className =
  dir === 'rtl'
    ? hasRTLClassName
      ? classNameMapping[1]
      : classNameMapping
    : hasRTLClassName
      ? classNameMapping[0]
      : classNameMapping;
```

`dir` comes from **React context, not the DOM** — `node_modules/@griffel/react/makeStyles.esm.js`: `const dir = useTextDirection();`, backed by `node_modules/@griffel/react/TextDirectionContext.esm.js` (`React.createContext('ltr')`, `TextDirectionProvider`).

`makeResetStyles` does the same at whole-block granularity — `node_modules/@griffel/core/__resetStyles.esm.js`:

```js
function __resetStyles(ltrClassName, rtlClassName, cssRules, …) { … const className = dir === 'ltr' ? ltrClassName : rtlClassName || ltrClassName; … }
```

**Concrete build output** — `packages/react-components/react-label/library/lib/components/Label/useLabelStyles.styles.js`:

```js
required: { sj55zd: "f1whyuy6", uwmqm3: ["fruq291", "f7x41pl"] },
// d: [ …, ".fruq291{padding-left:var(--spacingHorizontalXS);}", ".f7x41pl{padding-right:var(--spacingHorizontalXS);}", … ]
```

and for reset styles — `packages/react-components/react-menu/library/lib/components/MenuItem/useMenuItemStyles.styles.js`: `__resetStyles("rfoezjv", "r8lt3v0", { r: [ ".rfoezjv{…padding-right:var(--spacing…" ] })`.

### 3.2 Exactly what rtl-css-js flips (measured, `node .scratch/rtl-probe.js`, rtl-css-js 1.16.1)

**34 key-swap entries** in `propertiesToConvert` (17 pairs × camelCase + kebab-case):

`paddingLeft↔paddingRight`, `marginLeft↔marginRight`, `left↔right`, `borderLeft↔borderRight`, `borderLeftColor↔borderRightColor`, `borderLeftStyle↔borderRightStyle`, `borderLeftWidth↔borderRightWidth`, `borderTopLeftRadius↔borderTopRightRadius`, `borderBottomLeftRadius↔borderBottomRightRadius`.

**Value converters** exist for: `padding`, `margin`, `borderColor`, `borderRadius`, `borderWidth`, `borderStyle`, `background`, `backgroundImage`, `backgroundPosition`, `backgroundPositionX`, `objectPosition`, `boxShadow` (+ vendor), `textShadow`, `transform` (+ vendor), `transformOrigin` (+ vendor), `transition`, `transitionProperty` (+ vendor).

Probe results (input → `{key, value}`):

| Input                              | Output                | Note                                 |
| ---------------------------------- | --------------------- | ------------------------------------ |
| `paddingLeft: '4px'`               | `paddingRight: '4px'` | key swap                             |
| `paddingLeft: '4px /* @noflip */'` | **unchanged**         | escape hatch                         |
| `paddingInlineStart: '4px'`        | **unchanged**         | logical props pass through           |
| `insetInlineStart: '4px'`          | **unchanged**         |                                      |
| `textAlign: 'left'`                | `textAlign: 'right'`  | value flip                           |
| `float: 'left'`                    | `float: 'right'`      |                                      |
| `cursor: 'e-resize'`               | `cursor: 'w-resize'`  |                                      |
| `direction: 'ltr'`                 | `direction: 'rtl'`    |                                      |
| `transform: 'translateX(10px)'`    | `translateX(-10px)`   | value negation                       |
| `boxShadow: '2px 2px 4px black'`   | `-2px 2px 4px black`  | x-offset negation                    |
| `backgroundPosition: 'left top'`   | `right top`           |                                      |
| `padding: '1px 2px 3px 4px'`       | `1px 4px 3px 2px`     | shorthand reorder                    |
| `margin: '1px 2px 3px 4px'`        | `1px 4px 3px 2px`     |                                      |
| `borderRadius: '1px 2px 3px 4px'`  | `2px 1px 4px 3px`     |                                      |
| `inset: '1px 2px 3px 4px'`         | **NOT flipped**       | gap                                  |
| `clipPath: 'inset(…)'`             | **NOT flipped**       | gap                                  |
| `translate` / `rotate`             | **NOT flipped**       | individual transform props are a gap |
| `gridColumn`                       | **NOT flipped**       |                                      |

`@noflip` usage is essentially nil: `rg 'noflip' packages/react-components` → **1 file**, `packages/react-components/react-positioning/library/src/createArrowStyles.ts` (lines 82, 83, 98, 109, 117).

### 3.3 Where `dir` is set

1. **React context for Griffel:** `renderFluentProvider.tsx` wraps children in `<TextDirectionProvider dir={contextValues.textDirection}>`; `textDirection = state.dir` (`useFluentProviderContextValues.ts`).
2. **DOM attribute on the provider root:** `useFluentProvider.ts` → `getIntrinsicElementProps('div', { ...props, dir, ... })`. `dir` defaults to `parentContext.dir`, whose default is `'ltr'` (`packages/react-components/react-shared-contexts/library/src/ProviderContext/ProviderContext.ts` — `providerContextDefaultValue = { targetDocument: …, dir: 'ltr' }`). The attribute is therefore **always** emitted; snapshot confirms `dir="ltr"`.
3. **DOM attribute on portal mount nodes:** `packages/react-components/react-portal/library/src/components/Portal/usePortalMountNode.ts` — both factories call `setAttribute('dir', dir)`.
4. **Fluent context for JS logic:** `provider = { dir, targetDocument }` via `Provider_unstable`, read by `useFluent_unstable()`.
5. **Icons:** `IconDirectionContextProvider value={{ textDirection: dir }}`; `node_modules/@fluentui/react-icons/lib/utils/useIconState.js` applies `styles.rtl` = `.f13rod7r{transform:scaleX(-1);}` when `flipInRtl && textDirection === 'rtl'`.

### 3.4 What this means for hand-written CSS

**Logical properties are the correct replacement for the key-swap set** (padding/margin/border/inset left↔right), because `dir="rtl"` on the provider root establishes computed `direction: rtl` for the whole subtree, and portal nodes carry their own `dir`. In-repo proof: `packages/web-components/src/**/*.styles.ts` uses `padding-inline` ×26, `margin-inline` ×29, `inset-inline` ×17, `border-inline` ×5, `padding-left` ×1, `margin-left` ×0 (counts via `rg -o -F` over `packages/web-components/src/**/*.styles.ts`).

**Logical properties do NOT cover** the value-converter set. These need explicit `[dir="rtl"]` / `:dir(rtl)` overrides: `transform: translateX()`, `box-shadow` x-offset, `text-shadow`, `background-position`, `object-position`, `transform-origin`, `float`, `cursor: *-resize`, `background` shorthand. Web-components handles exactly this with `:dir(rtl)` at 5 sites: `packages/web-components/src/tree-item/tree-item.styles.ts:93` (`.chevron:dir(rtl)`), `slider/slider.styles.ts:67,138`, `tablist/tablist.styles.ts:219`, `rating-display/rating-display.styles.ts:51`.

**Migration surface** (measured over `packages/react-components/**/*.styles.ts` with `rg -o` per property):

| Property       | Count | Property                  | Count |
| -------------- | ----- | ------------------------- | ----- |
| `paddingRight` | 73    | `boxShadow`               | 85    |
| `paddingLeft`  | 66    | `transform`               | 76    |
| `left:`        | 67    | `textAlign`               | 45    |
| `marginLeft`   | 50    | `float`                   | 6     |
| `right:`       | 50    | `backgroundPosition`      | 0     |
| `marginRight`  | 34    | `borderBottomRightRadius` | 19    |
| `borderRight`  | 33    | `borderTopRightRadius`    | 15    |
| `borderLeft`   | 17    | `borderBottomLeftRadius`  | 15    |
|                |       | `borderTopLeftRadius`     | 9     |

Already-logical usage is tiny: `marginInline` 11, `paddingInline` 6, `marginInlineStart` 7, `paddingInlineStart` 5, `marginInlineEnd` 3, `paddingInlineEnd` 1, and **0** for `insetInline*`, `borderInline*`, `borderStartStartRadius`/`borderStartEndRadius`/`borderEndStartRadius`/`borderEndEndRadius`.

`textAlign` values present: `'center'` ×17, `'left'` ×10, `'unset'` ×7, `'justify'` ×2, `'end'` ×2, `'start'` ×1, `'right'` ×1 — the 11 `left`/`right` sites are the ones Griffel flips and must become `start`/`end`.

**Semantic divergence risk (important):** Griffel selects the RTL class from **React context**, whereas CSS logical properties resolve against the **computed `direction`** of the element. Today a raw `<div dir="rtl">` nested inside `FluentProvider dir="ltr"` does **not** flip Griffel styles but **would** flip logical properties after the migration. The common case (dir set only via FluentProvider) stays aligned because FluentProvider always emits the matching DOM attribute.

**JS-level RTL is unaffected** — components branching on `useFluent().dir` keep working: `react-breadcrumb/.../useBreadcrumbDivider.tsx:74`, `react-menu/.../useMenuItem.tsx:28`, `react-tree/.../TreeItemChevron.tsx:14`, `react-accordion/.../useAccordionHeader.tsx:39`, `react-avatar/.../useAvatar.tsx:43,156`, `react-avatar/.../useAvatarGroupItemStyles.styles.ts:195`, `react-spinner/.../useSpinnerStyles.styles.ts:262`, `react-calendar-compat/.../useWeekCornerStyles.styles.ts:118-130`, `react-positioning/library/src/usePositioningOptions.ts:119`, `react-toast/library/src/state/vanilla/getPositionStyles.ts:12`, `react-utilities/src/utils/getRTLSafeKey.ts`.

---

## 4. Focus indicators

### 4.1 The attribute is applied by JS, not by CSS

`packages/react-components/react-tabster/src/focus/constants.ts`:

```ts
export const KEYBOARD_NAV_ATTRIBUTE = 'data-keyboard-nav';
export const KEYBOARD_NAV_SELECTOR = `:global([data-keyboard-nav])`;
export const FOCUS_VISIBLE_ATTR = 'data-fui-focus-visible';
export const FOCUS_WITHIN_ATTR = 'data-fui-focus-within';
export const defaultOptions = { style: {}, selector: 'focus', customizeSelector: (s: string) => s };
```

`packages/react-components/react-tabster/src/focus/focusVisiblePolyfill.ts` (`applyFocusVisiblePolyfill(scope, targetWindow)`):

- creates a `keyborg` instance; listens for `KEYBORG_FOCUSIN` on the scope element and `focusout`;
- on focus-in while `keyborg.isNavigatingWithKeyboard()`, does `el.setAttribute('data-fui-focus-visible', '')` on `e.composedPath()[0]`;
- removes the attribute when navigation mode flips to pointer, or focus leaves the scope;
- guards re-application via `alreadyInScope()` walking `parentElement`, stamping `scope.focusVisible = true`.

The scope is installed by `FluentProvider` itself — `useFluentProvider.ts`: `ref: useMergedRefs(ref, useFocusVisible<HTMLDivElement>({ targetDocument }))`; `packages/react-components/react-tabster/src/hooks/useFocusVisible.ts` calls `applyFocusVisiblePolyfill(scopeRef.current, targetDocument.defaultView)`. Portal mount nodes get their own scope (`usePortalMountNode.ts` passes a `focusVisibleRef` from `useFocusVisible()`).

`data-fui-focus-within` works the same way via `packages/react-components/react-tabster/src/focus/focusWithinPolyfill.ts` (set on the _container_ element, then combined with native `:focus-within`).

`data-keyboard-nav` is a separate, provider-agnostic marker set by `packages/react-components/react-tabster/src/hooks/useKeyboardNavAttribute.ts`.

### 4.2 Selector construction

`packages/react-components/react-tabster/src/focus/createCustomFocusIndicatorStyle.ts`:

```ts
return { [customizeSelector(createBaseSelector(selectorType))]: style };

function createBaseSelector(selectorType) {
  switch (selectorType) {
    case 'focus':
      return `&[data-fui-focus-visible]`;
    case 'focus-within':
      return `&[data-fui-focus-within]:focus-within`;
  }
}
```

`packages/react-components/react-tabster/src/focus/createFocusOutlineStyle.ts` composes:

```ts
':focus':         { outlineStyle: enableOutline ? undefined : 'none' },
':focus-visible': { outlineStyle: enableOutline ? undefined : 'none' },
...createCustomFocusIndicatorStyle(getFocusOutlineStyles({
  outlineColor: tokens.colorStrokeFocus2,
  outlineRadius: tokens.borderRadiusMedium,
  outlineWidth: '2px',           // source FIXME: tokens.strokeWidthThick caused bugs
  ...style,
}), { selector, customizeSelector })
```

with `getFocusOutlineStyles` = `{ ...shorthands.borderColor('transparent'), '@media (forced-colors: active)': { '::after': { ...shorthands.borderColor('Highlight') } }, '::after': { content: '""', position: 'absolute', pointerEvents: 'none', zIndex: 1, border: \`${w} solid ${c}\`, borderRadius: r, top/right/bottom/left: getOutlinePosition(...) } }`, and `getOutlinePosition`returning`calc(${outlineWidth} \* -1)`when`outlineOffset`is absent, else`calc(0px - ${outlineWidth} - ${offset})`.

### 4.3 Exact compiled CSS to replicate (extracted from a built artifact)

From `packages/react-components/react-menu/library/lib/components/MenuItem/useMenuItemStyles.styles.js`:

```css
.rfoezjv[data-fui-focus-visible] {
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
}
@media (forced-colors: active) {
  .rfoezjv[data-fui-focus-visible]::after {
    border-top-color: Highlight;
    border-right-color: Highlight;
    border-bottom-color: Highlight;
    border-left-color: Highlight;
  }
}
.rfoezjv[data-fui-focus-visible]::after {
  content: '';
  position: absolute;
  pointer-events: none;
  z-index: 1;
  border: 2px solid var(--colorStrokeFocus2);
  border-radius: var(--borderRadiusMedium);
  top: calc(2px * -1);
  right: calc(2px * -1);
  bottom: calc(2px * -1);
  left: calc(2px * -1);
}
```

Plain-CSS replication of default `createFocusOutlineStyle()` on `.myRoot`:

```css
.myRoot:focus,
.myRoot:focus-visible {
  outline-style: none;
}
.myRoot[data-fui-focus-visible] {
  border-color: transparent;
}
.myRoot[data-fui-focus-visible]::after {
  content: '';
  position: absolute;
  pointer-events: none;
  z-index: 1;
  border: 2px solid var(--colorStrokeFocus2);
  border-radius: var(--borderRadiusMedium);
  inset: -2px; /* Griffel emits top/right/bottom/left: calc(2px * -1) */
}
@media (forced-colors: active) {
  .myRoot[data-fui-focus-visible]::after {
    border-color: Highlight;
  }
}
```

The element needs `position: relative` — stated in the JSDoc of `createFocusOutlineStyle.ts`.

Custom indicator equivalents: `.myRoot[data-fui-focus-visible] { … }` and `.myRoot[data-fui-focus-within]:focus-within { … }`.

Also verified in built Button CSS — `packages/react-components/react-button/library/lib/components/Button/useButtonStyles.styles.js`: `.r1f29ykk[data-fui-focus-visible]{border-color:var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);border-width:1px;outline:var(--strokeWidthThick) solid var(--…)}`, `.f1062rbf[data-fui-focus-visible]{border-radius:var(--borderRadiusCircular);}`, `.fj0ryk1[data-fui-focus-visible]{border-radius:var(--borderRadiusNone);}`.

### 4.4 Scale

`rg -l` over `packages/react-components` (`*.ts`/`*.tsx`, excl. node_modules): `createFocusOutlineStyle` in **22** files, `createCustomFocusIndicatorStyle` in **34** files.

### 4.5 Migration note

The attribute mechanism is entirely JS-side (`react-tabster` + `keyborg`) and does not touch Griffel. Keeping `react-tabster` and writing `[data-fui-focus-visible]` selectors in CSS Modules reproduces behaviour exactly. Substituting native `:focus-visible` (as `packages/web-components/src/button/button.styles.ts:113` does) would change behaviour — keyborg's "navigating with keyboard" state is not the UA's `:focus-visible` heuristic.

---

## 5. `@fluentui/react-theme-sass`

`packages/react-components/react-theme-sass/README.md`: _"SASS variables referencing react-theme design tokens injected to DOM by react-provider."_

**It already is the non-Griffel consumption layer.**

- `packages/react-components/react-theme-sass/sass/tokens.scss` `@import`s 9 partials: `borderRadiusTokens`, `colorPaletteTokens`, `colorTokens`, `curveTokens`, `durationTokens`, `fontTokens`, `shadowTokens`, `spacingTokens`, `strokeWidthTokens`.
- Each is a flat list, e.g. `packages/react-components/react-theme-sass/sass/colorTokens.scss:1`: `$colorNeutralForeground1: var(--colorNeutralForeground1);`
- `packages/react-components/react-theme-sass/package.json`: `"style": "sass/tokens.scss"`, `"exports": { ".": { "style": "./sass/tokens.scss", … } }`, `"files": [ …, "sass" ]`.
- `packages/react-components/react-theme-sass/src/index.ts` **throws** if imported from JS: `'@fluentui/react-theme-sass package only contains SASS exports. It should never be imported in Javascript.'`
- Parity is test-enforced — `packages/react-components/react-theme-sass/sass/Sass.test.ts` compiles `@import "sass/tokens.scss"` plus one `$expected__<token>: $<token>;` line per key of `webLightTheme`.

Caveats:

- Version `9.0.0-alpha.30`, with `beachball.disallowedChangeTypes: ["major","minor","patch"]` — pinned to prerelease-only bumps. It is **not** re-exported from `@fluentui/react-components`.
- Contains **459** variables; missing the **8** `zIndex*` tokens (measured) — consistent, since those aren't in any theme.
- Values are literally `var(--name)` — no raw color literals. An equivalent `.css` / Tailwind `@theme` file is the same trivial transform, which `themeToTokensObject` does in JS and which `packages/web-components/src/theme/design-tokens.ts` (header: _"THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS"_) does as ES exports: `export const colorNeutralForeground1 = 'var(--colorNeutralForeground1)';`

---

## 6. Portals / dialogs and theme CSS vars

Portal content mounts **outside** the provider's DOM subtree (default target `targetDocument.body`), so inheritance alone would not deliver the variables. Fluent copies the theme class onto the mount node.

**Context plumbing:** `packages/react-components/react-shared-contexts/library/src/ThemeClassNameContext/ThemeClassNameContext.ts` — _"Used to provide a CSS class that applies theme css variables. Useful for elements in the React tree (can read context) but not in the DOM Tree. E.g. Portals"_. Default value `''`.

**What is published** — `useFluentProviderContextValues.ts`:

```ts
themeClassName: applyStylesToPortals ? root.className! : themeClassName,
```

`applyStylesToPortals` defaults to `true` (`useFluentProvider.ts`). By default the portal receives the provider root's **entire** className — `fui-FluentProvider fui-FluentProvider<id> <griffel body1/color/background classes> <user className>`, not just the variable-hosting class.

**Application** — `packages/react-components/react-portal/library/src/components/Portal/usePortalMountNode.ts`:

```ts
const themeClassName = useThemeClassName();
const factoryOptions = { dir, …, className: mergeClasses(themeClassName, classes.root, options.className),
                         targetNode: mountNode ?? targetDocument?.body };
```

React-18 factory: `elementProxy.classList.add(...classesToApply); elementProxy.setAttribute('dir', dir); elementProxy.setAttribute('data-portal-node', 'true');`. React-17 factory (`useLegacyElementFactory`) does the same via `targetElement.className = className`.

The mount node also carries `packages/react-components/react-portal/library/src/components/Portal/usePortalMountNodeStyles.styles.ts`: `position: absolute; top: 0; left: 0; right: 0; z-index: 1000000;`.

**Custom mount target:** `PortalMountNodeProvider` (`packages/react-components/react-shared-contexts/library/src/PortalMountNodeContext.ts`) supplies an `HTMLElement | ShadowRoot`; `usePortalMountNode` uses `mountNode ?? targetDocument?.body`.

**v8 interop:** `packages/react-components/react-portal-compat/src/PortalCompatProvider.tsx` extracts only the variable-hosting classes with `new RegExp('([^\\s]*fui-FluentProvider\\w+)', 'g')`, does `element.classList.add(...cssVariablesClasses)` and `applyFocusVisiblePolyfill(element, …)`, with an explicit comment _"Keep in sync with packages/react-provider/src/components/FluentProvider/useFluentProviderThemeStyleTag.ts"_.

**iframes:** `FluentProvider` does not cross iframe boundaries; `targetDocument` + `RendererProvider` must be passed explicitly — `packages/react-components/react-provider/stories/src/Provider/FluentProviderFrame.stories.tsx`.

**Migration consequence:** portals keep receiving CSS variables unchanged (class-copying of a class defined by a plain `<style>` rule). But with `applyStylesToPortals: true` the portal node also receives the provider's Griffel typography/color classes; if those disappear in the rewrite, portal content loses `body1` typography and the `colorNeutralForeground1` / `colorNeutralBackground1` base unless an equivalent CSS-Module class is threaded through the same context.

---

## 7. Shadow DOM support

### Griffel side: supported, via a separate renderer

`node_modules/@griffel/shadow-dom` v0.2.2 exists and exports `createShadowDOMRenderer`, `createFallbackRenderer`, `findInsertionPoint`. In this repo it is a **root devDependency only** (`package.json:71`, `devDependencies`; not in `dependencies`) — no shipped Fluent package depends on it.

Only usage is the VR-test harness — `apps/vr-tests-react-components/src/stories/ShadowDOM/utils.tsx`:

```tsx
const renderer = React.useMemo(() => createShadowDOMRenderer(root), [root]);
return (
  <RendererProvider renderer={renderer}>
    <PortalMountNodeProvider value={root}>{children}</PortalMountNodeProvider>
  </RendererProvider>
);
```

Stories: `apps/vr-tests-react-components/src/stories/ShadowDOM/ShadowDOMDefault.stories.tsx`, `ShadowDOMPortal.stories.tsx`. Both place the `ShadowRoot` **inside** the story, i.e. **below** the `FluentProvider` supplied by `packages/react-components/react-storybook-addon/src/decorators/withFluentProvider.tsx`.

### FluentProvider side: NOT shadow-aware

`useFluentProviderThemeStyleTag.ts`'s `createStyleTag` hard-codes light-DOM head insertion:

```ts
if (!target?.head) { return undefined; }
const tag = target.createElement('style');
…
target.head.appendChild(tag);
```

`target` is `targetDocument: Document`; there is no `ShadowRoot` branch and `FluentProviderProps.targetDocument` is typed `Document` (`FluentProvider.types.ts:41`). Consequently:

- A `FluentProvider` rendered **outside** a shadow root works: the `.fui-FluentProvider<id>` rule lives in document head, the class is on a light-DOM ancestor of the host, and **custom properties inherit across the shadow boundary**. This is exactly what the VR stories exercise.
- A `FluentProvider` rendered **inside** a shadow root would place its rule in document head where `.fui-FluentProvider<id>` cannot match the in-shadow element — its theme variables would not apply.

### Contrast: web-components has first-class shadow theming

`packages/web-components/src/theme/set-theme.ts` implements what the React provider does not: `document.adoptedStyleSheets` for global (`html { --token: … }`), `@scope ([data-fluent-theme="…"]) { :scope { … } }` for scoped, and `element.shadowRoot.adoptedStyleSheets` with `:host { … }` for shadow-local — plus a `documentElement.style.setProperty` fallback and a WebKit `@scope` repaint workaround (`forceRepaint`).

**Migration consequence:** shadow DOM support in v9 React is a Griffel-_renderer_ concern (`createShadowDOMRenderer` places component atomic CSS into the shadow root). Moving to CSS Modules removes the runtime renderer, so component CSS would no longer be injectable into a shadow root unless a build-time stylesheet is adopted there manually. The theme variables themselves are unaffected (they inherit). Not currently a shipped feature (devDependency + VR tests only), but a capability that changes.

---

## 8. Adjacent Griffel behaviours a CSS-Modules world must reproduce

Measured over `packages/react-components/**` (`*.ts`/`*.tsx`, excl. node_modules, tests, stories):

- `makeStyles(` call sites: **425**
- `makeResetStyles(` call sites: **128**
- `tokens.<name>` references: **2,685**
- `shorthands.*`: `borderColor` 213, `borderWidth` 16, `borderStyle` 12, `padding` 2, `margin` 1, `borderRadius` 1
- `*.styles.ts` files: **261** total (**243** under `packages/react-components/*/library/src/`, 4 under `packages/react-components/*/src/`)

**Deterministic cascade ordering.** `node_modules/@griffel/core/renderer/getStyleSheetForBucket.esm.js:9-35` defines `styleBucketOrdering = ['r','d','l','v','w','f','i','h','a','s','k','t','m','c']` (reset, catch-all, `:link`, `:visited`, `:focus-within`, `:focus`, `:focus-visible`, `:hover`, `:active`, reset at-rules, keyframes, at-rules, `@media`, `@container`); `node_modules/@griffel/core/runtime/getStyleBucketName.esm.js` assigns each rule to a bucket. All atomic classes share specificity `(0,1,0)`; conflicts resolve by (a) bucket order in the sheet and (b) `mergeClasses` last-wins de-duplication on the property hash. A CSS-Modules rewrite has neither, so hover/focus/active precedence and slot-override precedence must be re-established by hand-authored selector order/specificity.

**Component-level custom properties.** 37 distinct `--fui-*` properties are set/read by component styles (`rg -o '\-\-fui-[A-Za-z0-9-]+'`), e.g. `--fui-positioning-arrow-angle`, `--fui-positioning-arrow-offset`, `--fui-positioning-slide-direction-x/y`, `--fui-match-target-size`, `--fui-Slider--progress`, `--fui-Slider--direction`, `--fui-Avatar-ringWidth`, `--fui-Drawer--size`, `--fui-Card--size`, `--fui-Spinner--strokeWidth`. These are set at runtime from JS (inline styles) and consumed in CSS — they port to CSS Modules unchanged.

---

## 9. Scratch files created

`.scratch/` (added to `.gitignore`): `token-diff.js`, `theme-probe.js`, `rule-probe.js`, `rtl-probe.js`. These reproduce every count in this report.

# Theme API migration map (Phase 2b)

The JS theming path is removed: themes are **static CSS classes**, not objects. This is the
consumer find/replace source for that break — the companion to `token-rename-map.md`, which
renamed the CSS custom properties in Phases 1 + 2a. **Apply the token rename first, then this.**
Machine-readable source: `theme-api-migration-map.json` (same rows).

Every row below was verified against the regenerated api.md files
(`packages/react-components/react-components/etc/react-components.api.md` and
`packages/tokens/etc/tokens.api.md`).

## 0. Prerequisite — import the stylesheet once

```ts
import '@fluentui/react-tailwind-theme/styles.css';
```

It emits the Web Light token values at `:root, :host`, so the **default theme needs no provider
and no class**, and it ships one class per theme. Without it, components render with the right
class names and no token values.

## 1. The prop

| From                         | To                                             |
| ---------------------------- | ---------------------------------------------- |
| `<FluentProvider theme={x}>` | `<FluentProvider themeClassName={xClassName}>` |

A nested provider that omits `themeClassName` inherits the parent provider's resolved class.
Because a theme is only a class, a provider is no longer required at all — putting the class on
any DOM node themes that subtree.

## 2. Theme object → class-name constant (7 rows)

Both sides are exported from `@fluentui/react-components` and `@fluentui/react-theme`; the
`themeClassNames` map and the `ThemeClassName` union type ship alongside them.

| From (removed)           | To (new constant)                 | CSS class                       |
| ------------------------ | --------------------------------- | ------------------------------- |
| `webLightTheme`          | `webLightThemeClassName`          | `fui-theme-web-light`           |
| `webDarkTheme`           | `webDarkThemeClassName`           | `fui-theme-web-dark`            |
| `teamsLightTheme`        | `teamsLightThemeClassName`        | `fui-theme-teams-light`         |
| `teamsDarkTheme`         | `teamsDarkThemeClassName`         | `fui-theme-teams-dark`          |
| `teamsHighContrastTheme` | `teamsHighContrastThemeClassName` | `fui-theme-teams-high-contrast` |
| `teamsLightV21Theme`     | `teamsLightV21ThemeClassName`     | `fui-theme-teams-light-v21`     |
| `teamsDarkV21Theme`      | `teamsDarkV21ThemeClassName`      | `fui-theme-teams-dark-v21`      |

## 3. Relocated to `@fluentui/tokens` (build-time input only)

Removed from `@fluentui/react-components` and `@fluentui/react-theme`; still exported by
`@fluentui/tokens`, but as **build-time / tooling input** — not part of the runtime API. Use them
in a script to generate a theme class, then ship that class as static CSS.

`webLightTheme` · `webDarkTheme` · `teamsLightTheme` · `teamsDarkTheme` ·
`teamsHighContrastTheme` · `teamsLightV21Theme` · `teamsDarkV21Theme` · `createLightTheme` ·
`createDarkTheme` · `createHighContrastTheme` · `createTeamsDarkTheme` · `themeToTokensObject` ·
`Theme` · `PartialTheme` · `Brands` · `BrandVariants`

## 4. Removed with no replacement

| Symbol                             | Why                                                                         | What to do instead                                                                                                                                                        |
| ---------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createCSSRuleFromTheme`           | Theme rules are generated at build time by `@fluentui/react-tailwind-theme` | Author the theme as a CSS class of custom-property declarations (canonical kebab-case names) and ship it as static CSS                                                    |
| `useFluentProviderThemeStyleTag`   | The runtime theme `<style>` tag is deleted                                  | Nothing — apply a theme class                                                                                                                                             |
| `ThemeContext_unstable`            | The provider no longer supplies a JS theme object                           | To read a token **value** at runtime, use `useCssVarValue` (`@fluentui/react-utilities`) at an element inside the themed scope, passing the active theme class via `deps` |
| `ThemeProvider_unstable`           | Removed with `ThemeContext_unstable`                                        | —                                                                                                                                                                         |
| `ThemeContextValue_unstable`       | Removed with `ThemeContext_unstable`                                        | —                                                                                                                                                                         |
| `nonce` prop / `StyleNonceContext` | No runtime or SSR style element is left to sign (D20.1 retired)             | Cover the static `.css` assets with a CSP `style-src` source list; `'unsafe-inline'` is not required                                                                      |

## 5. Custom themes

A custom theme is a class containing **only** custom-property declarations, using the canonical
kebab-case token names.

**How much you must declare depends on what the theme is derived from.** Undeclared tokens fall
through to the surrounding theme, and outside any theme class that means the `:root` **Web Light**
defaults.

- **Light-derived** → a partial class is fine; the fall-through neighbour is the right one.
- **Dark-derived (or any non-light-derived) → declare the full set.** A dark theme that declares only
  its brand tokens renders Web Light values for everything else: a light UI with dark-brand accents.
  Generate the class rather than hand-writing a subset.
- Nested inside another theme class, a partial class falls through to _that_ theme, not to `:root`.

```css
/* light-derived: partial override is correct */
.my-custom-theme-light {
  --color-brand-background: #0f6cbd;
  --color-neutral-foreground-1: #555;
}
```

```jsx
<FluentProvider themeClassName="my-custom-theme-light">{/* ... */}</FluentProvider>
```

### Generating a full theme class

Derive from `@fluentui/tokens` at build time and emit a class. Each theme key maps to its canonical
CSS variable via the `tokens` object, which is what keeps the names right without a hand-maintained
list:

```js
import { createLightTheme, createDarkTheme, tokens } from '@fluentui/tokens';

// Theme-invariant: MUST be skipped — see below.
const THEME_INVARIANT = /^(spacingHorizontal|spacingVertical|strokeWidth)/;

const toClassRule = (className, theme) =>
  `.${className} {\n` +
  Object.keys(theme)
    .filter(key => !THEME_INVARIANT.test(key))
    .map(key => {
      const match = /^var\((--[^,)]+)/.exec(tokens[key] ?? '');
      return match ? `  ${match[1]}: ${theme[key]};` : null;
    })
    .filter(Boolean)
    .join('\n') +
  '\n}';
```

**Verified:** `createLightTheme(brand)` returns 459 keys; all 459 resolve to a `var(--…)` string in
`tokens` (0 unmapped), so the key→variable derivation is total. With the filter applied the rule
comes out at exactly **433** declarations — the same count every shipped `.fui-theme-*` class
carries, which is the check that the generator is correct.

**Why the 26 must be skipped.** 22 `spacingHorizontal*`/`spacingVertical*` and 4 `strokeWidth*` keys
carry **literal** values in the theme object (`spacingHorizontalM = '12px'`,
`strokeWidthThin = '1px'`), whereas `css/tokens.css` defines them relative to the density and
base-scale knobs — `--spacing-horizontal-m: calc(var(--spacing) * 12)` (line 479),
`--stroke-width-thin: calc(1px * var(--base-scale))` (line 565). Re-declaring them as literals
overrides those expressions for the whole themed subtree, severing both knobs. The values look
identical until density or root font size changes, and then only the themed subtree fails to
respond. All 7 shipped themes carry byte-identical values for these 26, so there is nothing to theme
about them. (467 tokens − 26 theme-invariant − 8 theme-absent `zIndex*` = 433.)

> **Known defect:** the Theme Designer's exported snippet
> (`theme-designer/src/components/Export/{ExportPanel,ExportLink}.tsx`, and
> `src/utils/applyThemeAsClass.ts`) walks **every** key and therefore emits all 26 as literals. Apply
> the `THEME_INVARIANT` filter to its output until that is fixed — tracked as open item 0d in
> `FINAL_REPORT.md` §6.3.

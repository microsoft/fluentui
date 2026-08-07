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
kebab-case token names. Declare just the tokens you want to change — the rest fall through to the
surrounding theme, or to the `:root` Web Light defaults.

```css
.my-custom-theme {
  --color-brand-background: #0f6cbd;
  --color-neutral-foreground-1: #555;
}
```

```jsx
<FluentProvider themeClassName="my-custom-theme">{/* ... */}</FluentProvider>
```

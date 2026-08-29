# @fluentui/react-tailwind-theme-preview

**Fluent UI themes and design tokens as a Tailwind v4 CSS layer**

Windmod component packages ship plain, precompiled CSS that references theme-level custom
properties — the design tokens, the cascade `@layer` order, `--base-scale`, `--spacing` and the
stroke widths. Something has to emit those **once per document**: this package.

It ships in two parts. `base.css` is **theme-less**: the layer order, the token registrations, the
spacing scale, the type ramp, the stroke widths, the `prefers-reduced-motion` floor — everything
that is identical in every theme. Each theme is then its own file (`themes/web-light.css`, …)
carrying nothing but that theme's 433 custom properties inside one class.

It deliberately registers **no** `@property` rules (a non-empty registry puts Blink's
transition-start on a page-global slow path).

The only JavaScript export is the theme class-name constants; everything else is CSS.

## Usage

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

Import the base **exactly once**, at your document root, then one file per theme you ship — all
before your own styles, since theme styles must load first:

```js
// src/main.jsx (or _app.tsx, root layout, etc.)
import '@fluentui/react-tailwind-theme-preview/base.css';
import '@fluentui/react-tailwind-theme-preview/themes/web-dark.css';
```

Then apply that theme's class. windmod's `FluentProvider` is the usual way (a block element
carrying the theme class plus the suite's base typography, text colour and background — any subtree
can be themed, and nested providers override):

```jsx
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview/provider';

export default function App() {
  return (
    <FluentProvider theme={webDarkThemeClassName}>
      <Button appearance="primary">Hi</Button>
    </FluentProvider>
  );
}
```

**There is no default theme.** This mirrors Griffel exactly: there you `import { webDarkTheme }`
and pass it to `FluentProvider`, and a provider given no theme leaves every token unset. Here the
import is CSS and the value is a class name, but the contract — and the cost model, where you pay
only for the themes you ship — is the same.

This package also works standalone for styling `@fluentui/react-headless-components-preview`
directly: import the base and a theme, apply the class to any element, reference the tokens.

### The seven themes

| Subpath                          | Class                           | Constant                          |
| -------------------------------- | ------------------------------- | --------------------------------- |
| `themes/web-light.css`           | `fui-theme-web-light`           | `webLightThemeClassName`          |
| `themes/web-dark.css`            | `fui-theme-web-dark`            | `webDarkThemeClassName`           |
| `themes/teams-light.css`         | `fui-theme-teams-light`         | `teamsLightThemeClassName`        |
| `themes/teams-dark.css`          | `fui-theme-teams-dark`          | `teamsDarkThemeClassName`         |
| `themes/teams-high-contrast.css` | `fui-theme-teams-high-contrast` | `teamsHighContrastThemeClassName` |
| `themes/teams-light-v21.css`     | `fui-theme-teams-light-v21`     | `teamsLightV21ThemeClassName`     |
| `themes/teams-dark-v21.css`      | `fui-theme-teams-dark-v21`      | `teamsDarkV21ThemeClassName`      |

Each is 23.4 KB raw / ~3.9 KB gzipped (high contrast is smaller, 23.2 KB / 3.0 KB, because it
repeats far fewer distinct colours). With the 3.5 KB / 833 B base, a single-theme application loads
**27 KB raw / 4.6 KB gzipped** — against 159 KB / 14.6 KB if it took all seven.

### If you skip an import

Without **`base.css`**, the theme's custom properties are missing entirely: numeric spacing
utilities compute to `0px` and the cascade-layer order is undefined — components render with
collapsed metrics and invert each other's overrides.

Without a **theme file, or its class**, the structure is right but nothing is coloured: colour
tokens resolve to nothing, so backgrounds go transparent and text inherits. windmod's
`FluentProvider` warns once per document in development builds when no theme reaches it, naming
both halves of the fix — a diagnostic Griffel does not have for the equivalent mistake.

## Layering

All Fluent styles live in one cascade-layer family, declared by this package's stylesheet (which is
why it must load before component styles):

```css
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3,
  fui.components.l4, fui.components.l5, fui.utilities;
```

- **Plain CSS consumers** need no setup. Unlayered CSS beats every layer, so your own selectors win
  by default.
- **Tailwind consumers** who want their own utilities to beat Fluent component styles should declare
  the `fui` layer before importing Tailwind (cascade layer order is first-appearance):

  ```css
  @layer fui.theme, fui.base, fui.components, fui.utilities;
  @import 'tailwindcss';
  ```

Levels `l3`–`l5` inside `fui.components` are deliberately empty — use them for app-global, per-page
and one-off overrides that should still lose to your unlayered CSS.

## Subpath exports

| Subpath                                                    | What it is                                                                                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `@fluentui/react-tailwind-theme-preview/base.css`          | The emitted, plain-CSS base — theme-less. **Import this once, first.**                                                         |
| `@fluentui/react-tailwind-theme-preview/themes/<name>.css` | One theme's class, plain CSS. Seven of them ([above](#the-seven-themes)). **Import the ones you ship.**                        |
| `@fluentui/react-tailwind-theme-preview/styles.css`        | The base plus all seven themes in one file. Convenience only — it still bakes no default, so a class is still applied by hand. |
| `@fluentui/react-tailwind-theme-preview/theme-class-names` | The theme class-name constants (`webLightThemeClassName`, …) and the `ThemeClassName` type.                                    |
| `@fluentui/react-tailwind-theme-preview`                   | `css/index.css` — Tailwind **source**, for `@reference`/`@import` from a Tailwind v4 build. Not plain CSS.                     |
| `@fluentui/react-tailwind-theme-preview/css/*`             | The individual source layers (`index.css`, `tokens.css`, `themes/*.css`, `variants.css`, `utilities.css`) for advanced setups. |

Only `base.css`, `themes/*.css`, `styles.css` and `theme-class-names` are consumable without a
Tailwind toolchain.

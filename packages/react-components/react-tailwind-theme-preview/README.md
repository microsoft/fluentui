# @fluentui/react-tailwind-theme-preview

**Fluent UI themes and design tokens as a Tailwind v4 CSS layer**

Windmod component packages ship plain, precompiled CSS that references theme-level custom
properties — the design tokens, the cascade `@layer` order, `--base-scale`, `--spacing` and the
stroke widths. Something has to emit those **once per document**: this package. It ships the seven
theme classes (`.fui-theme-web-light`, `.fui-theme-web-dark`, `.fui-theme-teams-light`, …, each
containing only custom-property declarations) plus the web-light values as `:root, :host` defaults.
It deliberately registers **no** `@property` rules (a non-empty registry puts Blink's
transition-start on a page-global slow path).

The only JavaScript export is the theme class-name constants; everything else is CSS.

## Usage

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

Import the emitted stylesheet **exactly once**, at your document root, before your own styles —
theme styles must load first:

```js
// src/main.jsx (or _app.tsx, root layout, etc.)
import '@fluentui/react-tailwind-theme-preview/styles.css';
```

Then pick a theme with windmod's `FluentProvider` (a block element carrying the theme class plus
the suite's base typography, text colour and background — any subtree can be themed, and nested
providers override):

```jsx
import { Button, FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview';

export default function App() {
  return (
    <FluentProvider theme={webDarkThemeClassName}>
      <Button appearance="primary">Hi</Button>
    </FluentProvider>
  );
}
```

No provider is needed for the default web-light theme. This package also works standalone for teams
styling `@fluentui/react-headless-components-preview` directly — apply a theme class to any element
and reference the tokens.

### If you skip the import

The theme's custom properties are missing entirely: color tokens resolve to nothing and numeric
spacing utilities compute to `0px` — components render unthemed with collapsed metrics.

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

| Subpath                                                    | What it is                                                                                                     |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `@fluentui/react-tailwind-theme-preview/styles.css`        | The emitted, plain-CSS root artifact. **This is the consumer entry point.**                                    |
| `@fluentui/react-tailwind-theme-preview/theme-class-names` | The theme class-name constants (`webLightThemeClassName`, …) and the `ThemeClassName` type.                    |
| `@fluentui/react-tailwind-theme-preview`                   | `css/index.css` — Tailwind **source**, for `@reference`/`@import` from a Tailwind v4 build. Not plain CSS.     |
| `@fluentui/react-tailwind-theme-preview/css/*`             | The individual source layers (`index.css`, `tokens.css`, `variants.css`, `utilities.css`) for advanced setups. |

Only `styles.css` and `theme-class-names` are consumable without a Tailwind toolchain.

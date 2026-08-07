# @fluentui/react-tailwind-theme

**Shared Tailwind theme layer for [Fluent UI React](https://react.fluentui.dev)**

Fluent UI React v9 component packages ship plain, precompiled CSS (`<package>/dist/styles.css`,
reached automatically through each package's generated class map). That compiled CSS references
theme-level custom properties — the design tokens, the cascade `@layer` order, `--base-scale`,
`--spacing` and the four stroke widths. Something has to emit those **once per document**. That is
this package: it ships the theme classes (`.fui-theme-web-light`, `.fui-theme-web-dark`,
`.fui-theme-teams-light`, …, each containing only custom-property declarations) plus the web-light
values as `:root, :host` defaults. (It deliberately registers **no** `@property` rules: a non-empty custom-property
registry puts Blink's transition-start path on a page-global slow branch — see
`migration/griffel-to-tailwind/reports/perf-property-remedy.md`.)

> ⚠ This package exports no JavaScript. It is CSS only.

## Usage

Install it alongside the components you use:

```sh
npm install @fluentui/react-components @fluentui/react-tailwind-theme
```

Import the emitted stylesheet **exactly once**, at your document root, before your own styles:

```js
// src/main.jsx (or _app.tsx, root layout, etc.)
import '@fluentui/react-tailwind-theme/styles.css';
```

Then use components normally — you never import a component stylesheet yourself:

```jsx
import { FluentProvider, webLightThemeClassName, Button } from '@fluentui/react-components';

export default function App() {
  return (
    <FluentProvider themeClassName={webLightThemeClassName}>
      <Button appearance="primary">Hi</Button>
    </FluentProvider>
  );
}
```

`FluentProvider` applies the theme class you pass via `themeClassName` to its root (and propagates
it to portals); the token **values** come from this package's static CSS. Because a theme class is
just custom-property declarations, putting it on any DOM node themes that subtree, and nested
providers inherit the parent's class when the prop is omitted.

### If you skip the import

The theme's custom properties are missing entirely: color tokens resolve to nothing and numeric
spacing utilities compute to `0px` — components render unthemed with collapsed metrics. If
components look unstyled or padding and gaps look collapsed, this import is missing.

## Layering

All Fluent styles live in one cascade-layer family:

```css
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3,
  fui.components.l4, fui.components.l5, fui.utilities;
```

- **Plain CSS consumers** need no setup. Unlayered CSS beats every layer, so your own selectors win
  by default — no specificity games required.
- **Tailwind consumers** who want their own utilities to beat Fluent component styles should declare
  the `fui` layer before importing Tailwind (cascade layer order is first-appearance):

  ```css
  @layer fui.theme, fui.base, fui.components, fui.utilities;
  @import 'tailwindcss';
  ```

Levels `l3`–`l5` inside `fui.components` are deliberately left empty and are yours to use for
app-global, per-page and one-off overrides that should still lose to your unlayered CSS.

## Subpath exports

| Subpath                                     | What it is                                                                                                     |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `@fluentui/react-tailwind-theme/styles.css` | The emitted, plain-CSS root artifact. **This is the consumer entry point.**                                    |
| `@fluentui/react-tailwind-theme`            | `css/index.css` — Tailwind **source**, for `@reference`/`@import` from a Tailwind v4 build. Not plain CSS.     |
| `@fluentui/react-tailwind-theme/css/*`      | The individual source layers (`index.css`, `tokens.css`, `variants.css`, `utilities.css`) for advanced setups. |

Only `styles.css` is consumable without a Tailwind toolchain; the `css/*` entries require Tailwind
v4 to compile.

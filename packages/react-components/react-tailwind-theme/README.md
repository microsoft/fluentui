# @fluentui/react-tailwind-theme

**Shared Tailwind theme layer for [Fluent UI React](https://react.fluentui.dev)**

Fluent UI React v9 component packages ship plain, precompiled CSS (`<package>/dist/styles.css`,
reached automatically through each package's generated class map). That compiled CSS references a
small set of theme-level custom properties — the cascade `@layer` order, `--base-scale`,
`--spacing` and the four stroke widths. Something has to emit those **once per document**. That is
this package. (It deliberately registers **no** `@property` rules: a non-empty custom-property
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
import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components';

export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Button appearance="primary">Hi</Button>
    </FluentProvider>
  );
}
```

`FluentProvider` still owns every design-token **value** (they remain runtime CSS custom properties
scoped to the provider element), so per-provider and nested-provider theming are unchanged. This
package only registers the theme-level plumbing that component CSS compiles against.

### If you skip the import

Numeric spacing utilities in the component CSS resolve against a missing `--base-scale` and compute
to `0px` — components render with the right colors and the wrong metrics. If padding and gaps look
collapsed, this import is missing.

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

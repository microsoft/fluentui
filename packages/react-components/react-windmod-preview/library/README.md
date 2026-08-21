# @fluentui/react-windmod-preview

**Fluent UI React components styled with Tailwind v4 + CSS Modules ("windmod")**

Each component composes the corresponding
[`@fluentui/react-headless-components-preview`](../../react-headless-components-preview/library)
hooks (`useX` → `useXStyles` → `renderX`) with build-time-compiled CSS Modules that replicate the
Griffel suite's visuals. Theming is pure CSS via
[`@fluentui/react-tailwind-theme-preview`](../../react-tailwind-theme-preview) theme classes,
applied by `ThemeProvider`. No Griffel, no runtime style injection.

> **Preview** — this package tracks `react-headless-components-preview`, which is itself in
> preview: APIs may change without notice, and coverage is limited to the components the headless
> package ships. Not production-ready.

## Usage

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

```js
// Once per document, before your own styles:
import '@fluentui/react-tailwind-theme-preview/styles.css';
```

```jsx
import { Button, Tooltip, ThemeProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview';

export default function App() {
  return (
    <ThemeProvider theme={webDarkThemeClassName}>
      <Tooltip content="Hello" relationship="label">
        <Button appearance="primary">Hover me</Button>
      </Tooltip>
    </ThemeProvider>
  );
}
```

Component styles load automatically with the components (an ESM side-effect import of this
package's `dist/styles.css`); CommonJS/SSR consumers import
`@fluentui/react-windmod-preview/styles.css` themselves.

## Styling contract

- Slot `className` props merge last — your classes win via cascade layers (consumer CSS is
  unlayered; all package styles live in `fui.*` layers).
- Each component's sole public identity class is its group marker (`group/fui-button`, …) for
  Tailwind named-group targeting; internals use hashed idents and `data-*` state attributes
  (`data-open`, `data-placement`, `data-size`, …).

# @fluentui/react-windmod-preview

**Fluent UI React components styled with Tailwind v4 + CSS Modules ("windmod")**

Each component composes the corresponding
[`@fluentui/react-headless-components-preview`](../../react-headless-components-preview/library)
hooks (`useX` → `useXStyles` → `renderX`) with build-time-compiled CSS Modules that replicate the
Griffel suite's visuals. Theming is pure CSS via
[`@fluentui/react-tailwind-theme-preview`](../../react-tailwind-theme-preview) theme classes,
applied by `FluentProvider`, which renders a block element carrying the suite's base typography,
text colour and background onto its subtree. No Griffel, no runtime style injection.

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
import { Button, Tooltip, FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview';

export default function App() {
  return (
    <FluentProvider theme={webDarkThemeClassName}>
      <Tooltip content="Hello" relationship="label">
        <Button appearance="primary">Hover me</Button>
      </Tooltip>
    </FluentProvider>
  );
}
```

Component styles load automatically with the components (an ESM side-effect import of this
package's `dist/styles.css`); CommonJS/SSR consumers import
`@fluentui/react-windmod-preview/styles.css` themselves.

## Styling contract

- Slot `className` props merge last — your classes win via cascade layers (consumer CSS is
  unlayered; all package styles live in `fui.*` layers).
- Each component's root carries a pair of public identity classes: `fui-button` (the documented
  identity class — safe for consumer CSS and `querySelector`, no escaping needed) and
  `group/fui-button` (Tailwind's real named-group class). Internals use hashed idents and
  `data-*` state attributes (`data-open`, `data-placement`, `data-size`, …).
- Children inside a component can target it directly with `group-<variant>/fui-<component>`
  (e.g. `group-disabled/fui-button:text-red-500`) — no group name declaration required.
  Consumers may additionally add their own `group/name` via `className` to disambiguate nested
  instances of the same component, but are never required to.

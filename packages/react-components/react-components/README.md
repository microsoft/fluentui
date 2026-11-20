# @fluentui/react-components

**Converged Fluent UI React components**

This is a suite package for converged components and related utilities. It is a result of a dedupe effort for `@fluentui/react` and `@fluentui/react-northstar`.

### Usage

Add @fluentui/react-components to a project:

```sh
yarn add @fluentui/react-components
```

To use a component, add a `FluentProvider` with a theme close to the root of your application and then instantiate components inside the provider's subtree:

```js
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { FluentProvider, teamsLightTheme, Button } from '@fluentui/react-components';

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <FluentProvider theme={teamsLightTheme}>
    <Button appearance="primary">I am a button.</Button>
  </FluentProvider>,
);
```

### Docs

Docs are hosted at https://react.fluentui.dev/.

### Styling interoperability browser tests

Cypress component tests mount an application-like fixture in a real browser to check how CSS Modules-based
components behave inside an existing Griffel application:

```sh
yarn nx run react-components:e2e

# Interactive Cypress runner
yarn nx run react-components:e2e:local
```

The Cypress bundler resolves every component `.styles` / `.styles.js` import to its `.styles.css` alternative
where one exists (Griffel fallbacks remain elsewhere) and loads CSS Modules through `css-loader` and
`style-loader`. The application layer stays on Griffel, as in real apps that have not migrated yet.

The [fixture and assertions](./e2e/CssModulesInterop.cy.tsx) cover:

- Application `makeStyles` overrides and custom CSS class names on root and slots, including real hover/pressed
  states, keyboard focus, reduced motion, and non-activation of disabled controls.
- An app wrapper component merging its own Griffel styles with a caller `className` via `mergeClasses`.
- Griffel `customStyleHooks_unstable` using `mergeClasses`, without dropping component CSS Module classes, plus
  nested-provider inheritance, caller precedence, and portals.
- Nested light/dark theme updates and LTR/RTL portal direction.
- Explicit and default renderers, nonce propagation to runtime style tags, and theme-tag cleanup on unmount.

Component CSS is unlayered and keeps the specificity of the Griffel rules it replaces (one local class plus
pseudo-classes; other qualifiers use `:where()`), enforced by Stylelint. App overrides therefore win and lose as
they did with Griffel components; for example, a base-only override still loses to the component's hover state.

Per-component Griffel/CSS Modules styling parity across all v9 packages is covered by the separate
[css-modules-parity](../../../apps/css-modules-parity/README.md) app.

Assertions check computed styles and interaction states, not just class names or screenshots. They use source
modules, so they do not validate published-package asset copying, production CSS extraction, SSR/hydration,
Shadow DOM, forced colors, actual CSP enforcement, or cross-browser parity.

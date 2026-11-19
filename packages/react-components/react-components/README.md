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

### Experimental: CSS Modules entry (`/css-modules`)

> ⚠️ Experimental. The API can change or be removed in any release.

`@fluentui/react-components/css-modules` exports the same API as the root entry, but components are styled with
static CSS Modules instead of Griffel runtime styles:

```js
import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components/css-modules';
```

Every v9 package that ships styles has the same entry (for example `@fluentui/react-button/css-modules`).

Requirements for your bundler:

- Process `*.module.css` imports from `node_modules` as CSS Modules with a default export (for webpack:
  `css-loader` with `modules: { auto: true }` + `style-loader` or `mini-css-extract-plugin`).
- Keep CSS imports during tree-shaking: Fluent UI packages declare `"sideEffects": ["**/*.css"]`.

How it works:

- Component sources import their Griffel style hook (`useButtonStyles.styles.ts`). A CSS Modules version of the hook
  (`useButtonStyles.styles.css.ts` + `Button.module.css`) lives next to it.
- At build time, the package build writes a second copy of the components to `lib/css-modules` (and
  `lib-commonjs/css-modules`). In that copy, each Griffel hook import is replaced by its CSS Modules twin. See
  [`@fluentui/workspace-plugin`](../../../tools/workspace-plugin/README.md#css-modules-entry-css-modules) for details.
- Modules that don't depend on styles (state hooks, contexts, utilities) are shared with the root entry. Mixing both
  entries in one app works: contexts stay the same instance. The only cost is that styles of components used through
  both entries are shipped twice (Griffel and CSS).

Known differences from the Griffel entry:

- `makeStyles` overrides from your app still work, but the cascade can differ where Griffel relies on its style
  insertion order. For example, an app's unconditioned override beats a component's `@media` rule, because app
  styles are inserted after the static component CSS.
- `@fluentui/react-icons` still uses Griffel.

### Docs

Docs are hosted at https://react.fluentui.dev/.

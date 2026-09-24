# @fluentui/react-storybook-addon-playground

**Configurable Storybook TSX playground for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

This addon serves a prebuilt Monaco playground shell and adds an **Open in Playground** button next to "Show code" in
Storybook Docs mode. The consumer's Storybook Webpack build produces a separate runtime for React, configured packages,
an optional setup module, and Monaco declarations. User code runs inside a sandboxed preview iframe.

## Features

- Consumer-controlled import map (`options.modules`) compiled by Storybook Webpack and loaded on demand in production
- Private registry and workspace packages without a runtime CDN
- Build-time declaration collection for Monaco IntelliSense (from `modules` + optional `typings`)
- Optional TSX `setup` module for branding, themes and provider/render behavior (Fluent defaults when omitted)
- Sandboxed preview (`sandbox="allow-scripts"`), Prettier formatting, error reporting and shareable URL state
- The last successful preview stays visible while a fresh sandbox prepares the next run, including when an edit fails

## Installation

```sh
yarn add @fluentui/react-storybook-addon-playground
```

## Usage

```js
// .storybook/main.js
const path = require('path');

module.exports = {
  addons: [
    {
      name: '@fluentui/react-storybook-addon-playground',
      options: {
        modules: {
          '@fluentui/react-components': '@fluentui/react-components',
          '@fluentui/react-components/unstable': '@fluentui/react-components/unstable',
          '@fluentui/react-icons': '@fluentui/react-icons',
        },
        setup: path.resolve(__dirname, './playground.setup.tsx'), // optional
        // typings: ['@fluentui/react-theme'], // optional declaration-only entries
      },
    },
  ],
};
```

```js
// .storybook/preview.js
import '@fluentui/react-storybook-addon-playground/styles.css';
```

`modules` maps public imports accepted by the editor to package requests resolved by the consumer's Webpack
configuration. React runtime entries are provided automatically. `typings` adds declaration-only entries.
Production builds load configured modules only when the example imports them. Development includes the modules in eager
chunks, but defers their evaluation until imported, avoiding Storybook's separate-origin lazy-compilation server.
Setup imports and React are always loaded at startup.
Typings load independently and do not block the first preview; declaration collection excludes JavaScript implementations
and falls back to `@types` packages when a runtime package does not ship declarations.

### Preview update modes

The preview starts in **Isolated** mode. Each run creates a fresh opaque-origin sandbox, retaining the last successful
preview until the replacement renders. Removing the old sandbox disposes its timers, listeners and global side effects.

Select **Live update** in the preview header to keep the sandbox and its loaded packages between edits. Live edits run
after a 150 ms pause (400 ms in Isolated mode). TypeScript output is cached by editor model version, and unchanged CSS
modules are not recompiled. Both modes still report syntax, import and runtime errors.

- JavaScript edits remount the example component and reset its React state. This is runtime reuse, not React Fast Refresh.
- CSS declaration edits use stable file-scoped class names and update the existing component without resetting its state.
  Adding or removing local class names reevaluates the example so its imported class map remains accurate.
- Theme changes reuse the component in Live update mode; a custom setup's render tree can still cause a remount.
- **Run** explicitly reevaluates and remounts the example. **Restart preview** creates a clean sandbox without changing the
  editor code. Changing modes also restarts the sandbox.
- Live updates do **not** dispose arbitrary module-level side effects from older runs. Effect cleanup runs when React
  unmounts a component, but global timers, listeners and mutations may remain. Use Restart preview or Isolated mode when
  debugging lifecycle behavior. Live update is session-local and is not enabled by a shared playground URL.
- Syntax/import/module-evaluation errors leave the previous preview visible. A component render error can clear the live
  preview; the next valid edit renders again, and Restart preview is available to reset a broken environment.

The sandbox remains `allow-scripts` only in both modes; Live update never adds `allow-same-origin`.

The optional setup module default-exports a value created with `definePlaygroundSetup`:

```tsx
import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { definePlaygroundSetup } from '@fluentui/react-storybook-addon-playground/setup';

export default definePlaygroundSetup({
  title: 'Fluent UI Playground',
  defaultCode: `import { Button } from '@fluentui/react-components';

export default () => <Button>Hello</Button>;`,
  themes: [{ id: 'web-light', label: 'Web Light', value: webLightTheme }],
  render: ({ Component, theme }) => (
    <FluentProvider theme={theme ?? webLightTheme}>
      <Component />
    </FluentProvider>
  ),
});
```

When `setup` is omitted, the addon's built-in Fluent UI default setup is used.

### Story source

The button reads the story source from `parameters.fullSource`, which is injected at build time by
`@fluentui/babel-preset-storybook-full-source` (registered by `@fluentui/react-storybook-addon-export-to-sandbox`).
Other consumers can populate the same parameter with their own Storybook source transform. The button is not rendered
when `parameters.fullSource` is unavailable.

### Disabling per story

```ts
export const MyStory = () => <Button />;
MyStory.parameters = { playground: { disable: true } };
```

## Development (monorepo)

The playground **shell** is a separate webpack bundle (Monaco + UI). Build it before starting Storybook:

```sh
yarn nx run react-storybook-addon-playground:build-playground
```

The **runtime** (configured modules, setup, typings, `manifest.json`) is emitted by Storybook's Webpack build into
`playground/runtime/`. The shell is served at `playground/app/playground.html`.

## Limitations

- Only configured packages, the built-in React entries, and CSS modules shipped with a story (via
  `parameters.cssModuleSources`) can be imported. Those CSS modules appear as extra editor tabs, compile on edit, and
  are injected into the sandbox as hashed class maps plus a `<style>` tag. Other relative imports are not supported.
- Type errors are shown in the editor but do not block running the code.

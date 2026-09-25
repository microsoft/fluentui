# @fluentui/react-storybook-addon-playground

**Configurable Storybook TSX playground for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

This addon serves a prebuilt Monaco playground shell and adds an **Open in Playground** button next to "Show code" in
Storybook Docs mode. The consumer's Storybook Webpack build produces a separate runtime for React, configured packages,
an optional setup module, and Monaco declarations. User code runs inside a sandboxed preview iframe.

## Features

- Consumer-controlled import map (`options.modules`) compiled by Storybook Webpack and loaded on demand in production
- Private registry and workspace packages without a runtime CDN
- Build-time declaration collection for Monaco IntelliSense (from `modules` + optional `typings`), split per module and
  fetched when the code imports it
- Optional TSX `setup` module for branding, themes and provider/render behavior (Fluent defaults when omitted)
- Sandboxed preview (`sandbox="allow-scripts"`), Prettier formatting, error reporting and shareable URL state
- Live preview updates reuse the sandbox and loaded packages, with an explicit restart for a clean environment
- Console panel, type-error count, CSS module tabs you can add and remove, and preview width presets

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
Typings load independently and do not block the first preview. React and `typings` declarations always load; each
configured module's declarations are a separate file fetched once the code imports that module, so examples that do not
use `@fluentui/react-icons` skip its large declarations. Declaration collection excludes JavaScript implementations,
falls back to `@types` packages when a runtime package does not ship declarations, and parses imports with the
project's `typescript` (an optional peer; a regular-expression parser is used without it).

The addon reads its options from Storybook's preset options, generates its runtime entry in
`node_modules/.cache/fluentui-playground-runtime/` (next to the Storybook config), and keeps the runtime out of Storybook
pages through `html-webpack-plugin` hooks. The editor packages (`monaco-editor`, Prettier, PostCSS) are bundled into the
prebuilt shell and are not installed with the addon.

### Live preview updates

The preview keeps its opaque-origin sandbox and loaded packages between edits. Updates run after a 150 ms pause.
TypeScript output is cached by editor model version, and unchanged CSS modules are not recompiled. Shared playground
links use the same live-update behavior.

- JavaScript edits remount the example component and reset its React state. This is runtime reuse, not React Fast Refresh.
- CSS declaration edits use stable file-scoped class names and update the existing component without resetting its state.
  Adding or removing local class names reevaluates the example so its imported class map remains accurate.
- Theme changes reuse the component; a custom setup's render tree can still cause a remount.
- **Run** explicitly reevaluates and remounts the example. **Restart preview** creates a clean sandbox without changing the
  editor code.
- Timers (`setTimeout`, `setInterval`, `requestAnimationFrame`) and `window`/`document` listeners created while the
  example module is evaluated are disposed when a newer version renders. React effect cleanup runs when the component
  unmounts. Other global mutations, and timers or listeners created later (for example inside callbacks), may remain;
  use Restart preview when debugging lifecycle behavior or whenever a clean environment is needed.
- Syntax/import/module-evaluation errors leave the previous preview visible. A component render error can clear the live
  preview; the next valid edit renders again, and Restart preview is available to reset a broken environment.

The sandbox remains `allow-scripts` only; live updates never add `allow-same-origin`.

### Preview sandbox

- The preview is an opaque-origin `srcdoc` iframe with `sandbox="allow-scripts"`. Messages to the shell target the
  shell's origin; messages from the shell are authenticated by source window and a per-sandbox token.
- A Content Security Policy only allows scripts, styles, fonts and network requests from the origins that serve the
  Storybook runtime. `fetch`/XHR/WebSocket to other origins, nested frames and form submissions are blocked. Images and
  media can load from any HTTPS URL.
- `console.*` output is forwarded to the **Console** panel below the preview (rate limited to 100 messages per second).
  It is cleared whenever the example remounts, on **Run** and on **Restart preview**.

### Shared links

Links store the code and CSS modules in the URL hash (`#code=…&css=…&v=1`), compressed with lz-string. `v` is the
format version; links without it are read as version 1. The playground warns when a link cannot be fully read (for
example when a chat app truncated it) and when **Copy link** produces a URL longer than 8,000 characters.
`readPlaygroundHash` exposes the same parser for tools that create or inspect links.

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

Browser tests (Playwright) build a small fixture runtime with the addon's real `webpackFinal` hook, serve it next to the
prebuilt shell and cover the default setup, shared links, live CSS/theme updates, error recovery, Restart, lazy
modules, the console panel and CSP, type-error count, CSS module management and preview widths:

```sh
yarn nx run react-storybook-addon-playground:e2e
```

## Limitations

- Only configured packages, the built-in React entries, and CSS modules can be imported. CSS modules shipped with a
  story (via `parameters.cssModuleSources`) or added with the **+** button appear as editor tabs, compile on edit, and
  are injected into the sandbox as hashed class maps plus a `<style>` tag. Other relative imports are not supported.
- Type errors are shown in the editor and counted in the editor header, but do not block running the code.

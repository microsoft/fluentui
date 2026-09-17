# @fluentui/react-storybook-addon-playground

**Configurable Storybook TSX playground for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

This addon serves a prebuilt Monaco playground shell and adds an **Open in Playground** button next to "Show code" in
Storybook Docs mode. The consumer's Storybook Webpack build produces a separate runtime for React, configured packages,
an optional setup module, and Monaco declarations. User code runs inside a sandboxed preview iframe.

## Features

- Consumer-controlled import map (`options.modules`) eagerly compiled into the sandbox runtime by Storybook Webpack
- Private registry and workspace packages without a runtime CDN
- Build-time declaration collection for Monaco IntelliSense (from `modules` + optional `typings`)
- Optional TSX `setup` module for branding, themes and provider/render behavior (Fluent defaults when omitted)
- Sandboxed preview (`sandbox="allow-scripts"`), Prettier formatting, error reporting and shareable URL state

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

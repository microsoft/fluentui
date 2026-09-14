# @fluentui/react-storybook-addon-playground

**Configurable Storybook TSX playground**

This addon renders the prebuilt `@fluentui/react-playground` shell and adds an **Open in Playground** button next to
"Show code" in Storybook Docs mode. The consumer's existing Storybook Webpack build produces a separate runtime for
React, private workspace/registry packages, setup code and Monaco declarations.

## Features

- Consumer-controlled import map with literal dynamic imports compiled by Storybook Webpack
- Private registry and workspace packages without a runtime CDN
- Build-time declaration collection for Monaco IntelliSense
- Optional TSX setup module for branding, themes and provider/render behavior
- Sandboxed preview with formatting, error reporting and shareable URL state

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
          '@acme/design-system': '@acme/design-system',
          '@acme/icons': '@acme/icons',
        },
        setup: path.resolve(__dirname, './playground.setup.tsx'),
        typings: ['@acme/design-tokens'],
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
import { DesignSystemProvider } from '@acme/design-system';
import { definePlaygroundSetup } from '@fluentui/react-playground/setup';

export default definePlaygroundSetup({
  title: 'Acme Playground',
  defaultCode: `import { Button } from '@acme/design-system';

export default () => <Button>Hello</Button>;`,
  render: ({ Component }) => (
    <DesignSystemProvider>
      <Component />
    </DesignSystemProvider>
  ),
});
```

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

## Limitations

- Only configured packages and the built-in React entries can be imported. Relative imports and CSS imports are not
  supported.
- Type errors are shown in the editor but do not block running the code.

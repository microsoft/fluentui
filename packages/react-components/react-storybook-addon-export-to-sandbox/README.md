# @fluentui/react-storybook-addon-export-to-sandbox

**React Storybook Addon Export To Sandbox for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

This Storybook addon enables exporting stories to CodeSandbox or StackBlitz directly from the Storybook Docs mode. It is designed to facilitate the creation of live, editable examples of your FluentUI components.

## Features

- Export stories to CodeSandbox/StackBlitz
- Supports both Create React App (CRA) and Vite bundlers

## Installation

To install the addon, run:

```sh
yarn add @fluentui/react-storybook-addon-export-to-sandbox
```

## Usage

Add the addon to your Storybook configuration:

```js
// .storybook/main.js
module.exports = {
  addons: ['@fluentui/react-storybook-addon-export-to-sandbox'],
};
```

## Configuration

The addon can be configured at two levels:

1. **Preset configuration** — passed via `.storybook/main.js` addon options (controls the build-time babel transform)
2. **Parameters configuration** — passed via `.storybook/preview.ts` or per-story (controls runtime sandbox export behavior)

### Preset Configuration (`.storybook/main.js`)

Preset options configure how the addon transforms story source code at build time via `@fluentui/babel-preset-storybook-full-source`.

```js
// .storybook/main.ts

import type { StorybookConfig } from '@storybook/react-webpack5';
import type { PresetConfig } from '@fluentui/react-storybook-addon-export-to-sandbox';

const config: StorybookConfig = {
  addons: [
    {
      name: '@fluentui/react-storybook-addon-export-to-sandbox',
      options: {
        /**
         * Import mappings replace internal/private package imports with their public re-export package.
         * Keys are package names to replace, values define the replacement.
         */
        importMappings: {
          '@fluentui/react-button': { replace: '@fluentui/react-components' },
          '@fluentui/react-text': { replace: '@fluentui/react-components' },
        },
        /**
         * Optional: Override the default webpack rule for the babel loader.
         */
        webpackRule: {},
        /**
         * Optional: Modify the babel-loader options before they are applied.
         */
        babelLoaderOptionsUpdater: options => options,
      } satisfies PresetConfig,
    },
  ],
};
```

| Option                      | Type                                            | Description                                                                         |
| --------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| `importMappings`            | `Record<string, { replace: string }>`           | Maps internal package imports to their public re-export package in generated source |
| `webpackRule`               | `webpack.RuleSetRule`                           | Override the default webpack rule for the story babel loader                        |
| `babelLoaderOptionsUpdater` | `(options: TransformOptions) => typeof options` | Transform babel-loader options before they are applied                              |

### Styles

The addon ships a CSS file for styling the export button in Storybook Docs. Import it in your `.storybook/preview.ts`:

```ts
// .storybook/preview.ts
import '@fluentui/react-storybook-addon-export-to-sandbox/styles.css';
```

### Global Parameters Configuration (`.storybook/preview.ts`)

Global parameters set the default sandbox export behavior for all stories.

```ts
// .storybook/preview.ts
import '@fluentui/react-storybook-addon-export-to-sandbox/styles.css';

import type { Preview } from '@storybook/react';
import type { Parameters } from '@fluentui/react-storybook-addon-export-to-sandbox';

const preview = {
  parameters: {
    exportToSandbox: {
      provider: 'stackblitz-cloud',
      bundler: 'vite',
      requiredDependencies: {
        react: '^18.0.0',
        'react-dom': '^18.0.0',
      },
      optionalDependencies: {
        '@fluentui/react-components': '^9.0.0',
      },
    },
  } satisfies Parameters,
} satisfies Preview;

export default preview;
```

| Option                 | Type                                                                 | Required | Description                                                |
| ---------------------- | -------------------------------------------------------------------- | -------- | ---------------------------------------------------------- |
| `provider`             | `'codesandbox-cloud' \| 'codesandbox-browser' \| 'stackblitz-cloud'` | Yes      | Which sandbox provider to use for the export               |
| `bundler`              | `'vite' \| 'cra'`                                                    | Yes      | Which bundler template to scaffold in the sandbox          |
| `requiredDependencies` | `Record<string, string>`                                             | No       | Dependencies always included in the sandbox `package.json` |
| `optionalDependencies` | `Record<string, string>`                                             | No       | Dependencies included only when detected in story imports  |

### Local (Per Story) Configuration

```js
export const MyStory = () => <MyComponent />;
MyStory.parameters = {
  exportToSandbox: {
    provider: 'codesandbox-cloud', // or 'codesandbox-browser' or 'stackblitz-cloud'
    bundler: 'cra', // or 'vite'
    requiredDependencies: {
      react: 'latest',
      'react-dom': 'latest',
    },
    optionalDependencies: {
      '@fluentui/react-components': 'latest',
    },
  },
};
```

## Example

Here is an example of how to use the addon in a story:

```jsx
import React from 'react';
import { Text } from '@fluentui/react-components';

export const Default = () => <Text>This is an example of the Text component's usage.</Text>;

Default.parameters = {
  exportToSandbox: {
    provider: 'stackblitz-cloud',
    bundler: 'vite',
    requiredDependencies: {
      react: 'latest',
      'react-dom': 'latest',
    },
  },
};
```

## Note

This package is designed for internal usage only and may not be suitable for general use.

## License

MIT

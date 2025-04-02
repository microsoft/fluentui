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

The addon can be configured via the `exportToSandbox` parameter in your story's parameters:

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

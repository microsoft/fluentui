# @fluentui/eslint-plugin-react-components

**ESLint Plugin for [Fluent UI React Components](https://fluent2.microsoft.design/components/web/react)**

[![npm version](https://badge.fury.io/js/%40fluentui%2Feslint-plugin-react-components.svg)](https://badge.fury.io/js/%40fluentui%2Feslint-plugin-react-components)
[![Downloads](https://img.shields.io/npm/dm/@fluentui/eslint-plugin-react-components.svg)](https://www.npmjs.com/package/@fluentui/eslint-plugin-react-components)

## Overview

This ESLint plugin enforces best practices and coding standards for Fluent UI React Components. It helps developers:

- Maintain consistency across Fluent UI React components
- Catch common mistakes and anti-patterns early
- Ensure accessibility standards are met
- Follow Microsoft's design guidelines

## Installation

Install the plugin using your preferred package manager:

```bash
# npm
npm install --save-dev @fluentui/eslint-plugin-react-components

# yarn
yarn add --dev @fluentui/eslint-plugin-react-components

# pnpm
pnpm add --save-dev @fluentui/eslint-plugin-react-components
```

## Usage

1. Add the plugin to your `.eslintrc.js` or equivalent configuration file:

```js
module.exports = {
  plugins: ['@fluentui/react-components'],
  extends: ['plugin:@fluentui/react-components/recommended'],
};
```

2. Or configure individual rules manually:

```js
module.exports = {
  plugins: ['@fluentui/react-components'],
  rules: {
    '@fluentui/react-components/prefer-fluentui-v9': 'warn',
    '@fluentui/react-components/no-missing-jsx-pragma': ['error', { runtime: 'automatic' }],
  },
};
```

## Available Rules

### prefer-fluentui-v9

This rule ensures the use of Fluent UI v9 counterparts for Fluent UI v8 components.

#### Examples

**✅ Do**

```js
// Import and use components that have been already migrated to Fluent UI v9
import { Button } from '@fluentui/react-components';

const Component = () => <Button>...</Button>;
```

**❌ Don't**

```js
// Avoid importing and using Fluent UI V8 components that have already been migrated to Fluent UI V9.
import { DefaultButton } from '@fluentui/react';

const Component = () => <DefaultButton>...</DefaultButton>;
```

### no-missing-jsx-pragma

This rule enforces properly configured `@jsx` or `@jsxImportSource` pragma for files using Fluent UI slot API.

#### Options

- `runtime`: `'automatic'` (default) or `'classic'` - Specifies the JSX runtime to use

#### Examples

**✅ Do (automatic runtime)**

```js
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';

export const renderFoo = (state, contextValues) => {
  assertSlots(state);
  return (
    <state.root>
      <state.button>Hello</state.button>
    </state.root>
  );
};
```

**✅ Do (classic runtime)**

```js
/** @jsx createElement */
import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';

export const renderFoo = (state, contextValues) => {
  assertSlots(state);
  return (
    <state.root>
      <state.button>Hello</state.button>
    </state.root>
  );
};
```

**❌ Don't**

```js
// Missing pragma when using slot API
import { assertSlots } from '@fluentui/react-utilities';

export const renderFoo = (state, contextValues) => {
  assertSlots(state);
  return (
    <state.root>
      <state.button>Hello</state.button>
    </state.root>
  );
};
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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

### enforce-use-client

Ensures that source files using client-only React features begin with the top-level `'use client'` directive, and flags files that include the directive unnecessarily.

The rule looks for any of the following client-only features:

- React client hooks and APIs (e.g. `useState`, `useEffect`, `useRef`, `forwardRef`, `memo`)
- Custom hooks (functions whose name starts with `use` and are not in the safe set: `use`, `useId`)
- JSX event handler props (properties starting with `on` followed by a capital letter, like `onClick`)
- Direct references to browser globals (`window`, `document`, `navigator`, `localStorage`, `sessionStorage`, `history`, `location`)

If at least one feature is present, the directive must be the very first statement in the file. If no features are found, any existing `'use client'` directive will be reported as unnecessary and auto-fixed.

#### ❌ Don't (missing directive)

```ts
import * as React from 'react';

export function MyComponent() {
  const [value, setValue] = React.useState('');
  return <button onClick={() => setValue('clicked')}>{value}</button>;
}
```

#### ✅ Do (directive present)

```ts
'use client';
import * as React from 'react';

export function MyComponent() {
  const [value, setValue] = React.useState('');
  return <button onClick={() => setValue('clicked')}>{value}</button>;
}
```

#### ❌ Don't (unnecessary directive)

```ts
'use client';
// Pure utilities – no client-only APIs
export function add(a: number, b: number) {
  return a + b;
}
```

#### ✅ Do (directive removed)

```ts
// Pure utilities – no client-only APIs
export function add(a: number, b: number) {
  return a + b;
}
```

No options – enable to enforce consistent usage of the directive.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

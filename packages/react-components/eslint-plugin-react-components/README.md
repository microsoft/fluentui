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

Enforces the `"use client"` directive for React components that use client-side features. This rule is essential for Next.js App Router and other React Server Components (RSC) frameworks where components are server-rendered by default.

#### What it detects

The rule automatically detects client-side features including:

- **React hooks**: `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`, etc.
- **React APIs**: `createContext`, `forwardRef`, `memo`, `startTransition`
- **Browser APIs**: `window`, `document`, `localStorage`, `navigator`, etc.
- **Event handlers**: JSX attributes like `onClick`, `onChange`, `onSubmit`, etc.
- **Custom hooks**: Functions starting with `use` (e.g., `useMyCustomHook`)

**Server-safe exceptions**: The rule allows server-safe hooks like `useId` and `use` without requiring the directive.

#### Why it matters

In React Server Components:

- Components without client-side features can be server-rendered (better performance, smaller bundles)
- Components with client-side features must be marked with `"use client"` to run in the browser
- Missing the directive causes runtime errors in production
- Unnecessary directives increase bundle size and reduce performance

#### Auto-fix capability

The rule includes an auto-fixer that:

- Adds `"use client"` directive at the top of files using client features
- Removes unnecessary directives from files without client features
- Relocates misplaced directives to the correct position (first statement)

#### Examples

**✅ Correct: Client features with directive**

```tsx
'use client';
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

**✅ Correct: Pure server component (no directive needed)**

```tsx
// No "use client" needed - this can be server-rendered
export const Greeting = ({ name }: { name: string }) => {
  return <h1>Hello, {name}!</h1>;
};
```

**❌ Incorrect: Client features without directive**

```tsx
// ❌ Missing "use client" - will cause runtime error
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

**❌ Incorrect: Unnecessary directive**

```tsx
// ❌ Unnecessary "use client" - reduces performance
'use client';

export const Greeting = ({ name }: { name: string }) => {
  return <h1>Hello, {name}!</h1>;
};
```

#### Configuration

```js
module.exports = {
  plugins: ['@fluentui/react-components'],
  rules: {
    '@fluentui/react-components/enforce-use-client': 'error',
  },
};
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

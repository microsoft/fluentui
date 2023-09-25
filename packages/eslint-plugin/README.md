# @fluentui/eslint-plugin

**ESLint configuration and custom rules for Fluent UI**

## Configs

Usage: in your [ESLint config file](https://eslint.org/docs/user-guide/configuring), add `{ "extends": ["plugin:@fluentui/<name>"] }` or `{ "extends": ["plugin:@fluentui/eslint-plugin/<name>"] }` (the two are equivalent).

- `react`: react specific configuration for fluentui vNext
- `node`: node specific configuration for fluentui vNext
- `react--legacy`: react specific configuration for fluentui v7,8
- `node--legacy`: node specific configuration for fluentui v7,8
- `react-northstar`: For `@fluentui/react-northstar` and related packages
- `imports`: auto import statements sorting configuration

Helpers for customizing configuration are exported under a `configHelpers` object.

## Rules

### `ban-context-export`

Exporting context objects as a part of the public API can lead to unexpected usages of context by customers and might
impede future refactoring. To allow customers use context while encapsulating our internals correctly, the developer
should export a provider and hook.

**❌ Don't**

```ts
// src/context.ts
import * as React from 'react';
export const MyContext = React.createContext();

// src/index.ts
export { MyContext } from './context';
```

**✅ Do**

```ts
// src/context.ts
import * as React from 'react';
const MyContext = React.createContext();
export const MyContextProvider = MyContext.Provider;
export const useMyContext = () => React.useContext(MyContext);

// src/index.ts
export { MyContextProvider, useMyContext } from './context';
```

### `ban-imports`

Ban importing or re-exporting from certain paths or modules. You can either ban the entire path, or only certain names. (Inspired by TSLint's [`import-blacklist`](https://palantir.github.io/tslint/rules/import-blacklist/).)

Requires one or more options objects. Either `path` or `pathRegex` is required.

- `path` (`string`): Path or module to ban importing from (non-regex)
- `pathRegex` (`string`): Regex for path or module to ban importing from
- `names` (`(string | { regex: string })[]`, optional): If provided, only ban imports of these names and/or regular expressions. Otherwise, ban all imports from the path.
- `message` (`string[]`, optional): Custom message to show with errors

Example:

```
"@fluentui/ban-imports": [
  "error",
  { "path": "lodash" },
  { "path": "foo", "names": ["bar", { "regex": "^baz" }] },
  { "pathRegex": "^\.", message: "no relative imports" },
  { "pathRegex": "^\.\./(foo|bar)$", "names": ["baz"] }
]
```

### `deprecated-keyboard-event-props`

Prevent using deprecated `KeyboardEvent` props `which` and `keyCode`, and recommend using `@fluentui/keyboard-key` instead.

### `max-len`

Enforces max line length, more performantly than [ESLint's `max-len`](https://eslint.org/docs/rules/max-len).

This rule is significantly faster than the default `max-len` rule because it **does not** support:

- Expanding tabs (only handles spaces for indentation)
- Multi-byte unicode characters (they will be counted as multiple characters)
- Extra options for handling comments, strings, or URLs

(Skipping these extra features lets us do a basic string length check before running any regular expressions or other extra logic, which makes the huge majority of line length checks very fast.)

#### Options

The rule requires an options object containing:

- `max` (required): the maximum line length
- `ignorePatterns` (optional): ignore the line if it matches any of these regular expressions

### `no-global-react`

Ban references to the `React` global namespace (in favor of explicitly importing React). Implicit global references cause problems for API Extractor and potentially other tools.

### `no-restricted-imports`

Prevents imports from `forbidden` packages. If a corresponding `preferred` import is provided, the lint error will be automatically fixable.

**Example Configuration:**

```
"@fluentui/no-restricted-imports": [
  'error',
  {
    paths: [
      {
        forbidden: ['@fluentui/react-theme', '@griffel/react`],
        preferred: '@fluentui/react-components',
      },
    ],
  },
  ],
```

**❌ Don't**

```ts
import * as React from 'react';
import { webDarkTheme } from '@fluentui/react-theme';
import { makeStyles } from '@griffel/react';
```

**✅ Do**

```ts
import * as React from 'react';
import { makeStyles, webDarkTheme } from '@fluentui/react-components';
```

### `no-tslint-comments`

Ban `tslint:disable` and `tslint:enable` comments.

### `no-visibility-modifiers`

Prevent visibility modifiers (`public`, `protected`, `private`) from being specified on class members/methods.

Used in Fluent UI only by [`@fluentui/react-northstar`](https://aka.ms/fluent-ui), not `@fluentui/react`.

### `no-context-default-value`

Restricts usage of default values on React context creation. Imports should be provided to declare where the `createContext` function is coming from. For more information why this is necessary please consult [#23624](https://github.com/microsoft/fluentui/issues/23624)

**Example Configuration:**

```
"@fluentui/no-context-default-value": [
  "error",
  {
    imports: ["react", "@fluentui/react-context-selector"]
  }
]
```

**❌ Don't**

```ts
import * as React from 'react';
const context = React.createContext({ someValue: undefined });
```

**✅ Do**

```ts
import * as React from 'react';
const context = React.createContext(undefined);
```

### `ban-instanceof-html-element`

Bans usage of `instanceof HTMLElement` binary expressions as they might cause problems on [multiple realms](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms) environments.

The alternative is to use `isHTMLElement` helper method provided by `@fluentui/react-utilities` packages, since that method does the proper verifications to ensure proper instance comparison.

**❌ Don't**

```ts
event.target instanceof HTMLElement;

event.target instanceof HTMLInputElement;
```

**✅ Do**

```ts
import { isHTMLElement } from '@fluentui/react-components';

isHTMLElement(event.target);

isHTMLElement(event.target, { constructorName: 'HTMLInputElement' });
```

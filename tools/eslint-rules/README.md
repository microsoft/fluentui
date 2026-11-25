# eslint-rules

Set of internal workspace eslint rules.

> _NOTE:_
>
> Under the hood this leverages nx workspace lint rule registration which happens within `@nx/eslint-plugin` registration.
> With that said to be able to use these rules `@nx` eslint plugin needs to be registered within our eslint config chain ( plugins setup )

## Usage:

Let's say we implement custom lint rule named `uppercase-const`.

Following rule declaration will enable it for particular lint config:

```js
// @filename <project-root>/eslint.config.js
// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  // or 'flat/react-legacy', 'flat/node', etc.
  ...fluentPlugin.configs['flat/core'],
  {
    rules: {
      // pattern: <@nx/workspace>-<custom-rule-name>
      '@nx/workspace-uppercase-const': 'error',
    },
  },
];
```

## Adding new rule:

```sh
npx nx g @fluentui/workspace-plugin:eslint-rule
```

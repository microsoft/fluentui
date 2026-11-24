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

## Component style-hook signatures

The internal v9 React config enables `@nx/workspace-style-hook-signature` for exported
`use<Component>Styles` and `use<Component>Styles_unstable` hooks in that component's
`src/components/` directory, including nested components and export aliases.
Every public call signature must accept required component state and return a
bidirectionally assignable state type. TypeScript aliases and constrained,
state-preserving generics are supported; `any`, `unknown`, `never` and `void` are not.
Additional parameters are allowed.

The state check uses the current `ComponentState` element-to-slot map, validating
its entries against `React.ElementType` and supporting rootless components with
optional slots. Nested generic constraints are respected. Slotless states must
match the sibling `render<Component>_unstable` state parameter. Slotted-state and
component-map unions are validated member by member, preserving each state's slot
mapping. The check must be updated when the deprecated `components` field is
removed. Matching is structural, not nominal,
and does not prove that the hook returns the same runtime object. The rule requires
TypeScript parser services and does not rewrite hook bodies.

The internal config works from both the repository root and individual project
directories. Export-all component barrels are checked alongside named exports.

Griffel `makeStyles`/`makeResetStyles` hooks, shared helpers, provider custom-style
callbacks, tests, stories and v8 are outside this contract. The six calendar-compat
`useCalendar{,Day,DayGrid,Month,Picker,Year}Styles_unstable` hooks are explicitly
excluded because they generate class maps from style props, not component state.
The Griffel exclusion follows immutable local aliases and transparent expression
wrappers, but not mutable aliases, factory wrappers or calls to generated hooks.

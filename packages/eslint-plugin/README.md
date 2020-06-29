# @fluentui/eslint-plugin

**ESLint configuration and custom rules for Fluent UI**

## Configs

Usage: in your [ESLint config file](https://eslint.org/docs/user-guide/configuring), add `{ "extends": ["plugin:@fluentui/<name>"] }` or `{ "extends": ["plugin:@fluentui/eslint-plugin/<name>"] }` (the two are equivalent).

- `react`: For `@fluentui/react` (`office-ui-fabric-react`) and related packages
  - `react--legacy`: Like `react` but requiring an `I` prefix for interfaces
  - `node`: Like `react` but for packages which run in a Node environment (not the browser)
  - `node--legacy`: Like `node` but requiring an `I` prefix for interfaces
- `react-northstar`: For `@fluentui/react-northstar` and related packages

Helpers for customizing configuration are exported under a `configHelpers` object.

## Rules

### `ban-imports`

Ban importing from certain paths or modules. You can either ban the entire path, or only certain names. (Inspired by TSLint's [`import-blacklist`](https://palantir.github.io/tslint/rules/import-blacklist/).)

Requires one or more options objects. Either `path` or `pathRegex` is required.

- `path` (`string`): Path or module to ban importing from (non-regex)
- `pathRegex` (`string`): Regex for path or module to ban importing from
- `names` (`string[]`, optional): If provided, only ban imports of these names. Otherwise, ban all imports from the path.
- `message` (`string[]`, optional): Custom message to show with errors

Example:

```
"@fluentui/ban-imports": [
  "error",
  { "path": "lodash" },
  { "path": "foo", "names": ["bar", "baz"] },
  { "pathRegex": "^\.", message: "no relative imports" },
  { "pathRegex": "^\.\./(foo|bar)$", "names": ["baz"] }
]
```

### `deprecated-keyboard-event-props`

Prevent using deprecated `KeyboardEvent` props `which` and `keyCode`, and recommend using `@fluentui/keyboard-key` instead.

### `no-visibility-modifiers`

Prevent visibility modifiers (`public`, `protected`, `private`) from being specified on class members/methods.

Used in Fluent UI only by [`@fluentui/react-northstar`](https://aka.ms/fluent-ui), not `@fluentui/react`.

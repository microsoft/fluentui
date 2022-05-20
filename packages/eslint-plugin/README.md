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

### `no-tslint-comments`

Ban `tslint:disable` and `tslint:enable` comments.

### `no-visibility-modifiers`

Prevent visibility modifiers (`public`, `protected`, `private`) from being specified on class members/methods.

Used in Fluent UI only by [`@fluentui/react-northstar`](https://aka.ms/fluent-ui), not `@fluentui/react`.

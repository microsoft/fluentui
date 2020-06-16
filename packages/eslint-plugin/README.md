# @fluentui/eslint-plugin

**ESLint configuration and custom rules for Fluent UI**

## Configs

Usage: `{ "extends": ["plugin:@fluentui/<name>"] }` or `{ "extends": ["plugin:@fluentui/eslint-plugin/<name>"] }`

- `react`: For `@fluentui/react` (`office-ui-fabric-react`) and related packages
  - `react--legacy`: Like `react` but requiring an `I` prefix for interfaces
  - `node`: Like `react` but for packages which run in a Node environment (not the browser)
  - `node--legacy`: Like `node` but requiring an `I` prefix for interfaces
- `react-northstar`: For `@fluentui/react-northstar` and related packages

Helpers for customizing configuration are exported under a `configHelpers` object.

## Rules

### `deprecated-keyboard-event-props`

Prevent using deprecated `KeyboardEvent` props `which` and `keyCode`, and recommend using `@fluentui/keyboard-key` instead.

### `no-visibility-modifiers`

Prevent visibility modifiers (`public`, `protected`, `private`) from being specified on class members/methods.

Used in Fluent UI only by [`@fluentui/react-northstar`](https://aka.ms/fluent-ui), not `@fluentui/react`.

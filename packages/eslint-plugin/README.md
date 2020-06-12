# @fluentui/eslint-plugin

**Custom ESLint rules for Fluent UI**

## Rules

### `deprecated-keyboard-event-props`

Prevent using deprecated `KeyboardEvent` props `which` and `keyCode`, and recommend using `@fluentui/keyboard-key` instead.

### `no-visibility-modifiers`

Prevent visibility modifiers (`public`, `protected`, `private`) from being specified on class members/methods.

Used in Fluent UI only by [`@fluentui/react-northstar`](https://aka.ms/fluent-ui), not `@fluentui/react`.

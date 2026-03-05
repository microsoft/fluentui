# Checkbox Migration

Fluent UI Northstar (v0) provides the `Checkbox` control to make a choice between two mutually exclusive options. Fluent UI v9 provides a `Checkbox` control, but has a different API.

The main difference between v0 and v9 `Checkbox` is that v9 offers a circular variant and does not provide a toggle prop.

## Examples

### Basic Migration

Basic usage of `Checkbox` v0

An equivalent `Checkbox` in v9 is

## Prop Mapping

This table maps `Checkbox` v0 props to the `Checkbox` v9 equivalent.

| v0               | v9               | Notes                                                       |
| ---------------- | ---------------- | ----------------------------------------------------------- |
| `accessibility`  | n/a              |                                                             |
| `as`             | n/a              |                                                             |
| `checked`        | `checked`        | Mutually exclusive with `defaultChecked`                    |
| `className`      | `className`      |                                                             |
| `defaultChecked` | `defaultChecked` | Mutually exclusive with `checked`                           |
| `design`         | n/a              |                                                             |
| `disabled`       | `disabled`       |                                                             |
| `indicator`      | `indicator`      |                                                             |
| `key`            | `key`            | v9 uses the intrinsic React prop                            |
| `label`          | `label`          |                                                             |
| `labelPosition`  | `labelPosition`  |                                                             |
| `onChange`       | `onChange`       |                                                             |
| `onClick`        | `onClick`        |                                                             |
| `ref`            | `ref`            |                                                             |
| `styles`         | `className`      |                                                             |
| `toggle`         | n/a              | Refer to the `Switch` component in `@fluentui/react-switch` |
| `variables`      | n/a              | Use `FluentProvider` to customize themes                    |

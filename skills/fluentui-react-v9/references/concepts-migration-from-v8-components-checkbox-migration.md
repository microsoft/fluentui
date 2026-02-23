# Checkbox Migration

Fluent UI v8 provides the `Checkbox` control to give people a way to select one or more items from a group, or switch between two mutually exclusive options. Fluent UI v9 provides a `Checkbox` control, but has a different API.

The main difference between v8 and v9 `Checkbox` is that v9 offers a circular variant. v9 handles checked and indeterminate differently from v8, v9 combines both into the `checked` and `defaultChecked` props.

Fluent UI v9 also provide the `CheckboxShim` as a bridge component of v8 and v9, which means you can keeps the v8 props and get a v9 `Checkbox` rendered in your UI.  
** Note **: `CheckboxShim` is not a part of the `@fluentui/react-component` package, it is a part of the `@fluentui/react-migration-v8-v9s` package. It's consideral to use `CheckboxShim` only for temperary migration purpose, and use `Checkbox` directly for new development.

## Examples

### Basic Migration

Basic usage of `Checkbox` v8

An equivalent `Checkbox` in v9 is

Usage of `CheckboxShim` in migration v8 to v9 is

## Prop Mapping

This table maps `Checkbox` v8 props to the `Checkbox` v9 equivalent and `CheckboxShim`.

| v8                     | v9                 | shim              | Notes                                    |
| ---------------------- | ------------------ | ----------------- | ---------------------------------------- |
| `ariaDescribedBy`      | `aria-describedby` | `ariaDescribedBy` |                                          |
| `ariaLabel`            | `aria-label`       | `ariaLabel`       |                                          |
| `ariaLabelledBy`       | `aria-labelledby`  | `ariaLabelledBy`  |                                          |
| `ariaPositionInSet`    | `aria-posinset`    | `aria-posinset`   |                                          |
| `ariaSetSize`          | `aria-setsize`     | `aria-setsize`    |                                          |
| `boxSide`              | `labelPosition`    | n/a               |                                          |
| `checked`              | `checked`          | `checked`         | Mutually exclusive with `defaultChecked` |
| `checkmarkIconProps`   | `indicator`        | n/a               |                                          |
| `className`            | `className`        | `className`       |                                          |
| `componentRef`         | `ref`              | `componentRef`    |                                          |
| `defaultChecked`       | `defaultChecked`   | `defaultChecked`  | Mutually exclusive with `checked`        |
| `defaultIndeterminate` | `defaultChecked`   | n/a               |                                          |
| `disabled`             | `disabled`         | `disabled`        |                                          |
| `id`                   | `id`               | `id`              |                                          |
| `indeterminate`        | `checked`          | n/a               |                                          |
| `inputProps`           | n/a                | n/a               | Props go directly to the `input` slot    |
| `label`                | `label`            | `label`           |                                          |
| `name`                 | `name`             | `name`            |                                          |
| `onChange`             | `onChange`         | `onChange`        |                                          |
| `onRenderLabel`        | n/a                | `onRenderLabel`   |                                          |
| `required`             | `required`         | `required`        |                                          |
| `styles`               | `className`        | `className`       |                                          |
| `theme`                | n/a                | `theme`           | Use `FluentProvider` to customize themes |
| `title`                | n/a                | `title`           |                                          |

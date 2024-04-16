# Checkbox Migration

## Migration from v0

- `Checkbox`
  - `checked` => `checked`.
  - `defaultChecked` => `defaultChecked`.
  - `disabled` => Use native `disabled`.
  - `indicator` => `indicator`.
  - `label` => `label`.
  - `labelPosition` => `labelPosition`.
  - `onChange` => `onChange`.
  - `onClick` => Consider using `onChange`.
  - `toggle` => Toggle checkbox is not supported in vNext.

## Migration from v8

- `Checkbox`
  - `boxSide` => `labelPosition`.
  - `checked`, `indeterminate` => `checked`.
  - `checkmarkIconProps` => `indicator`.
  - `componentRef` => Not supported.
  - `defaultChecked`, `defaultIndeterminate` => `defaultChecked`.
  - `disabled` => Use native `disabled`.
  - `id` => Use native `id`.
  - `label` => `label`.
  - `name` => Not supported.
  - `onChange` => `onChange`.
  - `onRenderLabel` => Use `label` slot.
  - `required` => Use native `required`.
  - `title` => Use native `title`.

## Property Mapping

| v8 `Checkbox`        | v0 `Checkbox`    | v9 `Checkbox`    |
| -------------------- | ---------------- | ---------------- |
| `boxSide`            | `labelPosition`  | `labelPosition`  |
| `checked`            | `checked`        | `checked`        |
| `checkmarkIconProps` | `indicator`      | `indicator`      |
| `componentRef`       |                  |                  |
| `defaultChecked`     | `defaultChecked` | `defaultChecked` |
| `disabled`           | `disabled`       | `disabled`       |
| `id`                 |                  | `id`             |
| `label`              | `label`          | `label`          |
| `name`               |                  |                  |
| `onChange`           | `onChange`       | `onChange`       |
|                      | `onClick`        | `onChange`       |
| `onRenderLabel`      |                  | `label`          |
| `required`           |                  | `required`       |
| `title`              |                  | `title`          |
|                      | `toggle`         |                  |

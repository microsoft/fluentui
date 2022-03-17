# Switch Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8's Toggle

### Props that remain as is

- `checked`
- `defaultChecked`

### Props that have the same name but have a different implementation

- `as` - Uses new pattern for `as` introduced in v9
- `label` - Now implemented as a v9 slot
- `onChange` - Has a slightly different API with our new event data handling pattern

### Props removed because we can get them from HTML props

- `ariaLabel` => Getting it as `aria-label` instead
- `disabled`
- `role`

### Props no longer supported with an equivalent funtionality in v9's Switch

- `as`
- `componentRef` => Use regular `ref` instead
- `inlineLabel` => Use `labelPosition` instead
- `styles` => Use new styling system via `tokens` instead

### Props no longer supported without an equivalent functionality in v9's Switch

- `offText`
- `onText`
- `theme`

## Migration from v0's Checkbox

### Props that remain as is

- `checked`
- `defaultChecked`
- `labelPosition`

### Props that have the same name but have a different implementation

- `as` - Uses new pattern for `as` introduced in v9
- `indicator` => Now implemented as a v9 slot
- `label` - Now implemented as a v9 slot
- `onChange` - Has a slightly different API with our new event data handling pattern

### Props removed because we can get them from HTML props

- `className`
- `disabled`
- `onClick`

### Props no longer supported with an equivalent functionality in v9's Switch

- `accessibility` => Override accessibility behavior by composing the `Switch` however you want
- `styles` => Use new styling system via `tokens` instead
- `toggle` => Default behavior for `Switch` in v9
- `variables` => Use new styling system via `tokens` instead

### Props no longer supported without an equivalent functionality in v9's Switch

- `design`

## Propery mapping

| v8 `Toggle`      | v0 `Checkbox`   | v9 `Switch`      |
| ---------------- | --------------- | ---------------- |
|                  | `accessibility` |                  |
| `arialabel`      | `aria-label`    | `aria-label`     |
| `as`             | `as`            | `as`             |
| `checked`        | `checked`       | `checked`        |
| `className`      | `className`     | `className`      |
| `componentRef`   |                 | `ref`            |
| `defaultChecked` |                 |                  |
|                  | `design`        |                  |
| `disabled`       | `disabled`      | `disabled`       |
|                  | `indicator`     | `indicator`      |
| `inlineLabel`    | `labelPosition` | `labelPosition`  |
| `label`          | `label`         | `label`          |
| `offText`        |                 |                  |
| `onChange`       | `onChange`      | `onChange`       |
| `onClick`        | `onClick`       | `onClick`        |
| `onText`         |                 |                  |
| `role`           |                 | `role`           |
| `styles`         | `styles`        |                  |
| `theme`          |                 |                  |
| Default behavior | `toggle`        | Default behavior |
|                  | `variables`     |                  |

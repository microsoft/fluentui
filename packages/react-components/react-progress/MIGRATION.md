# Progress Migration

## Migration from v8

v8 offers a component equivalent to v9's `Progress`. However, the API is slightly different. The main difference is that v9's `Progress` does not have the `label` or `description` props. Instead, the `label` and `hint` are located in the `ProgressField` that can be used in conjunction with `Progress`.

Here's how the API of v8's `Progress` compares to the one from v9's `Progress` component:

- `className` => `className`
- `description` => Use `ProgressField` to use the `hint` prop
- `label` => Use `ProgressField` to use the `label` prop
- `onRenderProgress` => NOT SUPPORTED
- `percentComplete` => Use the `value` prop
- `progressHidden` => NOT SUPPORTED
- `styles` => Use style customization through `className` instead

## Property Mapping

| v8 `ProgressIndicator` | v9 `Progress`             |
| ---------------------- | ------------------------- |
| `barHeight`            | `thickness`               |
| `className`            | `className`               |
| `componentRef`         | `ref`                     |
| `description`          | use `ProgressField` hint  |
| `label`                | use `ProgressField` label |
| `percentComplete`      | `value`                   |

# ProgressBar Migration

## Migration from v8

v8 offers a component equivalent to v9's `ProgressBar`. However, the API is slightly different. The main difference is that v9's `ProgressBar` does not have the `label` or `description` props. Instead, the `label` and `hint` are located in the `ProgressField` that can be used in conjunction with `ProgressBar`.

Here's how the API of v8's `ProgressIndicator` compares to the one from v9's `ProgressBar` component:

- `className` => `className`
- `description` => Use `ProgressField` to use the `hint` prop
- `label` => Use `ProgressField` to use the `label` prop
- `onRenderProgress` => NOT SUPPORTED
- `percentComplete` => Use the `value` prop
- `progressHidden` => NOT SUPPORTED
- `styles` => Use style customization through `className` instead

## Property Mapping

| v8 `ProgressIndicator` | v9 `ProgressBar`          |
| ---------------------- | ------------------------- |
| `barHeight`            | `thickness`               |
| `className`            | `className`               |
| `componentRef`         | `ref`                     |
| `description`          | use `ProgressField` hint  |
| `label`                | use `ProgressField` label |
| `percentComplete`      | `value`                   |

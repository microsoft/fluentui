# Label Migration

## Migration from v8

- `Label`
  - `componentRef` => Not supported. Consider using `ref` instead.
  - `disabled` => `disabled`.
  - `required` => `required`.

## Migration from v0

The v9 API does not support many of the features offered in v0. Some could potentially be addressed by using the already existing slots or by adding either the additional features or more slots if needed.

- `Label`
  - `circular` => Not supported. Consider using `Badge` component.
  - `color` => Not supported. Consider using `Badge` component.
  - `content` => The child of `Label`.
  - `design` => Not applicable.
  - `fluid` => Not supported. Use CSS styling such as flex-grow.
  - `icon`, `iconPosition` => Not supported. Consider using `Badge` component or add as a child.
  - `image`, `imagePosition` => Not supported. Add as a child.

## Property mapping

| v8 `Label`     | v0 `Label`      | v9 `Label` |
| -------------- | --------------- | ---------- |
| `children`     | `content`       | `children` |
|                | `circular`      |            |
|                | `color`         |            |
| `componentRef` | `ref`           | `ref`      |
|                | `design`        |            |
| `disabled`     |                 | `disabled` |
|                | `fluid`         |            |
|                | `icon`          |            |
|                | `iconPosition`  |            |
|                | `image`         |            |
|                | `imagePosition` |            |
| `required`     |                 | `required` |

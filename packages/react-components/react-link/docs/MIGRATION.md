# Link Migration

## Migration from v8

The existing `Link` control supports a very similar set of props to the one being proposed with a few differences that are outlined below:

- `componentRef` => NOT SUPPORTED - use regular `ref` instead.
- `styles` => NOT SUPPORTED - use new styling system via `tokens` instead.
- `theme` => NOT SUPPORTED
- `underline` => `inline`

## Migration from v0

v0 does not currently export a `Link` component.

## Property mapping

| v8 `Link`      | v9 `Link`  |
| -------------- | ---------- |
| `componentRef` | -          |
| `disabled`     | `disabled` |
| `href`         | `href`     |
| `onClick`      | `onClick`  |
| `rel`          | `rel`      |
| `styles`       | -          |
| `target`       | `target`   |
| `theme`        | -          |
| `type`         | `type`     |
| `underline`    | `inline`   |

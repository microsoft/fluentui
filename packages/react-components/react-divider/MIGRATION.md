# Divider Migration

## Migration from v8

The existing v8's `Separator` control supports a very similar set of props to the one being proposed for v9's `Divider` with a few differences that are outlined below:

- `alignContent` => `alignContent`
- `content` => NOT SUPPORTED - use `children` instead
- `styles` => NOT SUPPORTED - use new styling system via `tokens` instead
- `theme` => NOT SUPPORTED
- `vertical` => `vertical`

## Migration from v0

The existing v0's `Divider` control supports a very similar set of props to the one being proposed for v9 with a few differences that are outlined below:

- `content` => NOT SUPPORTED - use `children` instead
- `fitted` => NOT SUPPORTED - use style customizations via `className` instead
- `important` => NOT SUPPORTED
- `vertical` => `vertical`

## Property mapping

| v8 `Separator` | v0 `Divider` | v9 `Divider`   |
| -------------- | ------------ | -------------- |
| `alignContent` | -            | `alignContent` |
| -              | -            | `appearance`   |
| -              | `color`      |                |
| `content`      | `content`    | `children`     |
| -              | `fitted`     |                |
| -              | `important`  |                |
| -              | -            | `inset`        |
| -              | `size`       |                |
| `styles`       | -            |                |
| `theme`        | -            |                |
| `vertical`     | `vertical`   | `vertical`     |

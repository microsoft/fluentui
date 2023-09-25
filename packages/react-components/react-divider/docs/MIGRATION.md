# Divider Migration

## Migration from v8

The v8 `Separator` control supports a very similar set of props to the v9 `Divider` with a few differences that are outlined below:

- `styles` => NOT SUPPORTED - use `makeStyles` to create styles and apply them with the `className` prop.
- `theme` => NOT SUPPORTED - use `FluentProvider`

## Migration from v0

The v0 `Divider` control supports a very similar set of props to the v9 `Divider` with a few differences that are outlined below:

- `content` => `children` of the `Divider`
- `fitted` => NOT SUPPORTED - use style customizations via `className` instead
- `important` => NOT SUPPORTED

## Property mapping

| v8 `Separator` | v0 `Divider` | v9 `Divider`   |
| -------------- | ------------ | -------------- |
| `alignContent` | -            | `alignContent` |
| -              | -            | `appearance`   |
| -              | `color`      |                |
| `children`     | `content`    | `children`     |
| -              | `fitted`     |                |
| -              | `important`  |                |
| -              | -            | `inset`        |
| -              | `size`       |                |
| `styles`       | -            |                |
| `theme`        | -            |                |
| `vertical`     | `vertical`   | `vertical`     |

# Slider Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

The existing `Slider` control supports a very similar set of props to the one being proposed with a few differences that are outlined below:

- `componentRef` => NOT SUPPORTED - use regular `ref` instead.
- `styles` => NOT SUPPORTED - use new styling system via `tokens` instead.
- `theme` => NOT SUPPORTED
- `underline` => `inline`

## Migration from v0

## Property mapping

### v8

| v8 `Link`         | Converged `Link` |
| ----------------- | ---------------- |
| originFromZero    | origin           |
| ariaLabel         | -                |
| valueLabel        | -                |
| defaultLowerValue | -                |
| lowerValue        | -                |
| showValue         | -                |
| onChanged         | -                |
| snapToStep        | -                |
| buttonProps       | -                |
| valueFormat       | -                |
| ranged            | -                |
| label             | -                |

### v0

| v0 `Link`                   | Converged `Link` |
| --------------------------- | ---------------- |
| inputRef                    | -                |
| getA11yValueMessageOnChange | -                |
| fluid                       | -                |
| label                       | -                |

# Slider Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

- `componentRef` => NOT SUPPORTED - use regular `ref` instead.
- `styles` => NOT SUPPORTED - use new styling system via `tokens` instead.
- `theme` => NOT SUPPORTED
- `originFromZero` => `origin` - allows for custom origin values other than zero.
- `ariaLabel` => NOT SUPPORTED
- `valueLabel` => NOT SUPPORTED
- `defaultLowerValue` => NOT SUPPORTED
- `lowerValue` => NOT SUPPORTED
- `showValue` => NOT SUPPORTED
- `onChanged` => NOT SUPPORTED
- `snapToStep` => NOT SUPPORTED - the slider no longer snaps.
- `buttonProps` => NOT SUPPORTED
- `valueFormat` => NOT SUPPORTED
- `ranged` => NOT SUPPORTED
- `label` => NOT SUPPORTED

## Migration from v0

- `inputRef` => NOT SUPPORTED
- `getA11yValueMessageOnChange` => NOT SUPPORTED
- `fluid` => NOT SUPPORTED - Use CSS styling such as flex-grow.
- `label` => NOT SUPPORTED

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

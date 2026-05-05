# SpinButton Migration

Both Fluent UI v8 and v9 provide `SpinButton` controls. The controls are largely similar and this guide provides some examples of how to migrate areas that differ.

## Examples

### Basic Migration

Basic usage of `SpinButton` v8 looks like

An equivalent `SpinButton` v9 usage is

### Custom Suffixes Migration

Basic usage of `SpinButton` v8 custom suffixes looks like

`SpinButton` v9 introduces a new prop called `displayValue` that may be used in conjunction with `value` to display a formatted value in `SpinButton`. To display a value with a custom suffix (or prefix or an entirely different name) just provide the `displayValue` prop to your `SpinButton`:

## Prop Mapping

This table maps v8 `SpinButton` props to the v9 `SpinButton` equivalent.

| v8                  | v9                    | Notes                                                                                                    |
| ------------------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| `componentRef`      | `ref`                 | v9 provides access to the underlyig DOM node, not ISpinButton                                            |
| `defaultValue`      | `defaultValue`        | v9 uses `number` rather than `string` for the type of this prop. Mutually exclusive with `value`.        |
| `value`             | `value`               | v9 uses `number` rather than `string` for the type of this prop. Mutually exclusive with `defaultValue`. |
| `min`               | `min`                 |                                                                                                          |
| `max`               | `max`                 |                                                                                                          |
| `step`              | `step`                |                                                                                                          |
| `precision`         | `precision`           |                                                                                                          |
| `onChange`          | `onChange`            | Typescript types have changed                                                                            |
| `onValidate`        | n/a                   |                                                                                                          |
| `onIncrement`       | `onChange`            | See example above                                                                                        |
| `onDecrement`       | `onChange`            | See example above                                                                                        |
| `label`             | Use `Label` component | Be sure to associate `Label` with `SpinButton` via `htmlFor`                                             |
| `labelPosition`     | Use `Label` component |                                                                                                          |
| `ariaLabel`         | `aria-label`          |                                                                                                          |
| `ariaDescribedBy`   | `aria-describedby`    |                                                                                                          |
| `ariaPositionInSet` | `aria-posinset`       | You probably don't need this for `SpinButton`                                                            |
| `ariaSetSize`       | `aria-setsize`        | You probably don't need this for `SpinButton`                                                            |
| `ariaValueNow`      | n/a                   | Set internally by `SpinButton`                                                                           |
| `ariaValueText`     | `aria-valuetext`      | Set internally by `SpinButton` but can be overridden by setting this prop                                |
| `iconProps`         | Use `Icon` component  |                                                                                                          |

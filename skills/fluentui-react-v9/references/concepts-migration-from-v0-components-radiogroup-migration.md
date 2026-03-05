# RadioGroup Migration

Fluent UI Northstar (v0) provides the `RadioGroup` control for presenting a list of radio options. Fluent UI v9 also provides a `RadioGroup` control but with a different API.

While there are several differences between these controls, the primary change is that `RadioGroup` v9 accepts its options as child `Radio` components while `RadioGroup` v0 accepts options via its `items` prop.

## Examples

### Basic Migration

Basic usage of `RadioGroup` v0 looks like

An equivalent `RadioGroup` v9 usage is

## Prop Mapping

This table maps `RadioGroup` v0 props to the `RadioGroup` v9 equivalent.

| v0                     | v9             | Notes                                           |
| ---------------------- | -------------- | ----------------------------------------------- |
| `accessibility`        | n/a            |                                                 |
| `as`                   | n/a            |                                                 |
| `checkedValue`         | `value`        | Mutually exclusive with `defaultValue`          |
| `className`            | `className`    |                                                 |
| `defaultCheckedValue`  | `defaultValue` | Mutually exclusive with `value`                 |
| `design`               | n/a            |                                                 |
| `items`                | `children`     | v9 uses React `children` rather than data props |
| `key`                  | `key`          | v9 uses the intrinsic React prop                |
| `onCheckedValueChange` | `onChange`     |                                                 |
| `ref`                  | `ref`          |                                                 |
| `styles`               | `className`    |                                                 |
| `variables`            | n/a            | Use `FluentProvider` to customize themes        |
| `vertical`             | `layout`       |                                                 |

This table maps v0 `RadioGroupItem` props to the v9 `Radio` equivalent.

| v0                 | v9               | Notes                                                                                                                               |
| ------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `accessibility`    | n/a              |                                                                                                                                     |
| `as`               | n/a              |                                                                                                                                     |
| `checked`          | `checked`        |                                                                                                                                     |
| `checkedIndicator` | `indicator`      | Use slots to customize `Radio`                                                                                                      |
| `className`        | `className`      |                                                                                                                                     |
| `defaultChecked`   | `defaultChecked` |                                                                                                                                     |
| `design`           | n/a              |                                                                                                                                     |
| `disabled`         | `disabled`       |                                                                                                                                     |
| `indicator`        | `indicator`      | Use slots to customize `Radio`                                                                                                      |
| `key`              | `key`            | v9 uses the intrinsic React prop                                                                                                    |
| `label`            | `label`          | In v9 this is a slot so this prop can be a string, a component or a shorthand object                                                |
| `name`             | `name`           | When used inside `RadioGroup` this is assigned via the `name` prop on `RadioGroup` or given a default value when not assigned there |
| `onChange`         | `onChange`       |                                                                                                                                     |
| `ref`              | `ref`            |                                                                                                                                     |
| `shouldFocus`      | n/a              |                                                                                                                                     |
| `styles`           | `className`      |                                                                                                                                     |
| `value`            | n/a              |                                                                                                                                     |
| `variables`        | n/a              | Use `FluentProvider` to customized themes                                                                                           |
| `vertical`         | n/a              | `labelPosition` can be used to change the location of the label text                                                                |

# Input Migration

Fluent UI Northstar (v0) provides the `Input` control to elicit input from users. Fluent UI v9 also provides an `Input` control but with a different API and feature set.

## Examples

### Basic Migration

Basic usage of `Input` v0 looks like

An equivalent `Input` v9 usage is

## Prop Mapping

This table maps v0 `Input` props to the v9 `Input` equivalent.

| v0                     | v9                                          | Notes                                                                                                       |
| ---------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `accessibility`        | n/a                                         |                                                                                                             |
| `as`                   | n/a                                         |                                                                                                             |
| `className`            | `className`                                 |                                                                                                             |
| `clearable`            | n/a                                         | Use `contentBefore` or `contentAfter` slots to add a `Button` to implement this behavior                    |
| `defaultValue`         | `defaultValue`                              | Mutually exclusive with `value`                                                                             |
| `design`               | n/a                                         |                                                                                                             |
| `error`                | n/a                                         | v9 `Input` does not handle error states                                                                     |
| `errorIndicator`       | n/a                                         | Use `contentBefore` or `contentAfter` slots to insert custom indicators                                     |
| `fluid`                | n/a                                         |                                                                                                             |
| `icon`                 | Use `contentBefore` or `contentAfter` slots |                                                                                                             |
| `iconPosition`         | n/a                                         |                                                                                                             |
| `inline`               | n/a                                         |                                                                                                             |
| `input`                | `input`                                     | This is a slot                                                                                              |
| `inputRef`             | Pass a `ref` to the `input` slot            |                                                                                                             |
| `inverted`             | `appearance`                                |                                                                                                             |
| `label`                | Use `Label` component                       | Be sure to associate `Label` with `Input` via `htmlFor`                                                     |
| `labelPosition`        | n/a                                         |                                                                                                             |
| `onChange`             | `onChange`                                  |                                                                                                             |
| `required`             | `required`                                  | This is the native HTML prop                                                                                |
| `showSuccessIndicator` | n/a                                         | Use `contentBefore` or `contentAfter` slots to insert custom indicators                                     |
| `type`                 | `type`                                      | Non text types like 'button' and 'checkbox' are not supported. Use `Button` or `Checkbox` component instead |
| `value`                | `value`                                     | Mutually exclusive with `defaultValue`                                                                      |
| `variables`            | n/a                                         | Use `FluentProvider` to customize themes                                                                    |
| `wrapper`              | `root`                                      | This is a slot                                                                                              |

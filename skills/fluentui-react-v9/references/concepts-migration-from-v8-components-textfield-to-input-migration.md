# TextField to Input Migration

Fluent UI v8 provides the `TextField` control for entering and editing text. In Fluent UI v9 `TextField` is replaced with `Input` for single line input. For multiline input, use `Textarea`.

While basic usage is largely the same, `Input` omits some features found in `TextField`, preferring to compose several components together for greater flexibility.

## Examples

### Basic Migration

Basic usage of `TextField` looks like

An equivalent `Input` usage is:

## Prop Mapping

This table maps v8 `TextField` props to the v9 `Input` equivalent.

| v8                         | v9                                         | Notes                                                                                |
| -------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| `componentRef`             | `ref`                                      | v9 provides access to the underlyig DOM node, not ITextField                         |
| `elementRef`               | `ref`                                      |                                                                                      |
| `multiline`                | n/a                                        | Use `Textarea`                                                                       |
| `resizable`                | n/a                                        |                                                                                      |
| `autoAjustHeight`          | n/a                                        | See `Textarea` docs                                                                  |
| `underlined`               | `appearance`                               |                                                                                      |
| `borderless`               | `appearance`                               |                                                                                      |
| `label`                    | Use `Label` component                      | Be sure to associate `Label` with `Input` via `htmlFor`                              |
| `onRenderLabel`            | n/a                                        | Use slots to customize `Input`                                                       |
| `description`              | n/a                                        | Use another element like `Text` and associate it with `Input` via `aria-describedby` |
| `onRenderDescription`      | n/a                                        |                                                                                      |
| `onRenderInput`            | n/a                                        | Use slots to customize `Input`                                                       |
| `prefix`                   | `contentBefore`                            | This is a slot not a `string`                                                        |
| `suffix`                   | `contentAfter`                             | This is a slot not a `string`                                                        |
| `onRenderPrefix`           | n/a                                        | Use slots to customize `Input`                                                       |
| `onRenderSuffix`           | n/a                                        | Use slots to customize `Input`                                                       |
| `iconProps`                | Use `contentBefore` or `contentAfter` slot |                                                                                      |
| `defaultValue`             | `defaultValue`                             | Mutually exclusive with `value`                                                      |
| `value`                    | `value`                                    | Mutually exclusive with `defaultValue`                                               |
| `disabled`                 | `disabled`                                 |                                                                                      |
| `readOnly`                 | `readOnly`                                 | In v9 this is the native HTML prop                                                   |
| `invalid`                  | n/a                                        | v9 `Input` does not handle validation states                                         |
| `errorMessage`             | n/a                                        | Use another element like `Text` and associate it with `Input` via `aria-describedby` |
| `onChange`                 | `onChange`                                 | Typescript types have changed                                                        |
| `onNotifyValidationResult` | n/a                                        | v9 `Input` does not handle validation                                                |
| `onGetErrorMessage`        | n/a                                        | v9 `Input` does not handle error states                                              |
| `deferredValidationTime`   | n/a                                        | v9 `Input` does not handle validation                                                |
| `className`                | `className`                                |                                                                                      |
| `inputClassName`           | Use `input` slot                           |                                                                                      |
| `ariaLabel`                | `aria-label`                               |                                                                                      |
| `validateOnFocusIn`        | n/a                                        | v9 `Input` does not handle validation                                                |
| `validateOnFocusOut`       | n/a                                        | v9 `Input` does not handle validation                                                |
| `validateOnLoad`           | n/a                                        | v9 `Input` does not handle validation                                                |
| `theme`                    | n/a                                        | Use `FluentProvider` to customize themes                                             |
| `styles`                   | `className`                                |                                                                                      |
| `autoComplete`             | `autoComplete`                             | In v9 this is the native HTML prop                                                   |
| `canRevealPassword`        | n/a                                        | v9 `Input` does not provide built in password reveal behavior                        |
| `revealPasswordAriaLabel`  | n/a                                        | v9 `Input` does not provide built in password reveal behavior                        |

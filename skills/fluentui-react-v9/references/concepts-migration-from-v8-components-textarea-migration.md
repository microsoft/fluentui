# Textarea Migration

Fluent UI v8 provides the `TextField` control to allow users to enter and edit text. Fluent UI v9 provides a `Textarea` control, but has a different API.

v9 takes a different approach than v8 with respect to text inputs, and instead of using a single `TextField` component instaed uses separate `Input` and `Textarea` components. v9's `Input` in this case is equivalent to the general v8's `TextField`, while v9's `Textarea` is equivalent to v8's `TextField` with the `multiline` prop set to `true`.

## Examples

### Basic Migration

Basic usage of `TextField` v8

An equivalent `Textarea` in v9 is

## Props Mapping

This table maps `TextField` v8 props to the `Textarea` v9 equivalent.

| v0                         | v9             | Notes                                                                     |
| -------------------------- | -------------- | ------------------------------------------------------------------------- |
| `ariaLabel`                | aria-label     |                                                                           |
| `autoAdjustHeight`         | n/a            | Auto-resize will be added in the future. See spec for more information    |
| `className`                | `className`    | To use a custom className for the container use as follows: ``            |
| `autoComplete`             | `autoComplete` |                                                                           |
| `borderless`               | `appearance`   | Equivalent `appearance` could be either `filledLighter` or `filledDarker` |
| `canRevealPassword`        | n/a            |                                                                           |
| `className`                | `className`    |                                                                           |
| `componentRef`             | ref            |                                                                           |
| `defaultValue`             | `defaultValue` | Mutually exclusive with `value`                                           |
| `deferredValidationTime`   | n/a            |                                                                           |
| `description`              | n/a            |                                                                           |
| `disabled`                 | `disabled`     |                                                                           |
| `errorMessage`             | n/a            |                                                                           |
| `iconProps`                | n/a            |                                                                           |
| `inputClassName`           | `className`    |                                                                           |
| `invalid`                  | n/a            |                                                                           |
| `label`                    | n/a            | To add a label, use the `Label` component                                 |
| `multiline`                | n/a            | `Textarea` is multiline by default                                        |
| `onChange`                 | `onChange`     |                                                                           |
| `onGetErrorMessage`        | n/a            |                                                                           |
| `onNotifyValidationResult` | n/a            |                                                                           |
| `onRenderDescription`      | n/a            |                                                                           |
| `onRenderInput`            | n/a            |                                                                           |
| `onRenderLabel`            | n/a            |                                                                           |
| `onRenderPrefix`           | n/a            |                                                                           |
| `onRenderSuffix`           | n/a            |                                                                           |
| `prefix`                   | n/a            |                                                                           |
| `readOnly`                 | `readonly`     | This is handled by native component                                       |
| `resizable`                | `resize`       |                                                                           |
| `revealPasswordAriaLabel`  | n/a            |                                                                           |
| `styles`                   | `className`    |                                                                           |
| `suffix`                   | n/a            |                                                                           |
| `theme`                    | n/a            | use `FluentProvider` to customize themes                                  |
| `underlined`               | n/a            |                                                                           |
| `validateOnFocusIn`        | n/a            |                                                                           |
| `validateOnFocusOut`       | n/a            |                                                                           |
| `validateOnLoad`           | n/a            |                                                                           |
| `value`                    | `value`        | Mutually exclusive with `defaultValue`                                    |

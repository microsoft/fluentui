# Textarea Migration

v8's `TextField` with `multiline` → v9's `Textarea`. For single-line input see [input.md](input.md).

Wrap `Textarea` in `<Field>` to get a label, validation message, and required indicator (v8's `label` / `errorMessage` / `required` props are removed from the control itself).

## Prop Mapping

| v8                                               | v9             | Notes                                                              |
| ------------------------------------------------ | -------------- | ------------------------------------------------------------------ |
| `ariaLabel`                                      | `aria-label`   | Native HTML                                                        |
| `autoAdjustHeight`                               | —              | Not yet supported                                                  |
| `autoComplete`                                   | `autoComplete` |                                                                    |
| `borderless`                                     | `appearance`   | `"filled-lighter"` or `"filled-darker"`                            |
| `className`                                      | `className`    | Applies to `<textarea>`; for the container use the `textarea` slot |
| `componentRef`                                   | `ref`          |                                                                    |
| `defaultValue`                                   | `defaultValue` | Mutually exclusive with `value`                                    |
| `disabled`                                       | `disabled`     |                                                                    |
| `label`                                          | —              | Use `<Field label="...">` wrapper                                  |
| `errorMessage`                                   | —              | Use `<Field validationState="error" validationMessage="...">`      |
| `required`                                       | —              | Use `<Field required>`                                             |
| `description`                                    | —              | Use `<Field hint="...">`                                           |
| `multiline`                                      | —              | `Textarea` is multiline by default                                 |
| `onChange`                                       | `onChange`     | TypeScript types changed                                           |
| `readOnly`                                       | `readOnly`     | Native HTML prop (lowercase in v9)                                 |
| `resizable`                                      | `resize`       | `"none"` \| `"horizontal"` \| `"vertical"` \| `"both"`             |
| `styles`                                         | `className`    |                                                                    |
| `theme`                                          | —              | Use `FluentProvider`                                               |
| `underlined`                                     | —              | Not supported                                                      |
| `value`                                          | `value`        | Mutually exclusive with `defaultValue`                             |
| `iconProps`                                      | —              | Not supported on Textarea                                          |
| `prefix` / `suffix`                              | —              | Not supported on Textarea                                          |
| `inputClassName`                                 | `className`    | The class applies to `<textarea>` directly                         |
| `invalid` / `errorMessage` / `onGetErrorMessage` | —              | Use `<Field>` for validation                                       |

## Before / After

```tsx
// v8
import { TextField } from '@fluentui/react';
<TextField
  label="Comments"
  multiline
  required
  errorMessage={error}
  value={value}
  onChange={(_, v) => setValue(v ?? '')}
/>;

// v9
import { Field, Textarea } from '@fluentui/react-components';
<Field label="Comments" required validationState={error ? 'error' : 'none'} validationMessage={error}>
  <Textarea value={value} onChange={(_, data) => setValue(data.value)} resize="vertical" />
</Field>;
```

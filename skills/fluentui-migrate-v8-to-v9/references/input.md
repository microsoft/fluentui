# Input / Textarea Migration

## Overview

| v8                        | v9         | When                             |
| ------------------------- | ---------- | -------------------------------- |
| `TextField` (single-line) | `Input`    | Default                          |
| `TextField multiline`     | `Textarea` | When `multiline` prop is present |

## Before / After Examples

### Basic TextField → Input (preferred: Field wrapper)

```tsx
// v8
import { TextField } from '@fluentui/react';
<TextField label="Email" required errorMessage="Required" />;
```

```tsx
// v9 — preferred: use Field to wrap Input (handles label, required, validation automatically)
import { Field, Input } from '@fluentui/react-components';

<Field label="Email" required validationState="error" validationMessage="Required">
  <Input />
</Field>;
```

```tsx
// v9 — alternative: manual wiring with useId
import { Input, Label, Text, useId } from '@fluentui/react-components';

const emailId = useId('email');
const errorId = useId('email-error');

<div>
  <Label htmlFor={emailId} required>
    Email
  </Label>
  <Input id={emailId} required aria-invalid aria-describedby={errorId} />
  <Text id={errorId}>Required</Text>
</div>;
```

### Multiline TextField → Textarea

```tsx
// v8
<TextField multiline rows={4} label="Description" />;

// v9
import { Field, Textarea } from '@fluentui/react-components';

<Field label="Description">
  <Textarea rows={4} />
</Field>;
```

### Prefix / Suffix

```tsx
// v8
<TextField prefix="https://" suffix=".com" />;

// v9
import { Input } from '@fluentui/react-components';
<Input contentBefore="https://" contentAfter=".com" />;
// Note: contentBefore/contentAfter accept ReactNode (slot), not just strings
```

### Underlined / Borderless appearance

```tsx
// v8
<TextField underlined />
<TextField borderless />

// v9
<Input appearance="underline" />
<Input appearance="filled-lighter" />
```

## Prop Mapping

| v8 `TextField`             | v9 `Input`                               | Notes                                                      |
| -------------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| `componentRef`             | `ref`                                    | Returns DOM node, not ITextField                           |
| `elementRef`               | `ref`                                    |                                                            |
| `multiline`                | —                                        | Use `Textarea` instead                                     |
| `resizable`                | —                                        | Textarea only                                              |
| `autoAdjustHeight`         | —                                        | See Textarea docs                                          |
| `underlined`               | `appearance="underline"`                 |                                                            |
| `borderless`               | `appearance="filled-lighter"`            |                                                            |
| `label`                    | `<Field label="...">` wrapping `<Input>` | Preferred; or manual `<Label>` + `useId`                   |
| `required`                 | `required` on `<Field>`                  | Field propagates to input via context                      |
| `onRenderLabel`            | —                                        | Use slots                                                  |
| `description`              | `hint` slot on `<Field>`                 | `<Field hint="...">`                                       |
| `onRenderDescription`      | —                                        |                                                            |
| `onRenderInput`            | —                                        | Use slots                                                  |
| `prefix`                   | `contentBefore` slot                     | Accepts ReactNode                                          |
| `suffix`                   | `contentAfter` slot                      | Accepts ReactNode                                          |
| `iconProps`                | `contentBefore` or `contentAfter` slot   |                                                            |
| `defaultValue`             | `defaultValue`                           | Mutually exclusive with `value`                            |
| `value`                    | `value`                                  | Mutually exclusive with `defaultValue`                     |
| `disabled`                 | `disabled`                               |                                                            |
| `readOnly`                 | `readOnly`                               | Native HTML prop                                           |
| `invalid`                  | `validationState="error"` on `<Field>`   | Use `Field` wrapper; or `aria-invalid` on `Input` directly |
| `errorMessage`             | `validationMessage` on `<Field>`         | `<Field validationState="error" validationMessage="...">`  |
| `onChange`                 | `onChange`                               | TypeScript types changed                                   |
| `onNotifyValidationResult` | —                                        |                                                            |
| `onGetErrorMessage`        | —                                        |                                                            |
| `deferredValidationTime`   | —                                        |                                                            |
| `className`                | `className`                              |                                                            |
| `inputClassName`           | `input` slot                             |                                                            |
| `ariaLabel`                | `aria-label`                             |                                                            |
| `validateOnFocusIn`        | —                                        |                                                            |
| `validateOnFocusOut`       | —                                        |                                                            |
| `validateOnLoad`           | —                                        |                                                            |
| `theme`                    | —                                        | Use `FluentProvider`                                       |
| `styles`                   | `className` + `makeStyles`               |                                                            |
| `autoComplete`             | `autoComplete`                           | Native HTML prop                                           |
| `canRevealPassword`        | —                                        | Not built-in                                               |
| `revealPasswordAriaLabel`  | —                                        | Not built-in                                               |

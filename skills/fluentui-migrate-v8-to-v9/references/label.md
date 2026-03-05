# Label Migration

v9 `Label` is a near drop-in replacement. The main addition is support for a **custom required indicator** (pass a custom element to `required` instead of just `true`).

## Prop Mapping

| v8             | v9          | Notes                                              |
| -------------- | ----------- | -------------------------------------------------- |
| `componentRef` | `ref`       |                                                    |
| `disabled`     | `disabled`  |                                                    |
| `required`     | `required`  | v9 also accepts a ReactNode for a custom indicator |
| `styles`       | `className` |                                                    |
| `theme`        | —           | Use `FluentProvider`                               |
| `as`           | —           | Not supported in v9                                |

## Before / After

### Before

```tsx
import { Label } from '@fluentui/react';
<Label required>Email</Label>;
```

### After

```tsx
import { Label } from '@fluentui/react-components';
<Label required>Email</Label>;
// Custom required indicator:
<Label required={<span aria-hidden> *</span>}>Email</Label>;
```

## Usage with Form Controls

In v9, prefer wrapping form controls with `<Field>` rather than using a standalone `<Label>`:

```tsx
import { Field, Input } from '@fluentui/react-components';
<Field label="Email" required validationState="error" validationMessage="Required">
  <Input />
</Field>;
```

`Field` wires up `htmlFor` / `aria-describedby` automatically. Use a standalone `Label` only when you need fine-grained control over placement.

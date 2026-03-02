# Checkbox Migration

## Key Changes

- `indeterminate={true}` → `checked="mixed"`
- `defaultIndeterminate` → `defaultChecked="mixed"`
- `boxSide` → `labelPosition`
- `checkmarkIconProps` → `indicator` slot
- `componentRef` → `ref`

## Before / After Examples

### Basic Migration

```tsx
// v8
import { Checkbox } from '@fluentui/react';

<Checkbox checked label="Checked" />
<Checkbox disabled label="Disabled" />
<Checkbox indeterminate={true} label="Indeterminate" />
```

```tsx
// v9
import { Checkbox } from '@fluentui/react-components';

<Checkbox checked label="Checked" />
<Checkbox disabled label="Disabled" />
<Checkbox checked="mixed" label="Mixed" />
```

### Controlled Indeterminate

```tsx
// v8
const [checked, setChecked] = React.useState(false);
const [indeterminate, setIndeterminate] = React.useState(true);

<Checkbox
  indeterminate={indeterminate}
  checked={checked}
  onChange={(_, data) => {
    setIndeterminate(false);
    setChecked(data.checked);
  }}
/>;

// v9
const [checked, setChecked] = React.useState<boolean | 'mixed'>('mixed');

<Checkbox checked={checked} onChange={(_, data) => setChecked(data.checked)} />;
```

### Label Position

```tsx
// v8 — boxSide: 'end' puts the checkbox on the right
<Checkbox label="Label on left" boxSide="end" />

// v9 — labelPosition: 'before' puts label on the left (checkbox on right)
<Checkbox label="Label on left" labelPosition="before" />
```

### Circular Variant (new in v9)

```tsx
<Checkbox shape="circular" label="Circular checkbox" />
```

## CheckboxShim (Interim Bridge)

`CheckboxShim` accepts v8 props and renders a v9 `Checkbox`. Use only for temporary migration — migrate to `Checkbox` directly for new code.

```tsx
import { CheckboxShim as Checkbox } from '@fluentui/react-migration-v8-v9';

// Keep using v8 props:
<Checkbox indeterminate={true} label="Still using v8 API" />;
```

## Prop Mapping

| v8                     | v9                       | CheckboxShim      | Notes                                           |
| ---------------------- | ------------------------ | ----------------- | ----------------------------------------------- |
| `componentRef`         | `ref`                    | `componentRef`    |                                                 |
| `checked`              | `checked`                | `checked`         | Mutually exclusive with `defaultChecked`        |
| `defaultChecked`       | `defaultChecked`         | `defaultChecked`  | Mutually exclusive with `checked`               |
| `indeterminate`        | `checked="mixed"`        | `indeterminate`   | v9 merges indeterminate into `checked`          |
| `defaultIndeterminate` | `defaultChecked="mixed"` | —                 |                                                 |
| `label`                | `label`                  | `label`           | Slot — accepts string or JSX                    |
| `boxSide`              | `labelPosition`          | —                 | `'end'` → `'before'` (label before = box after) |
| `checkmarkIconProps`   | `indicator` slot         | —                 |                                                 |
| `disabled`             | `disabled`               | `disabled`        |                                                 |
| `required`             | `required`               | `required`        |                                                 |
| `onChange`             | `onChange`               | `onChange`        | TypeScript types changed                        |
| `className`            | `className`              | `className`       |                                                 |
| `ariaLabel`            | `aria-label`             | `ariaLabel`       |                                                 |
| `ariaLabelledBy`       | `aria-labelledby`        | `ariaLabelledBy`  |                                                 |
| `ariaDescribedBy`      | `aria-describedby`       | `ariaDescribedBy` |                                                 |
| `id`                   | `id`                     | `id`              |                                                 |
| `name`                 | `name`                   | `name`            |                                                 |
| `inputProps`           | —                        | —                 | Pass props directly to the `input` slot         |
| `onRenderLabel`        | —                        | `onRenderLabel`   | Use `label` slot in v9                          |
| `styles`               | `className`              | `className`       |                                                 |
| `theme`                | —                        | `theme`           | Use `FluentProvider`                            |

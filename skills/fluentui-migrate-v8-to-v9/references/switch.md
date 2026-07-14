# Toggle → Switch Migration

`Toggle` (v8) → `Switch` (v9). The name change is the biggest difference; the core API is similar.

## Key Differences

- `onText` / `offText` removed — use a dynamic `label` instead
- `onChange` signature changed: `(ev, checked?) => void` → `(ev: ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => void`
- `inlineLabel` removed — use `labelPosition="before"` or `"after"` (default)
- `label` is now a **slot** (accepts `string` or shorthand object)

## Prop Mapping

| v8 `IToggleProps` | v9 `SwitchProps` | Notes                                                      |
| ----------------- | ---------------- | ---------------------------------------------------------- |
| `checked`         | `checked`        |                                                            |
| `defaultChecked`  | `defaultChecked` |                                                            |
| `label`           | `label` slot     | Now a slot — accepts string or shorthand                   |
| `onText`          | —                | Removed; use dynamic `label` or text next to the component |
| `offText`         | —                | Removed; use dynamic `label`                               |
| `inlineLabel`     | `labelPosition`  | `true` → `"before"`, default is `"after"`                  |
| `onChange`        | `onChange`       | Type changed: `(ev, data: { checked: boolean }) => void`   |
| `disabled`        | `disabled`       |                                                            |
| `componentRef`    | `ref`            |                                                            |
| `styles`          | `className`      | Use `makeStyles`                                           |
| `theme`           | —                | Use `FluentProvider`                                       |

## Before / After

### Before

```tsx
import { Toggle } from '@fluentui/react';
const [on, setOn] = React.useState(false);

<Toggle label="Wi-Fi" onText="On" offText="Off" checked={on} onChange={(_, checked) => setOn(checked ?? false)} />;
```

### After

```tsx
import { Switch } from '@fluentui/react-components';
const [on, setOn] = React.useState(false);

<Switch label={on ? 'Wi-Fi On' : 'Wi-Fi Off'} checked={on} onChange={(_, data) => setOn(data.checked)} />;
```

## Label Position

```tsx
// v9 — label before the thumb (equivalent to v8 inlineLabel)
<Switch label="Dark mode" labelPosition="before" checked={checked} onChange={...} />;
```

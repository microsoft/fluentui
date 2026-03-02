# Slider Migration

## Key Changes

- `label` prop removed → wrap in `<Field label="...">` (same pattern as SpinButton, Input)
- `onChange` signature changed: `(event, value: number)` → `(event, data: { value: number })`
- `showValue` removed — no built-in value display; render the value in JSX manually
- `originFromZero` removed — no v9 equivalent
- `snapToStep` removed — v9 always snaps to `step` increments automatically
- `size` prop added: `"small"` | `"medium"` (new in v9)

## Before / After Examples

### Basic Migration

```tsx
// v8
import { Slider } from '@fluentui/react';

<Slider label="Volume" min={0} max={100} defaultValue={20} />;
```

```tsx
// v9 — wrap in Field for label
import { Field, Slider } from '@fluentui/react-components';

<Field label="Volume">
  <Slider min={0} max={100} defaultValue={20} />
</Field>;
```

### Controlled

```tsx
// v8
const [value, setValue] = React.useState(20);

<Slider label="Volume" min={0} max={100} value={value} onChange={(_, newValue) => setValue(newValue)} />;
```

```tsx
// v9
import { Field, Slider } from '@fluentui/react-components';
import type { SliderOnChangeData } from '@fluentui/react-components';

const [value, setValue] = React.useState(20);

const onChange = (_: React.ChangeEvent<HTMLInputElement>, data: SliderOnChangeData) => {
  setValue(data.value);
};

<Field label="Volume">
  <Slider min={0} max={100} value={value} onChange={onChange} />
</Field>;
```

### Displaying the Current Value

v8 had a `showValue` prop. In v9, render the value yourself:

```tsx
// v8
<Slider label="Volume" showValue value={value} min={0} max={100} />;

// v9 — embed value in the label slot
import { Field, Slider } from '@fluentui/react-components';

const [value, setValue] = React.useState(20);

<Field label={`Volume: ${value}`}>
  <Slider min={0} max={100} value={value} onChange={(_, data) => setValue(data.value)} />
</Field>;
```

### With Step

```tsx
// v8 — snapToStep was a separate optional prop
<Slider min={0} max={100} step={10} snapToStep />

// v9 — always snaps to step (snapToStep removed)
<Slider min={0} max={100} step={10} />
```

### Vertical Slider

```tsx
// v8
<Slider vertical label="Height" min={0} max={100} />;

// v9 — same prop
import { Field, Slider } from '@fluentui/react-components';

<Field label="Height">
  <Slider vertical min={0} max={100} />
</Field>;
```

## Prop Mapping

| v8 `ISliderProps` | v9 `SliderProps`           | Notes                                                        |
| ----------------- | -------------------------- | ------------------------------------------------------------ |
| `componentRef`    | `ref`                      |                                                              |
| `value`           | `value`                    | Mutually exclusive with `defaultValue`                       |
| `defaultValue`    | `defaultValue`             | Mutually exclusive with `value`                              |
| `min`             | `min`                      |                                                              |
| `max`             | `max`                      |                                                              |
| `step`            | `step`                     |                                                              |
| `vertical`        | `vertical`                 |                                                              |
| `disabled`        | `disabled`                 |                                                              |
| `label`           | `<Field label="...">`      | Preferred; or `<Label htmlFor={id}>` + `useId`               |
| `showValue`       | —                          | Removed; render value in JSX (e.g. in `<Field label={...}>`) |
| `valueFormat`     | —                          | Removed; format the value in JSX manually                    |
| `snapToStep`      | —                          | Removed; v9 always snaps to `step`                           |
| `originFromZero`  | —                          | Removed; no v9 equivalent                                    |
| `onChange`        | `onChange`                 | `(event, data) => void` where `data.value` is `number`       |
| `ariaLabel`       | `aria-label`               | Native HTML prop                                             |
| `ariaValueText`   | `aria-valuetext`           | Native HTML prop                                             |
| `className`       | `className`                |                                                              |
| `styles`          | `className` + `makeStyles` |                                                              |
| `theme`           | —                          | Use `FluentProvider`                                         |
| —                 | `size`                     | New: `"small"` \| `"medium"` (default)                       |

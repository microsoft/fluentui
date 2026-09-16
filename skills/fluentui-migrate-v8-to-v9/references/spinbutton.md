# SpinButton Migration

## Key Changes

- `label` prop removed → preferred: wrap in `<Field label="...">`, or manual `<Label htmlFor={id}>` with `useId`
- `value` / `defaultValue` type changed: `string` → `number`
- `onIncrement` / `onDecrement` / `onValidate` removed → use `onChange` with `data.value` / `data.displayValue`
- New `displayValue` prop for formatted display (e.g., with units)

## Before / After Examples

### Basic Migration

```tsx
// v8
import { SpinButton } from '@fluentui/react';

const [value, setValue] = React.useState('5');

<SpinButton
  label="Quantity"
  value={value}
  onChange={(_, newValue) => newValue !== undefined && setValue(newValue)}
  incrementButtonAriaLabel="Increment"
  decrementButtonAriaLabel="Decrement"
  styles={{ spinButtonWrapper: { width: 300 } }}
/>;
```

```tsx
// v9 — preferred: Field wrapper handles label wiring automatically
import { Field, SpinButton } from '@fluentui/react-components';
import type { SpinButtonChangeEvent, SpinButtonOnChangeData } from '@fluentui/react-components';

const [value, setValue] = React.useState(5); // number, not string

const onChange = (e: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
  if (data.value !== undefined) {
    setValue(data.value); // stepped via buttons/hotkeys
  } else if (data.displayValue !== undefined) {
    const n = Number(data.displayValue);
    if (!isNaN(n)) setValue(n); // typed manually
  }
};

<Field label="Quantity">
  <SpinButton value={value} min={0} max={100} onChange={onChange} />
</Field>;
```

```tsx
// v9 — alternative: manual label wiring with useId + makeStyles for sizing
import { makeStyles, Label, SpinButton, useId } from '@fluentui/react-components';
import type { SpinButtonChangeEvent, SpinButtonOnChangeData } from '@fluentui/react-components';

const useStyles = makeStyles({
  layout: { display: 'flex', flexDirection: 'column', maxWidth: '300px' },
});

const spinButtonId = useId('spinbutton');
const s = useStyles();
const [value, setValue] = React.useState(5);

<div className={s.layout}>
  <Label htmlFor={spinButtonId}>Quantity</Label>
  <SpinButton id={spinButtonId} value={value} min={0} max={100} onChange={onChange} />
</div>;
```

### Custom Suffix (onIncrement/onDecrement → displayValue)

```tsx
// v8 — separate onIncrement / onDecrement / onValidate callbacks
<SpinButton
  defaultValue="7 cm"
  onIncrement={value => String(Math.min(getNum(value) + 2, 100)) + ' cm'}
  onDecrement={value => String(Math.max(getNum(value) - 2, 0)) + ' cm'}
  onValidate={value => String(clamp(getNum(value))) + ' cm'}
/>
```

```tsx
// v9 — use displayValue prop + handle data.displayValue in onChange
const [value, setValue] = React.useState(7);
const [displayValue, setDisplayValue] = React.useState('7 cm');

const onChange = (e: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
  if (data.value !== undefined) {
    setValue(data.value);
    setDisplayValue(`${data.value} cm`);
  } else if (data.displayValue !== undefined) {
    const n = getNumericPart(data.displayValue);
    if (n !== undefined) {
      setValue(n);
      setDisplayValue(`${n} cm`);
    }
  }
};

<SpinButton
  id={spinButtonId}
  value={value}
  displayValue={displayValue}
  step={2}
  min={0}
  max={100}
  onChange={onChange}
/>;
```

## Prop Mapping

| v8 `ISpinButtonProps`      | v9 `SpinButtonProps`     | Notes                                                                                                          |
| -------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `componentRef`             | `ref`                    |                                                                                                                |
| `value`                    | `value`                  | Type changed `string` → `number`; mutually exclusive with `defaultValue`                                       |
| `defaultValue`             | `defaultValue`           | Type changed `string` → `number`; mutually exclusive with `value`                                              |
| `min`                      | `min`                    |                                                                                                                |
| `max`                      | `max`                    |                                                                                                                |
| `step`                     | `step`                   |                                                                                                                |
| `precision`                | `precision`              |                                                                                                                |
| `onChange`                 | `onChange`               | TypeScript types changed; now receives `(e, data)` with `data.value` (number) and `data.displayValue` (string) |
| `onIncrement`              | `onChange`               | Handle `data.value` in `onChange`                                                                              |
| `onDecrement`              | `onChange`               | Handle `data.value` in `onChange`                                                                              |
| `onValidate`               | —                        | Removed; validate in `onChange`                                                                                |
| `label`                    | `<Field label="...">`    | Preferred; or manual `<Label htmlFor={useId()}>` + `id`                                                        |
| `labelPosition`            | `orientation` on `Field` | `"horizontal"` for side-by-side                                                                                |
| `ariaLabel`                | `aria-label`             |                                                                                                                |
| `ariaDescribedBy`          | `aria-describedby`       |                                                                                                                |
| `ariaValueText`            | `aria-valuetext`         | Set internally by SpinButton; can be overridden                                                                |
| `iconProps`                | —                        | Use `<Icon>` component separately                                                                              |
| `incrementButtonAriaLabel` | —                        | Set internally; use `aria-label` if needed                                                                     |
| `decrementButtonAriaLabel` | —                        | Set internally; use `aria-label` if needed                                                                     |
| `className`                | `className`              |                                                                                                                |
| `styles`                   | `className`              |                                                                                                                |
| `theme`                    | —                        | Use `FluentProvider`                                                                                           |
| —                          | `displayValue`           | New in v9 — formatted display string (separate from `value`)                                                   |

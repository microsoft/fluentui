# ChoiceGroup → RadioGroup Migration

## Architecture Change

In v8, `ChoiceGroup` accepts options via an `options` array prop.
In v9, `RadioGroup` accepts `Radio` elements as JSX children.

The `label` prop is removed. Two options:

- **Preferred:** wrap `RadioGroup` in `<Field label="...">` — Field renders the label and wires accessibility via context.
- **Alternative:** separate `<Label id={labelId}>` + `aria-labelledby={labelId}` on `RadioGroup`.

## Before / After Examples

### Basic Migration

```tsx
// v8
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';

const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C', disabled: true },
];

<ChoiceGroup defaultSelectedKey="B" options={options} label="Pick one" required />;
```

```tsx
// v9 — preferred: Field wrapper
import { Field, Radio, RadioGroup } from '@fluentui/react-components';

<Field label="Pick one" required>
  <RadioGroup defaultValue="B">
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" disabled />
  </RadioGroup>
</Field>;
```

```tsx
// v9 — alternative: manual label wiring
import { Label, Radio, RadioGroup, useId } from '@fluentui/react-components';

const labelId = useId('label');

<>
  <Label id={labelId} required>
    Pick one
  </Label>
  <RadioGroup aria-labelledby={labelId} defaultValue="B">
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" disabled />
  </RadioGroup>
</>;
```

### Controlled (selectedKey → value)

**Before:**

```tsx
const [selected, setSelected] = React.useState('A');
<ChoiceGroup selectedKey={selected} options={options} onChange={(_, option) => option && setSelected(option.key)} />;
```

**After:**

```tsx
const [selected, setSelected] = React.useState('A');
<RadioGroup value={selected} onChange={(_, data) => setSelected(data.value)}>
  <Radio value="A" label="Option A" />
  <Radio value="B" label="Option B" />
</RadioGroup>;
```

### Custom Option Rendering

v9 accepts direct JSX instead of `onRenderField` callbacks:

**Before:**

```tsx
{ key: 'A', text: 'With icon', onRenderField: (props, render) => (
  <div style={{ display: 'flex', gap: 5 }}>
    {render!(props)}
    <CatIcon />
  </div>
)}
```

**After:**

```tsx
import { AnimalCat24Regular } from '@fluentui/react-icons';

<Radio
  value="A"
  label={{
    children: (
      <>
        <AnimalCat24Regular /> With icon
      </>
    ),
  }}
/>;
```

## ChoiceGroup → RadioGroup Prop Mapping

| v8 `IChoiceGroupProps` | v9 `RadioGroupProps`    | Notes                                       |
| ---------------------- | ----------------------- | ------------------------------------------- |
| `componentRef`         | `ref`                   |                                             |
| `options`              | `children`              | Use `<Radio>` children instead of array     |
| `defaultSelectedKey`   | `defaultValue`          | Mutually exclusive with `value`             |
| `selectedKey`          | `value`                 | Mutually exclusive with `defaultValue`      |
| `onChange`             | `onChange`              | TypeScript types changed                    |
| `label`                | `<Field label="...">`   | Preferred; or `<Label>` + `aria-labelledby` |
| `ariaLabelledBy`       | `aria-labelledby`       | Native HTML prop in v9                      |
| `required`             | `required` on `<Field>` | Or on `<Label>` when using manual wiring    |
| `styles`               | `className`             |                                             |
| `theme`                | —                       | Use `FluentProvider`                        |

## IChoiceGroupOption → Radio Prop Mapping

| v8 `IChoiceGroupOption` | v9 `RadioProps` | Notes                                             |
| ----------------------- | --------------- | ------------------------------------------------- |
| `key`                   | `key`           | Only needed when `.map()`-ing an array            |
| `text`                  | `label`         | Slot — accepts string, JSX, or shorthand object   |
| `disabled`              | `disabled`      |                                                   |
| `ariaLabel`             | `aria-label`    | Native HTML prop                                  |
| `onRenderField`         | —               | Provide custom JSX child to `RadioGroup` instead  |
| `onRenderLabel`         | `label` slot    | Pass custom component to `label` slot             |
| `iconProps`             | —               | Use slots to customize `Radio`                    |
| `imageSrc`              | —               | Use slots to customize `Radio`                    |
| `styles`                | `className`     |                                                   |
| `theme`                 | —               | Use `FluentProvider`                              |
| `checked`               | `checked`       | Prefer `value` on `RadioGroup` for controlled use |
| `onChange`              | `onChange`      | TypeScript types changed                          |
| `name`                  | `name`          | Inherited from `RadioGroup` by default            |
| `required`              | `required`      |                                                   |

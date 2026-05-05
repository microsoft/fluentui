# Components/Checkbox

## Props

| Name             | Type                                                                                                                                                     | Required                                                        | Default | Description                                                                                                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | -------------- | ----------------- | --- | --- | --------------------- |
| `root`           | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null>`                                                          | No      |                                                                                                                                                                                                                                         | The root element of the Checkbox. The root slot receives the `className` and `style` specified directly on the `<Checkbox>`. All other native props will be applied to the primary slot: `input` |
| `input`          | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                          | No                                                              |         | Hidden input that handles the checkbox's functionality. This is the PRIMARY slot: all native properties specified directly on `<Checkbox>` will be applied to this slot, except `className` and `style`, which remain on the root slot. |
| `label`          | `WithSlotShorthandValue<Omit<ComponentProps<LabelSlots>, "required"> & { disabled?: boolean; required?: boolean                                          | WithSlotShorthandValue<{ as?: "span"; } & Omit<...> & { ...; }> | null    | undefined; size?: "small"                                                                                                                                                                                                               | ... 2 more ...                                                                                                                                                                                   | undefined; weight?: "regular"                                    | ... 1 more ... | undefined; } ...` | No  |     | The Checkbox's label. |
| `as`             | `"input"`                                                                                                                                                | No                                                              |         |                                                                                                                                                                                                                                         |
| `indicator`      | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>                | ({ ...; } & ... 1 more ... & { ...; })                          | null`   | No                                                                                                                                                                                                                                      |                                                                                                                                                                                                  | The checkbox, with the checkmark icon as its child when checked. |
| `checked`        | `boolean                                                                                                                                                 | "mixed"`                                                        | No      | false                                                                                                                                                                                                                                   | The controlled value for the checkbox.                                                                                                                                                           |
| `defaultChecked` | `boolean                                                                                                                                                 | "mixed"`                                                        | No      |                                                                                                                                                                                                                                         | Whether the checkbox should be rendered as checked by default.                                                                                                                                   |
| `labelPosition`  | `"before" "after"`                                                                                                                                       | No                                                              | after   | The position of the label relative to the checkbox indicator.                                                                                                                                                                           |
| `onChange`       | `((ev: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => void)`                                                                              | No                                                              |         | Callback to be called when the checked state value changes.                                                                                                                                                                             |
| `shape`          | `"circular" "square"`                                                                                                                                    | No                                                              | square  | The shape of the checkbox indicator. The `circular` variant is only recommended to be used in a tasks-style UI (checklist), since it otherwise could be confused for a `RadioItem`.                                                     |
| `size`           | `"medium" "large"`                                                                                                                                       | No                                                              | medium  | The size of the checkbox indicator.                                                                                                                                                                                                     |
| `ref`            | `Ref<HTMLInputElement>`                                                                                                                                  | No                                                              |         |                                                                                                                                                                                                                                         |

## Examples

### Checked

A checkbox can be initially checked using `defaultChecked`, or controlled via the `checked` property.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';
import type { CheckboxProps } from '@fluentui/react-components';

export const Checked = (): JSXElement => {
  const [checked, setChecked] = React.useState<CheckboxProps['checked']>(true);

  return <Checkbox checked={checked} onChange={(ev, data) => setChecked(data.checked)} label="Checked" />;
};
```

### Circular

A checkbox can have a circular shape.<br />**Usage warning**: Unless you are designing a tasks experience, we strongly discourage using this styling variant, as it can be confused with `RadioItem`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const Circular = (): JSXElement => <Checkbox shape="circular" label="Circular" />;
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';
import type { CheckboxProps } from '@fluentui/react-components';

export const Default = (props: CheckboxProps): JSXElement => <Checkbox {...props} />;
```

### Disabled

A checkbox can be disabled.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
  <>
    <Checkbox disabled label="Disabled" />
    <Checkbox disabled label="Disabled checked" checked />
    <Checkbox disabled label="Disabled mixed" checked="mixed" />
  </>
);
```

### Label Before

The label can be placed before the checkbox.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const LabelBefore = (): JSXElement => <Checkbox labelPosition="before" label="Label before" />;
```

### Label Wrapping

The label will wrap if it is wider than the available space. The checkbox indicator will stay aligned to the first line of text.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const LabelWrapping = (): JSXElement => (
  <Checkbox
    style={{ maxWidth: '400px' }}
    label="Here is an example of a checkbox with a long label and it starts to wrap to a second line"
  />
);
```

### Large

A checkbox can be large in size.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const Large = (): JSXElement => <Checkbox size="large" label="Large" />;
```

### Mixed

A checkbox can be initially mixed (also known as indeterminate) using `defaultChecked="mixed"`, or controlled via `checked="mixed"`.<br />In this example, the mixed state is used when a group of options has differing values.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const Mixed = (): JSXElement => {
  const [option1, setOption1] = React.useState(false);
  const [option2, setOption2] = React.useState(true);
  const [option3, setOption3] = React.useState(false);

  return (
    <>
      <Checkbox
        checked={option1 && option2 && option3 ? true : !(option1 || option2 || option3) ? false : 'mixed'}
        onChange={(_ev, data) => {
          setOption1(!!data.checked);
          setOption2(!!data.checked);
          setOption3(!!data.checked);
        }}
        label="All options"
      />

      <Checkbox checked={option1} onChange={() => setOption1(checked => !checked)} label="Option 1" />
      <Checkbox checked={option2} onChange={() => setOption2(checked => !checked)} label="Option 2" />
      <Checkbox checked={option3} onChange={() => setOption3(checked => !checked)} label="Option 3" />
    </>
  );
};
```

### Required

When a checkbox is marked as `required`, its label also gets the required styling.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const Required = (): JSXElement => <Checkbox required label="Required" />;
```

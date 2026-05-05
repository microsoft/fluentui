# Components/RadioGroup

RadioGroup lets people select a single option from two or more Radio items. Use RadioGroup to present all available choices if there's enough space. For more than 5 choices, consider using a different component such as Dropdown.

## Best practices

### Do

- **Give people a choice.**
  Make sure to give people the option to not make a choice. For example, include a "None" option if no answer is required.

- **Choose a default.**
  Select the safest, most secure, and private option as the default. If safety and security aren't factors, select the most likely or convenient option.

- **Keep labels short and action-oriented.**
  Use a phrase for the label, rather than a full sentence.

- **Use sentence case.**
  Capitalize only the first word as you would in a sentence.

- **Place most likely choices first.**
  List the options in a logical order, such as most likely to be selected to least, simplest operation to most complex, or least risk to most. Listing options in alphabetical order isn't recommended because the order will change when the text is localized.

### Don't

- **Include more than 5 options.**
  Use RadioGroup when there are 2-5 options, and you have enough screen space and the options are important enough to be a good use of that screen space. Otherwise, use Dropdown.

## Props

| Name       | Type                                                                      | Required | Default  | Description                                                                                                                                                                               |
| ---------- | ------------------------------------------------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | `"div"`                                                                   | No       |          |                                                                                                                                                                                           |
| `name`     | `string`                                                                  | No       |          | The name of this radio group. This name is applied to all Radio items inside this group. If no name is provided, one will be generated so that all of the Radio items have the same name. |
| `value`    | `string`                                                                  | No       |          | The selected Radio item in this group. This should be the `value` prop of one of the Radio items inside this group.                                                                       |
| `onChange` | `((ev: FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => void)` | No       |          | Callback when the selected Radio item changes.                                                                                                                                            |
| `layout`   | `"horizontal" "vertical" "horizontal-stacked"`                            | No       | vertical | How the radio items are laid out in the group.                                                                                                                                            |
| `disabled` | `boolean`                                                                 | No       |          | Disable all Radio items in this group.                                                                                                                                                    |
| `required` | `boolean`                                                                 | No       |          | Require a selection in this group. Adds the `required` prop to all child Radio items.                                                                                                     |
| `ref`      | `Ref<HTMLDivElement>`                                                     | No       |          |                                                                                                                                                                                           |

## Subcomponents

### Radio

Radio component is a wrapper for a radio button with a label.

#### Props

| Name            | Type                                                                                                                                                     | Required                                                        | Default | Description                                                                                                                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | -------------- | ----------------- | --- | --- | ------------------ |
| `root`          | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null>`                                                          | No      |                                                                                                                                                                                                                                   | The root element of the Radio. The root slot receives the `className` and `style` specified directly on the `<Radio>`. All other native props will be applied to the primary slot: `input` |
| `input`         | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                          | No                                                              |         | Hidden input that handles the radio's functionality. This is the PRIMARY slot: all native properties specified directly on `<Radio>` will be applied to this slot, except `className` and `style`, which remain on the root slot. |
| `label`         | `WithSlotShorthandValue<Omit<ComponentProps<LabelSlots>, "required"> & { disabled?: boolean; required?: boolean                                          | WithSlotShorthandValue<{ as?: "span"; } & Omit<...> & { ...; }> | null    | undefined; size?: "small"                                                                                                                                                                                                         | ... 2 more ...                                                                                                                                                                             | undefined; weight?: "regular" | ... 1 more ... | undefined; } ...` | No  |     | The Radio's label. |
| `as`            | `"input"`                                                                                                                                                | No                                                              |         |                                                                                                                                                                                                                                   |
| `indicator`     | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>    | null>`                                                          | No      |                                                                                                                                                                                                                                   | A circle outline, with a filled circle icon inside when the Radio is checked.                                                                                                              |
| `labelPosition` | `"after" "below"`                                                                                                                                        | No                                                              |         | The position of the label relative to the radio indicator. This defaults to `after` unless the Radio is inside a RadioGroup with `layout="horizontalStacked"`, in which case it defaults to `below`. @defaultvalue after          |
| `onChange`      | `((ev: ChangeEvent<HTMLInputElement>, data: RadioOnChangeData) => void)`                                                                                 | No                                                              |         | Callback when this Radio is selected in its group. **Note:** `onChange` is NOT called when this Radio is deselected. Use RadioGroup's `onChange` event to determine when the selection in the group changes.                      |
| `ref`           | `Ref<HTMLInputElement>`                                                                                                                                  | No                                                              |         |                                                                                                                                                                                                                                   |

## Examples

### Controlled Value

The selected radio item can be controlled using the `value` and `onChange` props.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Radio, RadioGroup, Button } from '@fluentui/react-components';

export const ControlledValue = (): JSXElement => {
  const [value, setValue] = React.useState('banana');
  return (
    <>
      <Field label="Favorite Fruit">
        <RadioGroup value={value} onChange={(_, data) => setValue(data.value)}>
          <Radio value="apple" label="Apple" />
          <Radio value="pear" label="Pear" />
          <Radio value="banana" label="Banana" />
          <Radio value="orange" label="Orange" />
        </RadioGroup>
      </Field>
      <Button disabledFocusable={!value} onClick={() => setValue('')}>
        Clear selection
      </Button>
    </>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import type { RadioGroupProps } from '@fluentui/react-components';
import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const Default = (props: Partial<RadioGroupProps>): JSXElement => (
  <Field label="Favorite Fruit">
    <RadioGroup {...props}>
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
```

### Default Value

The initially selected item can be set by setting the `defaultValue` of RadioGroup. Alternatively, one Radio item can have `defaultChecked` set. Both methods have the same effect, but only one should be used in a given RadioGroup.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const DefaultValue = (): JSXElement => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="pear">
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
```

### Disabled

RadioGroup can be disabled, which disables all Radio items inside.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="apple" disabled>
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
```

### Disabled Item

Radio items can be disabled individually.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const DisabledItem = (): JSXElement => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="apple">
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" disabled />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
```

### Layout: horizontal

The `horizontal` layout places each radio item in a row, with labels after the radio indicator.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const Horizontal = (): JSXElement => (
  <Field label="Favorite Fruit">
    <RadioGroup layout="horizontal">
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
```

### Layout: horizontal-stacked

The `horizontal-stacked` layout places each radio item in a row, with labels below the radio indicator.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const HorizontalStacked = (): JSXElement => (
  <Field label="Favorite Fruit">
    <RadioGroup layout="horizontal-stacked">
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
```

### Label Subtext

Radio's label supports any formatted text. In this example, smaller text is below the main label text.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Radio, RadioGroup, Text } from '@fluentui/react-components';

export const LabelSubtext = (): JSXElement => (
  <Field label="Favorite Fruit">
    <RadioGroup>
      <Radio
        value="A"
        label={
          <>
            Banana
            <br />
            <Text size={200}>This is an example subtext of the first option</Text>
          </>
        }
      />

      <Radio
        value="B"
        label={
          <>
            Pear
            <br />
            <Text size={200}>This is some more example subtext</Text>
          </>
        }
      />
    </RadioGroup>
  </Field>
);
```

### Required

Use the `required` prop to indicate that one of the radio items must be selected. Or, if the RadioGroup is inside a Field, it will inherit the `required` prop from the Field.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const Required = (): JSXElement => (
  <Field label="Favorite Fruit" required>
    <RadioGroup>
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
```

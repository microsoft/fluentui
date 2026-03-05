# Components/Field

Field adds a label, validation message, and hint text to a control.

## Best practices

### Do

- Use Field to add a label and validation message to form controls.
- Use Field to label other unlabeled controls like ProgressBar.

### Don't

- Avoid including both a validationMessage and hint text.
- Don't add multiple controls as a child of a single Field. The label is only associated with one control.
- Don't use the Field's label with Checkbox. Use the Checkbox's label instead (the Field can still be used to add a validationMessage or hint).

## Props

| Name                    | Type                                                                                                                                         | Required                                                        | Default                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------------- | ----------------- | --- | --- | ------------------------------------ |
| `label`                 | `WithSlotShorthandValue<Omit<ComponentProps<LabelSlots>, "required"> & { disabled?: boolean; required?: boolean                              | WithSlotShorthandValue<{ as?: "span"; } & Omit<...> & { ...; }> | null                                                 | undefined; size?: "small"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ... 2 more ...                                                                                                                                                                                                                                                                     | undefined; weight?: "regular" | ... 1 more ... | undefined; } ...` | No  |     | The label associated with the field. |
| `as`                    | `"div"`                                                                                                                                      | No                                                              |                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `hint`                  | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>    | null`                                                           | No                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Additional hint text below the field.                                                                                                                                                                                                                                              |
| `validationMessage`     | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>    | null`                                                           | No                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | A message about the validation state. By default, this is an error message, but it can be a success, warning, or custom message by setting `validationState`.                                                                                                                      |
| `validationMessageIcon` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`                                                           | No                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | The icon associated with the `validationMessage`. This will only be displayed if `validationMessage` is set. The default depends on `validationState`: _ error: `<ErrorCircle12Filled />` _ warning: `<Warning12Filled />` _ success: `<CheckmarkCircle12Filled />` _ none: `null` |
| `orientation`           | `"horizontal" "vertical"`                                                                                                                    | No                                                              | vertical                                             | The orientation of the label relative to the field component. This only affects the label, and not the validationMessage or hint (which always appear below the field component).                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `validationState`       | `"none" "success" "warning" "error"`                                                                                                         | No                                                              | error when validationMessage is set; none otherwise. | The `validationState` affects the display of the `validationMessage` and `validationMessageIcon`. _ error: (default) The validation message has a red error icon and red text, with `role="alert"` so it is announced by screen readers. Additionally, the control inside the field has `aria-invalid` set, which adds a red border to some field components (such as `Input`). _ success: The validation message has a green checkmark icon and gray text. _ warning: The validation message has a yellow exclamation icon and gray text, with `role="alert"` so it is announced by screen readers. _ none: The validation message has no icon and gray text. |
| `required`              | `boolean`                                                                                                                                    | No                                                              |                                                      | Marks the Field as required. If `true`, an asterisk will be appended to the label, and `aria-required` will be set on the Field's child.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `size`                  | `"small" "medium" "large"`                                                                                                                   | No                                                              | medium                                               | The size of the Field's label.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `ref`                   | `Ref<HTMLDivElement>`                                                                                                                        | No                                                              |                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## Examples

### Component Examples

Field can be used with any input components in this library. This story shows some examples.
It can also be used to add a label or error text to components like ProgressBar.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import {
  Checkbox,
  Combobox,
  Field,
  Input,
  makeResetStyles,
  Option,
  Radio,
  RadioGroup,
  Slider,
  SpinButton,
  Switch,
  Textarea,
  tokens,
} from '@fluentui/react-components';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const ComponentExamples = (): JSXElement => (
  <div className={useStackClassName()}>
    <Field label="Input">
      <Input />
    </Field>
    <Field label="Textarea">
      <Textarea />
    </Field>
    <Field label="Combobox">
      <Combobox>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
      </Combobox>
    </Field>
    <Field label="SpinButton">
      <SpinButton />
    </Field>
    <Field hint="Checkboxes use their own label instead of the Field label.">
      <Checkbox label="Checkbox" />
    </Field>
    <Field label="Slider">
      <Slider defaultValue={25} />
    </Field>
    <Field label="Switch">
      <Switch />
    </Field>
    <Field label="RadioGroup">
      <RadioGroup>
        <Radio label="Option 1" />
        <Radio label="Option 2" />
        <Radio label="Option 3" />
      </RadioGroup>
    </Field>
  </div>
);
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import type { FieldProps } from '@fluentui/react-components';
import { Field, Input } from '@fluentui/react-components';

export const Default = (props: Partial<FieldProps>): JSXElement => (
  <Field label="Example field" validationState="success" validationMessage="This is a success message." {...props}>
    <Input />
  </Field>
);
```

### Disabled control

When the control inside the Field is disabled, the label should _not_ be marked disabled. This ensures the label remains readable to users.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Input } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
  <Field label="Field with disabled control">
    <Input disabled />
  </Field>
);
```

### Hint

The `hint` provides additional descriptive information about the field. Hint text should be used sparingly.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Input } from '@fluentui/react-components';

export const Hint = (): JSXElement => (
  <Field label="Example with hint" hint="Sample hint text.">
    <Input />
  </Field>
);
```

### Horizontal Orientation

Setting `orientation="horizontal"` places the label beside the input. The validationMessage and hint still appear below the input.<br />The label width is a fixed 33% of the width of the field. This makes it so horizontal fields are aligned when stacked together.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Input } from '@fluentui/react-components';

export const Horizontal = (): JSXElement => (
  <Field label="Horizontal" orientation="horizontal" hint="Validation message and hint are below the input.">
    <Input />
  </Field>
);
```

### Info button

Add an info button to the label by replacing the Field's label with an `InfoLabel`. This can be done using a [slot render function](./?path=/docs/concepts-developer-customizing-components-with-slots--docs#replacing-the-entire-slot). See the code from this story for more details.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Input, LabelProps } from '@fluentui/react-components';
import { InfoLabel } from '@fluentui/react-components';

export const Info = (): JSXElement => (
  <Field
    label={{
      // Setting children to a render function allows you to replace the entire slot.
      // The first param is the component for the slot (Label), which we're ignoring to use InfoLabel instead.
      // The second param are the props for the slot, which need to be passed to the InfoLabel.
      children: (_: unknown, slotProps: LabelProps) => (
        <InfoLabel {...slotProps} info="Example info">
          Field with an info button
        </InfoLabel>
      ),
    }}
  >
    <Input />
  </Field>
);
```

### Third party controls a Field

Field uses context to associate its label and message text with its child form control. All of the form controls in this library support FieldContext.<br/>To use a third party control that does not support FieldContext, the child of Field may be a function that takes props to pass to the control. See the code in this example for more details.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, makeStyles } from '@fluentui/react-components';
import { AnimalCat24Regular } from '@fluentui/react-icons';

const useCatInputStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '4px',
  },
});

const CatInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = props => {
  const styles = useCatInputStyles();
  return (
    <div className={styles.root}>
      <AnimalCat24Regular />
      <input {...props} />
    </div>
  );
};

export const RenderFunction = (): JSXElement => (
  <Field label="Third party input" hint="Use a render function to properly associate the label with the control.">
    {fieldProps => <CatInput {...fieldProps} />}
  </Field>
);
```

### Required

When a Field is marked as `required`, the label has a red asterisk, and the input gets the `aria-required` property for accessiblity tools.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Input } from '@fluentui/react-components';

export const Required = (): JSXElement => (
  <Field label="Required field" required>
    <Input />
  </Field>
);
```

### Size

The `size` prop affects the size of the Field's label, as well as form controls that support a `size` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Input, makeResetStyles, tokens } from '@fluentui/react-components';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const Size = (): JSXElement => (
  <div className={useStackClassName()}>
    <Field label="Size small" size="small">
      <Input />
    </Field>
    <Field label="Size medium" size="medium">
      <Input />
    </Field>
    <Field label="Size large" size="large">
      <Input />
    </Field>
  </div>
);
```

### Validation Message

<p>The `validationMessage` is used to give the user feedback about the value entered. Field does not do validation itself, but can be used to report the result of form validation.</p><p>The `validationState` affects the behavior and appearance of the message: <ul>  <li>`error` - (default) The validation message has red text with a red error icon. It has `role="alert"`    so it is announced by accessibility tools. Additionally, the control inside the field has `aria-invalid`    set, which adds a red border to some field components (such as `Input`).</li>  <li>`success` - The validation message has gray text with a green checkmark icon.</li>  <li>`warning` - The validation message has gray text with a yellow exclamation icon.</li>  <li>`none` - The validation message has gray text with no icon.</li></ul></p><p>Optionally, `validationMessageIcon` can be used to override the default icon (or add an icon in the case of `validationState="none"`).</p>

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Input, makeResetStyles, tokens } from '@fluentui/react-components';
import { SparkleFilled } from '@fluentui/react-icons';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const ValidationMessage = (): JSXElement => (
  <div className={useStackClassName()}>
    <Field label="Error state" validationMessage="This is an error message.">
      <Input />
    </Field>
    <Field label="Warning state" validationState="warning" validationMessage="This is a warning message.">
      <Input />
    </Field>
    <Field label="Success state" validationState="success" validationMessage="This is a success message.">
      <Input />
    </Field>
    <Field
      label="Custom state"
      validationState="none"
      validationMessageIcon={<SparkleFilled />}
      validationMessage="This is a custom message."
    >
      <Input />
    </Field>
  </div>
);
```

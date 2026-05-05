# Components/Combobox

A combobox (`Combobox`) combines a text field and a dropdown giving people a way to select an option from a list or enter their own choice.

## Best practices

### Do

- **Consider using `Combobox` with outline or underline appearances.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using underline or outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding color.

### Don't

- **Don’t place input on a surface which doesn’t have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements.

## Props

| Name                     | Type                                                                                                                                                                                                                                 | Required                | Default                     | Description                                                                                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | --- | -------------------------------------------------- | -------------------------------------------- |
| `root`                   | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>                                                                                | null>`                  | No                          |                                                                                                                                                                                                                                                       | The root combobox slot    |
| `input`                  | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                                                                                                      | No                      |                             | The primary slot, an input with role="combobox"                                                                                                                                                                                                       |
| `as`                     | `"input"`                                                                                                                                                                                                                            | No                      |                             |                                                                                                                                                                                                                                                       |
| `listbox`                | `WithSlotShorthandValue<Omit<ListboxSlots, "root"> & Omit<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }, "ref"> & SelectionProps & { ...; } & RefAttributes<...>> | null`                   | No                          |                                                                                                                                                                                                                                                       | The dropdown listbox slot |
| `expandIcon`             | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                         | null`                   | No                          |                                                                                                                                                                                                                                                       | The dropdown arrow icon   |
| `clearIcon`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                         | null`                   | No                          |                                                                                                                                                                                                                                                       | The dropdown clear icon   |
| `defaultSelectedOptions` | `string[]`                                                                                                                                                                                                                           | No                      |                             | For an uncontrolled component, sets the initial selection. If this is set, the `defaultValue` prop MUST also be set.                                                                                                                                  |
| `multiselect`            | `boolean`                                                                                                                                                                                                                            | No                      | false                       | Sets the selection type to multiselect. Set this to true for multiselect, even if fully controlling selection state. This enables styles and accessibility properties to be set.                                                                      |
| `onOptionSelect`         | `((event: SelectionEvents, data: OptionOnSelectData) => void)`                                                                                                                                                                       | No                      |                             | Callback when an option is selected                                                                                                                                                                                                                   |
| `selectedOptions`        | `string[]`                                                                                                                                                                                                                           | No                      |                             | An array of selected option keys. Use this with `onOptionSelect` to directly control the selected option(s) If this is set, the `value` prop MUST also be controlled.                                                                                 |
| `onActiveOptionChange`   | `EventHandler<ActiveOptionChangeData>`                                                                                                                                                                                               | No                      |                             |                                                                                                                                                                                                                                                       |
| `mountNode`              | `HTMLElement                                                                                                                                                                                                                         | { element?: HTMLElement | null; className?: string; } | null                                                                                                                                                                                                                                                  | undefined`                | No  | a new element on document.body without any styling | Where the portal children are mounted on DOM |
| `appearance`             | `"outline" "underline" "filled-darker" "filled-lighter"`                                                                                                                                                                             | No                      | 'outline'                   | Controls the colors and borders of the combobox trigger.                                                                                                                                                                                              |
| `clearable`              | `boolean`                                                                                                                                                                                                                            | No                      |                             | If set, the combobox will show an icon to clear the current value.                                                                                                                                                                                    |
| `defaultOpen`            | `boolean`                                                                                                                                                                                                                            | No                      |                             | The default open state when open is uncontrolled                                                                                                                                                                                                      |
| `disableAutoFocus`       | `boolean`                                                                                                                                                                                                                            | No                      | false                       | Disable auto-focusing on the first item when mounting.                                                                                                                                                                                                |
| `inlinePopup`            | `boolean`                                                                                                                                                                                                                            | No                      |                             | Render the combobox's popup inline in the DOM. This has accessibility benefits, particularly for touch screen readers.                                                                                                                                |
| `onOpenChange`           | `((e: ComboboxBaseOpenEvents, data: ComboboxBaseOpenChangeData) => void)`                                                                                                                                                            | No                      |                             | Callback when the open/closed state of the dropdown changes                                                                                                                                                                                           |
| `open`                   | `boolean`                                                                                                                                                                                                                            | No                      |                             | Sets the open/closed state of the dropdown. Use together with onOpenChange to fully control the dropdown's visibility                                                                                                                                 |
| `positioning`            | `PositioningShorthand`                                                                                                                                                                                                               | No                      |                             | Configure the positioning of the combobox dropdown. Please refer to the [positioning documentation](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--default#anchor-to-target) for more details. @defaultvalue below |
| `size`                   | `"small" "medium" "large"`                                                                                                                                                                                                           | No                      | 'medium'                    | Controls the size of the combobox faceplate                                                                                                                                                                                                           |
| `freeform`               | `boolean`                                                                                                                                                                                                                            | No                      |                             |                                                                                                                                                                                                                                                       |
| `ref`                    | `Ref<HTMLInputElement>`                                                                                                                                                                                                              | No                      |                             |                                                                                                                                                                                                                                                       |

## Subcomponents

### Option

Option component: a styled child option of a Combobox

#### Props

| Name        | Type                                                                                                                                         | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `checkIcon` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | The check icon that is visible for selected options |
| `as`        | `"div"`                                                                                                                                      | No       |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `disabled`  | `boolean`                                                                                                                                    | No       |         | Sets an option to the `disabled` state. Disabled options cannot be selected, but are still keyboard navigable                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `value`     | `string`                                                                                                                                     | No       |         | Defines a unique identifier for the option. Use this to control selectedOptions, or to get the option value in the onOptionSelect callback. Defaults to `text` if not provided.                                                                                                                                                                                                                                                                                                                                                  |
| `text`      | `string`                                                                                                                                     | No       |         | An optional override the string value of the Option's display text, defaulting to the Option's child content. This is used as the Dropdown button's or Combobox input's value when the option is selected, and as the comparison for type-to-find keyboard functionality. The string value of the Option's display text when the Option's children are not a string. This is used as the Dropdown button's or Combobox input's value when the option is selected, and as the comparison for type-to-find keyboard functionality. |
| `ref`       | `Ref<HTMLDivElement>`                                                                                                                        | No       |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

### Listbox

Listbox component: a standalone selection control, or the popup in a Combobox

#### Props

| Name                     | Type                                                           | Required | Default | Description                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                     | `"div"`                                                        | No       |         |                                                                                                                                                                                  |
| `defaultSelectedOptions` | `string[]`                                                     | No       |         | For an uncontrolled component, sets the initial selection. If this is set, the `defaultValue` prop MUST also be set.                                                             |
| `multiselect`            | `boolean`                                                      | No       | false   | Sets the selection type to multiselect. Set this to true for multiselect, even if fully controlling selection state. This enables styles and accessibility properties to be set. |
| `onOptionSelect`         | `((event: SelectionEvents, data: OptionOnSelectData) => void)` | No       |         | Callback when an option is selected                                                                                                                                              |
| `selectedOptions`        | `string[]`                                                     | No       |         | An array of selected option keys. Use this with `onOptionSelect` to directly control the selected option(s) If this is set, the `value` prop MUST also be controlled.            |
| `disableAutoFocus`       | `boolean`                                                      | No       | false   | Disable auto-focusing on the first item when mounting.                                                                                                                           |
| `ref`                    | `Ref<HTMLDivElement>`                                          | No       |         |                                                                                                                                                                                  |

## Examples

### Active Option Change

OnActiveOptionChange notifies the user when the active option in the Combobox was changed by keyboard. To react on mouse hover events, use onMouseEnter on the invididual options.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const ActiveOptionChange = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-active-option-change');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  const [activeOptionText, setActiveOptionText] = React.useState('');

  const onActiveOptionChange = React.useCallback<NonNullable<ComboboxProps['onActiveOptionChange']>>(
    (_, data) => {
      if (data?.nextOption?.text) {
        setActiveOptionText(data?.nextOption?.text);
      }
    },
    [setActiveOptionText],
  );

  const onMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setActiveOptionText(`${e.currentTarget.textContent} (Mouse enter)`);
    },
    [setActiveOptionText],
  );

  return (
    <div className={styles.root}>
      {activeOptionText}
      <label id={comboId}>Best pet</label>
      <Combobox
        aria-labelledby={comboId}
        placeholder="Select an animal"
        onActiveOptionChange={onActiveOptionChange}
        {...props}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'} onMouseEnter={onMouseEnter}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};
```

### Appearance

A Combobox can have the following `appearance` variants:

- `outline` (default): has a border around all four sides.
- `underline`: only has a bottom border.
- `filled-darker`: no border, only a subtle background color difference against a white page.
- `filled-lighter`: no border, and a white background.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, tokens, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '20px',
    maxWidth: '400px',
    '> div': {
      display: 'grid',
      gridTemplateRows: 'repeat(1fr)',
      justifyItems: 'start',
      gap: '2px',
      // need padding to see the background color for filled variants
      padding: '5px 20px 10px',
    },
  },
  // filledLighter and filledDarker appearances depend on particular background colors
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
});

export const Appearance = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <label id={`${comboId}-outline`}>Outline</label>
        <Combobox aria-labelledby={`${comboId}-outline`} placeholder="Select a color" appearance="outline" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div>
        <label id={`${comboId}-underline`}>Underline</label>
        <Combobox
          aria-labelledby={`${comboId}-underline`}
          placeholder="Select a color"
          appearance="underline"
          {...props}
        >
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div className={styles.filledDarker}>
        <label id={`${comboId}-filledDarker`}>Filled Darker</label>
        <Combobox
          aria-labelledby={`${comboId}-filledDarker`}
          placeholder="Select a color"
          appearance="filled-darker"
          {...props}
        >
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div className={styles.filledLighter}>
        <label id={`${comboId}-filledLighter`}>Filled Lighter</label>
        <Combobox
          aria-labelledby={`${comboId}-filledLighter`}
          placeholder="Select a color"
          appearance="filled-lighter"
          {...props}
        >
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>
    </div>
  );
};
```

### Clearable

A Combobox can be clearable and let users remove their selection. Note: this is not supported in multiselect mode yet.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, Label, makeStyles, Option, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    justifyItems: 'start',
    gap: '2px',
  },
});

export const Clearable = (): JSXElement => {
  const comboboxId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label id={comboboxId}>Pick a color</Label>
      <Combobox clearable aria-labelledby={comboboxId} placeholder="Select a color">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </div>
  );
};
```

### Complex Options

Options are defined as JSX children, and can include nested elements or other components. When this is the case, the Option's `text` prop should be the plain text version of the option, and is used as the Combobox value when the option is selected. Options should never contain interactive elements, such as buttons or links.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId, Persona } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const ComplexOptions = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-default');
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Schedule a meeting</label>
      <Combobox aria-labelledby={comboId} {...props}>
        <Option text="Katri Athokas">
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Katri Athokas"
            presence={{
              status: 'available',
            }}
            secondaryText="Available"
          />
        </Option>
        <Option text="Elvia Atkins">
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Elvia Atkins"
            presence={{
              status: 'busy',
            }}
            secondaryText="Busy"
          />
        </Option>
        <Option text="Cameron Evans">
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Cameron Evans"
            presence={{
              status: 'away',
            }}
            secondaryText="Away"
          />
        </Option>
        <Option text="Wanda Howard">
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Wanda Howard"
            presence={{
              status: 'out-of-office',
            }}
            secondaryText="Out of office"
          />
        </Option>
      </Combobox>
    </div>
  );
};
```

### Controlled

A Combobox may have controlled or controlled selection and value. When the selection is controlled or a default selection is provided, a controlled value or default value must also be defined. Otherwise, the Combobox will not be able to display a value before the Options are rendered.

```tsx
import * as React from 'react';
import type { JSXElement, PresenceBadgeStatus } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId, Persona } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    justifyItems: 'start',
    gap: '20px',
    maxWidth: '400px',
  },
  field: {
    display: 'grid',
    justifyItems: 'start',
    gap: '2px',
  },
});

const optionData = [
  {
    text: 'Katri Athokas',
    value: 'kathok',
    presence: 'available',
    secondaryText: 'Available',
  },
  {
    text: 'Elvia Atkins',
    value: 'eatkins',
    presence: 'busy',
    secondaryText: 'Busy',
  },
  {
    text: 'Cameron Evans',
    value: 'cevans',
    presence: 'away',
    secondaryText: 'Away',
  },
  {
    text: 'Wanda Howard',
    value: 'whoward',
    presence: 'out-of-office',
    secondaryText: 'Out of office',
  },
];

export const Controlled = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-controlled');
  const styles = useStyles();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(['eatkins']);
  const [value, setValue] = React.useState('Elvia Atkins');
  const [open, setOpen] = React.useState(false);

  const onOptionSelect: (typeof props)['onOptionSelect'] = (ev, data) => {
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? '');
  };

  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  // Reset the typed value when the Combobox closes to reflect the selected options
  React.useEffect(() => {
    if (!open) {
      setValue(selectedOptions.join(', '));
    }
  }, [open, selectedOptions]);

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <label htmlFor={`${comboId}-default`}>Schedule a meeting (default selection)</label>
        <Combobox id={`${comboId}-default`} {...props} defaultValue="Elvia Atkins" defaultSelectedOptions={['eatkins']}>
          {optionData.map(opt => (
            <Option key={opt.value} text={opt.text} value={opt.value}>
              <Persona
                avatar={{ color: 'colorful', 'aria-hidden': true }}
                name={opt.text}
                presence={{
                  status: opt.presence as PresenceBadgeStatus,
                }}
                secondaryText={opt.secondaryText}
              />
            </Option>
          ))}
        </Combobox>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${comboId}-controlled`}>Schedule a meeting (controlled selection)</label>
        <Combobox
          id={`${comboId}-controlled`}
          {...props}
          value={value}
          selectedOptions={selectedOptions}
          onInput={onInput}
          onOptionSelect={onOptionSelect}
          onOpenChange={(_, data) => setOpen(data.open)}
        >
          {optionData.map(opt => (
            <Option key={opt.value} text={opt.text} value={opt.value}>
              <Persona
                avatar={{ color: 'colorful', 'aria-hidden': true }}
                name={opt.text}
                presence={{
                  status: opt.presence as PresenceBadgeStatus,
                }}
                secondaryText={opt.secondaryText}
              />
            </Option>
          ))}
        </Combobox>
      </div>
    </div>
  );
};
```

### Controlling Open And Close

The opening and close of the `Combobox` can be controlled with your own state.
The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate
event.

_When controlling the open state of the `Combobox`, extra effort is required to ensure that interactions are_
_still appropriate and that keyboard accessibility does not degrade._

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox, Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { CheckboxProps, ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const ControllingOpenAndClose = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpenChange: ComboboxProps['onOpenChange'] = (e, data) => setOpen(data.open);
  const onChange: CheckboxProps['onChange'] = (e, data) => setOpen(!!data.checked);

  return (
    <div className={styles.root}>
      <Checkbox value="open" name="state" label="open" capture="user" checked={open} onChange={onChange} />
      <label id={comboId}>Best pet</label>
      <Combobox
        aria-labelledby={comboId}
        placeholder="Select an animal"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};
```

### Custom Options

Options and OptionGroups can be extended and customized.Here `OptionGroup` is wrapped in `CustomOptionGroup`,which adds a custom label style and takes an `options` array prop which is mapped to child Option elements.`Option` is also wrapped in `CustomOption`, which adds a custom check icon.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, OptionGroup, useId } from '@fluentui/react-components';
import type { ComboboxProps, OptionProps, OptionGroupProps } from '@fluentui/react-components';
import { CheckmarkCircle20Filled } from '@fluentui/react-icons';

const CustomOption = (props: OptionProps) => {
  return <Option {...props} checkIcon={<CheckmarkCircle20Filled />} />;
};

const CustomOptionGroup = (props: Partial<OptionGroupProps> & { options: string[] }) => {
  const { label, options, ...optionGroupProps } = props;
  const labelSlot = typeof label === 'object' ? label : { children: label };

  return (
    <OptionGroup label={{ style: { fontStyle: 'italic' }, ...labelSlot }} {...optionGroupProps}>
      {options.map(option => (
        <CustomOption key={option} disabled={option === 'Ferret'}>
          {option}
        </CustomOption>
      ))}
    </OptionGroup>
  );
};

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const CustomOptions = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-default');
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
        <CustomOptionGroup label="Land" options={land} />
        <CustomOptionGroup label="Sea" options={water} />
      </Combobox>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Default = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};
```

### Disabled

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Disabled = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-disabled');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} disabled placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </div>
  );
};
```

### Filtering

We provide "useComboboxFilter()" hook to filter the options based on the user-typed string. It can be configured for a custom filter function, custom message, and custom render function.

We recommend using filtering when creating a freeform Combobox.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, ComboboxProps, makeStyles, useComboboxFilter, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

const options = [
  { children: 'Alligator', value: 'Alligator' },
  { children: 'Bee', value: 'Bee' },
  { children: 'Bird', value: 'Bird' },
  { children: 'Cheetah', disabled: true, value: 'Cheetah' },
  { children: 'Dog', value: 'Dog' },
  { children: 'Dolphin', value: 'Dolphin' },
  { children: 'Ferret', value: 'Ferret' },
  { children: 'Firefly', value: 'Firefly' },
  { children: 'Fish', value: 'Fish' },
  { children: 'Goat', value: 'Goat' },
  { children: 'Horse', value: 'Horse' },
  { children: 'Lion', value: 'Lion' },
];

export const Filtering = (): JSXElement => {
  const comboId = useId();
  const styles = useStyles();

  const [query, setQuery] = React.useState<string>('');
  const children = useComboboxFilter(query, options, {
    noOptionsMessage: 'No animals match your search.',
  });
  const onOptionSelect: ComboboxProps['onOptionSelect'] = (e, data) => {
    setQuery(data.optionText ?? '');
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox
        onOptionSelect={onOptionSelect}
        aria-labelledby={comboId}
        placeholder="Select an animal"
        onChange={ev => setQuery(ev.target.value)}
        value={query}
      >
        {children}
      </Combobox>
    </div>
  );
};
```

### Freeform

Combobox supports the `freeform` prop, which allows freeform text input. Implementing filtering together with `freeform` is generally recommended.We also recommend displaying a custom freeform string if the user input doesn't match an existing option.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Freeform = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-default');
  const options = [
    'Cat',
    'Caterpillar',
    'Catfish',
    'Cheetah',
    'Chicken',
    'Cockatiel',
    'Cow',
    'Dog',
    'Dolphin',
    'Ferret',
    'Firefly',
    'Fish',
    'Fox',
    'Fox Terrier',
    'Frog',
    'Hamster',
    'Snake',
  ];

  const [matchingOptions, setMatchingOptions] = React.useState([...options]);
  const [customSearch, setCustomSearch] = React.useState<string | undefined>();
  const styles = useStyles();

  const onChange: ComboboxProps['onChange'] = event => {
    const value = event.target.value.trim();
    const matches = options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
    setMatchingOptions(matches);
    if (value.length && matches.length < 1) {
      setCustomSearch(value);
    } else {
      setCustomSearch(undefined);
    }
  };

  const onOptionSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    const matchingOption = data.optionText && options.includes(data.optionText);
    if (matchingOption) {
      setCustomSearch(undefined);
    } else {
      setCustomSearch(data.optionText);
    }
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Find pets</label>
      <Combobox
        aria-labelledby={comboId}
        freeform
        placeholder="Select an animal"
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        {...props}
      >
        {customSearch ? (
          <Option key="freeform" text={customSearch}>
            Search for "{customSearch}"
          </Option>
        ) : null}
        {matchingOptions.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </div>
  );
};
```

### Grouped

Combobox options can be semantically grouped with the `OptionGroup` element, with an optional label.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, OptionGroup, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Grouped = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-grouped');
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
        <OptionGroup label="Land">
          {land.map(option => (
            <Option key={option} disabled={option === 'Ferret'}>
              {option}
            </Option>
          ))}
        </OptionGroup>
        <OptionGroup label="Sea">
          {water.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </OptionGroup>
      </Combobox>
    </div>
  );
};
```

### Multiselect

Combobox supports multiselect, and options within a multiselect will display checkbox icons.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, typographyStyles, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
  description: {
    ...typographyStyles.caption1,
  },
});

export const Multiselect = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-multi');
  const selectedListId = `${comboId}-selection`;
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pets</label>
      <Combobox
        aria-labelledby={labelledBy}
        multiselect={true}
        placeholder="Select one or more animals"
        onOptionSelect={onSelect}
        {...props}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Combobox>
      {selectedOptions.length ? (
        <span id={selectedListId} className={styles.description}>
          Chosen pets: {selectedOptions.join(', ')}
        </span>
      ) : null}
    </div>
  );
};
```

### Multiselect With Tags

Combobox can display multiselect values in custom tags. This example uses a controlled selection so the tags can be used to remove selected options.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Combobox, makeStyles, Option, tokens, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';
import { Dismiss12Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
  tagsList: {
    listStyleType: 'none',
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: 'flex',
    gridGap: tokens.spacingHorizontalXXS,
  },
});

export const MultiselectWithTags = (props: Partial<ComboboxProps>): JSXElement => {
  // generate ids for handling labelling
  const comboId = useId('combo-multi');
  const selectedListId = `${comboId}-selection`;

  // refs for managing focus when removing tags
  const selectedListRef = React.useRef<HTMLUListElement>(null);
  const comboboxInputRef = React.useRef<HTMLInputElement>(null);

  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  // Handle selectedOptions both when an option is selected or deselected in the Combobox,
  // and when an option is removed by clicking on a tag
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const onTagClick = (option: string, index: number) => {
    // remove selected option
    setSelectedOptions(selectedOptions.filter(o => o !== option));

    // focus previous or next option, defaulting to focusing back to the combo input
    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(`#${comboId}-remove-${indexToFocus}`);
    if (optionToFocus) {
      (optionToFocus as HTMLButtonElement).focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };

  const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pets</label>
      {selectedOptions.length ? (
        <ul id={selectedListId} className={styles.tagsList} ref={selectedListRef}>
          {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
          <span id={`${comboId}-remove`} hidden>
            Remove
          </span>
          {selectedOptions.map((option, i) => (
            <li key={option}>
              <Button
                size="small"
                shape="circular"
                appearance="primary"
                icon={<Dismiss12Regular />}
                iconPosition="after"
                onClick={() => onTagClick(option, i)}
                id={`${comboId}-remove-${i}`}
                aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
              >
                {option}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
      <Combobox
        aria-labelledby={labelledBy}
        multiselect={true}
        placeholder="Select one or more animals"
        selectedOptions={selectedOptions}
        onOptionSelect={onSelect}
        ref={comboboxInputRef}
        {...props}
      >
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </div>
  );
};
```

### Multiselect With Value String

Multiselect Combobox supports using a controlled value todisplay selected options when not in focus, similar to v8 behavior.We recommend using tags rather than the value string when possible,since they have better UX and accessibility.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const MultiselectWithValueString = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-multi');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState('');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  const onSelect: ComboboxProps['onOptionSelect'] = (event, data) => {
    // update selectedOptions
    setSelectedOptions(data.selectedOptions);

    // reset value to an empty string after selection
    setValue('');
  };

  // clear value on focus
  const onFocus = () => {
    setValue('');
  };

  // update value to selected options on blur
  const onBlur = () => {
    setValue(selectedOptions.join(', '));
  };

  // update value on input change
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pets</label>
      <Combobox
        aria-labelledby={comboId}
        multiselect={true}
        placeholder="Select one or more animals"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onOptionSelect={onSelect}
        {...props}
      >
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </div>
  );
};
```

### Size

A Combobox's size can be set to `small`, `medium` (default), or `large`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '20px',
    maxWidth: '400px',
    '> div': {
      display: 'grid',
      gridTemplateRows: 'repeat(1fr)',
      justifyItems: 'start',
      gap: '2px',
    },
  },
});

export const Size = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <label id={`${comboId}-small`}>Small</label>
        <Combobox aria-labelledby={`${comboId}-small`} placeholder="Select a color" size="small" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div>
        <label htmlFor={`${comboId}-med`}>Medium</label>
        <Combobox aria-labelledby={`${comboId}-med`} placeholder="Select a color" size="medium" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div>
        <label htmlFor={`${comboId}-large`}>Large</label>
        <Combobox aria-labelledby={`${comboId}-large`} placeholder="Select a color" size="large" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>
    </div>
  );
};
```

### Virtualizer

A Combobox can use Virtualizer to display a large number of options
To manually control the maxHeight of the listbox, refer to the [positioning autoSize property](https://storybooks.fluentui.dev/react/?path=/docs/concepts-developer-positioning-components--docs#auto-size-for-small-viewport)

```tsx
/* eslint @typescript-eslint/no-deprecated: 0 */
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, Option, makeStyles, useId, useMergedRefs, useTimeout } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

// TODO: Migrate virtualizer to fluentui-contrib dependency once released
import { Virtualizer, useStaticVirtualizerMeasure } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  listbox: {
    // maxHeight will be applied only positioning autoSize set.
    maxHeight: '250px',
  },
  option: {
    height: '32px',
  },
});

export const ComboboxVirtualizer = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combobox');

  //This should include the item height (32px) and account for rowGap (2px)
  const itemHeight = 32;
  const rowGap = 2;
  const numberOfItems = 10000;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef, containerSizeRef } = useStaticVirtualizerMeasure({
    defaultItemSize: itemHeight,
    direction: 'vertical',
    // We want at least 10 additional items on each side of visible items for page up/down (+ 1 buffer)
    bufferItems: 11,
    // We need to recalculate index when at least 10 items (+1px) from the bottom or top for page up/down
    bufferSize: itemHeight * 10 + 1,
  });
  const selectedIndex = React.useRef(0);

  const styles = useStyles();
  const mergedRefs = useMergedRefs(scrollRef);
  // Scroll timer required to post scrollTo on stack post-open state change
  const [setScrollTimer, clearScrollTimer] = useTimeout();

  return (
    <div>
      <div>
        <label htmlFor={`${comboId}`}>Medium</label>
        <Combobox
          id={`${comboId}`}
          placeholder="Select a number"
          positioning={{ autoSize: true }}
          listbox={{ ref: mergedRefs, className: styles.listbox }}
          onOpenChange={(e, data) => {
            clearScrollTimer();
            if (data.open) {
              setScrollTimer(() => {
                mergedRefs.current?.scrollTo({
                  top: (itemHeight + rowGap) * selectedIndex.current,
                });
              }, 0);
            }
          }}
          onOptionSelect={(e, data) => {
            if (data.optionValue) {
              selectedIndex.current = parseInt(data.optionValue, 10);
            }
          }}
        >
          <Virtualizer
            numItems={numberOfItems}
            virtualizerLength={virtualizerLength}
            bufferItems={bufferItems}
            bufferSize={bufferSize}
            itemSize={itemHeight}
            containerSizeRef={containerSizeRef}
            gap={rowGap}
          >
            {index => {
              return (
                <Option
                  className={styles.option}
                  aria-posinset={index}
                  aria-setsize={numberOfItems}
                  key={`item-${index}`}
                  value={index.toString()}
                >
                  {`Item ${index + 1}`}
                </Option>
              );
            }}
          </Virtualizer>
        </Combobox>
      </div>
    </div>
  );
};
```

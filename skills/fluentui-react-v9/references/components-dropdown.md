# Components/Dropdown

A Dropdown is a selection component composed of a button and a list of options. The button displays the current selected item or a placeholder, and the list is visible on demand by clicking the button. Dropdowns are typically used in forms.

## Best practices

### Do

- **Provide a label for the Dropdown.**
- **Set the Option's `value` prop if the content contains JSX.** The Option value is used for keyboard accessibility to enable users to type a letter or string and jump to the matching option. The value is calculated from the children by default, but if the Option contains JSX, the `value` prop should be used to directly provide a string value.
- **Consider using `Dropdown` with outline or underline appearances.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using underline or outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding color.

### Don't

- **Use `placeholder` for label text.** Placeholder text has lower contrast than label text, and disappears once an option is selected. If used, it should only contain temporary filler text.

## Accessibility

### Do

- **Provide a label for the Dropdown.** This can be done either by using the `Field` component with a `label` prop, or by using a custom labeling technique like a custom `<label for="dropdownId">` element, `aria-label` or `aria-labelledby`.
- **Use Dropdown when you need JSX or styled options, otherwise use Select.** For simple single-select use cases, consider using `Select` for better accessibility and mobile support.
- **Use multi-select Dropdown when you have 10+ options, otherwise use a Checkbox group.** For simple multiselect use cases with less than 10 options, consider using a group of `Checkbox` components.
- **Set `inlinePopup={true}` when possible for better VoiceOver support.** The `inlinePopup` prop will cause the listbox popup to be rendered immediately after the button in the DOM. Safari does not support `aria-owns`, so this enables iOS VoiceOver swipe navigation between the button and options.
- **Review [known accessiblity issues](./?path=/docs/concepts-developer-accessibility-components-dropdown--docs).**

### Don't

- **Don't nest interactive controls in Dropdown slots or children.** The `Dropdown`'s `button` slot and children of `<Option>` components will not expose nested interactive elements to screen reader users, and additional non-`Option` children in the `listbox` slot will not be keyboard accessible.
- **Don’t place the Dropdown button on a surface which doesn’t have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements. When using underline or outline styles, ensure the color of bottom border stroke has a sufficient contrast of greater than 3 to 1 against the immediate surrounding color.

Read the [Dropdown accessibility spec](./?path=/docs/concepts-developer-accessibility-components-dropdown--docs) for more detailed information, as well as full descriptions of semantics and keyboard behavior.

## Props

| Name                     | Type                                                                                                                                                                                                                                 | Required                | Default                     | Description                                                                                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --- | -------------------------------------------------- | -------------------------------------------- |
| `root`                   | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>                                                                                | null>`                  | No                          |                                                                                                                                                                                                                                                       | The root dropdown slot                             |
| `button`                 | `NonNullable<WithSlotShorthandValue<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; }>                                                                 | null>`                  | No                          |                                                                                                                                                                                                                                                       | The primary slot, the element with role="combobox" |
| `listbox`                | `WithSlotShorthandValue<Omit<ListboxSlots, "root"> & Omit<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }, "ref"> & SelectionProps & { ...; } & RefAttributes<...>> | null`                   | No                          |                                                                                                                                                                                                                                                       | The dropdown listbox slot                          |
| `expandIcon`             | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                         | null`                   | No                          |                                                                                                                                                                                                                                                       | The dropdown arrow icon                            |
| `clearButton`            | `WithSlotShorthandValue<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; }>                                                                             | null`                   | No                          |                                                                                                                                                                                                                                                       | The dropdown clear icon                            |
| `as`                     | `"button"`                                                                                                                                                                                                                           | No                      |                             |                                                                                                                                                                                                                                                       |
| `defaultSelectedOptions` | `string[]`                                                                                                                                                                                                                           | No                      |                             | For an uncontrolled component, sets the initial selection. If this is set, the `defaultValue` prop MUST also be set.                                                                                                                                  |
| `multiselect`            | `boolean`                                                                                                                                                                                                                            | No                      | false                       | Sets the selection type to multiselect. Set this to true for multiselect, even if fully controlling selection state. This enables styles and accessibility properties to be set.                                                                      |
| `onOptionSelect`         | `((event: SelectionEvents, data: OptionOnSelectData) => void)`                                                                                                                                                                       | No                      |                             | Callback when an option is selected                                                                                                                                                                                                                   |
| `selectedOptions`        | `string[]`                                                                                                                                                                                                                           | No                      |                             | An array of selected option keys. Use this with `onOptionSelect` to directly control the selected option(s) If this is set, the `value` prop MUST also be controlled.                                                                                 |
| `onActiveOptionChange`   | `EventHandler<ActiveOptionChangeData>`                                                                                                                                                                                               | No                      |                             |                                                                                                                                                                                                                                                       |
| `mountNode`              | `HTMLElement                                                                                                                                                                                                                         | { element?: HTMLElement | null; className?: string; } | null                                                                                                                                                                                                                                                  | undefined`                                         | No  | a new element on document.body without any styling | Where the portal children are mounted on DOM |
| `appearance`             | `"outline" "underline" "filled-darker" "filled-lighter"`                                                                                                                                                                             | No                      | 'outline'                   | Controls the colors and borders of the combobox trigger.                                                                                                                                                                                              |
| `clearable`              | `boolean`                                                                                                                                                                                                                            | No                      |                             | If set, the combobox will show an icon to clear the current value.                                                                                                                                                                                    |
| `defaultOpen`            | `boolean`                                                                                                                                                                                                                            | No                      |                             | The default open state when open is uncontrolled                                                                                                                                                                                                      |
| `disableAutoFocus`       | `boolean`                                                                                                                                                                                                                            | No                      | false                       | Disable auto-focusing on the first item when mounting.                                                                                                                                                                                                |
| `inlinePopup`            | `boolean`                                                                                                                                                                                                                            | No                      |                             | Render the combobox's popup inline in the DOM. This has accessibility benefits, particularly for touch screen readers.                                                                                                                                |
| `onOpenChange`           | `((e: ComboboxBaseOpenEvents, data: ComboboxBaseOpenChangeData) => void)`                                                                                                                                                            | No                      |                             | Callback when the open/closed state of the dropdown changes                                                                                                                                                                                           |
| `open`                   | `boolean`                                                                                                                                                                                                                            | No                      |                             | Sets the open/closed state of the dropdown. Use together with onOpenChange to fully control the dropdown's visibility                                                                                                                                 |
| `placeholder`            | `string`                                                                                                                                                                                                                             | No                      |                             | If set, the placeholder will show when no value is selected                                                                                                                                                                                           |
| `positioning`            | `PositioningShorthand`                                                                                                                                                                                                               | No                      |                             | Configure the positioning of the combobox dropdown. Please refer to the [positioning documentation](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--default#anchor-to-target) for more details. @defaultvalue below |
| `size`                   | `"small" "medium" "large"`                                                                                                                                                                                                           | No                      | 'medium'                    | Controls the size of the combobox faceplate                                                                                                                                                                                                           |
| `ref`                    | `Ref<HTMLButtonElement>`                                                                                                                                                                                                             | No                      |                             |                                                                                                                                                                                                                                                       |

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

OnActiveOptionChange notifies the user when the active option in the Dropdown was changed by keyboard. To react on mouse hover events, use onMouseEnter on the invididual options.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, useId, Persona } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const ActiveOptionChange = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown');
  const styles = useStyles();
  const [activeOptionText, setActiveOptionText] = React.useState('');

  const onActiveOptionChange = React.useCallback<NonNullable<DropdownProps['onActiveOptionChange']>>(
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
      <label htmlFor={dropdownId}>Schedule a meeting</label>
      <Dropdown id={dropdownId} onActiveOptionChange={onActiveOptionChange} {...props}>
        <Option text="Katri Athokas" onMouseEnter={onMouseEnter}>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Katri Athokas"
            presence={{
              status: 'available',
            }}
            secondaryText="Available"
          />
        </Option>
        <Option text="Elvia Atkins" onMouseEnter={onMouseEnter}>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Elvia Atkins"
            presence={{
              status: 'busy',
            }}
            secondaryText="Busy"
          />
        </Option>
        <Option text="Cameron Evans" onMouseEnter={onMouseEnter}>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Cameron Evans"
            presence={{
              status: 'away',
            }}
            secondaryText="Away"
          />
        </Option>
        <Option text="Wanda Howard" onMouseEnter={onMouseEnter}>
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Wanda Howard"
            presence={{
              status: 'out-of-office',
            }}
            secondaryText="Out of office"
          />
        </Option>
      </Dropdown>
    </div>
  );
};
```

### Appearance

A Dropdown can have the following `appearance` variants:

- `outline` (default): has a border around all four sides.
- `underline`: only has a bottom border.
- `filled-darker`: no border, only a subtle background color difference against a white page.
- `filled-lighter`: no border, and a white background.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, tokens, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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
    '> h3': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    '> label': {
      color: tokens.colorNeutralForegroundInverted2,
    },
    '> h3': {
      color: tokens.colorNeutralForegroundInverted2,
    },
  },
});

export const Appearance = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <h3>Outline</h3>
        <label htmlFor={`${dropdownId}-outline`}>Select an animal</label>
        <Dropdown id={`${dropdownId}-outline`} placeholder="-" appearance="outline" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div>
        <h3>Underline</h3>
        <label htmlFor={`${dropdownId}-underline`}>Select an animal</label>
        <Dropdown id={`${dropdownId}-underline`} placeholder="-" appearance="underline" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div className={styles.filledDarker}>
        <h3>Filled Darker</h3>
        <label htmlFor={`${dropdownId}-filledDarker`}>Select an animal</label>
        <Dropdown id={`${dropdownId}-filledDarker`} placeholder="-" appearance="filled-darker" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div className={styles.filledLighter}>
        <h3>Filled Lighter</h3>
        <label htmlFor={`${dropdownId}-filledLighter`}>Select an animal</label>
        <Dropdown id={`${dropdownId}-filledLighter`} placeholder="-" appearance="filled-lighter" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>
    </div>
  );
};
```

### Clearable

A Dropdown can be clearable and let users remove their selection. Note: this is not supported in multiselect mode yet.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Label, makeStyles, Option, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Clearable = (): JSXElement => {
  const dropdownId = useId('');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={dropdownId}>Pick a color</Label>
      <Dropdown clearable id={dropdownId} placeholder="Select a color">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>
    </div>
  );
};
```

### Complex Options

Options are defined as JSX children, and can include nested elements or other components. When this is the case, the Option's `text` prop should be the plain text version of the option, and is used as the Dropdown button's value when the option is selected. Options should never contain interactive elements, such as buttons or links.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, useId, Persona } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const ComplexOptions = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown');
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label htmlFor={dropdownId}>Schedule a meeting</label>
      <Dropdown id={dropdownId} {...props}>
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
      </Dropdown>
    </div>
  );
};
```

### Controlled

A Dropdown may have controlled or controlled selection and value. When the selection is controlled or a default selection is provided, a controlled value or default value must also be defined. Otherwise, the Dropdown will not be able to display a value before the Options are rendered.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, useId, Persona } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const Controlled = (props: Partial<DropdownProps>): JSXElement => {
  const comboId = useId('combo-controlled');
  const styles = useStyles();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(['eatkins']);
  const [value, setValue] = React.useState('Elvia Atkins');

  const onOptionSelect: (typeof props)['onOptionSelect'] = (ev, data) => {
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? '');
  };

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <label htmlFor={`${comboId}-default`}>Schedule a meeting (default selection)</label>
        <Dropdown id={`${comboId}-default`} {...props} defaultValue="Elvia Atkins" defaultSelectedOptions={['eatkins']}>
          <Option text="Katri Athokas" value="kathok">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Katri Athokas"
              presence={{
                status: 'available',
              }}
              secondaryText="Available"
            />
          </Option>
          <Option text="Elvia Atkins" value="eatkins">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Elvia Atkins"
              presence={{
                status: 'busy',
              }}
              secondaryText="Busy"
            />
          </Option>
          <Option text="Cameron Evans" value="cevans">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Cameron Evans"
              presence={{
                status: 'away',
              }}
              secondaryText="Away"
            />
          </Option>
          <Option text="Wanda Howard" value="whoward">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Wanda Howard"
              presence={{
                status: 'out-of-office',
              }}
              secondaryText="Out of office"
            />
          </Option>
        </Dropdown>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${comboId}-controlled`}>Schedule a meeting (controlled selection)</label>
        <Dropdown
          id={`${comboId}-controlled`}
          {...props}
          value={value}
          selectedOptions={selectedOptions}
          onOptionSelect={onOptionSelect}
        >
          <Option text="Katri Athokas" value="kathok">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Katri Athokas"
              presence={{
                status: 'available',
              }}
              secondaryText="Available"
            />
          </Option>
          <Option text="Elvia Atkins" value="eatkins">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Elvia Atkins"
              presence={{
                status: 'busy',
              }}
              secondaryText="Busy"
            />
          </Option>
          <Option text="Cameron Evans" value="cevans">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Cameron Evans"
              presence={{
                status: 'away',
              }}
              secondaryText="Away"
            />
          </Option>
          <Option text="Wanda Howard" value="whoward">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Wanda Howard"
              presence={{
                status: 'out-of-office',
              }}
              secondaryText="Out of office"
            />
          </Option>
        </Dropdown>
      </div>
    </div>
  );
};
```

### Controlling Open And Close

The opening and close of the `Dropdown` can be controlled with your own state.
The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate
event.

_When controlling the open state of the `Dropdown`, extra effort is required to ensure that interactions are_
_still appropriate and that keyboard accessibility does not degrade._

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import type { CheckboxProps, DropdownProps } from '@fluentui/react-components';
import { Checkbox, Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';

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

export const ControllingOpenAndClose = (): JSXElement => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpenChange: DropdownProps['onOpenChange'] = (e, data) => setOpen(data.open);
  const onChange: CheckboxProps['onChange'] = (e, data) => setOpen(!!data.checked);

  const dropdownId = useId('dropdown');
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];

  return (
    <div className={styles.root}>
      <Checkbox value="open" name="state" label="open" checked={open} onChange={onChange} />
      <label htmlFor={dropdownId}>Best pet</label>
      <Dropdown id={dropdownId} placeholder="Select an animal" open={open} onOpenChange={handleOpenChange}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};
```

### Custom Options

Options and OptionGroups can be extended and customized.Here `OptionGroup` is wrapped in `CustomOptionGroup`,which adds a custom label style and takes an `options` array prop which is mapped to child Option elements.`Option` is also wrapped in `CustomOption`, which adds a custom check icon and animal icon.The `text` prop is added to `<Option>`, since the children of `<Option>` are not a simple string.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, OptionGroup, useId } from '@fluentui/react-components';
import type { DropdownProps, OptionProps, OptionGroupProps } from '@fluentui/react-components';
import {
  AnimalCat24Filled,
  AnimalDog24Filled,
  AnimalRabbit24Filled,
  AnimalTurtle24Filled,
  FoodFish24Filled,
  CheckboxChecked24Regular,
} from '@fluentui/react-icons';

const animalIcons = {
  Cat: AnimalCat24Filled,
  Dog: AnimalDog24Filled,
  Rabbit: AnimalRabbit24Filled,
  Turtle: AnimalTurtle24Filled,
  Fish: FoodFish24Filled,
};

const useCustomOptionStyles = makeStyles({
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  icon: { flex: '0 0 auto' },
  text: { flex: '1 1 auto' },
});

type CustomOptionProps = Partial<OptionProps> & {
  animal: keyof typeof animalIcons;
};

const CustomOption = (props: CustomOptionProps) => {
  const { animal, ...optionProps } = props;
  const Icon = animalIcons[animal];
  const styles = useCustomOptionStyles();
  return (
    <Option text={animal} className={styles.option} checkIcon={<CheckboxChecked24Regular />} {...optionProps}>
      <Icon className={styles.icon} />
      <span className={styles.text}>{animal}</span>
    </Option>
  );
};

const CustomOptionGroup = (props: Partial<OptionGroupProps> & { options: (keyof typeof animalIcons)[] }) => {
  const { label, options, ...optionGroupProps } = props;
  const labelSlot = typeof label === 'object' ? label : { children: label };

  return (
    <OptionGroup label={{ style: { fontStyle: 'italic' }, ...labelSlot }} {...optionGroupProps}>
      {options.map(option => (
        <CustomOption key={option} animal={option} />
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
  listbox: {
    maxHeight: '200px',
  },
});

export const CustomOptions = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown');
  const land = ['Cat', 'Dog', 'Rabbit'] as (keyof typeof animalIcons)[];
  const water = ['Fish', 'Turtle'] as (keyof typeof animalIcons)[];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label htmlFor={dropdownId}>Best pet</label>
      <Dropdown id={dropdownId} listbox={{ className: styles.listbox }} placeholder="Select an animal" {...props}>
        <CustomOptionGroup label="Land" options={land} />
        <CustomOptionGroup label="Sea" options={water} />
      </Dropdown>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const Default = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown-default');
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label htmlFor={dropdownId}>Best pet</label>
      <Dropdown id={dropdownId} placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};
```

### Disabled

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const Disabled = (props: Partial<DropdownProps>): JSXElement => {
  const comboId = useId('combo-disabled');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label htmlFor={comboId}>Best pet</label>
      <Dropdown id={comboId} disabled placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Dropdown>
    </div>
  );
};
```

### Grouped

Dropdown options can be semantically grouped with the `OptionGroup` element, with an optional group label.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, OptionGroup, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const Grouped = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown-grouped');
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label htmlFor={dropdownId}>Best pet</label>
      <Dropdown id={dropdownId} placeholder="Select an animal" {...props}>
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
      </Dropdown>
    </div>
  );
};
```

### Multiselect

Dropdown supports multiselect, and options within a multiselect will display checkbox icons.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const Multiselect = (props: Partial<DropdownProps>): JSXElement => {
  const comboId = useId('combo-multi');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label htmlFor={comboId}>Best pet</label>
      <Dropdown id={comboId} multiselect={true} placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};
```

### Size

A Dropdown's size can be set to `small`, `medium` (default), or `large`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const Size = (props: Partial<DropdownProps>): JSXElement => {
  const comboId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <h3>Small</h3>
        <label htmlFor={`${comboId}-small`}>Best pet</label>
        <Dropdown id={`${comboId}-small`} placeholder="Select an animal" size="small" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div>
        <h3>Medium</h3>
        <label htmlFor={`${comboId}-med`}>Best pet</label>
        <Dropdown id={`${comboId}-med`} placeholder="Select an animal" size="medium" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div>
        <h3>Large</h3>
        <label htmlFor={`${comboId}-large`}>Best pet</label>
        <Dropdown id={`${comboId}-large`} placeholder="Select an animal" size="large" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>
    </div>
  );
};
```

### Truncated Value

The Dropdown button slot can be customized to render child JSX, which can be used to truncate the selected value text. Dropdown options can also be customized to overflow in various ways, e.g. by allowing long words to break and wrap.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '200px',
  },
  listbox: {
    maxHeight: '200px',
  },
  // these styles wrap the value text within the dropdown button and cause it to truncate
  truncatedText: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  // these styles allow option text to break and wrap on long words, e.g. emails
  optionText: {
    overflow: 'hidden',
    overflowWrap: 'break-word',
  },
});

export const TruncatedValue = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown');
  const options = [
    'Cat',
    'Caterpillar',
    'Corgi',
    'Chupacabra',
    'Dog',
    'Ferret',
    'Fish',
    'Fox',
    'Hamster',
    'Snake',
    'SuperLongName_123456789_SomeMoreStuffToMakeItLonger@fluentui.dev',
    'Screaming hairy armadillo (Chaetophractus vellerosus)',
  ];

  const styles = useStyles();

  const placeholder = 'Select an animal';

  // show truncated option by default
  const defaultValue = options[11];
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className={styles.root}>
      <label htmlFor={dropdownId}>Best pet</label>
      <Dropdown
        id={dropdownId}
        listbox={{ className: styles.listbox }}
        button={<span className={styles.truncatedText}>{value}</span>}
        onOptionSelect={(e, data) => setValue(data.optionText ?? placeholder)}
        defaultSelectedOptions={[defaultValue]}
        defaultValue={defaultValue}
        {...props}
      >
        {options.map(option => (
          <Option key={option} text={option} disabled={option === 'Ferret'}>
            <span className={styles.optionText}>{option}</span>
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};
```

### With Field

Field can be used with Dropdown to provide a label, description, error message, and more.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Field, makeStyles, Option } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    maxWidth: '400px',
  },
});

export const WithField = (props: Partial<DropdownProps>): JSXElement => {
  const styles = useStyles();
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];
  return (
    <Field label="Best pet" required hint="Try picking 'Cat'" className={styles.root}>
      <Dropdown placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </Field>
  );
};
```

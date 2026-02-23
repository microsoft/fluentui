# Components/TagPicker

A `TagPicker` combines a text field and a dropdown giving people a way to select an option from a list or enter their own choice. It is a specialized version of a [`Combobox`](https://react.fluentui.dev/?path=/docs/components-combobox--default) where selecting an option from a list results in a [`Tag`](https://react.fluentui.dev/?path=/docs/components-tag-tag--default) being added close to the text field.

## Best practices

### Do

- **Use `aria-label` on `TagPickerInput` to provide an accessible name for the input:** This attribute helps screen readers to understand the purpose of the input, making it more accessible and inclusive.

- **Inform the user about the [deletion interaction](https://github.com/microsoft/fluentui/issues/31165) of tags when pressing Backspace:** When `TagPickerInput` is focused, pressing the Backspace key will remove the last tag. This behavior should be communicated to the user to avoid confusion.

### Don't

- **Don't use `InteractionTag` with `TagPicker`** as it is not supported at the moment. This combination may lead to unexpected behavior.

## Accessibility

Here are some accessibility edge cases scenarios we identified and users should keep in mind while using the `TagPicker` components.

### Narrator/Microsoft Edge

1. Narrator correctly disables the scan mode automatically once `TagPicker` combobox is focused, but switches scan mode back to the enabled state when trying to navigate dropdown using the `Down` or `Up` arrow key. The only way to correctly navigate the dropdown is to disable scan mode manually. This is a Narrator bug which affects not only custom combobox elements but also the `<select>` element.

### VoiceOver/Safari on macOS

1. When navigating the `TagPicker` dropdown using the `Down` or `Up` arrow keys, VoiceOver does not narrate the currently selected item in the dropdown, providing no feedback at all. This is a known VoiceOver/Safari bug related to the missing support for `aria-activedescendant`, because with VoiceOver/Google Chrome it works correctly.
2. It is neither possible using the VoiceOver keys to navigate item by item the dropdown items after expanding the dropdown. This is also a VoiceOver/Safari only related bug.

### VoiceOver/Safari on iOS

1. `TagPicker` dropdown items are not navigable at all using VoiceOver/Safari on iOS. This problem is present also in our `Combobox` component, but the example combobox by W3C enables item navigation and selection. The difference there is probably that in W3C example, the dropdown popup gets inserted after the combobox edit field, while in our components it is inserted at the end of the DOM.

## Props

| Name                     | Type                                                     | Required | Default   | Description                                                                                                                                                                                                                                           |
| ------------------------ | -------------------------------------------------------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultOpen`            | `boolean`                                                | No       |           | The default open state when open is uncontrolled                                                                                                                                                                                                      |
| `open`                   | `boolean`                                                | No       |           | Sets the open/closed state of the dropdown. Use together with onOpenChange to fully control the dropdown's visibility                                                                                                                                 |
| `positioning`            | `PositioningShorthand`                                   | No       |           | Configure the positioning of the combobox dropdown. Please refer to the [positioning documentation](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--default#anchor-to-target) for more details. @defaultvalue below |
| `selectedOptions`        | `string[]`                                               | No       |           | An array of selected option keys. Use this with `onOptionSelect` to directly control the selected option(s) If this is set, the `value` prop MUST also be controlled.                                                                                 |
| `defaultSelectedOptions` | `string[]`                                               | No       |           | For an uncontrolled component, sets the initial selection. If this is set, the `defaultValue` prop MUST also be set.                                                                                                                                  |
| `disableAutoFocus`       | `boolean`                                                | No       | false     | Disable auto-focusing on the first item when mounting.                                                                                                                                                                                                |
| `size`                   | `"medium" "large" "extra-large"`                         | No       |           |                                                                                                                                                                                                                                                       |
| `appearance`             | `"outline" "underline" "filled-darker" "filled-lighter"` | No       | 'outline' | Controls the colors and borders of the combobox trigger.                                                                                                                                                                                              |
| `noPopover`              | `boolean`                                                | No       | false     | By default, when a single children is provided, the TagPicker will assume that the children is a popover. By setting this prop to true, the children will be treated as a trigger instead.                                                            |
| `onOpenChange`           | `EventHandler<TagPickerOnOpenChangeData>`                | No       |           |                                                                                                                                                                                                                                                       |
| `onOptionSelect`         | `EventHandler<TagPickerOnOptionSelectData>`              | No       |           |                                                                                                                                                                                                                                                       |
| `inline`                 | `boolean`                                                | No       | false     | TagPickers are rendered out of DOM order on `document.body` by default, use this to render the popover in DOM order                                                                                                                                   |

## Subcomponents

### TagPickerControl

TagPickerControl component -
A TagPickerControl is a composite component that controls actions and state for a TagPicker.

#### Props

| Name              | Type                                                                                                                                         | Required | Default | Description |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expandIcon`      | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |             | The dropdown arrow icon                                                                                                                           |
| `secondaryAction` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |             | A secondary action should be a button-like element to be rendered right after the trigger responsible for opening/closing the tag picker popover. |
| `as`              | `"div"`                                                                                                                                      | No       |         |             |
| `ref`             | `Ref<HTMLDivElement>`                                                                                                                        | No       |         |             |

### TagPickerGroup

TagPickerGroup component -
A TagPickerGroup is a composite component that allows users to group tags together.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### TagPickerButton

TagPickerButton component -
A TagPickerButton is an alternative to TagPickerInput that does not include an input field.

#### Props

| Name         | Type                                                     | Required | Default   | Description                                              |
| ------------ | -------------------------------------------------------- | -------- | --------- | -------------------------------------------------------- |
| `as`         | `"button"`                                               | No       |           |                                                          |
| `size`       | `"small" "medium" "large"`                               | No       | 'medium'  | Controls the size of the combobox faceplate              |
| `appearance` | `"outline" "underline" "filled-darker" "filled-lighter"` | No       | 'outline' | Controls the colors and borders of the combobox trigger. |
| `ref`        | `Ref<HTMLButtonElement>`                                 | No       |           |                                                          |

### TagPickerInput

TagPickerInput component -
A TagPickerInput is a composite component that allows users to query tags.

#### Props

| Name         | Type                                                     | Required | Default   | Description                                                        |
| ------------ | -------------------------------------------------------- | -------- | --------- | ------------------------------------------------------------------ |
| `as`         | `"input"`                                                | No       |           |                                                                    |
| `appearance` | `"outline" "underline" "filled-darker" "filled-lighter"` | No       | 'outline' | Controls the colors and borders of the combobox trigger.           |
| `clearable`  | `boolean`                                                | No       |           | If set, the combobox will show an icon to clear the current value. |
| `ref`        | `Ref<HTMLInputElement>`                                  | No       |           |                                                                    |

### TagPickerList

TagPickerList component -
A TagPickerList is a composite component that allows users to display a list of tag options to be selected.

#### Props

| Name                     | Type                                                           | Required | Default | Description                                                                                                                                                                            |
| ------------------------ | -------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                     | `"div"`                                                        | No       |         |                                                                                                                                                                                        |
| `selectedOptions`        | `string[]`                                                     | No       |         | An array of selected option keys. Use this with `onOptionSelect` to directly control the selected option(s) If this is set, the `value` prop MUST also be controlled.                  |
| `defaultSelectedOptions` | `string[]`                                                     | No       |         | For an uncontrolled component, sets the initial selection. If this is set, the `defaultValue` prop MUST also be set.                                                                   |
| `disableAutoFocus`       | `boolean`                                                      | No       | false   | Disable auto-focusing on the first item when mounting. @deprecated TagPickerList is always rendered within a TagPicker which manages active descendant focus. This prop has no effect. |
| `multiselect`            | `boolean`                                                      | No       | false   | Sets the selection type to multiselect. Set this to true for multiselect, even if fully controlling selection state. This enables styles and accessibility properties to be set.       |
| `onOptionSelect`         | `((event: SelectionEvents, data: OptionOnSelectData) => void)` | No       |         | Callback when an option is selected                                                                                                                                                    |
| `ref`                    | `Ref<HTMLDivElement>`                                          | No       |         |                                                                                                                                                                                        |

### TagPickerOption

TagPickerOption component -
A TagPickerOption is a composite component that allows users to select tags.

#### Props

| Name               | Type                                                                                                                                         | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `media`            | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>    | null`    | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |     |
| `secondaryContent` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |     |
| `as`               | `"div"`                                                                                                                                      | No       |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `value`            | `string`                                                                                                                                     | Yes      |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `text`             | `string`                                                                                                                                     | No       |         | An optional override the string value of the Option's display text, defaulting to the Option's child content. This is used as the Dropdown button's or Combobox input's value when the option is selected, and as the comparison for type-to-find keyboard functionality. The string value of the Option's display text when the Option's children are not a string. This is used as the Dropdown button's or Combobox input's value when the option is selected, and as the comparison for type-to-find keyboard functionality. |
| `ref`              | `Ref<HTMLDivElement>`                                                                                                                        | No       |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

## Examples

### Appearance

A `TagPicker` can have the following appearance variants:

- `outline` (default): has a border around all four sides.
- `underline`: only has a bottom border.
- `filled-darker`: no border, only a subtle background color difference against a white page. All tags will be by default `outline`.
- `filled-lighter`: no border, and a white background.

This is equivalent to the [`Combobox`](https://react.fluentui.dev/?path=/docs/components-combobox--default#appearance) `appearance` property.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, tokens, makeStyles, Field } from '@fluentui/react-components';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

const Example = ({ appearance }: Pick<TagPickerProps, 'appearance'>) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  const labelColor =
    appearance === 'filled-lighter' || appearance === 'filled-darker'
      ? tokens.colorNeutralForegroundInverted2
      : tokens.colorNeutralForeground1;

  const label = <span style={{ color: labelColor }}>Select Employees</span>;

  return (
    <Field label={label} style={{ maxWidth: 400 }}>
      <TagPicker appearance={appearance} onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0 ? (
            tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          ) : (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};

const useStyles = makeStyles({
  darkBG: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted2,
    padding: '20px',
    marginBlock: '10px',
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();
  return (
    <>
      <div>
        <h1>Outline</h1>
        <Example appearance="outline" />
      </div>
      <div>
        <h1>Underline</h1>
        <Example appearance="underline" />
      </div>
      <div className={styles.darkBG}>
        <h1>Filled Darker</h1>
        <Example appearance="filled-darker" />
      </div>
      <div className={styles.darkBG}>
        <h1>Filled Lighter</h1>
        <Example appearance="filled-lighter" />
      </div>
    </>
  );
};
```

### Button

The component `TagPickerButton` renders an "invisible" button that can be used instead of `TagPickerInput` to opt-out of a text field and to provide something similar to a [`Dropdown`](https://react.fluentui.dev/?path=/docs/components-dropdown--default) behavior.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerButton,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const Button = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerButton aria-label="Select Employees" />
        </TagPickerControl>

        <TagPickerList>
          {tagPickerOptions.length > 0 ? (
            tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          ) : (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const Default = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0 ? (
            tagPickerOptions.map(option => (
              <TagPickerOption
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          ) : (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
```

### Disabled

A `TagPicker` can be `disabled`. Disabling `TagPicker` will disable the access to the `TagPickerList`, but it'll still allow modifications to the `selectedOptions`.

> The `Tag` component can also be disabled, in the case where that given tag should not be reachable

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const Disabled = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(options.slice(0, 4));
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker disabled onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0 ? (
            tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          ) : (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
```

### Expand Icon

`TagPickerControl` provides an `expandIcon` slot for modifying the default `expandIcon` chevron.
You can also remove the slot entirely by providing `null` to it.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';
import { ArrowDownFilled } from '@fluentui/react-icons';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const ExpandIcon = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (event, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl expandIcon={<ArrowDownFilled />}>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0 ? (
            tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          ) : (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
```

### Filtering

`TagPicker` can take advantage of the provided `useTagPickerFilter` hook to filter the options based on the user-typed string. It can be configured for a custom filter function, custom message, and custom render function.

`disableAutoFocus` is used here to control whether the first option is automatically focused when the popover opens. When the user opens the popover via keyboard (no query), auto focus is disabled to avoid jumping to the first option. When the user types a query, auto focus is enabled so the first matching option is highlighted.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
  useTagPickerFilter,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const Filtering = (): JSXElement => {
  const [query, setQuery] = React.useState<string>('');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  // disable auto focus when no query is present (e.g. opened by keyboard)
  // enable auto focus when query is present (e.g. opened by typing)
  const disableAutoFocus = query.length === 0;
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-matches') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
    setQuery('');
  };

  const children = useTagPickerFilter({
    query,
    options,
    noOptionsElement: <TagPickerOption value="no-matches">We couldn't find any matches</TagPickerOption>,
    renderOption: option => (
      <TagPickerOption
        secondaryContent="Microsoft FTE"
        key={option}
        media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
        value={option}
      >
        {option}
      </TagPickerOption>
    ),

    filter: option => !selectedOptions.includes(option) && option.toLowerCase().includes(query.toLowerCase()),
  });
  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions} disableAutoFocus={disableAutoFocus}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" value={query} onChange={e => setQuery(e.target.value)} />
        </TagPickerControl>

        <TagPickerList>{children}</TagPickerList>
      </TagPicker>
    </Field>
  );
};
```

### Grouped

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
  TagPickerOptionGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

const managers = ['John Doe', 'Jane Doe', 'Max Mustermann', 'Erika Mustermann'];
const devs = ['Pierre Dupont', 'Amelie Dupont', 'Mario Rossi', 'Maria Rossi'];

export const Grouped = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const unSelectedManagers = managers.filter(option => !selectedOptions.includes(option));
  const unSelectedDevs = devs.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {unSelectedManagers.length === 0 && unSelectedDevs.length === 0 && (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
          {unSelectedManagers.length > 0 && (
            <TagPickerOptionGroup label="Managers">
              {unSelectedManagers.map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
            </TagPickerOptionGroup>
          )}
          {unSelectedDevs.length > 0 && (
            <TagPickerOptionGroup label="Devs">
              {unSelectedDevs.map(option => (
                <TagPickerOption
                  secondaryContent="Microsoft FTE"
                  media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                  value={option}
                  key={option}
                >
                  {option}
                </TagPickerOption>
              ))}
            </TagPickerOptionGroup>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
```

### No Popover

You can use the `TagPicker` without the popover with the list of options by providing the `noPopover` property. This is useful when you want to allow users to input their own tags. All you have to do is control the `TagPickerInput` value and handle the `onKeyDown` event to add the tag to the `TagPicker` when the user presses the Enter key.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

export const NoPopover = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue) {
      setInputValue('');
      setSelectedOptions(curr => (curr.includes(inputValue) ? curr : [...curr, inputValue]));
    }
  };

  return (
    <Field label="Add Employees" style={{ maxWidth: 400 }}>
      <TagPicker noPopover onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map((option, index) => (
              <Tag
                key={index}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label="Add Employees"
          />
        </TagPickerControl>
      </TagPicker>
    </Field>
  );
};
```

### Secondary Action

`TagPickerControl` provides a `secondaryAction` slot for possible extra functionalities that may be desired. `secondaryAction` slot is `absolute` positioned on the top right corner of the control component together with `expandIcon` slot.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Button, Field } from '@fluentui/react-components';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const SecondaryAction = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (event, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const handleAllClear: React.MouseEventHandler = event => {
    setSelectedOptions([]);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl
          secondaryAction={
            <Button appearance="transparent" size="small" shape="rounded" onClick={handleAllClear}>
              All Clear
            </Button>
          }
        >
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0 ? (
            tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          ) : (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
```

### Single Line

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
  makeStyles,
  tagPickerGroupClassNames,
  useOverflowCount,
  TagPickerInputProps,
  useTagPickerContext_unstable,
  TagProps,
  Tag,
  Avatar,
  Overflow,
  OverflowItem,
} from '@fluentui/react-components';
import { ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  focusedExpandIcon: { alignSelf: 'flex-end' },
  countButton: { minWidth: 0 },
  control: {
    flexWrap: 'nowrap',
    display: 'flex',
    flexGrow: 1,
    minWidth: 0,
    overflow: 'hidden',
    [`& > .${tagPickerGroupClassNames.root}`]: {
      flexWrap: 'nowrap',
    },
    ':focus-within': {
      flexWrap: 'wrap',
      [`& > .${tagPickerGroupClassNames.root}`]: {
        flexWrap: 'wrap',
      },
    },
  },
});

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

type ExpandIconProps = { open: boolean; focus: boolean };

const ExpandIcon = (props: ExpandIconProps) => {
  const overflowCount = useOverflowCount();

  if (props.open) {
    return <ChevronUpRegular />;
  }
  if (overflowCount === 0 || props.focus) {
    return <ChevronDownRegular />;
  }
  return null;
};

const OverFlowCountTag = (props: TagProps) => {
  const overflowCount = useOverflowCount();
  const styles = useStyles();
  if (overflowCount === 0) {
    return null;
  }
  return (
    <Tag
      as="span"
      role={undefined}
      dismissible={false}
      aria-hidden
      tabIndex={-1}
      {...props}
      className={styles.countButton}
    >
      +{overflowCount}
    </Tag>
  );
};

type CustomTagPickerInputProps = TagPickerInputProps & { focus: boolean };

const CustomTagPickerInput = React.forwardRef<HTMLInputElement, CustomTagPickerInputProps>(
  ({ focus, onMouseDown, placeholder, ...rest }, ref) => {
    const overflowCount = useOverflowCount();
    const selectedOptionsAmount = useTagPickerContext_unstable(ctx => ctx.selectedOptions.length);
    return (
      <TagPickerInput
        ref={ref}
        {...rest}
        placeholder={selectedOptionsAmount === 0 || (overflowCount > 0 && focus) ? placeholder : undefined}
      />
    );
  },
);

export const SingleLine = (): JSXElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  const [hasFocus, setFocus] = React.useState(false);

  const handleOpenChange: TagPickerProps['onOpenChange'] = (_, data) => setOpen(data.open);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }
    setFocus(false);
  };

  const handleOverflowCountTagMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <TagPicker
      open={open}
      onOpenChange={handleOpenChange}
      onOptionSelect={onOptionSelect}
      selectedOptions={selectedOptions}
    >
      {/* 24 = min input size */}
      {/* 30 = padding right */}
      {/* 2 = gap between input and tags */}
      {/* 4 = gap between tags */}
      <Overflow minimumVisible={1} padding={24 + 30 + 2 + selectedOptions.length * 4}>
        <TagPickerControl
          style={{ maxWidth: 400 }}
          expandIcon={{
            className: hasFocus ? styles.focusedExpandIcon : undefined,
            children: <ExpandIcon focus={hasFocus} open={open} />,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.control}
        >
          <TagPickerGroup>
            {selectedOptions.map(option => (
              <OverflowItem id={option} key={option}>
                <Tag
                  // force style to display the tag even if it's overflowing when focused
                  style={hasFocus ? { display: 'inline-grid' } : undefined}
                  key={option}
                  shape="rounded"
                  media={<Avatar aria-hidden name={option} color="colorful" />}
                  value={option}
                >
                  {option}
                </Tag>
              </OverflowItem>
            ))}
            {!open && !hasFocus ? <OverFlowCountTag onMouseDown={handleOverflowCountTagMouseDown} /> : null}
          </TagPickerGroup>
          <CustomTagPickerInput
            ref={inputRef}
            focus={hasFocus}
            placeholder="Select Employees"
            aria-label="Select Employees"
          />
        </TagPickerControl>
      </Overflow>
      <TagPickerList>
        {tagPickerOptions.length > 0
          ? tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          : 'No options available'}
      </TagPickerList>
    </TagPicker>
  );
};
```

### Single Select

By default, the `TagPicker` allows you to have multiple tags selected . To enable single selection, you can manage the selected options state yourself and pass only one selected option to the `TagPicker` component.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

export const SingleSelect = (): JSXElement => {
  const [selectedOption, setSelectedOption] = React.useState<string | undefined>();
  const selectedOptions = React.useMemo(() => (selectedOption ? [selectedOption] : []), [selectedOption]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    setSelectedOption(selectedOption === data.value ? undefined : data.value);
  };

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          {selectedOption && (
            <TagPickerGroup aria-label="Selected Employees">
              <Tag
                key={selectedOption}
                shape="rounded"
                media={<Avatar aria-hidden name={selectedOption} color="colorful" />}
                value={selectedOption}
              >
                {selectedOption}
              </Tag>
            </TagPickerGroup>
          )}
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {options
            .filter(option => selectedOption !== option)
            .map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
```

### Size

A `TagPicker`'s size can be set to `medium` (default), `large` or `extra-large`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, Field } from '@fluentui/react-components';

const options = [
  'John Doe',
  'Jane Doe',
  'Max Mustermann',
  'Erika Mustermann',
  'Pierre Dupont',
  'Amelie Dupont',
  'Mario Rossi',
  'Maria Rossi',
];

const Example = ({ size }: Pick<TagPickerProps, 'size'>) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker size={size} onOptionSelect={onOptionSelect} selectedOptions={selectedOptions}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option}
                shape="rounded"
                media={<Avatar aria-hidden name={option} color="colorful" />}
                value={option}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0 ? (
            tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent="Microsoft FTE"
                media={<Avatar shape="square" aria-hidden name={option} color="colorful" />}
                value={option}
                key={option}
              >
                {option}
              </TagPickerOption>
            ))
          ) : (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};

export const Size = (): JSXElement => (
  <>
    <div>
      <h4>Extra Large</h4>
      <Example size="extra-large" />
    </div>
    <div>
      <h4>Large</h4>
      <Example size="large" />
    </div>
    <div>
      <h4>Medium</h4>
      <Example size="medium" />
    </div>
  </>
);
```

### Truncated Text

Text truncation is a common pattern used to handle long text that doesn't fit within the available space. There are all sorts of ways to truncate text, in this example we're show casing two ways to truncate text:

- Using CSS to truncate text with ellipsis when the element reaches the end of its container.
- Using fixed width to truncate text with ellipsis when the text is longer than a certain width (50px in this case).

We do not support text truncation out of the box, as it's a complex and opinionated problem. However, you can easily achieve text truncation by using patterns like the ones shown in this example.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';
import { Tag, Avatar, makeStyles, mergeClasses, Field } from '@fluentui/react-components';

type Option = { value: string; fixedWidth?: boolean };
const options: Option[] = [
  { value: 'John Doe' },
  { value: 'Jane Doe' },
  { value: 'Max Mustermann' },
  { value: 'Erika Mustermann' },
  { value: 'Pierre Dupont' },
  { value: 'Amelie Dupont' },
  { value: 'Maria Rossi' },
  {
    value: 'This tag has text truncation based on a fixed width of 50px',
    fixedWidth: true,
  },
  {
    value:
      'This tag has text truncation based on its container width. This is a long text that will be truncated when it reaches the end of the container.',
  },
];

const useStyles = makeStyles({
  tagTruncatedPrimaryText: {
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
  tagPrimaryTextFixedWidth: {
    width: '50px',
  },
  optionContent: {
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
  optionSecondaryContent: {
    whiteSpace: 'nowrap',
  },
});

export const TruncatedText = (): JSXElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(options);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions.map(option => options.find(o => o.value === option)!));
  };
  const tagPickerOptions = options.filter(option => !selectedOptions.includes(option));
  const styles = useStyles();

  return (
    <Field label="Select Employees" style={{ maxWidth: 400 }}>
      <TagPicker onOptionSelect={onOptionSelect} selectedOptions={selectedOptions.map(option => option.value)}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map(option => (
              <Tag
                key={option.value}
                shape="rounded"
                media={<Avatar aria-hidden name={option.value} color="colorful" />}
                value={option.value}
                title={option.value}
                primaryText={{
                  className: mergeClasses(
                    styles.tagTruncatedPrimaryText,
                    option.fixedWidth && styles.tagPrimaryTextFixedWidth,
                  ),
                }}
              >
                {option.value}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput aria-label="Select Employees" />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0 ? (
            tagPickerOptions.map(option => (
              <TagPickerOption
                secondaryContent={{
                  children: 'Microsoft FTE',
                  className: styles.optionSecondaryContent,
                }}
                media={<Avatar shape="square" aria-hidden name={option.value} color="colorful" />}
                value={option.value}
                key={option.value}
                title={option.value}
                text={option.value}
              >
                <div className={styles.optionContent}>{option.value}</div>
              </TagPickerOption>
            ))
          ) : (
            <TagPickerOption value="no-options">No options available</TagPickerOption>
          )}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
```

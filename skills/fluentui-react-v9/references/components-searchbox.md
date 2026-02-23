# Components/SearchBox

<!-- Don't allow prettier to collapse code block into single line -->
<!-- prettier-ignore -->
> ```jsx
>
> import { SearchBox } from '@fluentui/react-components';
>
> ```

The `SearchBox` component allows the users to access information with ease, providing flexibility and the ability to clear and filter the search.

## Best practices

### Do

- **Consider wrapping `SearchBox` in a role="search" container for top-level site or app search fields.** This role exposes the search field as a landmark, and makes it easier to find for screen reader users. It should not be used unless the SearchBox is the primary search area for the entire site or app.

- **Consider using `SearchBox` with underline or outline appearances.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using underline or outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding.

### Don't

- **Don't place `SearchBox` on a surface which doesn't have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements.

## Props

| Name            | Type                                                                                                                                                     | Required | Default   | Description                                                                                                                                                                                                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`          | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null>`   | No        |                                                                                                                                                                                                                                                                                                 | Wrapper element which visually appears to be the input and is used for borders, focus styling, etc. (A wrapper is needed to properly position `contentBefore` and `contentAfter` relative to `input`.) The root slot receives the `className` and `style` specified directly on the `<Input>`. All other top-level native props will be applied to the primary slot, `input`. |
| `input`         | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                          | No       |           | The actual `<input>` element. `type="text"` will be automatically applied unless overridden. This is the "primary" slot, so native props specified directly on the `<Input>` will go here (except `className` and `style`, which go to the `root` slot). The top-level `ref` will also go here. |
| `as`            | `"input"`                                                                                                                                                | No       |           |                                                                                                                                                                                                                                                                                                 |
| `contentBefore` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>             | null`    | No        |                                                                                                                                                                                                                                                                                                 | Element before the input text, within the input border                                                                                                                                                                                                                                                                                                                        |
| `contentAfter`  | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>             | null`    | No        |                                                                                                                                                                                                                                                                                                 | Element after the input text, within the input border                                                                                                                                                                                                                                                                                                                         |
| `dismiss`       | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>             | null`    | No        |                                                                                                                                                                                                                                                                                                 | Last element in the input, within the input border                                                                                                                                                                                                                                                                                                                            |
| `defaultValue`  | `string`                                                                                                                                                 | No       |           | Default value of the input. Provide this if the input should be an uncontrolled component which tracks its current state internally; otherwise, use `value`. (This prop is mutually exclusive with `value`.)                                                                                    |
| `size`          | `"small" "medium" "large"`                                                                                                                               | No       | 'medium'  | Size of the input (changes the font size and spacing).                                                                                                                                                                                                                                          |
| `appearance`    | `"outline" "underline" "filled-darker" "filled-lighter" "filled-darker-shadow" "filled-lighter-shadow"`                                                  | No       | 'outline' |

Note: 'filled-darker-shadow' and 'filled-lighter-shadow' are deprecated and will be removed in the future. | Controls the colors and borders of the input. |
| `type` | `"number" "search" "time" "text" "tel" "url" "email" "date" "datetime-local" "month" "password" "week"` | No | 'text' | An input can have different text-based [types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#input_types) based on the type of value the user will enter. Note that no custom styling is currently applied for alternative types, and some types may activate browser-default styling which does not match the Fluent design language. (For non-text-based types such as `button` or `checkbox`, use the appropriate component or an `<input>` element instead.) |
| `value` | `string` | No | | Current value of the input. Provide this if the input is a controlled component where you are maintaining its current state; otherwise, use `defaultValue`. (This prop is mutually exclusive with `defaultValue`.) |
| `onChange` | `((event: SearchBoxChangeEvent, data: InputOnChangeData) => void)` | No | | Custom onChange callback. Will be traditionally supplied with a React.ChangeEvent<HTMLInputElement> for usual character entry. When the dismiss button is clicked, this will be called with an event of type React.MouseEvent<HTMLSpanElement> and an empty string as the `value` property of the data parameter |
| `ref` | `Ref<HTMLInputElement>` | No | | |

## Examples

### Appearance

A SearchBox can have different appearances.
The colors adjacent to the SearchBox should have a sufficient contrast. Particularly, the color of SearchBox with
filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
surrounding color to pass accessibility requirements.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, mergeClasses, SearchBox, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
  filledLighterLabel: {
    color: tokens.colorNeutralForegroundInverted2,
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
  filledDarkerLabel: {
    color: tokens.colorNeutralForegroundInverted2,
  },
  fieldWrapper: {
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.base}>
      <Field className={styles.fieldWrapper} label="Outline appearance (default)">
        <SearchBox appearance="outline" />
      </Field>

      <Field className={styles.fieldWrapper} label="Underline appearance">
        <SearchBox appearance="underline" />
      </Field>

      <Field
        className={mergeClasses(styles.fieldWrapper, styles.filledLighter)}
        label={{
          children: 'Filled lighter appearance',
          className: styles.filledLighterLabel,
        }}
      >
        <SearchBox appearance="filled-lighter" />
      </Field>

      <Field
        className={mergeClasses(styles.fieldWrapper, styles.filledDarker)}
        label={{
          children: 'Filled darker appearance',
          className: styles.filledDarkerLabel,
        }}
      >
        <SearchBox appearance="filled-darker" />
      </Field>
    </div>
  );
};
```

### Content before/after

A SearchBox supports a custom element such as an icon or a button before the input text. Additionally, a SearchBox supports an custom element that appears on focus, following the input text and before the dismiss button. These elements are displayed inside the SearchBox border.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, ButtonProps, Field, makeStyles, SearchBox, Text, tokens } from '@fluentui/react-components';
import { PersonRegular, MicRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldWrapper: {
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },
});

const MicButton: React.FC<ButtonProps> = props => {
  return <Button {...props} appearance="transparent" icon={<MicRegular />} size="small" />;
};

export const ContentBeforeAfter = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Field
        className={styles.fieldWrapper}
        label="Search by name"
        hint={
          <>
            A SearchBox with a custom icon in the <code>contentBefore</code> slot.
          </>
        }
      >
        <SearchBox contentBefore={<PersonRegular />} />
      </Field>

      <Field
        className={styles.fieldWrapper}
        label="Search by voice"
        hint={
          <>
            A SearchBox with a button in the <code>contentAfter</code> slot.
          </>
        }
      >
        <SearchBox contentAfter={<MicButton aria-label="Search by voice" />} />
      </Field>

      <Field
        className={styles.fieldWrapper}
        label="Search with filter"
        hint={
          <>
            A SearchBox with a presentational value in the <code>contentBefore</code> slot and another presentational
            value in the <code>contentAfter</code> slot.
          </>
        }
      >
        <SearchBox contentBefore={<Text size={400}>Search:</Text>} contentAfter={<Text size={400}>Filter</Text>} />
      </Field>
    </div>
  );
};
```

### Controlled

A SearchBox can be controlled: the consuming component tracks the SearchBox's value in its state and manually handles all updates.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, InputOnChangeData, SearchBox } from '@fluentui/react-components';
import type { SearchBoxChangeEvent } from '@fluentui/react-components';

export const Controlled = (): JSXElement => {
  const [value, setValue] = React.useState('initial value');
  const [valid, setValid] = React.useState(true);

  const onChange: (ev: SearchBoxChangeEvent, data: InputOnChangeData) => void = (_, data) => {
    if (data.value.length <= 20) {
      setValue(data.value);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <Field
      label="Controlled SearchBox limiting the value to 20 characters"
      validationState={valid ? 'none' : 'warning'}
      validationMessage={valid ? '' : 'Input is limited to 20 characters.'}
    >
      <SearchBox value={value} onChange={onChange} />
    </Field>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import type { ArgTypes } from '@storybook/react-webpack5';
import { Field, SearchBox } from '@fluentui/react-components';
import type { SearchBoxProps } from '@fluentui/react-components';

export const Default = (props: SearchBoxProps): JSXElement => {
  return (
    <Field label="Sample SearchBox">
      <SearchBox {...props} />
    </Field>
  );
};

const argTypes: ArgTypes = {
  // Add these native props to the props table and controls pane
  placeholder: {
    description:
      'Placeholder text for the SearchBox. If using this instead of a label (which is ' +
      'not recommended), be sure to provide an `aria-label` for screen reader users.',
    type: { name: 'string', required: false }, // for inferring control type
    table: { type: { summary: 'string' } }, // for showing type in prop table
  },
  disabled: {
    description: 'Whether the SearchBox is disabled',
    type: { name: 'boolean', required: false },
    table: { type: { summary: 'boolean' } },
  },
  // Hide these from the props table and controls pane
  children: { table: { disable: true } },
  as: { table: { disable: true } },
};
```

### Disabled

A SearchBox can be disabled.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, SearchBox } from '@fluentui/react-components';

export const Disabled = (): JSXElement => {
  return (
    <Field label="Disabled SearchBox">
      <SearchBox disabled defaultValue="disabled value" />
    </Field>
  );
};
```

### Placeholder

A SearchBox can have placeholder text. If using the placeholder as a label (which is not recommended for usability), be sure to provide an `aria-label` for screen reader users.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, SearchBox } from '@fluentui/react-components';

export const Placeholder = (): JSXElement => {
  return (
    <Field label="SearchBox with a placeholder">
      <SearchBox placeholder="This is a placeholder" />
    </Field>
  );
};
```

### Size

A SearchBox can have different sizes.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, SearchBox, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldWrapper: {
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },
});

export const Size = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Field className={styles.fieldWrapper} label="Small SearchBox">
        <SearchBox size="small" />
      </Field>

      <Field className={styles.fieldWrapper} label="Medium SearchBox">
        <SearchBox size="medium" />
      </Field>

      <Field className={styles.fieldWrapper} label="Large SearchBox">
        <SearchBox size="large" />
      </Field>
    </div>
  );
};
```

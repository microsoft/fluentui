# Components/Select

A Select allows one option to be selected from multiple options. The Select component is a wrapper around the native `<select>` element.

## Best practices

### Do

- **Consider using `Select` with underline or outline appearances.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using underline or outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding.

### Don't

- **Don’t place `Select` on a surface which doesn’t have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements.

## Props

| Name         | Type                                                                                                                                                                 | Required | Default   | Description                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | ------------------------------------------------------------------------------- | ------------------------------------------- |
| `root`       | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>             | null>`   | No        |                                                                                 |                                             |
| `select`     | `NonNullable<WithSlotShorthandValue<{ as?: "select"; } & Omit<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, "children"> & { ...; }> | null>`   | No        |                                                                                 | Primary slot: the actual `<select>` element |
| `as`         | `"select"`                                                                                                                                                           | No       |           |                                                                                 |
| `icon`       | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                         | null`    | No        |                                                                                 | the icon, typically a down arrow            |
| `appearance` | `"outline" "underline" "filled-darker" "filled-lighter"`                                                                                                             | No       | 'outline' | Controls the colors and borders of the Select.                                  |
| `onChange`   | `((ev: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) => void)`                                                                                           | No       |           | Called when the user changes the select element's value by selecting an option. |
| `size`       | `"small" "medium" "large"`                                                                                                                                           | No       | 'medium'  | Matches the Input sizes                                                         |
| `ref`        | `Ref<HTMLSelectElement>`                                                                                                                                             | No       |           |                                                                                 |

## Examples

### Appearance

Select can have different appearances.
The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with
filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
surrounding color to pass accessibility requirements.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, mergeClasses, Select, tokens, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },

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

export const Appearance = (): JSXElement => {
  const styles = useStyles();
  const selectId = useId();

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <label htmlFor={`${selectId}-outline`}>Outline</label>
        <Select id={`${selectId}-outline`} appearance="outline">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${selectId}-underline`}>Underline</label>
        <Select id={`${selectId}-underline`} appearance="underline">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>

      <div className={mergeClasses(styles.field, styles.filledLighter)}>
        <label htmlFor={`${selectId}-filledLighter`}>Filled Lighter</label>
        <Select id={`${selectId}-filledLighter`} appearance="filled-lighter">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>

      <div className={mergeClasses(styles.field, styles.filledDarker)}>
        <label htmlFor={`${selectId}-filledDarker`}>Filled Darker</label>
        <Select id={`${selectId}-filledDarker`} appearance="filled-darker">
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>
    </div>
  );
};
```

### Controlled

The value of a Select can be controlled by updating the `selected` prop on `option` elements.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Select, useId } from '@fluentui/react-components';
import type { SelectProps } from '@fluentui/react-components';

export const Controlled = (): JSXElement => {
  const selectId = useId();
  const [value, setValue] = React.useState('Red');

  const onChange: SelectProps['onChange'] = (event, data) => {
    setValue(data.value);
  };

  return (
    <>
      <label htmlFor={selectId}>Color</label>
      <Select id={selectId} onChange={onChange} value={value}>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
      <button onClick={() => setValue('Blue')}>Select Blue</button>
    </>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Select, useId } from '@fluentui/react-components';
import type { SelectProps } from '@fluentui/react-components';

export const Default = (props: SelectProps): JSXElement => {
  const selectId = useId();

  return (
    <>
      <label htmlFor={selectId}>Color</label>
      <Select id={selectId} {...props}>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};
```

### Disabled

A Select can be disabled through the native `disabled` prop

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Select, useId } from '@fluentui/react-components';

export const Disabled = (): JSXElement => {
  const selectId = useId();

  return (
    <>
      <label htmlFor={selectId}>Color</label>
      <Select disabled id={selectId}>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};
```

### Initial Value

A Select can have its initial value defined by using the `defaultValue` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Select, useId } from '@fluentui/react-components';

export const InitialValue = (): JSXElement => {
  const selectId = useId();

  return (
    <>
      <label htmlFor={selectId}>Color</label>
      <Select defaultValue="Green" id={selectId}>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};
```

### Size

A Select's size can be set to `small`, `medium` (default), or `large`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Select, useId } from '@fluentui/react-components';

export const Size = (): JSXElement => {
  const selectId = useId();

  return (
    <>
      <label htmlFor={`${selectId}-small`}>Small</label>
      <Select id={`${selectId}-small`} size="small">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>

      <label htmlFor={`${selectId}-med`}>Medium</label>
      <Select id={`${selectId}-med`} size="medium">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>

      <label htmlFor={`${selectId}-large`}>Large</label>
      <Select id={`${selectId}-large`} size="large">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};
```

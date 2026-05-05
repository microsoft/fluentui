# Components/SpinButton

SpinButtons are used to allow numerical and non-numerical input bounded between minimum and maximum values with buttons to increment and decrement the input value.
Values can also be manipulated via the keyboard.

## Best practices

### Do

- **Consider using `SpinButton` with underline or outline appearances.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using underline or outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding.

### Don't

- **Don’t place `SpinButton` on a surface which doesn’t have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements.

## Props

| Name              | Type                                                                                                                                                                 | Required | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`            | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>             | null>`   | No        |                                                                                                                                                                                                                                                                                                                                                                                                                                              | The root element of SpinButton is a container `<div>`. The root slot receives the `className` and `style` specified on the `<SpinButton>`. All other native props are applied to the primary slot: `input`.                                                                                                                                    |
| `input`           | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                                      | No       |           | Input that displays the current value and accepts direct input from the user. Displayed value is formatted. This is the primary slot.                                                                                                                                                                                                                                                                                                        |
| `as`              | `"input"`                                                                                                                                                            | No       |           |                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `incrementButton` | `NonNullable<WithSlotShorthandValue<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; }> | null>`   | No        |                                                                                                                                                                                                                                                                                                                                                                                                                                              | Renders the increment control.                                                                                                                                                                                                                                                                                                                 |
| `decrementButton` | `NonNullable<WithSlotShorthandValue<{ as?: "button"; } & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> & { ...; }> | null>`   | No        |                                                                                                                                                                                                                                                                                                                                                                                                                                              | Renders the decrement control.                                                                                                                                                                                                                                                                                                                 |
| `appearance`      | `"outline" "underline" "filled-darker" "filled-lighter"`                                                                                                             | No       | 'outline' | Controls the colors and borders of the input.                                                                                                                                                                                                                                                                                                                                                                                                |
| `defaultValue`    | `number                                                                                                                                                              | null`    | No        |                                                                                                                                                                                                                                                                                                                                                                                                                                              | Initial value of the control (assumed to be valid). Updates to this prop will not be respected. Use this if you intend for the SpinButton to be an uncontrolled component which maintains its own value. For a controlled component, use `value` instead. (Mutually exclusive with `value`.) Use `null` to indicate the control has no value.  |
| `displayValue`    | `string`                                                                                                                                                             | No       |           | String representation of `value`. Use this when displaying the value to users as something other than a plain number. For example, when displaying currency values this might be "$1.00" when value is `1`. Only provide this if the SpinButton is a controlled component where you are maintaining its current state and passing updates based on change events. When SpinButton is used as an uncontrolled component this prop is ignored. |
| `onChange`        | `((event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => void)`                                                                                             | No       |           | Callback for when the committed value changes. - User presses the up/down buttons (on single press or every spin) - User presses the up/down arrow keys (on single press or every spin) - User _commits_ edits to the input text by focusing away (blurring) or pressing enter. Note that this is NOT called for every key press while the user is editing.                                                                                  |
| `precision`       | `number`                                                                                                                                                             | No       |           | How many decimal places the value should be rounded to. The default is calculated based on the precision of `step`: i.e. if step = 1, precision = 0. step = 0.0089, precision = 4. step = 300, precision = 2. step = 23.00, precision = 2.                                                                                                                                                                                                   |
| `size`            | `"small" "medium"`                                                                                                                                                   | No       | 'medium'  | Size of the input.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `stepPage`        | `number`                                                                                                                                                             | No       | 1         | Large difference between two values. This should be greater than `step` and is used when users hit the Page Up or Page Down keys.                                                                                                                                                                                                                                                                                                            |
| `value`           | `number                                                                                                                                                              | null`    | No        |                                                                                                                                                                                                                                                                                                                                                                                                                                              | Current value of the control (assumed to be valid). Only provide this if the SpinButton is a controlled component where you are maintaining its current state and passing updates based on change events; otherwise, use the `defaultValue` property. Use `null` to indicate the control has no value. Mutually exclusive with `defaultValue`. |
| `ref`             | `Ref<HTMLInputElement>`                                                                                                                                              | No       |           |                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## Examples

### Appearance

SpinButton can have different appearances.
The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with
filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate
surrounding color to pass accessibility requirements.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, mergeClasses, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

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
    padding: tokens.spacingHorizontalMNudge,
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

  const outlineId = useId('outline-id');
  const underlineId = useId('underline-id');
  const filledLighterId = useId('filledLighter-id');
  const filledDarkerId = useId('filledDarker-id');

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <Label htmlFor={outlineId}>Outline (default)</Label>
        <SpinButton id={outlineId} />
      </div>

      <div className={styles.field}>
        <Label htmlFor={underlineId}>Underline</Label>
        <SpinButton appearance="underline" id={underlineId} />
      </div>

      <div className={mergeClasses(styles.field, styles.filledLighter)}>
        <Label htmlFor={filledLighterId}>Filled Lighter</Label>
        <SpinButton appearance="filled-lighter" id={filledLighterId} />
      </div>

      <div className={mergeClasses(styles.field, styles.filledDarker)}>
        <Label htmlFor={filledDarkerId}>Filled Darker</Label>
        <SpinButton appearance="filled-darker" id={filledDarkerId} />
      </div>
    </div>
  );
};
```

### Bounds

SpinButton can be bounded with the `min` and `max` props.
Using the spin buttons or hotkeys will clamp values in the range of [min, max].
Users may type a value outside the range into the text input and it will not be clamped
by the control. Pressing the "home" key will set the value to `min` and pressing the "end"
key will set the value to `max` when the props are set.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Bounds = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Bounded SpinButton</Label>
      <SpinButton defaultValue={10} min={0} max={20} id={id} />
      <p>min: 0, max: 20</p>
    </div>
  );
};
```

### Controlled

SpinButton can be a controlled input where the value and, optionally, the display value
are stored in state and updated with `onChange`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';
import type { SpinButtonOnChangeData, SpinButtonChangeEvent } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Controlled = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  const [spinButtonValue, setSpinButtonValue] = React.useState<number | null>(10);

  const onSpinButtonChange = React.useCallback(
    (_ev: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      console.log('onSpinButtonChange', data.value, data.displayValue);
      if (data.value !== undefined) {
        setSpinButtonValue(data.value);
      } else if (data.displayValue !== undefined) {
        const newValue = parseFloat(data.displayValue);
        if (!Number.isNaN(newValue)) {
          setSpinButtonValue(newValue);
        } else {
          console.error(`Cannot parse "${data.displayValue}" as a number.`);
        }
      }
    },
    [setSpinButtonValue],
  );

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Controlled SpinButton</Label>
      <SpinButton value={spinButtonValue} onChange={onSpinButtonChange} id={id} />
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Default = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Default SpinButton</Label>
      <SpinButton defaultValue={10} min={0} max={20} id={id} />
    </div>
  );
};
```

### Disabled

SpinButton can be disabled.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Disabled = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Disabled</Label>
      <SpinButton disabled id={id} />
    </div>
  );
};
```

### Display Value

SpinButton supports formatted display values.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';
import type { SpinButtonProps } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

type FormatterFn = (value: number) => string;
type ParserFn = (formattedValue: string) => number;

export const DisplayValue = (): JSXElement => {
  const formatter: FormatterFn = value => {
    return `$${value}`;
  };

  const parser: ParserFn = formattedValue => {
    if (formattedValue === null) {
      return NaN;
    }

    return parseFloat(formattedValue.replace('$', ''));
  };

  const onSpinButtonChange: SpinButtonProps['onChange'] = (_ev, data) => {
    if (data.value !== undefined && data.value !== null) {
      setSpinButtonValue(data.value);
      setSpinButtonDisplayValue(formatter(data.value));
    } else if (data.displayValue !== undefined) {
      const newValue = parser(data.displayValue);
      if (!Number.isNaN(newValue)) {
        setSpinButtonValue(newValue);
        setSpinButtonDisplayValue(formatter(newValue));
      } else {
        // Display a "special" value when user types something
        // that's not parsable as a number.
        setSpinButtonValue(null);
        setSpinButtonDisplayValue('(null)');
      }
    }
  };

  const layoutStyles = useLayoutStyles();
  const id = useId();
  const [spinButtonValue, setSpinButtonValue] = React.useState<number | null>(1);
  const [spinButtonDisplayValue, setSpinButtonDisplayValue] = React.useState(formatter(1));

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Display Value</Label>
      <SpinButton value={spinButtonValue} displayValue={spinButtonDisplayValue} onChange={onSpinButtonChange} id={id} />
    </div>
  );
};
```

### Read Only

SpinButton can be read-only which prevents user input but still allows the component to be focused and read by assistive technologies. This is different from disabled, which prevents all interaction with the component.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const ReadOnly = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Read-Only</Label>
      <SpinButton readOnly id={id} />
    </div>
  );
};
```

### Size

SpinButton can have different sizes.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> div': {
      display: 'flex',
      flexDirection: 'column',
      marginTop: tokens.spacingHorizontalMNudge,
    },

    '> div:first-child': {
      marginTop: '0px',
    },

    '> div label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Size = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const smallId = useId('small-id');
  const mediumId = useId('medium-id');

  return (
    <div className={layoutStyles.base}>
      <div>
        <Label htmlFor={smallId}>Small</Label>
        <SpinButton size="small" id={smallId} />
      </div>

      <div>
        <Label htmlFor={mediumId}>Medium (default)</Label>
        <SpinButton id={mediumId} />
      </div>
    </div>
  );
};
```

### Step

SpinButton step size can be set. Additionally `stepPage` can be
set to a large value to allow bulk steps via the `Page Up` and `Page Down` keys.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Step = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Step Size</Label>
      <SpinButton defaultValue={10} step={2} stepPage={20} id={id} />
    </div>
  );
};
```

### Uncontrolled

An uncontrolled SpinButton

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Uncontrolled = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Uncontrolled SpinButton</Label>
      <SpinButton defaultValue={10} id={id} />
    </div>
  );
};
```

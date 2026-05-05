# Components/Textarea

Textarea allows the user to enter and edit multiline text.

## Best practices

### Do

- **Consider using `Textarea` with outline appearance.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding.
- Prefer using `<Field>` instead of `<Label>` to handle accessibility automatically.
- **When changing height related styles, apply them directly to the textarea slot like this: `<Textarea textarea={{ className: yourClassName }} />`.** This is needed due to the structure of the Textarea being a span wrapping the textarea native element and resizing based on the textarea element. It is also important to note that we add a default `maxHeight` so when typing text, a scrollbar will appear when the text becomes too long for the size of the Textarea. To remove this constraint, resetting the `maxHeight` prevents this issue as well as letting the textarea wrapper fully resize based on the textarea's size.

### Don't

- **Don’t place `Textarea` on a surface which doesn't have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements.

## Props

| Name         | Type                                                                                                                                                                         | Required | Default | Description |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`       | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                     | null>`   | No      |             | Wrapper element used for displaying the borders for Textarea. This wrapper is needed due to the focus indicator border animation. For more information, see Spec.md The root only receives `className` and `style`. All other props are applied to the `textarea` slot. |
| `textarea`   | `NonNullable<WithSlotShorthandValue<{ as?: "textarea"; } & Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "children"> & { ...; }> | null>`   | No      |             | The `<textarea>` element. This is the primary slot, all native props and ref are applied to this slot.                                                                                                                                                                  |
| `as`         | `"textarea"`                                                                                                                                                                 | No       |         |             |
| `appearance` | `"outline" "filled-darker" "filled-lighter" "filled-darker-shadow" "filled-lighter-shadow"`                                                                                  | No       | outline |

Note: 'filled-darker-shadow' and 'filled-lighter-shadow' are deprecated and will be removed in the future. | Styling the Textarea should use. |
| `defaultValue` | `string` | No | | The default value of the Textarea. |
| `onChange` | `((ev: ChangeEvent<HTMLTextAreaElement>, data: TextareaOnChangeData) => void)` | No | | Callback for when the user changes the value. |
| `resize` | `"none" "both" "horizontal" "vertical"` | No | none | Which direction the Textarea is allowed to be resized. |
| `size` | `"small" "medium" "large"` | No | medium | Size of the Textarea. |
| `value` | `string` | No | | The value of the Textarea. |
| `ref` | `Ref<HTMLTextAreaElement>` | No | | |

## Examples

### Appearance

Textarea can have different appearances.
The colors adjacent to the Textarea should have a sufficient contrast. Particularly, the color of input with
filled darker and lighter styles needs to provide a contrast ratio greater than 3 to 1 against the immediate
surrounding color to pass accessibility requirement.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, mergeClasses, tokens, Textarea } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalMNudge,
  },
  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
  invertedLabel: {
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
      <div className={styles.fieldWrapper}>
        <Field label="Textarea with Outline appearance">
          <Textarea appearance="outline" placeholder="type here..." resize="both" />
        </Field>
      </div>

      <div className={mergeClasses(styles.fieldWrapper, styles.inverted)}>
        <Field
          label={{
            children: 'Textarea with Filled Darker appearance',
            className: styles.invertedLabel,
          }}
        >
          <Textarea appearance="filled-darker" placeholder="type here..." resize="both" />
        </Field>
      </div>

      <div className={mergeClasses(styles.fieldWrapper, styles.inverted)}>
        <Field
          label={{
            children: 'Textarea with Filled Lighter appearance',
            className: styles.invertedLabel,
          }}
        >
          <Textarea appearance="filled-lighter" placeholder="type here..." resize="both" />
        </Field>
      </div>
    </div>
  );
};
```

### Controlled

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Textarea } from '@fluentui/react-components';
import type { TextareaProps } from '@fluentui/react-components';

export const Controlled = (): JSXElement => {
  const [value, setValue] = React.useState('initial value');

  const onChange: TextareaProps['onChange'] = (ev, data) => {
    if (data.value.length <= 50) {
      setValue(data.value);
    }
  };

  return (
    <Field label="Controlled Textarea limiting the value to 50 characters">
      <Textarea value={value} onChange={onChange} />
    </Field>
  );
};
```

### Default

```tsx
import * as React from 'react';
import { Field, Textarea } from '@fluentui/react-components';
import type { JSXElement, TextareaProps } from '@fluentui/react-components';

export const Default = (props: Partial<TextareaProps>): JSXElement => (
  <Field label="Default Textarea">
    <Textarea {...props} />
  </Field>
);
```

### Disabled

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Textarea } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
  <Field label="Disabled Textarea">
    <Textarea disabled />
  </Field>
);
```

### Placeholder

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Textarea } from '@fluentui/react-components';

export const Placeholder = (): JSXElement => (
  <Field label="Textarea with placeholder">
    <Textarea placeholder="type here..." />
  </Field>
);
```

### Resize

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, Textarea, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalMNudge,
  },
});

export const Resize = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <Field label='Textarea with resize set to "none"'>
        <Textarea resize="none" />
      </Field>

      <Field label='Textarea with resize set to "vertical"'>
        <Textarea resize="vertical" />
      </Field>

      <Field label='Textarea with resize set to "horizontal"'>
        <Textarea resize="horizontal" />
      </Field>

      <Field label='Textarea with resize set to "both"'>
        <Textarea resize="both" />
      </Field>
    </div>
  );
};
```

### Size

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, Textarea, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalMNudge,
  },
});

export const Size = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <Field size="small" label="Small Textarea">
        <Textarea />
      </Field>

      <Field size="medium" label="Medium Textarea">
        <Textarea />
      </Field>

      <Field size="large" label="Large Textarea">
        <Textarea />
      </Field>
    </div>
  );
};
```

### Uncontrolled

```tsx
import * as React from 'react';
import { Field, Textarea } from '@fluentui/react-components';
import type { JSXElement, TextareaProps } from '@fluentui/react-components';

const onChange: TextareaProps['onChange'] = (ev, data) => {
  // Uncontrolled inputs can be notified of changes to the value
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = (): JSXElement => (
  <Field label="Uncontrolled Textarea" hint="Check console for new value">
    <Textarea onChange={onChange} placeholder="type here..." />
  </Field>
);
```

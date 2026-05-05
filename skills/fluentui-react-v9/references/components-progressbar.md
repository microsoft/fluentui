# Components/ProgressBar

A ProgressBar provides a visual representation of content being loaded or processed.

## Best practices

### Do

- Use an `indeterminate` `ProgressBar` when the total units to completion is unknown
- Provide a clear description of the progress operation
- Show text above and/or below the bar
- Combine steps of a single operation into one bar
- Use `Field` to add a `validationMessage` and `hint` message for the `indeterminate` `ProgressBar` when `reduced-motion` is active

### Don't

- Use only a single word description
- Show text to the right or left of the bar
- 'Rewind' progress to show new steps

## Props

| Name        | Type                                                                                                                                                  | Required | Default | Description                                                                                                                                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `as`        | `"div"`                                                                                                                                               | No       |         |                                                                                                                                                                                                                       |
| `bar`       | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                                                                                                                                                                       | The filled portion of the ProgressBar bar. Animated in the indeterminate state, when no value is provided. |
| `shape`     | `"square" "rounded"`                                                                                                                                  | No       | rounded | The shape of the bar and track.                                                                                                                                                                                       |
| `value`     | `number`                                                                                                                                              | No       |         | A decimal number between `0` and `1` (or between `0` and `max` if given), which specifies how much of the task has been completed. If `undefined` (default), the ProgressBar will display an **indeterminate** state. |
| `max`       | `number`                                                                                                                                              | No       | 1       | The maximum value, which indicates the task is complete. The ProgressBar bar will be full when `value` equals `max`.                                                                                                  |
| `thickness` | `"medium" "large"`                                                                                                                                    | No       | medium  | The thickness of the ProgressBar bar                                                                                                                                                                                  |
| `ref`       | `Ref<HTMLDivElement>`                                                                                                                                 | No       |         |                                                                                                                                                                                                                       |

## Examples

### Color

The `color` prop can be used to indicate a `"brand"` state (default), `"error"` state (red), `"warning"` state (orange), or `"success"` state (green).

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
});

export const Color = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Field validationMessage="Error ProgressBar">
        <ProgressBar value={0.75} color="error" />
      </Field>

      <Field validationMessage="Warning ProgressBar" validationState="warning">
        <ProgressBar value={0.95} color="warning" />
      </Field>

      <Field validationMessage="Success ProgressBar" validationState="success">
        <ProgressBar value={1} color="success" />
      </Field>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar, ProgressBarProps } from '@fluentui/react-components';

export const Default = (props: Partial<ProgressBarProps>): JSXElement => {
  return (
    <Field validationMessage="Default ProgressBar" validationState="none">
      <ProgressBar {...props} value={0.5} />
    </Field>
  );
};
```

### Indeterminate

ProgressBar is indeterminate when 'value' is undefined.
Indeterminate ProgressBar is best used to show that an operation is being executed.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar } from '@fluentui/react-components';

export const Indeterminate = (): JSXElement => {
  return (
    <Field validationMessage="Indeterminate ProgressBar" validationState="none">
      <ProgressBar />
    </Field>
  );
};
```

### Max

You can specify the maximum value of the determinate ProgressBar.
This is useful for instances where you want to show capacity, or how much of a total has been
uploaded/downloaded.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar } from '@fluentui/react-components';

const intervalDelay = 100;
const intervalIncrement = 1;

export const Max = (): JSXElement => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setValue(value < 42 ? intervalIncrement + value : 0);
    }, intervalDelay);
    return () => {
      clearInterval(id);
    };
  });
  return (
    <Field validationMessage={`There have been ${value} files downloaded`} validationState="none">
      <ProgressBar max={42} value={value} />
    </Field>
  );
};
```

### Shape

The `shape` prop affects the corners of the bar. It can be `rounded` (default) or `square`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    margin: '20px 0px',
  },
});

export const Shape = (): JSXElement => {
  const styles = useStyles();

  return (
    <div>
      <Field validationMessage="Rounded ProgressBar" validationState="none">
        <ProgressBar className={styles.container} shape="rounded" thickness="large" value={0.5} />
      </Field>
      <Field validationMessage="Square ProgressBar" validationState="none">
        <ProgressBar className={styles.container} shape="square" thickness="large" value={0.5} />
      </Field>
    </div>
  );
};
```

### Thickness

The `thickness` prop affects the size of the bar. It can be `medium` (default) or `large`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    margin: '20px 0px',
  },
});

export const Thickness = (): JSXElement => {
  const styles = useStyles();

  return (
    <div>
      <Field validationMessage="Medium ProgressBar" validationState="none">
        <ProgressBar className={styles.container} thickness="medium" value={0.7} />
      </Field>

      <Field validationMessage="Large ProgressBar" validationState="none">
        <ProgressBar className={styles.container} thickness="large" value={0.7} />
      </Field>
    </div>
  );
};
```

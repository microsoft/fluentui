# Components/RatingDisplay

`RatingDisplay` is used to communicate user sentiment. By default, it shows rating as filled stars out of 5, as well as a text displaying the average value and the aggregate number of ratings.

## Best practices

### Do

- Always display the value of the `RatingDisplay`.
- Display the total number of ratings if known.
- Use the `RatingDisplay` to represent only one thing.

### Don't

- Display an empty `RatingDisplay`.
- Display a `RatingDisplay` with no value.

## Props

| Name        | Type                                                                                                                                         | Required | Default    | Description                                                                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `valueText` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No         |                                                                                                                                                           |     |
| `countText` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No         |                                                                                                                                                           |     |
| `as`        | `"div"`                                                                                                                                      | No       |            |                                                                                                                                                           |
| `compact`   | `boolean`                                                                                                                                    | No       | false      | Renders a single filled star, with the value written next to it.                                                                                          |
| `count`     | `number`                                                                                                                                     | No       |            | The number of ratings represented by the rating value. This will be formatted with a thousands separator (if applicable) and displayed next to the value. |
| `icon`      | `ElementType<any, keyof IntrinsicElements>`                                                                                                  | No       | StarFilled | The icon used for rating items.                                                                                                                           |
| `max`       | `number`                                                                                                                                     | No       | 5          | The max value of the rating. This controls the number of rating items displayed. Must be a whole number greater than 1.                                   |
| `size`      | `"small" "medium" "large" "extra-large"`                                                                                                     | No       | medium     | Sets the size of the RatingDisplay items.                                                                                                                 |
| `value`     | `number`                                                                                                                                     | No       |            | The value of the rating                                                                                                                                   |
| `ref`       | `Ref<HTMLDivElement>`                                                                                                                        | No       |            |                                                                                                                                                           |

## Examples

### Color

A RatingDisplay's `color` can be `neutral` (default), `brand`, or `marigold`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Color = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <RatingDisplay value={3} />

      <RatingDisplay color="brand" value={3} />

      <RatingDisplay color="marigold" value={3} />
    </div>
  );
};
```

### Compact

You can specify a compact RatingDisplay with `compact`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';

export const Compact = (): JSXElement => <RatingDisplay compact value={3} count={1160} />;
```

### Count

You can specify the total number of ratings being displayed with the `count`. The number will be formatted with a thousands separator according to the user's locale.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';

export const Count = (): JSXElement => {
  return <RatingDisplay value={5} count={1160} />;
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';

export const Default = (): JSXElement => <RatingDisplay value={4} />;
```

### Max

You can specify the number of elements in the RatingDisplay with the `max` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';

export const Max = (): JSXElement => {
  return <RatingDisplay max={10} value={5} />;
};
```

### Shape

You can pass in a custom icon to the RatingDisplay component using the `icon` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';
import { CircleFilled, SquareFilled } from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Shape = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <RatingDisplay icon={CircleFilled} value={3.5} />
      <RatingDisplay icon={SquareFilled} value={3.5} />
    </div>
  );
};
```

### Size

A RatingDisplay's `size` can be `small`, `medium`, `large`, or `extra-large`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Size = (): JSXElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <RatingDisplay value={3} size="small" />
      <RatingDisplay value={3} size="medium" />
      <RatingDisplay value={3} size="large" />
      <RatingDisplay value={3} size="extra-large" />
    </div>
  );
};
```

### Value

The `value` controls the number of filled stars, and is written out next to the RatingDisplay. The number of filled stars is rounded to the nearest half-star.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Value = (): JSXElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <RatingDisplay value={1} />
      <RatingDisplay value={3.7} />
      <RatingDisplay value={3.9} />
      <RatingDisplay value={5} />
    </div>
  );
};
```

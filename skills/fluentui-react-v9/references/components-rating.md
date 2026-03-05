# Components/Rating

A `Rating` component allows users to provide a rating for a particular item.

`Rating` allows customers to determine a sense of value of a good or a service. By default, the rating is selected out of 5 stars, but the number and symbol used can be customized.

To display the result of other users' rating values, use `RatingDisplay` instead.

## Best practices

### Do

- Use a simple rating system.
- Use simple icons to represent rating items.

### Don't

- Display too many Ratings on the page at a time.

## Props

| Name          | Type                                        | Required | Default                  | Description                                                                                                             |
| ------------- | ------------------------------------------- | -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `as`          | `"div"`                                     | No       |                          |                                                                                                                         |
| `iconFilled`  | `ElementType<any, keyof IntrinsicElements>` | No       |                          | The icon to display when the rating value is greater than or equal to the item's value.                                 |
| `iconOutline` | `ElementType<any, keyof IntrinsicElements>` | No       |                          | The icon to display when the rating value is less than the item's value.                                                |
| `itemLabel`   | `((rating: number) => string)`              | No       | (rating) =\> `${rating}` | Prop to generate the aria-label for the rating inputs.                                                                  |
| `max`         | `number`                                    | No       | 5                        | The max value of the rating. This controls the number of rating items displayed. Must be a whole number greater than 1. |
| `name`        | `string`                                    | No       |                          | Name for the Radio inputs. If not provided, one will be automatically generated                                         |
| `onChange`    | `EventHandler<RatingOnChangeEventData>`     | No       |                          | Callback when the rating value is changed by the user.                                                                  |
| `step`        | `1 0.5`                                     | No       | 1                        | Sets the precision to allow half-filled shapes in Rating                                                                |
| `size`        | `"small" "medium" "large" "extra-large"`    | No       | extra-large              | Sets the size of the Rating items.                                                                                      |
| `value`       | `number`                                    | No       |                          | The value of the rating                                                                                                 |
| `ref`         | `Ref<HTMLDivElement>`                       | No       |                          |                                                                                                                         |

## Subcomponents

### RatingItem

RatingItem is an item that will be used to set or display a rating value.

#### Props

| Name             | Type                                                                                                                                                  | Required | Default | Description                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `selectedIcon`   | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                      | Icon displayed when the rating value is greater than or equal to the item's value. |
| `unselectedIcon` | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No      |                                                                      | Icon displayed when the rating value is less than the item's value.                |
| `halfValueInput` | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                       | No       |         | Radio input slot used for half star precision                        |
| `fullValueInput` | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                       | No       |         | Radio input slot used for full star precision                        |
| `as`             | `"span"`                                                                                                                                              | No       |         |                                                                      |
| `value`          | `number`                                                                                                                                              | No       |         | The positive whole number value that is displayed by this RatingItem |
| `ref`            | `Ref<HTMLSpanElement>`                                                                                                                                | No       |         |                                                                      |

## Examples

### Color

A Rating's `color` can be `neutral` (default), `brand`, or `marigold`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';
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
      <Rating defaultValue={3} />

      <Rating color="brand" defaultValue={3} />

      <Rating color="marigold" defaultValue={3} />
    </div>
  );
};
```

### Controlled Value

The selected rating value can be controlled using the `value` and `onChange` props.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';

export const ControlledValue = (): JSXElement => {
  const [value, setValue] = React.useState(4);
  return (
    <>
      <Rating value={value} onChange={(_, data) => setValue(data.value)} />
      <Button onClick={() => setValue(0)}>Clear Rating</Button>
    </>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating, RatingProps } from '@fluentui/react-components';

export const Default = (props: Partial<RatingProps>): JSXElement => {
  return <Rating {...props} />;
};
```

### Max

You can specify the number of elements in the Rating with the `max` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';

export const Max = (): JSXElement => {
  return <Rating max={10} defaultValue={5} />;
};
```

### Shape

You can pass in custom icons to the Rating component. You can specify the icons with the `iconFilled` and `iconOutline` props.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';
import { CircleFilled, CircleRegular, SquareFilled, SquareRegular } from '@fluentui/react-icons';
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
      <Rating iconFilled={CircleFilled} iconOutline={CircleRegular} step={0.5} />
      <Rating iconFilled={SquareFilled} iconOutline={SquareRegular} step={0.5} />
    </div>
  );
};
```

### Size

A Rating's `size` can be `small`, `medium`, `large`, or `extra-large`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';
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
      <Rating defaultValue={3} size="small" />
      <Rating defaultValue={3} size="medium" />
      <Rating defaultValue={3} size="large" />
      <Rating defaultValue={3} size="extra-large" />
    </div>
  );
};
```

### Step

You can specify half values in the Rating with `step={0.5}`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';

export const Step = (): JSXElement => {
  return <Rating step={0.5} defaultValue={3.5} />;
};
```

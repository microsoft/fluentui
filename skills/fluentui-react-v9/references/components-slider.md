# Components/Slider

A Slider represents an input that allows user to choose a value from within a specific range.

## Best practices

### Layout

- Don't use a slider for binary settings.
- Don't use a continuous slider if the range of values is large.
- Don't use for a range with fewer than three values.
- Sliders are typically horizontal but can be vertical, when needed.

### Content

- Use step points if you don't want the slider to allow arbitrary values between minimum and maximum.

## Props

| Name           | Type                                                                                                                                                  | Required | Default  | Description                                                                                                                                                                                                                                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`         | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No       |                                                                                                                                                                                                                                                                                                                                    | The root of the Slider. The root slot receives the `className` and `style` specified directly on the `<Slider>`. All other native props will be applied to the primary slot, `input`. |
| `input`        | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; } & { ...; })`            | No       |          | The hidden input for the Slider. This is the PRIMARY slot: all native properties specified directly on `<Slider>` will be applied to this slot, except `className` and `style`, which remain on the root slot.                                                                                                                     |
| `as`           | `"input"`                                                                                                                                             | No       |          |                                                                                                                                                                                                                                                                                                                                    |
| `rail`         | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No       |                                                                                                                                                                                                                                                                                                                                    | The Slider's base. It is used to visibly display the min and max selectable values.                                                                                                   |
| `thumb`        | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No       |                                                                                                                                                                                                                                                                                                                                    | The draggable icon used to select a given value from the Slider. This is the element containing `role = 'slider'`.                                                                    |
| `orient`       | `"horizontal" "vertical"`                                                                                                                             | No       |          | Orient is a non standard attribute that allows for vertical orientation in Firefox. It is set internally when `vertical` is set to true. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#non_standard_attributes Webkit/Chromium support for vertical inputs is provided via -webkit-appearance css property |
| `defaultValue` | `number`                                                                                                                                              | No       |          | The starting value for an uncontrolled Slider. Mutually exclusive with `value` prop.                                                                                                                                                                                                                                               |
| `size`         | `"small" "medium"`                                                                                                                                    | No       | 'medium' | The size of the Slider.                                                                                                                                                                                                                                                                                                            |
| `value`        | `number`                                                                                                                                              | No       |          | The current value of the controlled Slider. Mutually exclusive with `defaultValue` prop.                                                                                                                                                                                                                                           |
| `vertical`     | `boolean`                                                                                                                                             | No       | `false`  | Render the Slider in a vertical orientation, smallest value on the bottom.                                                                                                                                                                                                                                                         |
| `onChange`     | `((ev: ChangeEvent<HTMLInputElement>, data: SliderOnChangeData) => void)`                                                                             | No       |          | Triggers a callback when the value has been changed. This will be called on every individual step.                                                                                                                                                                                                                                 |
| `ref`          | `Ref<HTMLInputElement>`                                                                                                                               | No       |          |                                                                                                                                                                                                                                                                                                                                    |

## Examples

### Controlled

A slider can be a controlled input where the slider value is stored in state
and updated with `onChange`. This is also useful for setting custom aria-valuetext

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Button, Label, Slider } from '@fluentui/react-components';
import type { SliderProps } from '@fluentui/react-components';

export const Controlled = (): JSXElement => {
  const id = useId();
  const [sliderValue, setSliderValue] = React.useState(160);
  const onSliderChange: SliderProps['onChange'] = (_, data) => setSliderValue(data.value);
  const resetSlider = () => setSliderValue(0);
  return (
    <>
      <Label htmlFor={id}>Control Slider [ Current Value: {sliderValue} ]</Label>
      <Slider
        aria-valuetext={`Value is ${sliderValue}`}
        value={sliderValue}
        min={20}
        max={200}
        onChange={onSliderChange}
        id={id}
      />

      <Button onClick={resetSlider}>Reset</Button>
    </>
  );
};
```

### Default

A default slider

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, Slider } from '@fluentui/react-components';

export const Default = (): JSXElement => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Basic Example</Label>
      <Slider defaultValue={20} id={id} />
    </>
  );
};
```

### Disabled

A disabled slider will not change or fire events on click or keyboard press.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, Slider } from '@fluentui/react-components';

export const Disabled = (): JSXElement => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Disabled Example</Label>
      <Slider defaultValue={30} disabled id={id} />
    </>
  );
};
```

### Min Max

A slider with min and max values displayed

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, Slider, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
});

export const MinMax = (): JSXElement => {
  const styles = useStyles();
  const id = useId();
  const min = 10;
  const max = 50;
  return (
    <>
      <Label htmlFor={id}>Min/Max Example</Label>
      <div className={styles.wrapper}>
        <Label aria-hidden>{min}</Label>
        <Slider min={min} max={max} defaultValue={20} id={id} />
        <Label aria-hidden>{max}</Label>
      </div>
    </>
  );
};
```

### Size

A slider comes in both medium and small size. Medium is the default.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, Slider } from '@fluentui/react-components';

export const Size = (): JSXElement => {
  const smallId = useId('small');
  const mediumId = useId('medium');
  return (
    <>
      <Label htmlFor={mediumId}>Medium Slider</Label>
      <Slider size="medium" defaultValue={20} id={mediumId} />

      <Label htmlFor={smallId}>Small Slider</Label>
      <Slider size="small" defaultValue={20} id={smallId} />
    </>
  );
};
```

### Step

You can define the step value of a slider so that the value will always be a mutiple of that step

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, Slider } from '@fluentui/react-components';

export const Step = (): JSXElement => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Step Example</Label>
      <Slider defaultValue={6} step={3} min={0} max={12} id={id} />
    </>
  );
};
```

### Vertical

A slider can be oriented vertically where the max value is at the top of the slider.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, Slider } from '@fluentui/react-components';

export const Vertical = (): JSXElement => {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>Vertical Example</Label>
      <Slider vertical step={2} defaultValue={6} min={0} max={10} id={id} />
    </>
  );
};
```

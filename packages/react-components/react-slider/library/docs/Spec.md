# @fluentui/react-slider Spec

## Background

The `@fluentui/react-slider` package provides slider-style inputs for picking approximate values on a rail. It contains:

- **Slider** – a single-thumb control for choosing one value (volume, brightness, etc.).
- **RangeSlider** – a dual-thumb control for selecting a bounded range (price filters, min/max constraints, etc.).

Both components follow the same visual language and share similar interaction patterns, but RangeSlider introduces a second thumb, collision detection, and two values exposed as `{ start, end }`.

## Components

- `Slider`: single-value input, identical to the existing v9 implementation.
- `RangeSlider`: two-thumb range selection input that outputs `{ start, end }` values.

## Sample Code

### Slider

```tsx
import { Slider } from '@fluentui/react-slider';
import { Label, useId } from '@fluentui/react-components';

const SliderExample = () => {
  const sliderId = useId();
  return (
    <>
      <Label htmlFor={sliderId}>Brightness</Label>
      <Slider defaultValue={50} min={10} max={100} id={sliderId} />
    </>
  );
};
```

### RangeSlider

```tsx
import { RangeSlider } from '@fluentui/react-slider';
import { Label, Field, useId } from '@fluentui/react-components';

const BasicRangeSlider = () => {
  const labelId = useId();
  return (
    <>
      <Label id={labelId}>Price range</Label>
      <RangeSlider aria-labelledby={labelId} defaultValue={{ start: 20, end: 80 }} />
    </>
  );
};

const FieldRangeSlider = () => (
  <Field label="Temperature">
    <RangeSlider defaultValue={{ start: 20, end: 80 }} vertical />
  </Field>
);

const ControlledRangeSlider = () => {
  const [value, setValue] = React.useState({ start: 25, end: 75 });
  return <RangeSlider value={value} onChange={(ev, data) => setValue(data.value)} min={0} max={100} step={5} />;
};
```

---

## Slider Component

### Slider Variants

- `vertical`: renders with the min value at the bottom and max at the top.
- `disabled`: read-only, removes the thumb from the tab order, and suppresses pointer/touch updates.

### Slider API

#### Slider Slots

- `root`: outer container that wraps the Slider structure.
- `rail`: visual representation of the min–max span.
- `thumb`: draggable icon with `role="slider"`.
- `input`: hidden `<input type="range">` used for form participation and pointer/touch interactions (primary slot).

#### Slider Props

See API at [Slider.types.ts](./src/components/Slider/Slider.types.ts) for the full list of props shared across slots.

### Slider Structure

- **Public**

  ```tsx
  <Slider defaultValue={50} min={10} max={100} />
  ```

- **Internal**

  ```tsx
  <slots.root {...slotProps.root}>
    <slots.input {...slotProps.input} />
    <slots.rail {...slotProps.rail} />
    <slots.thumb {...slotProps.thumb} />
  </slots.root>
  ```

- **DOM**

  ```html
  <div class="fui-Slider">
    <input class="fui-Slider__input" type="range" value="50" min="10" max="100" />
    <div class="fui-Slider__rail"></div>
    <div class="fui-Slider__thumb"></div>
  </div>
  ```

### Slider Migration

See [MIGRATION.md](./MIGRATION.md).

### Slider Behaviors

- **Component States**

  - **Disabled**: ignores pointer/touch events, does not focus, and blocks value updates.
  - **Focused**: shows the focus indicator only during keyboard navigation.

- **Interaction**

  - **Keyboard**

    | Key                              | Description                            |
    | -------------------------------- | -------------------------------------- |
    | `Up` / `Right`                   | Increment the current value by `step`. |
    | `Down` / `Left`                  | Decrement the current value by `step`. |
    | `PageUp` / `Shift`+`Up/Right`    | Increment by `10 × step`.              |
    | `PageDown` / `Shift`+`Down/Left` | Decrement by `10 × step`.              |
    | `Home`                           | Jump to `min`.                         |
    | `End`                            | Jump to `max`.                         |

  - **Cursor**: `pointerdown` sets the value immediately, `pointermove` continues updating as the pointer moves.
  - **Touch**: mirrors cursor behavior.
  - **Screen readers**: hidden input handles form integration and exposes `aria-valuenow/min/max`.

### Slider Accessibility

Slider follows the [W3C slider pattern](https://www.w3.org/TR/wai-aria-1.1/#slider). Focus remains on the thumb, and all labeling comes from either `aria-label`, `aria-labelledby`, or surrounding `Label`/`Field` components.

### Slider Open UI Research

- <https://open-ui.org/components/slider.research.parts>
- <https://open-ui.org/components/slider.research>

### Slider Out of scope

- Built-in marks or tick rendering.
- Alternate origins such as center-out progress.

---

## RangeSlider Component

### RangeSlider Background

RangeSlider enables users to select both a minimum and maximum value along the same rail. Two thumbs share the rail, and the currently selected span is highlighted between them. The component outputs `{ start, end }` objects for both uncontrolled (`defaultValue`) and controlled (`value`) usage.

### RangeSlider Variants

RangeSlider supports the same appearance as Slider, plus:

- **Size** (`size?: 'medium' | 'small'`): Medium is default, small tightens thumb and rail dimensions.
- **Orientation** (`vertical?: boolean`): Vertical sliders place the minimum at the bottom and maximum at the top.
- **State** (`disabled?: boolean`): Disabled thumbs are removed from the tab order and do not react to pointer/touch.

### RangeSlider API

#### RangeSlider Props

| Prop           | Type                                                                               | Default                 | Description                                                                          |
| -------------- | ---------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------ |
| `defaultValue` | `{ start: number; end: number }`                                                   | `{ start: 0, end: 10 }` | Starting range for uncontrolled usage. Mutually exclusive with `value`.              |
| `disabled`     | `boolean`                                                                          | `false`                 | Renders the RangeSlider as non-interactive.                                          |
| `max`          | `number`                                                                           | `100`                   | Maximum selectable value.                                                            |
| `min`          | `number`                                                                           | `0`                     | Minimum selectable value.                                                            |
| `size`         | `'small' \| 'medium'`                                                              | `'medium'`              | Thumb and rail size.                                                                 |
| `step`         | `number`                                                                           | `1`                     | Value increment used by keyboard, pointer, and touch interactions. Must be positive. |
| `value`        | `{ start: number; end: number }`                                                   | –                       | Controlled range values. Mutually exclusive with `defaultValue`.                     |
| `vertical`     | `boolean`                                                                          | `false`                 | Renders vertically (smallest value at the bottom).                                   |
| `onChange`     | `(ev: React.ChangeEvent<HTMLInputElement>, data: RangeSliderOnChangeData) => void` | –                       | Fires whenever either thumb value changes.                                           |

#### RangeSlider Slots

| Slot         | Type    | Description                                                                                                  |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| `root`       | `div`   | Receives `className`/`style` props from `<RangeSlider>`.                                                     |
| `rail`       | `div`   | Visual rail showing both the full span and the active selection.                                             |
| `startThumb` | `div`   | Lower-value thumb. Contains `role="slider"`.                                                                 |
| `endThumb`   | `div`   | Upper-value thumb. Contains `role="slider"`.                                                                 |
| `startInput` | `input` | Hidden `<input type="range">` mirroring the start value for form submissions and pointer/touch selection.    |
| `endInput`   | `input` | Hidden `<input type="range">` mirroring the end value. Receives most native props passed to `<RangeSlider>`. |

#### Types

```ts
type RangeSliderOnChangeData = {
  value: { start: number; end: number };
};
```

### RangeSlider Structure

- **Public**

  ```tsx
  <RangeSlider defaultValue={{ start: 20, end: 80 }} />
  ```

- **Internal**

  ```tsx
  <slots.root {...slotProps.root}>
    <slots.startInput {...slotProps.startInput} />
    <slots.endInput {...slotProps.endInput} />
    <slots.rail {...slotProps.rail} />
    <slots.startThumb {...slotProps.startThumb} />
    <slots.endThumb {...slotProps.endThumb} />
  </slots.root>
  ```

- **DOM**

  ```html
  <div class="fui-RangeSlider">
    <input type="range" aria-hidden="true" tabindex="-1" value="20" />
    <input type="range" aria-hidden="true" tabindex="-1" value="80" />
    <div class="fui-RangeSlider__rail"></div>
    <div
      class="fui-RangeSlider__startThumb"
      role="slider"
      tabindex="0"
      aria-labelledby="label-123"
      aria-valuemin="0"
      aria-valuemax="80"
      aria-valuenow="20"
      aria-valuetext="20"
    ></div>
    <div
      class="fui-RangeSlider__endThumb"
      role="slider"
      tabindex="0"
      aria-labelledby="label-123"
      aria-valuemin="20"
      aria-valuemax="100"
      aria-valuenow="80"
      aria-valuetext="80"
    ></div>
  </div>
  ```

### RangeSlider Migration

RangeSlider follows the same guidance outlined in [MIGRATION.md](./MIGRATION.md).

### RangeSlider Behaviors

#### Keyboard

| Key             | Description                                                                         |
| --------------- | ----------------------------------------------------------------------------------- |
| `Tab`           | Moves focus between the start thumb, end thumb, and surrounding focusable elements. |
| `Up` / `Right`  | Increment the focused thumb by `step`.                                              |
| `Down` / `Left` | Decrement the focused thumb by `step`.                                              |
| `PageUp`        | Increment the focused thumb by `10 × step`.                                         |
| `PageDown`      | Decrement the focused thumb by `10 × step`.                                         |
| `Home`          | Move the focused thumb to its minimum allowed value.                                |
| `End`           | Move the focused thumb to its maximum allowed value.                                |

Additional logic:

- Collision detection prevents thumbs from crossing. When they meet, they stop at the collision point.
- Keyboard focus remains on the active thumb while adjusting values.

#### Cursor & Touch

- `pointerdown` on the rail selects the closest thumb and moves it to the pointer location.
- `pointermove` (or touch move) continues dragging the active thumb.
- Anti-crossing ensures thumbs never swap order. Collision is handled by clamping the active thumb to the other thumb's position.

#### Screen readers

- Hidden inputs mirror values for form submissions and remain `aria-hidden`.
- Each thumb exposes `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and optional `aria-valuetext`.
- Developers should connect external labels through `aria-labelledby` or provide `aria-label` per thumb when needed (`startThumb={{ 'aria-label': 'Minimum' }}` / `endThumb={{ 'aria-label': 'Maximum' }}`).

### RangeSlider Accessibility

| Slot         | Role     | ARIA Properties                                                                    |
| ------------ | -------- | ---------------------------------------------------------------------------------- |
| `root`       | `div`    | Container that can style `:focus-within`.                                          |
| `startInput` | none     | Hidden (`aria-hidden="true"`, `tabindex="-1"`). Mirrors the start value for forms. |
| `endInput`   | none     | Hidden (`aria-hidden="true"`, `tabindex="-1"`). Mirrors the end value.             |
| `rail`       | none     | Visual only.                                                                       |
| `startThumb` | `slider` | Announces the lower value range.                                                   |
| `endThumb`   | `slider` | Announces the upper value range.                                                   |

Focus order: start thumb → end thumb → next focusable element. Each thumb supports high-contrast focus visuals and voice/keyboard control.

### RangeSlider Open UI Research

Range sliders share the same Open UI research references as Slider.

### RangeSlider Out of scope

- Built-in tick marks or labeled segments.
- Non-linear ranges (logarithmic scales, custom easing).

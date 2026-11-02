# @fluentui/react-range-slider-preview Spec

## Background

RangeSlider lets users select a range between two values along the same rail. Two thumbs share the rail, and the selected range between them is highlighted. The component reports `{ start, end }` objects for both uncontrolled (`defaultValue`) and controlled (`value`) usage.

RangeSlider follows the visual language and interaction patterns of `Slider` from `@fluentui/react-slider`, adding a second thumb, collision handling and two values exposed as `{ start, end }`.

## Sample Code

```tsx
import { RangeSlider } from '@fluentui/react-range-slider-preview';
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

## Glossary

- **Bounds**: `min` and `max`, the smallest and largest values the rail represents. "Min" and "max" refer only to the bounds, never to a thumb.
- **Start value** / **end value**: the two ends of the selected range. The start value is always the smaller one, whatever the orientation or text direction: it is on the left in LTR, on the right in RTL, and at the bottom when vertical.
- **Start thumb** / **end thumb**: the thumbs that represent the start and end values. Each owns one native range input.
- **Selected range**: the part of the rail between the start and end values.
- **Active thumb**: the thumb drawn on top when the thumbs overlap, and moved by a press exactly on them. It is the last thumb used, or the enabled thumb when the other one is disabled.
- **Disabled thumb**: a single thumb locked through its input slot. It still announces and submits its value but ignores changes. A disabled RangeSlider disables both thumbs.

## Variants

- **Size** (`size?: 'medium' | 'small'`): Medium is default, small tightens thumb and rail dimensions.
- **Orientation** (`vertical?: boolean`): Vertical sliders place the start value at the bottom and the end value at the top.
- **State** (`disabled?: boolean`): A disabled RangeSlider removes both thumbs from the tab order and ignores pointer, touch and keyboard input. A single thumb is disabled through `disabled` on its `startInput` or `endInput` slot.

## API

### Props

| Prop           | Type                                                                                            | Default                    | Description                                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultValue` | `{ start: number; end: number }`                                                                | `{ start: min, end: max }` | Starting range for uncontrolled usage; the full range by default, ending on the last step value when `step` doesn't divide the range. Mutually exclusive with `value`.       |
| `disabled`     | `boolean`                                                                                       | `false`                    | Disables both thumbs. Takes precedence over `disabled` on the input slots.                                                                                                   |
| `max`          | `number`                                                                                        | `100`                      | Upper bound.                                                                                                                                                                 |
| `min`          | `number`                                                                                        | `0`                        | Lower bound.                                                                                                                                                                 |
| `size`         | `'small' \| 'medium'`                                                                           | `'medium'`                 | Thumb and rail size.                                                                                                                                                         |
| `step`         | `number`                                                                                        | `1`                        | Value increment used by keyboard, pointer, and touch interactions, counted from `min`. Must be positive.                                                                     |
| `value`        | `{ start: number; end: number }`                                                                | –                          | Controlled range values. Mutually exclusive with `defaultValue`. A value with `start` greater than `end` is displayed sorted, and off-step values snap to the nearest step.  |
| `vertical`     | `boolean`                                                                                       | `false`                    | Renders vertically (start value at the bottom).                                                                                                                              |
| `onChange`     | `(ev: React.ChangeEvent<HTMLInputElement> \| React.PointerEvent<HTMLDivElement>, data) => void` | –                          | Fires whenever either value changes, with `start` never greater than `end`. `data.type` is `'change'` for keyboard and assistive technology input, `'pointer'` for the rail. |

Other props:

- `ref`, `id`, `className`, `style` and event handlers apply to the root group. Each input is reachable through its slot's `ref`.
- `aria-label` / `aria-labelledby` (or a surrounding `Field`) label the group and, unless a slot provides its own label, each input.
- `name`, `form`, `required`, `aria-describedby` and `aria-invalid` apply to both inputs, so a shared `name` submits both values, start first.
- Props that describe a single thumb (`aria-valuetext`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`) are not accepted on RangeSlider; set them on the input slots.

### Hooks

- `useRangeSliderBase_unstable(props, ref)`: design-free base hook (slots, ARIA, pointer and keyboard handling, value state). It takes `RangeSliderBaseProps` (no `size`), has no styling or focus-ring tracking, and is what headless RangeSlider builds on.
- `useRangeSlider_unstable(props, ref)`: the styled hook; adds `size` and focus-within tracking on the thumbs for the focus ring.

### Slots

| Slot         | Type    | Description                                                                                                                      |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `root`       | `div`   | `role="group"`. Receives `ref`, `id`, `className`, `style` and event handlers from `<RangeSlider>`.                              |
| `rail`       | `div`   | Visual rail showing both the full span and the selected range.                                                                   |
| `startThumb` | `div`   | Visual-only thumb for the start value. Wraps the start input.                                                                    |
| `endThumb`   | `div`   | Visual-only thumb for the end value. Wraps the end input.                                                                        |
| `startInput` | `input` | Transparent `<input type="range">` layered over the start thumb. Owns the start value; takes the per-thumb label and `disabled`. |
| `endInput`   | `input` | Transparent `<input type="range">` layered over the end thumb. Owns the end value; takes the per-thumb label and `disabled`.     |

### Types

```ts
type RangeSliderValue = { start: number; end: number };

type RangeSliderOnChangeData = (
  | EventData<'change', React.ChangeEvent<HTMLInputElement>>
  | EventData<'pointer', React.PointerEvent<HTMLDivElement>>
) & {
  value: RangeSliderValue;
};
```

## Structure

- **Public**

  ```tsx
  <RangeSlider
    aria-labelledby={labelId}
    defaultValue={{ start: 20, end: 80 }}
    startInput={{ 'aria-label': 'Minimum price' }}
    endInput={{ 'aria-label': 'Maximum price' }}
  />
  ```

- **Internal**

  ```tsx
  <slots.root {...slotProps.root}>
    <slots.rail {...slotProps.rail} />
    <slots.startThumb {...slotProps.startThumb}>
      <slots.startInput {...slotProps.startInput} />
    </slots.startThumb>
    <slots.endThumb {...slotProps.endThumb}>
      <slots.endInput {...slotProps.endInput} />
    </slots.endThumb>
  </slots.root>
  ```

- **DOM**

  ```html
  <div class="fui-RangeSlider" role="group" aria-labelledby="price-label">
    <div class="fui-RangeSlider__rail"></div>
    <div class="fui-RangeSlider__startThumb" role="presentation">
      <input
        class="fui-RangeSlider__startInput"
        type="range"
        aria-label="Minimum price"
        min="0"
        max="80"
        step="1"
        value="20"
      />
    </div>
    <div class="fui-RangeSlider__endThumb" role="presentation">
      <input
        class="fui-RangeSlider__endInput"
        type="range"
        aria-label="Maximum price"
        min="20"
        max="100"
        step="1"
        value="80"
      />
    </div>
  </div>
  ```

## Migration

RangeSlider follows the same guidance outlined in [MIGRATION.md](./MIGRATION.md).

## Behaviors

### Keyboard

| Key             | Description                                                                         |
| --------------- | ----------------------------------------------------------------------------------- |
| `Tab`           | Moves focus between the start thumb, end thumb, and surrounding focusable elements. |
| `Up` / `Right`  | Increment the focused thumb by `step`.                                              |
| `Down` / `Left` | Decrement the focused thumb by `step`.                                              |
| `PageUp`        | Increment the focused thumb by the browser's page amount (at least `step`).         |
| `PageDown`      | Decrement the focused thumb by the browser's page amount (at least `step`).         |
| `Home`          | Move the focused thumb to its minimum allowed value.                                |
| `End`           | Move the focused thumb to its maximum allowed value.                                |

Additional logic:

- Thumbs never cross: a thumb stops at the other thumb's value.
- A disabled thumb stays focusable but ignores keys.
- Keys keep their native range input behavior, as in Slider. Browsers page by a share of the input's own `min`–`max` (10% in Chromium), and each input's range ends at the other thumb, so a page moves less as the thumbs get closer.

### Cursor & Touch

- `pointerdown` on the rail moves the closest thumb to the pointer location. When the thumbs overlap, the thumb on the side of the press moves; a press exactly on them moves the active thumb.
- When one thumb is disabled, a press anywhere moves the enabled thumb, stopped at the disabled one.
- `pointerdown` on a thumb grabs it without changing its value; dragging then moves it by the pointer's movement. Pressing overlapping thumbs picks the thumb from the direction of the first move.
- `pointermove` (or touch move) continues dragging the thumb.
- Only the primary button moves a thumb.

### Screen readers

- The group is named by the RangeSlider's label; each thumb should be named by its own label through its input slot.
- The native inputs keep their default `role="slider"`. Each input's `min`/`max` reflect the other thumb, so a thumb announces the range it can actually move in.
- A thumb disabled on its own uses `aria-disabled`, so it stays discoverable and announces its value. A disabled RangeSlider uses native `disabled`.
- When `vertical` is true, both native inputs expose `aria-orientation="vertical"` (per [ARIA slider](https://w3c.github.io/aria/#aria-orientation) and [APG multi-thumb guidance](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/)).

## Accessibility

RangeSlider follows the [APG multi-thumb slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/). The root is a labelled group, and each thumb is a native slider with its own label, so screen reader users can tell the start and end thumbs apart.

## Out of scope

- Built-in tick marks or labeled segments.
- Non-linear ranges (logarithmic scales, custom easing).
- A minimum distance between the thumbs.
- A separate change event that fires when a drag ends.
- More than two thumbs.

## Open UI Research

- <https://open-ui.org/components/slider.research.parts>
- <https://open-ui.org/components/slider.research>

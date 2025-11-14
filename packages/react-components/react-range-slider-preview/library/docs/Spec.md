# @fluentui/react-range-slider-preview-preview Spec

## Background

The RangeSlider component enables users to select a range of values by manipulating two thumbs on a slider rail. Unlike a single-value Slider, the RangeSlider allows for the selection of both a minimum and maximum value within a defined range, making it ideal for filtering, price ranges, and other scenarios where users need to specify boundaries.

## Sample Code

```tsx
import { RangeSlider } from '@fluentui/react-slider';
import { Label, Field, useId } from '@fluentui/react-components';

// Basic usage with label
const BasicExample = () => {
  const labelId = useId();
  return (
    <>
      <Label id={labelId}>Basic Range Slider Example</Label>
      <RangeSlider defaultValue={[20, 80]} aria-labelledby={labelId} />
    </>
  );
};

// Basic usage with field
const BasicExample = () => {
  return (
    <Field label="Basic Range Slider Example">
      <RangeSlider defaultValue={[20, 80]} vertical />
    </Field>
  );
};

// Controlled usage
const ControlledExample = () => {
  const [value, setValue] = React.useState<[number, number]>([25, 75]);
  return <RangeSlider value={value} onChange={(ev, data) => setValue(data.value)} min={0} max={100} step={5} />;
};
```

## Variants

The RangeSlider supports the following variants:

**Size** (`size?: 'medium' | 'small'`)

- `medium` (default): Standard sizing for most use cases
- `small`: Smaller thumb and track dimensions for compact layouts

**Orientation** (`vertical?: boolean`)

- `vertical={false}` (default): Traditional left-to-right slider layout
- `vertical={true}`: Bottom-to-top slider layout for space-constrained interfaces

**State** (`disabled?: boolean`)

- `disabled={false}` (default): Interactive state allowing user input
- `disabled={true}`: Non-interactive state with visual indication

## API

### Props

| Prop           | Type                                                                               | Default    | Description                                                                                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultValue` | `[number, number]`                                                                 | `[0, 10]`  | The starting range values for an uncontrolled RangeSlider. Mutually exclusive with `value` prop.                                                                                       |
| `disabled`     | `boolean`                                                                          | `false`    | Whether to render the RangeSlider as disabled.                                                                                                                                         |
| `max`          | `number`                                                                           | `100`      | The max value of the RangeSlider.                                                                                                                                                      |
| `min`          | `number`                                                                           | `0`        | The min value of the RangeSlider.                                                                                                                                                      |
| `size`         | `'small' \| 'medium'`                                                              | `'medium'` | The size of the RangeSlider.                                                                                                                                                           |
| `step`         | `number`                                                                           | `1`        | The number of steps that the RangeSlider's values will increment upon change. When provided, the RangeSlider will snap to the closest available values. This must be a positive value. |
| `value`        | `[number, number]`                                                                 | -          | The current range values of the controlled RangeSlider. Mutually exclusive with `defaultValue` prop.                                                                                   |
| `vertical`     | `boolean`                                                                          | `false`    | Render the RangeSlider in a vertical orientation, smallest value on the bottom.                                                                                                        |
| `onChange`     | `(ev: React.ChangeEvent<HTMLInputElement>, data: RangeSliderOnChangeData) => void` | -          | Triggers a callback when the range values have been changed. This will be called on every individual step.                                                                             |

### Slots

| Slot         | Type    | Description                                                                                                                                                                                                                       |
| ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`       | `div`   | The root of the RangeSlider. The root slot receives the `className` and `style` specified directly on the `<RangeSlider>`. All other native props will be applied to the primary slot, `input`.                                   |
| `rail`       | `div`   | The RangeSlider's base. It is used to visibly display the min and max selectable values.                                                                                                                                          |
| `lowerThumb` | `div`   | The lower draggable thumb used to select the minimum value of the range. This is the element containing `role = 'slider'`.                                                                                                        |
| `upperThumb` | `div`   | The upper draggable thumb used to select the maximum value of the range. This is the element containing `role = 'slider'`.                                                                                                        |
| `input`      | `input` | The hidden input for mouse/touch interactions. This is the PRIMARY slot: all native properties specified directly on `<RangeSlider>` will be applied to this slot, except `className` and `style`, which remain on the root slot. |

### Types

```typescript
type RangeSliderOnChangeData = {
  value: [number, number]; // The range values [lower, upper] of the RangeSlider
};
```

## Structure

### Public

```tsx
<RangeSlider defaultValue={[20, 80]} />
```

### Internal

```tsx
<slots.root {...slotProps.root}>
  <slots.input {...slotProps.input} />
  <slots.rail {...slotProps.rail} />
  <slots.lowerThumb {...slotProps.lowerThumb} />
  <slots.upperThumb {...slotProps.upperThumb} />
</slots.root>
```

The component uses the following hooks internally:

- `useRangeSlider_unstable`: Main component hook that configures slots and handles props
- `useRangeSliderState_unstable`: Manages state, keyboard interactions, and mouse/touch handling
- `useRangeSliderStyles_unstable`: Applies styling to all slots
- `renderRangeSlider_unstable`: Renders the slots

### DOM

```html
<div class="fui-RangeSlider">
  <input type="range" aria-hidden="true" tabindex="-1" value="20,80" />
  <div class="fui-Slider__rail" />
  <div
    class="fui-RangeSlider__lowerThumb"
    role="slider"
    tabindex="0"
    aria-labelledby="label-123"
    aria-valuemin="0"
    aria-valuemax="80"
    aria-valuenow="20"
    aria-valuetext="20"
  />
  <div
    class="fui-RangeSlider__upperThumb"
    role="slider"
    tabindex="0"
    aria-labelledby="label-123"
    aria-valuemin="20"
    aria-valuemax="100"
    aria-valuenow="80"
    aria-valuetext="80"
  />
</div>
```

## Migration

### Migration from v8

No direct migration path - RangeSlider is a new component in Fluent UI React v9. However, here are some key differences between the v8 Slider and v9 RangeSlider:

**V8 Slider used a pure div-based approach:**

- Uses `<div>` and `<span>` elements with `role="slider"` for interactive controls
- All mouse/touch coordinate calculations and event handling implemented manually

**V9 RangeSlider uses a hybrid approach:**

- Hidden `<input type="range" aria-hidden="true">` for form integration and native browser event handling
- `<div role="slider">` thumbs for the accessible interface
- Benefits: Native form submission, reduced complexity, better browser compatibility

This hybrid approach provides the best of both worlds: native browser behavior for form handling while maintaining full control over the accessible user experience.

### Migration from v0

No migration needed - RangeSlider is a new component in Fluent UI React v9.

## Behaviors

### Interaction

#### Keyboard

Each thumb can be focused and operated independently:

| Key                 | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `Tab`               | Moves focus between the lower thumb, upper thumb, and other focusable elements |
| `Up`/`Right` Arrow  | Increments the focused thumb's value by the `step` prop                        |
| `Down`/`Left` Arrow | Decrements the focused thumb's value by the `step` prop                        |
| `PageUp`            | Increments the focused thumb's value by 10 × `step`                            |
| `PageDown`          | Decrements the focused thumb's value by 10 × `step`                            |
| `Home`              | Sets the focused thumb's value to its minimum allowed value                    |
| `End`               | Sets the focused thumb's value to its maximum allowed value                    |

**Collision Detection**: The lower thumb cannot be moved past the upper thumb, and vice versa. When thumbs meet, they stop at the collision point rather than switching positions.

#### Cursor

- `pointerdown` on the rail automatically selects the closer thumb and moves it to the clicked position
- `pointermove` during drag continues to move the active thumb
- Smart thumb selection: The system determines which thumb is closer to the click point
- Anti-crossing: Thumbs cannot be dragged past each other

#### Touch

Handles the same events as cursor interaction with touch-optimized behavior.

#### Screen readers

- **Root**: Renders as `div` container
- **Hidden input**: Handles form integration but is hidden from assistive technology (`aria-hidden="true"`)
- **Thumbs**: Each thumb has `role="slider"` with appropriate ARIA attributes (`aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`, `aria-labelledby`)

## Accessibility

### Component Roles and ARIA Properties

| Slot         | Role     | ARIA Properties                                                                     |
| ------------ | -------- | ----------------------------------------------------------------------------------- |
| `root`       | (none)   | Container div with focus-within behavior                                            |
| `input`      | (none)   | Hidden native input (`aria-hidden="true"`, `tabindex="-1"`) for form integration    |
| `rail`       | (none)   | Visual presentation only                                                            |
| `lowerThumb` | `slider` | `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`, `tabindex="0"` |
| `upperThumb` | `slider` | `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`, `tabindex="0"` |

### Keyboard Navigation

**Tab Order**: Lower thumb → Upper thumb → next focusable element

**Arrow Key Navigation** (per ARIA pattern):

- `↑`/`→`: Increment focused thumb by `step`
- `↓`/`←`: Decrement focused thumb by `step`
- `PageUp`: Increment by 10 × `step`
- `PageDown`: Decrement by 10 × `step`
- `Home`: Move to minimum allowed value (respecting collision boundaries)
- `End`: Move to maximum allowed value (respecting collision boundaries)

### State Change Announcements

- **Value Updates**: Automatically announced via `aria-valuenow` and `aria-valuetext` changes
- **State Changes**: `aria-disabled` changes announced when component is enabled/disabled

### Focus and Hover Behavior

- **Focus indicators**: Appear only during keyboard navigation, not mouse interaction
- **Focus management**: Each thumb receives independent focus via tabbing
- **Hover states**: Provide visual feedback without requiring special keyboard interaction

### Focus Management

- **No focus trapping**: Users control focus through standard Tab navigation
- **Focus-within**: Root container uses focus-within for enhanced styling during thumb focus

### Labeling and States

- **Disabled**: Both thumbs receive `aria-disabled="true"` and are removed from tab order (`tabindex="-1"`)
- **Labeled**: When used inside a `<Field>` component, thumbs automatically receive `aria-labelledby` referencing the Field's label. When using standalone `<Label>` elements, developers should provide an `id` on the Label and pass it via the `aria-labelledby` prop to RangeSlider (e.g., `<Label id={labelId}>...</Label>` and `<RangeSlider aria-labelledby={labelId} />`). Alternatively, distinct labels can be provided to individual thumbs via slot props: `lowerThumb={{ 'aria-label': 'Minimum' }}` and `upperThumb={{ 'aria-label': 'Maximum' }}`.

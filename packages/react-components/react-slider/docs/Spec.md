# @fluentui/react-slider Spec

## Background

The Slider component allows users to quickly select a value by dragging an icon across a bar. It is often used when setting values with a relaxed precision such as audio volume and screen brightness.

## Variants

- `vertical` displayed vertically.
- `disabled` read-only and does not update state.

## API

### Slots

- `root` - The outer container that wraps the slider structure.
- `rail` - The Slider's base. It is used to visibly display the min and max selectable values.
- `thumb` - The draggable icon used to select a given value from the Slider. This is the element containing `role = 'slider'`.
- `input` - The hidden input for the Slider. This is the PRIMARY slot: all native properties specified directly on `<Slider>` will be applied to this slot, except `className` and `style`, which remain on the root slot.

### Props

See API at [Slider.types.ts](./src/components/Slider/Slider.types.ts).

## Structure

- _**Public**_
  ```jsx
  <Slider defaultValue={50} min={10} max={100} />
  ```
- _**Internal**_

  ```jsx
  <slots.root {...slotProps.root}>
    <slots.input {...slotProps.input} />
    <slots.rail {...slotProps.rail} />
    <slots.thumb {...slotProps.thumb} />
  </slots.root>
  ```

- _**DOM** - how the component will be rendered as HTML elements_

```jsx
<div className="fui-Slider">
  <input className="fui-Slider__input" type="range" value="50" min="10" max="100" />
  <div className="fui-Slider__rail" />
  <div className="fui-Slider__thumb" />
</div>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

- _Component States_

  - **Disabled**
    - When disabled, all touch and mouse events are ignored, and the Slider's value never updates.
    - Does not allow focus and is read only.
  - **Focused**
    - Focus indicators only appear when keyboard tabbing/directional keystrokes and disappears when the mouse/touch interactions occur.

- _Interaction_
  - _Keyboard_
    | Key | Description |
    | - | - |
    | `Up`/`Right` | Increments the value of the slider by the `step` prop. |
    | `Down`/`Left` | Decrements the value of the slider by the `step` prop.|
    | `PageUp`/`Up/Right & Shift`| Increments the value of the slider by 10 _ `step`. |
    | `PageDown` /`Down/Left & Shift`| Decrements the value of the slider by 10 _ `step`. |
    | `Home` | Sets value to the `min` prop. |
    | `End` | Sets value to the `max` prop. |
  - _Cursor_
    `pointerdown` sets the current value immediately.
    `pointermove` changes the slider value as mouse is moved
  - _Touch_
    Handles the same events as the _Cursor_
  - _Screen readers_
    - **`root`:**
      - renders `as` div
    - **`hidden input element`:**
      - Handles aria for the Slider.

## Accessibility

`Slider` design pattern: [W3 Slider](https://www.w3.org/TR/wai-aria-1.1/#slider)

## Open UI Research

https://open-ui.org/components/slider.research.parts
https://open-ui.org/components/slider.research

## Out of scope

- built in marks
- dual thumb 'ranged' slider
- origin

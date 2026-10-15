## Best practices

### Layout

- Don't use a slider for binary settings.
- Don't use a continuous slider if the range of values is large.
- Don't use for a range with fewer than three values.
- Sliders are typically horizontal but can be vertical, when needed.

### Content

- Use step points if you don't want the slider to allow arbitrary values between minimum and maximum.

### Accessibility

- Label each thumb separately through the `startInput` and `endInput` slots (for example "Minimum price" and "Maximum price"). Without per-thumb labels both thumbs share the RangeSlider's label.
- Set `aria-valuetext` on the `startInput` and `endInput` slots when the number alone doesn't describe the value (for example "$20").
- A `name` set on the RangeSlider is submitted for both inputs, lower value first. Set `name` on the `startInput` and `endInput` slots to submit them under different names.

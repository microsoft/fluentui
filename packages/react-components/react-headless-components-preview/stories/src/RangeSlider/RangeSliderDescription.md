A range slider lets users select a range by dragging two thumbs along one rail: one for the start value, one for the end value.

Use RangeSlider for filters where an approximate range matters, such as a price or date span. The start value is always the smaller one; thumbs stop at each other instead of crossing.

**Accessibility:** name the RangeSlider with `aria-label`, `aria-labelledby` or a surrounding `Field`, and give each thumb its own name through the `startInput` and `endInput` slots (for example "Minimum price" and "Maximum price"). Each thumb wraps a native `<input type="range">`.

**Styling:**

- Position the thumbs and the selected range with the `--fui-RangeSlider--start-progress` and `--fui-RangeSlider--end-progress` CSS variables set on the root.
- The root handles pointer and touch input: give it `touch-action: none`, and keep the inputs from intercepting it with `pointer-events: none`.

**State attributes:**

| Attribute       | Slot                      | Present when                                                                                |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------- |
| `data-disabled` | root                      | the whole RangeSlider is disabled                                                           |
| `data-vertical` | root                      | the RangeSlider is vertical                                                                 |
| `data-disabled` | `startThumb` / `endThumb` | that thumb is disabled, by the whole RangeSlider or by `disabled` on its input slot         |
| `data-active`   | `startThumb` / `endThumb` | that thumb should be drawn on top when the thumbs overlap (last used, or the enabled thumb) |

Slider is accessible if these considerations are followed:

- Use role="slider" for control to be identified as a slider by screen readers.
- Use `aria-label` or `aria-labelledby` for screen readers to identify the name of the slider.
- The slider thumb should be accessible using TAB key.
- Right/up arrow key should increment the slider by 1 point and left/down arrow key should decrement the slider by 1 point.
- Page op/page down should increment/decrement the slider by 10 points.
- Home/End key would take the slider to its maximum / minimum value respectively.
- Screen reader should convey the current value when the value of the slider changes.
- Use `aria-valuemax`, `aria-valuemin`, and `aria-valuenow` to expose the maximum, minimum and current value to screen reader.
- Make sure dragging the slider thumb is not the only way to adjust the value, alternately slider should change its value with respect to the point clicked or touched on the slider.
- The contrast ratio of slider bar fill color or border color is at least 3:1 with respect to adjacent background color.
- Slider thumb should be large enough so that it could be easily adjustable using a pointing device.

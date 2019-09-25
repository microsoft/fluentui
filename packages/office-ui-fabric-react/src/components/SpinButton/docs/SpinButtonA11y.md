Spin Button is accessible if these considerations are followed:

- Spin button should be accessible with `TAB` key.
- Up arrow should increment the value and down arrow should decrement the value.
- Screen reader should announce the value while changing using up/down arrow keys.
- `role="spinbutton"` should be defined for screen readers to identify it as spin buttons.
- Spin button should have associated label either by using `<label for="id">` attribute or using `aria-label` property.
- Any extra screen reader specific information should be provided using `aria-describedby` property, as screen reader would announce it after reading label, role and value of the spin button.
- The maximum, minimum, and current value of a spin button should be defined using `aria-valuemax`, `aria-valuemin`, and `aria-valuenow` properties.
- The icon on the increment / decrement button should have contrast ratio of at least 3:1 to its fill color.

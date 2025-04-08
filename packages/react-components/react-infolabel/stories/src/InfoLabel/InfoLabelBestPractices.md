## Best practices

### Do

- Use the medium (default) or large sizes when possible to ensure the InfoButton meets the [minimum target size requirement](https://w3c.github.io/wcag/understanding/target-size-minimum.html).
- When using the small size, ensure one of the following is true:
  - The InfoButton has at least 2px of space between it and the closest interactive control on all sides (this is already guaranteed if using a small InfoLabel with a small Field component).
  - Only use the small variant if the end user has chosen a compact/small layout (i.e. not as the default layout)

### Don't

- Because the Popover isn't always visible, don't include information in the `info` prop that people must know in order to complete the field.

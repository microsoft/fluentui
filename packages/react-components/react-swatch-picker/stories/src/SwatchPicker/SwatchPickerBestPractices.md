## Best practices

### Do

- Maximum recommended number of swatches per row is 8.
- Use a grid layout when there are more than 4 swatches. The maximum recommended number of swatches in a grid is 64 - an 8 x 8 grid.
- Tooltip should be shown for each color.
- Consider using [Polished](https://polished.js.org/) or [color-parse](https://www.npmjs.com/package/color-parse) library for calculation of contrast ratio.
- When using an icon, make sure that the contrast ratio between the icon and a swatch is a least 3:1.

### Don't

- Avoid using rounded corners in a grid layout for the SwatchPicker, as it may cause the [Hermann grid illusion](https://en.wikipedia.org/wiki/Grid_illusion).
- When using `extra small` or smaller swatches spacing should be not less than 4px to ensure they pass the [WCAG target size requirement](https://w3c.github.io/wcag/understanding/target-size-minimum.html).
- Avoid showing more than 4 disabled swatches.

### Accessibility

- Use contrasting borders for swatches when contrast ratio between background and swatch is less than 3.
- The minimum size of the target for pointer inputs should be at least 24 by 24 CSS pixels. This is required to meet the [WCAG target size requirement](https://w3c.github.io/wcag/guidelines/22/#target-size-minimum).
- Labels for the swatches can be handled with either `aria-label` or a Tooltip. These are required for both voice control and screen reader users.

_Known limitations:_

- The `radiogroup` role used for the SwatchPicker does not fully match standard radio keyboard behavior because color selection must be confirmed by pressing enter/space, unlike Radiogroup. But because this pattern has more robust cross-platform support, the `radiogroup` role will be used for the `row` layout.
- For the `grid` layout the `grid` role is used, and swatches have a role of `gridcell`. This is because the grid pattern is the only one that supports a two-dimensional layout and arrowing behavior, even though the `aria-selected` attribute on `gridcell` is not well-supported on all screen readers, and there is no better alternative.

<details>
  <summary>
    Best practices
  </summary>

### Do

- Maximum recommended number of swatches per row is 8.
- Use a grid layout when there are more than 4 swatches. The maximum recommended number of swatches in a grid is 64 - an 8 x 8 grid.
- Tooltip should be shown for each color.

### Don't

- Avoid using rounded corners in a grid layout for the SwatchPicker, as it may cause the Hermann grid illusion.
- When using `extra small` or smaller swatches spacing should be not less than 4px.

### Accessibility

- Use contrast borders for swatches when contrast ratio between background and swatch is less than 3.
- Minimum size of the target for pointer inputs should be at least 24 by 24 CSS pixels. It's not recommended to use smaller size.
- Labels for the swathces are part of `aria-label` and a tooltip.

_Known limitations:_

- `radiogroup` role is not expected for the SwatchPicker because color selection must be confirmed by pressing enter/space unlike Radiogroup. But because `aria-checked` attribute is supported everywhere the role `radiogroup` will be used for the `row` layout.

- For the `grid` layout role `grid` is used with rows inside and swatches with a role `gridcell`. But `aria-selected` attribute is not supported on Mac and there is no better alternative.

</details>

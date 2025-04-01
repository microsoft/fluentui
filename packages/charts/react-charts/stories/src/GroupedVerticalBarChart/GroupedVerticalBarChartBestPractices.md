### Layout

A stacked bar chart is used to emphasize the composition of a category and how individual components contribute to it.
On the other hand, a grouped bar chart is used to compare distinct values across various categories or groups separately.

Refer to Vertical Bar Chart page for common layout guidance.

### Content

Refer to Vertical Bar Chart page for common content guidance.

### Accessibility

Refer to Vertical Bar Chart page for common accessibility guidance.

### Customizing the chart

- Use the `barwidth` prop to customize the width of each bar in the chart. When set to `undefined` or `'default'`, the bar width defaults to 16px, which may decrease to prevent overlap. When set to `'auto'`, the bar width is calculated from padding values. For a fixed bar width, specify an absolute pixel value like `40`.

- Use the `maxBarWidth` prop to limit the width of bars to a specified number of pixels.

- Use the `xAxisInnerPadding` and `xAxisOuterPadding` props to adjust the padding between groups and the padding before the first group and after the last group, respectively. These props accept values between 0 and 1, representing a fraction of the `step`, which is the interval between the start of a group and the start of the next group. These props are particularly relevant when using a string x-axis. By default, the inner padding is set to `2 / (2 + groupWidthInTermsOfBarWidth)`, maintaining a 2:1 spacing ratio. This default value is calculated at runtime using the formula:

  innerPadding = spaceBetweenGroups / (spaceBetweenGroups + groupWidth)

  For a more detailed explanation of how these values were derived, see [Implementing 2:1 spacing | FluentUI Charting Contrib Docsite](https://microsoft.github.io/fluentui-charting-contrib/docs/implementing-2-to-1-spacing). For additional information on padding in string axes, see [Band scales | D3 by Observable](https://d3js.org/d3-scale/band#band_paddingInner)

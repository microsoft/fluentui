### Layout

Stacked bar charts are ideal for comparing values across two or more categories. They can easily show multiple categories on the same chart.

Refer to Vertical Bar Chart page for common layout guidance.

### Content

Refer to Vertical Bar Chart page for common content guidance.

### Accessibility

Refer to Vertical Bar Chart page for common accessibility guidance.

### Customizing the chart

Here are some commonly used properties to customize the bar chart.

- `bargapmax` sets the maximum gap between bars in a stack. See the prop for more details.

- `barCornerRadius` sets the corner radius of the bars.

- `barMinimumHeight` provides the minimum height of a bar. Bars below this height will be displayed at this height.

- Use `isCalloutForStack` to configure callout to be at stack level or individual datapoint level.

- Define a custom callout rendered per datapoint using `onRenderCalloutPerDataPoint` and per stack using `onRenderCalloutPerStack`

- Use `onBarClick` handler for callback on click of bars

- The bar labels are shown by default. Set the `hideLabels` prop to hide them.

- Use the `barWidth` prop to customize the width of each bar in the chart. When set to `undefined` or `'default'`, the bar width defaults to 16px, which may decrease to prevent overlap. When set to `'auto'`, the bar width is calculated from padding values. For a fixed bar width, specify an absolute pixel value like `40`.

- Use the `maxBarWidth` prop to limit the width of bars to a specified number of pixels.

- Use the `xAxisInnerPadding` and `xAxisOuterPadding` props to adjust the padding between bars and the padding before the first bar and after the last bar, respectively. These props accept values between 0 and 1, representing a fraction of the `step`, which is the interval between the start of a bar and the start of the next bar. These props are particularly relevant when using a string x-axis. By default, the inner padding is set to 2/3, maintaining a 2:1 spacing ratio. This default value is calculated using the formula:

  innerPadding = spaceBetweenBars / (spaceBetweenBars + barWidth)

  For a more detailed explanation of how these values were derived, see [Implementing 2:1 spacing | FluentUI Charting Contrib Docsite](https://microsoft.github.io/fluentui-charting-contrib/docs/implementing-2-to-1-spacing). For additional information on padding in string axes, see [Band scales | D3 by Observable](https://d3js.org/d3-scale/band#band_paddingInner)

### Creating Date Objects For Chart Data

For instructions on how to create date objects to be passed as data points in the chart, see [Creating Date Objects For Chart Data | FluentUI Charting Contrib Docsite](https://microsoft.github.io/fluentui-charting-contrib/docs/creating-date-objects-for-chart-data)

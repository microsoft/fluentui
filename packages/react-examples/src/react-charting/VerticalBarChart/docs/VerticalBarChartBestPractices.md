### Layout

The default bar width is 16px. For dense data, it can be as thin as 8px wide. Always consider the visual weight of the bars in relationship to the rest of the app before choosing this type of chart.

The padding around the bar chart is a default of 8px from the x and y-axis container. This gives enough room for additional content like label values to display properly without overlapping on to the X-axis ticks. A 2:1 spacing is maintained between all the bars in the graph so that space between two bars is always two times the bar width. This helps to ensure that the graph is not overpowering other data visualizations.

For charts that display monetary values, the dollar symbol should be displayed as part of the total value. Also call out the currency in the chart title to provide additional context. Chart title can be used to communicate currency when the total labels are hidden.

### Content

- **Bar segment** Bar segments make up a bar chart. Standard size options are: 8px, 16px, and 24px with 16px being the default.
- **Value labels** (Optional - Off by default) with the option to toggle on in case the data visualization needs to communicate label values to users.

### Accessibility

Bar graphs should be flexible to their containers. They will change widths to fit their environment. This also means that bar labels will rotate or truncate to best fit the available space in the chart (Auto adjusting labels coming soon).

Type truncation should happen when the total value exceeds one thousand including 1 decimal place for the hundreds. For example, display full value for 600, 983, or 19.53. Truncate 6,000 to 6.0K, 9,801 to 9.8K, and 100,900 to 100.9K.

### Customizing the chart

- The chart provides an option to select a color scale based on the range of y values. Similar y values will end up having similar colors. Use the `colors` attribute to define the color scale.

- Use `useSingleColor` to use a single color for all bars.

- Use `lineLegendText` and `lineLegendColor` to specify the text and color for legends of lines in the chart.

- The bar labels are shown by default. Set the `hideLabels` prop to hide them.

- Use the `barWidth` prop to customize the width of each bar in the chart. When set to `undefined` or `'default'`, the bar width defaults to 16px, which may decrease to prevent overlap. When set to `'auto'`, the bar width is calculated from padding values. For a fixed bar width, specify an absolute pixel value like `40`.

- Use the `maxBarWidth` prop to limit the width of bars to a specified number of pixels.

- Use the `xAxisInnerPadding` and `xAxisOuterPadding` props to adjust the padding between bars and the padding before the first bar and after the last bar, respectively. These props accept values between 0 and 1, representing a fraction of the `step`, which is the interval between the start of a bar and the start of the next bar. These props are particularly relevant when using a string x-axis. By default, the inner padding is set to 2/3, maintaining a 2:1 spacing ratio. This default value is calculated using the formula:

  innerPadding = spaceBetweenBars / (spaceBetweenBars + barWidth)

  For a more detailed explanation of how these values were derived, see [Implementing 2:1 spacing | FluentUI Charting Contrib Docsite](https://microsoft.github.io/fluentui-charting-contrib/docs/implementing-2-to-1-spacing). For additional information on padding in string axes, see [Band scales | D3 by Observable](https://d3js.org/d3-scale/band#band_paddingInner)

### Creating Date Objects For Chart Data

For instructions on how to create date objects to be passed as data points in the chart, see [Creating Date Objects For Chart Data | FluentUI Charting Contrib Docsite](https://microsoft.github.io/fluentui-charting-contrib/docs/creating-date-objects-for-chart-data)

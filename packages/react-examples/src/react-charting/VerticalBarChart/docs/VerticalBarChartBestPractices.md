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

The chart provides an option to select a color scale based on the range of y values. Similar y values will end up having similar colors. Use the `colors` attribute to define the color scale.

Use `useSingleColor` to use a single color for all bars.

Use `lineLegendText` and `lineLegendColor` to specify the text and color for legends of lines in the chart.

The bar labels are shown by default. Set the `hideLabels` prop to hide them.

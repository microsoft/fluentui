### Layout

The default bar height is 16px. For dense data, it can be as thin as 8px high. Always consider the visual weight of the bars in relationship to the rest of the app before choosing this type of chart.

The padding around the bar chart is a default of 8px from the x and y-axis container. This gives enough room for additional content like label values to display properly without overlapping on to the Y-axis ticks. A 2:1 spacing is maintained between all the bars in the graph so that space between two bars is always two times the bar height. This helps to ensure that the graph is not overpowering other data visualizations. For charts that display monetary values, the dollar symbol should be displayed as part of the total value. Also call out the currency in the chart title to provide additional context. Chart title can be used to communicate currency when the total labels are hidden.

The chart can accommodate unusually long labels by shrinking the bars without distorting the visual layout.

### Content

- **Bar segment** Bar segments make up a bar chart. Standard size options are: 8px, 16px, and 24px with 16px being the default.
- **Value labels** (Optional) - Off by default with the option to toggle on in case the data visualization needs to communicate label values to users.

### Accessibility

- Bar graphs should be flexible to their containers. They will change width and height to fit their environment.
- Type truncation should happen when the total value exceeds one thousand including 1 decimal place for the hundreds. For example, display full value for 600, 983, or 19.53. Truncate 6,000 to 6.0K, 9,801 to 9.8K, and 100,900 to 100.9K.
- All the bars of the graph are accessible by screen readers and keyboard navigation using Up and Down arrow keys.

### Customizing the chart

The chart provides an option to select a color scale based on the range of x values. Similar x values will end up having similar color. Use the colors attribute to define the color scale.

Use `useSingleColor` to use a single color for all bars.

See `onRenderCalloutPerHorizontalBar` prop to customize the hover callout.

If the y data points are of string type there are 2 modes to view them

1. truncate yaxis labels using `showYAxisLablesTooltip`
2. shrink the x axis and display the complete labels using `expandYAxisLabels` property.

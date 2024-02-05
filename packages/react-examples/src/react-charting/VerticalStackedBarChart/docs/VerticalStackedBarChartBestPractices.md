### Layout

Stacked bar charts are ideal for comparing values across two or more categories. They can easily show multiple categories on the same chart.

Refer to Vertical Bar Chart page for common layout guidance.

### Content

Refer to Vertical Bar Chart page for common content guidance.

### Accessibility

Refer to Vertical Bar Chart page for common accessibility guidance.

### Customizing the chart

Here are some commonly used properties to customize the bar chart.

`bargapmax` sets the maximum gap between bars in a stack. See the prop for more details.

`barCornerRadius` sets the corner radius of the bars.

`barMinimumHeight` provides the minimum height of a bar. Bars below this height will be displayed at this height.

Use `isCalloutForStack` to configure callout to be at stack level or individual datapoint level.

Define a custom callout rendered per datapoint using `onRenderCalloutPerDataPoint` and per stack using `onRenderCalloutPerStack`

Use `onBarClick` handler for callback on click of bars

The bar labels are shown by default. Set the `hideLabels` prop to hide them.

For instructions on how to create date objects to be passed as data points in the chart, see [Creating Date Objects For Chart Data | FluentUI Charting Contrib Docsite](https://microsoft.github.io/fluentui-charting-contrib/docs/creating-date-objects-for-chart-data)

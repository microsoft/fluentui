### Layout

The stacked bar chart is available in 100% format for actual scale and n/M scale.

Refer to horizontal bar chart page for common layout guidance.

### Content

The stacked bar chart has legends component to interact with individual categories.

Refer to horizontal bar chart page for common content guidance.

### Accessibility

Refer to horizontal bar chart page for common accessibility guidance.

### Customizing the chart

- Single stacked bar chart takes `data` attribute which is of type `IChartDataPoint[]`
- Ratio on top of the chart is shown if it has only two data points. For the rest of cases the ratio is not shown
- A number is displayed on the top of stacked bar chart if it has only one data point. This number shown is the data that is passed to the chart.
- Stacked bar chart supports specifying a target value for the chart. The target shows up as a colored arrow in the chart. It can be set using the `targetData` prop.
- Stacked bar chart also supports specifying a benchmark value for the chart. The benchmark shows up as a colored arrow in the chart. It can be set using the `benchmarkData` prop.
- Ratio and number are not shown if `ignoreFixStyle` is set to true. They are also ignored if `hideNumberDisplay` is set to true. `chartDataAccessibilityData` prop is enabled only if ratio or numbers are enabled to be shown.
- If a datapoint is marked as `placeHolder` there will be no corresponding legend.
- Use `onRenderCalloutPerDataPoint` to customize the hover callout content.
- If `enabledLegendsWrapLines` is set, long legends will be wrapped otherwise legends will be showed as an overflow callout.

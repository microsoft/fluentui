### Layout

The multistacked bar chart is available for actual scale and n/M scale.

Refer to horizontal bar chart page for common layout guidance.

### Content

The multistacked bar chart has legends component to interact with individual categories.

Refer to horizontal bar chart page for common content guidance.

### Accessibility

Refer to horizontal bar chart page for common accessibility guidance.

### Customizing the chart

- Multi-stacked bar chart takes `data` attribute which is of type `IChartDataPoint[][]`. It will render the chart based upon the values given to this attribute.
- MultiStackedBarChart has an option `hideRatio` which shows/hides the ratio on top right of the chart. It is a `boolean[]`, one bool for each bar group. This value is applicable only when there are 2 datapoints in the chart. Similarly, there is an option `hideDenominator` to hide the denominator of the ratio if it is enabled.
- If a datapoint is marked as `placeHolder` there will be no corresponding legend. The default color of placeholder data is `tertiary grey`.
- If a chart in MultiStackedBarChart shows ratio or number, legends are not displayed for that chart and vice-versa.
- A number is displayed on the top of stacked bar chart if it has only one data point. This number shown is the datapoint that is passed to the chart.
- The bar labels are shown by default in the absolute-scale variant. Set the `hideLabels` prop to hide them.

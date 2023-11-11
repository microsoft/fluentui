### Layout

Use a horizontal bar graph to compare between different values that are hierarchically equivalent. The rectangular bar length is proportional to the values they represent. There will always be a maximum data value (color) representing the total length.

Horizontal bar chart can be of 2 types -

- **Absolute scale** the length of the bar is proportional to the biggest value for the category.
- **n/M scale** the length of the bar is determined by the total/target value of the specific bar. As a result, 2 adjacent bars can have different data scales and not be comparable. This aspect should be kept in mind while using this chart type. See HorizontalBarChart benchmark example to see the behavior. Each bar has a different scale - 100, 200 and 50 units.

### Content

- **Title/Label** The label for the bar. It is displayed above the bar and can represent longer texts.
- **Bar segment** The bar segment represents the current value of the category. For n/M variant there is a placeholder segment to show the left-over values.
- **Bar value** The value of the bar is represented on the right side. This can be absolute or percentage format. This can also be in fractional form representing current value out of total value. See the chartDataMode property to use it.
- **Benchmark** The benchmark value is shown as an inverted triangle in the chart.

### Accessibility

- Bar graphs should be flexible to their containers. They will change widths to fit their environment.
- Each section of the bar chart is readable via screen readers. The user can navigate through the entire bar graph by using the tab keys.
- The chart reflows to accommodate zooming in to 400%.

### Customizing the chart

- **Bar chart custom data** This property allows customizing the right-side data part of the chart. See the usage of `barChartCustomData` prop in custom callout variant.
- **Custom hover callout** See `onRenderCalloutPerHorizontalBar` prop to customize the hover callout.
  Set the `chartDataMode` as number, fraction or percentage to specify how numerical values will be shown on the chart.
- **Benchmark data** Set the data attribute of `IChartDataPoint` to specify the benchmark value. The benchmark value is shown as an inverted triangle in the chart.
- **AbsoluteScale variant** The bar labels are shown by default in the absolute-scale variant. Set the `hideLabels` prop to hide them.

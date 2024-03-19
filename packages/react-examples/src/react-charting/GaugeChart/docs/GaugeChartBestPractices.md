### Layout

The library recommends a few size width and height options for charts. Product teams must consider the complexity of the data to decide what size should be used in implementation. There are 6 size options for the gauge, ranging from very small to very large. The default size is medium, with a diameter of 140px and default bar width of 16px. All have a margin of 16px on all sides.

### Content

- **Bar** This is the arc representing the semi-circle.
- **Min and max values** Used to represent minimum and maximum values for the data being measured. These can either be an absolute value or a percentage.
- **Data segment** This represents the current value as a part of the whole scale. For rating meter, it shows the relative scale of each segment.
- **Current value indicator / needle** Used to show user’s position on the semi-circular graph.
- **Chart value** This can be a number out of another (part to whole) or represented as a percentage.

### Accessibility

- Users 'Enter' into the graph and can use both arrowing and tabbing to navigate through.
- The first tab stop will stop on the graph and give a description of what type of graph it is.
- Each section of the graph is readable via a screen reader.

### Customizing the chart

- `width` and `height`: These props determine the diameter of the gauge. If not provided, a default diameter of 140px is used.
- `chartTitle`: Use this prop to render a title above the gauge.
- `chartValue`: This required prop controls the rotation of the needle. If the chart value is less than the minimum, the needle points to the min value. Similarly, if it exceeds the maximum, the needle points to the max value.
- `segments`: Use this required prop to divide the gauge into colored sections. The segments can have fixed sizes or vary with the chart value to create a sweeping effect. Negative segment sizes are treated as 0.
- `minValue`: Use this prop if the minimum value of the gauge is different from 0.
- `maxValue`: Use this prop to render a placeholder segment when the desired range for the gauge is more than the sum of all segments. If the maxValue is less than the sum of all segments, this property is ignored.
- `sublabel`: Use this prop to render additional text below the chart value.
- `hideMinMax`: Set this prop to true to hide the min and max labels of the gauge.
- `chartValueFormat`: This prop controls how the chart value is displayed. Set it to one of the following options:

  - A custom formatter function that returns a string representing the chart value.
  - `GaugeValueFormat.Fraction`: Renders the chart value as a fraction.
  - `GaugeValueFormat.Percentage`: Renders the chart value as a percentage. This is the default format.

  Note: If the min value is non-zero and no formatter function is provided, the chart value will be rendered as a number.

- `variant`: This prop determines the presentation style of the gauge chart. Set it to one of the following options:
  - `GaugeChartVariant.SingleSegment`: This variant helps represent a single metric or key performance indicator (KPI) within a predefined range or target. In this variant, the segment sizes are rendered as percentages.
  - `GaugeChartVariant.MultipleSegments`: This is the default variant that helps display the distribution of a single variable across different thresholds or categories. In this variant, the segment sizes are rendered as ranges.

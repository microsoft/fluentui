### Layout

Padding on the left and right of the chart is determined by the x-axis labels - it should start and end at or close to the first and last tick mark. The minimum padding is 8px.

Currently we support stacked area charts only.

### Content

- **Area line** An area line represents a set of values from the same data set. Each line takes on a new swatch in the data visualization library to distinguish it from others. 2px wide. There is no rounding of joints to avoid data misrepresentation.
- **Area fill** Uses the same color family as the area line, but applies a 50% opacity.

**Note:** the implemented stacked area components use transparency fills, but we cannot apply transparency in the Figma guidance

### Accessibility

- Users "Enter" into the graph and can use both arrow and tab keys to navigate through.
- The first tab stop will stop on the graph and give a description of what type of graph it is.
- Each section of the graph is readable via screen readers. The user can navigate through the entire area plot by using Left and Right arrow keys.

### Interaction

The area chart is a highly performant visual. It uses a path-based rendering mechanism to render the area component. On hovering, the nearest x datapoint is identified and the corresponding point is hovered.

### Customizing the chart

- **Stacked area chart**
  In stacked area chart, two or more data series are stacked vertically. It helps in easy comparison across different dimensions. The callout on hover for stacked chart displays multiple values from the stack. The callout can be customized to show single values or stacked values. Refer to the props `onRenderCalloutPerDataPoint` and `onRenderCalloutPerStack` using which custom content for the callout can be defined.
- **Custom accessibility**
  Area chart provides a bunch of props to enable custom accessibility messages. Use `xAxisCalloutAccessibilityData` and `callOutAccessibilityData` to configure x axis and y axis accessibility messages, respectively.

#### Axis localization

The chart axes support 2 ways of localization.

1. JavaScript provided inbuilt localization for numeric and date axis. Specify the culture and `dateLocalizeOptions` for date axis to define target localization. Refer the [Javascript localization guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) for usage.
2. Custom locale definition: The consumer of the library can specify a custom locale definition as supported by d3 [like this](https://github.com/d3/d3-time-format/blob/main/locale/en-US.json). The date axis will use the date range and the multiformat specified in the definition to determine the correct labels to show in the ticks. For example - If the date range is in days, then the axis will show hourly ticks. If the date range spans across months, then the axis will show months in tick labels and so on. Specify the custom locale definition in the `timeFormatLocale` prop. Refer to the Custom Locale Date Axis example in line chart for sample usage.

### Creating Date Objects For Chart Data

For instructions on how to create date objects to be passed as data points in the chart, see [Creating Date Objects For Chart Data | FluentUI Charting Contrib Docsite](https://microsoft.github.io/fluentui-charting-contrib/docs/creating-date-objects-for-chart-data)

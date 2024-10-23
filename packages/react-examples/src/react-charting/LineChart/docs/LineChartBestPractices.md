### Layout

Padding on the left and right of the chart is determined by the x-axis labels - it should start and end at or nearly at the first and last tick mark. The minimum padding is 8px.

### Content

- **Line** A line represents a set of values from the same data set. Each line takes on a new swatch in the data visualization library to distinguish it from others. 2px wide with rounded endpoints; no rounding of joints to avoid data misrepresentation. 6px border behind line with rounded endpoints that match background color to improve legibility and readability when two or more lines cross each other.
- **Pinpoints** Optional: Pinpoints are built into each line component and can be toggled on to reveal a unique shape to remove reliance on colors as sole identifier of data set. Size: 8px. Off by default with the option to toggle it on.

### Accessibility

- Users "Enter" into the graph and can use both arrow and tab keys to navigate through.
- The first tab stop will stop on the graph and give a description of what type of graph it is.
- Each section of the graph is readable via screen readers. The user can navigate through the entire area plot by using Left and Right arrow keys.

### Customizing the chart

Use a line graph to visualize data sets over a period of time for an individual or group of items. The number of lines (data sets) depend on the attributes selected during the report creation.

The line graph thickness will vary depending on the number of data sets and data increments.

#### Event annotations

Event annotations are used to highlight events and annotate them using messages. Annotations are represented by vertical line markers to mark the date and callouts to represent the message. Events can be added by using `eventAnnotationProps` prop. Each event contains a `date`, `event message` and event details callout callback `onRenderCard`

#### Gaps

A line chart can have gaps/breaks in between. This is to represent missing data. The gaps can also be replaced with dashed or dotted lines for specific scenarios, say to represent low confidence predictions for a time series forecast graph. Gaps can be added by using `gaps` prop. A gap is denoted by `startIndex` and `endIndex` datapoints in the line. A line will be drawn till the `startIndex` and skipped for `endIndex - startIndex` number of datapoints. A line can have as many gaps as possible.

#### Line border

Each line in the chart can contain a 2 px border for better highlighting of the line when there are multiple items in the chart. The border will have color of the background theme. Lines will be highlighted in order of their appearance in legends. Line border is a highly suggested style that you should apply to make multiple lines more distinguishable from each other. Use `lineBorderWidth` prop present inside `lineOptions` to enable it.

#### Lines with large dataset

We use a path-based rendering technique to show datasets with large number of points (greater than 1k). Using this technique datasets with over 10k points can be rendered with high performance. Enable this rendering method by setting the `optimizeLargeData` prop to true. Refer to the [performance section](https://github.com/microsoft/fluentui/blob/master/packages/react-charting/README.md#performance) to know more about our performance benchmarks.

#### Custom accessibility

Line chart provides a bunch of props to enable custom accessibility messages. Use `xAxisCalloutAccessibilityData` and `callOutAccessibilityData` to configure x axis and y axis accessibility messages, respectively.

#### Axis localization

The chart axes support 2 ways of localization.

1. JavaScript provided inbuilt localization for numeric and date axis. Specify the culture and `dateLocalizeOptions` for date axis to define target localization. Refer the [Javascript localization guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) for usage.
2. Custom locale definition: The consumer of the library can specify a custom locale definition as supported by d3 [like this](https://github.com/d3/d3-time-format/blob/main/locale/en-US.json). The date axis will use the date range and the multiformat specified in the definition to determine the correct labels to show in the ticks. For example - If the date range is in days, then the axis will show hourly ticks. If the date range spans across months, then the axis will show months in tick labels and so on. Specify the custom locale definition in the `timeFormatLocale` prop. Refer to the Custom Locale Date Axis example in line chart for sample usage.

### Creating Date Objects For Chart Data

For instructions on how to create date objects to be passed as data points in the chart, see [Creating Date Objects For Chart Data | FluentUI Charting Contrib Docsite](https://microsoft.github.io/fluentui-charting-contrib/docs/creating-date-objects-for-chart-data)

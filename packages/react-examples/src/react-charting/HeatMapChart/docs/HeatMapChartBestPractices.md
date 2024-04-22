### Layout

Heatmaps are flexible in nature. The chart can support a minimum 2x2 grid through a maximum of 10x10 grid. The nodes should span and reflow with the overall width and height of your composition.

### Content

The user has freedom to either choose a sequential palette or a range of colors that best represent the range of values. For example, AQI values of regions in a country could be represented in shades of green, orange and red based on prescribed health limits of the air quality.

### Customizing the chart

#### Defining Color scale

The color palette for a heat map chart is defined by a domain/range combination. The domain consists of values in the chart columns. It is an array of numbers. See `domainValuesForColorScale`. The range is an array `rangeValuesForColorScale` of colors in hex format. The graph creates a mapping between each value from domain to range. For all values in the domain, an equivalent interpolation is drawn in the range of color scale. For eg: if the domain is [0,500,900] and range is [green, blue, red], then [0, 500] is mapped in the range [green, blue] and [500, 900] in the range [blue, red].

#### Data formatting

Use the following formatters based on the type of axis.

- For date x axis use: `xAxisDateFormatString`
- For date y axis use: `yAxisDateFormatString`
- For numeric x axis use: `xAxisNumberFormatString`
- For numeric y axis use: `yAxisNumberFormatString`
- For string x axis use: `xAxisStringFormatter`
- For string y axis use: `yAxisStringFormatter`

#### Axis localization

The chart axes support 2 ways of localization.

1. JavaScript provided inbuilt localization for numeric and date axis. Specify the culture and `dateLocalizeOptions` for date axis to define target localization. Refer the [Javascript localization guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) for usage.
2. Custom locale definition: The consumer of the library can specify a custom locale definition as supported by d3 [like this](https://github.com/d3/d3-time-format/blob/main/locale/en-US.json). The date axis will use the date range and the multiformat specified in the definition to determine the correct labels to show in the ticks. For example - If the date range is in days, then the axis will show hourly ticks. If the date range spans across months, then the axis will show months in tick labels and so on. Specify the custom locale definition in the `timeFormatLocale` prop. Refer to the Custom Locale Date Axis example in line chart for sample usage.

### Creating Date Objects For Chart Data

For instructions on how to create date objects to be passed as data points in the chart, see [Creating Date Objects For Chart Data | FluentUI Charting Contrib Docsite](https://microsoft.github.io/fluentui-charting-contrib/docs/creating-date-objects-for-chart-data)

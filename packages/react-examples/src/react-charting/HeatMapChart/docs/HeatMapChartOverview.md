<div>
  <p>
    Heat Map Chart is a two-dimensional visual representation of data, where values are encoded in colors,
    delivering a convenient, insightful view of information. Essentially, this chart type is a data table with
    rows and columns denoting different sets of categories. Each cell in the table can contain a numerical or
    logical value that determines the cell color based on a given color palette.
  </p>
  <h4>Defining Color scale</h4>
  <p>
    The color palette for a heat map chart is defined by a domain/range combination. The domain consists of
    values in the chart columns. It is an array of numbers. See <code>domainValuesForColorScale</code>. The
    range is an array <code>rangeValuesForColorScale</code> of colors in hex format. The graph creates a
    mapping between each value from domain to range. For all values in the domain, an equivalent interpolation
    is drawn in the range of color scale. For eg: if the domain is [0,500,900] and range is [green, blue,
    red], then [0, 500] is mapped in the range [green, blue] and [500, 900] in the range [blue, red],
  </p>
  <h4>Data formatting</h4>
  <p>Use the following formatters based on the type of axis.</p>
  <p>
    For date x axis use: <code>xAxisDateFormatString</code>
  </p>
  <p>
    For date y axis use: <code>yAxisDateFormatString</code>
  </p>
  <p>
    For numeric x axis use: <code>xAxisNumberFormatString</code>
  </p>
  <p>
    For numeric y axis use: <code>yAxisNumberFormatString</code>
  </p>
  <p>
    For string x axis use: <code>xAxisStringFormatter</code>
  </p>
  <p>
    For string y axis use: <code>yAxisStringFormatter</code>
  </p>
  <h4>Date Axis localization</h4>
  <p>
    The axes support 2 ways of localization. <br />
    1. Javascript provided inbuilt localization for numeric and date axis. Specify the culture and
    dateLocalizeOptions for date axis to define target localization. Refer the
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString">
      Javascript localization guide
    </a>
    for usage. <br />
    2. Custom locale definition: The consumer of the library can specify a custom locale definition as
    supported by d3 <a href="https://github.com/d3/d3-time-format/blob/main/locale/en-US.json">like this</a>.
    The date axis will use the date range and the multiformat specified in the definition to determine the
    correct labels to show in the ticks. For example - If the date range is in days then the axis will show
    hourly ticks. If the date range spans across months then the axis will show months in tick labels and so
    on. Specify the custom locale definition in the <code>timeFormatLocale</code> prop. Refer to the Custom
    Locale Date Axis example in line chart for sample usage.
  </p>
</div>

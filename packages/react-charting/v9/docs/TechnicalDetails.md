# Technical details

**Overview**

This document describes different chart components in detail.

This can be used as a guide to use the charts and contribute new functionalities or improvements to the library.

**Components**

The charting components are built using following building blocks.

- Cartesian Charts.

  - Charts built using cartesian coordinate system (two axes - x axis perpendicular to y axis) are called cartesian charts. Majority of the chart in the library are cartesian charts. Some charts like horizontal chart, donut chart, sankey and tree charts are non cartesian charts.

- Legends.

  - A legend contains a list of the variables appearing in the chart and an example of their appearance. This information allows the data from each variable to be identified in the chart.

- Hover Callouts.

  - Whenever the mouse is hovered over a datapoint, a callout is shown representing the details of data for that point. For a stacked chart, the hover callout can represent the data for all the points for the same X coordinate.

- Axes.

  - Our charts currently support cartesian axes. Different charts support different type of axes - numerical axis, date or time series axis, string or categorical axis. Detals about supported axes can be found in readme for each chart.

  - Axes support for different charts

    | Chart                      | Numeric Axis | Date Axis | String Axis |
    | -------------------------- | ------------ | --------- | ----------- |
    | Line Chart                 | Yes          | Yes       | No          |
    | Area Chart                 | Yes          | Yes       | No          |
    | Vertical Bar Chart         | Yes          | Yes       | Yes         |
    | Vertical Stacked Bar Chart | Yes          | Yes       | Yes         |
    | Grouped Vertical Bar Chart | No           | No        | Yes         |
    | Heatmap Chart              | Yes          | Yes       | Yes         |
    | Horizontal Bar Chart       | --           | --        | --          |
    | Donut Chart                | --           | --        | --          |
    | Sankey Chart               | --           | --        | --          |
    | Tree Chart                 | --           | --        | --          |
    | Sparkline Chart            | --           | --        | --          |

  - Axis localization
    The axes support 2 ways of localization.

    1. Javascript provided inbuilt localization for numeric and date axis. Specify the culture and dateLocalizeOptions for date axis to define target localization. Refer the [javascript localization guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) for usage.
    2. Custom locale definition: The consumer of the library can specify a custom locale definition as supported by d3 (like [this](https://github.com/d3/d3-time-format/blob/main/locale/en-US.json)). The date axis will use the date range and the multiformat specified in the definition to determine the correct format to show in the ticks. For example - If the date range is in days then the axis will show hourly ticks. If the date range spans across months then the axis will show months in tick labels and so on.
       Specify the custom locale definition in the timeFormatLocale prop.
       Refer to the Custom Locale Date Axis example in line chart for sample usage.

  - Date axis formatting
    The date axis can be custom formatted using the customDateTimeFormatter prop.

- Event annotations (Available in line charts).

  - Data can be annotated using vertical lines representing the events of interest. See [line chart with events](https://fluentuipr.z22.web.core.windows.net/heads/master/react-charting/demo/index.html#/examples/linechart#Variants) for example.

- Typography.

  - Our font classes represent the type ramp for the fluent design language. Each base class sets a default size, weight, and color.

- Colors

  - The charts are designed using the accessible color palette defined for the fluent design system.
    Refer [this](https://github.com/microsoft/fluentui/blob/master/packages/react-charting/docs/colors.md) guide for details about charting color palette and its usage.

- Themes

  - The library supports light and dark mode out of box. In addition, consumers can define their own themese as detailed [here](https://github.com/microsoft/fluentui/wiki/Theming)

- Accessibility.

  - Our charts have elaborate accessibility support. The charts are WCAG 2.1 MAS C compliant for accessibility.
    Consumers can define their own aria labels for each point by setting the `xAxisCalloutAccessibilityData` and `callOutAccessibilityData` properties.

- RTL Support

  - The charts support RTL languages wherever applicable.

- Component Styling

  - [This article](https://github.com/microsoft/fluentui/wiki/Component-Styling) talks about the styling approach followed within charting library.

- Details about ticks.
  - Tick values are applicable only for date axis. Doesn't work for string or numeric axis.
    Tickcount works for numeric and date axis. Doesn't work for string (scaleBand) axis.

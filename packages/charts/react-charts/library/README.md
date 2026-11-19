# @fluentui/react-charts

**React Charts components for [Fluent UI React](https://react.fluentui.dev/)**

Fluent charts is a set of modern, accessible, interactive and highly customizable visualization library representing the Microsoft design system. The library is built using D3 (Data Driven Documents) and fluent v9 design system.

## Using the library

Examples and code snippets for the chart components are available on the [doc site](https://aka.ms/FluentChartsV9).
The code snippets can be used as usage guide for all the props and chart variations.

### Vega-Lite expressions

`VegaDeclarativeChart` evaluates logical (`&&`, `||`) and ternary (`?:`) expressions
with short-circuit semantics. Skipped branches are parsed but not evaluated.
If a filter expression throws for a row, that row is excluded and a warning is logged.

For nonaggregate vertical bar, line, and area charts without `timeUnit` on either encoded axis,
successfully filtering populated, valid encoded data down to zero rows renders the native no-data display. This also preserves healthy
sibling charts in an `hconcat` or `vconcat` spec. Encoded fields are validated against
the rows entering the exhausting filter, including fields produced by earlier transforms.
Fields produced only by later transforms cannot establish validity for this empty view.
Empty-view validation is read-only: discarded rows do not change the declared field
types or subsequent chart routing. Views requiring temporal or aggregate normalization
remain outside this filter-exhaustion exception and retain their existing empty-data validation.

Stacked bar and line-overlay transforms run once per rendered data series. Conditional
color and temporal preparation apply to the rows supplying that series, not a discarded metadata pass.
Temporal normalization consumes only per-render copies of axis declarations, so successful
or failed preparation does not remove caller-owned `timeUnit` or `aggregate` settings on reuse.

For line/point overlays, `timeUnit` projects x coordinates without implicitly reducing y
observations. Only an explicit `y.aggregate` reduces observations, grouped by x and color series.
Supported reducers are `count`, `sum`, `mean`, `average`, `median`, `min`, and `max`;
temporal bar preparation uses the same declared operations while retaining its default
mean/count policy when no aggregate is declared. Unsupported temporal or overlay reducers
throw rather than silently selecting another operation.
Explicit array color domains reserve positions within their own scale and pair with
range colors by domain position. Unused bar-domain entries do not reserve line fallback
palette slots. Other domain forms retain the adapter's existing color fallback behavior.

Empty source data, invalid encoded fields, and all-excluded results involving filter
evaluation errors still follow the existing validation/error path. Other adapters use
mark-specific empty-data handling: scatter supports a no-data display, while histogram
and polar validate empty results and can throw even for a successful guarded no-match.
No uniform empty-view contract is provided across marks. An error in a child of an `hconcat` or `vconcat` spec can still abort the entire
containing chart render; the component does not isolate invalid child specs. Callers needing error
containment must handle render errors externally, for example with a React error
boundary around the chart for client-side rendering. No uniform no-data fallback for
invalid input or per-child error boundary is provided.

Filters control chart display only; validate input data separately rather than relying
on chart filters for authorization.

## Available charts across fluent platforms

<table>
  <tr>
    <th>Chart</th>
    <th>Fluent v8</th>
    <th>Fluent v9</th>
    <th>Fluent Web Component</th>
  </tr>
  <tr>
    <td>Documentation</td>
    <td>[Link](https://aka.ms/fluentcharting)</td>
    <td>[Link](https://react.fluentui.dev/?path=/docs/charts_introduction--docs)</td>
    <td>[Link](https://github.com/microsoft/fluentui/tree/master/packages/charts/chart-web-components#readme)</td>
  </tr>
  <tr>
    <td>AreaChart</td>
    <td>Stable</td>
    <td>April 2025</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>DonutChart</td>
    <td>Stable</td>
    <td>Stable</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>GaugeChart</td>
    <td>Stable</td>
    <td>March 2025</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>HeatMapChart</td>
    <td>Stable</td>
    <td>April 2025</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>HorizontalBarChart</td>
    <td>Stable</td>
    <td>Stable</td>
    <td>Stable</td>
  </tr>
  <tr>
    <td>HorizontalBarChart with Axis</td>
    <td>Stable</td>
    <td>April 2025</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>HorizontalBarChart Stacked</td>
    <td>Stable</td>
    <td>June 2025</td>
    <td>Stable</td>
  </tr>
  <tr>
    <td>HorizontalBarChart MultiStacked</td>
    <td>Stable</td>
    <td>June 2025</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>Legends</td>
    <td>Stable</td>
    <td>Stable</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>LineChart</td>
    <td>Stable</td>
    <td>Stable</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>PieChart</td>
    <td>Stable</td>
    <td>Use donut chart</td>
    <td>Use donut chart</td>
  </tr>
  <tr>
    <td>SankeyChart</td>
    <td>Stable</td>
    <td>April 2025</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>Sparkline</td>
    <td>Stable</td>
    <td>Stable</td>
    <td>-</td>
  </tr>
  <tr>
    <td>TreeChart</td>
    <td>Stable</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>VerticalBarChart</td>
    <td>Stable</td>
    <td>Stable</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>VerticalBarChart Grouped</td>
    <td>Stable</td>
    <td>April 2025</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>VerticalBarChart Stacked</td>
    <td>Stable</td>
    <td>Preview</td>
    <td>Planned</td>
  </tr>
  <tr>
    <td>Plotly schema Chart (new)</td>
    <td>Stable</td>
    <td>March 2025</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Scatter Chart (new)</td>
    <td>-</td>
    <td>June 2025</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Gantt Chart (new)</td>
    <td>-</td>
    <td>June 2025</td>
    <td>-</td>
  </tr>
</table>

## Using v8 charts in fluent v9

Follow [this](https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-components-charts-migration--docs) guide to use v8 charts in fluent v9 till v9 charts are released.

## Contact

The charting project is actively funded by a small feature team. The team responds within 1-2 business days for any queries or doubts.
You can reach out to the charting team by tagging `@microsoft/charting-team` in [discussion](https://github.com/microsoft/fluentui/discussions) items.

You could also create issues using the [charting](https://github.com/microsoft/fluentui/issues/new?template=03-react-charting-bug-report.yml) template.

## Contributing

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-1EAEDB)]()

Refer the main fluentui [wiki](https://github.com/microsoft/fluentui/wiki) for detailed instructions on setup and contributing to the package.

A comprehensive contributor and technical guide is available on the charts [wiki](https://aka.ms/fluentChartingWiki).

## Resources

Several resources are available to know more details about the charts library.

Published roadmap [here](https://aka.ms/fluentChartingRoadmap)

Detailed [wiki](https://aka.ms/fluentChartingWiki)

Join our [discord server](https://aka.ms/FluentCharting/discord) for realtime conversation and schedule to our office hours.

Figma designs - Contact us for details.

## Accessibility

Our charts are among the very few charting solutions providing elaborate accessibility support. The charts are WCAG 2.1 MAS C compliant for accessibility.

More details are covered in the [wiki](https://microsoft.github.io/fluentui-charting-contrib/docs/Accessibility).

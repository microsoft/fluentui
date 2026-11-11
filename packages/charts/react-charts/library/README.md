# @fluentui/react-charts

**React Charts components for [Fluent UI React](https://react.fluentui.dev/)**

Fluent charts is a set of modern, accessible, interactive and highly customizable visualization library representing the Microsoft design system. The library is built using D3 (Data Driven Documents) and fluent v9 design system.

## Using the library

Examples and code snippets for the chart components are available on the [doc site](https://aka.ms/FluentChartsV9).
The code snippets can be used as usage guide for all the props and chart variations.

### Declarative chart colors

Pie and donut `marker.colors` values and Gantt scatter `fillcolor` values for `fill: 'toself'` traces are validated
using D3's color parser.
Supported values include named colors, hexadecimal colors, `rgb()`/`rgba()`, and `hsl()`/`hsla()`.
Invalid values, including CSS declarations or rules, use the existing schema/palette color fallback instead of being
included in chart or legend styles. This validation also applies during server-side rendering.

Rectangle `layout.shapes[].fillcolor` values used for line-chart color-fill bars are validated with the same parser.
Valid colors are preserved, including transparency; invalid or missing fill colors use Plotly's transparent default,
`rgba(0,0,0,0)`.

Table header and cell `font.color` values are validated after resolving scalar, column, or per-cell colors.
Valid colors are preserved; invalid colors are omitted so the table's default text styling applies.

Title `font.color`, annotation-only layout `paper_bgcolor`, `plot_bgcolor`, and `font.color`, and annotation
`bgcolor`, `bordercolor`, `font.color`, and `arrowcolor` use the same validation. Invalid colors are omitted to
retain default styling; invalid arrow colors fall back to the validated annotation text color.

### Declarative chart styles

Schema-driven styles are validated before reaching CSS, including titles on multi-plot charts.
Font families accept comma-separated CSS font names (including quoted names), but not CSS escapes or declarations.
Title shadows accept a single shadow with two offsets, an optional nonnegative blur radius, and an optional parsed color.
Font sizes, chart dimensions, and layout margins must be finite numbers in their supported ranges.
Plotly title padding accepts finite signed offsets; layout margins remain nonnegative.
Annotation sizes and padding also accept simple CSS lengths. Title and annotation font weights accept numbers from 1 to 1000
or the keywords `normal`, `bold`, `bolder`, and `lighter`.
Vega title metadata uses the same font-family, font-size, color, and weight validation across
all nine title-producing transformers, retaining the existing case-insensitive keyword-to-number weight mappings.
Vega title offsets and subtitle padding accept finite signed numbers, but not numeric strings or declarations.
Vega title anchors are limited to `start`, `middle`, and `end`.
Table alignment is limited to Plotly's `left`, `center`, and `right`, including scalar, column, per-cell, and template values.
Invalid style values are omitted or use the existing chart defaults; arbitrary CSS functions, rules, and declarations
are not supported in these schema style fields. Direct component styling props are not schema validation boundaries.

Vega title rendering has a separate existing limitation: all nine title-producing transformers spread the validated
style fields at the top level instead of forwarding them as `titleStyles`, and Cartesian charts do not forward the
schema title to the visible title slot. This validation protects adapter metadata; it does not add the missing
title-rendering support.

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

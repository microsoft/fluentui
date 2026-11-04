# @fluentui/react-charts Spec

## Background

Fluent UI React charts is a set of modern, accessible, interactive, lightweight and highly customizable visualization library representing the Microsoft design system. The charts are used across 100+ projects inside Microsoft including Microsoft 365 and Azure.

The library is built using D3 (Data Driven Documents) and fluent v9 design system.

## Sample Code

Refer to the docsite for usage examples for each chart.

## Migration

The v9 charts maintain feature parity with their v8 equivalent.

The following controls have been ported over to v9.
For the remaining controls, refer to the migration guide to consume them in v9. https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-components-charts-migration--docs

| v8 control                          | v9 control           |
| ----------------------------------- | -------------------- |
| Area Chart                          | April 2025           |
| Donut Chart                         | Donut Chart          |
| Gauge Chart                         | April 2025           |
| Heatmap Chart                       | April 2025           |
| Horizontal Bar Chart                | Horizontal Bar Chart |
| Horizontal Bar Chart with Axis      | April 2025           |
| Horizontal Bar Chart - Stacked      | Horizontal Bar Chart |
| Horizontal Bar Chart - MultiStacked | Horizontal Bar Chart |
| Legends                             | Legends              |
| Line Chart                          | Line Chart           |
| Pie Chart                           | Use Donut Chart      |
| Sankey Chart                        | April 2025           |
| Sparkline Chart                     | Sparkline Chart      |
| Tree Chart                          |                      |
| Vertical Bar Chart                  | Vertical Bar Chart   |
| Vertical Bar Chart - Grouped        | April 2025           |
| Vertical Bar Chart - Stacked        | April 2025           |
| Plotly Schema Chart                 | March 2025           |

## Behaviors

Refer to our technical documentation for detailed information about behavior of chart controls.
https://microsoft.github.io/fluentui-charting-contrib/docs/Technical%20Details

### Opt-in LineChart scene

`LineChart` keeps its existing renderer when all new capabilities are omitted. New optional fields select a shared scene; this does not add another chart component or extend every Cartesian chart family. Existing numeric point values, callout/click callbacks, styles, refs and SVG props remain supported.

| Capability                                                 | Public entry points                                                                       |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Stable identity and independent raw-value scales           | `getSeriesKey`, `getPointKey`, `getSeriesYScaleKey`, `yScales`                            |
| Exact domains, hidden axes, grid styling and scale insets  | `xAxis`, `yAxis`, `secondaryYScaleOptions`, keyed scale options                           |
| Native gap segmentation and baseline areas                 | `lineOptions.connectGaps`, `baselineFill`                                                 |
| Current-frame geometry and ordered visual layers           | `onRenderPlotLayers`, `onRenderSeries`, `onRenderMarker`, axis decoration hooks           |
| One plotted x scale with extra label rows                  | `xAxisLabelRows`, measured or reserved layout                                             |
| Controlled or uncontrolled inspection                      | `interactionOptions`, `interactionState`, `onInteractionChange`                           |
| Shared geometry/reveal and retained exits                  | `motion`, including explicit reduced motion                                               |
| Native annotation projection, actions and optional visuals | `yScaleKey` coordinates, `action`, `annotationLayout`, annotation content/connector hooks |

Use stable application identities rather than display labels when series or observations can be reordered. Callback indexes retain original input order. Caller-owned arrays, points and gap intervals are not mutated. Missing observations are not fabricated: declared gaps split native runs unless `connectGaps` is explicitly enabled.

Explicit continuous domains bypass automatic widening, marker padding and nicening. Hidden y axes still resolve and project independently; unlike metric units are not normalized onto another metric's scale. Scale keys are chart-local, and reserved keys are `x`, `y` and `secondaryY`.

Plot contexts are read-only snapshots in root SVG/viewBox units, not client pixels. Native paths, exact line/cubic pieces, axes, inspection and custom layers share the displayed frame. Curve direction reports unsupported non-monotone-x comparison construction explicitly; it does not remove native painting or exact hit testing. Applications own comparison/range intersections and business semantics.

Layer order is definitions, below-grid, native grid, native baseline fills, below-series, current strokes and markers, retained exits, native inspection feedback, and above-series. The core owns clipping, reveal masks and point semantics; visual renderers must not introduce duplicate interactive or accessible point hosts. Callbacks are pure; returned components may load visual material in effects.

Omitted `interactionState` is uncontrolled; `{}` is controlled cleared state. Connected-curve hits can identify a series/segment at an unavailable x without inventing a point. Controlled inspection does not move keyboard focus. Surviving target observations retain focus through animation, while removed observations reconcile to an eligible survivor or chart entry. Client anchors are refreshed after the SVG transform commits.

Motion is absent by default. Supplied timings share one chart-local clock. Exiting series retain captured visuals but cannot receive focus or inspection and do not influence domains. A coordinate-basis/layout-epoch change drops obsolete exits; reduced motion settles immediately.

Annotation coordinates and actions are product-agnostic. The application supplies localized text/action labels and owns dialogs, persistence, permissions and domain-event mapping. Hidden measurement copies are inert; collision-hidden annotations have neither connectors nor focus stops. Omitted optional annotation visual/layout hooks retain native placement and content. No annotation authoring or report-specific API is introduced.

For read-only x-interval annotations, `createLineChartAnnotationIntervalModel` captures generic keyed number/Date intervals with explicit `closed` or `half-open` bounds. `getActiveKeys(x)` returns exact logical membership without per-hover allocation. `getLayout(plot, pointWidth)` provides cached full-height clipped regions and connected logical groups in the displayed frame, including RTL and included plot-edge point intersections. The positive point width is caller-supplied presentation only; it cannot extend logical coverage or merge separate groups. A connected group is not proof that all its members are active at every x.

Use those rectangles in an existing decorative plot layer and provide `getAnnotations(plot)` for native icon/action hosts. Generated entries append after `annotations` and share measurement, collision, accessibility and focus reconciliation; the accessor is pure and needs stable IDs. Supplying an empty accessor before asynchronous loading keeps the same renderer, series paths and axes when annotations arrive or fail. Render icon content through the existing annotation-content hook, not a second interactive SVG overlay. Account-calendar conversion, group appearance/placement, exact tooltip copy, data retrieval, current-configuration provenance, campaign scope, permissions and detail-card workflows remain application responsibilities. No report-specific DTO, hardcoded annotation cap or date/time-zone policy is added.

## Accessibility

Refer this document for details about Accessibility aspects for chart controls.
https://microsoft.github.io/fluentui-charting-contrib/docs/Accessibility

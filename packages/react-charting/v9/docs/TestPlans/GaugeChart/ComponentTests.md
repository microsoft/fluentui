# Gauge Chart - Component test plan

## Snapshot tests

| Test case                                                                                           | Validation                                                | Tool used |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------- |
| When only segments and chartValue props are set                                                     | Should render gauge chart correctly                       | Enzyme    |
| When hideMinMax prop is set to true                                                                 | Should not render the min and max values of the gauge     | Enzyme    |
| When chartTitle prop is set                                                                         | Should render the chart title correctly                   | Enzyme    |
| When sublabel prop is set                                                                           | Should render the sublabel correctly                      | Enzyme    |
| When the layout direction is RTL                                                                    | Should render gauge chart correctly                       | Enzyme    |
| When hideLegend prop is set to true                                                                 | Should not render the legends                             | Enzyme    |
| When chartValueFormat is set to ‘fraction’                                                          | Should render the chart value in fraction format          | Enzyme    |
| When a segment has no color                                                                         | Should render a color from DataVizPalette for the segment | Enzyme    |
| When the total size of the segments is less than the difference between maxValue and minValue props | Should render a placeholder segment                       | Enzyme    |
| When the theme is dark                                                                              | Should render gauge chart correctly                       | Enzyme    |

## Rendering and behavior tests

| Test case                                                                  | Validation                                                                     | Tool used |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------- |
| When the length of the chart value exceeds the max width                   | Should truncate the chart value with ellipsis                                  | RTL       |
| When the chart resizes                                                     | Should update the font size of the chart value                                 | RTL       |
| When hideTooltip prop is set to true                                       | Should not show a callout                                                      | RTL       |
| When chartValue prop is less than the min value or more than the max value | Should ensure the needle rotation remains within the range of 0 to 180 degrees | RTL       |
| When variant prop is set to GaugeChartVariant.SingleSegment                | Should render segment sizes as percentages                                     | RTL       |
| When chartValueFormat prop is set to a custom formatter function           | Should render the chart value returned by the provided function                | RTL       |
| When minValue prop is non-zero and no formatter function is provided       | Should render the chart value as a number                                      | RTL       |

## Interaction and accessibility tests

| Test case                                                                              | Validation                                                                 | Tool used |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------- |
| When the mouse moves over a segment and then leaves the chart                          | Should show a callout and hide it respectively                             | RTL       |
| When a segment is focused and then blurred                                             | Should show an outline around the segment and hide it respectively         | RTL       |
| When the mouse moves over the chart value and then leaves the chart                    | Should show a callout and hide it respectively                             | RTL       |
| When the mouse moves over the needle and then leaves the chart                         | Should show a callout and hide it respectively                             | RTL       |
| When the needle is focused and then blurred                                            | Should show a callout and hide it respectively                             | RTL       |
| When the mouse moves over a legend and then moves out of the legend                    | Should highlight the corresponding segment and unhighlight it respectively | RTL       |
| When a legend is clicked once and then clicked again                                   | Should highlight the corresponding segment and unhighlight it respectively | RTL       |
| When the mouse enters a highlighted segment and then enters any unhighlighted segments | Should show a callout and hide it respectively                             | RTL       |

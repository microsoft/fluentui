# Heatmap Chart - Component test plan

## Snapshot tests

| Test case                                                                    | Validation                            | Tool used |
| ---------------------------------------------------------------------------- | ------------------------------------- | --------- |
| With only data, domainValuesForColorScale and rangeValuesForColorScale props | Should render heatmap chart correctly | Enzyme    |
| When data is not present for some group                                      | Should render heatmap chart correctly | Enzyme    |
| When hideLegend prop is set to true                                          | Should not render legends             | Enzyme    |
| When yAxisTickFormat prop is set                                             | Should render y axis labels correctly | Enzyme    |
| When the layout direction is RTL                                             | Should render heatmap chart correctly | Enzyme    |
| When the theme is dark                                                       | Should render heatmap chart correctly | Enzyme    |
| When custom formatter functions are set for x and y axis strings             | Should render axis labels correctly   | RTL       |
| With numeric datapoints                                                      | Should render heatmap chart correctly | RTL       |

## Rendering and behavior tests

| Test case                            | Validation                        | Tool used |
| ------------------------------------ | --------------------------------- | --------- |
| When hideTooltip prop is set to true | Should not show a callout         | Enzyme    |
| When data is empty                   | Should render the empty chart div | Enzyme    |

## Interaction and accessibility tests

| Test case                                                                                              | Validation                                                                        | Tool used |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | --------- |
| When the mouse moves over a rectangle                                                                  | Should render the callout correctly                                               | Enzyme    |
| When the mouse moves over a legend and then moves out of the legend                                    | Should highlight the corresponding rectangle(s) and unhighlight them respectively | RTL       |
| When a legend is clicked once and then clicked again                                                   | Should highlight the corresponding rectangle(s) and unhighlight them respectively | RTL       |
| When a highlighted rectangle is hovered/focused and then an unhighlighted rectangle is hovered/focused | Should show a callout and hide it respectively                                    | RTL       |

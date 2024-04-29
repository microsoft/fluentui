**Stacked Bar Chart – Component test plan**

**Sub-components: Bar, Legends, Callout, Benchmark**

1. **Bar: bar data, bar background color**
1. **Legends: show/hide legends, highlight the corresponding bar on legend hover**
1. **Callout: Default/custom callout**
1. **Benchmark: Show benchmark**
1. **Screen resolution changes, theme changes**

|                                **Test steps**                                 |                                              **Validation**                                               | **Tool used** |
| :---------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-----------: |
|                          Test 1: [Snapshot testing]                           |                                                                                                           |               |
|                     - With only data prop, non-empty data                     |                                    Renders stacked bar chart correctly                                    |    Enzyme     |
|                               - With empty data                               |                                    Renders stacked bar chart correctly                                    |      RTL      |
|                     - With HideLegend prop set to “true”                      |                                            Should hide legends                                            |    Enzyme     |
|                     - With HideTooltip prop set to “true”                     |                                     Should hide the tooltip in chart                                      |    Enzyme     |
|                    - With HideNumberDisplay set to “true”                     |                                Should not show number/ratio on top of bar                                 |    Enzyme     |
|                     - With HideDenominator set to “true”                      |                       Should not show the denominator for the ratio above the chart                       |    Enzyme     |
|                      - With IgnoreFixStyle set to “true”                      |                 Should ignore the fixed display pattern for less than 2 data points chart                 |    Enzyme     |
|                 - With EnabledLegendsWrapLines set to “true”                  | Should enable the legends to wrap lines if there is not enough space to show all legends on a single line |    Enzyme     |
|                          Test 2: Basic props testing                          |                                                                                                           |               |
|                       - HideLegend prop set to “false”                        |                               Should mount legend when hideLegend is false                                |    Enzyme     |
|                       - HideTooltip prop set to “false”                       |                               Should mount callout when hideTootip is false                               |    Enzyme     |
|                       - HideDenominator set to “false”                        |                                         Should not mount callout                                          |    Enzyme     |
|                    - onRenderCalloutPerDataPoint is given                     |                                 Should render onRenderCalloutPerDataPoint                                 |    Enzyme     |
|                  - onRenderCalloutPerDataPoint is not given                   |                               Should not render onRenderCalloutPerDataPoint                               |    Enzyme     |
|                Test 3: Render calling with respective to props                |                                                                                                           |               |
| - No prop changes: Mount vertical bar chart and then set the same props again |                               Render function should have been called twice                               |    Enzyme     |
|   - Prop changes: Mount vertical bar chart and then set the some other prop   |                               Render function should have been called twice                               |    Enzyme     |
|                             Test 4: Mouse events                              |                                                                                                           |               |
|                             - Mouse over on a bar                             |                               Should render callout correctly on mouseover                                |    Enzyme     |
|                 - Mouse over on a bar with customized callout                 |                               Should render customized callout on mouseover                               |    Enzyme     |
|                             - Mouse move on a bar                             |                               Should render callout correctly on mousemove                                |    Enzyme     |
|         Test 5: Render empty chart aria label div when chart is empty         |                                                                                                           |               |
|                - Stacked bar chart mounted with non-empty data                |                                  No empty chart aria label div rendered                                   |    Enzyme     |
|                  - Stacked bar chart mounted with empty data                  |                                    Empty chart aria label div rendered                                    |    Enzyme     |
|                     Test 6: [Sub-Component]: Stacked Bar                      |                                                                                                           |               |
|                             - Specify bar height                              |                                Should render the bar with the given height                                |      RTL      |
|                        - Specify bar background color                         |                           Should render the empty bars with the specified color                           |      RTL      |
|            - Localize the numbers of the bars with a given culture            |                  Should render the bars with the numbers localized in the given culture                   |      E2E      |
|                    - Specify the href for the stacked bar                     |                   Should redirect to the Url to upon clicking on the stacked bar chart                    |      E2E      |
|                - Specify data with only one single data point                 |                    Should render the number on top of the bar with only one data point                    |      RTL      |
|                      - Specify data with two data points                      |                    Should render the ratio on top of the bar with only two data points                    |      RTL      |
|                 - Specify data with more than two data points                 |           Should not render the ratio on top of the bar with data points count greater than two           |      RTL      |
|                          - Specify target data prop                           |                    Should render a coloured arrow on top when target data is specified                    |      RTL      |
| - Specify chartDataAccessibilityData prop when data contains two data points  |      Should enable chartDataAccessibilityData prop only if ratio or numbers are enabled to be shown       |      RTL      |
|                     Test 7: [Sub-Component]: Benchmarking                     |                                                                                                           |               |
|                      - Specify the benchmark data point                       |                                   Should render the benchmark triangle                                    |      RTL      |
|                       Test 8: [Sub-Component]: Legends                        |                                                                                                           |               |
|                        - Hover mouse over bar legends                         |                    Should reduce the opacity of the other bars/lines and their legends                    |      RTL      |
|                     - Hover mouse over benchmark legends                      |                  Should not reduce the opacity of the other bars/lines and their legends                  |      RTL      |
|                         - Mouse out from a bar legend                         |    Should change the opacity of the other bars and their legends on mouse out action from a bar legend    |      RTL      |
|                            - Click on a bar legend                            |         Should reduce the opacity of the other bars and their legends on mouse click a bar legend         |      RTL      |
|                          - Legends overflow scenario                          |                           Overflow button should contain the additional legends                           |      E2E      |
|                - Specify placeholder as true for a data point                 |                          Should not show legend if data is marked as placeholder                          |      RTL      |
|                       Test 9: [Sub-Component]: Callout                        |                                                                                                           |               |
|                           - Hover mouse over a bar                            |                                 Should call the handler on mouse over bar                                 |      RTL      |
|                           - Hover mouse over a bar                            |                               Should show the default callout over that bar                               |      RTL      |
|              - Specify custom callout and hover mouse over a bar              |                               Should show the custom callout over that bar                                |      RTL      |
|                  Test 10: [Sub-Component]: Screen resolution                  |                                                                                                           |               |
|                  - Increase the screen resolution (zoom in)                   |                                    Should remain unchanged on zoom in                                     |      RTL      |
|                  - Decrease the screen resolution (zoom out)                  |                                    Should remain unchanged on zoom out                                    |      RTL      |
|                     Test 11: Theme changed to Dark Theme                      |                                        Should reflect theme change                                        |      RTL      |

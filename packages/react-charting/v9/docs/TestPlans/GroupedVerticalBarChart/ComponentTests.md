**Grouped Vertical Bar Chart – Component test plan**

**Sub-components: Bar, Legends, Callout, Labels**

1. **Bar: Bar data, Bar color, bar label**
1. **Legends: show/hide legends, highlight the corresponding bar on legend hover**
1. **Callout: Default/custom callout**
1. **Labels: x-Axis labels default/rotated**

|                                    **Test steps**                                     |                                              **Validation**                                               | **Tool used** |
| :-----------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-----------: |
|                              Test 1: [Snapshot testing]                               |                                                                                                           |               |
|                     - With only data prop, string data on x-axis.                     |                                Renders GroupedVerticalBar chart correctly                                 |    Enzyme     |
|                         - With HideLegend prop set to “true”                          |                                            Should hide legends                                            |    Enzyme     |
|                         - With HideTooltip prop set to “true”                         |                                     Should hide the tooltip in chart                                      |    Enzyme     |
|                     - With EnabledLegendsWrapLines set to “true”                      | Should enable the legends to wrap lines if there is not enough space to show all legends on a single line |    Enzyme     |
|                      - With ShowXAxisLablesTooltip set to “true”                      |                      Should truncate x axis labels and show tooltip on x axis labels                      |    Enzyme     |
|                         - With WrapXAxisLables set to “true”                          |                                      Should wrap x axis label values                                      |    Enzyme     |
|                          - With yAxisTickFormat set to “%d”                           |                   <p>Should render the y-axis ticks in the format specified</p><p></p>                    |    Enzyme     |
|                            - With hideLabels set to “true”                            |                                          Should hide bar labels                                           |      RTL      |
|                                 - With yAxisTickCount                                 |                               Should render y axis with specific tick count                               |      RTL      |
|                              Test 2: Basic props testing                              |                                                                                                           |               |
|                            - HideLegend prop set to “true”                            |                              Should not mount legend when hideLegend is true                              |    Enzyme     |
|                           - HideLegend prop set to “false”                            |                               Should mount legend when hideLegend is false                                |    Enzyme     |
|                           - HideTooltip prop set to “true”                            |                             Should not mount callout when hideTootip is true                              |    Enzyme     |
|                           - HideTooltip prop set to “false”                           |                               Should mount callout when hideTootip is false                               |    Enzyme     |
|                        - onRenderCalloutPerDataPoint is given                         |                                 Should render onRenderCalloutPerDataPoint                                 |    Enzyme     |
|                      - onRenderCalloutPerDataPoint is not given                       |                               Should not render onRenderCalloutPerDataPoint                               |    Enzyme     |
|                    Test 3: Render calling with respective to props                    |                                                                                                           |               |
| - No prop changes: Mount grouped vertical bar chart and then set the same props again |                               Render function should have been called twice                               |    Enzyme     |
|     - Prop changes: Mount grouped vertical bar chart and then set some other prop     |                               Render function should have been called twice                               |    Enzyme     |
|                                 Test 4: Mouse events                                  |                                                                                                           |               |
|                                 - Mouse over on a bar                                 |                               Should render callout correctly on mouseover                                |    Enzyme     |
|                        - Mouse move from one bar to other bar                         |                               Should render callout correctly on mouse move                               |    Enzyme     |
|                     - Mouse over on a bar with customized callout                     |                               Should render customized callout on mouseover                               |    Enzyme     |
|                             Test 6: [Sub-Component]: Bar                              |                                                                                                           |               |
|                                  - Specify bar color                                  |                                Should render bar with the specified color                                 |      RTL      |
|                           - with custom accessibility data                            |                             Should render bars with custom accessibility data                             |      RTL      |
|                           Test 7: [Sub-Component]: Legends                            |                                                                                                           |               |
|                                    - Hide legends                                     |                                   Should not show any rendered legends                                    |      RTL      |
|                            - Hover mouse over bar legends                             |                                Should reduce the opacity of the other bars                                |      RTL      |
|                    - Mouse move from one Legend to another Legend                     |                     Should reset the opacity of the lines on mouse leave a bar legend                     |      RTL      |
|                          - Single mouse click on bar legends                          |                      Should select legend on single mouse click on respective legend                      |      RTL      |
|                          - Double mouse click on bar legends                          |                     Should deselect legend on double mouse click on respective legend                     |      RTL      |
|                           Test 8: [Sub-Component]: Callout                            |                                                                                                           |               |
|                               - Hover mouse over a bar                                |                               Should show the default callout over that bar                               |      RTL      |
|               - Set isCalloutForStack is “true” and mouse over on a bar               |                           Should show the default stacked callout over that bar                           |      RTL      |
|              - Set isCalloutForStack is “false” and mouse over on a bar               |                               Should show the single callout over that bar                                |      RTL      |
|                  - Specify custom callout and hover mouse over a bar                  |                               Should show the custom callout over that bar                                |      RTL      |
|                        Test 9: [Sub-Component]: x-axis labels                         |                                                                                                           |               |
|                               - Truncate x-axis labels                                |                            Should show the x-axis labels tooltip when hovered                             |      RTL      |
|                                - Rotate x-axis labels                                 |                               Should rotate the x-axis labels by 45 degrees                               |      RTL      |
|            - Set showXAxisLablestoolTip to “true” and mouse over on label             |                         Should show XAxis labels tooltip when mouse over on label                         |      RTL      |
|                      Test 10: [Sub-Component]: Screen resolution                      |                                                                                                           |               |
|                      - Increase the screen resolution (zoom in)                       |                                    Should remain unchanged on zoom in                                     |      RTL      |
|                      - Decrease the screen resolution (zoom out)                      |                                    Should remain unchanged on zoom out                                    |      RTL      |
|                         Test 11: Theme changed to Dark Theme                          |                                        Should reflect theme change                                        |      RTL      |
|                   Test 10: Grouped vertical bar chart re-rendering                    |                                                                                                           |               |
|                                  - Update chart data                                  |                                Should re-render chart when data is updated                                |      RTL      |
|              Test 11: Grouped vertical bar chart with empty/proper data               |                                                                                                           |               |
|                                - Chart with Empty data                                |                              Should render chart with Empty chart are label                               |    Enzyme     |
|                               - Chart with proper data                                |                            Should not render chart with empty chart are label                             |    Enzyme     |

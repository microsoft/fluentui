**Area Chart – Component test plan**

**Sub-components: Area, x-axis, y-axis and Legend**

1. **Line: Area data, Area color (multi colors), Area label (show/hide)**
1. **Legends: show/hide legends, highlight the corresponding Area on legend hover**
1. **Callout: Default/custom callout**
1. **Labels: x-Axis labels, y-Axis labels**

|                            **Test steps**                             |                                                 **Validation**                                                  | **Tool used** |
| :-------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-----------: |
|                      Test 1: [Snapshot testing]                       |                                                                                                                 |               |
|           - With only data prop, numerical data on x-axis.            |                                          Renders Area chart correctly                                           |      RTL      |
|              - With only data prop, date data on x-axis.              |                                          Renders Area chart correctly                                           |      RTL      |
|             - With only data prop, string data on x-axis.             |                                          Should not render area chart                                           |    Pending    |
|                 - With HideLegend prop set to “true”                  |                                               Should hide legends                                               |    Enzyme     |
|                 - With HideTooltip prop set to “true”                 |                                        Should hide the tooltip in chart                                         |    Enzyme     |
|             - With EnabledLegendsWrapLines set to “true”              |    Should enable the legends to wrap lines if there is not enough space to show all legends on a single line    |    Enzyme     |
|              - With ShowXAxisLablesTooltip set to “true”              |                         Should truncate x axis labels and show tooltip on x axis labels                         |    Enzyme     |
|                 - With WrapXAxisLables set to “true”                  |                                         Should wrap x axis label values                                         |    Enzyme     |
|                  - With yAxisTickFormat set to “%d”                   |                      <p>Should render the y-axis ticks in the format specified</p><p></p>                       |    Enzyme     |
|                          - With single point                          |                                    Should render Area chat with single point                                    |    Enzyme     |
|                         - With Default color                          |                         Should render with default colors when line color not provided                          |    Enzyme     |
|                        - With specific colors                         |                                    Should render areas with specified colors                                    |      RTL      |
|                - With optimizeLargeData set to “true”                 |                            Should not render circles when optimizeLargeData is true                             |    Enzyme     |
|                      Test 2: Basic props testing                      |                                                                                                                 |               |
|                    - HideLegend prop set to “true”                    |                                 Should not mount legend when hideLegend is true                                 |    Enzyme     |
|                   - HideLegend prop set to “false”                    |                                  Should mount legend when hideLegend is false                                   |    Enzyme     |
|                   - HideTooltip prop set to “true”                    |                                Should not mount callout when hideTootip is true                                 |    Enzyme     |
|                   - HideTooltip prop set to “false”                   |                                  Should mount callout when hideTootip is false                                  |    Enzyme     |
|              - onRenderCalloutPerStack prop is not given              |                                    Should not render onRenderCalloutPerStack                                    |    Enzyme     |
|                - onRenderCalloutPerDataPoint is given                 |                                    Should render onRenderCalloutPerDataPoint                                    |    Enzyme     |
|              - onRenderCalloutPerDataPoint is not given               |                                  Should not render onRenderCalloutPerDataPoint                                  |    Enzyme     |
|            Test 3: Render calling with respective to props            |                                                                                                                 |               |
| - No prop changes: Mount Area chart and then set the same props again |                                  Render function should have been called twice                                  |    Enzyme     |
|     - Prop changes: Mount Area chart and then set some other prop     |                                  Render function should have been called twice                                  |    Enzyme     |
|                         Test 4: Mouse events                          |                                                                                                                 |               |
|                         - Mouse over on Area                          |                                  Should render callout correctly on mouseover                                   |    Enzyme     |
|               - Mouse move from one area to other area                |                                  Should render callout correctly on mouse move                                  |    Enzyme     |
|            - Mouse over on a area with customized callout             |                                  Should render customized callout on mouseover                                  |    Enzyme     |
|       - Customized callout on area from one area to other area        |                             Should render customized callout for stack on mouseover                             |    Enzyme     |
|     Test 5: Render empty chart aria label div when chart is empty     |                                                                                                                 |               |
|               - Area chart mounted with non-empty data                |                                     No empty chart aria label div rendered                                      |    Enzyme     |
|                 - Area chart mounted with empty data                  |                                       Empty chart aria label div rendered                                       |    Enzyme     |
|                   Test 6: [Sub-Component]: Legends                    |                                                                                                                 |               |
|                    - Hover mouse over area legends                    |                                  Should reduce the opacity of the other Areas                                   |      RTL      |
|                    - Hover mouse over area legends                    | Should reduce the opacity of the other lines in area chart and opacity of the selected area line should be zero |      RTL      |
|                    - Hover mouse over area legends                    |                                 Should reduce the opacity of the other legends                                  |      RTL      |
|                    - Single mouse click on legends                    |                         Should select legend on single mouse click on respective legend                         |      RTL      |
|                    - Double mouse click on legends                    |                        Should deselect legend on double mouse click on respective legend                        |      RTL      |
|                   Test 7: [Sub-Component]: Callout                    |                                                                                                                 |               |
|                   - Hover mouse over a single area                    |                                 Should show the default callout over that Area                                  |      RTL      |
|                   - Hover mouse over a stacked area                   |                             Should show the default stacked callout over that Area                              |      RTL      |
|         - Specify custom callout and hover mouse over a Area          |                                  Should show the custom callout over that Area                                  |      RTL      |
|                Test 8: [Sub-Component]: x-axis labels                 |                                                                                                                 |               |
|                       - Truncate x-axis labels                        |                               Should show the x-axis labels tooltip when hovered                                |      RTL      |
|                        - Rotate x-axis labels                         |                                  Should rotate the x-axis labels by 39 degrees                                  |      RTL      |
|              Test 9: [Sub-Component]: Screen resolution               |                                                                                                                 |               |
|              - Increase the screen resolution (zoom in)               |                                       Should remain unchanged on zoom in                                        |      RTL      |
|              - Decrease the screen resolution (zoom out)              |                                       Should remain unchanged on zoom out                                       |      RTL      |
|                 Test 10: Theme changed to Dark Theme                  |                                           Should reflect theme change                                           |      RTL      |

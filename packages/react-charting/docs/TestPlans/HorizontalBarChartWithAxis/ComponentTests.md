**Horizontal Bar Chart With Axis – Component test plan**

**Sub-components: Bar, Callout, Labels, Legend**

1. **Bar: Bar data, Bar color, bar label**
1. **Callout: Default/custom callout**
1. **Labels: Default/Custom labels**
1. **Legend: show/hide legends, highlight the corresponding bars on legend hover**

|                                    **Test steps**                                     |                          **Validation**                           | **Tool used** |
| :-----------------------------------------------------------------------------------: | :---------------------------------------------------------------: | :-----------: |
|                              Test 1: [Snapshot testing]                               |                                                                   |               |
|                     - With only data prop, string data on y-axis.                     |      Should render horizontal bar chart with axis correctly       |      RTL      |
|                    - With only data prop, numeric data on y-axis.                     |      Should render horizontal bar chart with axis correctly       |      RTL      |
|                    - With showToolTipForYAxisLabels set to “true”                     |            Should show Y axis labels tooltip correctly            |    Enzyme     |
|                         - With showYAxisLabels set to “true”                          |                Should show Y axis titles properly                 |    Enzyme     |
|                              Test 2: Basic props testing                              |                                                                   |               |
|                           - HideTooltip prop set to “true”                            |         Should not mount callout when hideTootip is true          |    Enzyme     |
|                           - HideTooltip prop set to “false”                           |           Should mount callout when hideTootip is false           |    Enzyme     |
|                         - With HideLegend prop set to “true”                          |                        Should hide legends                        |    Enzyme     |
|                         - With HideLegend prop set to “false”                         |                      Should display legends                       |    Enzyme     |
|                            - HideLabels prop set to “true”                            |       Should not render bar labels when hideLabels is true        |      RTL      |
|                    Test 3: Render calling with respective to props                    |                                                                   |               |
| - No prop changes: Mount HorizontalBarChartWithAxis and then set the same props again |           Render function should have been called twice           |    Enzyme     |
|  - Prop changes: Mount HorizontalBarChartWithAxis chart and then set some other prop  |           Render function should have been called twice           |    Enzyme     |
|                                 Test 4: Mouse events                                  |                                                                   |               |
|                                 - Mouse over on a bar                                 |           Should render callout correctly on mouseover            |    Enzyme     |
|                        - Mouse move from one bar to other bar                         |           Should render callout correctly on mouse move           |      RTL      |
|                     - Mouse over on a bar with customized callout                     |           Should render customized callout on mouseover           |      RTL      |
|                             Test 5: [Sub-Component]: Bar                              |                                                                   |               |
|                                  - Specify bar color                                  |            Should render bar with the specified color             |      RTL      |
|                                  - With single color                                  |            Should render all the bars with same color             |      RTL      |
|                                 - setbarHeight to “x”                                 |             Should render bars with specified height              |      RTL      |
|                            Test 6: [Sub-Component]: Legend                            |                                                                   |               |
|                            - Hover mouse over bar legends                             |  Should highlight the corresponding bar on mouse over on legend   |      RTL      |
|                               - Mouse leave on legends                                |    Should reset the highlighted bar on mouse leave on legends     |      RTL      |
|                            - Single mouse click on legends                            |  Should select legend on single mouse click on respective legend  |      RTL      |
|                            - Double mouse click on legends                            | Should deselect legend on double mouse click on respective legend |      RTL      |
|                           Test 7: [Sub-Component]: Callout                            |                                                                   |               |
|                               - Hover mouse over a bar                                |             Should call the handler on mouse over bar             |      RTL      |
|                      - Hover mouse over a bar to display callout                      |           Should show the default callout over that bar           |      RTL      |
|                  - Specify custom callout and hover mouse over a bar                  |           Should show the custom callout over that bar            |      RTL      |
|                   - Specify numeric axis data to display in callout                   |           Should show the callout with axis data on it            |      RTL      |
|      - Specify string yaxis data and numeric xaxis data to display it in callout      |          Should show the callout data based on axis data          |      RTL      |
|                            Test 8: [Sub-Component]: Labels                            |                                                                   |               |
|          - Set showYAxisLabelTooTip to “true” and mouse hover on Yaxis label          |         Should show y axis tooltip when mouse hover on it         |      RTL      |
|                            - Set showYAxisLabels to “true”                            |         Should show y axis labels data without truncating         |      RTL      |
|                      Test 9: [Sub-Component]: Screen resolution                       |                                                                   |               |
|                      - Increase the screen resolution (zoom in)                       |                Should remain unchanged on zoom in                 |      RTL      |
|                      - Decrease the screen resolution (zoom out)                      |                Should remain unchanged on zoom out                |      RTL      |
|                         Test 10: Theme changed to Dark Theme                          |                    Should reflect theme change                    |      RTL      |

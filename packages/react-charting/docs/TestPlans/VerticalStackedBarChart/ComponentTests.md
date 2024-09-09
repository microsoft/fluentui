**Vertical Stacked Bar Chart – Component test plan**

**Sub-components: Bar, Line, Legends, Callout, Labels**

1. **Bar: Bar data, Bar color (single/multiple), bar label**
1. **Line: show/hide line, highlight data points on line and show callout**
1. **Legends: show/hide legends, highlight the corresponding bar/line on legend hover**
1. **Callout: Default/custom callout**
1. **Labels: x-Axis labels default/rotated**

|                                   **Test steps**                                    |                                              **Validation**                                               | **Tool used** |
| :---------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-----------: |
|                             Test 1: [Snapshot testing]                              |                                                                                                           |               |
|                  - With only data prop, numerical data on x-axis.                   |                                Renders VerticalStackedBar chart correctly                                 |      RTL      |
|            - With only data prop, numerical data on x-axis and RTL mode             |               Should render the vertical stacked bar chart with numeric x-axis in RTL mode                |      RTL      |
|                        - With HideLegend prop set to “true”                         |                                            Should hide legends                                            |    Enzyme     |
|                        - With HideTooltip prop set to “true”                        |                                     Should hide the tooltip in chart                                      |    Enzyme     |
|                    - With EnabledLegendsWrapLines set to “true”                     | Should enable the legends to wrap lines if there is not enough space to show all legends on a single line |    Enzyme     |
|                     - With ShowXAxisLablesTooltip set to “true”                     |                      Should truncate x axis labels and show tooltip on x axis labels                      |    Enzyme     |
|                        - With WrapXAxisLables set to “true”                         |                                      Should wrap x axis label values                                      |    Enzyme     |
|                       - With isCalloutForStack set to “true”                        |                                 Should render callout for stack properly                                  |    Enzyme     |
|                         - With yAxisTickFormat set to “%d”                          |                   <p>Should render the y-axis ticks in the format specified</p><p></p>                    |    Enzyme     |
|                           - With hideLabels set to “true”                           |                                          Should hide bar labels                                           |    Enzyme     |
|                             Test 2: Basic props testing                             |                                                                                                           |               |
|                           - HideLegend prop set to “true”                           |                              Should not mount legend when hideLegend is true                              |    Enzyme     |
|                          - HideLegend prop set to “false”                           |                               Should mount legend when hideLegend is false                                |    Enzyme     |
|                          - HideTooltip prop set to “true”                           |                             Should not mount callout when hideTootip is true                              |    Enzyme     |
|                          - HideTooltip prop set to “false”                          |                               Should mount callout when hideTootip is false                               |    Enzyme     |
|                     - onRenderCalloutPerStack prop is not given                     |                                 Should not render onRenderCalloutPerStack                                 |    Enzyme     |
|                       - onRenderCalloutPerDataPoint is given                        |                                 Should render onRenderCalloutPerDataPoint                                 |    Enzyme     |
|                     - onRenderCalloutPerDataPoint is not given                      |                               Should not render onRenderCalloutPerDataPoint                               |    Enzyme     |
|                       - onRenderCalloutPerDataPoint is given                        |                                 Should render onRenderCalloutPerDataPoint                                 |    Enzyme     |
|                   Test 3: Render calling with respective to props                   |                                                                                                           |               |
| - No prop changes: Mount VerticalStackedBar chart and then set the same props again |                               Render function should have been called twice                               |    Enzyme     |
|     - Prop changes: Mount VerticalStackedBar chart and then set some other prop     |                               Render function should have been called twice                               |    Enzyme     |
|                                Test 4: Mouse events                                 |                                                                                                           |               |
|                                - Mouse over on a bar                                |                               Should render callout correctly on mouseover                                |    Enzyme     |
|                       - Mouse move from one bar to other bar                        |                               Should render callout correctly on mouse move                               |    Enzyme     |
|                    - Mouse over on a bar with customized callout                    |                               Should render customized callout on mouseover                               |    Enzyme     |
|                    - Customized callout per stack on mouse over                     |                     Should render customized callout per stack correctly on mouseover                     |    Enzyme     |
|               - Customized callout on a bar from one bar to other bar               |                          Should render customized callout for stack on mouseover                          |    Enzyme     |
|                            Test 5: [Sub-Component]: Line                            |                                                                                                           |               |
|                                 - Specify line data                                 |                                 Should render line with the data provided                                 |      RTL      |
|                            Test 6: [Sub-Component]: Bar                             |                                                                                                           |               |
|                                 - Specify bar color                                 |                                Should render bar with the specified color                                 |      RTL      |
|                       - Specify separate bars in a single bar                       |                               Should render stacked bar with specified data                               |      RTL      |
|                            - setMinimumBarHeight to “x”                             |           Should render bars properly, bars below this height will be displayed at this height            |      RTL      |
|                                - set barWidth to “x”                                |                                Should render bars with specified bar width                                |      RTL      |
|                               - set barGapMax to “x”                                |                                 Should render bars with specified bar gap                                 |      RTL      |
|                                - set barCornerRadius                                |                          Should render top bar with specified bar corner radius                           |      RTL      |
|                          Test 7: [Sub-Component]: Legends                           |                                                                                                           |               |
|                                   - Hide legends                                    |                                   Should not show any rendered legends                                    |      RTL      |
|                           - Hover mouse over line legends                           |                             Should reduce the opacity of the other lines/bars                             |      RTL      |
|                           - Hover mouse over bar legends                            |                             Should reduce the opacity of the other lines/bars                             |      RTL      |
|                   - Mouse move from one Legend to another Legend                    |                     Should reset the opacity of the lines on mouse leave a bar legend                     |      RTL      |
|                         - Single mouse click on bar legends                         |                      Should select legend on single mouse click on respective legend                      |      RTL      |
|                         - Double mouse click on bar legends                         |                     Should deselect legend on double mouse click on respective legend                     |      RTL      |
|                        - Single mouse click on line legends                         |                      Should select legend on single mouse click on respective legend                      |      RTL      |
|                        - Double mouse click on line legends                         |                     Should deselect legend on double mouse click on respective legend                     |      RTL      |
|                            - Mouse leave from bar legend                            |                          Should call the handler on mouse leave from bar legend                           |      RTL      |
|                           - Mouse leave from line legend                            |                          Should call the handler on mouse leave from line legend                          |      RTL      |
|                             - Mouse over on bar legend                              |                               Should call the handler mouse over on legend                                |      RTL      |
|                               - Mouse click on legend                               |                               Should call the handler mouse click on legend                               |      RTL      |
|                          Test 8: [Sub-Component]: Callout                           |                                                                                                           |               |
|                              - Hover mouse over a bar                               |                                 Should call the handler on mouse over bar                                 |      RTL      |
|                     - Hover mouse over a bar to display callout                     |                               Should show the default callout over that bar                               |      RTL      |
|                          - Hover mouse over a stacked bar                           |                                 Should show the default stacked call out                                  |      RTL      |
|                             - Hover mouse over the line                             |                              Should show the default callout over that line                               |      RTL      |
|                 - Specify custom callout and hover mouse over a bar                 |                               Should show the custom callout over that bar                                |      RTL      |
|               - Specify custom callout and hover mouse over the line                |                               Should show the custom callout over that line                               |      RTL      |
|                                - Mouse click on bar                                 |                             Should call the handler on mouse click on the bar                             |      RTL      |
|                       Test 9: [Sub-Component]: x-axis labels                        |                                                                                                           |               |
|                              - Truncate x-axis labels                               |                            Should show the x-axis labels tooltip when hovered                             |      RTL      |
|                               - Rotate x-axis labels                                |                               Should rotate the x-axis labels by 45 degrees                               |      RTL      |
|                     Test 10: [Sub-Component]: Screen resolution                     |                                                                                                           |               |
|                     - Increase the screen resolution (zoom in)                      |                                    Should remain unchanged on zoom in                                     |      RTL      |
|                     - Decrease the screen resolution (zoom out)                     |                                    Should remain unchanged on zoom out                                    |      RTL      |
|                        Test 11: Theme changed to Dark Theme                         |                                        Should reflect theme change                                        |      RTL      |

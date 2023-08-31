**Line Chart – Component test plan**

**Sub-components: Line, x-axis, y-axis, Event, Time Range, Callout, Drop down and Legend**

1. **Line: Line data, Line color (multi colors), Line label (show/hide)**
1. **Legends: show/hide legends, highlight the corresponding line on legend hover**
1. **Callout: Default/custom callout**
1. **Labels: x-Axis labels**

|                                      **Test steps**                                       |                                                **Validation**                                                | **Tool used** |
| :---------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :-----------: |
|                                Test 1: [Snapshot testing]                                 |                                                                                                              |               |
|                     - With only data prop, numerical data on x-axis.                      |                                         Renders line chart correctly                                         |      RTL      |
|                        - With only data prop, date data on x-axis.                        |                                         Renders line chart correctly                                         |      RTL      |
|                                     - Use Large data                                      |                                 Should render the Line chart with large data                                 |      RTL      |
|                       - With only data prop, string data on x-axis.                       |                                         Should not render area chart                                         |    Pending    |
|                     - With allowMultipleShapesForPoints set to “true”                     |                        Should render line chart with multiple shapes for chart points                        |      RTL      |
|                           - With HideLegend prop set to “true”                            |                                             Should hide legends                                              |    Enzyme     |
|                           - With HideTooltip prop set to “true”                           |                                       Should hide the tooltip in chart                                       |    Enzyme     |
|                       - With EnabledLegendsWrapLines set to “true”                        |  Should enable the legends to wrap lines if there is not enough space to show all legends on a single line   |    Enzyme     |
|                        - With ShowXAxisLablesTooltip set to “true”                        |                       Should truncate x axis labels and show tooltip on x axis labels                        |    Enzyme     |
|                           - With WrapXAxisLables set to “true”                            |                                       Should wrap x axis label values                                        |    Enzyme     |
|                            - With yAxisTickFormat set to “%d”                             |                                                                                                              |    Enzyme     |
|                       - With canSelectMultipleLegends set to “true”                       |                                        Should select multiple legends                                        |      RTL      |
|                                Test 2: Basic props testing                                |                                                                                                              |               |
|                              - HideLegend prop set to “true”                              |                               Should not mount legend when hideLegend is true                                |    Enzyme     |
|                             - HideLegend prop set to “false”                              |                                 Should mount legend when hideLegend is false                                 |    Enzyme     |
|                             - HideTooltip prop set to “true”                              |                               Should not mount callout when hideTootip is true                               |    Enzyme     |
|                             - HideTooltip prop set to “false”                             |                                Should mount callout when hideTootip is false                                 |    Enzyme     |
|                      Test 3: Render calling with respective to props                      |                                                                                                              |               |
|           - No prop changes: Mount line chart and then set the same props again           |                                Render function should have been called twice                                 |    Enzyme     |
|               - Prop changes: Mount line chart and then set some other prop               |                                Render function should have been called twice                                 |    Enzyme     |
|                                   Test 4: Mouse events                                    |                                                                                                              |               |
|                                  - Mouse over on a line                                   |                                 Should render callout correctly on mouseover                                 |    Enzyme     |
|                         - Mouse move from one line to other line                          |                                Should render callout correctly on mouse move                                 |    Enzyme     |
|                      - Mouse over on a line with customized callout                       |                                Should render customized callout on mouseover                                 |    Enzyme     |
|                              - Customized callout on a line                               |                           Should render customized callout correctly on mouseover                            |    Enzyme     |
|                - Customized callout on a line from one line to other line                 |                           Should render customized callout for stack on mouseover                            |    Enzyme     |
|               Test 5: Render empty chart aria label div when chart is empty               |                                                                                                              |               |
|                         - Line chart mounted with non-empty data                          |                                    No empty chart aria label div rendered                                    |    Enzyme     |
|                           - Line chart mounted with empty data                            |                                     Empty chart aria label div rendered                                      |    Enzyme     |
|                Test 6: Render empty chart calling with respective to props                |                                                                                                              |               |
| - No prop changes: Mount line chart with non-empty data and then set the same props again |                                Render function should have been called twice                                 |    Enzyme     |
|          - prop changes: Mount line chart with empty data and then set the props          |                               Render function should have been called 3 times                                |    Enzyme     |
|                               Test 7: [Sub-Component]: Line                               |                                                                                                              |               |
|                           - Specify lines with specified colors                           |                             Should render lines with the color provided in data                              |      RTL      |
|                               - Specify line data with gaps                               |                                 Should render the lines with specified gaps                                  |      RTL      |
|                             Test 8: [Sub-Component]: Legends                              |                                                                                                              |               |
|                              - Hover mouse over line legends                              |                       Should highlight the corresponding line on mouse over on legend                        |      RTL      |
|                                 - Mouse leave on legends                                  |                         Should reset the highlighted line on mouse leave on legends                          |      RTL      |
|                              - Single mouse click on legends                              |                       Should select legend on single mouse click on respective legend                        |      RTL      |
|                              - Double mouse click on legends                              |                      Should deselect legend on double mouse click on respective legend                       |      RTL      |
|                      - Select multiple legends on single mouse click                      |                  Should select multiple legends on single mouse click on different legends                   |      RTL      |
|                         - Select multiple color fill bar legends                          |                                Should select multiple color fill bar legends                                 |      RTL      |
|                                  - Highlight data points                                  |                    Should highlight the data points and render the corresponding callout                     |      RTL      |
|                                - Mouse out of line points                                 |                            Should invoke the handler on mouse out of line points                             |      RTL      |
|                                  - Focus on line points                                   |                              Should invoke the handler on focus on line points                               |      RTL      |
|                        - Mouse over large dataset – Numeric xAxis                         |                    Should invoke the handler on mouse over large dataset - Numeric xAxis                     |      RTL      |
|                          - Mouse over large dataset – Date xAxis                          |                      Should invoke the handler on mouse over large dataset - Date xAxis                      |      RTL      |
|                                 - Select all line legends                                 |                       Should select all line legends and clear all if all are selected                       |      RTL      |
|                        - Select all colorFillBars and line legends                        |     Should select all legends including colorFillBars and line legends and clear all if all are selected     |      RTL      |
|        - Select one colorFillBar legend on single click, deselect on double click         | Should select one colorfillbar legends on single click and deselect on double click and clear all selections |      RTL      |
|            - Select one line legend on single click, deselect on double click             |     Should select one line legends on single click and deselect on double click and clear all selections     |      RTL      |
|                            - Mouse over colorFillBars legends                             |                        Should invoke the handler for mouse over colorFillBars legends                        |      RTL      |
|                   Test 9: [Sub-Component]: Time Range(Color fill bars)                    |                                                                                                              |               |
|                               - Line chart with time range                                |                                 Should render time range with specified data                                 |      RTL      |
|                         - Single mouse click on time range legend                         |                          Should highlight corresponding time range on legend click                           |      RTL      |
|                          Test 10: [Sub-Component]: x-axis labels                          |                                                                                                              |               |
|                                 - Truncate x-axis labels                                  |                              Should show the x-axis labels tooltip when hovered                              |      RTL      |
|                                  - Rotate x-axis labels                                   |                                Should rotate the x-axis labels by 45 degrees                                 |      RTL      |
|                              Test 11: [Sub-Component]: Event                              |                                                                                                              |               |
|                               - Line chart with Events data                               |                                     Should render line chart with events                                     |      RTL      |
|                        Test 12: [Sub-Component]: Screen resolution                        |                                                                                                              |               |
|                        - Increase the screen resolution (zoom in)                         |                                      Should remain unchanged on zoom in                                      |      RTL      |
|                        - Decrease the screen resolution (zoom out)                        |                                     Should remain unchanged on zoom out                                      |      RTL      |
|                           Test 13: Theme changed to Dark Theme                            |                                         Should reflect theme change                                          |      RTL      |

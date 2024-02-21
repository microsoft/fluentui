**Horizontal Bar Chart – Component test plan**

**Sub-components: Bar, Callout, Labels, Benchmark**

1. **Bar: Bar data, Bar color (single), bar label(left and right)**
1. **Callout: Default/custom callout**
1. **Labels: Default/Custom labels**

|                                **Test steps**                                 |                         **Validation**                         | **Tool used** |
| :---------------------------------------------------------------------------: | :------------------------------------------------------------: | :-----------: |
|                          Test 1: [Snapshot testing]                           |                                                                |               |
|                 - With only data prop, string data on x-axis.                 |   Should render horizontal bar chart legend with string data   |      RTL      |
|                    - With variant set to “absolute scale”                     |         Should render absolute scale variant correctly         |    Enzyme     |
|     - With variant set to “absolute scale” and hide labels set to “true”      |     Should not render bar labels in absolute scale variant     |    Enzyme     |
|                          Test 2: Basic props testing                          |                                                                |               |
|                       - HideTooltip prop set to “true”                        |        Should not mount callout when hideTootip is true        |    Enzyme     |
|                       - HideTooltip prop set to “false”                       |         Should mount callout when hideTootip is false          |    Enzyme     |
|              - onRenderCalloutPerHorizantalBar prop is not given              |       Should not render onRenderCalloutPerHorizantalBar        |    Enzyme     |
|                  - onRenderCalloutPerHorizantalBar is given                   |         Should render onRenderCalloutPerHorizantalBar          |    Enzyme     |
|                        - HideLabels prop set to “true”                        |      Should not render bar labels when hideLabels is true      |      RTL      |
|                           - Legend value set to “x”                           |   Should display legend/left side label with specified data    |      RTL      |
|                Test 3: Render calling with respective to props                |                                                                |               |
| - No prop changes: Mount HorizontalBarChart and then set the same props again |         Render function should have been called twice          |    Enzyme     |
|  - Prop changes: Mount HorizontalBarChart chart and then set some other prop  |         Render function should have been called twice          |    Enzyme     |
|                             Test 4: Mouse events                              |                                                                |               |
|                             - Mouse over on a bar                             |          Should render callout correctly on mouseover          |    Enzyme     |
|                    - Mouse move from one bar to other bar                     |         Should render callout correctly on mouse move          |      RTL      |
|                 - Mouse over on a bar with customized callout                 |         Should render customized callout on mouseover          |      RTL      |
|                         Test 5: [Sub-Component]: Bar                          |                                                                |               |
|                              - Specify bar color                              |           Should render bar with the specified color           |      RTL      |
|                             - setbarHeight to “x”                             |            Should render bars with specified height            |      RTL      |
|                       - set variant to “absolute scale”                       |      Should render bars right side label inline with bar       |      RTL      |
|                       - set variant to “part to whole”                        |       Should render bars right side label on top of bar        |      RTL      |
|                       - set chartDataMode to “fraction”                       |  Should render bar right side label value as a fractional one  |      RTL      |
|                      - set chartDataMode to “percentage”                      | Should render bar right side label value as a percentage value |      RTL      |
|                        - set barChartCustomData to “x”                        |        Should show custom data on bar right side label         |      RTL      |
|                      Test 6: [Sub-Component]: Benchmark                       |                                                                |               |
|                           - Specify benchmark data                            |            Should render bars with benchmark symbol            |      RTL      |
|                       Test 7: [Sub-Component]: Callout                        |                                                                |               |
|                           - Hover mouse over a bar                            |           Should call the handler on mouse over bar            |      RTL      |
|                  - Hover mouse over a bar to display callout                  |         Should show the default callout over that bar          |      RTL      |
|              - Specify custom callout and hover mouse over a bar              |          Should show the custom callout over that bar          |      RTL      |
|                  Test 8: [Sub-Component]: Screen resolution                   |                                                                |               |
|                  - Increase the screen resolution (zoom in)                   |               Should remain unchanged on zoom in               |      RTL      |
|                  - Decrease the screen resolution (zoom out)                  |              Should remain unchanged on zoom out               |      RTL      |
|                      Test 9: Theme changed to Dark Theme                      |                  Should reflect theme change                   |      RTL      |
|                  Test 10: Horizontal bar chart re-rendering                   |                                                                |               |
|                              - Update chart data                              |          Should re-render chart when data is updated           |      RTL      |
|                 Test 11: Horizontal bar chart with empty data                 |                                                                |               |
|                            - Chart with Empty data                            |         Should render chart with Empty chart are label         |    Enzyme     |
|                           - Chart with proper data                            |       Should not render chart with empty chart are label       |    Enzyme     |

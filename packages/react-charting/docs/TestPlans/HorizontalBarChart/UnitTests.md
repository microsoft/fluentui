**Unit Test Plan - Horizontal Bar Chart**

|                             **Test steps**                              |                                                    **Validation**                                                    | **Tool used** |
| :---------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :-----------: |
|                      Test 1:Get Default Text Data                       |                                                                                                                      |               |
|                         - Without chartDataMode                         |                             Should return proper axis data without chartDataMode defined                             |      RTL      |
|                      - With default chartDataMode                       |                              Should return proper axis data with default chartDataMode                               |      RTL      |
|                      - With fraction chatDataMode                       |                              Should return proper axis data with fraction chartDataMode                              |      RTL      |
|                     - With percentage chatDataMode                      |                             Should return proper axis data with percentage chartDataMode                             |      RTL      |
|                       Test 2: Get Chat Data Text                        |                                                                                                                      |               |
|                        - With default chart data                        |                                Should return proper text data with default chat data                                 |      RTL      |
|                         - With custom chat data                         |                                 Should return proper text data with custom chat data                                 |      RTL      |
|                        Test 3: Create Benchmark                         |                                                                                                                      |               |
|                        - Without benchmark data                         |                       Should return proper benchmark data without any benchmark data in input                        |      RTL      |
|                          - With benchmark data                          |                       Should return proper benchmark data with proper benchmark data in input                        |      RTL      |
|                           Test 4: Create Bars                           |                                                                                                                      |               |
|                        - With proper chart data                         |                                           Should return bar count properly                                           |      RTL      |
|                     - With horizontalbarchart data                      |                                           Should return bar width properly                                           |      RTL      |
|                         - With barHeight as “x”                         |                                           Should return bar heigh properly                                           |      RTL      |
|                         Test 5: Get Area Label                          |                                                                                                                      |               |
|                         - With empty chart data                         |                            Should return bar aria-label as 0 when there is no chart data                             |      RTL      |
|                        - With proper chart data                         |                        Should return bar aria-label properly when proper chart data is there                         |      RTL      |
|                       - Without yAxisCalloutData                        |                       Should return bar aria-label properly when there is no yAxisCalloutData                        |      RTL      |
|                       - Without xAxisCalloutData                        |                       Should return bar aria-label properly when there is no xAxisCalloutData                        |      RTL      |
|             - Without xAxisCalloutData and yAxisCalloutData             |            Should return bar aria- label properly when there is no xAxisCalloutData and yAxisCalloutData             |      RTL      |
| - Without xAxisCalloutData, yAxisCalloutData and horizontalBarChartdata | Should return bar aria-label properly when there is no xAxisCalloutData, yAxisCalloutData and horizontalBarChartdata |      RTL      |
|                     - With callOutAccessibilityData                     |                     Should return bar aria-label properly when we have callOutAccessibilityData                      |      RTL      |
|             - With callOutAccessibilityData and chart data              |           Should return bar aria-label properly when we have callOutAccessibilityData and other properties           |      RTL      |

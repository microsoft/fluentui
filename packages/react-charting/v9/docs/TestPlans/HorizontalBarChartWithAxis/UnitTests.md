**Unit Test Plan – Horizontal Bar Chart with axiss**

|                     **Test steps**                      |                                                 **Validation**                                                 | **Tool used** |
| :-----------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: | :-----------: |
|          Test 1: Render content for only bars           |                                                                                                                |               |
|                  - With all properties                  |                                         Should return proper bar data                                          |      RTL      |
|               - Without xAxisCalloutData                |                             Should return proper bar data without xAxisCalloutData                             |      RTL      |
|               - Without yAxisCalloutData                |                             Should return proper bar data without yAxisCalloutData                             |      RTL      |
|     - Without xAxisCalloutData and yAxisCalloutData     |                  Should return proper bar data without xAxisCalloutData and yAxisCalloutData                   |      RTL      |
| - Without legend, xAxisCalloutData and yAxisCalloutData |              Should return proper bar data without legend, xAxisCalloutData and yAxisCalloutData               |      RTL      |
|                   Test 2: Get scales                    |                                                                                                                |               |
|                   - With numeric axis                   |                                     Should return scales for numeric axis                                      |      RTL      |
|                   - With string axis                    |                                   Should return scales for non-numeric axis                                    |      RTL      |
|                - With numeric axis - RTL                |                                  Should return scales for numeric axis - RTL                                   |               |
|               Test 3: Create numeric bars               |                                                                                                                |               |
|                   - With numeric axis                   |                              Should return proper bar data with numeric axis data                              |      RTL      |
|                      - Width as 0                       |                            Should return proper bar width when container width is 0                            |      RTL      |
|           Test 4: get callout content for bar           |                                                                                                                |               |
|                    - Non Empty Data                     |                              Should return proper callout data for respective bar                              |      RTL      |
|                  Test 5: Create colors                  |                                                                                                                |               |
|                - useSingleColor as true                 |                               should return the color scale - using single color                               |      RTL      |
|               - userSingleColor as false                |                              should return the color scale - using multiple color                              |      RTL      |
|                 Test 6: Get Legend data                 |                                                                                                                |               |
|                      - Empty data                       |                          Should return empty legends data when there is no chart data                          |      RTL      |
|                - With numeric axis data                 |                           Should return proper legends data with numaric yAxis data                            |      RTL      |
|                 - With string axis data                 |                            Should return proper legends data with string yAxis data                            |      RTL      |
|                 Test 7: Get Aria-Label                  |                                                                                                                |               |
|                  - With all properties                  |                                 <p>Should return proper aria label</p><p></p>                                  |      RTL      |
|               - Without xAxisCalloutData                |                     <p>Should return proper aria label without xAxisCalloutData</p><p></p>                     |      RTL      |
|               - Without yAxisCalloutData                |                     <p>Should return proper aria label without yAxisCalloutData</p><p></p>                     |      RTL      |
|     - Without xAxisCalloutData and yAxisCalloutData     |          <p>Should return proper aria label without xAxisCalloutData and yAxisCalloutData</p><p></p>           |      RTL      |
|             - With callOutAccessibilityData             |           <p>Should return bar aria-label properly when we have callOutAccessibilityData</p><p></p>            |      RTL      |
|  - With callOutAccessibilityData and other properties   | <p>Should return bar aria-label properly when we have callOutAccessibilityData and other properties</p><p></p> |      RTL      |

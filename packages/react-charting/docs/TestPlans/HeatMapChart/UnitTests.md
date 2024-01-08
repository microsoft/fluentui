**Unit Test Plan – Heat Map Chart**

|                    **Test steps**                     |                                   **Validation**                                   | **Tool used** |
| :---------------------------------------------------: | :--------------------------------------------------------------------------------: | :-----------: |
|                  Test 1: Get X and Y                  |                                                                                    |               |
|            - With string xPoint and yPoint            |          Should return proper X and Y values for string xPoint and yPoint          |      RTL      |
|           - With numeric xPoint and yPoint            |         Should return proper X and Y values for numeric xPoint and yPoint          |      RTL      |
|             - With date xPoint and yPoint             |           Should return proper X and Y values for date xPoint and yPoint           |      RTL      |
|                  Test 2: Get Opacity                  |                                                                                    |               |
|                   - Non empty data                    |                      Should return proper opacity for legends                      |      RTL      |
|              Test 3: Create Legend Bars               |                                                                                    |               |
|                   - Non empty data                    |                         Should return proper legends data                          |      RTL      |
|                Test 4: Get color scale                |                                                                                    |               |
|                   - Non Empty Data                    |                       Should return proper color scale data                        |      RTL      |
|                  Test 5: Get X index                  |                                                                                    |               |
|                 - With string xPoint                  |                   Should return proper xIndex for string xPoint                    |      RTL      |
|                 - With numeric xPoint                 |                   Should return proper xIndex for number xPoint                    |      RTL      |
|                  - With date xPoint                   |                    Should return proper xIndex for date xPoint                     |      RTL      |
|                  Test 6: Get Y index                  |                                                                                    |               |
|                 - With string yPoint                  |                   Should return proper yIndex for string yPoint                    |      RTL      |
|                 - With numeric yPoint                 |                   Should return proper yIndex for numeric yPoint                   |      RTL      |
|                  - With date yPoint                   |                    Should return proper yIndex for date yPoint                     |      RTL      |
|                Test 7: Get Aria-Label                 |                                                                                    |               |
|           - With numeric xPoint and yPoint            |           Should return proper aria-label for numeric xPoint and yPoint            |      RTL      |
| - With numeric xPoint and yPoint without legend value | Should return proper aria-label for numeric xPoint and yPoint without legend value |      RTL      |
|            - With string xPoint and yPoint            |            Should return proper aria-label for String xPoint and yPoint            |      RTL      |
|    - With string xPoint and yPoint without legend     |    Should return proper aria-label for string xPoint and yPoint without legend     |      RTL      |
|             - With date xPoint and yPoint             |             Should return proper aria-label for date xPoint and yPoint             |      RTL      |
|     - With date xPoint and yPoint without legend      |     Should return proper aria-label for date xPoint and yPoint without legend      |      RTL      |
|         - With numeric xPoint and date yPoint         |  <p>Should return proper aria-label for numeric xPoint and date yPoint</p><p></p>  |      RTL      |
|   Test 8: Get formatted label for xAxis data point    |                                                                                    |               |
|                   - Non-empty data                    |        <p>Should return proper xAxis label for non-empty string</p><p></p>         |     RTLs      |
|                     - Empty data                      |          <p>Should return proper xAxis label for empty string</p><p></p>           |      RTL      |
|   Test 8: Get formatted label for yAxis data point    |                                                                                    |               |
|                   - Non-empty data                    |        <p>Should return proper yAxis label for non empty string</p><p></p>         |      RTL      |
|                     - Empty data                      |           <p>Should return proper yAxis label for empty data</p><p></p>            |      RTL      |
|          Test 9: Get string formatted number          |                                                                                    |               |
|           - With numeric value as a string            |    <p>Should return proper string formatted number for numeric value</p><p></p>    |      RTL      |
|                 - With format string                  |   <p>Should return proper string formatted number with format string</p><p></p>    |      RTL      |
|                    - Empty string                     |     <p>Should return proper string formatted number for empty data</p><p></p>      |      RTL      |
|                  - With string value                  |    <p>Should return proper string formatted number for string value</p><p></p>     |      RTL      |
|           Test 9: Get string formatted date           |                                                                                    |               |
|                 - With numeric point                  |      <p>Should return proper string formatted date for date point</p><p></p>       |      RTL      |
|                  - With empty value                   |             Should return proper string formatted date for empty point             |      RTL      |
|        - With numeric point and format string         |    Should return proper string formatted date for date point with format string    |      RTL      |
|             Test 9: Get xAxis data points             |                                                                                    |               |
|                 - With string points                  |       <p>Should return proper xAxis data points for string points</p><p></p>       |      RTL      |
|                 - With numeric points                 |      <p>'Should return proper xAxis data points for numeric points</p><p></p>      |      RTL      |
|                  - With date points                   |       <p>'Should return proper xAxis data points for date points</p><p></p>        |      RTL      |
|             Test 9: Get yAxis data points             |                                                                                    |               |
|                 - With string points                  |       <p>Should return proper yAxis data points for string points</p><p></p>       |      RTL      |
|                 - With numeric points                 |      <p>Should return proper yAxis data points for numeric points</p><p></p>       |      RTL      |
|                  - With date points                   |        <p>Should return proper yAxis data points for date points</p><p></p>        |      RTL      |
|               Test 10: Create data set                |                                                                                    |               |
|               - With default axis type                |         <p>Should return proper data set for default axis type</p><p></p>          |      RTL      |
|                 - AxisType as string                  |          <p>Should return proper data set for string axis type</p><p></p>          |      RTL      |
|      - With date axis data and default axis type      |  <p>Should return proper data set for date axis with default axis type</p><p></p>  |      RTL      |
|      - With date axis data and AxisType as date       |   <p>Should return proper data set for date axis with date axis type</p><p></p>    |      RTL      |
|                 - AxisType as numeric                 |         <p>Should return proper data set for numeric axis type</p><p></p>          |      RTL      |

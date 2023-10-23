**Unit Test Plan - Stacked Bar Chart**

|                        **Test steps**                        |                                         **Validation**                                          | **Tool used** |
| :----------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :-----------: |
|               Test 1: Create Bars and Legends                |                                                                                                 |               |
|      - With chart Data, benchmark data and target data       |           ` `Should return bars and legends which includes benchmark and target data            |      RTL      |
|     - With chart Data, benchmark data and no target data     |                Should return bars and legends which includes only benchmark data                |      RTL      |
| - With only chart Data, no benchmark data and no target data |              Should return bars and legends data without benchmark and target data              |      RTL      |
|     - With chart Data, target data and no benchmark data     |                 Should return bars and legends which includes only target data                  |      RTL      |
|                    Test 2: Is Chart Empty                    |                                                                                                 |               |
|                         - Empty Data                         |                           Should return true when chart data is empty                           |      RTL      |
|                       - Non-Empty Data                       |                        Should return false when chart data is non-empty                         |      RTL      |
|                    Test 3: Get Area Label                    |                                                                                                 |               |
|         - With xAxisCalloutData and yAxisCalloutData         |     Should return correct aria label for a point with xAxisCalloutData and yAxisCalloutData     |      RTL      |
|       - With xAxisCalloutData and no yAxisCalloutData        |   Should return correct aria label for a point without xAxisCalloutData and yAxisCalloutData    |      RTL      |
|       - With yAxisCalloutData and no xAxisCalloutData        | Should return correct aria label for a point with xAxisCalloutData and without yAxisCalloutData |      RTL      |
|      - With no xAxisCalloutData and no yAxisCalloutData      | Should return correct aria label for a point without xAxisCalloutData and with yAxisCalloutData |      RTL      |
|   - Without legend, xAxisCalloutData and yAxisCalloutData    | Should return correct aria label for a point without legend, xAxisCalloutData yAxisCalloutData  |      RTL      |

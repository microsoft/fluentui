**Unit Test Plan – Grouped Vertical Bar Chart**

|                           **Test steps**                            |                                               **Validation**                                               | **Tool used** |
| :-----------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :-----------: |
|        Test 1: Create data set of Grouped Vertical Bar Chart        |                                                                                                            |               |
|                         - With grouped bars                         |                     Should create grouped vertical bar chart data for multiple series                      |      RTL      |
|                          - With single bar                          |                      Should create grouped vertical bar chart data for single series                       |      RTL      |
|                  Test 2: Create data set for bars                   |                                                                                                            |               |
|                         - With grouped bars                         |                                Should create bars data for multiple series                                 |      RTL      |
|                          - With single bar                          |                                 Should create bars data for single series                                  |      RTL      |
|                       Test 3: Get Legend Data                       |                                                                                                            |               |
|                     - Legends for grouped bars                      |                               Should return legends data for multiple series                               |      RTL      |
|                      - Legends for single bar                       |                                Should return legends data for single series                                |      RTL      |
|                       Test 4: Is Chart Empty                        |                                                                                                            |               |
|                            - Empty Data                             |                                Should return true when chart data is empty                                 |      RTL      |
|                          - Non-Empty Data                           |                              Should return false when chart data is non-empty                              |      RTL      |
|                       Test 5: Get Area Label                        |                                                                                                            |               |
|            - With xAxisCalloutData and yAxisCalloutData             |          Should return correct aria label for a point with xAxisCalloutData and yAxisCalloutData           |      RTL      |
|           - With xAxisCalloutData and no yAxisCalloutData           |         Should return correct aria label for a point without xAxisCalloutData and yAxisCalloutData         |      RTL      |
|           - With yAxisCalloutData and no xAxisCalloutData           |      Should return correct aria label for a point with xAxisCalloutData and without yAxisCalloutData       |      RTL      |
|         - With no xAxisCalloutData and no yAxisCalloutData          |      Should return correct aria label for a point without xAxisCalloutData and with yAxisCalloutData       |      RTL      |
| - With xAxisPoint and Without xAxisCalloutData and yAxisCalloutData | Should return correct aria label for a point with xAxisPoint and without xAxisCalloutData yAxisCalloutData |      RTL      |
|                     Test 6: Get Domain Margins                      |                                                                                                            |               |
|          - Total width is greater than the required width           |             Should return the correct margins when total width is greater than required width              |      RTL      |
|            - Total width is less than the required width            |               Should return the correct margins when total width is less than required width               |      RTL      |
|                         Test 7: Get Scales                          |                                                                                                            |               |
|                       - With grouped bar data                       |                                 Should return correct x0Scale and x1Scale                                  |      RTL      |
|                       Test 8: Get build graph                       |                                                                                                            |               |
|                   - With proper data set for bars                   |                                    Should return the correct graph data                                    |      RTL      |

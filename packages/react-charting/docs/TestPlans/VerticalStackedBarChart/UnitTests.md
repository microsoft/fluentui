**Unit Test Plan - Vertical Stacked Bar Chart**

|                            **Test steps**                             |                                        **Validation**                                        | **Tool used** |
| :-------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :-----------: |
|                            Test 1:Get Path                            |                                                                                              |               |
|                         - Mouse over on point                         |                          Should return path when a point is hovered                          |      RTL      |
|           - Mouse over on active point to check visibility            |              Should return visibility as visibility when mouse over on a point               |      RTL      |
| - Mouse over on active point to check visibility for non-active point |                   Should return visibility as hidden for non-active points                   |      RTL      |
|             - Mouse over on active point to check radius              |                            Should render active point with radius                            |      RTL      |
|                        Test 2: Get Area Label                         |                                                                                              |               |
|                     - Area label for stacked bar                      |                    Should return the correct aria label for a stacked bar                    |      RTL      |
|                      - Area label for single bar                      |                    Should return the correct aria label for a stacked bar                    |      RTL      |
|                       Test 3: Get Area Selected                       |                                                                                              |               |
|            - Mouse click on legend to check area selected             |                     Should return area selected true for selected legend                     |      RTL      |
|               - Area selected value for default legends               |       Should return area selected false for all the legends when no legend is selected       |      RTL      |
|         - Mouse Double click on legend to check area selected         | Should return area selected false for all the legends when mouse double click on same legend |      RTL      |
|                         Test 4: X- Axis Data                          |                                                                                              |               |
|                       - With string x-axis data                       |               Should return the bars and x axis values for string X-Axis data                |      RTL      |
|                      - With numeric x-axis data                       |                Should return the bars count properly for numeric X-Axis data                 |      RTL      |
|                        Test 5: Get Lines Data                         |                                                                                              |               |
|                       - get formatted line data                       |                Should return line data properly after completing the format.                 |      RTL      |
|                      - get Focus to whole stack                       |                Should return the correct focus to whole stack value properly                 |      RTL      |
|                         - get data set layer                          |                 Should return data set layer values properly based on input                  |      RTL      |
|                       Test 6: Get Margins Data                        |                                                                                              |               |
|           - Total width is greater than the required width            |      Should return the correct margins when total width is greater than required width       |      RTL      |
|             - Total width is less than the required width             |        Should return the correct margins when total width is less than required width        |      RTL      |
|                          Test 7: Get Scales                           |                                                                                              |               |
|                       - When x-axis is numeric                        |                             Should not show any rendered legends                             |      RTL      |
|                     - When x-axis is non-numeric                      |                          should return scales for non-numeric axis                           |      RTL      |

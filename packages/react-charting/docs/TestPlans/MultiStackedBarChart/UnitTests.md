**Unit Test Plan – Multi Stacked Bar Chart**

|                            **Test steps**                             |                                                     **Validation**                                                     | **Tool used** |
| :-------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: | :-----------: |
|                       Test 1: Create Bars Data                        |                                                                                                                        |               |
|                       - With proper chart Data                        |                                           Should return bars count correctly                                           |      RTL      |
|                           - With bar height                           |                                          Should return bars height correctly                                           |      RTL      |
|                     - With proper aria label data                     |                                        Should return bars area label correctly                                         |      RTL      |
|                        Test 2: Get Legend Data                        |                                                                                                                        |               |
|                       - With proper chart Data                        |                               Should return proper legend data when we have proper data                                |      RTL      |
|                        - With empty chart data                        |                            Should return empty legend data when we do not have proper data                             |      RTL      |
|            - With proper chart data along with properties             |                                       Should return legends data with properties                                       |      RTL      |
|                        Test 3: Is Chart Empty                         |                                                                                                                        |               |
|                             - Empty Data                              |                                      Should return true when chart data is empty                                       |      RTL      |
|                           - Non-Empty Data                            |                                    Should return false when chart data is non-empty                                    |      RTL      |
|                        Test 4: Get Area Label                         |                                                                                                                        |               |
|          - With aria label data in callOutAccessibilityData           |            Should return correct aria label for a bar where we have aria label in callOutAccessibilityData             |      RTL      |
|         - Without aria label data in callOutAccessibilityData         |         Should return correct aria label for a bar when we do not have aria-label in callOutAccessibilityData          |      RTL      |
| - Without aria label data in callOutAccessibilityData and legend data | Should return correct aria label for a bar where we do not have aria-label in callOutAccessibilityData and legend data |      RTL      |
|                Test 5: Compute longest bar total value                |                                                                                                                        |               |
|                       - With proper chart data                        |                              Should return the length of the longest Bar value correctly                               |      RTL      |

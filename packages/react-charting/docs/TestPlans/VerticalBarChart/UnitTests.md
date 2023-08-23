**Unit Test Plan – Vertical Bar Chart**

|                  **Test steps**                  |                                  **Validation**                                   | **Tool used** |
| :----------------------------------------------: | :-------------------------------------------------------------------------------: | :-----------: |
|            Test 1: Get Domain Margins            |                                                                                   |               |
| - Total width is greater than the required width | Should return the correct margins when total width is greater than required width |      RTL      |
|  - Total width is less than the required width   |  should return the correct margins when total width is less than required width   |      RTL      |
|                Test 2: Get Scales                |                                                                                   |               |
|              - When axis is Numeric              |                       Should return scales for numeric axis                       |      RTL      |
|            - When axis is Non-numeric            |                     should return scales for non-numeric axis                     |      RTL      |
|              Test 3: Create Colors               |                                                                                   |               |
|               - Using single color               |                Should return the color scale - using single color                 |      RTL      |
|             - Using multiple colors              |               Should return the color scale - using multiple color                |      RTL      |
|             Test 4: Get Aria Labels              |                                                                                   |               |
|                 - Non-empty data                 |                Returns an array of aria labels for each data point                |      RTL      |
|                   - Empty data                   |                        Returns empty string for empty data                        |      RTL      |

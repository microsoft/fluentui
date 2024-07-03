**Unit Test Plan - Sparkline Chart**

|                **Test steps**                |                  **Validation**                  | **Tool used** |
| :------------------------------------------: | :----------------------------------------------: | :-----------: |
|            Test 1: Get Line Path             |                                                  |               |
| - Get the Line path using ‘line’ class name. |             Should return Line path.             |      RTL      |
|       - Get the stroke from line path.       |     Should return the correct stroke value.      |      RTL      |
|      - Get the opacity from line path.       |     Should return the correct opacity value.     |      RTL      |
|            Test 2: Get Area Path             |                                                  |               |
| - Get the Area path using ‘area’ class name. |             Should return Area path.             |      RTL      |
|    - Get the fill-opacity from area path.    |  Should return the correct fill-opacity value.   |      RTL      |
|      - Get the opacity from area path.       |     Should return the correct opacity value.     |      RTL      |
|            Test 3: Is Chart Empty            |                                                  |               |
|                 - Empty Data                 |   Should return true when chart data is empty    |      RTL      |
|               - Non-Empty Data               | Should return false when chart data is non-empty |      RTL      |

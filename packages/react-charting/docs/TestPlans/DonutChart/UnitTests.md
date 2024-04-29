**Unit Test Plan - Donut Chart**

|        **Test steps**         |                          **Validation**                           | **Tool used** |
| :---------------------------: | :---------------------------------------------------------------: | :-----------: |
|     Test 1:Create Legends     |                                                                   |               |
|      - With legends data      |                 Should return proper legends data                 |      RTL      |
|    - Without legends data     |          Should not return legends when there is no data          |      RTL      |
|  Test 2: Add Default Colors   |                                                                   |               |
| - Without color data in input | Should return default colors when color is not defined input data |      RTL      |
|       - With color data       | Should return respective colors when color is defined input data  |      RTL      |
|   Test 3: To locale string    |                                                                   |               |
|      - With string data       |        Should return proper string when input is a string         |      RTL      |
|      - With numeric data      |        Should return proper string when input is a number         |      RTL      |

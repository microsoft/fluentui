**[Unit Test Plan -- Heat Map Chart]{.underline}**

+--------------------------------+------------------------+------------+
| \*| **[Test steps]{.underline}** | **[Val | **[Tool |
| | idation]{.underline}** | used]{.un |
| | | derline}** |
+================================+========================+============+
| Test 1: Get X and Y | | |
+--------------------------------+------------------------+------------+
| - With string xPoint and | Should return proper X | RTL |
| yPoint | and Y values for | |
| | string xPoint and | |
| | yPoint | |
+--------------------------------+------------------------+------------+
| - With numeric xPoint and | Should return proper X | RTL |
| yPoint | and Y values for | |
| | numeric xPoint and | |
| | yPoint | |
+--------------------------------+------------------------+------------+
| - With date xPoint and | Should return proper X | RTL |
| yPoint | and Y values for date | |
| | xPoint and yPoint | |
+--------------------------------+------------------------+------------+
| Test 2: Get Opacity | | |
+--------------------------------+------------------------+------------+
| - Non empty data | Should return proper | RTL |
| | opacity for legends | |
+--------------------------------+------------------------+------------+
| Test 3: Create Legend Bars | | |
+--------------------------------+------------------------+------------+
| - Non empty data | Should return proper | RTL |
| | legends data | |
+--------------------------------+------------------------+------------+
| Test 4: Get color scale | | |
+--------------------------------+------------------------+------------+
| - Non Empty Data | Should return proper | RTL |
| | color scale data | |
+--------------------------------+------------------------+------------+
| Test 5: Get X index | | |
+--------------------------------+------------------------+------------+
| - With string xPoint | Should return proper | RTL |
| | xIndex for string | |
| | xPoint | |
+--------------------------------+------------------------+------------+
| - With numeric xPoint | Should return proper | RTL |
| | xIndex for number | |
| | xPoint | |
+--------------------------------+------------------------+------------+
| - With date xPoint | Should return proper | RTL |
| | xIndex for date xPoint | |
+--------------------------------+------------------------+------------+
| Test 6: Get Y index | | |
+--------------------------------+------------------------+------------+
| - With string yPoint | Should return proper | RTL |
| | yIndex for string | |
| | yPoint | |
+--------------------------------+------------------------+------------+
| - With numeric yPoint | Should return proper | RTL |
| | yIndex for numeric | |
| | yPoint | |
+--------------------------------+------------------------+------------+
| - With date yPoint | Should return proper | RTL |
| | yIndex for date yPoint | |
+--------------------------------+------------------------+------------+
| Test 7: Get Aria-Label | | |
+--------------------------------+------------------------+------------+
| - With numeric xPoint and | Should return proper | RTL |
| yPoint | aria-label for numeric | |
| | xPoint and yPoint | |
+--------------------------------+------------------------+------------+
| - With numeric xPoint and | Should return proper | RTL |
| yPoint without legend | aria-label for numeric | |
| value | xPoint and yPoint | |
| | without legend value | |
+--------------------------------+------------------------+------------+
| - With string xPoint and | Should return proper | RTL |
| yPoint | aria-label for String | |
| | xPoint and yPoint | |
+--------------------------------+------------------------+------------+
| - With string xPoint and | Should return proper | RTL |
| yPoint without legend | aria-label for string | |
| | xPoint and yPoint | |
| | without legend | |
+--------------------------------+------------------------+------------+
| - With date xPoint and | Should return proper | RTL |
| yPoint | aria-label for date | |
| | xPoint and yPoint | |
+--------------------------------+------------------------+------------+
| - With date xPoint and | Should return proper | RTL |
| yPoint without legend | aria-label for date | |
| | xPoint and yPoint | |
| | without legend | |
+--------------------------------+------------------------+------------+
| - With numeric xPoint and | Should return proper | RTL |
| date yPoint | aria-label for numeric | |
| | xPoint and date yPoint | |
+--------------------------------+------------------------+------------+
| Test 8: Get formatted label | | |
| for xAxis data point | | |
+--------------------------------+------------------------+------------+
| - Non-empty data | Should return proper | RTLs |
| | xAxis label for | |
| | non-empty string | |
+--------------------------------+------------------------+------------+
| - Empty data | Should return proper | RTL |
| | xAxis label for empty | |
| | string | |
+--------------------------------+------------------------+------------+
| Test 8: Get formatted label | | |
| for yAxis data point | | |
+--------------------------------+------------------------+------------+
| - Non-empty data | Should return proper | RTL |
| | yAxis label for non | |
| | empty string | |
+--------------------------------+------------------------+------------+
| - Empty data | Should return proper | RTL |
| | yAxis label for empty | |
| | data | |
+--------------------------------+------------------------+------------+
| Test 9: Get string formatted | | |
| number | | |
+--------------------------------+------------------------+------------+
| - With numeric value as a | Should return proper | RTL |
| string | string formatted | |
| | number for numeric | |
| | value | |
+--------------------------------+------------------------+------------+
| - With format string | Should return proper | RTL |
| | string formatted | |
| | number with format | |
| | string | |
+--------------------------------+------------------------+------------+
| - Empty string | Should return proper | RTL |
| | string formatted | |
| | number for empty data | |
+--------------------------------+------------------------+------------+
| - With string value | Should return proper | RTL |
| | string formatted | |
| | number for string | |
| | value | |
+--------------------------------+------------------------+------------+
| Test 9: Get string formatted | | |
| date | | |
+--------------------------------+------------------------+------------+
| - With numeric point | Should return proper | RTL |
| | string formatted date | |
| | for date point | |
+--------------------------------+------------------------+------------+
| - With empty value | Should return proper | RTL |
| | string formatted date | |
| | for empty point | |
+--------------------------------+------------------------+------------+
| - With numeric point and | Should return proper | RTL |
| format string | string formatted date | |
| | for date point with | |
| | format string | |
+--------------------------------+------------------------+------------+
| Test 9: Get xAxis data points | | |
+--------------------------------+------------------------+------------+
| - With string points | Should return proper | RTL |
| | xAxis data points for | |
| | string points | |
+--------------------------------+------------------------+------------+
| - With numeric points | \'Should return proper | RTL |
| | xAxis data points for | |
| | numeric points | |
+--------------------------------+------------------------+------------+
| - With date points | \'Should return proper | RTL |
| | xAxis data points for | |
| | date points | |
+--------------------------------+------------------------+------------+
| Test 9: Get yAxis data points | | |
+--------------------------------+------------------------+------------+
| - With string points | Should return proper | RTL |
| | yAxis data points for | |
| | string points | |
+--------------------------------+------------------------+------------+
| - With numeric points | Should return proper | RTL |
| | yAxis data points for | |
| | numeric points | |
+--------------------------------+------------------------+------------+
| - With date points | Should return proper | RTL |
| | yAxis data points for | |
| | date points | |
+--------------------------------+------------------------+------------+
| Test 10: Create data set | | |
+--------------------------------+------------------------+------------+
| - With default axis type | Should return proper | RTL |
| | data set for default | |
| | axis type | |
+--------------------------------+------------------------+------------+
| - AxisType as string | Should return proper | RTL |
| | data set for string | |
| | axis type | |
+--------------------------------+------------------------+------------+
| - With date axis data and | Should return proper | RTL |
| default axis type | data set for date axis | |
| | with default axis type | |
+--------------------------------+------------------------+------------+
| - With date axis data and | Should return proper | RTL |
| AxisType as date | data set for date axis | |
| | with date axis type | |
+--------------------------------+------------------------+------------+
| - AxisType as numeric | Should return proper | RTL |
| | data set for numeric | |
| | axis type | |

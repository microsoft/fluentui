**[Unit Test Plan - Sparkline Chart]{.underline}**

+--------------------------------+------------------------+------------+
| **[Test steps]{.underline}** | **[Val | **[Tool |
| | idation]{.underline}** | used]{.un |
| | | derline}** |
+================================+========================+============+
| Test 1: Get Line Path | | |
+--------------------------------+------------------------+------------+
| - Get the Line path using | Should return Line | RTL |
| 'line' class name. | path. | |
+--------------------------------+------------------------+------------+
| - Get the stroke from line | Should return the | RTL |
| path. | correct stroke value. | |
+--------------------------------+------------------------+------------+
| - Get the opacity from line | Should return the | RTL |
| path. | correct opacity value. | |
+--------------------------------+------------------------+------------+
| Test 2: Get Area Path | | |
+--------------------------------+------------------------+------------+
| - Get the Area path using | Should return Area | RTL |
| 'area' class name. | path. | |
+--------------------------------+------------------------+------------+
| - Get the fill-opacity from | Should return the | RTL |
| area path. | correct fill-opacity | |
| | value. | |
+--------------------------------+------------------------+------------+
| - Get the opacity from area | Should return the | RTL |
| path. | correct opacity value. | |
+--------------------------------+------------------------+------------+
| Test 3: Is Chart Empty | | |
+--------------------------------+------------------------+------------+
| - Empty Data | Should return true | RTL |
| | when chart data is | |
| | empty | |
+--------------------------------+------------------------+------------+
| - Non-Empty Data | Should return false | RTL |
| | when chart data is | |
| | non-empty | |
+--------------------------------+------------------------+------------+

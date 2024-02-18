# Unit test plan for Donut Chart

This test plan contains the list of unit testable functions which are used as a part of the Donut Chart component.

Identify the functions that can be unit tested (example, functions having calculations or getting values from Utils, etc).

- If required, extract the unit testable portions out of the functions which can be independently unit tested without any requirement of DOM elements.
- Alternatively, mock the sections that cannot be unit tested.

| Functions                     | Can it be unit tested | Reason                                                                                                                                                                                 |
| ----------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| a. `convertToLocaleString()`  | Yes                   |                                                                                                                                                                                        |
| b.`getAccessibleDataObject()` | Yes                   |                                                                                                                                                                                        |
| c. `_valueInsideDonut()`      | No                    | private function which can only be tested by rendering the donut chart component.                                                                                                      |
| d. `wrapTextInsideDonut()`    | No                    | cannot be unit tested as it requires the tspan length to be calculated using Browser Functions like getComputedTextLength().                                                           |
| e. `_computeTotalValue()`     | No                    | depends on the data prop passed down from the DonutChart.base to Pie during component rendering. Also since this is a private function, it can only be tested via component rendering. |

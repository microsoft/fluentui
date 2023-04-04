# Unit test plan for Donut Chart

This test plan contains the list of unit testable functions which are used as a part of the Donut Chart component.

1.  Identify the functions that can be unit tested (example, functions having calculations or getting values from Utils, etc).
    If required, extract the unit testable portions out of the functions which can be independently unit tested without any requirement of DOM elements.

            a. convertToLocaleString()  [src/components/DonutChart/DonutChart.base.tsx]
            b. getAccessibleDataObject() [src/components/DonutChart/DonutChart.base.tsx]
            c. _valueInsideDonut()  [src/components/DonutChart/DonutChart.base.tsx]
            d. wrapTextInsideDonut()  [src/components/DonutChart/Pie.tsx]
            e. _computeTotalValue() [src/components/DonutChart/Pie.tsx]

2.  Identify the parts within those functions which cannot be tested via unit tests.

        a. _valueInsideDonut()() - private function which can only be tested by
                                   rendering the donnut chart component.
        a. wrapTextInsideDonut() - cannot be unit tested as it requires the tspan
                                   length to be calculated using Browser Functions
                                   like getComputedTextLength().
        b. _computeTotalValue() - depends on the data prop passed down from the
                                  DonutChart.base to Pie during component rendering. Also since this is a private function, it can
                                  only be tested via component rendering.

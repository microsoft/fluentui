This document highlights few common testing practices for any new tests that are being added to the charting library.

1. Any new test should always be added using React Testing Library.
2. The utility functions like `testWithoutWait`, `testWithWait` and `testScreenResolutionChanges` can be used in writing the component tests which will reduce the number of lines of code.
3. `testWithWait` is needed when we are either trying to provide any prop and update or we are trying to extract any sub-sub svg element like bars within the vertical bar chart.
4. Order of imports is important while writing tests. Following is an example:
   Importing the test data before importing the render function from the '@testing-library/react' results in erroneous rendering of the chart.
   For example: for Vertical bar charts, improper sequencing of the imports results in the following output:
   `import { chartPoints } from '../VerticalBarChart/VerticalBarChart.test';`
   `import { render, screen, queryAllByAttribute, fireEvent, act } from '@testing-library/react';`
   However, reordering the import sequence results in the correct rendering as follows:
   `import { render, screen, queryAllByAttribute } from '@testing-library/react';`
   `import { chartPoints } from './VerticalBarChart.test';`

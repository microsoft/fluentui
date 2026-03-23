import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';
import type { VegaDeclarativeChartProps, VegaLiteSpec } from './VegaDeclarativeChart';
import { resetIdsForTests } from '@fluentui/react-utilities';

// Suppress console warnings for cleaner test output
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

// Reset IDs before each test to ensure consistent snapshots
beforeEach(() => {
  resetIdsForTests();
});

describe('VegaDeclarativeChart - Basic Rendering', () => {
  it('renders with basic line chart spec', () => {
    const spec: VegaLiteSpec = {
      mark: 'line',
      data: {
        values: [
          { x: 1, y: 10 },
          { x: 2, y: 20 },
          { x: 3, y: 15 },
        ],
      },
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'y', type: 'quantitative' },
      },
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container).toBeTruthy();
  });
});

import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { chartPoints, emptyChartPoints } from './LineChart.test';
import { LineChart } from './index';
import { resetIds } from '../../Utilities';

function sharedBeforeEach() {
  resetIds();
  jest.useFakeTimers();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
}

describe('Line chart rendering', () => {
  beforeEach(() => {
    sharedBeforeEach();
  });
  test('Should re-render the Line chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<LineChart data={emptyChartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_LineChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<LineChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_LineChart_empty/i)).toHaveLength(0);
    });
  });
});

import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { chartPoints, emptyChartPoints } from './LineChart.test';
import { LineChart } from './index';

describe('Line chart rendering', () => {
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

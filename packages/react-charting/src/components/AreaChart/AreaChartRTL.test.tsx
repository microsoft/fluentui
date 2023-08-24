import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { chartPoints, emptyChartPoints } from './AreaChart.test';
import { AreaChart } from './index';

describe('Area chart rendering', () => {
  test('Should re-render the Area chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<AreaChart data={emptyChartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_AreaChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<AreaChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_AreaChart_empty/i)).toHaveLength(0);
    });
  });
});

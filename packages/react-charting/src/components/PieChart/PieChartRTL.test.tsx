import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { PieChart } from './index';
import { chartPoints, colors } from './PieChart.test';

describe('Pie chart rendering', () => {
  test('Should re-render the Pie chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<PieChart data={[]} colors={colors} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_PieChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<PieChart data={chartPoints} colors={colors} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_PieChart_empty/i)).toHaveLength(0);
    });
  });
});

import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { chartPoints, emptyChartPoints } from './StackedBarChart.test';
import { StackedBarChart } from './index';

const getById = queryAllByAttribute.bind(null, 'id');
describe('stacked bar chart re-rendering', () => {
  test('Should re-render the stacked bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<StackedBarChart data={emptyChartPoints} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_SBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<StackedBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_SBC_empty/i)).toHaveLength(0);
    });
  });
});

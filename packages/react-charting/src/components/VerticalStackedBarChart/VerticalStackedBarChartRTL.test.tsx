import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { emptyChartPoints, chartPoints } from './VerticalStackedBarChart.test';
import { VerticalStackedBarChart } from './index';

describe('Vertical stacked bar chart rendering', () => {
  test('Should re-render the Vertical stacked bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<VerticalStackedBarChart data={emptyChartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_VSBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<VerticalStackedBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_VSBC_empty/i)).toHaveLength(0);
    });
  });
});

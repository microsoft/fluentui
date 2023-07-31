import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { chartPoints, emptyChartPoints } from './MultiStackedBarChart.test';
import { MultiStackedBarChart } from './index';

const getById = queryAllByAttribute.bind(null, 'id');
describe('Multi-stacked bar chart re-rendering', () => {
  test('Should re-render the Multi-stacked bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<MultiStackedBarChart data={emptyChartPoints} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_MSBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<MultiStackedBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_MSBC_empty/i)).toHaveLength(0);
    });
  });
});

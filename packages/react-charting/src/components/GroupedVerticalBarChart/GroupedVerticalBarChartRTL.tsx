import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { GroupedVerticalBarChart } from '../../index';
import { chartPoints, emptyChartPoints } from './GroupedVerticalBarChart.test';

describe('Grouped Vertical Bar chart rendering', () => {
  test('Should re-render the Grouped Vertical Bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<GroupedVerticalBarChart data={emptyChartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_GVBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<GroupedVerticalBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_GVBC_empty/i)).toHaveLength(0);
    });
  });
});

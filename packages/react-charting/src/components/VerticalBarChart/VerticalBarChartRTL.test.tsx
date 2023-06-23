import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { chartPoints } from './VerticalBarChart.test';
import { VerticalBarChart } from './VerticalBarChart';

describe('Vertical bar chart rendering', () => {
  test('Should re-render the vertical bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<VerticalBarChart data={[]} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_VBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<VerticalBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_VBC_empty/i)).toHaveLength(0);
    });
  });
});

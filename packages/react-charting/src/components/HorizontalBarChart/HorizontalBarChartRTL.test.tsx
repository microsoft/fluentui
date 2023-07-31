import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { chartPoints } from './HorizontalBarChart.test';
import { HorizontalBarChart } from './index';

const getById = queryAllByAttribute.bind(null, 'id');
describe('Horizontal bar chart re-rendering', () => {
  test('Should re-render the Horizontal bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<HorizontalBarChart data={[]} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_HBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<HorizontalBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_HBC_empty/i)).toHaveLength(0);
    });
  });
});

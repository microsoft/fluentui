import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { chartPoints } from './HorizontalBarChart.test';
import { HorizontalBarChart } from './index';

describe('Horizontal Bar chart rendering', () => {
  test('Should re-render the Horizontal Bar chart with data', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
    // Arrange
    const { container, rerender } = render(<HorizontalBarChart data={[]} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_HBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<HorizontalBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_HBC_empty/i)).toHaveLength(0);
      jest.spyOn(global.Math, 'random').mockRestore();
    });
  });
});

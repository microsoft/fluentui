import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { chartPoints, emptyChartPoints } from './StackedBarChart.test';
import { StackedBarChart } from './index';

describe('Stacked Bar chart rendering', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  test('Should re-render the Stacked Bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<StackedBarChart data={emptyChartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
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

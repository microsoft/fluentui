import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { data } from './SankeyChart.test';
import { IChartProps, SankeyChart } from './index';

const emptyChartPoints: IChartProps = {
  chartData: [],
};

describe('Sankey chart rendering', () => {
  test('Should re-render the Sankey chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<SankeyChart data={emptyChartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_SankeyChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<SankeyChart data={data} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_SankeyChart_empty/i)).toHaveLength(0);
    });
  });
});

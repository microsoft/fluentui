/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { data } from './SankeyChart.test';
import { IChartProps, SankeyChart } from './index';
import { resetIds } from '../../Utilities';
import { SankeyChartBase } from './SankeyChart.base';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const emptyChartPoints: IChartProps = {
  chartData: [],
};

function sharedBeforeEach() {
  resetIds();
}

describe('Sankey chart rendering', () => {
  beforeEach(sharedBeforeEach);
  test('Should re-render the Sankey chart with data', async () => {
    jest.spyOn(SankeyChartBase.prototype as any, '_truncateText').mockImplementation(() => 'test');
    jest.spyOn(SankeyChartBase.prototype as any, '_createNodes').mockImplementation(() => []);
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

describe('Sankey Chart - axe-core', () => {
  beforeEach(sharedBeforeEach);

  test('Should pass accessibility tests', async () => {
    jest.spyOn(SankeyChartBase.prototype as any, '_createNodes').mockImplementation(() => []);
    const { container } = render(<SankeyChart data={data} />);
    const axeResults = await axe(container);
    expect(axeResults).toHaveNoViolations();
  }, 10000);
});

import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { HeatMapChart } from './index';
import { HeatMapData } from './HeatMapChart.test';

describe('HeatMap chart rendering', () => {
  test('Should re-render the HeatMap chart with data', async () => {
    // Arrange
    const { container, rerender } = render(
      <HeatMapChart
        data={[]}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_HeatMap_empty/i)).toHaveLength(1);
    // Act
    rerender(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_HeatMap_empty/i)).toHaveLength(0);
    });
  });
});

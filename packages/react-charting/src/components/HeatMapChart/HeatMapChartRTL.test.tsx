import * as React from 'react';
import { act, queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { HeatMapChart, IHeatMapChartProps } from './index';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const yPoint: string[] = ['p1', 'p2'];

const xPoint: string[] = [new Date('2020-03-03').toISOString(), new Date('2020-03-04').toISOString()];
export const HeatMapData: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Execllent (0-200)',
    data: [
      {
        x: xPoint[0],
        y: yPoint[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
      {
        x: xPoint[1],
        y: yPoint[1],
        value: 25,
        rectText: 25,
        ratio: [25, 2479],
        descriptionMessage: `Due to unexpected heavy rain, all the pollutants are washed
        off and people of alaska are hoping for more of this days`,
      },
    ],
  },
];

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

describe('Heat Map Chart - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

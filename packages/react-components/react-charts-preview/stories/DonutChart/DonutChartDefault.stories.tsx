import * as React from 'react';
import { DonutChart, IChartProps } from '../../src/DonutChart';
import { getColorFromToken, DataVizPalette } from '../../src/utilities/colors';

export const DonutBasic = () => {
  const points = [
    { legend: 'first', data: 20000, color: getColorFromToken(DataVizPalette.color1), xAxisCalloutData: '2020/04/30' },
    {
      legend: 'second',
      data: 39000,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'third',
      data: 30000,
      color: getColorFromToken(DataVizPalette.color3),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'fourth',
      data: 25000,
      color: getColorFromToken(DataVizPalette.color4),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'fifth',
      data: 35000,
      color: getColorFromToken(DataVizPalette.color5),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'sixth',
      data: 40000,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'sixth',
      data: 40000,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'sixth',
      data: 40000,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'sixth',
      data: 40000,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'sixth',
      data: 40000,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'sixth',
      data: 40000,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/20',
    },
  ];

  const data: IChartProps = {
    chartTitle: 'Donut chart basic example',
    chartData: points,
  };
  return (
    <DonutChart
      culture={window.navigator.language}
      data={data}
      innerRadius={55}
      href={'https://developer.microsoft.com/en-us/'}
      legendsOverflowText={'overflow Items'}
      hideLegend={false}
      height={220}
      width={176}
      valueInsideDonut={39000}
    />
  );
};

DonutBasic.parameters = {
  docs: {
    description: {
      story: 'Donut Chart Story.',
    },
  },
};

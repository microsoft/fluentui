import * as React from 'react';
import { DonutChart, IChartProps, IChartDataPoint, DataVizGradientPalette, getGradientFromToken } from '@fluentui/react-charts-preview';

export const DonutBasic = () => {
  const points:IChartDataPoint[] = [
    {
      legend: 'first',
      data: 20000,
      gradient: getGradientFromToken(DataVizGradientPalette.gradient1),
      xAxisCalloutData: '2020/04/30'
    },
    {
      legend: 'second',
      data: 39000,
      gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
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

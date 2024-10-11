import * as React from 'react';
import { DonutChart, IChartProps, DataVizGradientPalette, getGradientFromToken } from '@fluentui/react-charts-preview';

export const DonutChartBasic = () => {
  const points = [
    {
      legend: 'first',
      data: 20000,
      gradient: getGradientFromToken(DataVizGradientPalette.gradient1),
      xAxisCalloutData: '2020/04/30',
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
      culture={typeof window !== 'undefined' ? window.navigator.language : 'en-us'}
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

DonutChartBasic.parameters = {
  docs: {
    description: {},
  },
};

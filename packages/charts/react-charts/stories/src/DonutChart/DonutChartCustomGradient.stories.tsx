import * as React from 'react';
import { DonutChart, ChartProps, ChartDataPoint } from '@fluentui/react-charts-preview';

export const DonutChartCustomGradient = () => {
  const points: ChartDataPoint[] = [
    {
      legend: 'first',
      data: 20000,
      //  Custom gradient
      color: ['#000AC4', '#E823CE'],
      xAxisCalloutData: '2020/04/30',
    },
    {
      legend: 'second',
      data: 35000,
      //  Custom gradient
      color: ['#d621c8', '#00D0FF'],
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'third',
      data: 10000,
      //  Custom gradient
      color: ['#00D0FF', 'white'],
      xAxisCalloutData: '2020/04/10',
    },
  ];

  const data: ChartProps = {
    chartTitle: 'Donut chart custom gradients example',
    chartData: points,
  };
  return (
    <DonutChart
      culture={typeof window !== 'undefined' ? window.navigator.language : 'en-us'}
      data={data}
      innerRadius={55}
      legendsOverflowText={'overflow Items'}
      hideLegend={false}
      height={220}
      valueInsideDonut={35000}
    />
  );
};

DonutChartCustomGradient.parameters = {
  docs: {
    description: {},
  },
};

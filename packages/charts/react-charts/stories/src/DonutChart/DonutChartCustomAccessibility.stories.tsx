import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DonutChart, ChartProps, ChartDataPoint, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';

export const DonutChartCustomAccessibility = (): JSXElement => {
  const points: ChartDataPoint[] = [
    {
      legend: 'first',
      data: 20000,
      color: getColorFromToken(DataVizPalette.color16),
      xAxisCalloutData: '2020/04/30',
      callOutAccessibilityData: { ariaLabel: 'Pia chart 1 of 2 2020/04/30' },
    },
    {
      legend: 'second',
      data: 39000,
      color: getColorFromToken(DataVizPalette.color3),
      xAxisCalloutData: '2020/04/20',
      callOutAccessibilityData: { ariaLabel: 'Pia chart 2 of 2 2020/04/20' },
    },
  ];
  const data: ChartProps = {
    chartTitle: 'Donut chart custom accessibility example',
    chartData: points,
    chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about Donut chart' },
  };
  return (
    <DonutChart
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
DonutChartCustomAccessibility.parameters = {
  docs: {
    description: {},
  },
};

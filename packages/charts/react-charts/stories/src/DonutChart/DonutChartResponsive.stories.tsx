import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DonutChart,
  ChartProps,
  ChartDataPoint,
  DataVizPalette,
  getColorFromToken,
  ResponsiveContainer,
} from '@fluentui/react-charts';

export const DonutChartResponsive = (): JSXElement => {
  const points: ChartDataPoint[] = [
    {
      legend: 'first',
      data: 20000,
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: '2020/04/30',
    },
    {
      legend: 'second',
      data: 39000,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'third',
      data: 12000,
      color: getColorFromToken(DataVizPalette.color3),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'fourth',
      data: 2000,
      color: getColorFromToken(DataVizPalette.color4),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'fifth',
      data: 5000,
      color: getColorFromToken(DataVizPalette.color5),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'sixth',
      data: 6000,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'seventh',
      data: 7000,
      color: getColorFromToken(DataVizPalette.color7),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'eighth',
      data: 8000,
      color: getColorFromToken(DataVizPalette.color8),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'ninth',
      data: 9000,
      color: getColorFromToken(DataVizPalette.color9),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'tenth',
      data: 10000,
      color: getColorFromToken(DataVizPalette.color10),
      xAxisCalloutData: '2020/04/20',
    },
  ];

  const data: ChartProps = {
    chartTitle: 'Donut chart basic example',
    chartData: points,
  };

  return (
    <ResponsiveContainer>
      <DonutChart data={data} innerRadius={55} valueInsideDonut={39000} />
    </ResponsiveContainer>
  );
};
DonutChartResponsive.parameters = {
  docs: {
    description: {},
  },
};

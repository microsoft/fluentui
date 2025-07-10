import * as React from 'react';
import {
  DonutChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
  getGradientFromToken,
  DataVizGradientPalette,
  ResponsiveContainer,
} from '@fluentui/react-charting';

const points: IChartDataPoint[] = [
  {
    legend: 'first',
    data: 20000,
    color: getColorFromToken(DataVizPalette.color1),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient1),
    xAxisCalloutData: '2020/04/30',
  },
  {
    legend: 'second',
    data: 39000,
    color: getColorFromToken(DataVizPalette.color2),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
    xAxisCalloutData: '2020/04/20',
  },
  {
    legend: 'third',
    data: 12000,
    color: getColorFromToken(DataVizPalette.color3),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
    xAxisCalloutData: '2020/04/20',
  },
  {
    legend: 'fourth',
    data: 2000,
    color: getColorFromToken(DataVizPalette.color4),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
    xAxisCalloutData: '2020/04/20',
  },
  {
    legend: 'fifth',
    data: 5000,
    color: getColorFromToken(DataVizPalette.color5),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
    xAxisCalloutData: '2020/04/20',
  },
  {
    legend: 'sixth',
    data: 6000,
    color: getColorFromToken(DataVizPalette.color6),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
    xAxisCalloutData: '2020/04/20',
  },
  {
    legend: 'seventh',
    data: 7000,
    color: getColorFromToken(DataVizPalette.color7),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
    xAxisCalloutData: '2020/04/20',
  },
  {
    legend: 'eighth',
    data: 8000,
    color: getColorFromToken(DataVizPalette.color8),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
    xAxisCalloutData: '2020/04/20',
  },
  {
    legend: 'ninth',
    data: 9000,
    color: getColorFromToken(DataVizPalette.color9),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
    xAxisCalloutData: '2020/04/20',
  },
  {
    legend: 'tenth',
    data: 10000,
    color: getColorFromToken(DataVizPalette.color10),
    gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
    xAxisCalloutData: '2020/04/20',
  },
];

const data: IChartProps = {
  chartTitle: 'Donut chart basic example',
  chartData: points,
};

export class DonutChartResponsiveExample extends React.Component {
  public render(): JSX.Element {
    return (
      <ResponsiveContainer>
        <DonutChart data={data} innerRadius={55} valueInsideDonut={39000} />
      </ResponsiveContainer>
    );
  }
}

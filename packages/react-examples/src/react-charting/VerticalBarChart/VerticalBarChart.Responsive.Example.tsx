import * as React from 'react';
import {
  VerticalBarChart,
  IVerticalBarChartDataPoint,
  DataVizPalette,
  getColorFromToken,
  ILineChartLineOptions,
  ResponsiveContainer,
} from '@fluentui/react-charting';

const points: IVerticalBarChartDataPoint[] = [
  {
    x: 0,
    y: 10000,
    legend: 'Oranges',
    color: getColorFromToken(DataVizPalette.color25),
    lineData: {
      y: 7000,
    },
  },
  {
    x: 10000,
    y: 50000,
    legend: 'Dogs',
    color: getColorFromToken(DataVizPalette.color26),
    lineData: {
      y: 30000,
    },
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: getColorFromToken(DataVizPalette.color27),
    lineData: {
      y: 3000,
    },
  },
  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: getColorFromToken(DataVizPalette.color6),
  },
  {
    x: 52000,
    y: 43000,
    legend: 'Giraffes',
    color: getColorFromToken(DataVizPalette.color11),
    lineData: {
      y: 30000,
    },
  },
  {
    x: 68000,
    y: 30000,
    legend: 'Cats',
    color: getColorFromToken(DataVizPalette.color28),
    lineData: {
      y: 5000,
    },
  },
  {
    x: 80000,
    y: 20000,
    legend: 'Elephants',
    color: getColorFromToken(DataVizPalette.color11),
    lineData: {
      y: 16000,
    },
  },
  {
    x: 92000,
    y: 45000,
    legend: 'Monkeys',
    color: getColorFromToken(DataVizPalette.color6),
    lineData: {
      y: 40000,
    },
  },
];
const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

export class VerticalBarChartResponsiveExample extends React.Component {
  public render(): JSX.Element {
    return (
      <ResponsiveContainer>
        <VerticalBarChart data={points} lineLegendText={'Line'} lineLegendColor={'brown'} lineOptions={lineOptions} />
      </ResponsiveContainer>
    );
  }
}

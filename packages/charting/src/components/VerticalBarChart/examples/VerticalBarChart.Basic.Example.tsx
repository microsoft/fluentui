import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps } from '@uifabric/charting';

export class VerticalBarChartBasicExample extends React.Component<IVerticalBarChartProps, {}> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points = [
      { x: 0, y: 10, legend: 'First', color: 'pink', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '10%' },
      { x: 6, y: 18, legend: 'First', color: 'pink', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '20%' },
      { x: 12, y: 36, legend: 'Third', color: 'blue', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '37%' },
      { x: 21, y: 20, legend: 'Fourth', color: 'green', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '87%' },
      { x: 29, y: 46, legend: 'Fifth', color: 'red', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '17%' },
      { x: 34, y: 25, legend: 'sixth', color: 'red', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '77%' },
      { x: 40, y: 13, legend: 'seventh', color: 'red', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '88%' },
      { x: 48, y: 43, legend: 'Eighith', color: 'red', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '71%' },
      { x: 57, y: 30, legend: 'Nighth', color: 'red', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '40%' },
      { x: 64, y: 45, legend: 'tenth', color: 'red', xAxisCalloutData: '2020/04/30', yAxisCalloutData: '33%' },
    ];

    return <VerticalBarChart data={points} chartLabel={'Basic Chart with Numeric Axes'} />;
  }
}

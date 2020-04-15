import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps } from '@uifabric/charting/lib/VerticalBarChart';

export class VerticalBarChartBasicExample extends React.Component<IVerticalBarChartProps, {}> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points = [
      { x: 0, y: 10, legend: 'First', color: 'pink' },
      { x: 6, y: 18, legend: 'Second', color: 'red' },
      { x: 12, y: 36, legend: 'Third', color: 'blue' },
      { x: 21, y: 20, legend: 'Fourth', color: 'green' },
      { x: 29, y: 46, legend: 'Fifth', color: 'red' },
      { x: 34, y: 25, legend: 'sixth', color: 'red' },
      { x: 40, y: 13, legend: 'seventh', color: 'red' },
      { x: 48, y: 43, legend: 'Eighith', color: 'red' },
      { x: 57, y: 30, legend: 'Nighth', color: 'red' },
      { x: 64, y: 45, legend: 'tenth', color: 'red' },
    ];

    return <VerticalBarChart data={points} chartLabel={'Basic Chart with Numeric Axes'} />;
  }
}

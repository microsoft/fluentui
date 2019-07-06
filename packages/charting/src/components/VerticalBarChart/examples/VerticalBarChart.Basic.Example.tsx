import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps } from '@uifabric/charting/lib/VerticalBarChart';

export class VerticalBarChartBasicExample extends React.Component<IVerticalBarChartProps, {}> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points = [
      { x: 0, y: 10 },
      { x: 6, y: 18 },
      { x: 12, y: 36 },
      { x: 21, y: 20 },
      { x: 29, y: 46 },
      { x: 34, y: 25 },
      { x: 40, y: 13 },
      { x: 48, y: 43 },
      { x: 57, y: 30 },
      { x: 64, y: 45 },
      { x: 72, y: 12 },
      { x: 78, y: 50 },
      { x: 85, y: 25 },
      { x: 90, y: 43 },
      { x: 96, y: 22 },
      { x: 100, y: 19 }
    ];

    return <VerticalBarChart data={points} chartLabel={'Basic Chart with Numeric Axes'} />;
  }
}

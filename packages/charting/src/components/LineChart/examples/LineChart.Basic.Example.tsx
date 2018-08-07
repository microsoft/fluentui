import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { IDataPoint } from '@uifabric/charting/lib/types/IDataPoint';

export class LineChartBasicExample extends React.Component<ILineChartProps, {}> {
  constructor(props: ILineChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points: IDataPoint[][] = [
      [
        { x: 0, y: 10 },
        { x: 5, y: 18 },
        { x: 10, y: 24 },
        { x: 15, y: 25 },
        { x: 20, y: 15 },
        { x: 25, y: 30 },
        { x: 30, y: 18 },
        { x: 35, y: 32 },
        { x: 40, y: 29 },
        { x: 45, y: 43 },
        { x: 50, y: 45 }
      ],
      [
        { x: 0, y: 18 },
        { x: 5, y: 20 },
        { x: 10, y: 40 },
        { x: 15, y: 30 },
        { x: 20, y: 18 },
        { x: 22, y: 20 },
        { x: 35, y: 40 },
        { x: 40, y: 30 },
        { x: 42, y: 18 },
        { x: 43, y: 20 },
        { x: 45, y: 40 },
        { x: 50, y: 30 }
      ],
      [
        { x: 0, y: 20 },
        { x: 5, y: 15 },
        { x: 10, y: 30 },
        { x: 15, y: 35 },
        { x: 20, y: 30 },
        { x: 22, y: 15 },
        { x: 35, y: 30 },
        { x: 40, y: 27 },
        { x: 42, y: 29 },
        { x: 43, y: 35 },
        { x: 45, y: 40 },
        { x: 50, y: 42 }
      ]
    ];
    const colors = ['#FF5733', '#176213', '#193BBD'];
    return <LineChart data={points} chartLabel={'Basic Chart with Numeric Axes'} colors={colors} />;
  }
}

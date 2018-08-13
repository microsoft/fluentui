import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { IDataPoint } from '@uifabric/charting/lib/types/IDataPoint';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

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
      ]
    ];
    const colors = [DefaultPalette.blue];
    return <LineChart data={points} chartLabel={'Basic Chart with Numeric Axes'} colors={colors} />;
  }
}

import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { IChartProps, ILineChartPoints } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

interface IRootStyles {
  height: string;
  width: string;
}

export class LineChartBasicExample extends React.Component<ILineChartProps, {}> {
  constructor(props: ILineChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const points: ILineChartPoints[] = [
      {
        data: [
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
          { x: 50, y: 46 }
        ],
        legend: 'First',
        color: DefaultPalette.blue
      }
    ];
    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: points
    };
    const colors = [DefaultPalette.blue];

    const rootStyle: IRootStyles = { width: '700px', height: '300px' };

    return (
      <div className={mergeStyles(rootStyle)}>
        <LineChart data={data} chartLabel={'Basic Chart with Numeric Axes'} colors={colors} />
      </div>
    );
  }
}

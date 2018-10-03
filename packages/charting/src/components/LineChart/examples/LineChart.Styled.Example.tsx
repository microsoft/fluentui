import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { IChartProps, ILineChartPoints } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

interface IRootStyles {
  height: string;
  width: string;
}

export class LineChartStyledExample extends React.Component<ILineChartProps, {}> {
  constructor(props: ILineChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._styledExample()}</div>;
  }

  private _styledExample(): JSX.Element {
    const points: ILineChartPoints[] = [
      {
        data: [
          { x: 'One', y: 5 },
          { x: 'Two', y: 10 },
          { x: 'Three', y: 5 },
          { x: 'Four', y: 20 },
          { x: 'Five', y: 18 },
          { x: 'Six', y: 5 },
          { x: 'Seven', y: 10 },
          { x: 'Eight', y: 5 },
          { x: 'Nine', y: 20 },
          { x: 'Ten', y: 18 }
        ],
        legend: 'Week',
        color: DefaultPalette.blue
      }
    ];

    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: points
    };
    const rootStyle: IRootStyles = { width: '700px', height: '300px' };
    return (
      <div className={mergeStyles(rootStyle)}>
        <LineChart data={data} strokeWidth={4} />
      </div>
    );
  }
}

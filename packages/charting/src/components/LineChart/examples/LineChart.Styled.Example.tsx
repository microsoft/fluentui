import * as React from 'react';
import { IChartProps, ILineChartPoints, ILineChartProps, LineChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

interface IRootStyles {
  height: string;
  width: string;
}

export class LineChartStyledExample extends React.Component<{}, {}> {
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
          { x: new Date('2018/01/06'), y: 10 },
          { x: new Date('2018/01/16'), y: 18 },
          { x: new Date('2018/01/20'), y: 24 },
          { x: new Date('2018/01/24'), y: 35 },
          { x: new Date('2018/01/26'), y: 35 },
          { x: new Date('2018/01/29'), y: 38 }
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

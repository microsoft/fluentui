import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { IChartProps, ILineChartPoints } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

interface IRootStyles {
  height: string;
  width: string;
}

export class LineChartMultipleExample extends React.Component<ILineChartProps, {}> {
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
          { x: '28/08', y: 10 },
          { x: '29/08', y: 18 },
          { x: '30/08', y: 24 },
          { x: '31/08', y: 25 },
          { x: '01/09', y: 15 },
          { x: '02/09', y: 30 },
          { x: '03/09', y: 18 },
          { x: '04/09', y: 32 },
          { x: '05/09', y: 29 },
          { x: '06/09', y: 43 },
          { x: '07/09', y: 45 }
        ],
        legend: 'First',
        color: DefaultPalette.blue
      },
      {
        data: [
          { x: '28/08', y: 18 },
          { x: '29/08', y: 20 },
          { x: '30/08', y: 40 },
          { x: '31/08', y: 30 },
          { x: '01/09', y: 18 },
          { x: '02/09', y: 20 },
          { x: '03/09', y: 40 },
          { x: '04/09', y: 30 },
          { x: '05/09', y: 18 },
          { x: '06/09', y: 40 },
          { x: '07/09', y: 30 }
        ],
        legend: 'Second',
        color: DefaultPalette.green
      },
      {
        data: [
          { x: '28/08', y: 20 },
          { x: '29/08', y: 15 },
          { x: '30/08', y: 30 },
          { x: '31/08', y: 35 },
          { x: '01/09', y: 30 },
          { x: '02/09', y: 15 },
          { x: '03/09', y: 30 },
          { x: '04/09', y: 27 },
          { x: '05/09', y: 29 },
          { x: '06/09', y: 35 },
          { x: '07/09', y: 42 }
        ],
        legend: 'Third',
        color: DefaultPalette.red
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

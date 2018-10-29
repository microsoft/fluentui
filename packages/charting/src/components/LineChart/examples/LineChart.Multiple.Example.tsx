import * as React from 'react';
import { IChartProps, ILineChartPoints, ILineChartProps, LineChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

interface IRootStyles {
  height: string;
  width: string;
}

export class LineChartMultipleExample extends React.Component<{}, {}> {
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
          { x: new Date('01-01-2018'), y: 10 },
          { x: new Date('01-15-2018'), y: 18 },
          { x: new Date('01-28-2018'), y: 24 },
          { x: new Date('02-01-2018'), y: 25 },
          { x: new Date('03-01-2018'), y: 15 },
          { x: new Date('03-15-2018'), y: 30 },
          { x: new Date('03-28-2018'), y: 18 },
          { x: new Date('04-04-2018'), y: 32 },
          { x: new Date('04-15-2018'), y: 29 },
          { x: new Date('05-05-2018'), y: 43 },
          { x: new Date('06-01-2018'), y: 45 }
        ],
        legend: 'First',
        color: DefaultPalette.blue
      },
      {
        data: [
          { x: new Date('01-01-2018'), y: 10 },
          { x: new Date('01-7-2018'), y: 18 },
          { x: new Date('01-15-2018'), y: 24 },
          { x: new Date('02-01-2018'), y: 25 },
          { x: new Date('03-10-2018'), y: 15 },
          { x: new Date('03-15-2018'), y: 30 },
          { x: new Date('03-20-2018'), y: 18 },
          { x: new Date('04-10-2018'), y: 32 },
          { x: new Date('04-20-2018'), y: 29 },
          { x: new Date('05-16-2018'), y: 43 },
          { x: new Date('06-01-2018'), y: 45 }
        ],
        legend: 'Second',
        color: DefaultPalette.green
      },
      {
        data: [
          { x: new Date('01-06-2018'), y: 10 },
          { x: new Date('01-18-2018'), y: 18 },
          { x: new Date('01-25-2018'), y: 24 },
          { x: new Date('02-10-2018'), y: 25 },
          { x: new Date('03-03-2018'), y: 15 },
          { x: new Date('03-07-2018'), y: 30 },
          { x: new Date('03-15-2018'), y: 18 },
          { x: new Date('04-10-2018'), y: 32 },
          { x: new Date('04-17-2018'), y: 29 },
          { x: new Date('05-10-2018'), y: 43 },
          { x: new Date('06-01-2018'), y: 45 }
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
    const timeFormat = '%m/%d';
    // passing tick values is optional. If you do not pass them the line chart will render them for you based on D3 standard
    // This is a optional prop for more control
    const tickValues: Date[] = [
      new Date('01-01-2018'),
      new Date('02-01-2018'),
      new Date('03-01-2018'),
      new Date('04-01-2018'),
      new Date('05-01-2018'),
      new Date('06-01-2018')
    ];
    return (
      <div className={mergeStyles(rootStyle)}>
        <LineChart data={data} strokeWidth={4} tickFormat={timeFormat} tickValues={tickValues} />
      </div>
    );
  }
}

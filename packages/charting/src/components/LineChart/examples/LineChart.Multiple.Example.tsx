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

  private _onLegendClickHandler = (selectedLegend: string | null): void => {
    if (selectedLegend !== null) {
      console.log(`Selected legend - ${selectedLegend}`);
    }
  };

  private _styledExample(): JSX.Element {
    const points: ILineChartPoints[] = [
      {
        data: [
          { x: new Date('2018/01/01'), y: 10 },
          { x: new Date('2018/01/15'), y: 18 },
          { x: new Date('2018/01/28'), y: 24 },
          { x: new Date('2018/02/01'), y: 25 },
          { x: new Date('2018/03/01'), y: 15 },
          { x: new Date('2018/03/15'), y: 30 },
          { x: new Date('2018/03/28'), y: 18 },
          { x: new Date('2018/04/04'), y: 32 },
          { x: new Date('2018/04/15'), y: 29 },
          { x: new Date('2018/05/05'), y: 43 },
          { x: new Date('2018/06/01'), y: 45 }
        ],
        legend: 'First',
        color: DefaultPalette.blue,
        onLegendClick: this._onLegendClickHandler
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 10 },
          { x: new Date('2018/01/07'), y: 18 },
          { x: new Date('2018/01/15'), y: 24 },
          { x: new Date('2018/02/01'), y: 25 },
          { x: new Date('2018/03/10'), y: 15 },
          { x: new Date('2018/03/15'), y: 30 },
          { x: new Date('2018/03/20'), y: 18 },
          { x: new Date('2018/04/10'), y: 32 },
          { x: new Date('2018/04/20'), y: 29 },
          { x: new Date('2018/05/16'), y: 43 },
          { x: new Date('2018/06/01'), y: 45 }
        ],
        legend: 'Second',
        color: DefaultPalette.green,
        onLegendClick: this._onLegendClickHandler
      },
      {
        data: [
          { x: new Date('2018/01/06'), y: 10 },
          { x: new Date('2018/01/18'), y: 18 },
          { x: new Date('2018/01/25'), y: 24 },
          { x: new Date('2018/02/10'), y: 25 },
          { x: new Date('2018/03/03'), y: 15 },
          { x: new Date('2018/03/07'), y: 30 },
          { x: new Date('2018/03/15'), y: 18 },
          { x: new Date('2018/04/10'), y: 32 },
          { x: new Date('2018/04/17'), y: 29 },
          { x: new Date('2018/05/10'), y: 43 },
          { x: new Date('2018/06/01'), y: 45 }
        ],
        legend: 'Third',
        color: DefaultPalette.red,
        onLegendClick: this._onLegendClickHandler
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
        <LineChart data={data} strokeWidth={4} tickFormat={timeFormat} tickValues={tickValues} enabledLegendsWrapLines={true} />
      </div>
    );
  }
}

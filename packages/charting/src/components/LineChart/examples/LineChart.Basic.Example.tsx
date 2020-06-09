import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import * as d3 from 'd3-format';

interface IRootStyles {
  height: string;
  width: string;
}

interface ILineChartBasicState {
  width: number;
  height: number;
}

export class LineChartBasicExample extends React.Component<{}, ILineChartBasicState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _basicExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: [
        {
          legend: 'From_Legacy_to_O365',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 217000,
              onDataPointClick: () => alert('click on 217000'),
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 248000,
              onDataPointClick: () => alert('click on 248000'),
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 252000,
              onDataPointClick: () => alert('click on 252000'),
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 274000,
              onDataPointClick: () => alert('click on 274000'),
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 260000,
              onDataPointClick: () => alert('click on 260000'),
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300000,
              onDataPointClick: () => alert('click on 300000'),
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 218000,
              onDataPointClick: () => alert('click on 218000'),
            },
          ],
          color: DefaultPalette.blue,
          onLineClick: () => console.log('From_Legacy_to_O365'),
        },
        {
          legend: 'All',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 297000,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 284000,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 282000,
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 294000,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 224000,
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300000,
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 298000,
            },
          ],
          color: DefaultPalette.green,
        },
      ],
    };
    const rootStyle: IRootStyles = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <div className={mergeStyles(rootStyle)}>
          <LineChart
            data={data}
            legendsOverflowText={'Overflow Items'}
            yMinValue={200}
            yMaxValue={301}
            yAxisTickFormat={d3.format('$,')}
            height={this.state.height}
            width={this.state.width}
          />
        </div>
      </>
    );
  }
}

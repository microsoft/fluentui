import * as React from 'react';
import {
  IChartProps,
  ILineChartPoints,
  ILineChartProps,
  LineChart,
  ChartHoverCard,
  ICustomizedCalloutData,
} from '@uifabric/charting';
import { DefaultPalette } from '@uifabric/styling';

interface IStyledLineChartExampleState {
  width: number;
  height: number;
}

export class LineChartStyledExample extends React.Component<{}, IStyledLineChartExampleState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
    };
  }

  public render(): JSX.Element {
    return <div>{this._styledExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _styledExample(): JSX.Element {
    const points: ILineChartPoints[] = [
      {
        data: [
          { x: new Date('2018/01/06'), y: 10 },
          { x: new Date('2018/01/16'), y: 18 },
          { x: new Date('2018/01/20'), y: 24 },
          { x: new Date('2018/01/24'), y: 35 },
          { x: new Date('2018/01/26'), y: 35 },
          { x: new Date('2018/01/29'), y: 90 },
        ],
        legend: 'Week',
        color: DefaultPalette.blue,
      },
    ];

    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: points,
    };
    const rootStyle = {
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
    };
    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <div style={rootStyle}>
          <LineChart
            data={data}
            strokeWidth={4}
            yMaxValue={90}
            hideLegend={true}
            height={this.state.height}
            width={this.state.width}
            // eslint-disable-next-line react/jsx-no-bind
            onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
              props ? (
                <ChartHoverCard
                  XValue={'Custom XVal'}
                  Legend={'Custom Legend'}
                  YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                  color={'red'}
                />
              ) : null
            }
          />
        </div>
      </>
    );
  }
}

import * as React from 'react';
import { ChartHoverCard, VerticalBarChart, IVerticalBarChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

interface IVerticalChartState {
  width: number;
  height: number;
}
export class VerticalBarChartBasicExample extends React.Component<IVerticalBarChartProps, IVerticalChartState> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 650,
      height: 350,
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
    const points = [
      {
        x: 0,
        y: 10000,
        legend: 'First',
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '10%',
      },
      {
        x: 10000,
        y: 50000,
        legend: 'Second',
        color: DefaultPalette.blueDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '20%',
      },
      {
        x: 25000,
        y: 30000,
        legend: 'Third',
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '37%',
      },

      {
        x: 40000,
        y: 13000,
        legend: 'seventh',
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '88%',
      },
      {
        x: 52000,
        y: 43000,
        legend: 'Eighith',
        color: DefaultPalette.blue,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '71%',
      },
      {
        x: 68000,
        y: 30000,
        legend: 'Nighth',
        color: DefaultPalette.blueDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '40%',
      },
      {
        x: 80000,
        y: 20000,
        legend: 'Fourth',
        color: DefaultPalette.blue,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '87%',
      },
      {
        x: 92000,
        y: 45000,
        legend: 'tenth',
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
      },
    ];
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <div style={rootStyle}>
          <VerticalBarChart
            data={points}
            width={this.state.width}
            height={this.state.height}
            chartLabel={'Basic Chart with Numeric Axes'}
            // eslint-disable-next-line react/jsx-no-bind
            onRenderCalloutPerDataPoint={props =>
              props ? (
                <ChartHoverCard
                  XValue={props.xAxisCalloutData}
                  Legend={props.legend}
                  YValue={props.yAxisCalloutData || props.x}
                  color={props.color}
                />
              ) : null
            }
          />
        </div>
      </>
    );
  }
}

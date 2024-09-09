import * as React from 'react';
import {
  IChartProps,
  ILineChartPoints,
  ILineChartProps,
  LineChart,
  ChartHoverCard,
  ICustomizedCalloutData,
  DataVizPalette,
} from '@fluentui/react-charting';

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
          { x: new Date('2018/01/06'), y: 10, xAxisCalloutData: 'Appointment 1' },
          { x: new Date('2018/01/16'), y: 18, xAxisCalloutData: 'Appointment 2' },
          { x: new Date('2018/01/20'), y: 24, xAxisCalloutData: 'Appointment 3' },
          { x: new Date('2018/01/24'), y: 35, xAxisCalloutData: 'Appointment 4' },
          { x: new Date('2018/01/26'), y: 35, xAxisCalloutData: 'Appointment 5' },
          { x: new Date('2018/01/29'), y: 90, xAxisCalloutData: 'Appointment 6' },
        ],
        legend: 'first legend',
        lineOptions: {
          lineBorderWidth: '4',
        },
        color: DataVizPalette.color10,
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
        <label htmlFor="changeWidth_Styled">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Styled"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Styled">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Styled"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <div style={rootStyle}>
          <LineChart
            data={data}
            strokeWidth={4}
            yMaxValue={90}
            showXAxisLablesTooltip
            height={this.state.height}
            width={this.state.width}
            tickFormat={'%m/%d'}
            tickValues={[new Date('2018-01-01'), new Date('2018-02-09')]}
            // eslint-disable-next-line react/jsx-no-bind
            onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
              props ? (
                <ChartHoverCard
                  XValue={`${props.values[0].xAxisCalloutData}`}
                  Legend={'Custom Legend'}
                  YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                  color={'red'}
                />
              ) : null
            }
            enablePerfOptimization={true}
            legendProps={{
              styles: {
                legend: {
                  textTransform: 'none',
                },
              },
            }}
            useUTC={false}
          />
        </div>
      </>
    );
  }
}

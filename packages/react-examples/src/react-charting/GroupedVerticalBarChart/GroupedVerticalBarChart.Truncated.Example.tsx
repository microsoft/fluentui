import * as React from 'react';
import {
  ChartHoverCard,
  GroupedVerticalBarChart,
  IGroupedVerticalBarChartProps,
  IGVBarChartSeriesPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';

interface IGroupedBarChartState {
  width: number;
  height: number;
}

export class GroupedVerticalBarChartTruncatedExample extends React.Component<{}, IGroupedBarChartState> {
  constructor(props: IGroupedVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 400,
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
    const data = [
      {
        name: 'Data (Text that exceeds the maximum number of characters is truncated)',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color8),
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 44000,
            color: getColorFromToken(DataVizPalette.color9),
            legend: 'MetaData2',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '44%',
          },
        ],
      },
      {
        name: 'Data',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color8),
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 3000,
            color: getColorFromToken(DataVizPalette.color9),
            legend: 'MetaData2',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '3%',
          },
        ],
      },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    return (
      <>
        <label htmlFor="changeWidth_Truncated">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Truncated"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Truncated">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Truncated"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <div style={rootStyle}>
          <GroupedVerticalBarChart
            chartTitle="Grouped Vertical Bar chart truncated example"
            data={data}
            height={this.state.height}
            width={this.state.width}
            showYAxisGridLines
            showXAxisLablesTooltip
            noOfCharsToTruncate={6}
            // eslint-disable-next-line react/jsx-no-bind
            onRenderCalloutPerDataPoint={(props: IGVBarChartSeriesPoint) =>
              props ? (
                <ChartHoverCard
                  XValue={props.xAxisCalloutData}
                  Legend={'Custom legend'}
                  YValue={`${props.data} h`}
                  color={'red'}
                />
              ) : null
            }
            enableReflow={true}
          />
        </div>
      </>
    );
  }
}

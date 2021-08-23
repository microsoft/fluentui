import * as React from 'react';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import {
  GroupedVerticalBarChart,
  IGroupedVerticalBarChartProps,
  IGroupedVerticalBarChartData,
} from '@fluentui/react-charting';
interface IGroupedBarChartState {
  width: number;
  height: number;
}

export class GroupedVerticalBarChartCustomAccessibilityExample extends React.Component<{}, IGroupedBarChartState> {
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
    const data: IGroupedVerticalBarChartData[] = [
      {
        name: 'Metadata info multi lines text Completed',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
            callOutAccessibilityData: {
              ariaLabel: 'Group series 1 of 4, Bar series 1 of 2 2020/04/30 33%',
            },
          },
          {
            key: 'series2',
            data: 44000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '44%',
            callOutAccessibilityData: {
              ariaLabel: 'Bar series 2 of 2 2020/04/30 44%',
            },
          },
        ],
      },
      {
        name: 'Meta Data2',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
            callOutAccessibilityData: {
              ariaLabel: 'Group series 2 of 4, Bar series 1 of 2 2020/04/30 33%',
            },
          },
          {
            key: 'series2',
            data: 3000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Bar series 2 of 2 2020/04/30 3%',
            },
          },
        ],
      },

      {
        name: 'Single line text ',
        series: [
          {
            key: 'series1',
            data: 14000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '14%',
            callOutAccessibilityData: {
              ariaLabel: 'Group series 3 of 4, Bar series 1 of 2 2020/04/30 14%',
            },
          },
          {
            key: 'series2',
            data: 50000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '50%',
            callOutAccessibilityData: {
              ariaLabel: 'Bar series 2 of 2 2020/04/30 50%',
            },
          },
        ],
      },
      {
        name: 'Hello World!!!',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
            callOutAccessibilityData: {
              ariaLabel: 'Group series 4 of 4, Bar series 1 of 2 2020/04/30 33%',
            },
          },
          {
            key: 'series2',
            data: 3000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Bar series 2 of 2 2020/04/30 3%',
            },
          },
        ],
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
          <GroupedVerticalBarChart
            chartTitle="Grouped Vertical Bar chart custom accessibility example"
            data={data}
            height={this.state.height}
            width={this.state.width}
            showYAxisGridLines
            wrapXAxisLables
          />
        </div>
      </>
    );
  }
}

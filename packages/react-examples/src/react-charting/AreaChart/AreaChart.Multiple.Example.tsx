import * as React from 'react';
import { AreaChart } from '@fluentui/react-charting';
import * as d3 from 'd3-format';
import { ILineChartProps } from '@fluentui/react-charting';

interface IAreaChartBasicState {
  width: number;
  height: number;
}

export class AreaChartMultipleExample extends React.Component<{}, IAreaChartBasicState> {
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
    const chart1Points = [
      {
        x: 20,
        y: 9,
        yAxisCalloutData: { 'Subcount1-1': 2, 'Subcount1-2': 3, 'Subcount1-3': 4 },
      },
      {
        x: 25,
        y: 14,
        yAxisCalloutData: { 'Subcount1-1': 3, 'Subcount1-2': 5, 'Subcount1-3': 6 },
      },
      {
        x: 30,
        y: 14,
        yAxisCalloutData: { 'Subcount1-1': 3, 'Subcount1-2': 5, 'Subcount1-3': 6 },
      },
      {
        x: 35,
        y: 23,
        yAxisCalloutData: { 'Subcount1-1': 6, 'Subcount1-2': 8, 'Subcount1-3': 9 },
      },
      {
        x: 40,
        y: 20,
        yAxisCalloutData: { 'Subcount1-1': 5, 'Subcount1-2': 7, 'Subcount1-3': 8 },
      },
      {
        x: 45,
        y: 31,
        yAxisCalloutData: { 'Subcount1-1': 9, 'Subcount1-2': 10, 'Subcount1-3': 12 },
      },
      {
        x: 50,
        y: 29,
        yAxisCalloutData: { 'Subcount1-1': 8, 'Subcount1-2': 10, 'Subcount1-3': 11 },
      },
      {
        x: 55,
        y: 27,
        yAxisCalloutData: { 'Subcount1-1': 8, 'Subcount1-2': 9, 'Subcount1-3': 10 },
      },
      {
        x: 60,
        y: 37,
        yAxisCalloutData: { 'Subcount1-1': 11, 'Subcount1-2': 12, 'Subcount1-3': 14 },
      },
      {
        x: 65,
        y: 51,
        yAxisCalloutData: { 'Subcount1-1': 16, 'Subcount1-2': 17, 'Subcount1-3': 18 },
      },
    ];

    const chart2Points = [
      {
        x: 20,
        y: 21,
        yAxisCalloutData: { 'Subcount2-1': 6, 'Subcount2-2': 7, 'Subcount2-3': 8 },
      },
      {
        x: 25,
        y: 25,
        yAxisCalloutData: { 'Subcount2-1': 7, 'Subcount2-2': 8, 'Subcount2-3': 10 },
      },
      {
        x: 30,
        y: 10,
        yAxisCalloutData: { 'Subcount2-1': 2, 'Subcount2-2': 3, 'Subcount2-3': 5 },
      },
      {
        x: 35,
        y: 10,
        yAxisCalloutData: { 'Subcount2-1': 2, 'Subcount2-2': 3, 'Subcount2-3': 5 },
      },
      {
        x: 40,
        y: 14,
        yAxisCalloutData: { 'Subcount2-1': 3, 'Subcount2-2': 5, 'Subcount2-3': 6 },
      },
      {
        x: 45,
        y: 18,
        yAxisCalloutData: { 'Subcount2-1': 5, 'Subcount2-2': 6, 'Subcount2-3': 7 },
      },
      {
        x: 50,
        y: 9,
        yAxisCalloutData: { 'Subcount2-1': 2, 'Subcount2-2': 3, 'Subcount2-3': 4 },
      },
      {
        x: 55,
        y: 23,
        yAxisCalloutData: { 'Subcount2-1': 6, 'Subcount2-2': 8, 'Subcount2-3': 9 },
      },
      {
        x: 60,
        y: 7,
        yAxisCalloutData: { 'Subcount2-1': 1, 'Subcount2-2': 2, 'Subcount2-3': 4 },
      },
      {
        x: 65,
        y: 55,
        yAxisCalloutData: { 'Subcount2-1': 17, 'Subcount2-2': 18, 'Subcount2-3': 20 },
      },
    ];

    const chart3Points = [
      {
        x: 20,
        y: 30,
        yAxisCalloutData: { 'Subcount3-1': 9, 'Subcount3-2': 10, 'Subcount3-3': 11 },
      },
      {
        x: 25,
        y: 35,
        yAxisCalloutData: { 'Subcount3-1': 10, 'Subcount3-2': 12, 'Subcount3-3': 13 },
      },
      {
        x: 30,
        y: 33,
        yAxisCalloutData: { 'Subcount3-1': 10, 'Subcount3-2': 11, 'Subcount3-3': 12 },
      },
      {
        x: 35,
        y: 40,
        yAxisCalloutData: { 'Subcount3-1': 12, 'Subcount3-2': 13, 'Subcount3-3': 15 },
      },
      {
        x: 40,
        y: 10,
        yAxisCalloutData: { 'Subcount3-1': 2, 'Subcount3-2': 3, 'Subcount3-3': 5 },
      },
      {
        x: 45,
        y: 40,
        yAxisCalloutData: { 'Subcount3-1': 12, 'Subcount3-2': 13, 'Subcount3-3': 15 },
      },
      {
        x: 50,
        y: 34,
        yAxisCalloutData: { 'Subcount3-1': 10, 'Subcount3-2': 11, 'Subcount3-3': 13 },
      },
      {
        x: 55,
        y: 40,
        yAxisCalloutData: { ['Subcount3-1']: 12, 'Subcount3-2': 13, 'Subcount3-3': 15 },
      },
      {
        x: 60,
        y: 60,
        yAxisCalloutData: { 'Subcount3-1': 19, 'Subcount3-2': 20, 'Subcount3-3': 21 },
      },
      {
        x: 65,
        y: 40,
        yAxisCalloutData: { 'Subcount3-1': 12, 'Subcount3-2': 13, 'Subcount3-3': 15 },
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
      },
      {
        legend: 'legend2',
        data: chart2Points,
      },
      {
        legend: 'legend3',
        data: chart3Points,
      },
    ];

    const chartData = {
      chartTitle: 'Area chart multiple example',
      lineChartData: chartPoints,
    };
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_Multiple">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Multiple"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthslider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Multiple">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Multiple"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <div style={rootStyle}>
          <AreaChart
            height={this.state.height}
            width={this.state.width}
            data={chartData}
            legendsOverflowText={'Overflow Items'}
            yAxisTickFormat={d3.format('$,')}
            enablePerfOptimization={true}
            legendProps={{
              allowFocusOnLegends: true,
            }}
          />
        </div>
      </>
    );
  }
}

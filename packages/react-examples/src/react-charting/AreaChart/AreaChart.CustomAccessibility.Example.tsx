import * as React from 'react';
import { AreaChart } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import * as d3 from 'd3-format';
import { ILineChartProps } from '@fluentui/react-charting';

interface IAreaChartCustomAccessibilityState {
  width: number;
  height: number;
}

export class AreaChartCustomAccessibilityExample extends React.Component<{}, IAreaChartCustomAccessibilityState> {
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
        xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 20' },
        callOutAccessibilityData: { ariaLabel: 'Line series 1 of 5 Point 1 First 9' },
      },
      {
        x: 40,
        y: 20,
        xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 40' },
        callOutAccessibilityData: { ariaLabel: 'Line series 2 of 5 Point 1 First 20' },
      },
      {
        x: 55,
        y: 27,
        xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 55' },
        callOutAccessibilityData: { ariaLabel: 'Line series 3 of 5 Point 1 First 27' },
      },
      {
        x: 60,
        y: 37,
        xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 60' },
        callOutAccessibilityData: { ariaLabel: 'Line series 4 of 5 Point 1 First 37' },
      },
      {
        x: 65,
        y: 51,
        xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 65' },
        callOutAccessibilityData: { ariaLabel: 'Line series 5 of 5 Point 1 First 51' },
      },
    ];

    const chart2Points = [
      {
        x: 20,
        y: 21,
        callOutAccessibilityData: { ariaLabel: 'Point 2 Second 21' },
      },
      {
        x: 40,
        y: 25,
        callOutAccessibilityData: { ariaLabel: 'Point 2 Second 25' },
      },
      {
        x: 55,
        y: 23,
        callOutAccessibilityData: { ariaLabel: 'Point 2 Second 23' },
      },
      {
        x: 60,
        y: 7,
        callOutAccessibilityData: { ariaLabel: 'Point 2 Second 7' },
      },
      {
        x: 65,
        y: 55,
        callOutAccessibilityData: { ariaLabel: 'Point 2 Second 55' },
      },
    ];

    const chart3Points = [
      {
        x: 20,
        y: 30,
        callOutAccessibilityData: { ariaLabel: 'Point 3 Third 30' },
      },
      {
        x: 40,
        y: 35,
        callOutAccessibilityData: { ariaLabel: 'Point 3 Third 35' },
      },
      {
        x: 55,
        y: 33,
        callOutAccessibilityData: { ariaLabel: 'Point 3 Third 33' },
      },
      {
        x: 60,
        y: 40,
        callOutAccessibilityData: { ariaLabel: 'Point 3 Third 40' },
      },
      {
        x: 65,
        y: 10,
        callOutAccessibilityData: { ariaLabel: 'Point 3 Third 10' },
      },
    ];

    const chartPoints = [
      {
        legend: 'First',
        data: chart1Points,
        color: DefaultPalette.accent,
      },
      {
        legend: 'Second',
        data: chart2Points,
        color: DefaultPalette.blueLight,
      },
      {
        legend: 'Third',
        data: chart3Points,
        color: DefaultPalette.blueDark,
      },
    ];

    const chartData = {
      chartTitle: 'Area chart Custom Accessibility example',
      lineChartData: chartPoints,
    };
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_Custom">change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Custom"
          onChange={this._onWidthChange}
        />
        <label htmlFor="changeHeight_Custom">change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Custom"
          onChange={this._onHeightChange}
        />
        <div style={rootStyle}>
          <AreaChart
            height={this.state.height}
            width={this.state.width}
            data={chartData}
            legendsOverflowText={'Overflow Items'}
            yAxisTickFormat={d3.format('$,')}
            legendProps={{
              allowFocusOnLegends: true,
            }}
          />
        </div>
      </>
    );
  }
}

import * as React from 'react';
import { AreaChart } from '@fluentui/react-charting';
import { IAreaChartProps } from '@fluentui/react-charting';

interface IAreaChartNegativeValuesState {
  width: number;
  height: number;
}

export class AreaChartNegativeValuesExample extends React.Component<{}, IAreaChartNegativeValuesState> {
  constructor(props: IAreaChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
    };
  }

  public render(): JSX.Element {
    return <div>{this._negativeValuesExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _negativeValuesExample(): JSX.Element {
    const chart1Points = [
      {
        x: 20,
        y: -17000,
      },
      {
        x: 25,
        y: 9000,
      },
      {
        x: 30,
        y: 13000,
      },
      {
        x: 35,
        y: 15000,
      },
      {
        x: 40,
        y: -11000,
      },
      {
        x: 45,
        y: -8760,
      },
      {
        x: 50,
        y: 3500,
      },
      {
        x: 55,
        y: 25000,
      },
      {
        x: 60,
        y: 17000,
      },
      {
        x: 65,
        y: 1000,
      },
      {
        x: 70,
        y: -12000,
      },
      {
        x: 75,
        y: -6876,
      },
      {
        x: 80,
        y: 12000,
      },
      {
        x: 85,
        y: 7000,
      },
      {
        x: 90,
        y: 10000,
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
      },
    ];

    const chartData = {
      chartTitle: 'Area chart Negative Values example',
      lineChartData: chartPoints,
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_NegativeValues">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_NegativeValues"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_NegativeValues">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_NegativeValues"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />

        <div style={rootStyle}>
          <AreaChart
            culture={window.navigator.language}
            height={this.state.height}
            width={this.state.width}
            data={chartData}
            enablePerfOptimization={true}
            enableReflow={true}
            //Future prop addition to enable negative value support by optional flag
            supportNegativeValues
          />
        </div>
      </>
    );
  }
}

import * as React from 'react';
import { AreaChart } from '@fluentui/react-charting';
import * as d3 from 'd3-format';
import { ILineChartProps, DataVizPalette } from '@fluentui/react-charting';

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
    return <div className="containerDiv">{this._basicExample()}</div>;
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
      },
      {
        x: 25,
        y: 14,
      },
      {
        x: 30,
        y: 14,
      },
      {
        x: 35,
        y: 23,
      },
      {
        x: 40,
        y: 20,
      },
      {
        x: 45,
        y: 31,
      },
      {
        x: 50,
        y: 29,
      },
      {
        x: 55,
        y: 27,
      },
      {
        x: 60,
        y: 37,
      },
      {
        x: 65,
        y: 51,
      },
    ];

    const chart2Points = [
      {
        x: 20,
        y: 21,
      },
      {
        x: 25,
        y: 25,
      },
      {
        x: 30,
        y: 10,
      },
      {
        x: 35,
        y: 10,
      },
      {
        x: 40,
        y: 14,
      },
      {
        x: 45,
        y: 18,
      },
      {
        x: 50,
        y: 9,
      },
      {
        x: 55,
        y: 23,
      },
      {
        x: 60,
        y: 7,
      },
      {
        x: 65,
        y: 55,
      },
    ];

    const chart3Points = [
      {
        x: 20,
        y: 30,
      },
      {
        x: 25,
        y: 35,
      },
      {
        x: 30,
        y: 33,
      },
      {
        x: 35,
        y: 40,
      },
      {
        x: 40,
        y: 10,
      },
      {
        x: 45,
        y: 40,
      },
      {
        x: 50,
        y: 34,
      },
      {
        x: 55,
        y: 40,
      },
      {
        x: 60,
        y: 60,
      },
      {
        x: 65,
        y: 40,
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
        color: DataVizPalette.color4,
      },
      {
        legend: 'legend2',
        data: chart2Points,
        color: DataVizPalette.color5,
      },
      {
        legend: 'legend3',
        data: chart3Points,
        color: DataVizPalette.color6,
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
            enableReflow={true}
          />
        </div>
      </>
    );
  }
}

import * as React from 'react';
import {
  AreaChart,
  IAreaChartProps,
  IChartProps,
  ILineChartDataPoint,
  ILineChartPoints,
} from '@fluentui/react-charting';
import { getId } from '@fluentui/react';

const chart1Points: ILineChartDataPoint[] = [
  {
    x: 20,
    y: 7000,
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
    y: 11000,
  },
  {
    x: 45,
    y: 8760,
  },
  {
    x: 50,
    y: 3500,
  },
  {
    x: 55,
    y: 20000,
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
    y: 12000,
  },
  {
    x: 75,
    y: 6876,
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

const chart2Points: ILineChartDataPoint[] = chart1Points.map((point, index) => {
  return {
    x: point.x,
    y: point.y + Math.floor(Math.random() * 10000),
  };
});

const chartPoints: ILineChartPoints[] = [
  {
    legend: 'legend1',
    data: chart1Points,
  },
  {
    legend: 'legend2',
    data: chart2Points,
    useSecondaryYScale: true,
  },
];

const chartData: IChartProps = {
  chartTitle: 'Area chart secondary y-axis example',
  lineChartData: chartPoints,
};

interface IAreaChartState {
  width: number;
  height: number;
}

export class AreaChartSecondaryYAxisExample extends React.Component<{}, IAreaChartState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');

  constructor(props: IAreaChartProps) {
    super(props);

    this.state = {
      width: 700,
      height: 300,
    };
  }

  public render(): JSX.Element {
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <div className="containerDiv">
        <label htmlFor={this._widthSliderId}>Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id={this._widthSliderId}
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor={this._heightSliderId}>Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id={this._heightSliderId}
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <div style={rootStyle}>
          <AreaChart
            height={this.state.height}
            width={this.state.width}
            data={chartData}
            enablePerfOptimization={true}
            hideTickOverlap={true}
            yAxisTitle="Variation of stock market prices"
            xAxisTitle="Number of days"
            secondaryYAxistitle="Variation of stock market prices 2"
            secondaryYScaleOptions={{}}
          />
        </div>
      </div>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
}

import * as React from 'react';
import {
  VerticalBarChart,
  IVerticalBarChartProps,
  IVerticalBarChartDataPoint,
  ILineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { getId } from '@fluentui/react';

const points: IVerticalBarChartDataPoint[] = [
  {
    x: 0,
    y: 10000,
    legend: 'Oranges',
    color: getColorFromToken(DataVizPalette.color1),
    lineData: {
      y: 7000,
      useSecondaryYScale: true,
    },
  },
  {
    x: 10000,
    y: 50000,
    legend: 'Dogs',
    color: getColorFromToken(DataVizPalette.color2),
    lineData: {
      y: 30000,
      useSecondaryYScale: true,
    },
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: getColorFromToken(DataVizPalette.color3),
    lineData: {
      y: 3000,
      useSecondaryYScale: true,
    },
  },
  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: getColorFromToken(DataVizPalette.color6),
  },
  {
    x: 52000,
    y: 43000,
    legend: 'Giraffes',
    color: getColorFromToken(DataVizPalette.color11),
    lineData: {
      y: 30000,
      useSecondaryYScale: true,
    },
  },
  {
    x: 68000,
    y: 30000,
    legend: 'Cats',
    color: getColorFromToken(DataVizPalette.color4),
    lineData: {
      y: 5000,
      useSecondaryYScale: true,
    },
  },
  {
    x: 80000,
    y: 20000,
    legend: 'Elephants',
    color: getColorFromToken(DataVizPalette.color11),
    lineData: {
      y: 16000,
      useSecondaryYScale: true,
    },
  },
  {
    x: 92000,
    y: 45000,
    legend: 'Monkeys',
    color: getColorFromToken(DataVizPalette.color6),
    lineData: {
      y: 40000,
      useSecondaryYScale: true,
    },
  },
];

interface IVerticalChartState {
  width: number;
  height: number;
}

export class VerticalBarChartSecondaryYAxisExample extends React.Component<
  IVerticalBarChartProps,
  IVerticalChartState
> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');

  constructor(props: IVerticalBarChartProps) {
    super(props);

    this.state = {
      width: 650,
      height: 350,
    };
  }

  public render(): JSX.Element {
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

    return (
      <div className="containerDiv">
        <label htmlFor={this._widthSliderId}>Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          onChange={this._onWidthChange}
          id={this._widthSliderId}
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
          <VerticalBarChart
            chartTitle="Vertical bar chart secondary y-axis example "
            data={points}
            width={this.state.width}
            height={this.state.height}
            lineLegendText="just line"
            lineLegendColor="brown"
            lineOptions={lineOptions}
            hideTickOverlap={true}
            yAxisTitle="Values of each category"
            xAxisTitle="Different categories of animals and fruits"
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

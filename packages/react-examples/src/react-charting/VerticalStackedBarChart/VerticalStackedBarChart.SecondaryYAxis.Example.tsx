import * as React from 'react';
import {
  IVSChartDataPoint,
  IVerticalStackedChartProps,
  VerticalStackedBarChart,
  ILineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { getId } from '@fluentui/react';

const firstChartPoints: IVSChartDataPoint[] = [
  {
    legend: 'Electronics',
    data: 120,
    color: getColorFromToken(DataVizPalette.color1),
  },
  {
    legend: 'Furniture',
    data: 80,
    color: getColorFromToken(DataVizPalette.color2),
  },
  {
    legend: 'Clothing',
    data: 150,
    color: getColorFromToken(DataVizPalette.color3),
  },
  {
    legend: 'Groceries',
    data: 200,
    color: getColorFromToken(DataVizPalette.color4),
  },
  {
    legend: 'Toys',
    data: 90,
    color: getColorFromToken(DataVizPalette.color5),
  },
];

const secondChartPoints: IVSChartDataPoint[] = [
  {
    legend: 'Electronics',
    data: 140,
    color: getColorFromToken(DataVizPalette.color1),
  },
  {
    legend: 'Furniture',
    data: 100,
    color: getColorFromToken(DataVizPalette.color2),
  },
  {
    legend: 'Clothing',
    data: 130,
    color: getColorFromToken(DataVizPalette.color3),
  },
  {
    legend: 'Groceries',
    data: 220,
    color: getColorFromToken(DataVizPalette.color4),
  },
  {
    legend: 'Toys',
    data: 110,
    color: getColorFromToken(DataVizPalette.color5),
  },
];

const thirdChartPoints: IVSChartDataPoint[] = [
  {
    legend: 'Electronics',
    data: 160,
    color: getColorFromToken(DataVizPalette.color1),
  },
  {
    legend: 'Furniture',
    data: 120,
    color: getColorFromToken(DataVizPalette.color2),
  },
  {
    legend: 'Clothing',
    data: 140,
    color: getColorFromToken(DataVizPalette.color3),
  },
  {
    legend: 'Groceries',
    data: 250,
    color: getColorFromToken(DataVizPalette.color4),
  },
  {
    legend: 'Toys',
    data: 100,
    color: getColorFromToken(DataVizPalette.color5),
  },
];

const fourthChartPoints: IVSChartDataPoint[] = [
  {
    legend: 'Electronics',
    data: 180,
    color: getColorFromToken(DataVizPalette.color1),
  },
  {
    legend: 'Furniture',
    data: 140,
    color: getColorFromToken(DataVizPalette.color2),
  },
  {
    legend: 'Clothing',
    data: 160,
    color: getColorFromToken(DataVizPalette.color3),
  },
  {
    legend: 'Groceries',
    data: 300,
    color: getColorFromToken(DataVizPalette.color4),
  },
  {
    legend: 'Toys',
    data: 120,
    color: getColorFromToken(DataVizPalette.color5),
  },
];

const data: IVerticalStackedChartProps[] = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 0,
    lineData: [
      {
        y: 150,
        legend: 'Sales Target',
        color: getColorFromToken(DataVizPalette.color9),
        useSecondaryYScale: true,
      },
    ],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: 20,
    lineData: [
      {
        y: 180,
        legend: 'Sales Target',
        color: getColorFromToken(DataVizPalette.color9),
        useSecondaryYScale: true,
      },
    ],
  },
  {
    chartData: thirdChartPoints,
    xAxisPoint: 40,
    lineData: [
      {
        y: 200,
        legend: 'Sales Target',
        color: getColorFromToken(DataVizPalette.color9),
        useSecondaryYScale: true,
      },
    ],
  },
  {
    chartData: fourthChartPoints,
    xAxisPoint: 60,
    lineData: [
      {
        y: 250,
        legend: 'Sales Target',
        color: getColorFromToken(DataVizPalette.color9),
        useSecondaryYScale: true,
      },
    ],
  },
];

interface IVerticalStackedBarState {
  width: number;
  height: number;
  barGapMax: number;
}

export class VerticalStackedBarChartSecondaryYAxisExample extends React.Component<{}, IVerticalStackedBarState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');

  constructor(props: IVerticalStackedChartProps) {
    super(props);

    this.state = {
      width: 650,
      height: 350,
      barGapMax: 2,
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
          <VerticalStackedBarChart
            chartTitle="Vertical stacked bar chart secondary y-axis example"
            data={data}
            height={this.state.height}
            width={this.state.width}
            barGapMax={this.state.barGapMax}
            lineOptions={lineOptions}
            hideTickOverlap={true}
            yAxisTitle="Variation of number of sales"
            xAxisTitle="Number of days"
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

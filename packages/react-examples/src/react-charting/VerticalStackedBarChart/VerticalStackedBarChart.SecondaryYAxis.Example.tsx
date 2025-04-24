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
    legend: 'Metadata1',
    data: 40,
    color: getColorFromToken(DataVizPalette.color1),
  },
  {
    legend: 'Metadata2',
    data: 5,
    color: getColorFromToken(DataVizPalette.color2),
  },
  {
    legend: 'Metadata3',
    data: 20,
    color: getColorFromToken(DataVizPalette.color3),
  },
  {
    legend: 'Metadata4',
    data: 10,
    color: getColorFromToken(DataVizPalette.color4),
  },
  {
    legend: 'Metadata5',
    data: 23,
    color: getColorFromToken(DataVizPalette.color5),
  },
];

const secondChartPoints: IVSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 30,
    color: getColorFromToken(DataVizPalette.color1),
  },
  {
    legend: 'Metadata2',
    data: 20,
    color: getColorFromToken(DataVizPalette.color2),
  },
  {
    legend: 'Metadata3',
    data: 40,
    color: getColorFromToken(DataVizPalette.color3),
  },
];

const thirdChartPoints: IVSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 44,
    color: getColorFromToken(DataVizPalette.color1),
  },
  {
    legend: 'Metadata2',
    data: 28,
    color: getColorFromToken(DataVizPalette.color2),
  },
  {
    legend: 'Metadata3',
    data: 30,
    color: getColorFromToken(DataVizPalette.color3),
  },
];

const fourthChartPoints: IVSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 88,
    color: getColorFromToken(DataVizPalette.color1),
  },
  {
    legend: 'Metadata2',
    data: 22,
    color: getColorFromToken(DataVizPalette.color2),
  },
  {
    legend: 'Metadata3',
    data: 30,
    color: getColorFromToken(DataVizPalette.color3),
  },
];

const data: IVerticalStackedChartProps[] = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 0,
    lineData: [
      {
        y: 10,
        legend: 'Recommended Builds',
        color: getColorFromToken(DataVizPalette.color9),
        useSecondaryYScale: true,
      },
    ],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: 20,
  },
  {
    chartData: thirdChartPoints,
    xAxisPoint: 40,
    lineData: [
      {
        y: 20,
        legend: 'Recommended Builds',
        color: getColorFromToken(DataVizPalette.color9),
        useSecondaryYScale: true,
      },
    ],
  },
  {
    chartData: firstChartPoints,
    xAxisPoint: 60,
    lineData: [
      {
        y: 10,
        legend: 'Recommended Builds',
        color: getColorFromToken(DataVizPalette.color9),
        useSecondaryYScale: true,
      },
    ],
  },
  {
    chartData: fourthChartPoints,
    xAxisPoint: 80,
    lineData: [
      {
        y: 70,
        legend: 'Recommended Builds',
        color: getColorFromToken(DataVizPalette.color9),
        useSecondaryYScale: true,
      },
    ],
  },
  {
    chartData: firstChartPoints,
    xAxisPoint: 100,
  },
];

interface IVerticalStackedBarState {
  width: number;
  height: number;
}

export class VerticalStackedBarChartSecondaryYAxisExample extends React.Component<{}, IVerticalStackedBarState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');

  constructor(props: IVerticalStackedChartProps) {
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
            lineOptions={lineOptions}
            hideTickOverlap={true}
            yAxisTitle="Variation of number of sales"
            xAxisTitle="Number of days"
            yMaxValue={150}
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

import * as React from 'react';
import {
  GroupedVerticalBarChart,
  IGroupedVerticalBarChartProps,
  DataVizPalette,
  getColorFromToken,
  IGroupedVerticalBarChartData,
} from '@fluentui/react-charting';
import { getId } from '@fluentui/react';

const data: IGroupedVerticalBarChartData[] = [
  {
    name: 'Jan - Mar',
    series: [
      {
        key: 'series1',
        data: 24000,
        color: getColorFromToken(DataVizPalette.color6),
        legend: '2021',
      },
      {
        key: 'series2',
        data: 54000,
        color: getColorFromToken(DataVizPalette.color5),
        legend: '2022',
        useSecondaryYScale: true,
      },
    ],
  },
  {
    name: 'Apr - Jun',
    series: [
      {
        key: 'series1',
        data: 12000,
        color: getColorFromToken(DataVizPalette.color6),
        legend: '2021',
      },
      {
        key: 'series2',
        data: 9000,
        color: getColorFromToken(DataVizPalette.color5),
        legend: '2022',
        useSecondaryYScale: true,
      },
    ],
  },
  {
    name: 'Jul - Sep',
    series: [
      {
        key: 'series1',
        data: 10000,
        color: getColorFromToken(DataVizPalette.color6),
        legend: '2021',
      },
      {
        key: 'series2',
        data: 60000,
        color: getColorFromToken(DataVizPalette.color5),
        legend: '2022',
        useSecondaryYScale: true,
      },
    ],
  },
  {
    name: 'Oct - Dec',
    series: [
      {
        key: 'series1',
        data: 15000,
        color: getColorFromToken(DataVizPalette.color6),
        legend: '2021',
      },
      {
        key: 'series2',
        data: 6000,
        color: getColorFromToken(DataVizPalette.color5),
        legend: '2022',
        useSecondaryYScale: true,
      },
    ],
  },
];

interface IGroupedBarChartState {
  width: number;
  height: number;
}
export class GroupedVerticalBarChartSecondaryYAxisExample extends React.Component<{}, IGroupedBarChartState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');

  constructor(props: IGroupedVerticalBarChartProps) {
    super(props);

    this.state = {
      width: 700,
      height: 400,
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
          <GroupedVerticalBarChart
            chartTitle="Grouped Vertical Bar chart secondary y-axis example"
            data={data}
            height={this.state.height}
            width={this.state.width}
            barwidth={16}
            hideTickOverlap={true}
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

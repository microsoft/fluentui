import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart, DataVizPalette } from '@fluentui/react-charting';
import { getId } from '@fluentui/react';

const data: IChartProps = {
  chartTitle: 'Line Chart',
  lineChartData: [
    {
      legend: 'From_Legacy_to_O365',
      data: [
        {
          x: new Date('2020-03-03T00:00:00.000Z'),
          y: 216,
        },
        {
          x: new Date('2020-03-03T10:00:00.000Z'),
          y: 218,
        },
        {
          x: new Date('2020-03-03T11:00:00.000Z'),
          y: 217,
        },
        {
          x: new Date('2020-03-04T00:00:00.000Z'),
          y: 248,
        },
        {
          x: new Date('2020-03-05T00:00:00.000Z'),
          y: -252,
        },
        {
          x: new Date('2020-03-06T00:00:00.000Z'),
          y: 274,
        },
        {
          x: new Date('2020-03-07T00:00:00.000Z'),
          y: -260,
        },
        {
          x: new Date('2020-03-08T00:00:00.000Z'),
          y: 304,
        },
        {
          x: new Date('2020-03-09T00:00:00.000Z'),
          y: 218,
        },
      ],
      color: DataVizPalette.color3,
    },
    {
      legend: 'All',
      data: [
        {
          x: new Date('2020-03-03T00:00:00.000Z'),
          y: 297,
        },
        {
          x: new Date('2020-03-04T00:00:00.000Z'),
          y: 284,
        },
        {
          x: new Date('2020-03-05T00:00:00.000Z'),
          y: 282,
        },
        {
          x: new Date('2020-03-06T00:00:00.000Z'),
          y: -294,
        },
        {
          x: new Date('2020-03-07T00:00:00.000Z'),
          y: 224,
        },
        {
          x: new Date('2020-03-08T00:00:00.000Z'),
          y: -300,
        },
        {
          x: new Date('2020-03-09T00:00:00.000Z'),
          y: 298,
        },
      ],
      color: DataVizPalette.color4,
      useSecondaryYScale: true,
    },
  ],
};

interface ILineChartState {
  width: number;
  height: number;
}

export class LineChartSecondaryYAxisExample extends React.Component<{}, ILineChartState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');

  constructor(props: ILineChartProps) {
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
          <LineChart
            data={data}
            height={this.state.height}
            width={this.state.width}
            enablePerfOptimization={true}
            useUTC={true}
            enableReflow={false}
            hideTickOverlap={true}
            secondaryYScaleOptions={{}}
            supportNegativeData={true}
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

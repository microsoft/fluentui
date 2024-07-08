import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart } from '@fluentui/react-charting';

interface ILineChartNegativeValuesState {
  width: number;
  height: number;
}

export class LineChartNegativeValuesExample extends React.Component<{}, ILineChartNegativeValuesState> {
  constructor(props: ILineChartProps) {
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
    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: [
        {
          legend: 'Line1',
          data: [
            {
              x: 1,
              y: -7,
            },
            {
              x: 2,
              y: -4,
            },
            {
              x: 3,
              y: 11,
            },
            {
              x: 4,
              y: 2,
            },
            {
              x: 5,
              y: -5,
            },
            {
              x: 6,
              y: 4,
            },
            {
              x: 7,
              y: -1,
            },
          ],
          lineOptions: {
            lineBorderWidth: '4',
          },
        },
        {
          legend: 'Line2',
          data: [
            {
              x: 1,
              y: 7,
            },
            {
              x: 2,
              y: 14,
            },
            {
              x: 3,
              y: -11,
            },
            {
              x: 4,
              y: 12,
            },
            {
              x: 5,
              y: -2,
            },
            {
              x: 6,
              y: 14,
            },
            {
              x: 7,
              y: 1,
            },
          ],
          lineOptions: {
            lineBorderWidth: '4',
          },
        },
      ],
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
          <LineChart
            culture={window.navigator.language}
            data={data}
            height={this.state.height}
            width={this.state.width}
            supportNegativeValues={true}
            enablePerfOptimization={true}
          />
        </div>
      </>
    );
  }
}

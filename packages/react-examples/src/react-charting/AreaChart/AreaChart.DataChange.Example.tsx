import * as React from 'react';
import { AreaChart, IChartProps } from '@fluentui/react-charting';
import * as d3 from 'd3-format';
import { ILineChartProps } from '@fluentui/react-charting';
import { DefaultButton } from '@fluentui/react/lib/Button';

interface IAreaChartBasicState {
  width: number;
  height: number;
  dynamicData: IChartProps;
}

export class AreaChartDataChangeExample extends React.Component<{}, IAreaChartBasicState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      dynamicData: {
        chartTitle: 'Area chart with dynamic data',
        lineChartData: [
          {
            legend: 'Chart 1',
            data: [
              { x: 20, y: 10 },
              { x: 30, y: 20 },
              { x: 40, y: 40 },
            ],
          },
          {
            legend: 'Chart 2',
            data: [
              { x: 20, y: 20 },
              { x: 30, y: 30 },
              { x: 40, y: 50 },
            ],
          },
          {
            legend: 'Chart 3',
            data: [
              { x: 20, y: 25 },
              { x: 30, y: 35 },
              { x: 40, y: 55 },
            ],
          },
        ],
      },
    };
    this._changeData = this._changeData.bind(this);
    this._changeXData = this._changeXData.bind(this);
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
            data={this.state.dynamicData}
            legendsOverflowText={'Overflow Items'}
            yAxisTickFormat={d3.format('$,')}
            enablePerfOptimization={true}
            legendProps={{
              allowFocusOnLegends: true,
            }}
            enableReflow={true}
          />
          <div style={{ marginBottom: '13px' }}>
            Note: Y values in callout display individual values. Y value plotted on chart are cumulative for the
            datapoint.
          </div>
          <DefaultButton text="Change Ydata" onClick={this._changeData} />
          <DefaultButton text="Change Xdata" onClick={this._changeXData} />
        </div>
      </>
    );
  }
  private _changeData(): void {
    this.setState({
      dynamicData: {
        chartTitle: 'Area chart with dynamic data',
        lineChartData: [
          {
            legend: 'Chart 1',
            data: [
              { x: 20, y: this._randomY() },
              { x: 30, y: this._randomY() },
              { x: 40, y: this._randomY() },
            ],
          },
          {
            legend: 'Chart 2',
            data: [
              { x: 20, y: this._randomY() },
              { x: 30, y: this._randomY() },
              { x: 40, y: this._randomY() },
            ],
          },
          {
            legend: 'Chart 3',
            data: [
              { x: 20, y: this._randomY() },
              { x: 30, y: this._randomY() },
              { x: 40, y: this._randomY() },
            ],
          },
        ],
      },
    });
  }
  private _changeXData(): void {
    const xChangedValue1 = this._randomX();
    const xChangedValue2 = xChangedValue1 + 2;
    const xChangedValue3 = xChangedValue2 + 3;
    this.setState({
      dynamicData: {
        chartTitle: 'Area chart with dynamic data',
        lineChartData: [
          {
            legend: 'Chart 1',
            data: [
              { x: xChangedValue1, y: 10 },
              { x: xChangedValue2, y: 20 },
              { x: xChangedValue3, y: 40 },
            ],
          },
          {
            legend: 'Chart 2',
            data: [
              { x: xChangedValue1, y: 20 },
              { x: xChangedValue2, y: 30 },
              { x: xChangedValue3, y: 50 },
            ],
          },
          {
            legend: 'Chart 3',
            data: [
              { x: xChangedValue1, y: 25 },
              { x: xChangedValue2, y: 35 },
              { x: xChangedValue3, y: 55 },
            ],
          },
        ],
      },
    });
  }
  private _randomY(): number {
    return Math.random() * 60 + 5;
  }
  private _randomX(): number {
    const randomNumber = Math.random() * 50 + 5;
    const roundedNumber = Math.round(randomNumber);
    return roundedNumber;
  }
}

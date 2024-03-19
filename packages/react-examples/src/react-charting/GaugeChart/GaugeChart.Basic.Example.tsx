import * as React from 'react';
import { DataVizPalette, GaugeChart, GaugeChartVariant } from '@fluentui/react-charting';
import { Stack, StackItem, Checkbox } from '@fluentui/react';

interface IGCBasicExampleState {
  width: number;
  height: number;
  chartValue: number;
  hideMinMax: boolean;
}

export class GaugeChartBasicExample extends React.Component<{}, IGCBasicExampleState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      width: 252,
      height: 128,
      chartValue: 50,
      hideMinMax: false,
    };
  }

  public render(): React.ReactNode {
    return (
      <>
        <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
          <StackItem>
            <label htmlFor="width-slider">Width:</label>
            <input
              type="range"
              value={this.state.width}
              min={0}
              max={1000}
              id="width-slider"
              onChange={this._onWidthChange}
              aria-valuetext={`Width: ${this.state.width}`}
            />
            <span>{this.state.width}</span>
          </StackItem>
          <StackItem>
            <label htmlFor="height-slider">Height:</label>
            <input
              type="range"
              value={this.state.height}
              min={0}
              max={1000}
              id="height-slider"
              onChange={this._onHeightChange}
              aria-valuetext={`Height: ${this.state.height}`}
            />
            <span>{this.state.height}</span>
          </StackItem>
          <StackItem>
            <label htmlFor="value-slider">Current value:</label>
            <input
              type="range"
              value={this.state.chartValue}
              min={0}
              max={100}
              id="value-slider"
              onChange={this._onValueChange}
              aria-valuetext={`Current value: ${this.state.chartValue}`}
            />
            <span>{this.state.chartValue}</span>
          </StackItem>
        </Stack>
        <Checkbox
          label="Hide min and max values"
          checked={this.state.hideMinMax}
          onChange={this._onHideMinMaxCheckChange}
          styles={{ root: { marginTop: '20px' } }}
        />

        <GaugeChart
          width={this.state.width}
          height={this.state.height}
          segments={[
            { size: 33, color: DataVizPalette.success, legend: 'Low Risk' },
            { size: 34, color: DataVizPalette.warning, legend: 'Medium Risk' },
            { size: 33, color: DataVizPalette.error, legend: 'High Risk' },
          ]}
          chartValue={this.state.chartValue}
          hideMinMax={this.state.hideMinMax}
          variant={GaugeChartVariant.MultipleSegments}
        />
      </>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ chartValue: parseInt(e.target.value, 10) });
  };

  private _onHideMinMaxCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ hideMinMax: checked });
  };
}

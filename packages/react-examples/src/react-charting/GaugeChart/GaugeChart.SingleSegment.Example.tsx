import * as React from 'react';
import {
  DataVizPalette,
  GaugeChart,
  GaugeValueFormat,
  GaugeChartVariant,
  getGradientFromToken,
  DataVizGradientPalette,
} from '@fluentui/react-charting';
import { Stack, StackItem } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IGCSingleSegmentExampleState {
  width: number;
  height: number;
  chartValue: number;
  enableGradient: boolean;
  roundedCorners: boolean;
}

export class GaugeChartSingleSegmentExample extends React.Component<{}, IGCSingleSegmentExampleState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      width: 252,
      height: 173,
      chartValue: 50,
      enableGradient: false,
      roundedCorners: false,
    };
  }

  public render(): React.ReactNode {
    return (
      <div className="containerDiv">
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
        <div style={{ display: 'flex' }}>
          <Toggle
            label="Enable Gradient"
            onText="ON"
            offText="OFF"
            checked={this.state.enableGradient}
            onChange={this._onToggleGradient}
          />
          &nbsp;&nbsp;
          <Toggle
            label="Rounded Corners"
            onText="ON"
            offText="OFF"
            checked={this.state.roundedCorners}
            onChange={this._onToggleRoundedCorners}
          />
        </div>

        <GaugeChart
          width={this.state.width}
          height={this.state.height}
          segments={[
            { size: this.state.chartValue, legend: 'Used' },
            {
              size: 100 - this.state.chartValue,
              color: DataVizPalette.color5,
              gradient: getGradientFromToken(DataVizGradientPalette.gradient6),
              legend: 'Available',
            },
          ]}
          chartValue={this.state.chartValue}
          chartTitle="Storage capacity"
          sublabel="used"
          chartValueFormat={GaugeValueFormat.Fraction}
          variant={GaugeChartVariant.SingleSegment}
          enableGradient={this.state.enableGradient}
          roundCorners={this.state.roundedCorners}
        />
      </div>
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
  private _onToggleGradient = (e: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };
  private _onToggleRoundedCorners = (e: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundedCorners: checked });
  };
}

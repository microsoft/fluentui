import * as React from 'react';
import { DataVizPalette, getColorFromToken, FunnelChart } from '@fluentui/react-charting';
import { Stack, StackItem, Checkbox } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IGCBasicExampleState {
  width: number;
  height: number;
  chartValue: number;
  hideMinMax: boolean;
  enableGradient: boolean;
  roundedCorners: boolean;
  legendMultiSelect: boolean;
}

export class GaugeChartBasicExample extends React.Component<{}, IGCBasicExampleState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      width: 252,
      height: 128,
      chartValue: 50,
      hideMinMax: false,
      enableGradient: false,
      roundedCorners: false,
      legendMultiSelect: false,
    };
  }

  public componentDidMount(): void {
    const style = document.createElement('style');
    const focusStylingCSS = `
    .containerDiv [contentEditable=true]:focus,
    .containerDiv [tabindex]:focus,
    .containerDiv area[href]:focus,
    .containerDiv button:focus,
    .containerDiv iframe:focus,
    .containerDiv input:focus,
    .containerDiv select:focus,
    .containerDiv textarea:focus {
      outline: -webkit-focus-ring-color auto 5px;
    }
    `;
    style.appendChild(document.createTextNode(focusStylingCSS));
    document.head.appendChild(style);
  }

  public render(): React.ReactNode {
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
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
        <Checkbox
          label="Hide min and max values"
          checked={this.state.hideMinMax}
          onChange={this._onHideMinMaxCheckChange}
          styles={{ root: { marginTop: '20px' } }}
        />

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
          &nbsp;&nbsp;
          <Toggle
            label="Select Multiple Legends"
            onText="ON"
            offText="OFF"
            checked={this.state.legendMultiSelect}
            onChange={this._onToggleLegendMultiSelect}
          />
        </div>
        <div style={rootStyle}>
          <FunnelChart
            data={[
              { stage: 'Visitors', value: 1000, color: getColorFromToken(DataVizPalette.color5) },
              { stage: 'Signups', value: 600, color: getColorFromToken(DataVizPalette.color6) },
              { stage: 'Trials', value: 300, color: getColorFromToken(DataVizPalette.color7) },
              { stage: 'Customers', value: 150, color: getColorFromToken(DataVizPalette.color10) },
            ]}
            chartTitle="Funnel Chart Example"
            width={this.state.width}
            height={this.state.height}
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
  private _onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ chartValue: parseInt(e.target.value, 10) });
  };

  private _onHideMinMaxCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ hideMinMax: checked });
  };

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundedCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundedCorners: checked });
  };

  private _onToggleLegendMultiSelect = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ legendMultiSelect: checked });
  };
}

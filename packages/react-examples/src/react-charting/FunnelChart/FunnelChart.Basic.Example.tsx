import * as React from 'react';
import { FunnelChart, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { Toggle, ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';

interface IFunnelChartBasicState {
  width: number;
  height: number;
  hideLegend: boolean;
  orientation: 'horizontal' | 'vertical';
  legendMultiSelect: boolean;
}

export class FunnelChartBasicExample extends React.Component<{}, IFunnelChartBasicState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 600,
      height: 500,
      hideLegend: false,
      orientation: 'horizontal',
      legendMultiSelect: false,
    };
  }

  public render(): React.ReactNode {
    const { width, height, hideLegend, orientation, legendMultiSelect } = this.state;

    // Basic funnel chart data
    const basicData = [
      { stage: 'Visitors', value: 1000, color: getColorFromToken(DataVizPalette.color5) },
      { stage: 'Signups', value: 600, color: getColorFromToken(DataVizPalette.color6) },
      { stage: 'Trials', value: 300, color: getColorFromToken(DataVizPalette.color7) },
      { stage: 'Customers', value: 250, color: getColorFromToken(DataVizPalette.color10) },
    ];

    const orientationOptions: IChoiceGroupOption[] = [
      { key: 'horizontal', text: 'Horizontal' },
      { key: 'vertical', text: 'Vertical' },
    ];

    const rootStyle = {
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
      textAlign: 'center' as const,
    };

    return (
      <>
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Basic"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Basic"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <Toggle
          label="Hide Legend"
          onText="ON"
          offText="OFF"
          checked={hideLegend}
          onChange={this._onToggleHideLegend}
        />
        <Toggle
          label="Multiple Legend Selection"
          onText="ON"
          offText="OFF"
          checked={legendMultiSelect}
          onChange={this._onToggleLegendMultiSelect}
        />

        <ChoiceGroup
          label="Orientation"
          selectedKey={orientation}
          options={orientationOptions}
          onChange={this._onOrientationChange}
        />
        <div style={rootStyle}>
          <FunnelChart
            data={basicData}
            chartTitle="Basic Funnel Chart"
            width={width}
            height={height}
            hideLegend={hideLegend}
            orientation={orientation}
            legendProps={{
              canSelectMultipleLegends: legendMultiSelect,
            }}
          />
        </div>
      </>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onToggleHideLegend = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ hideLegend: checked! });
  };
  private _onToggleLegendMultiSelect = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ legendMultiSelect: checked! });
  };
  private _onOrientationChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption,
  ): void => {
    if (option) {
      this.setState({ orientation: option.key as 'horizontal' | 'vertical' });
    }
  };
}

import * as React from 'react';
import { AreaChart, ICustomizedCalloutData } from '@fluentui/react-charting';
import { IAreaChartProps, ChartHoverCard, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IAreaChartBasicState {
  width: number;
  height: number;
  isCalloutselected: boolean;
  showAxisTitles: boolean;
}

const options: IChoiceGroupOption[] = [
  { key: 'basicExample', text: 'Basic Example' },
  { key: 'calloutExample', text: 'Custom Callout Example' },
];

export class AreaChartBasicExample extends React.Component<{}, IAreaChartBasicState> {
  constructor(props: IAreaChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      isCalloutselected: false,
      showAxisTitles: true,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
    if (this.state.isCalloutselected) {
      this.setState({ isCalloutselected: false });
    } else {
      this.setState({ isCalloutselected: true });
    }
  };

  private _onToggleAxisTitlesCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.forceUpdate();
    this.setState({ showAxisTitles: checked });
  };

  private _basicExample(): JSX.Element {
    const chart1Points = [];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
      },
    ];

    const chartData = {
      chartTitle: 'Area chart basic example',
      lineChartData: chartPoints,
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

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

        <ChoiceGroup options={options} defaultSelectedKey="basicExample" onChange={this._onChange} label="Pick one" />
        <Toggle
          label="Toggle Axis titles"
          onText="Show axis titles"
          offText="Hide axis titles"
          checked={this.state.showAxisTitles}
          onChange={this._onToggleAxisTitlesCheckChange}
          styles={{ root: { marginTop: '10px' } }}
        />
        {this.state.showAxisTitles && (
          <div style={rootStyle}>
            <AreaChart
              culture={window.navigator.language}
              height={this.state.height}
              width={this.state.width}
              data={chartData}
              enablePerfOptimization={true}
              // eslint-disable-next-line react/jsx-no-bind
              onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
                props && this.state.isCalloutselected ? (
                  <ChartHoverCard
                    XValue={props.x.toString()}
                    Legend={'Custom Legend'}
                    YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                    color={getColorFromToken(DataVizPalette.color7)}
                  />
                ) : null
              }
              enableReflow={true}
              yAxisTitle={this.state.showAxisTitles ? 'Variation of stock market prices' : undefined}
              xAxisTitle={this.state.showAxisTitles ? 'Number of days' : undefined}
            />
          </div>
        )}
        {!this.state.showAxisTitles && (
          <div style={rootStyle}>
            <AreaChart
              culture={window.navigator.language}
              height={this.state.height}
              width={this.state.width}
              data={chartData}
              enablePerfOptimization={true}
              // eslint-disable-next-line react/jsx-no-bind
              onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
                props && this.state.isCalloutselected ? (
                  <ChartHoverCard
                    XValue={props.x.toString()}
                    Legend={'Custom Legend'}
                    YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                    color={getColorFromToken(DataVizPalette.color7)}
                  />
                ) : null
              }
              enableReflow={true}
            />
          </div>
        )}
      </>
    );
  }
}

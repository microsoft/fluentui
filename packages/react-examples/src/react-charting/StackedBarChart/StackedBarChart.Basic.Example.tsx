import * as React from 'react';
import {
  StackedBarChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Checkbox } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IStackedBarState {
  hideTooltip: boolean;
  enableGradient: boolean;
  roundCorners: boolean;
}

export class StackedBarChartBasicExample extends React.Component<{}, IStackedBarState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      hideTooltip: false,
      enableGradient: false,
      roundCorners: false,
    };
  }
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      {
        legend: 'first',
        data: 3000000,
        color: getColorFromToken(DataVizPalette.color1),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '99%',
      },
      { legend: 'second', data: 1, color: getColorFromToken(DataVizPalette.color5) },
    ];

    const data0: IChartProps = {
      chartTitle: 'Stacked Bar chart example',
      chartData: points,
    };

    const data1: IChartProps = {
      chartTitle: 'Stacked Bar chart example with ignore fix style',
      chartData: points,
    };

    return (
      <>
        <Checkbox
          label="Hide tooltip"
          checked={this.state.hideTooltip}
          onChange={this._onHideTooltipChange}
          styles={{ root: { marginBottom: '20px' } }}
        />
        <div style={{ display: 'flex' }}>
          <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onToggleGradient} />
          &nbsp;&nbsp;
          <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onToggleRoundCorners} />
        </div>

        <br />
        <StackedBarChart
          culture={window.navigator.language}
          data={data0}
          href={'https://developer.microsoft.com/en-us/'}
          ignoreFixStyle={false}
          hideTooltip={this.state.hideTooltip}
          enableGradient={this.state.enableGradient}
          roundCorners={this.state.roundCorners}
        />
        <br />
        <StackedBarChart
          culture={window.navigator.language}
          data={data1}
          href={'https://developer.microsoft.com/en-us/'}
          ignoreFixStyle={true}
          hideTooltip={this.state.hideTooltip}
          enableGradient={this.state.enableGradient}
          roundCorners={this.state.roundCorners}
        />
      </>
    );
  }

  private _onHideTooltipChange = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ hideTooltip: checked });
  };

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ roundCorners: checked });
  };
}

import * as React from 'react';
import {
  StackedBarChart,
  IChartDataPoint,
  IChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IStackedBarState {
  enableGradient: boolean;
  roundCorners: boolean;
}

export class StackedBarChartMultipleExample extends React.Component<{}, IStackedBarState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      enableGradient: false,
      roundCorners: false,
    };
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'This is the first legend of the chart', data: 40, color: getColorFromToken(DataVizPalette.color3) },
      { legend: 'This is the second legend of the chart', data: 23, color: getColorFromToken(DataVizPalette.color9) },
      {
        legend: 'This is the third legend of the chart',
        data: 35,
        color: getColorFromToken(DataVizPalette.color6),
      },
      { legend: 'This is the fourth legend of the chart', data: 87, color: getColorFromToken(DataVizPalette.color5) },
    ];
    const chartTitle = 'Stacked bar chart 2nd example';

    const data: IChartProps = {
      chartTitle,
      chartData: points,
    };

    return (
      <>
        <div style={{ display: 'flex' }}>
          <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onToggleGradient} />
          &nbsp;&nbsp;
          <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onToggleRoundCorners} />
        </div>
        <br />
        <StackedBarChart
          data={data}
          enabledLegendsWrapLines={true}
          enableGradient={this.state.enableGradient}
          roundCorners={this.state.roundCorners}
        />
      </>
    );
  }

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ roundCorners: checked });
  };
}

import * as React from 'react';
import {
  DonutChart,
  IDonutChartProps,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
  getGradientFromToken,
  DataVizGradientPalette,
} from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IDonutChartState {
  enableGradient: boolean;
  roundCorners: boolean;
  legendMultiSelect: boolean;
}

export class DonutChartBasicExample extends React.Component<IDonutChartProps, IDonutChartState> {
  constructor(props: IDonutChartProps) {
    super(props);
    this.state = {
      enableGradient: false,
      roundCorners: false,
      legendMultiSelect: false,
    };
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      {
        legend: 'first',
        data: 20000,
        color: getColorFromToken(DataVizPalette.color1),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient1),
        xAxisCalloutData: '2020/04/30',
      },
      {
        legend: 'second',
        data: 39000,
        color: getColorFromToken(DataVizPalette.color2),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        xAxisCalloutData: '2020/04/20',
      },
      {
        legend: 'third',
        data: 12000,
        color: getColorFromToken(DataVizPalette.color3),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        xAxisCalloutData: '2020/04/20',
      },
      {
        legend: 'fourth',
        data: 2000,
        color: getColorFromToken(DataVizPalette.color4),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        xAxisCalloutData: '2020/04/20',
      },
      {
        legend: 'fifth',
        data: 5000,
        color: getColorFromToken(DataVizPalette.color5),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        xAxisCalloutData: '2020/04/20',
      },
      {
        legend: 'sixth',
        data: 6000,
        color: getColorFromToken(DataVizPalette.color6),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        xAxisCalloutData: '2020/04/20',
      },
      {
        legend: 'seventh',
        data: 7000,
        color: getColorFromToken(DataVizPalette.color7),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        xAxisCalloutData: '2020/04/20',
      },
      {
        legend: 'eighth',
        data: 8000,
        color: getColorFromToken(DataVizPalette.color8),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        xAxisCalloutData: '2020/04/20',
      },
      {
        legend: 'ninth',
        data: 9000,
        color: getColorFromToken(DataVizPalette.color9),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        xAxisCalloutData: '2020/04/20',
      },
      {
        legend: 'tenth',
        data: 10000,
        color: getColorFromToken(DataVizPalette.color10),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        xAxisCalloutData: '2020/04/20',
      },
    ];

    const data: IChartProps = {
      chartTitle: 'Donut chart basic example',
      chartData: points,
    };

    return (
      <>
        <div style={{ display: 'flex' }}>
          <Toggle
            label="Enable Gradient"
            onText="ON"
            offText="OFF"
            onChange={this._onToggleGradient}
            checked={this.state.enableGradient}
          />
          &nbsp;&nbsp;
          <Toggle
            label="Rounded Corners"
            onText="ON"
            offText="OFF"
            onChange={this._onToggleRoundCorners}
            checked={this.state.roundCorners}
          />
          &nbsp;&nbsp;
          <Toggle
            label="Select Multiple Legends"
            onText="ON"
            offText="OFF"
            onChange={this._onToggleLegendMultiSelect}
            checked={this.state.legendMultiSelect}
          />
        </div>

        <DonutChart
          culture={window.navigator.language}
          data={data}
          innerRadius={55}
          href={'https://developer.microsoft.com/en-us/'}
          legendsOverflowText={'overflow Items'}
          hideLegend={false}
          valueInsideDonut={39000}
          enableGradient={this.state.enableGradient}
          roundCorners={this.state.roundCorners}
          legendProps={{
            canSelectMultipleLegends: this.state.legendMultiSelect,
          }}
        />
      </>
    );
  }

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };

  private _onToggleLegendMultiSelect = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ legendMultiSelect: checked });
  };
}

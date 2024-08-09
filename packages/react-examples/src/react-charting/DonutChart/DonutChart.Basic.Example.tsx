import * as React from 'react';
import {
  DonutChart,
  IDonutChartProps,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { getGradientFromToken, DataVizGradientPalette } from '@fluentui/react-charting/lib/utilities/gradients';

interface IDonutChartState {
  enableGradient: boolean;
  roundCorners: boolean;
}

export class DonutChartBasicExample extends React.Component<IDonutChartProps, IDonutChartState> {
  constructor(props: IDonutChartProps) {
    super(props);
    this.state = {
      enableGradient: false,
      roundCorners: false,
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
    ];

    const data: IChartProps = {
      chartTitle: 'Donut chart basic example',
      chartData: points,
    };

    return (
      <>
        <div style={{display: 'flex'}}>
          <Toggle
            label="Enable Gradient"
            onText="On"
            offText="Off"
            onChange={this._onToggleGradient}
            checked={this.state.enableGradient}
          />
          &nbsp;&nbsp;
          <Toggle
            label="Round Corners"
            onText="On"
            offText="Off"
            onChange={this._onToggleRoundCorners}
            checked={this.state.roundCorners}
          />
        </div>

        <DonutChart
          culture={window.navigator.language}
          data={data}
          innerRadius={55}
          href={'https://developer.microsoft.com/en-us/'}
          legendsOverflowText={'overflow Items'}
          hideLegend={false}
          height={220}
          width={176}
          valueInsideDonut={39000}
          enableGradient={this.state.enableGradient}
          roundCorners={this.state.roundCorners}
        />
      </>
    );
  }

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  }

  private _onToggleRoundCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  }
}

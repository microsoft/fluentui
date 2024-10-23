import * as React from 'react';
import {
  ChartHoverCard,
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

export interface IDonutChartState {
  enableGradient: boolean;
  roundCorners: boolean;
}

export class DonutChartCustomCalloutExample extends React.Component<IDonutChartProps, IDonutChartState> {
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
        color: getColorFromToken(DataVizPalette.color9),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient4),
        xAxisCalloutData: '2020/04/30',
        callOutAccessibilityData: { ariaLabel: 'Custom XVal Custom Legend 20000h' },
      },
      {
        legend: 'second',
        data: 39000,
        color: getColorFromToken(DataVizPalette.color10),
        gradient: getGradientFromToken(DataVizGradientPalette.gradient5),
        xAxisCalloutData: '2020/04/20',
        callOutAccessibilityData: { ariaLabel: 'Custom XVal Custom Legend 39000h' },
      },
    ];

    const data: IChartProps = {
      chartTitle: 'Donut chart custom callout example',
      chartData: points,
    };

    return (
      <>
        <div style={{ display: 'flex' }}>
          <Toggle
            label="Enable Gradient"
            onText="ON"
            offText="OF"
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
        </div>

        <DonutChart
          data={data}
          innerRadius={55}
          href={'https://developer.microsoft.com/en-us/'}
          legendsOverflowText={'overflow Items'}
          hideLegend={false}
          height={220}
          width={176}
          valueInsideDonut={39000}
          // eslint-disable-next-line react/jsx-no-bind
          onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
            props ? (
              <ChartHoverCard
                XValue={'Custom XVal'}
                Legend={'Custom Legend'}
                YValue={`${props.yAxisCalloutData || props.data} h`}
                color={getColorFromToken(DataVizPalette.warning)}
              />
            ) : null
          }
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

import * as React from 'react';
import {
  ChartDataMode,
  HorizontalBarChart,
  IHorizontalBarChartProps,
  DataVizPalette,
  getColorFromToken,
  convertPlotlyToHorizontalBarChartProps,
} from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IHorizontalBarChartState {
  chartMode: ChartDataMode;
  enableGradient: boolean;
  roundCorners: boolean;
}

export class HorizontalBarChartPlotlyExample extends React.Component<
  IHorizontalBarChartProps,
  IHorizontalBarChartState
> {
  constructor(props: IHorizontalBarChartProps) {
    super(props);
    this.state = {
      chartMode: 'default',
      enableGradient: false,
      roundCorners: false,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onChangeChartMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ chartMode: checked ? ('percentage' as ChartDataMode) : ('default' as ChartDataMode) });
  };

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };

  private _basicExample() {
    const hideRatio: boolean[] = [true, false];

    const data = {
      data: [
        {
          type: 'bar',
          orientation: 'h',
          x: [1543, 800, 8888, 15888, 11444, 14000, 9855, 4250],
          y: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
          hovertext: [
            '2020/04/30, 10%',
            '2020/04/30, 5%',
            '2020/04/30, 59%',
            '2020/04/30, 106%',
            '2020/04/30, 76%',
            '2020/04/30, 93%',
            '2020/04/30, 66%',
            '2020/04/30, 28%',
          ],
          marker: {
            color: [
              getColorFromToken(DataVizPalette.color1),
              getColorFromToken(DataVizPalette.color2),
              getColorFromToken(DataVizPalette.color3),
              getColorFromToken(DataVizPalette.color4),
              getColorFromToken(DataVizPalette.color5),
              getColorFromToken(DataVizPalette.color6),
              getColorFromToken(DataVizPalette.color7),
              getColorFromToken(DataVizPalette.color8),
            ],
          },
        },
      ],
      layout: {
        title: 'Horizontal Bar Chart',
        xaxis: {
          title: 'Values',
        },
        yaxis: {
          title: 'Categories',
        },
      },
    };

    const dataToRender = convertPlotlyToHorizontalBarChartProps(data);

    return (
      <>
        <div style={{ display: 'flex' }}>
          <Toggle
            label="Show labels as percentage"
            onText="Chart mode percentage"
            offText="Chart mode absolute"
            onChange={this._onChangeChartMode}
          />
          &nbsp;&nbsp;
          <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onToggleGradient} />
          &nbsp;&nbsp;
          <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onToggleRoundCorners} />
        </div>

        <div style={{ maxWidth: 600 }}>
          <HorizontalBarChart
            culture={window.navigator.language}
            data={dataToRender}
            hideRatio={hideRatio}
            chartDataMode={this.state.chartMode}
            enableGradient={this.state.enableGradient}
            roundCorners={this.state.roundCorners}
          />
        </div>
      </>
    );
  }
}

import * as React from 'react';
import {
  ChartDataMode,
  HorizontalBarChart,
  IChartProps,
  IHorizontalBarChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IHorizontalBarChartState {
  chartMode: ChartDataMode;
  enableGradient: boolean;
  roundCorners: boolean;
}

export class HorizontalBarChartBasicExample extends React.Component<
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

    const data: IChartProps[] = [
      {
        chartTitle: 'one',
        chartData: [
          {
            legend: 'one',
            horizontalBarChartdata: { x: 1543, y: 15000 },
            color: getColorFromToken(DataVizPalette.color1),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '10%',
          },
        ],
      },
      {
        chartTitle: 'two',
        chartData: [
          {
            legend: 'two',
            horizontalBarChartdata: { x: 800, y: 15000 },
            color: getColorFromToken(DataVizPalette.color2),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '5%',
          },
        ],
      },
      {
        chartTitle: 'three',
        chartData: [
          {
            legend: 'three',
            horizontalBarChartdata: { x: 8888, y: 15000 },
            color: getColorFromToken(DataVizPalette.color3),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '59%',
          },
        ],
      },
      {
        chartTitle: 'four',
        chartData: [
          {
            legend: 'four',
            horizontalBarChartdata: { x: 15888, y: 15000 },
            color: getColorFromToken(DataVizPalette.color4),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '106%',
          },
        ],
      },
      {
        chartTitle: 'five',
        chartData: [
          {
            legend: 'five',
            horizontalBarChartdata: { x: 11444, y: 15000 },
            color: getColorFromToken(DataVizPalette.color5),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '76%',
          },
        ],
      },
      {
        chartTitle: 'six',
        chartData: [
          {
            legend: 'six',
            horizontalBarChartdata: { x: 14000, y: 15000 },
            color: getColorFromToken(DataVizPalette.color6),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '93%',
          },
        ],
      },
      {
        chartTitle: 'seven',
        chartData: [
          {
            legend: 'seven',
            horizontalBarChartdata: { x: 9855, y: 15000 },
            color: getColorFromToken(DataVizPalette.color7),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '66%',
          },
        ],
      },
      {
        chartTitle: 'eight',
        chartData: [
          {
            legend: 'eight',
            horizontalBarChartdata: { x: 4250, y: 15000 },
            color: getColorFromToken(DataVizPalette.color8),
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '28%',
          },
        ],
      },
    ];

    return (
      <div className="containerDiv">
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
            data={data}
            hideRatio={hideRatio}
            chartDataMode={this.state.chartMode}
            enableGradient={this.state.enableGradient}
            roundCorners={this.state.roundCorners}
          />
        </div>
      </div>
    );
  }
}

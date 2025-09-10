import * as React from 'react';
import {
  ChartHoverCard,
  IChartDataPoint,
  IChartProps,
  StackedBarChart,
  IStackedBarChartProps,
  DataVizPalette,
  getColorFromToken,
  getGradientFromToken,
  DataVizGradientPalette,
} from '@fluentui/react-charting';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export interface IExampleState {
  dynamicData: IChartProps;
  statusKey: number;
  statusMessage: string;
  enableGradient: boolean;
  roundCorners: boolean;
}

/** This style is commonly used to visually hide text that is still available for the screen reader to announce. */
const screenReaderOnlyStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
};

export class StackedBarChartDynamicExample extends React.Component<{}, IExampleState> {
  private _colors = [
    getColorFromToken(DataVizPalette.color1),
    getColorFromToken(DataVizPalette.color2),
    getColorFromToken(DataVizPalette.color3),
    getColorFromToken(DataVizPalette.color4),
    getColorFromToken(DataVizPalette.color5),
    getColorFromToken(DataVizPalette.color6),
    getColorFromToken(DataVizPalette.color7),
    getColorFromToken(DataVizPalette.color8),
    getColorFromToken(DataVizPalette.color9),
    getColorFromToken(DataVizPalette.color10),
  ];
  private _colorSet: [String] = [''];

  private _gradientColors = [
    [
      getGradientFromToken(DataVizGradientPalette.gradient1),
      getGradientFromToken(DataVizGradientPalette.gradient3),
      getGradientFromToken(DataVizGradientPalette.gradient9),
    ],
    [getGradientFromToken(DataVizGradientPalette.gradient2), getGradientFromToken(DataVizGradientPalette.gradient4)],
    [
      getGradientFromToken(DataVizGradientPalette.gradient5),
      getGradientFromToken(DataVizGradientPalette.gradient6),
      getGradientFromToken(DataVizGradientPalette.gradient10),
    ],
    [getGradientFromToken(DataVizGradientPalette.gradient7), getGradientFromToken(DataVizGradientPalette.gradient8)],
  ];

  constructor(props: IStackedBarChartProps) {
    super(props);
    this.state = {
      dynamicData: {
        chartTitle: 'Stacked Bar chart',
        chartData: [
          { legend: 'first', data: 40, color: getColorFromToken(DataVizPalette.color6) },
          { legend: 'second', data: 23, color: getColorFromToken(DataVizPalette.color10) },
          { legend: 'third', data: 35, color: DefaultPalette.neutralSecondary },
          { legend: 'fourth', data: 87, color: getColorFromToken(DataVizPalette.color5) },
        ],
      },
      statusKey: 0,
      statusMessage: '',
      enableGradient: false,
      roundCorners: false,
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onToggleGradient} />
          &nbsp;&nbsp;
          <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onToggleRoundCorners} />
        </div>
        <br />

        <StackedBarChart
          data={this.state.dynamicData}
          // eslint-disable-next-line react/jsx-no-bind
          onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
            props ? (
              <ChartHoverCard
                XValue={props.legend!}
                YValue={props.yAxisCalloutData || props.data}
                color={props.color!}
              />
            ) : null
          }
          enableGradient={this.state.enableGradient}
          roundCorners={this.state.roundCorners}
        />
        <br />

        <DefaultButton text="Change data" onClick={this._changeData} />
        <DefaultButton text="Change colors" onClick={this._changeColors} />
        <div aria-live="polite" aria-atomic="true">
          {/* Change the key so that React treats it as an update even if the message is same */}
          <p key={this.state.statusKey} style={screenReaderOnlyStyle}>
            {this.state.statusMessage}
          </p>
        </div>
      </div>
    );
  }

  private _changeData(): void {
    this.setState(prevState => ({
      dynamicData: {
        chartTitle: 'Stacked Bar chart',
        chartData: [
          { ...prevState.dynamicData.chartData![0], legend: 'first', data: this._randomY() },
          { ...prevState.dynamicData.chartData![1], legend: 'second', data: this._randomY() },
          { ...prevState.dynamicData.chartData![2], legend: 'third', data: this._randomY() },
          { ...prevState.dynamicData.chartData![3], legend: 'fourth', data: this._randomY() },
        ],
      },
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Stacked bar chart data changed',
    }));
  }

  private _changeColors(): void {
    this._colorSet = [''];
    this.setState(prevState => ({
      dynamicData: {
        chartTitle: 'Stacked Bar chart',
        chartData: [
          {
            ...prevState.dynamicData.chartData![0],
            legend: 'first',
            color: this._randomColor(),
            gradient: this._randomGradient(0),
          },
          {
            ...prevState.dynamicData.chartData![1],
            legend: 'second',
            color: this._randomColor(),
            gradient: this._randomGradient(1),
          },
          {
            ...prevState.dynamicData.chartData![2],
            legend: 'third',
            color: this._randomColor(),
            gradient: this._randomGradient(2),
          },
          {
            ...prevState.dynamicData.chartData![3],
            legend: 'fourth',
            color: this._randomColor(),
            gradient: this._randomGradient(3),
          },
        ],
      },
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Stacked bar chart colors changed',
    }));
  }

  private _randomY(): number {
    return Math.random() * 45 + 5;
  }

  private _randomColor(): string {
    const color = this._colors[Math.floor(Math.random() * this._colors.length)];
    if (this._colorSet.includes(color)) {
      return this._randomColor();
    }
    this._colorSet.push(color);
    return color;
  }

  private _randomGradient(index: number): [string, string] {
    return this._gradientColors[index][Math.floor(Math.random() * this._gradientColors[index].length)];
  }

  private _onToggleGradient = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundCorners = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ roundCorners: checked });
  };
}

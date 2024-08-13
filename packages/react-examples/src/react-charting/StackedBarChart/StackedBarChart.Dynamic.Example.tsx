import * as React from 'react';
import {
  ChartHoverCard,
  IChartDataPoint,
  IChartProps,
  StackedBarChart,
  IStackedBarChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton } from '@fluentui/react/lib/Button';

export interface IExampleState {
  dynamicData: IChartProps;
  statusKey: number;
  statusMessage: string;
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
    [
      DefaultPalette.blueMid,
      DefaultPalette.blue,
      getColorFromToken(DataVizPalette.color6),
      DefaultPalette.tealDark,
      DefaultPalette.teal,
      DefaultPalette.tealLight,
    ],
    [
      DefaultPalette.redDark,
      DefaultPalette.red,
      DefaultPalette.orange,
      DefaultPalette.orangeLight,
      DefaultPalette.orangeLighter,
      getColorFromToken(DataVizPalette.color10),
      DefaultPalette.yellowLight,
    ],
    [
      DefaultPalette.greenDark,
      DefaultPalette.green,
      getColorFromToken(DataVizPalette.color5),
      DefaultPalette.neutralPrimary,
      DefaultPalette.neutralSecondary,
      DefaultPalette.neutralTertiary,
    ],
    [
      DefaultPalette.purpleDark,
      DefaultPalette.purple,
      DefaultPalette.purpleLight,
      DefaultPalette.magentaDark,
      DefaultPalette.magenta,
      DefaultPalette.magentaLight,
    ],
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
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div>
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
        />
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
    this.setState(prevState => ({
      dynamicData: {
        chartTitle: 'Stacked Bar chart',
        chartData: [
          { ...prevState.dynamicData.chartData![0], legend: 'first', color: this._randomColor(0) },
          { ...prevState.dynamicData.chartData![1], legend: 'second', color: this._randomColor(1) },
          { ...prevState.dynamicData.chartData![2], legend: 'third', color: this._randomColor(2) },
          { ...prevState.dynamicData.chartData![3], legend: 'fourth', color: this._randomColor(3) },
        ],
      },
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Stacked bar chart colors changed',
    }));
  }

  private _randomY(): number {
    return Math.random() * 45 + 5;
  }

  private _randomColor(index: number): string {
    return this._colors[index][Math.floor(Math.random() * this._colors[index].length)];
  }
}

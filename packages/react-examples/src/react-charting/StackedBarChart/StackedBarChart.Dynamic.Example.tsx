import * as React from 'react';
import { IChartProps, StackedBarChart, IStackedBarChartProps } from '@uifabric/charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton } from '@fluentui/react/lib/Button';

export interface IExampleState {
  dynamicData: IChartProps;
}

export class StackedBarChartDynamicExample extends React.Component<{}, IExampleState> {
  private _colors = [
    [
      DefaultPalette.blueMid,
      DefaultPalette.blue,
      DefaultPalette.blueLight,
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
      DefaultPalette.yellow,
      DefaultPalette.yellowLight,
    ],
    [
      DefaultPalette.greenDark,
      DefaultPalette.green,
      DefaultPalette.greenLight,
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
          { legend: 'first', data: 40, color: DefaultPalette.blueLight },
          { legend: 'second', data: 23, color: DefaultPalette.yellow },
          { legend: 'third', data: 35, color: DefaultPalette.neutralSecondary },
          { legend: 'fourth', data: 87, color: DefaultPalette.greenLight },
        ],
      },
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div>
        <StackedBarChart data={this.state.dynamicData} />
        <DefaultButton text="Change data" onClick={this._changeData} />
        <DefaultButton text="Change colors" onClick={this._changeColors} />
      </div>
    );
  }

  private _changeData(): void {
    this.setState({
      dynamicData: {
        chartTitle: 'Stacked Bar chart',
        chartData: [
          { legend: 'first', data: this._randomY() },
          { legend: 'second', data: this._randomY() },
          { legend: 'third', data: this._randomY() },
          { legend: 'fourth', data: this._randomY() },
        ],
      },
    });
  }

  private _changeColors(): void {
    this.setState({
      dynamicData: {
        chartTitle: 'Stacked Bar chart',
        chartData: [
          { legend: 'first', data: 40, color: this._randomColor(0) },
          { legend: 'second', data: 23, color: this._randomColor(1) },
          { legend: 'third', data: 35, color: this._randomColor(2) },
          { legend: 'fourth', data: 87, color: this._randomColor(3) },
        ],
      },
    });
  }

  private _randomY(): number {
    return Math.random() * 45 + 5;
  }

  private _randomColor(index: number): string {
    return this._colors[index][Math.floor(Math.random() * this._colors[index].length)];
  }
}

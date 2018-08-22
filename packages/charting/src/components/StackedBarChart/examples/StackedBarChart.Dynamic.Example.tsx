import * as React from 'react';
import { StackedBarChart, IStackedBarChartProps } from '@uifabric/charting/lib/StackedBarChart';
import { IDataPoint } from '@uifabric/charting/lib/types/IDataPoint';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IExampleState {
  dynamicData: IDataPoint[];
  colors: string[];
}

export class StackedBarChartDynamicExample extends React.Component<IStackedBarChartProps, IExampleState> {
  private _colors = [
    [
      DefaultPalette.blueMid,
      DefaultPalette.blue,
      DefaultPalette.blueLight,
      DefaultPalette.tealDark,
      DefaultPalette.teal,
      DefaultPalette.tealLight
    ],
    [
      DefaultPalette.redDark,
      DefaultPalette.red,
      DefaultPalette.orange,
      DefaultPalette.orangeLight,
      DefaultPalette.orangeLighter,
      DefaultPalette.yellow,
      DefaultPalette.yellowLight
    ],
    [
      DefaultPalette.greenDark,
      DefaultPalette.green,
      DefaultPalette.greenLight,
      DefaultPalette.neutralPrimary,
      DefaultPalette.neutralSecondary,
      DefaultPalette.neutralTertiary
    ],
    [
      DefaultPalette.purpleDark,
      DefaultPalette.purple,
      DefaultPalette.purpleLight,
      DefaultPalette.magentaDark,
      DefaultPalette.magenta,
      DefaultPalette.magentaLight
    ]
  ];

  constructor(props: IStackedBarChartProps) {
    super(props);
    this.state = {
      dynamicData: [{ x: 'first', y: 40 }, { x: 'second', y: 23 }, { x: 'third', y: 35 }, { x: 'fourth', y: 87 }],
      colors: [
        DefaultPalette.blueLight,
        DefaultPalette.yellow,
        DefaultPalette.neutralSecondary,
        DefaultPalette.greenLight
      ]
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div>
        <StackedBarChart data={this.state.dynamicData} chartTitle={'Stacked Bar chart'} colors={this.state.colors} />
        <DefaultButton text="Change data" onClick={this._changeData} />
        <DefaultButton text="Change colors" onClick={this._changeColors} />
      </div>
    );
  }

  private _changeData(): void {
    this.setState({
      dynamicData: [
        { x: 'first', y: this._randomY() },
        { x: 'second', y: this._randomY() },
        { x: 'third', y: this._randomY() },
        { x: 'fourth', y: this._randomY() }
      ]
    });
  }

  private _changeColors(): void {
    this.setState({
      colors: [this._randomColor(0), this._randomColor(1), this._randomColor(2), this._randomColor(3)]
    });
  }

  private _randomY(): number {
    return Math.random() * 45 + 5;
  }

  private _randomColor(index: number): string {
    return this._colors[index][Math.floor(Math.random() * this._colors[index].length)];
  }
}

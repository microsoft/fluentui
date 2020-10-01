import * as React from 'react';
import { DonutChart, IDonutChartProps, IChartProps, IChartDataPoint } from '@uifabric/charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton } from '@fluentui/react/lib/Button';

export interface IExampleState {
  dynamicData: IChartDataPoint[];
}

export class DonutChartDynamicExample extends React.Component<IDonutChartProps, IExampleState> {
  private _colors = [
    [
      DefaultPalette.blueLight,
      DefaultPalette.blue,
      DefaultPalette.tealLight,
      DefaultPalette.teal,
      DefaultPalette.greenLight,
    ],
    [DefaultPalette.purpleLight, DefaultPalette.purple, DefaultPalette.magentaLight, DefaultPalette.magenta],
    [DefaultPalette.yellowLight, DefaultPalette.yellow, DefaultPalette.orangeLighter, DefaultPalette.orangeLight],
    [DefaultPalette.neutralTertiary, DefaultPalette.neutralSecondary, DefaultPalette.neutralPrimary],
  ];

  constructor(props: IDonutChartProps) {
    super(props);
    this.state = {
      dynamicData: [
        { legend: 'first', data: 40, color: DefaultPalette.blueLight },
        { legend: 'second', data: 20, color: DefaultPalette.purpleLight },
        { legend: 'third', data: 30, color: DefaultPalette.yellowLight },
        { legend: 'fourth', data: 10, color: DefaultPalette.neutralSecondary },
      ],
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    const chartTitle = 'Stacked Bar chart example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: this.state.dynamicData,
    };
    return (
      <div>
        <DonutChart
          data={data}
          innerRadius={55}
          legendProps={{
            overflowProps: {
              focusZoneProps: {
                'aria-label': 'Legends container',
              },
            },
            allowFocusOnLegends: true,
          }}
        />
        <DefaultButton text="Change data" onClick={this._changeData} />
        <DefaultButton text="Change colors" onClick={this._changeColors} />
      </div>
    );
  }

  private _changeData(): void {
    const a = this._randomY(40);
    const b = this._randomY(100 - a - 20);
    const c = this._randomY(100 - a - b - 10);
    const d = 100 - a - b - c;

    this.setState({
      dynamicData: [
        { legend: 'first', data: a, color: DefaultPalette.blueLight },
        { legend: 'second', data: b, color: DefaultPalette.purpleLight },
        { legend: 'third', data: c, color: DefaultPalette.yellowLight },
        { legend: 'fourth', data: d, color: DefaultPalette.neutralSecondary },
      ],
    });
  }

  private _changeColors(): void {
    this.setState({
      dynamicData: [
        { legend: 'first', data: 40, color: this._randomColor(0) },
        { legend: 'second', data: 20, color: this._randomColor(1) },
        { legend: 'third', data: 30, color: this._randomColor(2) },
        { legend: 'fourth', data: 10, color: this._randomColor(3) },
      ],
    });
  }

  private _randomY(max: number): number {
    return Math.floor(Math.random() * max + 5);
  }

  private _randomColor(index: number): string {
    return this._colors[index][Math.floor(Math.random() * this._colors[index].length)];
  }
}

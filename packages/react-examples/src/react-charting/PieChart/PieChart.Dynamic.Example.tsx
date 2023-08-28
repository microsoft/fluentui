import * as React from 'react';
import { IDataPoint, PieChart, IPieChartProps, DataVizPalette } from '@fluentui/react-charting';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Stack, StackItem } from '@fluentui/react';

export interface IExampleState {
  dynamicData: IDataPoint[];
  colors: string[];
  width: number;
  height: number;
}

export class PieChartDynamicExample extends React.Component<IPieChartProps, IExampleState> {
  private _colors = [
    [DataVizPalette.color1, DataVizPalette.color2, DataVizPalette.color3, DataVizPalette.color4, DataVizPalette.color5],
    [DataVizPalette.color6, DataVizPalette.color7, DataVizPalette.color8, DataVizPalette.color9],
    [DataVizPalette.color10, DataVizPalette.color11, DataVizPalette.color12, DataVizPalette.color13],
    [DataVizPalette.color30],
  ];

  constructor(props: IPieChartProps) {
    super(props);
    this.state = {
      dynamicData: [
        { x: 'A', y: 25 },
        { x: 'B', y: 10 },
        { x: 'C', y: 60 },
        { x: 'D', y: 5 },
      ],
      colors: this._colors[0],
      width: 600,
      height: 350,
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div>
        <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
          <StackItem>
            <label htmlFor="width-slider">Width:</label>
            <input
              type="range"
              value={this.state.width}
              min={0}
              max={1000}
              id="width-slider"
              onChange={this._onWidthChange}
              aria-valuetext={`Width: ${this.state.width}`}
            />
          </StackItem>
          <StackItem>
            <label htmlFor="height-slider">Height:</label>
            <input
              type="range"
              value={this.state.height}
              min={0}
              max={1000}
              id="height-slider"
              onChange={this._onHeightChange}
              aria-valuetext={`height: ${this.state.height}`}
            />
          </StackItem>
        </Stack>
        <PieChart
          width={this.state.width}
          height={this.state.height}
          data={this.state.dynamicData}
          chartTitle="Pie Chart dynamic example"
          colors={this.state.colors}
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
        { x: 'A', y: a },
        { x: 'B', y: b },
        { x: 'C', y: c },
        { x: 'D', y: d },
      ],
    });
  }

  private _changeColors(): void {
    this.setState({
      colors: [this._randomColor(0), this._randomColor(1), this._randomColor(2), this._randomColor(3)],
    });
  }

  private _randomY(max: number): number {
    return Math.floor(Math.random() * max + 5);
  }

  private _randomColor(index: number): string {
    return this._colors[index][Math.floor(Math.random() * this._colors[index].length)];
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
}

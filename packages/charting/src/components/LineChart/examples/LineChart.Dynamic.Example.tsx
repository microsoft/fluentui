import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { IDataPoint } from '@uifabric/charting/lib/types/IDataPoint';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IExampleState {
  dynamicData: IDataPoint[];
  color: string;
}

export class LineChartDynamicExample extends React.Component<ILineChartProps, IExampleState> {
  private _colors = [DefaultPalette.blue, DefaultPalette.orange, DefaultPalette.green, DefaultPalette.yellow];
  private _colorIndex = 0;

  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      dynamicData: [
        { x: 0, y: 10 },
        { x: 5, y: 18 },
        { x: 10, y: 24 },
        { x: 15, y: 25 },
        { x: 20, y: 15 },
        { x: 25, y: 30 },
        { x: 30, y: 18 },
        { x: 35, y: 32 },
        { x: 40, y: 29 },
        { x: 45, y: 43 },
        { x: 50, y: 45 }
      ],
      color: this._colors[this._colorIndex]
    };

    this._changeData = this._changeData.bind(this);
    this._changeColor = this._changeColor.bind(this);
  }

  public render(): JSX.Element {
    const points: IDataPoint[][] = [this.state.dynamicData];
    const colors = [this.state.color];
    return (
      <div>
        <LineChart data={points} chartLabel={'Chart with Dynamic Data'} colors={colors} />
        <DefaultButton text="Change data" onClick={this._changeData} />
        <DefaultButton text="Change color" onClick={this._changeColor} />
      </div>
    );
  }

  private _changeData(): void {
    this.setState({
      dynamicData: [
        { x: 0, y: this._randomY() },
        { x: 5, y: this._randomY() },
        { x: 10, y: this._randomY() },
        { x: 15, y: this._randomY() },
        { x: 20, y: this._randomY() },
        { x: 25, y: this._randomY() },
        { x: 30, y: this._randomY() },
        { x: 35, y: this._randomY() },
        { x: 40, y: this._randomY() },
        { x: 45, y: this._randomY() },
        { x: 50, y: this._randomY() }
      ]
    });
  }

  private _changeColor(): void {
    this._colorIndex = (this._colorIndex + 1) % this._colors.length;
    this.setState({ color: this._colors[this._colorIndex] });
  }

  private _randomY(): number {
    return Math.random() * 45 + 5;
  }
}

import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IDataPoint } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IExampleState {
  dynamicData: IDataPoint[];
  colors: string[];
}

export class VerticalBarChartDynamicExample extends React.Component<IVerticalBarChartProps, IExampleState> {
  private _colors = [
    [DefaultPalette.blueLight, DefaultPalette.blue, DefaultPalette.blueDark],
    [DefaultPalette.orangeLighter, DefaultPalette.orangeLight, DefaultPalette.orange],
    [DefaultPalette.greenLight, DefaultPalette.green, DefaultPalette.greenDark],
    [DefaultPalette.magentaLight, DefaultPalette.magenta, DefaultPalette.magentaDark],
  ];
  private _colorIndex = 0;

  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      dynamicData: [
        { x: 0, y: 10 },
        { x: 12, y: 36 },
        { x: 21, y: 20 },
        { x: 29, y: 46 },
        { x: 40, y: 13 },
        { x: 50, y: 43 },
        { x: 57, y: 30 },
        { x: 64, y: 45 },
        { x: 78, y: 50 },
        { x: 90, y: 43 },
        { x: 100, y: 19 },
      ],
      colors: this._colors[0],
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div style={{ width: '650px', height: '400px' }}>
        <VerticalBarChart
          data={this.state.dynamicData}
          colors={this.state.colors}
          chartLabel={'Chart with Dynamic Data'}
          hideLegend={true}
          hideTooltip={true}
          yMaxValue={50}
          yAxisTickCount={5}
          height={400}
          width={650}
        />
        <DefaultButton text="Change data" onClick={this._changeData} />
        <DefaultButton text="Change colors" onClick={this._changeColors} />
      </div>
    );
  }

  private _changeData(): void {
    this.setState({
      dynamicData: [
        { x: 0, y: this._randomY() },
        { x: 12, y: this._randomY() },
        { x: 21, y: this._randomY() },
        { x: 29, y: this._randomY() },
        { x: 40, y: this._randomY() },
        { x: 48, y: this._randomY() },
        { x: 57, y: this._randomY() },
        { x: 64, y: this._randomY() },
        { x: 78, y: this._randomY() },
        { x: 90, y: this._randomY() },
        { x: 100, y: this._randomY() },
      ],
    });
  }

  private _changeColors(): void {
    this._colorIndex = (this._colorIndex + 1) % this._colors.length;
    this.setState({ colors: this._colors[this._colorIndex] });
  }

  private _randomY(): number {
    return Math.random() * 45 + 5;
  }
}

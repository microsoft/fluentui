import * as React from 'react';
import { DonutChart, IDonutChartProps, IChartProps, IChartDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

export interface IExampleState {
  dynamicData: IChartDataPoint[];
  hideLabels: boolean;
  showLabelsInPercent: boolean;
  innerRadius: number;
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
        { legend: 'first', data: 40, color: '#0099BC' },
        { legend: 'second', data: 20, color: '#77004D' },
        { legend: 'third', data: 30, color: '#4f67ed' },
        { legend: 'fourth', data: 10, color: '#ae8c00' },
      ],
      hideLabels: false,
      showLabelsInPercent: false,
      innerRadius: 35,
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Donut chart dynamic example',
      chartData: this.state.dynamicData,
    };
    return (
      <div>
        <Checkbox
          label="Hide labels (Note: The inner radius is changed along with this to keep the arc width same)"
          checked={this.state.hideLabels}
          onChange={this._onHideLabelsCheckChange}
          styles={{ root: { marginBottom: '10px' } }}
        />
        <Checkbox
          label="Show labels in percentage format"
          checked={this.state.showLabelsInPercent}
          onChange={this._onShowPercentCheckChange}
        />
        <DonutChart
          data={data}
          innerRadius={this.state.innerRadius}
          legendProps={{
            allowFocusOnLegends: true,
          }}
          hideLabels={this.state.hideLabels}
          showLabelsInPercent={this.state.showLabelsInPercent}
        />
        <DefaultButton text="Change data" onClick={this._changeData} />
        <DefaultButton text="Change colors" onClick={this._changeColors} />
      </div>
    );
  }

  private _changeData(): void {
    this.setState({
      dynamicData: [
        { legend: 'first', data: this._randomY(), color: DefaultPalette.blueLight },
        { legend: 'second', data: this._randomY(), color: DefaultPalette.purpleLight },
        { legend: 'third', data: this._randomY(), color: DefaultPalette.yellowLight },
        { legend: 'fourth', data: this._randomY(), color: DefaultPalette.neutralSecondary },
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

  private _randomY(max = 300): number {
    return Math.floor(Math.random() * max + 5);
  }

  private _randomColor(index: number): string {
    return this._colors[index][Math.floor(Math.random() * this._colors[index].length)];
  }

  private _onHideLabelsCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    let innerRadius: number;
    if (checked) {
      innerRadius = 55;
    } else {
      innerRadius = 35;
    }
    this.setState({ hideLabels: checked, innerRadius });
  };

  private _onShowPercentCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ showLabelsInPercent: checked });
  };
}

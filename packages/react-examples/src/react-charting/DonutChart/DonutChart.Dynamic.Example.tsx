import * as React from 'react';
import {
  DonutChart,
  IDonutChartProps,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

export interface IExampleState {
  dynamicData: IChartDataPoint[];
  hideLabels: boolean;
  showLabelsInPercent: boolean;
  innerRadius: number;
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

export class DonutChartDynamicExample extends React.Component<IDonutChartProps, IExampleState> {
  private _colors = [
    [DataVizPalette.color3, DataVizPalette.color4, DataVizPalette.color5, DataVizPalette.color6, DataVizPalette.color7],
    [DataVizPalette.color8, DataVizPalette.color9, DataVizPalette.color10, DataVizPalette.color11],
    [DataVizPalette.color12, DataVizPalette.color13, DataVizPalette.color14, DataVizPalette.color15],
    [DataVizPalette.color16, DataVizPalette.color17, DataVizPalette.color18],
  ];

  constructor(props: IDonutChartProps) {
    super(props);
    this.state = {
      dynamicData: [
        { legend: 'first', data: 40, color: getColorFromToken(DataVizPalette.color1) },
        { legend: 'second', data: 20, color: getColorFromToken(DataVizPalette.color2) },
        { legend: 'third', data: 30, color: getColorFromToken(DataVizPalette.color3) },
        { legend: 'fourth', data: 10, color: getColorFromToken(DataVizPalette.color4) },
      ],
      hideLabels: false,
      showLabelsInPercent: false,
      innerRadius: 35,
      statusKey: 0,
      statusMessage: '',
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
      dynamicData: [
        { legend: 'first', data: this._randomY(), color: getColorFromToken(DataVizPalette.color1) },
        { legend: 'second', data: this._randomY(), color: getColorFromToken(DataVizPalette.color2) },
        { legend: 'third', data: this._randomY(), color: getColorFromToken(DataVizPalette.color3) },
        { legend: 'fourth', data: this._randomY(), color: getColorFromToken(DataVizPalette.color4) },
      ],
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Donut chart data changed',
    }));
  }

  private _changeColors(): void {
    this.setState(prevState => ({
      dynamicData: [
        { legend: 'first', data: 40, color: this._randomColor(0) },
        { legend: 'second', data: 20, color: this._randomColor(1) },
        { legend: 'third', data: 30, color: this._randomColor(2) },
        { legend: 'fourth', data: 10, color: this._randomColor(3) },
      ],
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Donut chart colors changed',
    }));
  }

  private _randomY(max = 300): number {
    return Math.floor(Math.random() * max + 5);
  }

  private _randomColor(index: number): string {
    return getColorFromToken(this._colors[index][Math.floor(Math.random() * this._colors[index].length)]);
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

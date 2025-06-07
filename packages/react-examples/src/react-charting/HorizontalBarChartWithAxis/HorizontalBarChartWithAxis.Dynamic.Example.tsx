import * as React from 'react';
import {
  DataVizPalette,
  getColorFromToken,
  IHorizontalBarChartWithAxisProps,
  HorizontalBarChartWithAxis,
  IHorizontalBarChartWithAxisDataPoint,
} from '@fluentui/react-charting';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Checkbox, ChoiceGroup, IChoiceGroupOption, Label, Stack } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';

export interface IExampleState {
  dynamicData: IHorizontalBarChartWithAxisDataPoint[];
  statusKey: number;
  statusMessage: string;
  barWidth: number | 'auto' | undefined;
  maxBarWidth: number;
  width: number;
  yAxisType: string;
  dataSize: number;
  enableGradient: boolean;
  roundCorners: boolean;
  yAxisPadding?: number;
  yAxisPaddingEnabled?: boolean;
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

const yAxisTypeOptions: IChoiceGroupOption[] = [
  { key: 'number', text: 'Number' },
  { key: 'string', text: 'String' },
];

export class HorizontalBarChartWithAxisDynamicExample extends React.Component<
  IHorizontalBarChartWithAxisProps,
  IExampleState
> {
  private _colors = [
    getColorFromToken(DataVizPalette.color1),
    getColorFromToken(DataVizPalette.color2),
    getColorFromToken(DataVizPalette.color3),
  ];

  constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);

    const initialyAxisType = yAxisTypeOptions[0].key;
    const initialDataSize = 5;

    this.state = {
      dynamicData: this._getData(initialDataSize, initialyAxisType),
      statusKey: 0,
      statusMessage: '',
      barWidth: undefined,
      maxBarWidth: 24,
      width: 650,
      yAxisType: initialyAxisType,
      dataSize: initialDataSize,
      enableGradient: false,
      roundCorners: false,
      yAxisPadding: 0,
      yAxisPaddingEnabled: false,
    };

    this._changeData = this._changeData.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="containerDiv">
        <Stack horizontal wrap tokens={{ childrenGap: '15 30' }}>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor="input-width" style={{ fontWeight: 400 }}>
              width:&nbsp;
            </Label>
            <input
              type="range"
              value={this.state.width}
              min={200}
              max={1000}
              onChange={this._onWidthChange}
              id="input-width"
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor="input-datasize" style={{ fontWeight: 400 }}>
              Data Size:&nbsp;
            </Label>
            <input
              type="range"
              value={this.state.dataSize}
              min={0}
              max={50}
              onChange={this._onDataSizeChange}
              id="input-datasize"
            />
          </Stack>
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Checkbox
            label="yAxisPadding:&nbsp;"
            checked={this.state.yAxisPaddingEnabled}
            onChange={this._onYAxisPaddingCheckChange}
            disabled={this.state.yAxisType !== 'string'}
          />
          <input
            type="range"
            value={this.state.yAxisPadding}
            min={0}
            max={1}
            step={0.1}
            onChange={this._onYAxisPaddingChange}
            disabled={!this.state.yAxisPaddingEnabled}
          />
          <span>&nbsp;{this.state.yAxisPadding}</span>
        </Stack>
        <div style={{ marginTop: '20px', display: 'flex' }}>
          <ChoiceGroup
            options={yAxisTypeOptions}
            selectedKey={this.state.yAxisType}
            onChange={this._onAxisTypeChange}
            label="X-Axis type:"
          />
          &nbsp;&nbsp;
          <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onToggleGradient} />
          &nbsp;&nbsp;
          <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onToggleRoundedCorners} />
        </div>

        <div style={{ width: `${this.state.width}px`, height: '350px' }}>
          <HorizontalBarChartWithAxis
            // Force rerender when any of the following states change
            key={`${this.state.yAxisType}-${this.state.statusKey}`}
            chartTitle="Horizontal bar chart dynamic example"
            data={this.state.dynamicData}
            colors={this._colors}
            hideLegend={true}
            width={this.state.width}
            enableGradient={this.state.enableGradient}
            roundCorners={this.state.roundCorners}
            hideTickOverlap={true}
            yAxisPadding={this.state.yAxisPaddingEnabled ? this.state.yAxisPadding : undefined}
          />
        </div>
        <div>
          <DefaultButton text="Change data" onClick={this._changeData} />
          <div aria-live="polite" aria-atomic="true">
            {/* Change the key so that React treats it as an update even if the message is same */}
            <p key={this.state.statusKey} style={screenReaderOnlyStyle}>
              {this.state.statusMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  private _changeData(): void {
    this.setState(prevState => ({
      dynamicData: this._getData(this.state.dataSize, this.state.yAxisType),
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Horizontal bar chart with Axis data changed',
    }));
  }

  private _randomX(): number {
    return Math.floor(Math.random() * 90) + 1;
  }
  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: Number(e.target.value) });
  };
  private _onAxisTypeChange = (e: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption) => {
    this.setState(prevState => ({
      yAxisType: option.key,
      dynamicData: this._getData(this.state.dataSize, option.key),
      statusKey: prevState.statusKey + 1,
    }));
  };
  private _onYAxisPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState(prevState => ({
      yAxisPaddingEnabled: checked,
      statusKey: prevState.statusKey + 1,
    }));
  };
  private _onYAxisPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      yAxisPadding: Number(e.target.value),
      statusKey: prevState.statusKey + 1,
    }));
  };
  private _onDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataSize = Number(e.target.value);
    this.setState(prevState => ({
      dataSize,
      dynamicData: this._getData(dataSize, this.state.yAxisType),
      statusKey: prevState.statusKey + 1,
    }));
  };

  private _getData = (dataSize: number, yAxisType: string) => {
    const data: IHorizontalBarChartWithAxisDataPoint[] = [];
    if (yAxisType === 'string') {
      for (let i = 0; i < dataSize; i++) {
        data.push({
          x: this._randomX(),
          y: `Label ${i + 1}`,
          legend: `Label ${i + 1}`,
          color: this._colors[i % this._colors.length],
        });
      }
    } else {
      const yPoints = new Set<number>();
      while (yPoints.size !== dataSize) {
        const y = Math.floor(Math.random() * 75) + 1;
        if (!yPoints.has(y)) {
          yPoints.add(y);
          data.push({
            x: this._randomX(),
            y,
            legend: `Label ${yPoints.size}`,
            color: this._colors[y % this._colors.length],
          });
        }
      }
    }
    return data;
  };

  private _onToggleGradient = (e: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundedCorners = (e: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };
}

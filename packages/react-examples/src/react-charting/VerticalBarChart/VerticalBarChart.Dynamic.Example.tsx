import * as React from 'react';
import {
  VerticalBarChart,
  IVerticalBarChartProps,
  IVerticalBarChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Checkbox, ChoiceGroup, IChoiceGroupOption, Label, Stack, TextField } from '@fluentui/react';

export interface IExampleState {
  dynamicData: IVerticalBarChartDataPoint[];
  colors: string[];
  statusKey: number;
  statusMessage: string;
  xAxisInnerPaddingEnabled: boolean;
  xAxisOuterPaddingEnabled: boolean;
  barWidth: number | 'auto' | undefined;
  maxBarWidth: number;
  xAxisInnerPadding: number;
  xAxisOuterPadding: number;
  width: number;
  xAxisType: string;
  enableReflow: boolean;
  dataSize: number;
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

const xAxisTypeOptions: IChoiceGroupOption[] = [
  { key: 'number', text: 'Number' },
  { key: 'date', text: 'Date' },
  { key: 'string', text: 'String' },
];

export class VerticalBarChartDynamicExample extends React.Component<IVerticalBarChartProps, IExampleState> {
  private _colors = [
    [
      getColorFromToken(DataVizPalette.color1),
      getColorFromToken(DataVizPalette.color2),
      getColorFromToken(DataVizPalette.color3),
    ],
    [
      getColorFromToken(DataVizPalette.color4),
      getColorFromToken(DataVizPalette.color5),
      getColorFromToken(DataVizPalette.color6),
    ],
    [
      getColorFromToken(DataVizPalette.color7),
      getColorFromToken(DataVizPalette.color8),
      getColorFromToken(DataVizPalette.color9),
    ],
    [
      getColorFromToken(DataVizPalette.color10),
      getColorFromToken(DataVizPalette.color11),
      getColorFromToken(DataVizPalette.color12),
    ],
  ];
  private _colorIndex = 0;
  private _prevBarWidth = 16;

  constructor(props: IVerticalBarChartProps) {
    super(props);

    const initialXAxisType = xAxisTypeOptions[0].key;
    const initialDataSize = 5;

    this.state = {
      dynamicData: this._getData(initialDataSize, initialXAxisType),
      colors: this._colors[0],
      statusKey: 0,
      statusMessage: '',
      xAxisInnerPaddingEnabled: false,
      xAxisOuterPaddingEnabled: false,
      barWidth: undefined,
      maxBarWidth: 24,
      xAxisInnerPadding: 0.67,
      xAxisOuterPadding: 0,
      width: 650,
      xAxisType: initialXAxisType,
      enableReflow: false,
      dataSize: initialDataSize,
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    return (
      <>
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
            <Checkbox
              label="barWidth:&nbsp;"
              checked={typeof this.state.barWidth === 'number'}
              onChange={this._onBarWidthCheckChange}
              indeterminate={this.state.barWidth === 'auto'}
            />
            {typeof this.state.barWidth === 'number' ? (
              <TextField
                type="number"
                value={this.state.barWidth.toString()}
                min={1}
                max={300}
                onChange={this._onBarWidthChange}
              />
            ) : (
              <code>{`${this.state.barWidth}`}</code>
            )}
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor="input-maxbarwidth" style={{ fontWeight: 400 }}>
              maxBarWidth:&nbsp;
            </Label>
            <TextField
              type="number"
              value={this.state.maxBarWidth.toString()}
              min={1}
              max={300}
              id="input-maxbarwidth"
              onChange={this._onMaxBarWidthChange}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="xAxisInnerPadding:&nbsp;"
              checked={this.state.xAxisInnerPaddingEnabled}
              onChange={this._onInnerPaddingCheckChange}
              disabled={this.state.xAxisType !== 'string'}
            />
            <input
              type="range"
              value={this.state.xAxisInnerPadding}
              min={0}
              max={1}
              step={0.01}
              onChange={this._onInnerPaddingChange}
              disabled={!this.state.xAxisInnerPaddingEnabled}
            />
            <span>&nbsp;{this.state.xAxisInnerPadding}</span>
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="xAxisOuterPadding:&nbsp;"
              checked={this.state.xAxisOuterPaddingEnabled}
              onChange={this._onOuterPaddingCheckChange}
              disabled={this.state.xAxisType !== 'string'}
            />
            <input
              type="range"
              value={this.state.xAxisOuterPadding}
              min={0}
              max={1}
              step={0.01}
              onChange={this._onOuterPaddingChange}
              disabled={!this.state.xAxisOuterPaddingEnabled}
            />
            <span>&nbsp;{this.state.xAxisOuterPadding}</span>
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Checkbox
              label="enableReflow"
              checked={this.state.enableReflow}
              onChange={this._onEnableReflowCheckChange}
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
        <div style={{ marginTop: '20px' }}>
          <ChoiceGroup
            options={xAxisTypeOptions}
            selectedKey={this.state.xAxisType}
            onChange={this._onAxisTypeChange}
            label="X-Axis type:"
          />
        </div>
        <div style={{ width: `${this.state.width}px`, height: '350px' }}>
          <VerticalBarChart
            // Force rerender when any of the following states change
            key={`${this.state.xAxisType}-${this.state.enableReflow}`}
            chartTitle="Vertical bar chart dynamic example"
            data={this.state.dynamicData}
            colors={this.state.colors}
            hideLegend={true}
            yMaxValue={100}
            width={this.state.width}
            enableReflow={this.state.enableReflow}
            barWidth={this.state.barWidth}
            maxBarWidth={this.state.maxBarWidth}
            xAxisInnerPadding={this.state.xAxisInnerPaddingEnabled ? this.state.xAxisInnerPadding : undefined}
            xAxisOuterPadding={this.state.xAxisOuterPaddingEnabled ? this.state.xAxisOuterPadding : undefined}
          />
        </div>
        <div>
          <DefaultButton text="Change data" onClick={this._changeData} />
          <DefaultButton text="Change colors" onClick={this._changeColors} />
          <div aria-live="polite" aria-atomic="true">
            {/* Change the key so that React treats it as an update even if the message is same */}
            <p key={this.state.statusKey} style={screenReaderOnlyStyle}>
              {this.state.statusMessage}
            </p>
          </div>
        </div>
      </>
    );
  }

  private _changeData(): void {
    this.setState(prevState => ({
      dynamicData: this._getData(this.state.dataSize, this.state.xAxisType),
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Vertical bar chart data changed',
    }));
  }

  private _changeColors(): void {
    this._colorIndex = (this._colorIndex + 1) % this._colors.length;
    this.setState(prevState => ({
      colors: this._colors[this._colorIndex],
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Vertical bar chart colors changed',
    }));
  }

  private _randomY(): number {
    return Math.floor(Math.random() * 90) + 1;
  }

  private _onBarWidthCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    if (typeof this.state.barWidth === 'undefined') {
      this.setState({ barWidth: 'auto' });
    } else if (this.state.barWidth === 'auto') {
      this.setState({ barWidth: this._prevBarWidth });
    } else {
      this._prevBarWidth = this.state.barWidth as number;
      this.setState({ barWidth: undefined });
    }
  };
  private _onBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ barWidth: Number(newValue) });
  };
  private _onMaxBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ maxBarWidth: Number(newValue) });
  };
  private _onInnerPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ xAxisInnerPaddingEnabled: checked });
  };
  private _onInnerPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ xAxisInnerPadding: Number(e.target.value) });
  };
  private _onOuterPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ xAxisOuterPaddingEnabled: checked });
  };
  private _onOuterPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ xAxisOuterPadding: Number(e.target.value) });
  };
  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: Number(e.target.value) });
  };
  private _onAxisTypeChange = (e: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption) => {
    this.setState({ xAxisType: option.key, dynamicData: this._getData(this.state.dataSize, option.key) });
  };
  private _onEnableReflowCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ enableReflow: checked });
  };
  private _onDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataSize = Number(e.target.value);
    this.setState({ dataSize, dynamicData: this._getData(dataSize, this.state.xAxisType) });
  };

  private _getData = (dataSize: number, xAxisType: string) => {
    const data: IVerticalBarChartDataPoint[] = [];
    if (xAxisType === 'string') {
      for (let i = 0; i < dataSize; i++) {
        data.push({ x: `Label ${i + 1}`, y: this._randomY() });
      }
    } else {
      const xPoints = new Set<number>();
      const date = new Date('2020-01-01');
      while (xPoints.size !== dataSize) {
        const x = Math.floor(Math.random() * 75) + 1;
        if (!xPoints.has(x)) {
          xPoints.add(x);
          const newDate = new Date(date);
          newDate.setUTCDate(date.getUTCDate() + x);
          data.push({ x: xAxisType === 'date' ? newDate : x, y: this._randomY() });
        }
      }
      data.sort((a, b) => (a.x as number) - (b.x as number));
    }
    return data;
  };
}

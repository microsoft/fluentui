import * as React from 'react';
import {
  IHorizontalBarChartWithAxisProps,
  HorizontalBarChartWithAxis,
  IHorizontalBarChartWithAxisDataPoint,
  AxisCategoryOrder,
  getNextColor,
} from '@fluentui/react-charting';
import { DefaultButton, Dropdown, IDropdownOption, Label, Stack, getId } from '@fluentui/react';

export interface IExampleState {
  dynamicData: IHorizontalBarChartWithAxisDataPoint[];
  statusKey: number;
  statusMessage: string;
  width: number;
  height: number;
  dataSize: number;
  yAxisCategoryOrder: string;
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

const axisCategoryOrderOptions: IDropdownOption[] = [
  { key: 'default', text: 'default' },
  { key: 'data', text: 'data' },
  { key: 'category ascending', text: 'category ascending' },
  { key: 'category descending', text: 'category descending' },
  { key: 'total ascending', text: 'total ascending' },
  { key: 'total descending', text: 'total descending' },
  { key: 'min ascending', text: 'min ascending' },
  { key: 'min descending', text: 'min descending' },
  { key: 'max ascending', text: 'max ascending' },
  { key: 'max descending', text: 'max descending' },
  { key: 'sum ascending', text: 'sum ascending' },
  { key: 'sum descending', text: 'sum descending' },
  { key: 'mean ascending', text: 'mean ascending' },
  { key: 'mean descending', text: 'mean descending' },
  { key: 'median ascending', text: 'median ascending' },
  { key: 'median descending', text: 'median descending' },
];

export class HBWAAxisCategoryOrderExample extends React.Component<IHorizontalBarChartWithAxisProps, IExampleState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');
  private _dataSizeSliderId = getId('data-size-slider-');

  constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);

    const initialDataSize = 5;

    this.state = {
      dynamicData: this._getData(initialDataSize),
      statusKey: 0,
      statusMessage: '',
      width: 650,
      height: 350,
      dataSize: initialDataSize,
      yAxisCategoryOrder: 'default',
    };
  }

  public render(): JSX.Element {
    return (
      <div className="containerDiv">
        <Stack horizontal wrap tokens={{ childrenGap: '15 30' }}>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor={this._widthSliderId}>Width:&nbsp;</Label>
            <input
              type="range"
              value={this.state.width}
              min={200}
              max={1000}
              onChange={this._onWidthChange}
              id={this._widthSliderId}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor={this._heightSliderId}>Height:&nbsp;</Label>
            <input
              type="range"
              value={this.state.height}
              min={200}
              max={1000}
              onChange={this._onHeightChange}
              id={this._heightSliderId}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Label htmlFor={this._dataSizeSliderId}>Data Size:&nbsp;</Label>
            <input
              type="range"
              value={this.state.dataSize}
              min={0}
              max={50}
              onChange={this._onDataSizeChange}
              id={this._dataSizeSliderId}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <Dropdown
              label="yAxisCategoryOrder:"
              options={axisCategoryOrderOptions}
              onChange={this._onYAxisCategoryOrderChange}
              selectedKey={this.state.yAxisCategoryOrder}
            />
          </Stack>
        </Stack>

        <div style={{ width: `${this.state.width}px`, height: `${this.state.height}px`, marginTop: '20px' }}>
          <HorizontalBarChartWithAxis
            // Force rerender when any of the following states change
            key={this.state.statusKey}
            data={this.state.dynamicData}
            hideLegend={true}
            width={this.state.width}
            height={this.state.height}
            hideTickOverlap={true}
            supportNegativeData={true}
            yAxisCategoryOrder={this.state.yAxisCategoryOrder as AxisCategoryOrder}
            showYAxisLables={true}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
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

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: Number(e.target.value) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataSize = Number(e.target.value);
    this.setState(prevState => ({
      dataSize,
      dynamicData: this._getData(dataSize),
      statusKey: prevState.statusKey + 1,
    }));
  };
  private _onYAxisCategoryOrderChange = (ev: React.FormEvent<HTMLInputElement>, option: IDropdownOption): void => {
    this.setState({ yAxisCategoryOrder: option.key as string });
  };
  private _changeData = () => {
    this.setState(prevState => ({
      dynamicData: this._getData(this.state.dataSize),
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Horizontal bar chart with Axis data changed',
    }));
  };

  private _getData = (dataSize: number) => {
    const data: IHorizontalBarChartWithAxisDataPoint[] = [];
    for (let i = 0; i < dataSize; i++) {
      const x = Math.floor(Math.random() * 200) - 100;
      const yIdx = Math.floor(Math.random() * i);
      const legendIdx = Math.floor(Math.random() * i);
      data.push({
        x,
        y: `Label ${yIdx + 1}`,
        legend: `Legend ${legendIdx + 1}`,
        color: getNextColor(legendIdx),
      });
    }
    return data;
  };
}

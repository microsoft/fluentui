import * as React from 'react';
import {
  IVerticalStackedChartProps,
  VerticalStackedBarChart,
  ILineChartLineOptions,
  AxisCategoryOrder,
  getNextColor,
} from '@fluentui/react-charting';
import { DefaultButton, Dropdown, IDropdownOption, Label, Stack, getId } from '@fluentui/react';
import type { JSXElement } from '@fluentui/utilities';

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

export interface IExampleState {
  dynamicData: IVerticalStackedChartProps[];
  statusKey: number;
  statusMessage: string;
  width: number;
  height: number;
  dataSize: number;
  xAxisCategoryOrder: string;
  yMinValue: number;
  yMaxValue: number;
}

export class VSBCAxisCategoryOrderExample extends React.Component<{}, IExampleState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');
  private _dataSizeSliderId = getId('data-size-slider-');

  constructor(props: IVerticalStackedChartProps) {
    super(props);

    const initialDataSize = 5;
    const { data, yMinValue, yMaxValue } = this._getData(initialDataSize);

    this.state = {
      dynamicData: data,
      statusKey: 0,
      statusMessage: '',
      width: 650,
      height: 350,
      dataSize: initialDataSize,
      xAxisCategoryOrder: 'default',
      yMinValue,
      yMaxValue,
    };
  }

  public render(): JSXElement {
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px`, marginTop: '20px' };
    const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

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
              label="xAxisCategoryOrder:"
              options={axisCategoryOrderOptions}
              onChange={this._onXAxisCategoryOrderChange}
              selectedKey={this.state.xAxisCategoryOrder}
            />
          </Stack>
        </Stack>
        <div style={rootStyle}>
          <VerticalStackedBarChart
            // Force rerender when any of the following states change
            key={this.state.statusKey}
            data={this.state.dynamicData}
            hideLegend={true}
            width={this.state.width}
            height={this.state.height}
            barGapMax={2}
            lineOptions={lineOptions}
            hideTickOverlap={true}
            supportNegativeData={true}
            xAxisCategoryOrder={this.state.xAxisCategoryOrder as AxisCategoryOrder}
            yMinValue={this.state.yMinValue}
            yMaxValue={this.state.yMaxValue}
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
    const { data, yMinValue, yMaxValue } = this._getData(dataSize);
    this.setState(prevState => ({
      dataSize,
      dynamicData: data,
      statusKey: prevState.statusKey + 1,
      yMinValue,
      yMaxValue,
    }));
  };
  private _onXAxisCategoryOrderChange = (ev: React.FormEvent<HTMLInputElement>, option: IDropdownOption): void => {
    this.setState({ xAxisCategoryOrder: option.key as string });
  };
  private _changeData = () => {
    const { data, yMinValue, yMaxValue } = this._getData(this.state.dataSize);
    this.setState(prevState => ({
      dynamicData: data,
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Horizontal bar chart with Axis data changed',
      yMinValue,
      yMaxValue,
    }));
  };

  private _getData = (dataSize: number) => {
    const mapXToDataPoints: { [key: string]: IVerticalStackedChartProps } = {};
    for (let i = 0; i < dataSize; i++) {
      const data = Math.floor(Math.random() * 200) - 100;
      const xAxisPoint = `Label ${Math.floor(Math.random() * i) + 1}`;
      const legendIdx = Math.floor(Math.random() * i);
      if (!mapXToDataPoints[xAxisPoint]) {
        mapXToDataPoints[xAxisPoint] = {
          xAxisPoint,
          chartData: [],
        };
      }
      mapXToDataPoints[xAxisPoint].chartData.push({
        data,
        legend: `Legend ${legendIdx + 1}`,
        color: getNextColor(legendIdx),
      });
    }

    const data = Object.values(mapXToDataPoints);
    const values: number[] = [];
    data.forEach(point => {
      let positiveSum = 0;
      let negativeSum = 0;
      point.chartData.forEach(bar => {
        const value = bar.data as number;
        if (value >= 0) {
          positiveSum += value;
        } else {
          negativeSum += value;
        }
      });
      values.push(positiveSum, negativeSum);
    });

    return {
      data,
      yMinValue: Math.min(...values),
      yMaxValue: Math.max(...values),
    };
  };
}

import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart, DataVizPalette, AxisScaleType } from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption, Stack, getId } from '@fluentui/react';

const data: IChartProps = {
  chartTitle: 'Line Chart',
  lineChartData: [
    {
      legend: 'Series 1',
      data: [
        { x: 0, y: 8 },
        { x: 1, y: 7 },
        { x: 2, y: 6 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 3 },
        { x: 6, y: 2 },
        { x: 7, y: 1 },
        { x: 8, y: 0 },
      ],
      color: DataVizPalette.color1,
    },
    {
      legend: 'Series 2',
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: 5, y: 5 },
        { x: 6, y: 6 },
        { x: 7, y: 7 },
        { x: 8, y: 8 },
      ],
      color: DataVizPalette.warning,
    },
  ],
};

const scaleTypeOptions: IChoiceGroupOption[] = [
  { key: 'default', text: 'default' },
  { key: 'log', text: 'log' },
];

interface ILineChartExampleState {
  width: number;
  height: number;
  xScaleType: string;
  yScaleType: string;
}

export class LineChartLogAxisExample extends React.Component<{}, ILineChartExampleState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');

  constructor(props: ILineChartProps) {
    super(props);

    this.state = {
      width: 700,
      height: 300,
      xScaleType: 'log',
      yScaleType: 'log',
    };
  }

  public render(): JSX.Element {
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <div className="containerDiv">
        <Stack horizontal wrap tokens={{ childrenGap: '15 30' }} style={{ marginBottom: 15 }}>
          <Stack horizontal verticalAlign="center">
            <label htmlFor={this._widthSliderId}>Change Width:</label>
            <input
              type="range"
              value={this.state.width}
              min={200}
              max={1000}
              id={this._widthSliderId}
              onChange={this._onWidthChange}
              aria-valuetext={`ChangeWidthSlider${this.state.width}`}
            />
          </Stack>
          <Stack horizontal verticalAlign="center">
            <label htmlFor={this._heightSliderId}>Change Height:</label>
            <input
              type="range"
              value={this.state.height}
              min={200}
              max={1000}
              id={this._heightSliderId}
              onChange={this._onHeightChange}
              aria-valuetext={`ChangeHeightslider${this.state.height}`}
            />
          </Stack>
        </Stack>
        <Stack horizontal wrap tokens={{ childrenGap: '15 30' }} style={{ marginBottom: 15 }}>
          <ChoiceGroup
            options={scaleTypeOptions}
            selectedKey={this.state.xScaleType}
            onChange={this._onXScaleTypeChange}
            label="xScaleType"
          />
          <ChoiceGroup
            options={scaleTypeOptions}
            selectedKey={this.state.yScaleType}
            onChange={this._onYScaleTypeChange}
            label="yScaleType"
          />
        </Stack>
        <div style={rootStyle}>
          <LineChart
            data={data}
            height={this.state.height}
            width={this.state.width}
            enablePerfOptimization={true}
            hideTickOverlap={true}
            xScaleType={this.state.xScaleType as AxisScaleType}
            yScaleType={this.state.yScaleType as AxisScaleType}
          />
        </div>
      </div>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onXScaleTypeChange = (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
    this.setState({ xScaleType: option.key });
  };
  private _onYScaleTypeChange = (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
    this.setState({ yScaleType: option.key });
  };
}

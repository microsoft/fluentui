import * as React from 'react';
import { IChartProps, DataVizPalette, IScatterChartProps, ScatterChart, AxisScaleType } from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption, Stack, getId } from '@fluentui/react';

const data: IChartProps = {
  chartTitle: 'Scatter Chart',
  scatterChartData: [
    {
      legend: 'Trace 1',
      legendShape: 'circle',
      data: [
        { x: 1.2589254117941673, y: 2.4236435587418756, markerSize: 7 },
        { x: 2.39095514427051, y: 3.209069828287282, markerSize: 8 },
        { x: 4.540909610972476, y: 6.700279261114452, markerSize: 13 },
        { x: 8.624109968952766, y: 15.657933357041166, markerSize: 6 },
        { x: 16.378937069540648, y: 26.410125335101004, markerSize: 8 },
        { x: 31.10692935198609, y: 21.628233443544943, markerSize: 8 },
        { x: 59.078379115879464, y: 71.08357068207286, markerSize: 8 },
        { x: 112.20184543019641, y: 95.45928375106901, markerSize: 12 },
        { x: 213.09410153667977, y: 175.17899348200768, markerSize: 5 },
        { x: 404.70899507597613, y: 367.05817591616454, markerSize: 6 },
        { x: 768.6246100397738, y: 616.3133732775369, markerSize: 14 },
        { x: 1459.7743028861687, y: 1533.9498528438594, markerSize: 14 },
        { x: 2772.4079967417756, y: 2371.497871143982, markerSize: 5 },
        { x: 5265.366081044865, y: 3617.6579249480537, markerSize: 9 },
        { x: 10000, y: 7149.749744738273, markerSize: 12 },
      ],
      color: DataVizPalette.color1,
    },
    {
      legend: 'Trace 2',
      legendShape: 'circle',
      data: [
        { x: 3.1622776601683795, y: 2.1949926582336188, markerSize: 13 },
        { x: 6.1054022965853285, y: 4.772119103737707, markerSize: 16 },
        { x: 11.787686347935873, y: 5.594480133444149, markerSize: 17 },
        { x: 22.758459260747887, y: 22.975394675590913, markerSize: 21 },
        { x: 43.939705607607905, y: 14.632760823223153, markerSize: 24 },
        { x: 84.83428982440716, y: 49.97794497098575, markerSize: 12 },
        { x: 163.78937069540646, y: 88.37494969641493, markerSize: 21 },
        { x: 316.22776601683796, y: 259.59923251477073, markerSize: 10 },
        { x: 610.5402296585327, y: 486.6059651967493, markerSize: 24 },
        { x: 1178.7686347935867, y: 671.2364692543704, markerSize: 13 },
        { x: 2275.8459260747863, y: 1356.3898150565117, markerSize: 15 },
        { x: 4393.97056076079, y: 1697.3956575634736, markerSize: 22 },
        { x: 8483.428982440717, y: 1782.902150290326, markerSize: 19 },
        { x: 16378.937069540612, y: 7474.040318615067, markerSize: 20 },
        { x: 31622.776601683792, y: 16592.321174954774, markerSize: 14 },
      ],
      color: DataVizPalette.warning,
    },
  ],
};

const scaleTypeOptions: IChoiceGroupOption[] = [
  { key: 'default', text: 'default' },
  { key: 'log', text: 'log' },
];

interface IScatterChartExampleState {
  width: number;
  height: number;
  xScaleType: string;
  yScaleType: string;
}

export class ScatterChartLogAxisExample extends React.Component<{}, IScatterChartExampleState> {
  private _widthSliderId = getId('width-slider-');
  private _heightSliderId = getId('height-slider-');

  constructor(props: IScatterChartProps) {
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
          <ScatterChart
            data={data}
            height={this.state.height}
            width={this.state.width}
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

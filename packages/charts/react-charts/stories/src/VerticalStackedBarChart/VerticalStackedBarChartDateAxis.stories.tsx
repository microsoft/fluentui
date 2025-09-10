import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  VerticalStackedBarChart,
  VSChartDataPoint,
  VerticalStackedChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const VerticalStackedBarDateAxis = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [barGapMax, setBarGapMax] = React.useState<number>(2);
  const [barCornerRadius, setBarCornerRadius] = React.useState<number>(2);
  const [barMinimumHeight, setBarMinimumHeight] = React.useState<number>(1);
  const [selectedCallout, setSelectedCallout] = React.useState<string>('MultiCallout');

  const firstChartPoints: VSChartDataPoint[] = [
    { legend: 'meta data 1', data: 2, color: getColorFromToken(DataVizPalette.color8) },
    { legend: 'Meta data 2', data: 0.5, color: getColorFromToken(DataVizPalette.color9) },
    { legend: 'meta Data 3', data: 0, color: getColorFromToken(DataVizPalette.color10) },
  ];

  const secondChartPoints: VSChartDataPoint[] = [
    { legend: 'meta data 1', data: 30, color: getColorFromToken(DataVizPalette.color8) },
    { legend: 'Meta data 2', data: 3, color: getColorFromToken(DataVizPalette.color9) },
    { legend: 'meta Data 3', data: 40, color: getColorFromToken(DataVizPalette.color10) },
  ];

  const thirdChartPoints: VSChartDataPoint[] = [
    { legend: 'meta data 1', data: 10, color: getColorFromToken(DataVizPalette.color8) },
    { legend: 'Meta data 2', data: 60, color: getColorFromToken(DataVizPalette.color9) },
    { legend: 'meta Data 3', data: 30, color: getColorFromToken(DataVizPalette.color10) },
  ];

  const data: VerticalStackedChartProps[] = [
    {
      chartData: firstChartPoints,
      xAxisPoint: new Date('2018/03/01'),
    },
    {
      chartData: secondChartPoints,
      xAxisPoint: new Date('2018/05/01'),
    },
    {
      chartData: thirdChartPoints,
      xAxisPoint: new Date('2018/07/01'),
    },
    {
      chartData: firstChartPoints,
      xAxisPoint: new Date('2018/09/01'),
    },
    {
      chartData: thirdChartPoints,
      xAxisPoint: new Date('2018/11/01'),
    },
    {
      chartData: firstChartPoints,
      xAxisPoint: new Date('2019/02/01'),
    },
    {
      chartData: secondChartPoints,
      xAxisPoint: new Date('2019/05/01'),
    },
    {
      chartData: thirdChartPoints,
      xAxisPoint: new Date('2019/07/01'),
    },
    {
      chartData: firstChartPoints,
      xAxisPoint: new Date('2019/09/01'),
    },
  ];

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const timeFormat = '%m/%d';
  const tickValues: Date[] = [
    new Date('2018/03/01'),
    new Date('2018/05/01'),
    new Date('2018/07/01'),
    new Date('2018/09/01'),
    new Date('2018/11/01'),
    new Date('2019/02/01'),
    new Date('2019/05/01'),
    new Date('2019/07/01'),
    new Date('2019/09/01'),
  ];
  return (
    <div className="containerDiv">
      <div style={{ display: 'flex' }}>
        <label htmlFor="ChangeWidth_Styled">Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          id="ChangeWidth_Styled"
          onChange={e => setWidth(+e.target.value)}
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="changeHeight_Styled">Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Styled"
          onChange={e => setHeight(+e.target.value)}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
      </div>
      <div>
        <label htmlFor="changeBarGapMax_Styled">BarGapMax:</label>
        <input
          type="range"
          value={barGapMax}
          min={0}
          max={10}
          id="changeBarGapMax_Styled"
          onChange={e => setBarGapMax(+e.target.value)}
          aria-valuetext={`ChangebarGapMaxslider${barGapMax}`}
        />
        <label htmlFor="ChangeBarCornerRadius_condition">BarCornerRadius:</label>
        <input
          type="range"
          value={barCornerRadius}
          min={0}
          max={10}
          id="ChangeBarCornerRadius_condition"
          onChange={e => setBarCornerRadius(+e.target.value)}
          aria-valuetext={`ChangeBarCornerRadiusSlider${barCornerRadius}`}
        />
        <label htmlFor="ChangeBarMinimumHeight_condition">BarMinimumHeight:</label>
        <input
          type="range"
          value={barMinimumHeight}
          min={0}
          max={10}
          id="ChangeBarMinimumHeight_condition"
          onChange={e => setBarMinimumHeight(+e.target.value)}
          aria-valuetext={`ChangebarBarMinimumHeightslider${barMinimumHeight}`}
        />
        <Field label="Pick one">
          <RadioGroup
            defaultValue="MultiCallout"
            onChange={(_ev, option) => option && setSelectedCallout(option.value)}
          >
            <Radio value="singleCallout" label="Single callout" />
            <Radio value="MultiCallout" label="Stack callout" />
          </RadioGroup>
        </Field>
      </div>
      <div style={rootStyle}>
        <VerticalStackedBarChart
          chartTitle="Vertical stacked bar chart styled example"
          data={data}
          width={width}
          height={height}
          barGapMax={barGapMax}
          barCornerRadius={barCornerRadius}
          barMinimumHeight={barMinimumHeight}
          yAxisTickCount={10}
          tickValues={tickValues}
          tickFormat={timeFormat}
          // eslint-disable-next-line react/jsx-no-bind
          onBarClick={(event, clickData) => console.log('clicked', event, clickData)}
          yMaxValue={120}
          isCalloutForStack={selectedCallout === 'MultiCallout'}
          // eslint-disable-next-line react/jsx-no-bind
          yAxisTickFormat={(x: number | string) => `${x} h`}
          margins={{
            bottom: 35,
            top: 10,
            left: 35,
            right: 0,
          }}
          legendProps={{
            allowFocusOnLegends: true,
          }}
          svgProps={{
            'aria-label': 'Example chart with metadata per month',
          }}
          useUTC={false}
        />
      </div>
    </div>
  );
};
VerticalStackedBarDateAxis.parameters = {
  docs: {
    description: {},
  },
};

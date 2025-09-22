import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  VerticalStackedBarChart,
  VSChartDataPoint,
  VerticalStackedChartProps,
  LineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { Field, Checkbox, CheckboxOnChangeData, Radio, RadioGroup } from '@fluentui/react-components';

export const VerticalStackedBarCallout = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [barGapMax, setBarGapMax] = React.useState<number>(2);
  const [showLine, setShowLine] = React.useState<boolean>(true);
  const [selectedCallout, setSelectedCallout] = React.useState<
    'singleCallout' | 'MultiCallout' | 'MultiCustomCallout' | 'singleCustomCallout'
  >('MultiCallout');
  const [barWidth, setBarWidth] = React.useState<number>(16);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onShowLineChange = (e: React.FormEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setShowLine(checked.checked as boolean);
  };

  const firstChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 40, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata2', data: 5, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata3', data: 15, color: getColorFromToken(DataVizPalette.color6) },
  ];

  const secondChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 30, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata2', data: 3, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata3', data: 40, color: getColorFromToken(DataVizPalette.color6) },
  ];

  const thirdChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 10, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata2', data: 60, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata3', data: 30, color: getColorFromToken(DataVizPalette.color6) },
  ];
  const fourthChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 40, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata2', data: 10, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata3', data: 30, color: getColorFromToken(DataVizPalette.color6) },
  ];
  const fifthChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 40, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata2', data: 40, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata3', data: 40, color: getColorFromToken(DataVizPalette.color6) },
  ];
  const sixthChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 40, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata2', data: 20, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata3', data: 40, color: getColorFromToken(DataVizPalette.color6) },
  ];

  const seventhChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 10, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata2', data: 80, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata3', data: 20, color: getColorFromToken(DataVizPalette.color6) },
  ];
  const eightChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 50, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata2', data: 50, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata3', data: 20, color: getColorFromToken(DataVizPalette.color6) },
  ];

  const data: VerticalStackedChartProps[] = [
    {
      chartData: firstChartPoints,
      xAxisPoint: 'Jan',
      ...(showLine && { lineData: [{ y: 40, color: getColorFromToken(DataVizPalette.color10), legend: 'line1' }] }),
    },
    {
      chartData: secondChartPoints,
      xAxisPoint: 'Feb',
      ...(showLine && {
        lineData: [
          { y: 15, color: getColorFromToken(DataVizPalette.color10), legend: 'line1' },
          { y: 70, color: getColorFromToken(DataVizPalette.color7), legend: 'line3' },
        ],
      }),
    },
    {
      chartData: thirdChartPoints,
      xAxisPoint: 'March',
      ...(showLine && {
        lineData: [
          { y: 65, color: getColorFromToken(DataVizPalette.color5), legend: 'line2' },
          { y: 98, color: getColorFromToken(DataVizPalette.color7), legend: 'line3' },
        ],
      }),
    },
    {
      chartData: fourthChartPoints,
      xAxisPoint: 'April',
      ...(showLine && {
        lineData: [
          { y: 40, color: getColorFromToken(DataVizPalette.color10), legend: 'line1' },
          { y: 50, color: getColorFromToken(DataVizPalette.color5), legend: 'line2' },
          { y: 65, color: getColorFromToken(DataVizPalette.color7), legend: 'line3' },
        ],
      }),
    },
    {
      chartData: fifthChartPoints,
      xAxisPoint: 'May',
      ...(showLine && {
        lineData: [
          { y: 20, color: getColorFromToken(DataVizPalette.color10), legend: 'line1' },
          { y: 65, color: getColorFromToken(DataVizPalette.color5), legend: 'line2' },
        ],
      }),
    },
    {
      chartData: sixthChartPoints,
      xAxisPoint: 'June',
      ...(showLine && {
        lineData: [
          { y: 54, color: getColorFromToken(DataVizPalette.color5), legend: 'line2' },
          { y: 87, color: getColorFromToken(DataVizPalette.color7), legend: 'line3' },
        ],
      }),
    },
    {
      chartData: seventhChartPoints,
      xAxisPoint: 'July',
      ...(showLine && {
        lineData: [
          { y: 10, color: getColorFromToken(DataVizPalette.color10), legend: 'line1' },
          { y: 110, color: getColorFromToken(DataVizPalette.color7), legend: 'line3' },
        ],
      }),
    },
    {
      chartData: eightChartPoints,
      xAxisPoint: 'August',
      ...(showLine && {
        lineData: [
          { y: 45, color: getColorFromToken(DataVizPalette.color10), legend: 'line1' },
          { y: 87, color: getColorFromToken(DataVizPalette.color5), legend: 'line2' },
        ],
      }),
    },
    {
      chartData: firstChartPoints,
      xAxisPoint: 'September',
      ...(showLine && {
        lineData: [
          { y: 15, color: getColorFromToken(DataVizPalette.color10), legend: 'line1' },
          { y: 60, color: getColorFromToken(DataVizPalette.color7), legend: 'line3' },
        ],
      }),
    },
  ];

  const lineOptions: LineChartLineOptions = { lineBorderWidth: '2' };

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <div className="containerDiv">
      <div style={{ display: 'flex' }}>
        <label htmlFor="changeWidth_Callout">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          id="changeWidth_Callout"
          onChange={_onWidthChange}
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="changeHeight_Callout">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Callout"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
        <label htmlFor="changeBarGapMax_Callout">BarGapMax:</label>
        <input
          type="range"
          value={barGapMax}
          min={0}
          max={10}
          id="changeBarGapMax_Callout"
          onChange={e => setBarGapMax(+e.target.value)}
          aria-valuetext={`ChangebarGapMaxSlider${barGapMax}`}
        />
        <label htmlFor="barWidthSlider">BarWidth:</label>
        <input
          type="range"
          value={barWidth}
          min={1}
          max={50}
          id="barWidthSlider"
          onChange={e => setBarWidth(+e.target.value)}
          aria-valuetext={`BarWidthSlider${barWidth}`}
        />
        <span>{barWidth}</span>
      </div>
      <Field label="Pick one">
        <RadioGroup
          defaultValue="MultiCallout"
          onChange={(_ev, option) =>
            option &&
            setSelectedCallout(
              option.value as 'singleCallout' | 'MultiCallout' | 'MultiCustomCallout' | 'singleCustomCallout',
            )
          }
        >
          <Radio value="singleCallout" label="Single callout (won't work if lines are present)" />
          <Radio value="MultiCallout" label="Stack callout" />
          <Radio
            value="singleCustomCallout"
            label="single callout with custom content (won't work if lines are present)"
          />
          <Radio value="MultiCustomCallout" label="stack callout with custom content" />
        </RadioGroup>
      </Field>
      <div style={{ marginTop: '20px' }}>
        <Checkbox label="show the lines (hide or show the lines)" checked={showLine} onChange={_onShowLineChange} />
      </div>
      <div style={rootStyle}>
        <VerticalStackedBarChart
          chartTitle="Vertical stacked bar chart callout example"
          barGapMax={barGapMax}
          data={data}
          height={height}
          width={width}
          yAxisTickCount={10}
          lineOptions={lineOptions}
          isCalloutForStack={selectedCallout === 'MultiCallout' || selectedCallout === 'MultiCustomCallout'}
          yMaxValue={120}
          margins={{ left: 50 }}
          {...(selectedCallout === 'singleCustomCallout' && {
            onRenderCalloutPerDataPoint: (props: VSChartDataPoint | undefined) => {
              return (
                <div>
                  <pre>{JSON.stringify(props, undefined, 2)}</pre>
                </div>
              );
            },
          })}
          {...(selectedCallout === 'MultiCustomCallout' && {
            onRenderCalloutPerStack: (props: VerticalStackedChartProps | undefined) => {
              return (
                <div>
                  <pre>
                    <code>{JSON.stringify(props, null, 4)}</code>
                  </pre>
                </div>
              );
            },
          })}
          allowHoverOnLegend={false}
          barWidth={barWidth}
        />
      </div>
    </div>
  );
};
VerticalStackedBarCallout.parameters = {
  docs: {
    description: {},
  },
};

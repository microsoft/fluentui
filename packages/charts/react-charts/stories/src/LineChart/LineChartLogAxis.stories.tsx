import * as React from 'react';
import { ChartProps, LineChartProps, LineChart, DataVizPalette, AxisScaleType } from '@fluentui/react-charts';
import { RadioGroup, Radio, Field, JSXElement } from '@fluentui/react-components';

const data: ChartProps = {
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

export const LineChartLogAxisExample = (props: LineChartProps): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);
  const [xScaleType, setXScaleType] = React.useState<string>('log');
  const [yScaleType, setYScaleType] = React.useState<string>('log');

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onXScaleTypeChange = (event: any, d: any) => {
    setXScaleType(d.value);
  };

  const _onYScaleTypeChange = (event: any, d: any) => {
    setYScaleType(d.value);
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <div className="containerDiv">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px 30px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-width">Change Width:</label>
          <input
            type="range"
            value={width}
            min={200}
            max={1000}
            id="input-width"
            onChange={_onWidthChange}
            aria-valuetext={`ChangeWidthSlider${width}`}
          />
          <span style={{ marginLeft: '8px' }}>{width}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-height">Change Height:</label>
          <input
            type="range"
            value={height}
            min={200}
            max={1000}
            id="input-height"
            onChange={_onHeightChange}
            aria-valuetext={`ChangeHeightslider${height}`}
          />
          <span style={{ marginLeft: '8px' }}>{height}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px 30px', marginBottom: '15px' }}>
        <Field label="xScaleType">
          <RadioGroup value={xScaleType} onChange={_onXScaleTypeChange}>
            <Radio value="default" label="default" />
            <Radio value="log" label="log" />
          </RadioGroup>
        </Field>
        <Field label="yScaleType">
          <RadioGroup value={yScaleType} onChange={_onYScaleTypeChange}>
            <Radio value="default" label="default" />
            <Radio value="log" label="log" />
          </RadioGroup>
        </Field>
      </div>
      <div style={rootStyle}>
        <LineChart
          data={data}
          height={height}
          width={width}
          enablePerfOptimization={true}
          hideTickOverlap={true}
          xScaleType={xScaleType as AxisScaleType}
          yScaleType={yScaleType as AxisScaleType}
        />
      </div>
    </div>
  );
};

LineChartLogAxisExample.parameters = {
  docs: {
    description: {},
  },
};

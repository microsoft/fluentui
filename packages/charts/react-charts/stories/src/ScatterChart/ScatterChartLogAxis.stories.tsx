import * as React from 'react';
import { ChartProps, DataVizPalette, ScatterChartProps, ScatterChart, AxisScaleType } from '@fluentui/react-charts';
import { RadioGroup, Radio, Field, JSXElement } from '@fluentui/react-components';

const data: ChartProps = {
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

export const ScatterChartLogAxisExample = (props: ScatterChartProps): JSXElement => {
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
        <ScatterChart
          data={data}
          height={height}
          width={width}
          hideTickOverlap={true}
          xScaleType={xScaleType as AxisScaleType}
          yScaleType={yScaleType as AxisScaleType}
        />
      </div>
    </div>
  );
};

ScatterChartLogAxisExample.parameters = {
  docs: {
    description: {},
  },
};

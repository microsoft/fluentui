import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { LineChartProps, ChartProps, LineChart, DataVizPalette } from '@fluentui/react-charts';
import { Switch } from '@fluentui/react-components';
import { TimeLocaleDefinition } from 'd3-time-format';
import itITLocale from 'd3-time-format/locale/it-IT.json';

export const LineChartCustomLocaleDateAxis = (props: LineChartProps): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);
  const [allowMultipleShapes, setAllowMultipleShapes] = React.useState<boolean>(false);

  const customLocale = itITLocale;

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _onShapeChange = React.useCallback((ev: any) => {
    setAllowMultipleShapes(ev.currentTarget.checked);
  }, []);

  const data: ChartProps = {
    chartTitle: 'Line Chart',
    lineChartData: [
      {
        legend: 'From_Legacy_to_O365',
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 216000,
            onDataPointClick: () => alert('click on 217000'),
          },
          {
            x: new Date('2020-04-03T10:00:00.000Z'),
            y: 218123,
            onDataPointClick: () => alert('click on 217123'),
          },
          {
            x: new Date('2020-05-05T11:00:00.000Z'),
            y: 217124,
            onDataPointClick: () => alert('click on 217124'),
          },
          {
            x: new Date('2020-07-14T00:00:00.000Z'),
            y: 248000,
            onDataPointClick: () => alert('click on 248000'),
          },
          {
            x: new Date('2020-11-15T00:00:00.000Z'),
            y: 252000,
            onDataPointClick: () => alert('click on 252000'),
          },
          {
            x: new Date('2020-12-06T00:00:00.000Z'),
            y: 274000,
            onDataPointClick: () => alert('click on 274000'),
          },
          {
            x: new Date('2021-01-07T00:00:00.000Z'),
            y: 260000,
            onDataPointClick: () => alert('click on 260000'),
          },
          {
            x: new Date('2021-02-14T00:00:00.000Z'),
            y: 304000,
            onDataPointClick: () => alert('click on 300000'),
          },
          {
            x: new Date('2021-03-09T00:00:00.000Z'),
            y: 218000,
            onDataPointClick: () => alert('click on 218000'),
          },
        ],
        color: DataVizPalette.color1,
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLineClick: () => console.log('From_Legacy_to_O365'),
      },
      {
        legend: 'All',
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 297000,
          },
          {
            x: new Date('2020-04-04T00:00:00.000Z'),
            y: 284000,
          },
          {
            x: new Date('2020-05-05T00:00:00.000Z'),
            y: 282000,
          },
          {
            x: new Date('2020-06-06T00:00:00.000Z'),
            y: 294000,
          },
          {
            x: new Date('2020-09-16T00:00:00.000Z'),
            y: 224000,
          },
          {
            x: new Date('2021-02-08T00:00:00.000Z'),
            y: 300000,
          },
          {
            x: new Date('2021-03-09T00:00:00.000Z'),
            y: 298000,
          },
        ],
        color: DataVizPalette.color2,
        lineOptions: {
          lineBorderWidth: '4',
        },
      },
    ],
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const margins = { left: 35, top: 20, bottom: 35, right: 20 };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <label htmlFor="changeWidth_basic">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          id="changeWidth_Basic"
          onChange={_onWidthChange}
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Basic"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
        <Switch
          label={
            allowMultipleShapes ? 'Enabled multiple shapes for each line' : 'Disbaled multiple shapes for each line'
          }
          onChange={_onShapeChange}
          checked={allowMultipleShapes}
        />
      </div>
      <div style={rootStyle}>
        <LineChart
          culture={'rs-ss'}
          data={data}
          legendsOverflowText={'Overflow Items'}
          yMinValue={200}
          yMaxValue={301}
          height={height}
          width={width}
          margins={margins}
          xAxisTickCount={10}
          allowMultipleShapesForPoints={allowMultipleShapes}
          rotateXAxisLables={true}
          timeFormatLocale={customLocale as TimeLocaleDefinition}
          enablePerfOptimization={true}
        />
      </div>
    </>
  );
};
LineChartCustomLocaleDateAxis.parameters = {
  docs: {
    description: {},
  },
};

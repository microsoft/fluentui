import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { LineChartProps, LineChart, ChartProps, LineChartDataPoint, DataVizPalette } from '@fluentui/react-charts';
import { Switch } from '@fluentui/react-components';

export const LineChartLargeData = (props: LineChartProps): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);
  const [allowMultipleShapes, setAllowMultipleShapes] = React.useState<boolean>(false);

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

  const _getdata = () => {
    const data: LineChartDataPoint[] = [];
    const startdate = new Date('2020-03-01T00:00:00.000Z');
    for (let i = 0; i < 10000; i++) {
      data.push({ x: new Date(startdate).setHours(startdate.getHours() + i), y: 500000 });
    }
    return data;
  };

  const _getdata2 = () => {
    const data: LineChartDataPoint[] = [];
    const startdate = new Date('2020-03-01T00:00:00.000Z');
    for (let i = 1000; i < 9000; i++) {
      data.push({ x: new Date(startdate).setHours(startdate.getHours() + i), y: _getY(i) });
    }
    return data;
  };

  const _getY = (i: number) => {
    let res: number = 0;
    const newN = i % 1000;
    if (newN < 500) {
      res = newN * newN;
    } else {
      res = 1000000 - newN * newN;
    }

    return res;
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const margins = { left: 35, top: 20, bottom: 35, right: 20 };

  const data: ChartProps = {
    chartTitle: 'Line Chart',
    lineChartData: [
      {
        legend: 'From_Legacy_to_O365',
        data: _getdata(),
        color: DataVizPalette.color1,
        onLineClick: () => console.log('From_Legacy_to_O365'),
        hideNonActiveDots: true,
        lineOptions: {
          lineBorderWidth: '4',
        },
      },
      {
        legend: 'All',
        data: _getdata2(),
        color: DataVizPalette.success,
        lineOptions: {
          lineBorderWidth: '4',
        },
      },
      {
        legend: 'single point',
        data: [
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 282000,
          },
        ],
        color: DataVizPalette.color10,
      },
    ],
  };

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
            allowMultipleShapes ? 'Enabled multiple shapes for each line' : 'Disabled multiple shapes for each line'
          }
          onChange={_onShapeChange}
          checked={allowMultipleShapes}
        />
      </div>
      <div style={rootStyle}>
        <LineChart
          culture={typeof window !== 'undefined' ? window.navigator.language : 'en-us'}
          data={data}
          legendsOverflowText={'Overflow Items'}
          yMinValue={200}
          yMaxValue={301}
          height={height}
          width={width}
          margins={margins}
          allowMultipleShapesForPoints={allowMultipleShapes}
          optimizeLargeData={true}
          enablePerfOptimization={true}
        />
      </div>
    </>
  );
};
LineChartLargeData.parameters = {
  docs: {
    description: {},
  },
};

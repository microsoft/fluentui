import * as React from 'react';
import { ILineChartProps, LineChart, IChartProps, ILineChartDataPoint } from '../../src/LineChart';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Switch } from '@fluentui/react-components';

export const LCLargeData = (props: ILineChartProps) => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);
  const [allowMultipleShapes, setAllowMultipleShapes] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onShapeChange = React.useCallback(
    ev => {
      setAllowMultipleShapes(ev.currentTarget.checked);
    },
    [allowMultipleShapes],
  );

  const _getdata = () => {
    const data: ILineChartDataPoint[] = [];
    const startdate = new Date('2020-03-01T00:00:00.000Z');
    for (let i = 0; i < 10000; i++) {
      data.push({ x: new Date(startdate).setHours(startdate.getHours() + i), y: 500000 });
    }
    return data;
  };

  const _getdata2 = () => {
    const data: ILineChartDataPoint[] = [];
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

  const data: IChartProps = {
    chartTitle: 'Line Chart',
    lineChartData: [
      {
        legend: 'From_Legacy_to_O365',
        data: _getdata(),
        color: DefaultPalette.blue,
        onLineClick: () => console.log('From_Legacy_to_O365'),
        hideNonActiveDots: true,
        lineOptions: {
          lineBorderWidth: '4',
        },
      },
      {
        legend: 'All',
        data: _getdata2(),
        color: DefaultPalette.green,
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
        color: DefaultPalette.yellow,
      },
    ],
  };

  return (
    <>
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
        label={allowMultipleShapes ? 'Disable multiple shapes for each line' : 'Enable multiple shapes for each line'}
        onChange={_onShapeChange}
        checked={allowMultipleShapes}
      />
      <div style={rootStyle}>
        <LineChart
          culture={window.navigator.language}
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
LCLargeData.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};

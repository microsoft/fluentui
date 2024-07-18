import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart, DataVizPalette } from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';

export const LCBasic = (props: ILineChartProps) => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);
  const [allowMultipleShapes, setAllowMultipleShapes] = React.useState<boolean>(false);
  const [showAxisTitles, setShowAxisTitles] = React.useState<boolean>(true);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onShapeChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    setAllowMultipleShapes(checked);
  };

  const _onToggleAxisTitlesCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    setShowAxisTitles(checked);
  };

  const data: IChartProps = {
    chartTitle: 'Line Chart Basic Example',
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
            x: new Date('2020-03-03T10:00:00.000Z'),
            y: 218123,
            onDataPointClick: () => alert('click on 217123'),
          },
          {
            x: new Date('2020-03-03T11:00:00.000Z'),
            y: 217124,
            onDataPointClick: () => alert('click on 217124'),
          },
          {
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 248000,
            onDataPointClick: () => alert('click on 248000'),
          },
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 252000,
            onDataPointClick: () => alert('click on 252000'),
          },
          {
            x: new Date('2020-03-06T00:00:00.000Z'),
            y: 274000,
            onDataPointClick: () => alert('click on 274000'),
          },
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: 260000,
            onDataPointClick: () => alert('click on 260000'),
          },
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: 304000,
            onDataPointClick: () => alert('click on 300000'),
          },
          {
            x: new Date('2020-03-09T00:00:00.000Z'),
            y: 218000,
            onDataPointClick: () => alert('click on 218000'),
          },
        ],
        color: DataVizPalette.color3,
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
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 284000,
          },
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 282000,
          },
          {
            x: new Date('2020-03-06T00:00:00.000Z'),
            y: 294000,
          },
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: 224000,
          },
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: 300000,
          },
          {
            x: new Date('2020-03-09T00:00:00.000Z'),
            y: 298000,
          },
        ],
        color: DataVizPalette.color4,
        lineOptions: {
          lineBorderWidth: '4',
        },
      },
      {
        legend: 'single point',
        data: [
          {
            x: new Date('2020-03-05T12:00:00.000Z'),
            y: 232000,
          },
        ],
        color: DataVizPalette.color5,
      },
    ],
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const margins = { left: 35, top: 20, bottom: 35, right: 20 };

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
      <Toggle
        label="Enabled  multiple shapes for each line"
        onText="On"
        offText="Off"
        onChange={_onShapeChange}
        checked={allowMultipleShapes}
      />
      <Toggle
        label="Toggle Axis titles"
        onText="Show axis titles"
        offText="Hide axis titles"
        checked={showAxisTitles}
        onChange={_onToggleAxisTitlesCheckChange}
        styles={{ root: { marginTop: '10px' } }}
      />
      {showAxisTitles && (
        <div style={rootStyle}>
          <LineChart
            culture={window.navigator.language}
            data={data}
            legendsOverflowText={'Overflow Items'}
            yMinValue={200}
            yMaxValue={301}
            height={height}
            width={width}
            xAxisTickCount={10}
            allowMultipleShapesForPoints={allowMultipleShapes}
            enablePerfOptimization={true}
            yAxisTitle={showAxisTitles ? 'Different categories of mail flow' : undefined}
            xAxisTitle={showAxisTitles ? 'Values of each category' : undefined}
          />
        </div>
      )}
      {!showAxisTitles && (
        <div style={rootStyle}>
          <LineChart
            culture={window.navigator.language}
            data={data}
            legendsOverflowText={'Overflow Items'}
            yMinValue={200}
            yMaxValue={301}
            height={height}
            width={width}
            xAxisTickCount={10}
            allowMultipleShapesForPoints={allowMultipleShapes}
            enablePerfOptimization={true}
          />
        </div>
      )}
    </>
  );
};
LCBasic.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};

import * as React from 'react';
import {  ILineChartProps, LineChart} from '../../src/LineChart';
import { getColorFromToken, DataVizPalette } from '../../src/utilities/colors';
import { Switch } from '@fluentui/react-components';

export const LCCustomAccess = (props: ILineChartProps) => {
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

  const _onLegendClickHandler = (selectedLegend: string | null): void => {
    if (selectedLegend !== null) {
      console.log(`Selected legend - ${selectedLegend}`);
    }
  };

  const points = [
    {
      data: [
        {
          x: new Date('2018/01/01'),
          y: 10,
          xAxisCalloutData: '2018/01/01',
          yAxisCalloutData: '10%',
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 2018/01/01' },
          callOutAccessibilityData: { ariaLabel: 'Line series 1 of 5 Point 1 First 10%' },
        },
        {
          x: new Date('2018/02/01'),
          y: 30,
          xAxisCalloutData: '2018/01/15',
          yAxisCalloutData: '18%',
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 2018/01/15' },
          callOutAccessibilityData: { ariaLabel: 'Line series 2 of 5 Point 1 First 18%' },
        },
        {
          x: new Date('2018/03/01'),
          y: 10,
          xAxisCalloutData: '2018/01/28',
          yAxisCalloutData: '24%',
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 2018/01/28' },
          callOutAccessibilityData: { ariaLabel: 'Line series 3 of 5 Point 1 First 24%' },
        },
        {
          x: new Date('2018/04/01'),
          y: 30,
          xAxisCalloutData: '2018/02/01',
          yAxisCalloutData: '25%',
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 2018/02/01' },
          callOutAccessibilityData: { ariaLabel: 'Line series 4 of 5 Point 1 First 25%' },
        },
        {
          x: new Date('2018/05/01'),
          y: 10,
          xAxisCalloutData: '2018/03/01',
          yAxisCalloutData: '15%',
          xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 2018/03/01' },
          callOutAccessibilityData: { ariaLabel: 'Line series 5 of 5 Point 1 First 15%' },
        },
      ],
      legend: 'First',
      color: DataVizPalette.color4,
      lineOptions: {
        lineBorderWidth: '4',
      },
      onLegendClick: _onLegendClickHandler,
    },
    {
      data: [
        {
          x: new Date('2018/01/01'),
          y: 30,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 30' },
        },
        {
          x: new Date('2018/02/01'),
          y: 50,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 50' },
        },
        {
          x: new Date('2018/03/01'),
          y: 30,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 30' },
        },
        {
          x: new Date('2018/04/01'),
          y: 50,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 50' },
        },
        {
          x: new Date('2018/05/01'),
          y: 30,
          callOutAccessibilityData: { ariaLabel: 'Point 2 Second 30' },
        },
      ],
      legend: 'Second',
      color: DataVizPalette.color5,
      lineOptions: {
        lineBorderWidth: '4',
      },
      onLegendClick: _onLegendClickHandler,
    },
    {
      data: [
        { x: new Date('2018/01/01'), y: 50, callOutAccessibilityData: { ariaLabel: 'Point 3 Third 50' } },
        { x: new Date('2018/02/01'), y: 70, callOutAccessibilityData: { ariaLabel: 'Point 3 Third 70' } },
        { x: new Date('2018/03/01'), y: 50, callOutAccessibilityData: { ariaLabel: 'Point 3 Third 50' } },
        { x: new Date('2018/04/01'), y: 70, callOutAccessibilityData: { ariaLabel: 'Point 3 Third 70' } },
        { x: new Date('2018/05/01'), y: 50, callOutAccessibilityData: { ariaLabel: 'Point 3 Third 50' } },
      ],
      legend: 'Third',
      color: DataVizPalette.color6,
      lineOptions: {
        lineBorderWidth: '4',
      },
      onLegendClick: _onLegendClickHandler,
    },
  ];

  const data = {
    chartTitle: 'Line Chart Custom Accessibility Example',
    lineChartData: points,
  };
  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const timeFormat = '%m/%d';
  // Passing tick values is optional, for more control.
  // If you do not pass them the line chart will render them for you based on D3's standard.
  const tickValues: Date[] = [
    new Date('01-01-2018'),
    new Date('02-01-2018'),
    new Date('03-01-2018'),
    new Date('04-01-2018'),
    new Date('05-01-2018'),
  ];

  const colorFillBarData = [
    {
      legend: 'Time range 1',
      color: getColorFromToken(DataVizPalette.color11),
      data: [
        {
          startX: new Date('2018/01/06'),
          endX: new Date('2018/01/25'),
        },
      ],
    },
    {
      legend: 'Time range 2',
      color: getColorFromToken(DataVizPalette.color10),
      data: [
        {
          startX: new Date('2018/01/18'),
          endX: new Date('2018/02/20'),
        },
        {
          startX: new Date('2018/04/17'),
          endX: new Date('2018/05/10'),
        },
      ],
      applyPattern: true,
    },
  ];

  return (
    <>
      <label htmlFor="changeWidth_Custom">Change Width:</label>
      <input
        type="range"
        value={width}
        min={200}
        max={1000}
        id="changeWidth_Custom"
        onChange={_onWidthChange}
        aria-valuetext={`ChangeWidthSlider${width}`}
      />
      <label htmlFor="changeHeight_Custom">Change Height:</label>
      <input
        type="range"
        value={height}
        min={200}
        max={1000}
        id="changeHeight_Custom"
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
          data={data}
          strokeWidth={4}
          tickFormat={timeFormat}
          tickValues={tickValues}
          height={height}
          width={width}
          enableReflow={true}
          legendProps={{ canSelectMultipleLegends: true, allowFocusOnLegends: true }}
          colorFillBars={colorFillBarData}
          allowMultipleShapesForPoints={allowMultipleShapes}
          enablePerfOptimization={true}
        />
      </div>
    </>
  );
};
LCCustomAccess.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};

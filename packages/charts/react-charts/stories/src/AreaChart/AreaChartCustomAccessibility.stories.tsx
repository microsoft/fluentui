import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { AreaChart, DataVizPalette } from '@fluentui/react-charts';
import * as d3 from 'd3-format';

export const AreaChartCustomAccessibility = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const chart1Points = [
    {
      x: 20,
      y: 9,
      xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 20' },
      callOutAccessibilityData: { ariaLabel: 'Point 1 of 5 in First series. X value 20 Y value $9' },
    },
    {
      x: 40,
      y: 20,
      xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 40' },
      callOutAccessibilityData: { ariaLabel: 'Point 2 of 5 in First series. X value 40 Y value $20' },
    },
    {
      x: 55,
      y: 27,
      xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 55' },
      callOutAccessibilityData: { ariaLabel: 'Point 3 of 5 in First series. X value 55 Y value $27' },
    },
    {
      x: 60,
      y: 37,
      xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 60' },
      callOutAccessibilityData: { ariaLabel: 'Point 4 of 5 in First series. X value 60 Y value $37' },
    },
    {
      x: 65,
      y: 51,
      xAxisCalloutAccessibilityData: { ariaLabel: 'x-Axis 65' },
      callOutAccessibilityData: { ariaLabel: 'Point 5 of 5 in First series. X value 65 Y value $51' },
    },
  ];

  const chart2Points = [
    {
      x: 20,
      y: 21,
      callOutAccessibilityData: {
        ariaLabel: 'First of 5 points in Second series. X coordinate is 20 and Y coordinate is $21',
      },
    },
    {
      x: 40,
      y: 25,
      callOutAccessibilityData: {
        ariaLabel: 'Second of 5 points in Second series. X coordinate is 40 and Y coordinate is $25',
      },
    },
    {
      x: 55,
      y: 23,
      callOutAccessibilityData: {
        ariaLabel: 'Third of 5 points in Second series. X coordinate is 55 and Y coordinate is $23',
      },
    },
    {
      x: 60,
      y: 7,
      callOutAccessibilityData: {
        ariaLabel: 'Fourth of 5 points in Second series. X coordinate is 60 and Y coordinate is $7',
      },
    },
    {
      x: 65,
      y: 55,
      callOutAccessibilityData: {
        ariaLabel: 'Fifth of 5 points in Second series. X coordinate is 65 and Y coordinate is $55',
      },
    },
  ];

  const chart3Points = [
    {
      x: 20,
      y: 30,
      callOutAccessibilityData: {
        ariaLabel: 'First of 5 points in Third series. X coordinate is 20 and Y coordinate is $30',
      },
    },
    {
      x: 40,
      y: 35,
      callOutAccessibilityData: {
        ariaLabel: 'Second of 5 points in Third series. X coordinate is 40 and Y coordinate is $35',
      },
    },
    {
      x: 55,
      y: 33,
      callOutAccessibilityData: {
        ariaLabel: 'Third of 5 points in Third series. X coordinate is 55 and Y coordinate is $33',
      },
    },
    {
      x: 60,
      y: 40,
      callOutAccessibilityData: {
        ariaLabel: 'Fourth of 5 points in Third series. X coordinate is 60 and Y coordinate is $40',
      },
    },
    {
      x: 65,
      y: 10,
      callOutAccessibilityData: {
        ariaLabel: 'Fifth of 5 points in Third series. X coordinate is 65 and Y coordinate is $10',
      },
    },
  ];

  const chartPoints = [
    {
      legend: 'First',
      data: chart1Points,
      color: DataVizPalette.color8,
    },
    {
      legend: 'Second',
      data: chart2Points,
      color: DataVizPalette.color9,
    },
    {
      legend: 'Third',
      data: chart3Points,
      color: DataVizPalette.color10,
    },
  ];

  const chartData = {
    chartTitle: 'Area chart Custom Accessibility example',
    lineChartData: chartPoints,
  };
  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <>
      <div style={{ display: 'flex' }}>
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
      </div>
      <div style={rootStyle}>
        <AreaChart
          height={height}
          width={width}
          data={chartData}
          legendsOverflowText={'Overflow Items'}
          yAxisTickFormat={d3.format('$,')}
          enablePerfOptimization={true}
          legendProps={{
            allowFocusOnLegends: true,
          }}
        />
      </div>
    </>
  );
};
AreaChartCustomAccessibility.parameters = {
  docs: {
    description: {},
  },
};

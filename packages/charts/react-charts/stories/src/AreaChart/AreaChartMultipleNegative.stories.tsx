import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { AreaChart, DataVizPalette } from '@fluentui/react-charts';
import * as d3 from 'd3-format';

export const AreaChartMultipleNegative = (): JSXElement => {
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
      y: -9,
    },
    {
      x: 25,
      y: 14,
    },
    {
      x: 30,
      y: -14,
    },
    {
      x: 35,
      y: 23,
    },
    {
      x: 40,
      y: -20,
    },
    {
      x: 45,
      y: 31,
    },
    {
      x: 50,
      y: -29,
    },
    {
      x: 55,
      y: 27,
    },
    {
      x: 60,
      y: -37,
    },
    {
      x: 65,
      y: 51,
    },
  ];

  const chart2Points = [
    {
      x: 20,
      y: 21,
    },
    {
      x: 25,
      y: -25,
    },
    {
      x: 30,
      y: 10,
    },
    {
      x: 35,
      y: -10,
    },
    {
      x: 40,
      y: 14,
    },
    {
      x: 45,
      y: -18,
    },
    {
      x: 50,
      y: 9,
    },
    {
      x: 55,
      y: -23,
    },
    {
      x: 60,
      y: 7,
    },
    {
      x: 65,
      y: -55,
    },
  ];

  const chart3Points = [
    {
      x: 20,
      y: 30,
    },
    {
      x: 25,
      y: 35,
    },
    {
      x: 30,
      y: -33,
    },
    {
      x: 35,
      y: 40,
    },
    {
      x: 40,
      y: 10,
    },
    {
      x: 45,
      y: -40,
    },
    {
      x: 50,
      y: 34,
    },
    {
      x: 55,
      y: 40,
    },
    {
      x: 60,
      y: -60,
    },
    {
      x: 65,
      y: 40,
    },
  ];

  const chartPoints = [
    {
      legend: 'legend1',
      data: chart1Points,
      color: DataVizPalette.color4,
    },
    {
      legend: 'legend2',
      data: chart2Points,
      color: DataVizPalette.color5,
    },
    {
      legend: 'legend3',
      data: chart3Points,
      color: DataVizPalette.color6,
    },
  ];

  const chartData = {
    chartTitle: 'Area chart multiple negative y example',
    lineChartData: chartPoints,
  };
  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <label htmlFor="changeWidth_Multiple">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          id="changeWidth_Multiple"
          onChange={_onWidthChange}
          aria-valuetext={`ChangeWidthslider${width}`}
        />
        <label htmlFor="changeHeight_Multiple">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Multiple"
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
AreaChartMultipleNegative.parameters = {
  docs: {
    description: {},
  },
};

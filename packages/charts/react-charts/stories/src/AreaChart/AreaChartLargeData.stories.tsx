import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { AreaChart, DataVizPalette } from '@fluentui/react-charts';

type IChartPoint = {
  x: number;
  y: number;
};

const createLargeDataSet = (count: number, phaseOffset: number, amplitude: number, baseline: number): IChartPoint[] => {
  const points: IChartPoint[] = [];

  for (let i = 0; i < count; i++) {
    const trend = i * 0.015;
    const wave1 = Math.sin((i + phaseOffset) * 0.08) * amplitude;
    const wave2 = Math.cos((i + phaseOffset) * 0.03) * (amplitude * 0.35);
    const y = Math.max(0, Math.round(baseline + trend + wave1 + wave2));

    points.push({
      x: i,
      y,
    });
  }

  return points;
};

const DATA_POINT_COUNT = 5000;

export const AreaChartLargeData = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const chart1Points = React.useMemo(() => createLargeDataSet(DATA_POINT_COUNT, 0, 26, 60), []);
  const chart2Points = React.useMemo(() => createLargeDataSet(DATA_POINT_COUNT, 17, 22, 48), []);
  const chart3Points = React.useMemo(() => createLargeDataSet(DATA_POINT_COUNT, 41, 30, 56), []);

  const chartPoints = [
    {
      legend: 'legend1',
      data: chart1Points,
      color: DataVizPalette.color11,
    },
    {
      legend: 'legend2',
      data: chart2Points,
      color: DataVizPalette.color12,
    },
    {
      legend: 'legend3',
      data: chart3Points,
      color: DataVizPalette.color13,
    },
  ];

  const chartData = {
    chartTitle: `Area chart large data example (${DATA_POINT_COUNT} points per series)`,
    lineChartData: chartPoints,
  };
  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <label htmlFor="changeWidth_Large">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          id="changeWidth_Large"
          onChange={_onWidthChange}
          aria-label="Change Width"
          aria-valuetext={`current value ${width}, Minimum 200 and Maximum 1000`}
        />
        <label htmlFor="changeHeight_Large">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Large"
          onChange={_onHeightChange}
          aria-label="Change Height"
          aria-valuetext={`current value ${height}, Minimum 200 and Maximum 1000`}
        />
      </div>
      <div style={rootStyle}>
        <AreaChart
          height={height}
          width={width}
          data={chartData}
          legendsOverflowText={'Overflow Items'}
          legendProps={{
            allowFocusOnLegends: true,
          }}
          optimizeLargeData
        />
      </div>
    </>
  );
};
AreaChartLargeData.parameters = {
  docs: {
    description: {
      story:
        'This story demonstrates an AreaChart with a large dataset, allowing dynamic resizing of the chart container.',
    },
  },
};

import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { ChartProps, DataVizPalette, ScatterChart, ScatterChartPoints } from '@fluentui/react-charts';

export default {
  title: 'Charts/ScatterChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof ScatterChart>;

export const Basic = () => {
  const scatterChartPoints: ScatterChartPoints[] = [
    {
      legend: 'Phase 1',
      data: [
        { x: 10, y: 50000, markerSize: 12 },
        { x: 20, y: 75000, markerSize: 15 },
        { x: 30, y: 90000, markerSize: 18 },
        { x: 40, y: 120000, markerSize: 22 },
        { x: 50, y: 150000, markerSize: 25 },
      ],
      color: DataVizPalette.color3,
    },
    {
      legend: 'Phase 2',
      data: [
        { x: 60, y: 180000, markerSize: 28 },
        { x: 70, y: 200000, markerSize: 30 },
        { x: 80, y: 220000, markerSize: 32 },
        { x: 90, y: 250000, markerSize: 35 },
        { x: 100, y: 300000, markerSize: 40 },
      ],
      color: DataVizPalette.color4,
    },
    {
      legend: 'Milestone',
      data: [{ x: 75, y: 250000, markerSize: 50 }],
      color: DataVizPalette.color5,
    },
  ];

  const data: ChartProps = {
    chartTitle: 'Project Revenue and Transactions Over Time',
    scatterChartData: scatterChartPoints,
  };

  const rootStyle = { width: `650px`, height: `350px` };

  return (
    <div style={rootStyle}>
      <ScatterChart
        culture="en-US"
        data={data}
        height={350}
        width={650}
        xAxisTitle={'Days since project start'}
        yAxisTitle={'Revenue in dollars'}
      />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/**
 * Multi-series with a string (band) x-axis — exercises the categorical axis path and
 * the multi-legend row, which are styled separately from the numeric-axis path above.
 */
export const MultiSeriesStringAxis = () => {
  const scatterChartPoints: ScatterChartPoints[] = [
    {
      legend: 'Region 1',
      data: [
        { x: 'Electronics', y: 50000, markerSize: 25 },
        { x: 'Furniture', y: 30000, markerSize: 20 },
        { x: 'Clothing', y: 20000, markerSize: 15 },
        { x: 'Toys', y: 15000, markerSize: 10 },
        { x: 'Books', y: 10000, markerSize: 8 },
      ],
      color: DataVizPalette.color3,
    },
    {
      legend: 'Region 2',
      data: [
        { x: 'Electronics', y: 60000, markerSize: 30 },
        { x: 'Furniture', y: 25000, markerSize: 18 },
        { x: 'Clothing', y: 22000, markerSize: 16 },
        { x: 'Toys', y: 12000, markerSize: 12 },
        { x: 'Books', y: 8000, markerSize: 6 },
      ],
      color: DataVizPalette.color4,
    },
    {
      legend: 'Region 3',
      data: [
        { x: 'Electronics', y: 42000, markerSize: 22 },
        { x: 'Furniture', y: 38000, markerSize: 24 },
        { x: 'Clothing', y: 16000, markerSize: 14 },
        { x: 'Toys', y: 21000, markerSize: 17 },
        { x: 'Books', y: 6000, markerSize: 5 },
      ],
      color: DataVizPalette.color6,
    },
  ];

  const data: ChartProps = {
    chartTitle: 'Sales Performance by Category',
    scatterChartData: scatterChartPoints,
  };

  const rootStyle = { width: `650px`, height: `350px` };

  return (
    <div style={rootStyle}>
      <ScatterChart
        culture="en-US"
        data={data}
        height={350}
        width={650}
        hideTickOverlap={true}
        legendsOverflowText={'Overflow Items'}
        xAxisTitle={'Product category'}
        yAxisTitle={'Revenue in dollars'}
      />
    </div>
  );
};

MultiSeriesStringAxis.storyName = 'Multi Series - String Axis';

export const MultiSeriesStringAxisRTL = getStoryVariant(MultiSeriesStringAxis, RTL);

export const MultiSeriesStringAxisDarkMode = getStoryVariant(MultiSeriesStringAxis, DARK_MODE);

/**
 * Legend-free variant: `hideLegend` removes the whole legends surface, isolating the
 * plot area / marker / axis styling. Date axis is pinned to fixed ISO instants with
 * explicit tickValues so the rendering is deterministic.
 */
export const HideLegend = () => {
  const scatterChartPoints: ScatterChartPoints[] = [
    {
      legend: 'Server A',
      data: [
        { x: new Date('2020-03-03T00:00:00.000Z'), y: 21000, markerSize: 14 },
        { x: new Date('2020-03-05T00:00:00.000Z'), y: 25200, markerSize: 18 },
        { x: new Date('2020-03-07T00:00:00.000Z'), y: 26000, markerSize: 12 },
        { x: new Date('2020-03-09T00:00:00.000Z'), y: 21800, markerSize: 22 },
      ],
      color: DataVizPalette.color9,
    },
    {
      legend: 'Server B',
      data: [
        { x: new Date('2020-03-03T00:00:00.000Z'), y: 29700, markerSize: 20 },
        { x: new Date('2020-03-05T00:00:00.000Z'), y: 28200, markerSize: 16 },
        { x: new Date('2020-03-07T00:00:00.000Z'), y: 22400, markerSize: 26 },
        { x: new Date('2020-03-09T00:00:00.000Z'), y: 29800, markerSize: 10 },
      ],
      color: DataVizPalette.color10,
    },
  ];

  const data: ChartProps = {
    chartTitle: 'Scatter chart hidden legends example',
    scatterChartData: scatterChartPoints,
  };

  const tickValues: Date[] = [
    new Date('2020-03-03T00:00:00.000Z'),
    new Date('2020-03-05T00:00:00.000Z'),
    new Date('2020-03-07T00:00:00.000Z'),
    new Date('2020-03-09T00:00:00.000Z'),
  ];

  const rootStyle = { width: `650px`, height: `350px` };

  return (
    <div style={rootStyle}>
      <ScatterChart
        culture="en-US"
        data={data}
        height={350}
        width={650}
        hideLegend={true}
        // useUTC pins the axis labels to UTC so they do not shift with the runner's
        // local timezone (or its DST boundaries) between baseline and comparison runs.
        useUTC={true}
        tickFormat={'%m/%d'}
        tickValues={tickValues}
      />
    </div>
  );
};

export const HideLegendRTL = getStoryVariant(HideLegend, RTL);

export const HideLegendDarkMode = getStoryVariant(HideLegend, DARK_MODE);

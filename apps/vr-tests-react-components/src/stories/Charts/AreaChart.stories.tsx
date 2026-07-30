import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { AreaChart, ChartProps, DataVizPalette, LineChartPoints } from '@fluentui/react-charts';

export default {
  title: 'Charts/AreaChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof AreaChart>;

export const Basic = () => {
  const chart1Points = [
    { x: 20, y: 7000, xAxisCalloutData: '2018/01/01', yAxisCalloutData: '35%' },
    { x: 25, y: 9000, xAxisCalloutData: '2018/01/15', yAxisCalloutData: '45%' },
    { x: 30, y: 13000, xAxisCalloutData: '2018/01/28', yAxisCalloutData: '65%' },
    { x: 35, y: 15000, xAxisCalloutData: '2018/02/01', yAxisCalloutData: '75%' },
    { x: 40, y: 11000, xAxisCalloutData: '2018/03/01', yAxisCalloutData: '55%' },
    { x: 45, y: 8760, xAxisCalloutData: '2018/03/15', yAxisCalloutData: '43%' },
    { x: 50, y: 3500, xAxisCalloutData: '2018/03/28', yAxisCalloutData: '18%' },
    { x: 55, y: 20000, xAxisCalloutData: '2018/04/04', yAxisCalloutData: '100%' },
    { x: 60, y: 17000, xAxisCalloutData: '2018/04/15', yAxisCalloutData: '85%' },
    { x: 65, y: 1000, xAxisCalloutData: '2018/05/05', yAxisCalloutData: '5%' },
    { x: 70, y: 12000, xAxisCalloutData: '2018/06/01', yAxisCalloutData: '60%' },
    { x: 75, y: 6876, xAxisCalloutData: '2018/01/15', yAxisCalloutData: '34%' },
    { x: 80, y: 12000, xAxisCalloutData: '2018/04/30', yAxisCalloutData: '60%' },
    { x: 85, y: 7000, xAxisCalloutData: '2018/05/04', yAxisCalloutData: '35%' },
    { x: 90, y: 10000, xAxisCalloutData: '2018/06/01', yAxisCalloutData: '50%' },
  ];

  const chartPoints: LineChartPoints[] = [
    {
      legend: 'legend1',
      data: chart1Points,
      color: DataVizPalette.color1,
    },
    {
      legend: 'legend2',
      data: chart1Points.map(point => ({ ...point, y: point.y + 5000 })),
      color: DataVizPalette.color2,
    },
    {
      legend: 'legend3',
      data: chart1Points.map(point => ({ ...point, y: point.y + 7000 })),
      color: DataVizPalette.color3,
    },
  ];

  const chartData: ChartProps = {
    chartTitle: 'Area chart basic example',
    lineChartData: chartPoints,
  };

  const rootStyle = { width: `700px`, height: `300px` };

  return (
    <div style={rootStyle}>
      <AreaChart
        culture="en-US"
        height={300}
        width={700}
        data={chartData}
        enablePerfOptimization={true}
        yAxisTitle="Variation of stock market prices"
        xAxisTitle="Number of days"
      />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

export const Multiple = () => {
  const chart1Points = [
    { x: 20, y: 9 },
    { x: 25, y: 14 },
    { x: 30, y: 14 },
    { x: 35, y: 23 },
    { x: 40, y: 20 },
    { x: 45, y: 31 },
    { x: 50, y: 29 },
    { x: 55, y: 27 },
    { x: 60, y: 37 },
    { x: 65, y: 51 },
  ];

  const chart2Points = [
    { x: 20, y: 21 },
    { x: 25, y: 25 },
    { x: 30, y: 10 },
    { x: 35, y: 10 },
    { x: 40, y: 14 },
    { x: 45, y: 18 },
    { x: 50, y: 9 },
    { x: 55, y: 23 },
    { x: 60, y: 7 },
    { x: 65, y: 55 },
  ];

  const chart3Points = [
    { x: 20, y: 30 },
    { x: 25, y: 35 },
    { x: 30, y: 33 },
    { x: 35, y: 40 },
    { x: 40, y: 10 },
    { x: 45, y: 40 },
    { x: 50, y: 34 },
    { x: 55, y: 40 },
    { x: 60, y: 42 },
    { x: 65, y: 33 },
  ];

  const chart4Points = [
    { x: 20, y: 12 },
    { x: 25, y: 18 },
    { x: 30, y: 22 },
    { x: 35, y: 16 },
    { x: 40, y: 28 },
    { x: 45, y: 24 },
    { x: 50, y: 18 },
    { x: 55, y: 31 },
    { x: 60, y: 26 },
    { x: 65, y: 20 },
  ];

  const chartPoints: LineChartPoints[] = [
    { legend: 'Metadata info multi lines text', data: chart1Points, color: DataVizPalette.color5 },
    { legend: 'Interactive Element', data: chart2Points, color: DataVizPalette.color6 },
    { legend: 'Single point', data: chart3Points, color: DataVizPalette.color7 },
    { legend: 'Fourth series', data: chart4Points, color: DataVizPalette.color8 },
  ];

  const chartData: ChartProps = {
    chartTitle: 'Area chart multiple series example',
    lineChartData: chartPoints,
  };

  const rootStyle = { width: `700px`, height: `300px` };

  return (
    <div style={rootStyle}>
      <AreaChart
        culture="en-US"
        height={300}
        width={700}
        data={chartData}
        legendsOverflowText={'Overflow Items'}
        enablePerfOptimization={true}
      />
    </div>
  );
};

export const MultipleRTL = getStoryVariant(Multiple, RTL);

export const MultipleDarkMode = getStoryVariant(Multiple, DARK_MODE);

/**
 * Legend-free variant: `hideLegend` removes the whole legends surface, so this story
 * isolates the plot area / axes / gradient fill styling from any legend rendering.
 * Uses a pinned date axis (fixed ISO instants + explicit tickValues) to stay deterministic.
 */
export const HideLegend = () => {
  const chartPoints: LineChartPoints[] = [
    {
      legend: 'From_Legacy_to_O365',
      data: [
        { x: new Date('2020-03-03T00:00:00.000Z'), y: 216000 },
        { x: new Date('2020-03-04T00:00:00.000Z'), y: 248000 },
        { x: new Date('2020-03-05T00:00:00.000Z'), y: 252000 },
        { x: new Date('2020-03-06T00:00:00.000Z'), y: 274000 },
        { x: new Date('2020-03-07T00:00:00.000Z'), y: 260000 },
        { x: new Date('2020-03-08T00:00:00.000Z'), y: 304000 },
        { x: new Date('2020-03-09T00:00:00.000Z'), y: 218000 },
      ],
      color: DataVizPalette.color9,
    },
    {
      legend: 'All',
      data: [
        { x: new Date('2020-03-03T00:00:00.000Z'), y: 297000 },
        { x: new Date('2020-03-04T00:00:00.000Z'), y: 284000 },
        { x: new Date('2020-03-05T00:00:00.000Z'), y: 282000 },
        { x: new Date('2020-03-06T00:00:00.000Z'), y: 294000 },
        { x: new Date('2020-03-07T00:00:00.000Z'), y: 224000 },
        { x: new Date('2020-03-08T00:00:00.000Z'), y: 300000 },
        { x: new Date('2020-03-09T00:00:00.000Z'), y: 298000 },
      ],
      color: DataVizPalette.color10,
    },
  ];

  const chartData: ChartProps = {
    chartTitle: 'Area chart hidden legends example',
    lineChartData: chartPoints,
  };

  const tickValues: Date[] = [
    new Date('2020-03-03T00:00:00.000Z'),
    new Date('2020-03-05T00:00:00.000Z'),
    new Date('2020-03-07T00:00:00.000Z'),
    new Date('2020-03-09T00:00:00.000Z'),
  ];

  const rootStyle = { width: `700px`, height: `300px` };

  return (
    <div style={rootStyle}>
      <AreaChart
        culture="en-US"
        height={300}
        width={700}
        data={chartData}
        hideLegend={true}
        mode={'tozeroy'}
        enableGradient={true}
        // useUTC pins the axis labels to UTC so they do not shift with the runner's
        // local timezone (or its DST boundaries) between baseline and comparison runs.
        useUTC={true}
        tickFormat={'%m/%d'}
        tickValues={tickValues}
        enablePerfOptimization={true}
      />
    </div>
  );
};

export const HideLegendRTL = getStoryVariant(HideLegend, RTL);

export const HideLegendDarkMode = getStoryVariant(HideLegend, DARK_MODE);

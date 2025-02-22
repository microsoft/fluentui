import * as React from 'react';
import type { Meta } from '@storybook/react';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { Steps, StoryWright } from 'storywright';
import {
  IChartProps,
  HorizontalBarChart,
  HorizontalBarChartVariant,
  IHorizontalBarChartWithAxisDataPoint,
  HorizontalBarChartWithAxis,
} from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react';

export default {
  title: 'react-charting/HorizontalBarChart',

  decorators: [
    (story, context) => TestWrapperDecorator(story, context),
    (story, context) => {
      const steps =
        context.name.includes('Basic') && !context.name.includes('RTL')
          ? new Steps()
              .snapshot('default', { cropTo: '.testWrapper' })
              .executeScript(
                // eslint-disable-next-line @fluentui/max-len
                `document.querySelectorAll('g[id^="_HorizontalLine"]')[2].children[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true }));`,
              )
              .snapshot('hover', { cropTo: '.testWrapper' })
              .end()
          : new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
      return <StoryWright steps={steps}>{story(context)}</StoryWright>;
    },
  ],
} satisfies Meta<typeof HorizontalBarChart>;

export const Basic = () => {
  const hideRatio: boolean[] = [true, false];
  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, y: 15000 },
          color: DefaultPalette.tealDark,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '10%',
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, y: 15000 },
          color: DefaultPalette.purple,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '5%',
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, y: 15000 },
          color: DefaultPalette.redDark,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '59%',
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, y: 15000 },
          color: DefaultPalette.themeDarkAlt,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '105%',
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, y: 15000 },
          color: DefaultPalette.themePrimary,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '76%',
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, y: 15000 },
          color: DefaultPalette.greenDark,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '93%',
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, y: 15000 },
          color: DefaultPalette.accent,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '65%',
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, y: 15000 },
          color: DefaultPalette.blueLight,
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '28%',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <HorizontalBarChart culture="en-US" data={data} hideRatio={hideRatio} width={600} />
    </div>
  );
};

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

export const BasicRTL = getStoryVariant(Basic, RTL);

export const WithBenchmark = () => {
  const hideRatio: boolean[] = [true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          data: 50,
          horizontalBarChartdata: { x: 10, y: 100 },
          color: DefaultPalette.tealDark,
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          data: 30,
          horizontalBarChartdata: { x: 30, y: 200 },
          color: DefaultPalette.purple,
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          data: 5,
          horizontalBarChartdata: { x: 15, y: 50 },
          color: DefaultPalette.redDark,
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <HorizontalBarChart data={data} hideRatio={hideRatio} width={600} chartDataMode="fraction" />
    </div>
  );
};

WithBenchmark.storyName = 'With_Benchmark';

export const WithBenchmarkDarkMode = getStoryVariant(WithBenchmark, DARK_MODE);

export const WithBenchmarkRTL = getStoryVariant(WithBenchmark, RTL);

export const Variant = () => {
  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, y: 15000 },
          color: DefaultPalette.tealDark,
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, y: 15000 },
          color: DefaultPalette.purple,
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, y: 15000 },
          color: DefaultPalette.redDark,
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, y: 15000 },
          color: DefaultPalette.themeDarkAlt,
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, y: 15000 },
          color: DefaultPalette.themePrimary,
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, y: 15000 },
          color: DefaultPalette.greenDark,
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, y: 15000 },
          color: DefaultPalette.accent,
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, y: 15000 },
          color: DefaultPalette.blueLight,
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <HorizontalBarChart
        data={data}
        variant={HorizontalBarChartVariant.AbsoluteScale}
        hideLabels={false}
      />
    </div>
  );
};

export const VariantDarkMode = getStoryVariant(Variant, DARK_MODE);

export const VariantRTL = getStoryVariant(Variant, RTL);

export const WithAxis = () => {
  const points: IHorizontalBarChartWithAxisDataPoint[] = [
    {
      x: 10000,
      y: 5000,
      legend: 'Oranges',
      color: DefaultPalette.accent,
      yAxisCalloutData: '2020/04/30',
      xAxisCalloutData: '10%',
    },
    {
      x: 20000,
      y: 50000,
      legend: 'Dogs',
      color: DefaultPalette.blueDark,
      yAxisCalloutData: '2020/04/30',
      xAxisCalloutData: '20%',
    },
    {
      x: 25000,
      y: 30000,
      legend: 'Apples',
      color: DefaultPalette.blueMid,
      yAxisCalloutData: '2020/04/30',
      xAxisCalloutData: '37%',
    },

    {
      x: 40000,
      y: 13000,
      legend: 'Bananas',
      color: DefaultPalette.blueLight,
      yAxisCalloutData: '2020/04/30',
      xAxisCalloutData: '88%',
    },
  ];

  //const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

  const rootStyle = { width: `${650}px`, height: `${350}px`, padding: '10px' };

  return (
    <div style={rootStyle}>
      <HorizontalBarChartWithAxis
        culture="en-US"
        chartTitle="Horizontal bar chart basic example "
        data={points}
        width={650}
        useSingleColor={false}
        height={350}
      />
    </div>
  );
};

WithAxis.storyName = 'With_Axis';

export const WithAxisDarkMode = getStoryVariant(WithAxis, DARK_MODE);

export const WithAxisRTL = getStoryVariant(WithAxis, RTL);

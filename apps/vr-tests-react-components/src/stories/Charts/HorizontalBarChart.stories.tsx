import * as React from 'react';
import type { Meta } from '@storybook/react';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { Steps, StoryWright } from 'storywright';
import { ChartProps, HorizontalBarChart, HorizontalBarChartVariant } from '@fluentui/react-charts';

export default {
  title: 'Charts/HorizontalBarChart',

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
  const data: ChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, total: 15000 },
          color: '#4cb4b7',
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
          horizontalBarChartdata: { x: 800, total: 15000 },
          color: '#800080',
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
          horizontalBarChartdata: { x: 8888, total: 15000 },
          color: '#ff0000',
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
          horizontalBarChartdata: { x: 15888, total: 15000 },
          color: '#fbc0c3',
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
          horizontalBarChartdata: { x: 11444, total: 15000 },
          color: '#f7630c',
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
          horizontalBarChartdata: { x: 14000, total: 15000 },
          color: '#107c10',
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
          horizontalBarChartdata: { x: 9855, total: 15000 },
          color: '#6e0811',
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
          horizontalBarChartdata: { x: 4250, total: 15000 },
          color: '#3a96dd',
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

  const data: ChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          data: 50,
          horizontalBarChartdata: { x: 10, total: 100 },
          color: '#4cb4b7',
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          data: 30,
          horizontalBarChartdata: { x: 30, total: 200 },
          color: '#800080',
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          data: 5,
          horizontalBarChartdata: { x: 15, total: 50 },
          color: '#ff0000',
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
  const data: ChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, total: 15000 },
          color: '#4cb4b7',
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, total: 15000 },
          color: '#800080',
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, total: 15000 },
          color: '#ff0000',
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, total: 15000 },
          color: '#fbc0c3',
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, total: 15000 },
          color: '#f7630c',
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, total: 15000 },
          color: '#107c10',
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, total: 15000 },
          color: '#6e0811',
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, total: 15000 },
          color: '#3a96dd',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <HorizontalBarChart data={data} variant={HorizontalBarChartVariant.AbsoluteScale} hideLabels={false} />
    </div>
  );
};

export const VariantDarkMode = getStoryVariant(Variant, DARK_MODE);

export const VariantRTL = getStoryVariant(Variant, RTL);

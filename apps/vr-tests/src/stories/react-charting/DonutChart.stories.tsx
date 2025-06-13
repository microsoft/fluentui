import * as React from 'react';
import type { Meta } from '@storybook/react';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { Steps, StoryWright } from 'storywright';
import { IChartProps, IChartDataPoint, DonutChart } from '@fluentui/react-charting';

export default {
  title: 'react-charting/DonutChart',

  decorators: [
    (story, context) => TestWrapperDecorator(story, context),
    (story, context) => {
      const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
      return <StoryWright steps={steps}>{story(context)}</StoryWright>;
    },
  ],
} satisfies Meta<typeof DonutChart>;

export const Basic = () => {
  const points: IChartDataPoint[] = [
    { legend: 'first', data: 20000, color: '#DADADA', xAxisCalloutData: '2020/04/30' },
    { legend: 'second', data: 39000, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
  ];

  const data: IChartProps = {
    chartTitle: 'Donut chart basic example',
    chartData: points,
  };
  return (
    <div style={{ padding: 10 }}>
      <DonutChart
        culture="en-US"
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={false}
        height={220}
        width={176}
        valueInsideDonut={39000}
      />
    </div>
  );
};

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

export const BasicRTL = getStoryVariant(Basic, RTL);

export const Dynamic = () => {
  const data: IChartProps = {
    chartTitle: 'Donut chart dynamic example',
    chartData: [
      {
        legend: 'first',
        data: Math.floor(120),
        color: '#00bcf2',
      },
      {
        legend: 'second',
        data: Math.floor(130),
        color: '#b4a0ff',
      },
      {
        legend: 'third',
        data: Math.floor(10),
        color: '#fff100',
      },
      {
        legend: 'fourth',
        data: Math.floor(270),
        color: '#605e5c',
      },
    ],
  };

  return (
    <div style={{ padding: 10 }}>
      <DonutChart
        data={data}
        innerRadius={35}
        legendProps={{
          allowFocusOnLegends: true,
        }}
        hideLabels={false}
        showLabelsInPercent={false}
      />
    </div>
  );
};

export const DynamicDarkMode = getStoryVariant(Dynamic, DARK_MODE);

export const DynamicRTL = getStoryVariant(Dynamic, RTL);

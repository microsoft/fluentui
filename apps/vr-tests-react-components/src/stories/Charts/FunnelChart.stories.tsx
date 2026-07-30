import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { DataVizPalette, FunnelChart, getColorFromToken } from '@fluentui/react-charts';
import type { FunnelChartDataPoint } from '@fluentui/react-charts';

export default {
  title: 'Charts/FunnelChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof FunnelChart>;

const basicData: FunnelChartDataPoint[] = [
  { stage: 'Visitors', value: 1000, color: getColorFromToken(DataVizPalette.color5) },
  { stage: 'Signups', value: 600, color: getColorFromToken(DataVizPalette.color6) },
  { stage: 'Trials', value: 300, color: getColorFromToken(DataVizPalette.color10) },
  { stage: 'Customers', value: 250, color: getColorFromToken(DataVizPalette.color3) },
];

const stackedData: FunnelChartDataPoint[] = [
  {
    stage: 'Awareness',
    subValues: [
      { category: 'Organic', value: 600, color: getColorFromToken(DataVizPalette.color1) },
      { category: 'Paid', value: 400, color: getColorFromToken(DataVizPalette.color2) },
    ],
  },
  {
    stage: 'Consideration',
    subValues: [
      { category: 'Organic', value: 350, color: getColorFromToken(DataVizPalette.color1) },
      { category: 'Paid', value: 250, color: getColorFromToken(DataVizPalette.color2) },
    ],
  },
  {
    stage: 'Purchase',
    subValues: [
      { category: 'Organic', value: 150, color: getColorFromToken(DataVizPalette.color1) },
      { category: 'Paid', value: 100, color: getColorFromToken(DataVizPalette.color2) },
    ],
  },
];

const rootStyle = { width: '520px', height: '380px' };

export const Basic = () => {
  return (
    <div style={rootStyle}>
      <FunnelChart data={basicData} chartTitle="Basic Funnel Chart" width={500} height={360} orientation="horizontal" />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/**
 * Stacked funnel (per-stage subValues) in the vertical orientation — the second segment
 * geometry code path plus category-keyed legends.
 */
export const StackedVertical = () => {
  return (
    <div style={rootStyle}>
      <FunnelChart
        data={stackedData}
        chartTitle="Stacked Funnel Chart"
        width={500}
        height={360}
        orientation="vertical"
      />
    </div>
  );
};

export const StackedVerticalRTL = getStoryVariant(StackedVertical, RTL);

export const StackedVerticalDarkMode = getStoryVariant(StackedVertical, DARK_MODE);

/**
 * Opens the shared ChartPopover (non-Cartesian shape) by dispatching a mouseover on the
 * first funnel segment — the LineChart/VerticalStackedBarChart executeScript technique.
 */
export const PopoverOpen = () => {
  return (
    <div style={rootStyle}>
      <FunnelChart
        data={basicData}
        chartTitle="Funnel chart popover example"
        width={500}
        height={360}
        orientation="horizontal"
      />
    </div>
  );
};

PopoverOpen.parameters = {
  storyWright: {
    steps: new Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      // Funnel segments carry stable ids; dispatch a real mouseover so the chart opens its popover.
      .executeScript(
        `document.getElementById('funnel-segment-1').dispatchEvent(new MouseEvent('mouseover',{bubbles: true,cancelable: true}))`,
      )
      .snapshot('popover-open', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;

export const PopoverOpenRTL = getStoryVariant(PopoverOpen, RTL);

export const PopoverOpenDarkMode = getStoryVariant(PopoverOpen, DARK_MODE);

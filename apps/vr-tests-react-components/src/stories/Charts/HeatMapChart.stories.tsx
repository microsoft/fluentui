import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { HeatMapChart } from '@fluentui/react-charts';
import type { HeatMapChartProps } from '@fluentui/react-charts';

export default {
  title: 'Charts/HeatMapChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof HeatMapChart>;

/**
 * String x/y axes on purpose: date axes route through `d3TimeFormat` with the machine's
 * local timezone (the same seam behind the suite's timezone-gated jest skips), and a VR
 * baseline must not encode the capture machine's offset.
 */
const heatMapData: HeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Excellent (0-200)',
    data: [
      { x: 'Mon', y: 'Ohio', value: 150, rectText: 150, ratio: [150, 2391] },
      {
        x: 'Wed',
        y: 'Texas',
        value: 46,
        rectText: 46,
        ratio: [46, 2391],
        descriptionMessage: 'air quality is excellent',
      },
      { x: 'Thu', y: 'DC', value: 120, rectText: 120, ratio: [120, 2462] },
    ],
  },
  {
    value: 250,
    legend: 'Good (201-300)',
    data: [
      { x: 'Mon', y: 'Alaska', value: 265, rectText: 265, ratio: [265, 2479] },
      { x: 'Tue', y: 'Ohio', value: 310, rectText: 310, ratio: [310, 2043] },
      { x: 'Wed', y: 'DC', value: 290, rectText: 290, ratio: [290, 2462] },
      { x: 'Thu', y: 'NYC', value: 280, rectText: 280, ratio: [280, 2486] },
    ],
  },
  {
    value: 400,
    legend: 'Poor (301-500)',
    data: [
      { x: 'Tue', y: 'Texas', value: 430, rectText: 430, ratio: [430, 2391] },
      { x: 'Thu', y: 'Alaska', value: 470, rectText: 470, ratio: [470, 2479] },
    ],
  },
];

const domainValuesForColorScale: number[] = [0, 600];
const rangeValuesForColorScale: string[] = ['lightblue', 'darkblue'];

const rootStyle = { width: '650px', height: '350px' };

export const Basic = () => {
  return (
    <div style={rootStyle}>
      <HeatMapChart
        chartTitle="Heat map chart basic example"
        data={heatMapData}
        domainValuesForColorScale={domainValuesForColorScale}
        rangeValuesForColorScale={rangeValuesForColorScale}
        width={650}
        height={350}
      />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/**
 * Category-ordered axes + a divergent color range — the sortAxisCategories code path and a
 * second color scale.
 */
export const SortedByValue = () => {
  return (
    <div style={rootStyle}>
      <HeatMapChart
        chartTitle="Heat map chart sorted example"
        data={heatMapData}
        domainValuesForColorScale={[0, 300, 600]}
        rangeValuesForColorScale={['green', 'yellow', 'red']}
        xAxisCategoryOrder="total descending"
        yAxisCategoryOrder="total ascending"
        width={650}
        height={350}
      />
    </div>
  );
};

export const SortedByValueRTL = getStoryVariant(SortedByValue, RTL);

export const SortedByValueDarkMode = getStoryVariant(SortedByValue, DARK_MODE);

/**
 * Opens the shared ChartPopover (ratio + description-message shape) by dispatching a
 * mouseover on a data rectangle — the LineChart/VerticalStackedBarChart executeScript
 * technique. clientX/clientY are set so the popover anchors inside the chart.
 */
export const PopoverOpen = () => {
  return (
    <div style={rootStyle}>
      <HeatMapChart
        chartTitle="Heat map chart popover example"
        data={heatMapData}
        domainValuesForColorScale={domainValuesForColorScale}
        rangeValuesForColorScale={rangeValuesForColorScale}
        width={650}
        height={350}
      />
    </div>
  );
};

PopoverOpen.parameters = {
  storyWright: {
    steps: new Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      // Data cells are <g role="img"> groups; dispatch a real mouseover so the chart opens
      // its popover (the handler reads clientX/clientY for positioning).
      .executeScript(
        `document.querySelectorAll('g[role="img"][fill-opacity]')[0].dispatchEvent(new MouseEvent('mouseover',{bubbles: true,cancelable: true,clientX: 220,clientY: 140}))`,
      )
      .snapshot('popover-open', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;

export const PopoverOpenRTL = getStoryVariant(PopoverOpen, RTL);

export const PopoverOpenDarkMode = getStoryVariant(PopoverOpen, DARK_MODE);

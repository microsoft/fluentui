import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { DataVizPalette, SankeyChart, getColorFromToken } from '@fluentui/react-charts';
import type { ChartProps } from '@fluentui/react-charts';

export default {
  title: 'Charts/SankeyChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof SankeyChart>;

const data: ChartProps = {
  chartTitle: 'Sankey chart basic example',
  SankeyChartData: {
    nodes: [
      {
        nodeId: 0,
        name: 'node0',
        color: getColorFromToken(DataVizPalette.color2),
        borderColor: getColorFromToken(DataVizPalette.color22),
      },
      {
        nodeId: 1,
        name: 'node1 with a long truncating name',
        color: getColorFromToken(DataVizPalette.color7),
        borderColor: getColorFromToken(DataVizPalette.color27),
      },
      {
        nodeId: 2,
        name: 'node2',
        color: getColorFromToken(DataVizPalette.color8),
        borderColor: getColorFromToken(DataVizPalette.color28),
      },
      {
        nodeId: 3,
        name: 'node3',
        color: getColorFromToken(DataVizPalette.color9),
        borderColor: getColorFromToken(DataVizPalette.color29),
      },
      {
        nodeId: 4,
        name: 'node4',
        color: getColorFromToken(DataVizPalette.color11),
        borderColor: getColorFromToken(DataVizPalette.color8),
      },
      {
        nodeId: 5,
        name: 'node5',
        color: getColorFromToken(DataVizPalette.color12),
        borderColor: getColorFromToken(DataVizPalette.color24),
      },
    ],
    links: [
      { source: 0, target: 2, value: 2 },
      { source: 1, target: 2, value: 2 },
      { source: 1, target: 3, value: 2 },
      { source: 0, target: 4, value: 2 },
      { source: 2, target: 3, value: 2 },
      { source: 2, target: 4, value: 2 },
      { source: 3, target: 4, value: 4 },
      { source: 3, target: 5, value: 4 },
    ],
  },
};

const rootStyle = { width: '650px', height: '400px' };

export const Basic = () => {
  return (
    <div style={rootStyle}>
      <SankeyChart data={data} />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/**
 * No per-node colors — exercises the DEFAULT_NODE_COLORS cyclic assignment path
 * (assignNodeColors) and the default '#757575'/'#F5F5F5' fallbacks, plus no chart title.
 */
const defaultColorsData: ChartProps = {
  SankeyChartData: {
    nodes: [
      { nodeId: 0, name: 'first' },
      { nodeId: 1, name: 'second' },
      { nodeId: 2, name: 'third' },
      { nodeId: 3, name: 'fourth' },
    ],
    links: [
      { source: 0, target: 2, value: 4 },
      { source: 1, target: 2, value: 3 },
      { source: 1, target: 3, value: 2 },
      { source: 2, target: 3, value: 5 },
    ],
  },
};

export const DefaultColors = () => {
  return (
    <div style={rootStyle}>
      <SankeyChart data={defaultColorsData} />
    </div>
  );
};

export const DefaultColorsRTL = getStoryVariant(DefaultColors, RTL);

export const DefaultColorsDarkMode = getStoryVariant(DefaultColors, DARK_MODE);

/**
 * Opens the chart's callout (SankeyChart composes ChartPopover on stream hover) by
 * dispatching a mouseover on the first link `<path role="img">` — the HeatMapChart
 * clientX/clientY executeScript technique (the handler reads the coordinates for
 * positioning). Node `<rect>`s are also role="img", so the selector pins the tag name.
 */
export const PopoverOpen = () => {
  return (
    <div style={rootStyle}>
      <SankeyChart data={data} />
    </div>
  );
};

PopoverOpen.parameters = {
  storyWright: {
    steps: new Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .executeScript(
        `document.querySelectorAll('path[role="img"]')[0].dispatchEvent(new MouseEvent('mouseover',{bubbles: true,cancelable: true,clientX: 320,clientY: 200}))`,
      )
      .snapshot('popover-open', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;

export const PopoverOpenRTL = getStoryVariant(PopoverOpen, RTL);

export const PopoverOpenDarkMode = getStoryVariant(PopoverOpen, DARK_MODE);

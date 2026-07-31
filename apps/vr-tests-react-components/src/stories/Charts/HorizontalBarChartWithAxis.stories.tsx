import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { DataVizPalette, HorizontalBarChartWithAxis, getColorFromToken } from '@fluentui/react-charts';
import type { HorizontalBarChartWithAxisDataPoint } from '@fluentui/react-charts';

export default {
  title: 'Charts/HorizontalBarChartWithAxis',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof HorizontalBarChartWithAxis>;

const numericPoints: HorizontalBarChartWithAxisDataPoint[] = [
  {
    x: 10000,
    y: 5000,
    legend: 'Oranges',
    color: getColorFromToken(DataVizPalette.color1),
    yAxisCalloutData: 'Oranges range',
    xAxisCalloutData: '10%',
  },
  {
    x: 20000,
    y: 50000,
    legend: 'Dogs',
    color: getColorFromToken(DataVizPalette.color2),
    yAxisCalloutData: 'Dogs range',
    xAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: getColorFromToken(DataVizPalette.color3),
    yAxisCalloutData: 'Apples range',
    xAxisCalloutData: '37%',
  },
  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: getColorFromToken(DataVizPalette.color4),
    yAxisCalloutData: 'Bananas range',
    xAxisCalloutData: '88%',
  },
];

const stringPoints: HorizontalBarChartWithAxisDataPoint[] = [
  { x: 10000, y: 'Oranges', legend: 'Oranges', color: getColorFromToken(DataVizPalette.color1) },
  { x: 20000, y: 'Dogs', legend: 'Dogs', color: getColorFromToken(DataVizPalette.color2) },
  { x: 25000, y: 'Apples', legend: 'Apples', color: getColorFromToken(DataVizPalette.color3) },
  { x: 40000, y: 'Bananas', legend: 'Bananas', color: getColorFromToken(DataVizPalette.color4) },
];

const rootStyle = { width: '650px', height: '350px' };

/** Numeric y-axis — the `_createNumericBars` path, with bar labels. */
export const Basic = () => {
  return (
    <div style={rootStyle}>
      <HorizontalBarChartWithAxis
        chartTitle="Horizontal bar chart with axis basic example"
        data={numericPoints}
        height={350}
        width={650}
      />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/** String y-axis + rounded corners — the `_createStringBars` band-scale path. */
export const StringYAxis = () => {
  return (
    <div style={rootStyle}>
      <HorizontalBarChartWithAxis
        chartTitle="Horizontal bar chart with string y-axis"
        data={stringPoints}
        height={350}
        width={650}
        roundCorners={true}
      />
    </div>
  );
};

export const StringYAxisRTL = getStoryVariant(StringYAxis, RTL);

export const StringYAxisDarkMode = getStoryVariant(StringYAxis, DARK_MODE);

/**
 * Opens the chart's callout (delegated to the shared ChartPopover through CartesianChart)
 * by dispatching a mouseover on the first bar `<rect role="option">` — the HeatMapChart
 * clientX/clientY executeScript technique (the hover handler reads the coordinates for
 * positioning).
 */
export const PopoverOpen = () => {
  return (
    <div style={rootStyle}>
      <HorizontalBarChartWithAxis
        chartTitle="Horizontal bar chart popover example"
        data={numericPoints}
        height={350}
        width={650}
      />
    </div>
  );
};

PopoverOpen.parameters = {
  storyWright: {
    steps: new Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .executeScript(
        `document.querySelectorAll('rect[role="option"]')[0].dispatchEvent(new MouseEvent('mouseover',{bubbles: true,cancelable: true,clientX: 220,clientY: 140}))`,
      )
      .snapshot('popover-open', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;

export const PopoverOpenRTL = getStoryVariant(PopoverOpen, RTL);

export const PopoverOpenDarkMode = getStoryVariant(PopoverOpen, DARK_MODE);

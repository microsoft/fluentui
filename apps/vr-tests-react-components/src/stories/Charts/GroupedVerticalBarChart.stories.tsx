import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { DataVizPalette, getColorFromToken, GroupedVerticalBarChart } from '@fluentui/react-charts';

export default {
  title: 'Charts/GroupedVerticalBarChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof GroupedVerticalBarChart>;

const basicData = [
  {
    name: 'Jan - Mar',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: getColorFromToken(DataVizPalette.color3),
        legend: '2022',
        xAxisCalloutData: '2022/04/30',
        yAxisCalloutData: '29%',
      },
      {
        key: 'series2',
        data: 44000,
        color: getColorFromToken(DataVizPalette.color4),
        legend: '2023',
        xAxisCalloutData: '2023/04/30',
        yAxisCalloutData: '44%',
      },
      {
        key: 'series3',
        data: 54000,
        color: getColorFromToken(DataVizPalette.color5),
        legend: '2024',
        xAxisCalloutData: '2024/04/30',
        yAxisCalloutData: '44%',
      },
    ],
  },
  {
    name: 'Apr - Jun',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: getColorFromToken(DataVizPalette.color3),
        legend: '2022',
        xAxisCalloutData: '2022/05/30',
        yAxisCalloutData: '29%',
      },
      {
        key: 'series2',
        data: 3000,
        color: getColorFromToken(DataVizPalette.color4),
        legend: '2023',
        xAxisCalloutData: '2023/05/30',
        yAxisCalloutData: '3%',
      },
      {
        key: 'series3',
        data: 12000,
        color: getColorFromToken(DataVizPalette.color5),
        legend: '2024',
        xAxisCalloutData: '2024/05/30',
        yAxisCalloutData: '12%',
      },
    ],
  },
  {
    name: 'Jul - Sep',
    series: [
      {
        key: 'series1',
        data: 14000,
        color: getColorFromToken(DataVizPalette.color3),
        legend: '2022',
        xAxisCalloutData: '2022/06/30',
        yAxisCalloutData: '13%',
      },
      {
        key: 'series2',
        data: 50000,
        color: getColorFromToken(DataVizPalette.color4),
        legend: '2023',
        xAxisCalloutData: '2023/06/30',
        yAxisCalloutData: '50%',
      },
      {
        key: 'series3',
        data: 26000,
        color: getColorFromToken(DataVizPalette.color5),
        legend: '2024',
        xAxisCalloutData: '2024/06/30',
        yAxisCalloutData: '26%',
      },
    ],
  },
];

const rootStyle = { width: '650px', height: '350px' };

export const Basic = () => {
  return (
    <div style={rootStyle}>
      <GroupedVerticalBarChart
        culture="en-US"
        chartTitle="Grouped vertical bar chart basic example"
        data={basicData}
        height={350}
        width={650}
        xAxisTitle="Quarter"
        yAxisTitle="Revenue"
      />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/**
 * Shows the per-group total labels (`barLabel` slot — rendered because the computed bar
 * width at 650px/3 groups is >= 16px); `roundCorners` exercises the rounded-rect path.
 */
export const WideBarsWithLabels = () => {
  return (
    <div style={rootStyle}>
      <GroupedVerticalBarChart
        culture="en-US"
        chartTitle="Grouped vertical bar chart labels example"
        data={basicData}
        height={350}
        width={650}
        roundCorners={true}
      />
    </div>
  );
};

export const WideBarsWithLabelsRTL = getStoryVariant(WideBarsWithLabels, RTL);

export const WideBarsWithLabelsDarkMode = getStoryVariant(WideBarsWithLabels, DARK_MODE);

/**
 * Opens the ChartPopover (the shared per-chart callout) by dispatching a mouseover on the
 * first bar — the same executeScript technique LineChart's `Basic` story uses for its
 * callout snapshot. Together with VerticalStackedBarChart's PopoverOpen story this
 * pixel-gates the ChartPopover conversion.
 */
export const PopoverOpen = () => {
  return (
    <div style={rootStyle}>
      <GroupedVerticalBarChart
        culture="en-US"
        chartTitle="Grouped vertical bar chart popover example"
        data={basicData}
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
      // Bars carry role="option"; dispatch a real mouseover so the chart opens its popover.
      .executeScript(
        `document.querySelectorAll('rect[role="option"]')[0].dispatchEvent(new MouseEvent('mouseover',{bubbles: true,cancelable: true}))`,
      )
      .snapshot('popover-open', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;

export const PopoverOpenRTL = getStoryVariant(PopoverOpen, RTL);

export const PopoverOpenDarkMode = getStoryVariant(PopoverOpen, DARK_MODE);

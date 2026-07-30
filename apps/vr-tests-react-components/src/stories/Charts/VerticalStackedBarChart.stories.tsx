import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { DataVizPalette, getColorFromToken, VerticalStackedBarChart } from '@fluentui/react-charts';
import type { VSChartDataPoint, VerticalStackedChartProps } from '@fluentui/react-charts';

export default {
  title: 'Charts/VerticalStackedBarChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof VerticalStackedBarChart>;

const firstChartPoints: VSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 40,
    color: getColorFromToken(DataVizPalette.color1),
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
  },
  {
    legend: 'Metadata2',
    data: 5,
    color: getColorFromToken(DataVizPalette.color2),
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '5%',
  },
  {
    legend: 'Metadata3',
    data: 20,
    color: getColorFromToken(DataVizPalette.color3),
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
];

const secondChartPoints: VSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 30,
    color: getColorFromToken(DataVizPalette.color1),
    xAxisCalloutData: '2020/05/30',
    yAxisCalloutData: '33%',
  },
  {
    legend: 'Metadata2',
    data: 20,
    color: getColorFromToken(DataVizPalette.color2),
    xAxisCalloutData: '2020/05/30',
    yAxisCalloutData: '22%',
  },
  {
    legend: 'Metadata3',
    data: 40,
    color: getColorFromToken(DataVizPalette.color3),
    xAxisCalloutData: '2020/05/30',
    yAxisCalloutData: '45%',
  },
];

const thirdChartPoints: VSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 44,
    color: getColorFromToken(DataVizPalette.color1),
    xAxisCalloutData: '2020/06/30',
    yAxisCalloutData: '43%',
  },
  {
    legend: 'Metadata2',
    data: 28,
    color: getColorFromToken(DataVizPalette.color2),
    xAxisCalloutData: '2020/06/30',
    yAxisCalloutData: '27%',
  },
  {
    legend: 'Metadata3',
    data: 30,
    color: getColorFromToken(DataVizPalette.color3),
    xAxisCalloutData: '2020/06/30',
    yAxisCalloutData: '30%',
  },
];

const basicData: VerticalStackedChartProps[] = [
  { chartData: firstChartPoints, xAxisPoint: 0 },
  { chartData: secondChartPoints, xAxisPoint: 20 },
  { chartData: thirdChartPoints, xAxisPoint: 40 },
];

const rootStyle = { width: '650px', height: '350px' };

export const Basic = () => {
  return (
    <div style={rootStyle}>
      <VerticalStackedBarChart
        culture="en-US"
        chartTitle="Vertical stacked bar chart basic example"
        barGapMax={2}
        data={basicData}
        height={350}
        width={650}
        xAxisTitle="Number of days"
        yAxisTitle="Variation of number of sales"
      />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/**
 * Rounded corners render the top-of-stack segment as a `<path>` (instead of `<rect>`),
 * and lineData draws the overlay line + markers — both are separately-styled code paths.
 */
export const RoundedWithLines = () => {
  const dataWithLines: VerticalStackedChartProps[] = [
    {
      chartData: firstChartPoints,
      xAxisPoint: 0,
      lineData: [{ y: 42, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color9) }],
    },
    {
      chartData: secondChartPoints,
      xAxisPoint: 20,
      lineData: [{ y: 33, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color9) }],
    },
    {
      chartData: thirdChartPoints,
      xAxisPoint: 40,
      lineData: [{ y: 60, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color9) }],
    },
  ];

  return (
    <div style={rootStyle}>
      <VerticalStackedBarChart
        culture="en-US"
        chartTitle="Vertical stacked bar chart rounded example"
        barGapMax={2}
        barCornerRadius={5}
        roundCorners={true}
        data={dataWithLines}
        height={350}
        width={650}
        lineOptions={{ lineBorderWidth: '2' }}
      />
    </div>
  );
};

export const RoundedWithLinesRTL = getStoryVariant(RoundedWithLines, RTL);

export const RoundedWithLinesDarkMode = getStoryVariant(RoundedWithLines, DARK_MODE);

/**
 * Opens the ChartPopover (the shared per-chart callout) by dispatching a mouseover on the
 * first bar — the same executeScript technique LineChart's `Basic` story uses for its
 * callout snapshot. This story is what pixel-gates the ChartPopover conversion.
 */
export const PopoverOpen = () => {
  return (
    <div style={rootStyle}>
      <VerticalStackedBarChart
        culture="en-US"
        chartTitle="Vertical stacked bar chart popover example"
        barGapMax={2}
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

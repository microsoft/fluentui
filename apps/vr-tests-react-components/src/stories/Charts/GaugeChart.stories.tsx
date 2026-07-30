import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { DataVizPalette, GaugeChart, getColorFromToken } from '@fluentui/react-charts';
import type { GaugeChartSegment } from '@fluentui/react-charts';

export default {
  title: 'Charts/GaugeChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof GaugeChart>;

const segments: GaugeChartSegment[] = [
  { size: 33, color: getColorFromToken(DataVizPalette.success), legend: 'Low Risk' },
  { size: 34, color: getColorFromToken(DataVizPalette.warning), legend: 'Medium Risk' },
  { size: 33, color: getColorFromToken(DataVizPalette.error), legend: 'High Risk' },
];

const rootStyle = { width: '400px', height: '250px' };

export const Basic = () => {
  return (
    <div style={rootStyle}>
      <GaugeChart
        width={352}
        height={228}
        segments={segments}
        chartValue={50}
        chartTitle="Gauge chart basic example"
        sublabel="Current risk"
        variant="multiple-segments"
      />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/**
 * single-segment variant + fraction format + rounded corners + hidden min/max — the
 * separately-styled code paths (segment labels, corner radii, no limit `<text>`s).
 */
export const SingleSegmentRounded = () => {
  return (
    <div style={rootStyle}>
      <GaugeChart
        width={352}
        height={228}
        segments={[{ size: 70, color: getColorFromToken(DataVizPalette.color5), legend: 'Used' }]}
        chartValue={70}
        chartValueFormat="fraction"
        variant="single-segment"
        roundCorners={true}
        hideMinMax={true}
      />
    </div>
  );
};

export const SingleSegmentRoundedRTL = getStoryVariant(SingleSegmentRounded, RTL);

export const SingleSegmentRoundedDarkMode = getStoryVariant(SingleSegmentRounded, DARK_MODE);

/**
 * Opens the chart's callout (GaugeChart composes its own multi-value callout content into
 * the shared ChartPopover) by dispatching a mouseover on the first arc segment — the
 * LineChart/VerticalStackedBarChart executeScript technique.
 */
export const PopoverOpen = () => {
  return (
    <div style={rootStyle}>
      <GaugeChart
        width={352}
        height={228}
        segments={segments}
        chartValue={50}
        chartTitle="Gauge chart popover example"
        variant="multiple-segments"
      />
    </div>
  );
};

PopoverOpen.parameters = {
  storyWright: {
    steps: new Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      // Arc segments carry stable ids; dispatch a real mouseover so the chart opens its popover.
      .executeScript(
        `document.getElementById('gauge-chart-arc-0').dispatchEvent(new MouseEvent('mouseover',{bubbles: true,cancelable: true}))`,
      )
      .snapshot('popover-open', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;

export const PopoverOpenRTL = getStoryVariant(PopoverOpen, RTL);

export const PopoverOpenDarkMode = getStoryVariant(PopoverOpen, DARK_MODE);

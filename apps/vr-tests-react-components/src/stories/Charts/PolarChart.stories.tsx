import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { PolarChart } from '@fluentui/react-charts';
import type { PolarChartProps } from '@fluentui/react-charts';

export default {
  title: 'Charts/PolarChart',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof PolarChart>;

const areaData: PolarChartProps['data'] = [
  {
    type: 'areapolar',
    legend: 'Mike',
    color: '#8884d8',
    data: [
      { r: 120, theta: 'Math' },
      { r: 98, theta: 'Chinese' },
      { r: 86, theta: 'English' },
      { r: 99, theta: 'Geography' },
      { r: 85, theta: 'Physics' },
      { r: 65, theta: 'History' },
    ],
  },
  {
    type: 'areapolar',
    legend: 'Lily',
    color: '#82ca9d',
    data: [
      { r: 110, theta: 'Math' },
      { r: 130, theta: 'Chinese' },
      { r: 130, theta: 'English' },
      { r: 100, theta: 'Geography' },
      { r: 90, theta: 'Physics' },
      { r: 85, theta: 'History' },
    ],
  },
];

const rootStyle = { width: '600px', height: '350px' };

/** Circle grid (default shape) with two area-polar series — grid lines, tick labels, legends. */
export const Basic = () => {
  return (
    <div style={rootStyle}>
      <PolarChart data={areaData} width={600} height={350} />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/** Polygon grid + clockwise direction — the `<path>` grid-line code path (radar look). */
export const Polygon = () => {
  return (
    <div style={rootStyle}>
      <PolarChart data={areaData} width={600} height={350} shape="polygon" direction="clockwise" />
    </div>
  );
};

export const PolygonRTL = getStoryVariant(Polygon, RTL);

export const PolygonDarkMode = getStoryVariant(Polygon, DARK_MODE);

/**
 * Opens the chart's popover by dispatching a mouseover on the first data-point
 * `<circle role="img">` (the ChartPopover positions against the event target, so no
 * client coordinates are needed).
 */
export const PopoverOpen = () => {
  return (
    <div style={rootStyle}>
      <PolarChart data={areaData} width={600} height={350} />
    </div>
  );
};

PopoverOpen.parameters = {
  storyWright: {
    steps: new Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .executeScript(
        `document.querySelectorAll('circle[role="img"]')[0].dispatchEvent(new MouseEvent('mouseover',{bubbles: true,cancelable: true}))`,
      )
      .snapshot('popover-open', { cropTo: '.testWrapper' })
      .end(),
  },
} satisfies StoryParameters;

export const PopoverOpenRTL = getStoryVariant(PopoverOpen, RTL);

export const PopoverOpenDarkMode = getStoryVariant(PopoverOpen, DARK_MODE);

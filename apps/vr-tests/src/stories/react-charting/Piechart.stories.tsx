import * as React from 'react';
import type { Meta } from '@storybook/react';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { Steps, StoryWright } from 'storywright';
import { PieChart } from '@fluentui/react-charting';

export default {
  title: 'react-charting/PieChart',

  decorators: [
    (story, context) => TestWrapperDecorator(story, context),
    (story, context) => {
      const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
      return <StoryWright steps={steps}>{story(context)}</StoryWright>;
    },
  ],
} satisfies Meta<typeof PieChart>;

export const Basic = (context: any) => {
  const points = [
    { y: 50, x: 'A' },
    { y: 25, x: 'B' },
    { y: 25, x: 'C' },
  ];
  const colors = ['#e81123', '#0078d4', '#107c10'];
  return (
    <PieChart culture="en-US" data={points} chartTitle="Pie Chart basic example" colors={colors} />
  );
};

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

export const BasicRTL = getStoryVariant(Basic, RTL);

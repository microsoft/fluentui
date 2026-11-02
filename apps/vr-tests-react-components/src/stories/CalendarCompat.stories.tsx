import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { Calendar as CalendarBase } from '@fluentui/react-calendar-compat';
import { ArrowLeftRegular, ArrowRightRegular, DismissCircleRegular } from '@fluentui/react-icons';
import type { CalendarProps } from '@fluentui/react-calendar-compat';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../utilities';

const referenceDate = new Date(2023, 2, 15);

const Calendar = (props: CalendarProps) => {
  return <CalendarBase today={referenceDate} value={referenceDate} {...props} />;
};

export default {
  title: 'Calendar Compat',
  component: CalendarBase,
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof CalendarBase>;

export const Default = () => <Calendar />;

export const CustomIcons = () => (
  <Calendar
    calendarDayProps={{
      navigationIcons: {
        upNavigation: <ArrowLeftRegular />,
        downNavigation: <ArrowRightRegular />,
        dismiss: <DismissCircleRegular />,
      },
    }}
    calendarMonthProps={{
      navigationIcons: {
        upNavigation: <ArrowLeftRegular />,
        downNavigation: <ArrowRightRegular />,
        dismiss: <DismissCircleRegular />,
      },
    }}
  />
);
CustomIcons.storyName = 'Custom icons';

export const CustomIconsRTL = getStoryVariant(CustomIcons, RTL);

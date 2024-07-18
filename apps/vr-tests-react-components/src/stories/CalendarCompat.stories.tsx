import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { Calendar as CalendarBase } from '@fluentui/react-calendar-compat';
import { ArrowLeftRegular, ArrowRightRegular, DismissCircleRegular } from '@fluentui/react-icons';
import type { CalendarProps } from '@fluentui/react-calendar-compat';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../utilities';

const Calendar = (props: CalendarProps) => {
  const today = new Date('3/15/2023');

  return <CalendarBase today={today} {...props} />;
};

export default {
  title: 'Calendar Compat',
  component: CalendarBase,
  decorators: [
    TestWrapperDecorator,
    story => (
      <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
    ),
  ],
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

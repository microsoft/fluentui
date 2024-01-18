import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { Calendar as CalendarBase } from '@fluentui/react-calendar-compat';
import { ArrowLeftRegular, ArrowRightRegular, DismissCircleRegular } from '@fluentui/react-icons';
import type { CalendarProps } from '@fluentui/react-calendar-compat';

const Calendar = (props: CalendarProps) => {
  const today = new Date('3/15/2023');

  return <CalendarBase today={today} {...props} />;
};

storiesOf('Calendar Compat', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('Default', () => <Calendar />, { includeRtl: true })
  .addStory('Custom icons', () => (
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
  ));

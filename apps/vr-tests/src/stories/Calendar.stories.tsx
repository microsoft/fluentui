import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorFixedWidth } from '../utilities/index';
import { Fabric, Calendar, DateRangeType, DayOfWeek } from '@fluentui/react';

const date = new Date(2010, 1, 12);
storiesOf('Calendar', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Root',
    () => (
      <Fabric>
        <Calendar value={date} />
      </Fabric>
    ),
    { includeRtl: true },
  );

storiesOf('Calendar - No Month Option', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory('Show Month as Overlay and no Go To Today', () => (
    <Fabric>
      <Calendar value={date} showGoToToday={false} showMonthPickerAsOverlay={true} />
    </Fabric>
  ))
  .addStory('Show Week selection type', () => (
    <Fabric>
      <Calendar value={date} dateRangeType={DateRangeType.Week} />
    </Fabric>
  ))
  .addStory('Show Month selection type', () => (
    <Fabric>
      <Calendar value={date} dateRangeType={DateRangeType.Month} />
    </Fabric>
  ))
  .addStory('Show Work Week selection type', () => (
    <Fabric>
      <Calendar
        value={date}
        dateRangeType={DateRangeType.WorkWeek}
        workWeekDays={[DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Friday]}
      />
    </Fabric>
  ));

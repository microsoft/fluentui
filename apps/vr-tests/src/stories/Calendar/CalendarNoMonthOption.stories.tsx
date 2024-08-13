import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecoratorFixedWidth } from '../../utilities';
import { Fabric, Calendar, DateRangeType, DayOfWeek } from '@fluentui/react';

const date = new Date(2010, 1, 12);

export default {
  title: 'Calendar - No Month Option',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const ShowMonthAsOverlayAndNoGoToToday = () => (
  <Fabric>
    <Calendar value={date} showGoToToday={false} showMonthPickerAsOverlay={true} />
  </Fabric>
);

ShowMonthAsOverlayAndNoGoToToday.storyName = 'Show Month as Overlay and no Go To Today';

export const ShowWeekSelectionType = () => (
  <Fabric>
    <Calendar value={date} dateRangeType={DateRangeType.Week} />
  </Fabric>
);

ShowWeekSelectionType.storyName = 'Show Week selection type';

export const ShowMonthSelectionType = () => (
  <Fabric>
    <Calendar value={date} dateRangeType={DateRangeType.Month} />
  </Fabric>
);

ShowMonthSelectionType.storyName = 'Show Month selection type';

export const ShowWorkWeekSelectionType = () => (
  <Fabric>
    <Calendar
      value={date}
      dateRangeType={DateRangeType.WorkWeek}
      workWeekDays={[DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Friday]}
    />
  </Fabric>
);

ShowWorkWeekSelectionType.storyName = 'Show Work Week selection type';

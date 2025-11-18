import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { TestWrapperDecoratorFixedWidth } from '../../utilities';
import { Fabric, Calendar, DateRangeType, DayOfWeek } from '@fluentui/react';

const date = new Date(2010, 1, 12);

export default {
  title: 'Calendar - No Month Option',

  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Calendar>;

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

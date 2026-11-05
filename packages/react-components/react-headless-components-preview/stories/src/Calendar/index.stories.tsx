import {
  Calendar,
  CalendarDay,
  CalendarMonth,
  CalendarYear,
} from '@fluentui/react-headless-components-preview/calendar';
import descriptionMd from './CalendarDescription.md';

export { Default } from './CalendarDefault.stories';
export { ControlledOverlay } from './CalendarControlledOverlay.stories';
export { Localized } from './CalendarLocalized.stories';
export { MarkedDays } from './CalendarMarkedDays.stories';
export { MonthOnly } from './CalendarMonthOnly.stories';
export { RestrictedDates } from './CalendarRestrictedDates.stories';
export { WorkWeekSelection } from './CalendarWorkWeekSelection.stories';

export default {
  title: 'Components/Calendar',
  component: Calendar,
  subcomponents: { CalendarDay, CalendarMonth, CalendarYear },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};

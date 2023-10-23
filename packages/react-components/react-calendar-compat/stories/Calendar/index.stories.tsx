import { Calendar } from '@fluentui/react-calendar-compat';

import descriptionMd from './CalendarDescription.md';
import bestPracticesMd from './CalendarBestPractices.md';

export { Default } from './CalendarDefault.stories';
export { CalendarMonthOnly } from './CalendarMonthOnly.stories';
export { CalendarOverlaidMonth } from './CalendarOverlaidMonthPicker.stories';
export { CalendarDateBoundaries } from './CalendarDateBoundaries.stories';
export { CalendarSixWeeks } from './CalendarSixWeeks.stories';
export { CalendarWeekNumbers } from './CalendarWeekNumbers.stories';
export { CalendarWeekSelection } from './CalendarWeekSelection.stories';
export { CalendarMarkedDays } from './CalendarMarkedDays.stories';
export { CalendarMonthSelection } from './CalendarMonthSelection.stories';
export { CalendarMultidayDayView } from './CalendarMultiDayView.stories';
export { CalendarContiguousWorkWeekDays } from './CalendarContiguousWork.stories';
export { CalendarNonContiguousWorkWeekDays } from './CalendarNonContiguousWorkWeekDays.stories';
export { CalendarCustomDayCellRef } from './CalendarCustomDayCellRef.stories';

export default {
  title: 'Compat Components/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};

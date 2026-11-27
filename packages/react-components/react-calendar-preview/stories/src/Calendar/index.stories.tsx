import { Calendar, CalendarDay, CalendarMonth, CalendarYear } from '@fluentui/react-calendar-preview';

import descriptionMd from './CalendarDescription.md';
import bestPracticesMd from './CalendarBestPractices.md';

export { Default } from './CalendarDefault.stories';
export { CalendarOverlaidMonth } from './CalendarOverlaidMonthPicker.stories';
export { CalendarDateBoundaries } from './CalendarDateBoundaries.stories';
export { CalendarSixWeeks } from './CalendarSixWeeks.stories';
export { CalendarWeekNumbers } from './CalendarWeekNumbers.stories';
export { CalendarWeekSelection } from './CalendarWeekSelection.stories';
export { CalendarMarkedDays } from './CalendarMarkedDays.stories';
export { CalendarMonthOnly } from './CalendarMonthOnly.stories';
export { CalendarMonthSelection } from './CalendarMonthSelection.stories';
export { CalendarMultidayDayView } from './CalendarMultiDayView.stories';
export { CalendarContiguousWorkWeekDays } from './CalendarContiguousWork.stories';
export { CalendarNonContiguousWorkWeekDays } from './CalendarNonContiguousWorkWeekDays.stories';
export { CalendarLocalizedFormatting } from './CalendarLocalizedFormatting.stories';
export { CalendarControlledSelection } from './CalendarControlledSelection.stories';
export { CalendarControlledNavigation } from './CalendarControlledNavigation.stories';
export { CalendarStandalonePickers } from './CalendarStandalonePickers.stories';
export { CalendarCustomCells } from './CalendarCustomCells.stories';
export { CalendarFocusAndDismissal } from './CalendarFocusAndDismissal.stories';

export default {
  title: 'Preview Components/Calendar',
  component: Calendar,
  subcomponents: { CalendarDay, CalendarMonth, CalendarYear },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};

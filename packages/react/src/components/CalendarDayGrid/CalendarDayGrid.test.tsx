import { CalendarDayGrid } from './CalendarDayGrid';
import { defaultCalendarStrings } from '../Calendar/index';
import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '@fluentui/date-time-utilities';
import { isConformant } from '../../common/isConformant';

describe('CalendarDayGrid', () => {
  isConformant({
    Component: CalendarDayGrid,
    displayName: 'CalendarDayGrid',
    requiredProps: {
      strings: defaultCalendarStrings,
      selectedDate: new Date('2020-09-18T21:06:52.856Z'),
      navigatedDate: new Date('2020-09-18T21:06:52.856Z'),
      dateRangeType: DateRangeType.Day,
      firstDayOfWeek: DayOfWeek.Sunday,
      firstWeekOfYear: FirstWeekOfYear.FirstFullWeek,
      dateTimeFormatter: {
        formatMonthDayYear: () => 'm/d/y',
        formatMonthYear: () => 'm/y',
        formatDay: () => 'd',
        formatMonth: () => 'm',
        formatYear: () => 'y',
      },
    },
    disabledTests: [
      'component-handles-classname',
      'exported-top-level',
      'has-top-level-file',
      // This component is not currently intended to handle a ref
      'component-handles-ref',
      'component-has-root-ref',
    ],
  });
});

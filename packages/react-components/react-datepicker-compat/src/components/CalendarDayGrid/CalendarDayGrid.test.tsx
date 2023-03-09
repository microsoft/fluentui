import { CalendarDayGrid } from './CalendarDayGrid';
import { isConformant } from '../../testing/isConformant';
import { DEFAULT_CALENDAR_STRINGS, DayOfWeek, DateRangeType, FirstWeekOfYear } from '../../utils';

describe('CalendarDayGrid', () => {
  isConformant({
    Component: CalendarDayGrid,
    displayName: 'CalendarDayGrid',
    requiredProps: {
      strings: DEFAULT_CALENDAR_STRINGS,
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
      // This test doesn't apply for compat components that are closer to their v8 counterpart
      'consistent-callback-args',
      // Some classnames are applied conditionally
      'component-has-static-classnames-object',
    ],
  });
});

import { CalendarDayGrid } from './CalendarDayGrid';
import { defaultCalendarStrings } from '../Calendar/index';
import { DateRangeType, DayOfWeek, FirstWeekOfYear, ICalendarStrings } from '@fluentui/date-time-utilities';
import { isConformant } from '../../common/isConformant';

describe('CalendarDayGrid', () => {
  const timeFormatter = {
    formatMonthDayYear: (date: Date, strings?: ICalendarStrings) => 'm/d/y',
    formatMonthYear: (date: Date, strings?: ICalendarStrings) => 'm/y',
    formatDay: (date: Date) => 'd',
    formatYear: (date: Date) => 'y',
  };

  isConformant({
    Component: CalendarDayGrid,
    displayName: 'CalendarDayGrid',
    requiredProps: {
      strings: defaultCalendarStrings,
      selectedDate: new Date('2020-09-18T21:06:52.856Z'),
      navigatedDate: new Date('2020-09-18T21:06:52.856Z'),
      navigatedMonthDate: new Date('2020-09-18T21:06:52.856Z'),
      dateRangeType: DateRangeType.Day,
      firstDayOfWeek: DayOfWeek.Sunday,
      firstWeekOfYear: FirstWeekOfYear.FirstFullWeek,
      dateTimeFormatter: timeFormatter,
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

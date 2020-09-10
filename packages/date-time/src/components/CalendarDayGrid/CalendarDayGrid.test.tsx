import { CalendarDayGrid } from './CalendarDayGrid';
import { defaultDayPickerStrings, DateRangeType, DayOfWeek, FirstWeekOfYear, ICalendarStrings } from '../Calendar';
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
      strings: defaultDayPickerStrings,
      selectedDate: new Date(),
      navigatedDate: new Date(),
      navigatedMonthDate: new Date(),
      dateRangeType: DateRangeType.Day,
      firstDayOfWeek: DayOfWeek.Sunday,
      firstWeekOfYear: FirstWeekOfYear.FirstFullWeek,
      dateTimeFormatter: timeFormatter,
    },
    disabledTests: ['exported-top-level', 'has-top-level-file'],
  });
});

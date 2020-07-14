import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '../dateValues/dateValues';
import { IDayGridOptions } from './dateGrid.types';
import * as DateGrid from './getDayGrid';
import { IDay } from './dateGrid.types';

describe('getDayGrid', () => {
  const defaultDate = new Date('2016-04-01T00:00:00.000Z');
  const defaultOptions: IDayGridOptions = {
    selectedDate: defaultDate,
    navigatedDate: defaultDate,
    firstDayOfWeek: DayOfWeek.Sunday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    dateRangeType: DateRangeType.Day,
  };

  /**
   * Adding custom date normalization, since we need to ensure the consistency across different timezones and locales
   * and setting timezone via TZ environment variable currently does not work
   * on Windows (see https://github.com/nodejs/node/issues/4230 and https://github.com/nodejs/node/issues/31478)
   * */
  const normalizeDay = (day: IDay) => {
    const date = day.originalDate;
    const offset = day.originalDate.getTimezoneOffset();
    date.setUTCMinutes(-offset);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    return {
      date: day.date,
      isInBounds: day.isInBounds,
      isInMonth: day.isInMonth,
      isSelected: day.isSelected,
      isToday: day.isToday,
      key: date.toUTCString(),
      originalDate: date,
    };
  };

  it('returns matrix with days', () => {
    const result = DateGrid.getDayGrid(defaultOptions);
    const resultUTC = result.map(week => week.map(day => normalizeDay(day)));
    expect(resultUTC).toMatchSnapshot();
  });
});

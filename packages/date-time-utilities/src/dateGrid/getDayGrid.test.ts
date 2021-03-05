import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '../dateValues/dateValues';
import { addDays, compareDates } from '../dateMath/dateMath';
import { IDayGridOptions } from './dateGrid.types';
import * as DateGrid from './getDayGrid';
import { IDay } from './dateGrid.types';

describe('getDayGrid', () => {
  const defaultDate = new Date('Apr 1 2016');
  const defaultOptions: IDayGridOptions = {
    selectedDate: defaultDate,
    navigatedDate: defaultDate,
    firstDayOfWeek: DayOfWeek.Sunday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    dateRangeType: DateRangeType.Day,
  };
  const transitionWeekCount = 2;
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

  const countDays = (days: IDay[][], condition: (day: IDay) => boolean) => {
    let count = 0;
    for (const week of days) {
      for (const day of week) {
        if (condition(day)) {
          count += 1;
        }
      }
    }

    return count;
  };

  it('returns matrix with days', () => {
    const result = DateGrid.getDayGrid(defaultOptions);
    const resultUTC = result.map(week => week.map(day => normalizeDay(day)));
    expect(resultUTC).toMatchSnapshot();
  });

  it('returns grid starting with proper day', () => {
    const result = DateGrid.getDayGrid({ ...defaultOptions, firstDayOfWeek: DayOfWeek.Wednesday });
    expect(result[0][0].originalDate.getDay()).toBe(DayOfWeek.Wednesday);
  });

  it('returns grid with proper amount of weeks', () => {
    const weekCount = 6;
    const result = DateGrid.getDayGrid({ ...defaultOptions, weeksToShow: weekCount });
    expect(result.length).toBe(weekCount + transitionWeekCount);
  });

  it('returns grid with proper amount of selected days', () => {
    const daysToSelect = 6;
    const result = DateGrid.getDayGrid({
      ...defaultOptions,
      dateRangeType: DateRangeType.Day,
      daysToSelectInDayView: daysToSelect,
    });
    expect(countDays(result, day => day.isSelected)).toBe(daysToSelect);
  });

  it('returns grid with no selected days', () => {
    const result = DateGrid.getDayGrid({ ...defaultOptions, selectedDate: new Date(0) });
    expect(countDays(result, day => day.isSelected)).toBe(0);
  });

  it('returns grid with proper amount of weeks', () => {
    const result = DateGrid.getDayGrid({
      ...defaultOptions,
      minDate: addDays(defaultDate, -1),
      maxDate: addDays(defaultDate, 1),
    });
    expect(countDays(result, day => day.isInBounds)).toBe(3);
  });

  it('returns grid with proper today', () => {
    const today = addDays(defaultDate, 5);
    const result = DateGrid.getDayGrid({
      ...defaultOptions,
      today,
    });
    expect(countDays(result, day => day.isToday)).toBe(1);
    expect(countDays(result, day => compareDates(today, day.originalDate) && day.isToday)).toBe(1);
  });

  it('returns grid with proper amount of work week days when over multiple work weeks', () => {
    const result = DateGrid.getDayGrid({
      ...defaultOptions,
      workWeekDays: [DayOfWeek.Saturday, DayOfWeek.Sunday, DayOfWeek.Monday],
      dateRangeType: DateRangeType.WorkWeek,
      firstDayOfWeek: DayOfWeek.Monday,
    });
    expect(countDays(result, day => day.isSelected)).toBe(7);
  });

  it('returns grid with proper amount of work week days when over single work weeks', () => {
    const result = DateGrid.getDayGrid({
      ...defaultOptions,
      workWeekDays: [DayOfWeek.Saturday, DayOfWeek.Sunday, DayOfWeek.Monday],
      dateRangeType: DateRangeType.WorkWeek,
      firstDayOfWeek: DayOfWeek.Tuesday,
    });
    expect(countDays(result, day => day.isSelected)).toBe(3);
  });
});

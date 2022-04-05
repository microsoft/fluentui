import { DayOfWeek, DateRangeType } from '../dateValues/dateValues';
import * as DateMath from './dateMath';

enum Months {
  Jan = 0,
  Feb = 1,
  Mar = 2,
  Apr = 3,
  May = 4,
  Jun = 5,
  Jul = 6,
  Aug = 7,
  Sep = 8,
  Oct = 9,
  Nov = 10,
  Dec = 11,
}
describe('DateMath', () => {
  it('can add days', () => {
    const startDate = new Date(2016, Months.Apr, 1);
    const result = DateMath.addDays(startDate, 5);
    const expected = new Date(2016, Months.Apr, 6);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add days across a month boundary', () => {
    const startDate = new Date(2016, Months.Mar, 30);
    const result = DateMath.addDays(startDate, 5);
    const expected = new Date(2016, Months.Apr, 4);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add days across multiple month boundaries', () => {
    const startDate = new Date(2016, Months.Mar, 31);
    const result = DateMath.addDays(startDate, 65);
    const expected = new Date(2016, Months.Jun, 4);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add days across leap day boundaries', () => {
    const startDate = new Date(2016, Months.Feb, 28);
    const result = DateMath.addDays(startDate, 2);
    const expected = new Date(2016, Months.Mar, 1);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add months', () => {
    const startDate = new Date(2015, Months.Dec, 31);

    let result = DateMath.addMonths(startDate, 1);
    let expected = new Date(2016, Months.Jan, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 2);
    expected = new Date(2016, Months.Feb, 29);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 3);
    expected = new Date(2016, Months.Mar, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 4);
    expected = new Date(2016, Months.Apr, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 5);
    expected = new Date(2016, Months.May, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 6);
    expected = new Date(2016, Months.Jun, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 7);
    expected = new Date(2016, Months.Jul, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 8);
    expected = new Date(2016, Months.Aug, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 9);
    expected = new Date(2016, Months.Sep, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 10);
    expected = new Date(2016, Months.Oct, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 11);
    expected = new Date(2016, Months.Nov, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 12);
    expected = new Date(2016, Months.Dec, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, 14);
    expected = new Date(2017, Months.Feb, 28);
    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add years', () => {
    let startDate = new Date(2016, Months.Feb, 29);
    let result = DateMath.addYears(startDate, 1);
    let expected = new Date(2017, Months.Feb, 28);

    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Feb, 29);
    result = DateMath.addYears(startDate, 4);
    expected = new Date(2020, Months.Feb, 29);

    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Jan, 1);
    result = DateMath.addYears(startDate, 1);
    expected = new Date(2017, Months.Jan, 1);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days', () => {
    const startDate = new Date(2016, Months.Apr, 30);
    const result = DateMath.addDays(startDate, -5);
    const expected = new Date(2016, Months.Apr, 25);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days across a month boundry', () => {
    const startDate = new Date(2016, Months.Apr, 1);
    const result = DateMath.addDays(startDate, -5);
    const expected = new Date(2016, Months.Mar, 27);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days across multiple month boundaries', () => {
    const startDate = new Date(2016, Months.Jul, 4);
    const result = DateMath.addDays(startDate, -65);
    const expected = new Date(2016, Months.Apr, 30);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days across leap day boundaries', () => {
    const startDate = new Date(2016, Months.Mar, 1);
    const result = DateMath.addDays(startDate, -2);
    const expected = new Date(2016, Months.Feb, 28);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract months', () => {
    const startDate = new Date(2016, Months.Dec, 31);

    let result = DateMath.addMonths(startDate, -12);
    let expected = new Date(2015, Months.Dec, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -11);
    expected = new Date(2016, Months.Jan, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -10);
    expected = new Date(2016, Months.Feb, 29);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -9);
    expected = new Date(2016, Months.Mar, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -8);
    expected = new Date(2016, Months.Apr, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -7);
    expected = new Date(2016, Months.May, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -6);
    expected = new Date(2016, Months.Jun, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -5);
    expected = new Date(2016, Months.Jul, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -4);
    expected = new Date(2016, Months.Aug, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -3);
    expected = new Date(2016, Months.Sep, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -2);
    expected = new Date(2016, Months.Oct, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -1);
    expected = new Date(2016, Months.Nov, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = DateMath.addMonths(startDate, -22);
    expected = new Date(2015, Months.Feb, 28);
    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract years', () => {
    let startDate = new Date(2016, Months.Feb, 29);
    let result = DateMath.addYears(startDate, -1);
    let expected = new Date(2015, Months.Feb, 28);

    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Feb, 29);
    result = DateMath.addYears(startDate, -4);
    expected = new Date(2012, Months.Feb, 29);

    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Jan, 1);
    result = DateMath.addYears(startDate, -1);
    expected = new Date(2015, Months.Jan, 1);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can set the month', () => {
    let startDate = new Date(2016, Months.Jan, 31);
    let result = DateMath.setMonth(startDate, Months.Feb);
    let expected = new Date(2016, Months.Feb, 29);
    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Jun, 1);
    result = DateMath.setMonth(startDate, Months.Feb);
    expected = new Date(2016, Months.Feb, 1);
    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can compare dates', () => {
    let date1 = new Date(2016, 4, 1);
    let date2 = new Date(2016, 4, 1);
    expect(DateMath.compareDates(date1, date2)).toBe(true);

    date1 = new Date(2016, 4, 1, 12, 30, 0);
    date2 = new Date(2016, 4, 1, 10, 0, 0);
    expect(DateMath.compareDates(date1, date2)).toBe(true);

    date1 = new Date(2016, 4, 1);
    date2 = new Date(2016, 4, 2);
    expect(DateMath.compareDates(date1, date2)).toBe(false);

    date1 = new Date(2016, 4, 1);
    date2 = new Date(2016, 5, 1);
    expect(DateMath.compareDates(date1, date2)).toBe(false);

    date1 = new Date(2016, 4, 1);
    date2 = new Date(2017, 4, 1);
    expect(DateMath.compareDates(date1, date2)).toBe(false);
  });

  it('can get date range array', () => {
    const date = new Date(2017, 2, 16);

    // Date range: day
    let dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Day, DayOfWeek.Sunday);
    expect(dateRangeArray.length).toEqual(1);
    expect(DateMath.compareDates(dateRangeArray[0], date)).toBe(true);

    // Date range: week
    let expectedDates = Array(7).map((val: undefined, i: number) => new Date(2017, 2, 12 + i));
    dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Week, DayOfWeek.Sunday);
    Array(7).forEach((val: undefined, i: number) =>
      expect(DateMath.compareDates(dateRangeArray[i], expectedDates[i])).toBe(true),
    );

    // Date range: work week
    const workWeekDays = [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Thursday, DayOfWeek.Friday];
    expectedDates = [new Date(2017, 2, 13), new Date(2017, 2, 14), new Date(2017, 2, 16), new Date(2017, 2, 17)];
    dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Week, DayOfWeek.Sunday, workWeekDays);
    Array(4).forEach((val: undefined, i: number) =>
      expect(DateMath.compareDates(dateRangeArray[i], expectedDates[i])).toBe(true),
    );

    // work week defaults
    expectedDates = [
      new Date(2017, 2, 13),
      new Date(2017, 2, 14),
      new Date(2017, 2, 15),
      new Date(2017, 2, 16),
      new Date(2017, 2, 17),
    ];
    dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Week, DayOfWeek.Sunday);
    Array(4).forEach((val: undefined, i: number) =>
      expect(DateMath.compareDates(dateRangeArray[i], expectedDates[i])).toBe(true),
    );

    // Date range: month
    expectedDates = Array(31).map((val: undefined, i: number) => new Date(2017, 2, 1 + i));
    dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Month, DayOfWeek.Sunday);
    Array(31).forEach((val: undefined, i: number) =>
      expect(DateMath.compareDates(dateRangeArray[i], expectedDates[i])).toBe(true),
    );

    // First day of week: Tuesday
    expectedDates = Array(7).map((val: undefined, i: number) => new Date(2017, 2, 14 + i));
    dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Week, DayOfWeek.Tuesday);
    Array(7).forEach((val: undefined, i: number) => expect(DateMath.compareDates(dateRangeArray[i], date)).toBe(true));
  });

  // Generating week numbers array per month
  it('can calculate week numbers from selected date', () => {
    // firstDayOfWeek is Monday, firstWeekOfYear is firstFullWeek
    let date = new Date(2017, 0, 4);
    let result = DateMath.getWeekNumbersInMonth(6, 1, 1, date);
    let expected = 52;
    expect(result[0]).toEqual(expected);

    // firstDayOfWeek is Sunday, firstWeekOfYear is firstFullWeek
    date = new Date(2000, 11, 31);
    result = DateMath.getWeekNumbersInMonth(6, 0, 1, date);
    expected = 53;
    expect(result[5]).toEqual(expected);

    // firstDayOfWeek is Sunday, firstWeekOfYear is firstFullWeek
    date = new Date(2010, 0, 1);
    result = DateMath.getWeekNumbersInMonth(6, 0, 1, date);
    expected = 52;
    expect(result[0]).toEqual(expected);

    // firstDayOfWeek is Sunday, firstWeekOfYear is firstFourDayWeek
    date = new Date(2018, 11, 31);
    result = DateMath.getWeekNumbersInMonth(6, 0, 2, date);
    expected = 1;
    expect(result[5]).toEqual(expected);
  });

  // First week of year set to FirstWeekOfYear.FirstDay
  it('can calculate week numbers - option 0', () => {
    // firstDayOfWeek is Sunday
    let date1 = new Date(2018, 0, 1);
    let result = DateMath.getWeekNumber(date1, 0, 0);
    let expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2010, 0, 1);
    result = DateMath.getWeekNumber(date1, 0, 0);
    expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2019, 0, 1);
    result = DateMath.getWeekNumber(date1, 0, 0);
    expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2010, 11, 31);
    result = DateMath.getWeekNumber(date1, 1, 0);
    expected = 53;
    expect(result).toEqual(expected);
  });

  // First week of year set to FirstWeekOfYear.FirstFullWeek
  it('can calculate week numbers - option 1', () => {
    // firstDayOfWeek is Sunday
    let date1 = new Date(2018, 0, 1);
    let result = DateMath.getWeekNumber(date1, 0, 1);
    let expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2017, 11, 31);
    result = DateMath.getWeekNumber(date1, 0, 1);
    expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2010, 11, 31);
    result = DateMath.getWeekNumber(date1, 0, 1);
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2011, 0, 1);
    result = DateMath.getWeekNumber(date1, 1, 1);
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2021, 0, 1);
    result = DateMath.getWeekNumber(date1, 0, 1);
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2021, 0, 1);
    result = DateMath.getWeekNumber(date1, 1, 1);
    expected = 52;
    expect(result).toEqual(expected);
  });

  // First week of year set to FirstWeekOfYear.FirstFourDayWeek
  it('can calculate week numbers - option 2', () => {
    // firstDayOfWeek is Sunday
    let date1 = new Date(2019, 0, 5);
    let result = DateMath.getWeekNumber(date1, 0, 2);
    let expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2018, 0, 6);
    result = DateMath.getWeekNumber(date1, 0, 2);
    expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2014, 11, 31);
    result = DateMath.getWeekNumber(date1, 0, 2);
    expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2015, 0, 1);
    result = DateMath.getWeekNumber(date1, 0, 2);
    expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2010, 11, 31);
    result = DateMath.getWeekNumber(date1, 0, 2);
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2011, 0, 1);
    result = DateMath.getWeekNumber(date1, 1, 2);
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2021, 0, 1);
    result = DateMath.getWeekNumber(date1, 0, 2);
    expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2021, 0, 1);
    result = DateMath.getWeekNumber(date1, 1, 2);
    expected = 53;
    expect(result).toEqual(expected);
  });

  it('can get the month start and end', () => {
    const date = new Date('Dec 15 2017');

    // First day of month
    expect(DateMath.compareDates(new Date('Dec 1 2017'), DateMath.getMonthStart(date))).toBe(true);

    // Last day of month
    expect(DateMath.compareDates(new Date('Dec 31 2017'), DateMath.getMonthEnd(date))).toBe(true);
  });

  it('can get the year start and end', () => {
    const date = new Date('Dec 15 2017');

    // First day of year
    expect(DateMath.compareDates(new Date('Jan 1 2017'), DateMath.getYearStart(date))).toBe(true);

    // Last day of year
    expect(DateMath.compareDates(new Date('Dec 31 2017'), DateMath.getYearEnd(date))).toBe(true);
  });

  it('can get start date of week', () => {
    const date = new Date('Aug 2 2020');
    expect(DateMath.compareDates(new Date('Jul 28 2020'), DateMath.getStartDateOfWeek(date, DayOfWeek.Tuesday))).toBe(
      true,
    );
  });

  it('can get end date of week', () => {
    const date = new Date('Sep 29 2020');
    expect(DateMath.compareDates(new Date('Oct 5 2020'), DateMath.getEndDateOfWeek(date, DayOfWeek.Tuesday))).toBe(
      true,
    );
  });
});

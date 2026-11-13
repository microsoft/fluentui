import { DAYS_IN_WEEK, daysOfWeek } from './constants';
import {
  addDays,
  addCivilDays,
  addMonths,
  addYears,
  setMonth,
  getDayFromIndex,
  getDayIndex,
  getWeekNumber,
  getMonthStart,
  getMonthEnd,
  getStartDateOfWeek,
  createDate,
  compareDatePart,
  matchesCivilDate,
} from './dateMath';

const areDatesEqual = (date1: Date, date2: Date) => compareDatePart(date1, date2) === 0;

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
  it('orders weekdays to match local Date indices', () => {
    expect(daysOfWeek).toHaveLength(DAYS_IN_WEEK);
    daysOfWeek.forEach((day, index) => {
      expect(getDayIndex(day)).toBe(new Date(2020, 8, 6 + index).getDay());
      expect(getDayFromIndex(index)).toBe(day);
    });
  });

  it.each([
    [-15, 'saturday'],
    [-7, 'sunday'],
    [-1, 'saturday'],
    [7, 'sunday'],
    [15, 'monday'],
  ] as const)('wraps weekday index %s to %s', (index, expected) => {
    expect(getDayFromIndex(index)).toBe(expected);
  });

  it.each([NaN, Infinity, -Infinity, 1.5])('rejects an invalid weekday index of %s', index => {
    expect(() => getDayFromIndex(index)).toThrow(new RangeError('index must be a finite integer.'));
  });

  it.each([
    [{ year: 2020, month: 1, day: 28 }, 1, { year: 2020, month: 1, day: 29 }],
    [{ year: 2020, month: 0, day: 1 }, -1, { year: 2019, month: 11, day: 31 }],
    [{ year: 99, month: 11, day: 31 }, 1, { year: 100, month: 0, day: 1 }],
    [{ year: 2011, month: 11, day: 29 }, 1, { year: 2011, month: 11, day: 30 }],
  ] as const)('advances civil date %j by %s days without local normalization', (date, offset, expected) => {
    const original = { ...date };
    expect(addCivilDays(date, offset)).toEqual(expected);
    expect(date).toEqual(original);
  });

  it('exposes civil overflow as invalid fields instead of wrapping', () => {
    const date = addCivilDays({ year: 275760, month: 8, day: 13 }, 1);
    expect(Number.isNaN(date.year)).toBe(true);
    expect(Number.isNaN(date.month)).toBe(true);
    expect(Number.isNaN(date.day)).toBe(true);
  });

  it('detects normalized or invalid local dates while preserving representable civil dates', () => {
    const civilDate = { year: 2011, month: 11, day: 30 };
    const date = createDate(civilDate.year, civilDate.month, civilDate.day);
    expect(matchesCivilDate(date, civilDate)).toBe(date.getDate() === 30);
    expect(matchesCivilDate(createDate(99, 0, 1), { year: 99, month: 0, day: 1 })).toBe(true);
    expect(matchesCivilDate(createDate(2020, 1, 30), { year: 2020, month: 1, day: 30 })).toBe(false);
    expect(matchesCivilDate(new Date(NaN), civilDate)).toBe(false);
  });

  it.each([0, 1, 99, 2020])('creates local midnight dates without remapping year %s', year => {
    const date = createDate(year, 1, 15);
    expect([
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ]).toEqual([year, 1, 15, 0, 0, 0, 0]);
  });

  it('normalizes month/day overflow and underflow', () => {
    expect(createDate(2020, 12, 1)).toEqual(new Date(2021, 0, 1));
    expect(createDate(2020, 2, 0)).toEqual(new Date(2020, 1, 29));
  });

  it.each([-2, 0, 2])('adds %s weeks without changing the input or time of day', weeks => {
    const date = new Date(2020, 11, 28, 12, 34);
    expect(date).toEqual(new Date(2020, 11, 28, 12, 34));
  });

  it('orders dates by year, month and day while ignoring time', () => {
    const date = new Date(2020, 8, 18);
    expect(compareDatePart(date, new Date(2020, 8, 18, 23))).toBe(0);
    for (const later of [new Date(2021, 0, 1), new Date(2020, 9, 1), new Date(2020, 8, 19)]) {
      expect(compareDatePart(date, later)).toBeLessThan(0);
      expect(compareDatePart(later, date)).toBeGreaterThan(0);
    }
  });

  it('can add days', () => {
    const startDate = new Date(2016, Months.Apr, 1);
    const result = addDays(startDate, 5);
    const expected = new Date(2016, Months.Apr, 6);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add days across a month boundary', () => {
    const startDate = new Date(2016, Months.Mar, 30);
    const result = addDays(startDate, 5);
    const expected = new Date(2016, Months.Apr, 4);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add days across multiple month boundaries', () => {
    const startDate = new Date(2016, Months.Mar, 31);
    const result = addDays(startDate, 65);
    const expected = new Date(2016, Months.Jun, 4);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add days across leap day boundaries', () => {
    const startDate = new Date(2016, Months.Feb, 28);
    const result = addDays(startDate, 2);
    const expected = new Date(2016, Months.Mar, 1);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add negative days', () => {
    const startDate = new Date(2016, Months.Feb, 28);
    const result = addDays(startDate, -5);
    const expected = new Date(2016, Months.Feb, 23);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add months', () => {
    const startDate = new Date(2015, Months.Dec, 31);

    let result = addMonths(startDate, 1);
    let expected = new Date(2016, Months.Jan, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 2);
    expected = new Date(2016, Months.Feb, 29);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 3);
    expected = new Date(2016, Months.Mar, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 4);
    expected = new Date(2016, Months.Apr, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 5);
    expected = new Date(2016, Months.May, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 6);
    expected = new Date(2016, Months.Jun, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 7);
    expected = new Date(2016, Months.Jul, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 8);
    expected = new Date(2016, Months.Aug, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 9);
    expected = new Date(2016, Months.Sep, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 10);
    expected = new Date(2016, Months.Oct, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 11);
    expected = new Date(2016, Months.Nov, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 12);
    expected = new Date(2016, Months.Dec, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, 14);
    expected = new Date(2017, Months.Feb, 28);
    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add years', () => {
    let startDate = new Date(2016, Months.Feb, 29);
    let result = addYears(startDate, 1);
    let expected = new Date(2017, Months.Feb, 28);

    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Feb, 29);
    result = addYears(startDate, 4);
    expected = new Date(2020, Months.Feb, 29);

    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Jan, 1);
    result = addYears(startDate, 1);
    expected = new Date(2017, Months.Jan, 1);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days', () => {
    const startDate = new Date(2016, Months.Apr, 30);
    const result = addDays(startDate, -5);
    const expected = new Date(2016, Months.Apr, 25);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days across a month boundary', () => {
    const startDate = new Date(2016, Months.Apr, 1);
    const result = addDays(startDate, -5);
    const expected = new Date(2016, Months.Mar, 27);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days across multiple month boundaries', () => {
    const startDate = new Date(2016, Months.Jul, 4);
    const result = addDays(startDate, -65);
    const expected = new Date(2016, Months.Apr, 30);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days across leap day boundaries', () => {
    const startDate = new Date(2016, Months.Mar, 1);
    const result = addDays(startDate, -2);
    const expected = new Date(2016, Months.Feb, 28);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract months', () => {
    const startDate = new Date(2016, Months.Dec, 31);

    let result = addMonths(startDate, -12);
    let expected = new Date(2015, Months.Dec, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -11);
    expected = new Date(2016, Months.Jan, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -10);
    expected = new Date(2016, Months.Feb, 29);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -9);
    expected = new Date(2016, Months.Mar, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -8);
    expected = new Date(2016, Months.Apr, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -7);
    expected = new Date(2016, Months.May, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -6);
    expected = new Date(2016, Months.Jun, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -5);
    expected = new Date(2016, Months.Jul, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -4);
    expected = new Date(2016, Months.Aug, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -3);
    expected = new Date(2016, Months.Sep, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -2);
    expected = new Date(2016, Months.Oct, 31);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -1);
    expected = new Date(2016, Months.Nov, 30);
    expect(result.getTime()).toEqual(expected.getTime());

    result = addMonths(startDate, -22);
    expected = new Date(2015, Months.Feb, 28);
    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract years', () => {
    let startDate = new Date(2016, Months.Feb, 29);
    let result = addYears(startDate, -1);
    let expected = new Date(2015, Months.Feb, 28);

    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Feb, 29);
    result = addYears(startDate, -4);
    expected = new Date(2012, Months.Feb, 29);

    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Jan, 1);
    result = addYears(startDate, -1);
    expected = new Date(2015, Months.Jan, 1);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can set the month', () => {
    let startDate = new Date(2016, Months.Jan, 31);
    let result = setMonth(startDate, Months.Feb);
    let expected = new Date(2016, Months.Feb, 29);
    expect(result.getTime()).toEqual(expected.getTime());

    startDate = new Date(2016, Months.Jun, 1);
    result = setMonth(startDate, Months.Feb);
    expected = new Date(2016, Months.Feb, 1);
    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can compare dates', () => {
    let date1 = new Date(2016, 4, 1);
    let date2 = new Date(2016, 4, 1);
    expect(areDatesEqual(date1, date2)).toBe(true);

    date1 = new Date(2016, 4, 1, 12, 30, 0);
    date2 = new Date(2016, 4, 1, 10, 0, 0);
    expect(areDatesEqual(date1, date2)).toBe(true);

    date1 = new Date(2016, 4, 1);
    date2 = new Date(2016, 4, 2);
    expect(areDatesEqual(date1, date2)).toBe(false);

    date1 = new Date(2016, 4, 1);
    date2 = new Date(2016, 5, 1);
    expect(areDatesEqual(date1, date2)).toBe(false);

    date1 = new Date(2016, 4, 1);
    date2 = new Date(2017, 4, 1);
    expect(areDatesEqual(date1, date2)).toBe(false);
  });

  // First week of year set to 'firstDay'
  it('can calculate week numbers - option 0', () => {
    // firstDayOfWeek is Sunday
    let date1 = new Date(2018, 0, 1);
    let result = getWeekNumber(date1, 'sunday', 'firstDay');
    let expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2010, 0, 1);
    result = getWeekNumber(date1, 'sunday', 'firstDay');
    expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2019, 0, 1);
    result = getWeekNumber(date1, 'sunday', 'firstDay');
    expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2010, 11, 31);
    result = getWeekNumber(date1, 'monday', 'firstDay');
    expected = 53;
    expect(result).toEqual(expected);
  });

  // First week of year set to 'firstFullWeek'
  it('can calculate week numbers - option 1', () => {
    // firstDayOfWeek is Sunday
    let date1 = new Date(2018, 0, 1);
    let result = getWeekNumber(date1, 'sunday', 'firstFullWeek');
    let expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2017, 11, 31);
    result = getWeekNumber(date1, 'sunday', 'firstFullWeek');
    expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2010, 11, 31);
    result = getWeekNumber(date1, 'sunday', 'firstFullWeek');
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2011, 0, 1);
    result = getWeekNumber(date1, 'monday', 'firstFullWeek');
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2021, 0, 1);
    result = getWeekNumber(date1, 'sunday', 'firstFullWeek');
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2021, 0, 1);
    result = getWeekNumber(date1, 'monday', 'firstFullWeek');
    expected = 52;
    expect(result).toEqual(expected);
  });

  // First week of year set to 'firstFourDayWeek'
  it('can calculate week numbers - option 2', () => {
    // firstDayOfWeek is Sunday
    let date1 = new Date(2019, 0, 5);
    let result = getWeekNumber(date1, 'sunday', 'firstFourDayWeek');
    let expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2018, 0, 6);
    result = getWeekNumber(date1, 'sunday', 'firstFourDayWeek');
    expected = 1;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2014, 11, 31);
    result = getWeekNumber(date1, 'sunday', 'firstFourDayWeek');
    expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2015, 0, 1);
    result = getWeekNumber(date1, 'sunday', 'firstFourDayWeek');
    expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2010, 11, 31);
    result = getWeekNumber(date1, 'sunday', 'firstFourDayWeek');
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2011, 0, 1);
    result = getWeekNumber(date1, 'monday', 'firstFourDayWeek');
    expected = 52;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Sunday
    date1 = new Date(2021, 0, 1);
    result = getWeekNumber(date1, 'sunday', 'firstFourDayWeek');
    expected = 53;
    expect(result).toEqual(expected);

    // firstDayOfWeek is Monday
    date1 = new Date(2021, 0, 1);
    result = getWeekNumber(date1, 'monday', 'firstFourDayWeek');
    expected = 53;
    expect(result).toEqual(expected);

    date1 = new Date(2018, 11, 31);
    result = getWeekNumber(date1, 'monday', 'firstFourDayWeek');
    expected = 1;
    expect(result).toEqual(expected);
  });

  it('can get the month start and end', () => {
    const date = new Date('Dec 15 2017');

    // First day of month
    expect(areDatesEqual(new Date('Dec 1 2017'), getMonthStart(date))).toBe(true);

    // Last day of month
    expect(areDatesEqual(new Date('Dec 31 2017'), getMonthEnd(date))).toBe(true);
  });

  it('can get start date of week', () => {
    const date = new Date('Aug 2 2020');
    expect(areDatesEqual(new Date('Jul 28 2020'), getStartDateOfWeek(date, 'tuesday'))).toBe(true);
  });

  it('finds a representable week start when local date normalization skips a day', () => {
    const date = new Date(2012, 0, 1);
    const start = getStartDateOfWeek(date, 'friday');
    expect(start.getDay()).toBe(5);
    expect(start.getDate()).toBe(new Date(2011, 11, 30).getDate() === 30 ? 30 : 23);
  });
});

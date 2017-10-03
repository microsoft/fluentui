import { DayOfWeek, DateRangeType } from '../dateValues/DateValues';
import * as DateMath from './DateMath';

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
  Dec = 11

}
describe('DateMath', () => {

  it('can add days', () => {
    let startDate = new Date(2016, Months.Apr, 1);
    let result = DateMath.addDays(startDate, 5);
    let expected = new Date(2016, Months.Apr, 6);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add days across a month boundary', () => {
    let startDate = new Date(2016, Months.Mar, 30);
    let result = DateMath.addDays(startDate, 5);
    let expected = new Date(2016, Months.Apr, 4);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add days across multiple month boundaries', () => {
    let startDate = new Date(2016, Months.Mar, 31);
    let result = DateMath.addDays(startDate, 65);
    let expected = new Date(2016, Months.Jun, 4);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add days across leap day boundaries', () => {
    let startDate = new Date(2016, Months.Feb, 28);
    let result = DateMath.addDays(startDate, 2);
    let expected = new Date(2016, Months.Mar, 1);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can add months', () => {
    let startDate = new Date(2015, Months.Dec, 31);

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
    let startDate = new Date(2016, Months.Apr, 30);
    let result = DateMath.addDays(startDate, -5);
    let expected = new Date(2016, Months.Apr, 25);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days across a month boundry', () => {
    let startDate = new Date(2016, Months.Apr, 1);
    let result = DateMath.addDays(startDate, -5);
    let expected = new Date(2016, Months.Mar, 27);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days across multiple month boundaries', () => {
    let startDate = new Date(2016, Months.Jul, 4);
    let result = DateMath.addDays(startDate, -65);
    let expected = new Date(2016, Months.Apr, 30);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract days across leap day boundaries', () => {
    let startDate = new Date(2016, Months.Mar, 1);
    let result = DateMath.addDays(startDate, -2);
    let expected = new Date(2016, Months.Feb, 28);

    expect(result.getTime()).toEqual(expected.getTime());
  });

  it('can subtract months', () => {
    let startDate = new Date(2016, Months.Dec, 31);

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
    let date = new Date(2017, 2, 16);

    // Date range: day
    let dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Day, DayOfWeek.Sunday);
    expect(dateRangeArray.length).toEqual(1);
    expect(DateMath.compareDates(dateRangeArray[0], date)).toBe(true);

    // Date range: week
    let expectedDates = Array(7).map((val, i) => new Date(2017, 2, 12 + i));
    dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Week, DayOfWeek.Sunday);
    Array(7).forEach((val, i) => expect(DateMath.compareDates(dateRangeArray[i], date)).toBe(true));

    // Date range: month
    expectedDates = Array(31).map((val, i) => new Date(2017, 2, 1 + i));
    dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Month, DayOfWeek.Sunday);
    Array(31).forEach((val, i) => expect(DateMath.compareDates(dateRangeArray[i], date)).toBe(true));

    // First day of week: Tuesday
    expectedDates = Array(7).map((val, i) => new Date(2017, 2, 14 + i));
    dateRangeArray = DateMath.getDateRangeArray(date, DateRangeType.Week, DayOfWeek.Tuesday);
    Array(7).forEach((val, i) => expect(DateMath.compareDates(dateRangeArray[i], date)).toBe(true));
  });
});
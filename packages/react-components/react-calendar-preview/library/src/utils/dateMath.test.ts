import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  setMonth,
  areDatesEqual,
  getDateRange,
  getWeekNumbersInMonth,
  getWeekNumber,
  getMonthStart,
  getMonthEnd,
  getYearStart,
  getYearEnd,
  getStartDateOfWeek,
  createDate,
  compareDatePart,
  isDateInRange,
} from './dateMath';

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
    expect(addWeeks(date, weeks)).toEqual(new Date(2020, 11, 28 + weeks * 7, 12, 34));
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

  it('finds dates in a range ignoring time, and handles absent dates and empty ranges', () => {
    const date = new Date(2020, 8, 18);
    expect(isDateInRange(date, [new Date(2020, 8, 17), new Date(2020, 8, 18, 23)])).toBe(true);
    expect(isDateInRange(date, [new Date(2019, 8, 18)])).toBe(false);
    expect(isDateInRange(date, [])).toBe(false);
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

  it('preserves the runtime equality behavior for missing dates', () => {
    // @ts-expect-error Verify the existing JavaScript contract for two missing dates.
    expect(areDatesEqual(undefined, undefined)).toBe(true);
    // @ts-expect-error Verify the existing JavaScript contract for a missing first date.
    expect(areDatesEqual(undefined, new Date(2020, 8, 18))).toBe(false);
    // @ts-expect-error Verify the existing JavaScript contract for a missing second date.
    expect(areDatesEqual(new Date(2020, 8, 18), undefined)).toBe(false);
  });

  describe('Date range array', () => {
    const date = new Date(2017, 2, 16);

    function createDaysRange(startDate: Date, numDays: number): Date[] {
      return Array.from({ length: numDays }).map(
        (_, i) => new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i),
      );
    }

    type TestData = { name: string; testItems: Date[]; expected: Date[] }[];
    const testData: TestData = [
      {
        name: 'week',
        testItems: getDateRange(date, 'week', 'sunday'),
        expected: createDaysRange(new Date(2017, 2, 12), 7),
      },
      {
        name: 'work week',
        testItems: getDateRange(date, 'workWeek', 'sunday', ['monday', 'tuesday', 'thursday', 'friday']),
        expected: [new Date(2017, 2, 13), new Date(2017, 2, 14), new Date(2017, 2, 16), new Date(2017, 2, 17)],
      },
      {
        name: 'work week defaults',
        testItems: getDateRange(date, 'workWeek', 'sunday'),
        expected: createDaysRange(new Date(2017, 2, 13), 5),
      },
      {
        name: 'month',
        testItems: getDateRange(date, 'month', 'sunday'),
        expected: createDaysRange(new Date(2017, 2, 1), 31),
      },
      {
        name: 'first day of week: Tuesday',
        testItems: getDateRange(date, 'week', 'tuesday'),
        expected: createDaysRange(new Date(2017, 2, 14), 7),
      },
      {
        name: 'custom date range array',
        testItems: getDateRange(date, 'day', 'sunday', undefined, 5),
        expected: createDaysRange(new Date(2017, 2, 16), 5),
      },
      {
        name: 'reverse date range array',
        testItems: getDateRange(date, 'day', 'sunday', undefined, -5),
        expected: createDaysRange(new Date(2017, 2, 12), 5),
      },
    ];

    it('can get day', () => {
      const dateRange = getDateRange(date, 'day', 'sunday');
      expect(dateRange.length).toEqual(1);
      expect(areDatesEqual(dateRange[0], date)).toBe(true);
    });

    it('returns an empty range when zero days are requested', () => {
      expect(getDateRange(date, 'day', 'sunday', undefined, 0)).toEqual([]);
    });

    it.each([Number.NaN, Number.POSITIVE_INFINITY, 1.5])('rejects an invalid day count of %s', days => {
      expect(() => getDateRange(date, 'day', 'sunday', undefined, days)).toThrow(
        'daysToSelectInDayView must be a finite integer',
      );
    });

    it('rejects an invalid date', () => {
      expect(() => getDateRange(new Date(Number.NaN), 'day', 'sunday')).toThrow('date must be valid');
    });

    it('rejects an unsupported range type at runtime', () => {
      // @ts-expect-error Verify JavaScript callers receive an explicit error.
      expect(() => getDateRange(date, 'invalid', 'sunday')).toThrow('Unexpected object: invalid');
    });

    it('fails explicitly when the requested range exceeds representable dates', () => {
      expect(() => getDateRange(new Date(8640000000000000), 'day', 'sunday')).toThrow(
        'Date range end is outside the representable date range',
      );
    });

    it('keeps the selected date inside a week when the local week start date is skipped', () => {
      const selectedDate = new Date(2012, 0, 1);
      if (selectedDate.getDate() === 1 && new Date(2011, 11, 30).getDate() !== 30) {
        const range = getDateRange(selectedDate, 'week', 'friday');
        expect(range.map(day => day.getDate())).toEqual([31, 1, 2, 3, 4, 5, 6]);
        expect(range.some(day => areDatesEqual(day, selectedDate))).toBe(true);
      }
    });

    it('returns an empty work-week range when no working days are specified', () => {
      expect(getDateRange(date, 'workWeek', 'sunday', [])).toEqual([]);
    });

    it.each(testData)(`can get %s`, ({ testItems, expected }) => {
      expect(testItems).toEqual(expected);
    });
  });

  it.each([-1, 1.5, Infinity, -Infinity, NaN])('rejects an invalid weeksInMonth value of %s', weeksInMonth => {
    expect(() => getWeekNumbersInMonth(weeksInMonth, 'monday', 'firstFullWeek', new Date(2020, 8, 18))).toThrow(
      new RangeError('weeksInMonth must be a non-negative finite integer.'),
    );
  });

  it('returns no week numbers when zero weeks are requested', () => {
    expect(getWeekNumbersInMonth(0, 'monday', 'firstFullWeek', new Date(2020, 8, 18))).toEqual([]);
  });

  it('rejects an invalid navigated date when calculating week numbers', () => {
    expect(() => getWeekNumbersInMonth(1, 'monday', 'firstFullWeek', new Date(NaN))).toThrow(
      new RangeError('navigatedDate must be valid.'),
    );
  });

  it('continues week numbers across a month boundary', () => {
    expect(getWeekNumbersInMonth(6, 'sunday', 'firstDay', new Date(2020, 8, 1))).toEqual([36, 37, 38, 39, 40, 41]);
  });

  // Generating week numbers array per month
  it('can calculate week numbers from selected date', () => {
    // firstDayOfWeek is Monday, firstWeekOfYear is firstFullWeek
    let date = new Date(2017, 0, 4);
    let result = getWeekNumbersInMonth(6, 'monday', 'firstFullWeek', date);
    let expected = 52;
    expect(result[0]).toEqual(expected);

    // firstDayOfWeek is Sunday, firstWeekOfYear is firstFullWeek
    date = new Date(2000, 11, 31);
    result = getWeekNumbersInMonth(6, 'sunday', 'firstFullWeek', date);
    expected = 53;
    expect(result[5]).toEqual(expected);

    // firstDayOfWeek is Sunday, firstWeekOfYear is firstFullWeek
    date = new Date(2010, 0, 1);
    result = getWeekNumbersInMonth(6, 'sunday', 'firstFullWeek', date);
    expected = 52;
    expect(result[0]).toEqual(expected);

    // firstDayOfWeek is Sunday, firstWeekOfYear is firstFourDayWeek
    date = new Date(2018, 11, 31);
    result = getWeekNumbersInMonth(6, 'sunday', 'firstFourDayWeek', date);
    expected = 1;
    expect(result[5]).toEqual(expected);
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

  it('can get the year start and end', () => {
    const date = new Date('Dec 15 2017');

    // First day of year
    expect(areDatesEqual(new Date('Jan 1 2017'), getYearStart(date))).toBe(true);

    // Last day of year
    expect(areDatesEqual(new Date('Dec 31 2017'), getYearEnd(date))).toBe(true);
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

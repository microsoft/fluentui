import { daysOfWeek } from './constants';
import type { DayOfWeek } from './constants';
import { compareDatePart } from './dateMath';
import { getDateRange, getDateRangeTypeToUse } from './dateRange';
import { getDayGrid } from './dayGrid';

const areDatesEqual = (date1: Date, date2: Date) => compareDatePart(date1, date2) === 0;

describe('getDateRange', () => {
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

describe('getDateRangeTypeToUse', () => {
  it.each<{ days: DayOfWeek[] | undefined; firstDay: DayOfWeek; expected: 'week' | 'workWeek' }>([
    { days: undefined, firstDay: 'sunday', expected: 'workWeek' },
    { days: [], firstDay: 'sunday', expected: 'week' },
    { days: ['monday'], firstDay: 'sunday', expected: 'workWeek' },
    { days: ['monday', 'tuesday', 'tuesday'], firstDay: 'sunday', expected: 'workWeek' },
    { days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], firstDay: 'sunday', expected: 'workWeek' },
    { days: ['wednesday', 'monday', 'tuesday'], firstDay: 'sunday', expected: 'workWeek' },
    { days: ['monday', 'wednesday'], firstDay: 'sunday', expected: 'week' },
    { days: ['saturday', 'sunday', 'monday'], firstDay: 'sunday', expected: 'week' },
    { days: ['saturday', 'sunday', 'monday'], firstDay: 'tuesday', expected: 'workWeek' },
    { days: [...daysOfWeek], firstDay: 'monday', expected: 'workWeek' },
  ])('uses $expected for $days with a $firstDay start', ({ days, firstDay, expected }) => {
    expect(getDateRangeTypeToUse('workWeek', days, firstDay)).toBe(expected);
  });

  describe('default work-week behavior', () => {
    it('matches the explicit Monday-Friday configuration', () => {
      const options = {
        dateRangeType: 'workWeek' as const,
        firstDayOfWeek: 'wednesday' as const,
        navigatedDate: new Date(2026, 8, 18),
        today: new Date(2026, 8, 18),
        selectedDate: new Date(2026, 8, 18),
      };

      const omitted = getDayGrid(options)
        .flat()
        .filter(day => day.isSelected)
        .map(day => day.key);
      const explicit = getDayGrid({
        ...options,
        workWeekDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      })
        .flat()
        .filter(day => day.isSelected)
        .map(day => day.key);

      expect(omitted).toEqual(explicit);
    });
  });

  it.each(['day', 'week', 'month'] as const)('preserves %s regardless of work-week days', rangeType => {
    expect(getDateRangeTypeToUse(rangeType, [], 'sunday')).toBe(rangeType);
    expect(getDateRangeTypeToUse(rangeType, ['monday', 'wednesday'], 'sunday')).toBe(rangeType);
  });
});

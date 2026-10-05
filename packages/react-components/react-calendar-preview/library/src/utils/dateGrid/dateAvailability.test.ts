import { findAvailableDate, getBoundedDateRange, isRestrictedDate } from './dateAvailability';
import * as dateMath from '../dateMath';
import type { AvailableDateOptions } from './dateGrid.types';

jest.mock('../dateMath', () => ({
  __esModule: true,
  ...jest.requireActual<typeof import('../dateMath')>('../dateMath'),
}));

describe('isRestrictedDate', () => {
  const date = new Date(2020, 8, 18);

  it('allows unrestricted dates and empty restrictions', () => {
    expect(isRestrictedDate(date, {})).toBe(false);
    expect(isRestrictedDate(date, { restrictedDates: [] })).toBe(false);
  });

  it('uses inclusive min/max bounds ignoring time of day', () => {
    const options = { minDate: new Date(2020, 8, 18, 12), maxDate: new Date(2020, 8, 20) };
    expect(isRestrictedDate(date, options)).toBe(false);
    expect(isRestrictedDate(new Date(2020, 8, 20, 23), options)).toBe(false);
    expect(isRestrictedDate(new Date(2020, 8, 17), options)).toBe(true);
    expect(isRestrictedDate(new Date(2020, 8, 21), options)).toBe(true);
  });

  it('matches restricted dates by year, month and day, not time', () => {
    expect(isRestrictedDate(date, { restrictedDates: [new Date(2020, 8, 18, 23)] })).toBe(true);
    expect(isRestrictedDate(date, { restrictedDates: [new Date(2020, 7, 18), new Date(2019, 8, 18)] })).toBe(false);
  });
});

describe('findAvailableDate', () => {
  afterEach(() => jest.restoreAllMocks());

  const targetDate = new Date(2020, 8, 18);
  const options: AvailableDateOptions = { targetDate, initialDate: new Date(2020, 8, 15), direction: 1 };

  it('returns the available target unchanged, including the initial date', () => {
    expect(findAvailableDate(options)).toBe(targetDate);
    expect(findAvailableDate({ ...options, initialDate: targetDate })).toBe(targetDate);
  });

  it.each([1, -1] as const)('skips consecutive restricted dates in direction %s', direction => {
    expect(
      findAvailableDate({
        ...options,
        direction,
        restrictedDates: [targetDate, new Date(2020, 8, 18 + direction)],
      }),
    ).toEqual(new Date(2020, 8, 18 + 2 * direction));
    expect(targetDate).toEqual(new Date(2020, 8, 18));
  });

  it.each([1, -1] as const)('stops when reaching the initial date in direction %s', direction => {
    expect(
      findAvailableDate({
        ...options,
        direction,
        initialDate: new Date(2020, 8, 18 + direction),
        restrictedDates: [targetDate],
      }),
    ).toBeUndefined();
  });

  it('does not search beyond the min/max date', () => {
    expect(findAvailableDate({ ...options, restrictedDates: [targetDate], maxDate: targetDate })).toBeUndefined();
    expect(
      findAvailableDate({ ...options, direction: -1, restrictedDates: [targetDate], minDate: targetDate }),
    ).toBeUndefined();
    expect(findAvailableDate({ ...options, minDate: new Date(2020, 8, 19) })).toBeUndefined();
    expect(findAvailableDate({ ...options, maxDate: new Date(2020, 8, 17) })).toBeUndefined();
  });

  it('returns undefined when the initial date is itself restricted', () => {
    expect(findAvailableDate({ ...options, initialDate: targetDate, restrictedDates: [targetDate] })).toBeUndefined();
  });

  it.each([0, 2, -2, 0.5, NaN, Infinity, -Infinity])('rejects direction %s even for an available target', direction => {
    expect(() =>
      // @ts-expect-error Verify the runtime contract for JavaScript callers.
      findAvailableDate({ ...options, direction }),
    ).toThrow(new RangeError('direction must be 1 or -1.'));
  });

  it.each(['targetDate', 'initialDate'] as const)('rejects an invalid %s', field => {
    expect(() => findAvailableDate({ ...options, [field]: new Date(NaN) })).toThrow(
      new RangeError('targetDate and initialDate must be valid.'),
    );
  });

  it('rejects a search that exceeds the Date range', () => {
    const lastDate = new Date(8640000000000000);
    expect(() => findAvailableDate({ ...options, targetDate: lastDate, restrictedDates: [lastDate] })).toThrow(
      new RangeError('Cannot search for an out-of-range date.'),
    );
  });

  it('advances independently when a skipped day normalizes to the previous candidate', () => {
    const addDays = dateMath.addDays;
    const offset = jest.spyOn(dateMath, 'addDays').mockImplementation((date, days) => {
      return days === -1 ? new Date(date) : addDays(date, days);
    });
    expect(findAvailableDate({ ...options, direction: -1, restrictedDates: [targetDate] })).toEqual(
      new Date(2020, 8, 16),
    );
    expect(offset.mock.calls.map(([, days]) => days)).toEqual([-1, -2]);
  });

  it('searches backward across December 30, 2011 using the runtime timezone', () => {
    const date = new Date(2011, 11, 31);
    const skippedFriday = new Date(2011, 11, 30).getDate() !== 30;
    expect(
      findAvailableDate({
        targetDate: date,
        initialDate: new Date(2012, 0, 1),
        direction: -1,
        restrictedDates: [date],
      }),
    ).toEqual(new Date(2011, 11, skippedFriday ? 29 : 30));
  });
});

describe('getBoundedDateRange', () => {
  const dates = [new Date(2020, 8, 17), new Date(2020, 8, 18), new Date(2020, 8, 19)];

  it('returns a copy when there are no bounds', () => {
    const result = getBoundedDateRange(dates);
    expect(result).toEqual(dates);
    expect(result).not.toBe(dates);
  });

  it('filters inclusive min/max bounds independently and together without mutating the input', () => {
    expect(getBoundedDateRange(dates, dates[1])).toEqual(dates.slice(1));
    expect(getBoundedDateRange(dates, undefined, dates[1])).toEqual(dates.slice(0, 2));
    expect(getBoundedDateRange(dates, new Date(2020, 8, 18, 12), dates[1])).toEqual([dates[1]]);
    expect(dates).toHaveLength(3);
  });

  it('returns no dates for an empty range or disjoint bounds', () => {
    expect(getBoundedDateRange([], dates[0], dates[2])).toEqual([]);
    expect(getBoundedDateRange(dates, new Date(2020, 8, 20))).toEqual([]);
    expect(getBoundedDateRange(dates, dates[2], dates[0])).toEqual([]);
  });
});

import { DAYS_IN_WEEK, daysOfWeek, monthsOfYear } from './constants';
import { getDayIndex, getDayFromIndex, getMonthIndex } from './dateUtils';

describe('calendar constants', () => {
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

  it('orders months to match local Date indices', () => {
    expect(monthsOfYear).toHaveLength(12);
    monthsOfYear.forEach((month, index) => {
      expect(getMonthIndex(month)).toBe(new Date(2020, index, 1).getMonth());
    });
  });
});

import { daysOfWeek } from '../constants';
import type { DayOfWeek } from '../constants';
import { getDateRangeTypeToUse } from './workWeek';

describe('getDateRangeTypeToUse', () => {
  it.each<{ days: DayOfWeek[] | undefined; firstDay: DayOfWeek; expected: 'week' | 'workWeek' }>([
    { days: undefined, firstDay: 'sunday', expected: 'workWeek' },
    { days: [], firstDay: 'sunday', expected: 'week' },
    { days: ['monday'], firstDay: 'sunday', expected: 'workWeek' },
    { days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], firstDay: 'sunday', expected: 'workWeek' },
    { days: ['wednesday', 'monday', 'tuesday'], firstDay: 'sunday', expected: 'workWeek' },
    { days: ['monday', 'wednesday'], firstDay: 'sunday', expected: 'week' },
    { days: ['saturday', 'sunday', 'monday'], firstDay: 'sunday', expected: 'week' },
    { days: ['saturday', 'sunday', 'monday'], firstDay: 'tuesday', expected: 'workWeek' },
    { days: [...daysOfWeek], firstDay: 'monday', expected: 'workWeek' },
  ])('uses $expected for $days with a $firstDay start', ({ days, firstDay, expected }) => {
    expect(getDateRangeTypeToUse('workWeek', days, firstDay)).toBe(expected);
  });

  it.each(['day', 'week', 'month'] as const)('preserves %s regardless of work-week days', rangeType => {
    expect(getDateRangeTypeToUse(rangeType, [], 'sunday')).toBe(rangeType);
    expect(getDateRangeTypeToUse(rangeType, ['monday', 'wednesday'], 'sunday')).toBe(rangeType);
  });
});

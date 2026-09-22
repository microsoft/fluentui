import { daysOfWeek } from '../constants';
import type { DayOfWeek } from '../constants';
import { getDateRangeTypeToUse } from './workWeek';
import { getDayGrid } from './getDayGrid';

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
        firstWeekOfYear: 'firstFullWeek' as const,
        navigatedDate: new Date(2026, 8, 18),
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

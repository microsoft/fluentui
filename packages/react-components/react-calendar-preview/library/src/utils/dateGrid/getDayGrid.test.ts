import { getDayGrid } from './getDayGrid';
import type { DayGridOptions } from './dateGrid.types';

const defaultOptions: DayGridOptions = {
  dateRangeType: 'day',
  firstDayOfWeek: 'sunday',
  firstWeekOfYear: 'firstFullWeek',
  navigatedDate: new Date(2020, 8, 18),
};

describe('getDayGrid', () => {
  it.each([0, -1, 1.5, Infinity, -Infinity, NaN])('rejects an invalid weeksToShow value of %s', weeksToShow => {
    expect(() => getDayGrid({ ...defaultOptions, weeksToShow })).toThrow(
      new RangeError('weeksToShow must be a positive finite integer.'),
    );
  });
});

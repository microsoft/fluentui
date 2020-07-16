import { DayOfWeek } from '../dateValues/dateValues';
import { isContiguous } from './isContiguous';

describe('isContiguous', () => {
  it('returns false if non-consecutive days', () => {
    const result = isContiguous([DayOfWeek.Friday, DayOfWeek.Sunday]);
    expect(result).toBeFalsy();
  });
  it('returns true if consecutive work days', () => {
    const result = isContiguous([
      DayOfWeek.Friday,
      DayOfWeek.Thursday,
      DayOfWeek.Wednesday,
      DayOfWeek.Tuesday,
      DayOfWeek.Monday,
    ]);
    expect(result).toBeTruthy();
  });
  it('returns true if weekend', () => {
    const result = isContiguous([DayOfWeek.Saturday, DayOfWeek.Sunday]);
    expect(result).toBeTruthy();
  });
});

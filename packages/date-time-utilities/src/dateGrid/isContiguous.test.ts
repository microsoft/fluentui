import { DayOfWeek } from '../dateValues/dateValues';
import { isContiguous } from './isContiguous';

describe('isContiguous', () => {
  it('returns false if non-consecutive days', () => {
    const result = isContiguous([DayOfWeek.Friday, DayOfWeek.Sunday], false, DayOfWeek.Friday);
    expect(result).toBeFalsy();
  });
  it('returns true if consecutive work days', () => {
    const result = isContiguous(
      [DayOfWeek.Friday, DayOfWeek.Thursday, DayOfWeek.Wednesday, DayOfWeek.Tuesday, DayOfWeek.Monday],
      true,
      DayOfWeek.Monday,
    );
    expect(result).toBeTruthy();
  });
  it('returns true if weekend and not one week', () => {
    const result = isContiguous([DayOfWeek.Saturday, DayOfWeek.Sunday], false, DayOfWeek.Sunday);
    expect(result).toBeTruthy();
  });
  it('returns false if weekend and one week', () => {
    const result = isContiguous([DayOfWeek.Saturday, DayOfWeek.Sunday], true, DayOfWeek.Sunday);
    expect(result).toBeFalsy();
  });
});

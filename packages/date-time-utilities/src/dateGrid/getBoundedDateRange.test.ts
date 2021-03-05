import * as DateGrid from './getBoundedDateRange';
import { MonthOfYear } from '../dateValues/dateValues';

describe('getBoundedDateRange', () => {
  const defaultRange = [
    new Date(2016, MonthOfYear.April, 1),
    new Date(2016, MonthOfYear.April, 2),
    new Date(2016, MonthOfYear.April, 3),
    new Date(2016, MonthOfYear.April, 4),
  ];
  it('returns same range if min and max dates are empty', () => {
    const result = DateGrid.getBoundedDateRange(defaultRange);
    const expected = defaultRange;
    expect(result).toEqual(expected);
  });
  it('returns adjusted range if min date is present', () => {
    const result = DateGrid.getBoundedDateRange(defaultRange, new Date(2016, MonthOfYear.April, 3));
    const expected = [new Date(2016, MonthOfYear.April, 3), new Date(2016, MonthOfYear.April, 4)];
    expect(result).toEqual(expected);
  });
  it('returns adjusted range if max date is present', () => {
    const result = DateGrid.getBoundedDateRange(defaultRange, undefined, new Date(2016, MonthOfYear.April, 2));
    const expected = [new Date(2016, MonthOfYear.April, 1), new Date(2016, MonthOfYear.April, 2)];
    expect(result).toEqual(expected);
  });
  it('returns adjusted range if min and max dates are present', () => {
    const result = DateGrid.getBoundedDateRange(
      defaultRange,
      new Date(2016, MonthOfYear.April, 3),
      new Date(2016, MonthOfYear.April, 3),
    );
    const expected = [new Date(2016, MonthOfYear.April, 3)];
    expect(result).toEqual(expected);
  });
});

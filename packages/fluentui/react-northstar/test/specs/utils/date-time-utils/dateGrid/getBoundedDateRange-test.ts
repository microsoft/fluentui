import * as DateGrid from '../../../../../src/utils/date-time-utilities/dateGrid/getBoundedDateRange';

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

describe('getBoundedDateRange', () => {
  const defaultRange = [
    new Date(2016, Months.Apr, 1),
    new Date(2016, Months.Apr, 2),
    new Date(2016, Months.Apr, 3),
    new Date(2016, Months.Apr, 4),
  ];
  it('returns same range if min and max dates are empty', () => {
    const result = DateGrid.getBoundedDateRange(defaultRange);
    const expected = defaultRange;
    expect(result).toEqual(expected);
  });
  it('returns adjusted range if min date is present', () => {
    const result = DateGrid.getBoundedDateRange(defaultRange, new Date(2016, Months.Apr, 3));
    const expected = [new Date(2016, Months.Apr, 3), new Date(2016, Months.Apr, 4)];
    expect(result).toEqual(expected);
  });
  it('returns adjusted range if max date is present', () => {
    const result = DateGrid.getBoundedDateRange(defaultRange, undefined, new Date(2016, Months.Apr, 2));
    const expected = [new Date(2016, Months.Apr, 1), new Date(2016, Months.Apr, 2)];
    expect(result).toEqual(expected);
  });
  it('returns adjusted range if min and max dates are present', () => {
    const result = DateGrid.getBoundedDateRange(
      defaultRange,
      new Date(2016, Months.Apr, 3),
      new Date(2016, Months.Apr, 3),
    );
    const expected = [new Date(2016, Months.Apr, 3)];
    expect(result).toEqual(expected);
  });
});

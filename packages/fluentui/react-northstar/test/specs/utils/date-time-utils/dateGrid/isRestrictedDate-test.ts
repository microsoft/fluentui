import * as DateGrid from '../../../../../src/utils/date-time-utilities/dateGrid/isRestrictedDate';
import { IRestrictedDatesOptions } from '../../../../../src/utils/date-time-utilities/dateGrid/dateGrid.types';

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

describe('isRestrictedDate', () => {
  const date = new Date(2016, Months.Apr, 3);
  it('returns false if options are empty', () => {
    const options: IRestrictedDatesOptions = {};
    const result = DateGrid.isRestrictedDate(date, options);
    expect(result).toBeFalsy();
  });
  it('returns true if restricted dates include date', () => {
    const options: IRestrictedDatesOptions = {
      restrictedDates: [new Date(2016, Months.Apr, 3)],
    };
    const result = DateGrid.isRestrictedDate(date, options);
    expect(result).toBeTruthy();
  });
});

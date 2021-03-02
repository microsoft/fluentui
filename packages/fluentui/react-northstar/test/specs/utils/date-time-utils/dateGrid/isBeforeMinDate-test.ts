import * as DateGrid from '../../../../../src/utils/date-time-utilities/dateGrid/isBeforeMinDate';
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

describe('isBeforeMinDate', () => {
  const date = new Date(2016, Months.Apr, 3);
  it('returns false if min date is empty', () => {
    const options: IRestrictedDatesOptions = {};
    const result = DateGrid.isBeforeMinDate(date, options);
    expect(result).toBeFalsy();
  });
  it('returns true if min date is greater than date', () => {
    const options: IRestrictedDatesOptions = {
      minDate: new Date(2016, Months.Apr, 7),
    };
    const result = DateGrid.isBeforeMinDate(date, options);
    expect(result).toBeTruthy();
  });
  it('returns false if min date is equal to date', () => {
    const options: IRestrictedDatesOptions = {
      minDate: new Date(2016, Months.Apr, 3),
    };
    const result = DateGrid.isBeforeMinDate(date, options);
    expect(result).toBeFalsy();
  });
  it('returns false if min date is less than date', () => {
    const options: IRestrictedDatesOptions = {
      minDate: new Date(2016, Months.Apr, 1),
    };
    const result = DateGrid.isBeforeMinDate(date, options);
    expect(result).toBeFalsy();
  });
});

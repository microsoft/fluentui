import * as DateGrid from './isBeforeMinDate';
import { MonthOfYear } from '../dateValues/dateValues';
import type { IRestrictedDatesOptions } from './dateGrid.types';

describe('isBeforeMinDate', () => {
  const date = new Date(2016, MonthOfYear.April, 3);
  it('returns false if min date is empty', () => {
    const options: IRestrictedDatesOptions = {};
    const result = DateGrid.isBeforeMinDate(date, options);
    expect(result).toBeFalsy();
  });
  it('returns true if min date is greater than date', () => {
    const options: IRestrictedDatesOptions = {
      minDate: new Date(2016, MonthOfYear.April, 7),
    };
    const result = DateGrid.isBeforeMinDate(date, options);
    expect(result).toBeTruthy();
  });
  it('returns false if min date is equal to date', () => {
    const options: IRestrictedDatesOptions = {
      minDate: new Date(2016, MonthOfYear.April, 3),
    };
    const result = DateGrid.isBeforeMinDate(date, options);
    expect(result).toBeFalsy();
  });
  it('returns false if min date is less than date', () => {
    const options: IRestrictedDatesOptions = {
      minDate: new Date(2016, MonthOfYear.April, 1),
    };
    const result = DateGrid.isBeforeMinDate(date, options);
    expect(result).toBeFalsy();
  });
});

import { IRestrictedDatesOptions } from './dateGrid.types';
import * as DateGrid from './isAfterMaxDate';
import { MonthOfYear } from '../dateValues/dateValues';

describe('isAfterMaxDate', () => {
  const date = new Date(2016, MonthOfYear.April, 3);
  it('returns false if max date is empty', () => {
    const options: IRestrictedDatesOptions = {};
    const result = DateGrid.isAfterMaxDate(date, options);
    expect(result).toBeFalsy();
  });
  it('returns false if max date is greater than date', () => {
    const options: IRestrictedDatesOptions = {
      maxDate: new Date(2016, MonthOfYear.April, 7),
    };
    const result = DateGrid.isAfterMaxDate(date, options);
    expect(result).toBeFalsy();
  });
  it('returns false if max date is equal to date', () => {
    const options: IRestrictedDatesOptions = {
      maxDate: new Date(2016, MonthOfYear.April, 3),
    };
    const result = DateGrid.isAfterMaxDate(date, options);
    expect(result).toBeFalsy();
  });
  it('returns true if max date is less than date', () => {
    const options: IRestrictedDatesOptions = {
      maxDate: new Date(2016, MonthOfYear.April, 1),
    };
    const result = DateGrid.isAfterMaxDate(date, options);
    expect(result).toBeTruthy();
  });
});

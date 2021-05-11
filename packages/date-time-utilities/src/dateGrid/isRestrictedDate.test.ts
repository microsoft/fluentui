import * as DateGrid from './isRestrictedDate';
import { IRestrictedDatesOptions } from './dateGrid.types';
import { MonthOfYear } from '../dateValues/dateValues';

describe('isRestrictedDate', () => {
  const date = new Date(2016, MonthOfYear.April, 3);
  it('returns false if options are empty', () => {
    const options: IRestrictedDatesOptions = {};
    const result = DateGrid.isRestrictedDate(date, options);
    expect(result).toBeFalsy();
  });
  it('returns true if restricted dates include date', () => {
    const options: IRestrictedDatesOptions = {
      restrictedDates: [new Date(2016, MonthOfYear.April, 3)],
    };
    const result = DateGrid.isRestrictedDate(date, options);
    expect(result).toBeTruthy();
  });
});

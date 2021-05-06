import { IAvailableDateOptions } from './dateGrid.types';
import * as DateGrid from './findAvailableDate';
import { MonthOfYear } from '../dateValues/dateValues';

describe('findAvailableDate', () => {
  const defaultOptions: IAvailableDateOptions = {
    initialDate: new Date(2016, MonthOfYear.April, 1),
    targetDate: new Date(2016, MonthOfYear.April, 2),
    direction: 1,
  };
  it('returns next available date', () => {
    const result = DateGrid.findAvailableDate(defaultOptions);
    const expected = defaultOptions.targetDate;
    expect(result).toEqual(expected);
  });
  it('returns next available date, within date restrictions', () => {
    const minDateOptions = { ...defaultOptions };
    minDateOptions.restrictedDates = [new Date(2016, MonthOfYear.April, 2), new Date(2016, MonthOfYear.April, 3)];
    const result = DateGrid.findAvailableDate(minDateOptions);
    const expected = new Date(2016, MonthOfYear.April, 4);
    expect(result).toEqual(expected);
  });
  it('returns previous available date', () => {
    const reverseOptions: IAvailableDateOptions = {
      initialDate: new Date(2016, MonthOfYear.April, 2),
      targetDate: new Date(2016, MonthOfYear.April, 1),
      direction: -1,
    };
    const result = DateGrid.findAvailableDate(reverseOptions);
    const expected = new Date(2016, MonthOfYear.April, 1);
    expect(result).toEqual(expected);
  });
  it('returns previous available date, within date restrictions', () => {
    const reverseOptions: IAvailableDateOptions = {
      initialDate: new Date(2016, MonthOfYear.April, 2),
      targetDate: new Date(2016, MonthOfYear.April, 1),
      direction: -1,
      restrictedDates: [new Date(2016, MonthOfYear.April, 1), new Date(2016, MonthOfYear.April, 2)],
    };
    const result = DateGrid.findAvailableDate(reverseOptions);
    const expected = new Date(2016, MonthOfYear.March, 31);
    expect(result).toEqual(expected);
  });
});

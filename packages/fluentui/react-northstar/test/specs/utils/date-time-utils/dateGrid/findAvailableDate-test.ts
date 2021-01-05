import { IAvailableDateOptions } from '../../../../../src/utils/date-time-utilities/dateGrid/dateGrid.types';
import * as DateGrid from '../../../../../src/utils/date-time-utilities/dateGrid/findAvailableDate';

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

describe('findAvailableDate', () => {
  const defaultOptions: IAvailableDateOptions = {
    initialDate: new Date(2016, Months.Apr, 1),
    targetDate: new Date(2016, Months.Apr, 2),
    direction: 1,
  };
  it('returns next available date', () => {
    const result = DateGrid.findAvailableDate(defaultOptions);
    const expected = defaultOptions.targetDate;
    expect(result).toEqual(expected);
  });
  it('returns next available date, within date restrictions', () => {
    const minDateOptions = { ...defaultOptions };
    minDateOptions.restrictedDates = [new Date(2016, Months.Apr, 2), new Date(2016, Months.Apr, 3)];
    const result = DateGrid.findAvailableDate(minDateOptions);
    const expected = new Date(2016, Months.Apr, 4);
    expect(result).toEqual(expected);
  });
  it('returns previous available date', () => {
    const reverseOptions: IAvailableDateOptions = {
      initialDate: new Date(2016, Months.Apr, 2),
      targetDate: new Date(2016, Months.Apr, 1),
      direction: -1,
    };
    const result = DateGrid.findAvailableDate(reverseOptions);
    const expected = new Date(2016, Months.Apr, 1);
    expect(result).toEqual(expected);
  });
  it('returns previous available date, within date restrictions', () => {
    const reverseOptions: IAvailableDateOptions = {
      initialDate: new Date(2016, Months.Apr, 2),
      targetDate: new Date(2016, Months.Apr, 1),
      direction: -1,
      restrictedDates: [new Date(2016, Months.Apr, 1), new Date(2016, Months.Apr, 2)],
    };
    const result = DateGrid.findAvailableDate(reverseOptions);
    const expected = new Date(2016, Months.Mar, 31);
    expect(result).toEqual(expected);
  });
});

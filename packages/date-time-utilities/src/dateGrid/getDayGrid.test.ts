import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '../dateValues/dateValues';
import { IDayGridOptions } from './dateGrid.types';
import * as DateGrid from './getDayGrid';

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

describe('Timezones', () => {
  it('should always be UTC', () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});

describe('getDayGrid', () => {
  const defaultOptions: IDayGridOptions = {
    selectedDate: new Date(2016, Months.Apr, 1),
    navigatedDate: new Date(2016, Months.Apr, 1),
    firstDayOfWeek: DayOfWeek.Sunday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    dateRangeType: DateRangeType.Day,
  };

  it('returns matrix with days', () => {
    const result = DateGrid.getDayGrid(defaultOptions);
    expect(result).toMatchSnapshot();
  });
});

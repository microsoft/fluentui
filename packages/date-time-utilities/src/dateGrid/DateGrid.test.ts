import { DayOfWeek, DateRangeType, FirstWeekOfYear } from '../dateValues/DateValues';
import * as DateGrid from './DateGrid';
import { IDayGridOptions, IRestrictedDatesOptions, IAvailableDateOptions, IDateGridStrings } from './DateGrid.types';

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

describe('DateUtils', () => {
  const strings: IDateGridStrings = {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    shortDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };

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

  describe('isAfterMaxDate', () => {
    const date = new Date(2016, Months.Apr, 3);
    it('returns false if max date is empty', () => {
      const options: IRestrictedDatesOptions = {};
      const result = DateGrid.isAfterMaxDate(date, options);
      expect(result).toBeFalsy();
    });
    it('returns false if max date is greater than date', () => {
      const options: IRestrictedDatesOptions = {
        maxDate: new Date(2016, Months.Apr, 7),
      };
      const result = DateGrid.isAfterMaxDate(date, options);
      expect(result).toBeFalsy();
    });
    it('returns false if max date is equal to date', () => {
      const options: IRestrictedDatesOptions = {
        maxDate: new Date(2016, Months.Apr, 3),
      };
      const result = DateGrid.isAfterMaxDate(date, options);
      expect(result).toBeFalsy();
    });
    it('returns true if max date is less than date', () => {
      const options: IRestrictedDatesOptions = {
        maxDate: new Date(2016, Months.Apr, 1),
      };
      const result = DateGrid.isAfterMaxDate(date, options);
      expect(result).toBeTruthy();
    });
  });
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
  describe('formatMonthDayYear', () => {
    const date = new Date(2016, Months.Apr, 1);
    it('returns default format', () => {
      const result = DateGrid.formatMonthDayYear(date, strings);
      expect(result).toBe('April 1, 2016');
    });
  });
  describe('formatMonthYear', () => {
    const date = new Date(2016, Months.Apr, 1);
    it('returns default format', () => {
      const result = DateGrid.formatMonthYear(date, strings);
      expect(result).toBe('April 2016');
    });
  });
  describe('formatDay', () => {
    const date = new Date(2016, Months.Apr, 1);
    it('returns default format', () => {
      const result = DateGrid.formatDay(date);
      expect(result).toBe('1');
    });
  });
  describe('formatYear', () => {
    const date = new Date(2016, Months.Apr, 1);
    it('returns default format', () => {
      const result = DateGrid.formatYear(date);
      expect(result).toBe('2016');
    });
  });
  describe('getDateRangeTypeToUse', () => {
    it('returns incoming range type if working days are empty', () => {
      const resultDay = DateGrid.getDateRangeTypeToUse(DateRangeType.Day, undefined);
      expect(resultDay).toBe(DateRangeType.Day);
      const resultWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.Week, undefined);
      expect(resultWeek).toBe(DateRangeType.Week);
      const resultMonth = DateGrid.getDateRangeTypeToUse(DateRangeType.Month, undefined);
      expect(resultMonth).toBe(DateRangeType.Month);
      const resultWorkWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.WorkWeek, undefined);
      expect(resultWorkWeek).toBe(DateRangeType.WorkWeek);
    });
    it('returns Week range type if working days are non-contiguous and incoming type is WorkWeek', () => {
      const resultWorkWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.WorkWeek, [
        DayOfWeek.Monday,
        DayOfWeek.Wednesday,
      ]);
      expect(resultWorkWeek).toBe(DateRangeType.Week);
    });
    it('returns WorkWeek range type if working days are contiguous and incoming type is WorkWeek', () => {
      const resultWorkWeek = DateGrid.getDateRangeTypeToUse(DateRangeType.WorkWeek, [
        DayOfWeek.Monday,
        DayOfWeek.Tuesday,
      ]);
      expect(resultWorkWeek).toBe(DateRangeType.WorkWeek);
    });
  });
});

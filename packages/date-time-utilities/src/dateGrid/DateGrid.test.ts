import { DayOfWeek, DateRangeType, FirstWeekOfYear } from '../dateValues/DateValues';
import * as DateGrid from './DateGrid';
import { IDay, IDayGridOptions, IRestrictedDatesOptions, IAvailableDateOptions, IGridStrings } from './DateGrid.types';

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

describe('DateUtils', () => {
  const strings: IGridStrings = {
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

    const defautlResult: IDay[][] = [
      [
        {
          date: '20',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Sun Mar 20 2016 00:00:00 GMT+0100 (Central European Standard Time)',
          originalDate: new Date('2016-03-19T23:00:00.000Z'),
        },
        {
          date: '21',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Mon Mar 21 2016 00:00:00 GMT+0100 (Central European Standard Time)',
          originalDate: new Date('2016-03-20T23:00:00.000Z'),
        },
        {
          date: '22',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Tue Mar 22 2016 00:00:00 GMT+0100 (Central European Standard Time)',
          originalDate: new Date('2016-03-21T23:00:00.000Z'),
        },
        {
          date: '23',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Wed Mar 23 2016 00:00:00 GMT+0100 (Central European Standard Time)',
          originalDate: new Date('2016-03-22T23:00:00.000Z'),
        },
        {
          date: '24',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Thu Mar 24 2016 00:00:00 GMT+0100 (Central European Standard Time)',
          originalDate: new Date('2016-03-23T23:00:00.000Z'),
        },
        {
          date: '25',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Fri Mar 25 2016 00:00:00 GMT+0100 (Central European Standard Time)',
          originalDate: new Date('2016-03-24T23:00:00.000Z'),
        },
        {
          date: '26',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Sat Mar 26 2016 00:00:00 GMT+0100 (Central European Standard Time)',
          originalDate: new Date('2016-03-25T23:00:00.000Z'),
        },
      ],
      [
        {
          date: '27',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Sun Mar 27 2016 00:00:00 GMT+0100 (Central European Standard Time)',
          originalDate: new Date('2016-03-26T23:00:00.000Z'),
        },
        {
          date: '28',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Mon Mar 28 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-03-27T22:00:00.000Z'),
        },
        {
          date: '29',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Tue Mar 29 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-03-28T22:00:00.000Z'),
        },
        {
          date: '30',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Wed Mar 30 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-03-29T22:00:00.000Z'),
        },
        {
          date: '31',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Thu Mar 31 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-03-30T22:00:00.000Z'),
        },
        {
          date: '1',
          isInBounds: true,
          isInMonth: true,
          isSelected: true,
          isToday: false,
          key: 'Fri Apr 01 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-03-31T22:00:00.000Z'),
        },
        {
          date: '2',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Sat Apr 02 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-01T22:00:00.000Z'),
        },
      ],
      [
        {
          date: '3',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Sun Apr 03 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-02T22:00:00.000Z'),
        },
        {
          date: '4',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Mon Apr 04 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-03T22:00:00.000Z'),
        },
        {
          date: '5',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Tue Apr 05 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-04T22:00:00.000Z'),
        },
        {
          date: '6',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Wed Apr 06 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-05T22:00:00.000Z'),
        },
        {
          date: '7',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Thu Apr 07 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-06T22:00:00.000Z'),
        },
        {
          date: '8',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Fri Apr 08 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-07T22:00:00.000Z'),
        },
        {
          date: '9',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Sat Apr 09 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-08T22:00:00.000Z'),
        },
      ],
      [
        {
          date: '10',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Sun Apr 10 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-09T22:00:00.000Z'),
        },
        {
          date: '11',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Mon Apr 11 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-10T22:00:00.000Z'),
        },
        {
          date: '12',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Tue Apr 12 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-11T22:00:00.000Z'),
        },
        {
          date: '13',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Wed Apr 13 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-12T22:00:00.000Z'),
        },
        {
          date: '14',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Thu Apr 14 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-13T22:00:00.000Z'),
        },
        {
          date: '15',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Fri Apr 15 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-14T22:00:00.000Z'),
        },
        {
          date: '16',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Sat Apr 16 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-15T22:00:00.000Z'),
        },
      ],
      [
        {
          date: '17',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Sun Apr 17 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-16T22:00:00.000Z'),
        },
        {
          date: '18',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Mon Apr 18 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-17T22:00:00.000Z'),
        },
        {
          date: '19',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Tue Apr 19 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-18T22:00:00.000Z'),
        },
        {
          date: '20',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Wed Apr 20 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-19T22:00:00.000Z'),
        },
        {
          date: '21',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Thu Apr 21 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-20T22:00:00.000Z'),
        },
        {
          date: '22',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Fri Apr 22 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-21T22:00:00.000Z'),
        },
        {
          date: '23',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Sat Apr 23 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-22T22:00:00.000Z'),
        },
      ],
      [
        {
          date: '24',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Sun Apr 24 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-23T22:00:00.000Z'),
        },
        {
          date: '25',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Mon Apr 25 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-24T22:00:00.000Z'),
        },
        {
          date: '26',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Tue Apr 26 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-25T22:00:00.000Z'),
        },
        {
          date: '27',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Wed Apr 27 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-26T22:00:00.000Z'),
        },
        {
          date: '28',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Thu Apr 28 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-27T22:00:00.000Z'),
        },
        {
          date: '29',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Fri Apr 29 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-28T22:00:00.000Z'),
        },
        {
          date: '30',
          isInBounds: true,
          isInMonth: true,
          isSelected: false,
          isToday: false,
          key: 'Sat Apr 30 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-29T22:00:00.000Z'),
        },
      ],
      [
        {
          date: '1',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Sun May 01 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-04-30T22:00:00.000Z'),
        },
        {
          date: '2',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Mon May 02 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-05-01T22:00:00.000Z'),
        },
        {
          date: '3',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Tue May 03 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-05-02T22:00:00.000Z'),
        },
        {
          date: '4',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Wed May 04 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-05-03T22:00:00.000Z'),
        },
        {
          date: '5',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Thu May 05 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-05-04T22:00:00.000Z'),
        },
        {
          date: '6',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Fri May 06 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-05-05T22:00:00.000Z'),
        },
        {
          date: '7',
          isInBounds: true,
          isInMonth: false,
          isSelected: false,
          isToday: false,
          key: 'Sat May 07 2016 00:00:00 GMT+0200 (Central European Summer Time)',
          originalDate: new Date('2016-05-06T22:00:00.000Z'),
        },
      ],
    ];

    it('returns matrix with days', () => {
      const result = DateGrid.getDayGrid(defaultOptions);
      const expected: IDay[][] = defautlResult;

      expect(result).toEqual(expected);
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

import { IDateGridStrings } from '../../../../../src/utils/date-time-utilities';
import * as DateGrid from '../../../../../src/utils/date-time-utilities/dateFormatting/formatMonthDayYear';

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

describe('formatMonthDayYear', () => {
  const date = new Date(2016, Months.Apr, 1);
  it('returns default format', () => {
    const result = DateGrid.formatMonthDayYear(date, strings);
    expect(result).toBe('April 1, 2016');
  });
});

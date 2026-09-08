import { getMonthIndex } from './constants';
import { calendarFormatters, createCalendarDateTimeFormatter } from './formatters';

const date = new Date(2016, getMonthIndex('april'), 1);

describe('createCalendarDateTimeFormatter', () => {
  it.each(['monthDayYear', 'dayMonthYear'] as const)('uses locale ordering for %s', format => {
    const formatter = createCalendarDateTimeFormatter('en-GB');

    expect(formatter({ date, format })).toBe('1 April 2016');
  });

  it('localizes month and weekday names', () => {
    const formatter = createCalendarDateTimeFormatter('de-DE');

    expect(formatter({ date, format: 'weekday' })).toBe('Freitag');
    expect(formatter({ date, format: 'monthDayYear' })).toBe('1. April 2016');
  });

  it('applies the requested time zone consistently', () => {
    const boundary = new Date('2016-04-01T00:30:00.000Z');
    const formatter = createCalendarDateTimeFormatter('en-US', { timeZone: 'America/Los_Angeles' });

    expect(formatter({ date: boundary, format: 'day' })).toBe('31');
    expect(formatter({ date: boundary, format: 'monthDayYear' })).toBe('March 31, 2016');
  });

  it('supports locale numbering-system extensions', () => {
    const formatter = createCalendarDateTimeFormatter('en-US-u-nu-arab');

    expect(formatter({ date, format: 'year' })).toBe(
      new Intl.DateTimeFormat('en-US-u-nu-arab', { year: 'numeric' }).format(date),
    );
  });
});

describe('defaultCalendarFormatters', () => {
  it.each([
    ['day', '1'],
    ['month', 'April'],
    ['shortMonth', 'Apr'],
    ['year', '2016'],
    ['monthDayYear', 'April 1, 2016'],
    ['dayMonthYear', 'April 1, 2016'],
    ['monthYear', 'April 2016'],
    ['weekday', 'Friday'],
    ['shortWeekday', 'F'],
  ] as const)('formats %s', (format, expected) => {
    expect(calendarFormatters.dateTime({ date, format })).toBe(expected);
  });

  const formattedDate = 'April 2016';
  const dateData = { date, formattedDate };

  it.each([
    ['previousMonthLabel', 'Previous month April 2016'],
    ['nextMonthLabel', 'Next month April 2016'],
    ['previousYearLabel', 'Previous year April 2016'],
    ['nextYearLabel', 'Next year April 2016'],
    ['monthPickerHeaderLabel', 'April 2016, change year'],
    ['yearPickerHeaderLabel', 'April 2016, change month'],
    ['selectedDateLabel', 'Selected date April 2016'],
    ['todayDateLabel', "Today's date April 2016"],
    ['dayMarkedLabel', 'April 2016, marked'],
  ] as const)('formats %s', (formatter, expected) => {
    expect(calendarFormatters[formatter](dateData)).toBe(expected);
  });

  it('formats week numbers', () => {
    expect(calendarFormatters.weekNumberLabel({ weekNumber: 14 })).toBe('Week number 14');
  });

  it('formats year ranges', () => {
    const range = { fromYear: 2025, toYear: 2036, formattedRange: '2025 - 2036' };
    expect(calendarFormatters.previousYearRangeLabel(range)).toBe('Previous year range 2025 - 2036');
    expect(calendarFormatters.nextYearRangeLabel(range)).toBe('Next year range 2025 - 2036');
    expect(calendarFormatters.yearRangePickerHeaderLabel(range)).toBe('2025 - 2036, change year');
  });
});

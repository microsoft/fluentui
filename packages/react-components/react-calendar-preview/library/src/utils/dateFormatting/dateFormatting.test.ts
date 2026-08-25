import { getMonthIndex } from '../constants';
import {
  createCalendarDateTimeFormatter,
  createCalendarLabelFormatter,
  formatDateTime,
  formatLabel,
} from './dateFormatting.defaults';

const date = new Date(2016, getMonthIndex('april'), 1);

describe('formatDateTime', () => {
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
    expect(formatDateTime(date, format)).toBe(expected);
  });
});

describe('formatLabel', () => {
  const formattedDate = 'April 2016';
  const dateData = { date, formattedDate };

  it.each([
    ['previousMonth', 'Previous month April 2016'],
    ['nextMonth', 'Next month April 2016'],
    ['previousYear', 'Previous year April 2016'],
    ['nextYear', 'Next year April 2016'],
    ['monthPickerHeader', 'April 2016, change year'],
    ['yearPickerHeader', 'April 2016, change month'],
    ['selectedDate', 'Selected date April 2016'],
    ['todayDate', "Today's date April 2016"],
    ['dayMarked', 'April 2016, marked'],
  ] as const)('formats %s', (label, expected) => {
    expect(formatLabel(label, dateData)).toBe(expected);
  });

  it('formats week numbers', () => {
    expect(formatLabel('weekNumber', { weekNumber: 14 })).toBe('Week number 14');
  });

  it('formats year ranges', () => {
    const range = { fromYear: 2025, toYear: 2036, formattedRange: '2025 - 2036' };
    expect(formatLabel('previousYearRange', range)).toBe('Previous year range 2025 - 2036');
    expect(formatLabel('nextYearRange', range)).toBe('Next year range 2025 - 2036');
    expect(formatLabel('yearRangePickerHeader', range)).toBe('2025 - 2036, change year');
  });
});

describe('createCalendarLabelFormatter', () => {
  it('uses typed overrides and delegates other labels to the fallback', () => {
    const fallback = jest.fn(formatLabel);
    const customFormatLabel = createCalendarLabelFormatter(
      {
        weekNumber: data => `Week ${data.weekNumber}`,
        yearRangePickerHeader: data => `Choose from ${data.fromYear} through ${data.toYear}`,
      },
      fallback,
    );

    expect(customFormatLabel('weekNumber', { weekNumber: 14 })).toBe('Week 14');
    expect(
      customFormatLabel('yearRangePickerHeader', {
        fromYear: 2025,
        toYear: 2036,
        formattedRange: '2025 - 2036',
      }),
    ).toBe('Choose from 2025 through 2036');
    expect(customFormatLabel('todayDate', { date, formattedDate: 'April 1, 2016' })).toBe("Today's date April 1, 2016");
    expect(fallback).toHaveBeenCalledTimes(1);
  });
});

describe('createCalendarDateTimeFormatter', () => {
  const utcDate = new Date(Date.UTC(2016, getMonthIndex('april'), 1, 12));

  it('formats dates using locale ordering', () => {
    const enUS = createCalendarDateTimeFormatter('en-US', { timeZone: 'UTC' });
    const deDE = createCalendarDateTimeFormatter('de-DE', { timeZone: 'UTC' });

    expect(enUS(utcDate, 'monthDayYear')).toBe('April 1, 2016');
    expect(deDE(utcDate, 'monthDayYear')).toBe('1. April 2016');
    expect(deDE(utcDate, 'dayMonthYear')).toBe('1. April 2016');
  });

  it('supports Unicode locale extensions', () => {
    const arabicDigits = createCalendarDateTimeFormatter('en-US-u-nu-arab', { timeZone: 'UTC' });

    expect(arabicDigits(utcDate, 'day')).toBe('١');
  });
});

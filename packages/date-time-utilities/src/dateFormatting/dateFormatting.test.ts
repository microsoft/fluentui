import {
  formatDay,
  formatMonth,
  formatMonthDayYear,
  formatMonthYear,
  formatYear,
  DEFAULT_DATE_GRID_STRINGS,
} from './dateFormatting.defaults';
import { MonthOfYear } from '../dateValues/dateValues';

const date = new Date(2016, MonthOfYear.April, 1);

describe('formatDay', () => {
  it('returns default format', () => {
    const result = formatDay(date);
    expect(result).toBe('1');
  });
});

describe('formatMonth', () => {
  it('returns default format', () => {
    const result = formatMonth(date, DEFAULT_DATE_GRID_STRINGS);
    expect(result).toBe('April');
  });
});

describe('formatMonthDayYear', () => {
  it('returns default format', () => {
    const result = formatMonthDayYear(date, DEFAULT_DATE_GRID_STRINGS);
    expect(result).toBe('April 1, 2016');
  });
});

describe('formatMonthYear', () => {
  it('returns default format', () => {
    const result = formatMonthYear(date, DEFAULT_DATE_GRID_STRINGS);
    expect(result).toBe('April 2016');
  });
});

describe('formatYear', () => {
  it('returns default format', () => {
    const result = formatYear(date);
    expect(result).toBe('2016');
  });
});

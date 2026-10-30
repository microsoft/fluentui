import { createLocalDate, defaultFormatDate, defaultParseDate } from './datePickerFormatting';

const expectDate = (text: string, year: number, monthIndex: number, day: number) => {
  const date = defaultParseDate(text);
  expect(date).not.toBeNull();
  expect([date!.getFullYear(), date!.getMonth(), date!.getDate()]).toEqual([year, monthIndex, day]);
};

describe('DatePicker formatting', () => {
  it('formats dates as English long dates', () => {
    expect(defaultFormatDate(new Date(2026, 7, 12))).toBe('August 12, 2026');
  });

  it('parses date-only ISO values as local calendar dates', () => {
    expectDate('2026-08-12', 2026, 7, 12);
    expectDate('2026-8-2', 2026, 7, 2);
    expect(defaultParseDate('2026-08-12')!.getHours()).toBe(0);
  });

  it('parses full and abbreviated month names with an optional comma', () => {
    expectDate('August 12, 2026', 2026, 7, 12);
    expectDate('august 12 2026', 2026, 7, 12);
    expectDate('Aug 12, 2026', 2026, 7, 12);
    expectDate('Sept. 3, 2026', 2026, 8, 3);
    expectDate('  Dec 31, 2026  ', 2026, 11, 31);
  });

  it('parses M/D/YYYY', () => {
    expectDate('8/12/2026', 2026, 7, 12);
    expectDate('08/02/2026', 2026, 7, 2);
  });

  it('rejects impossible dates instead of normalizing them into another month', () => {
    expect(defaultParseDate('2026-02-30')).toBeNull();
    expect(defaultParseDate('February 29, 2026')).toBeNull();
    expect(defaultParseDate('13/01/2026')).toBeNull();
    expectDate('February 29, 2028', 2028, 1, 29);
  });

  it('rejects unsupported formats and unknown month names', () => {
    expect(defaultParseDate('')).toBeNull();
    expect(defaultParseDate('tomorrow')).toBeNull();
    expect(defaultParseDate('Au 12, 2026')).toBeNull();
    expect(defaultParseDate('Augustus 12, 2026')).toBeNull();
    expect(defaultParseDate('12 August 2026')).toBeNull();
    expect(defaultParseDate('8/12/26')).toBeNull();
    expect(defaultParseDate('2026-08-12T10:00:00Z')).toBeNull();
  });

  it('creates years below 100 without mapping them to the 1900s', () => {
    expect(createLocalDate(42, 0, 1)!.getFullYear()).toBe(42);
  });
});

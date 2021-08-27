import { formatTimeString } from '.';

describe('timeFormatting', () => {
  const date = new Date(2021, 6, 14, 13, 26, 39);
  it('returns locale time string', () => {
    const result = formatTimeString(date);
    expect(result).toBe('1:26 PM');
  });

  it('returns locale time string with seconds', () => {
    const result = formatTimeString(date, true);
    expect(result).toBe('1:26:39 PM');
  });

  it('returns locale time string with 12-hour time', () => {
    const result = formatTimeString(date, false, true);
    expect(result).toBe('1:26 PM');
  });

  it('returns locale time string with 24-hour time', () => {
    const result = formatTimeString(date, false, false);
    expect(result).toBe('13:26');
  });

  it('returns locale time string with seconds and 12-hour time', () => {
    const result = formatTimeString(date, true, true);
    expect(result).toBe('1:26:39 PM');
  });

  it('returns locale time string with seconds and 24-hour time', () => {
    const result = formatTimeString(date, true, false);
    expect(result).toBe('13:26:39');
  });
});

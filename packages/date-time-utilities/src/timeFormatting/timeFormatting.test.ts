import { formatTimeString } from '.';

describe('timeFormatting', () => {
  const date = new Date(2021, 6, 14, 13, 26, 39);

  const originalToLocaleTimeString = date.toLocaleTimeString.bind(date);

  /**
   *
   * This is needed to make this test pass in any time-zone as the implementation defines no locales,
   * thus it will be determined on users physical location - making the test non-deterministic
   *
   */
  const toLocaleTimeStringMock: (locales?: string | string[], options?: Intl.DateTimeFormatOptions) => string = (
    locales,
    options,
  ) => {
    if (!locales || (Array.isArray(locales) && locales.length === 0)) {
      return originalToLocaleTimeString('en-US', options);
    }

    // this branch will never run as the implementation uses `[]` for locales.
    // keeping it here to follow best testing/mocking practices
    return originalToLocaleTimeString(locales, options);
  };

  jest.spyOn(date, 'toLocaleTimeString').mockImplementation(toLocaleTimeStringMock);

  afterAll(() => {
    jest.resetAllMocks();
  });

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

import {
  dateToKey,
  keyToDate,
  formatDateToTimeString,
  getDateEndAnchor,
  getDateStartAnchor,
  getTimesBetween,
  getDateFromTimeString,
  getResolvedHourCycle,
} from './timeMath';

describe('Time Utilities', () => {
  describe('dateToKey', () => {
    it('should return empty string for null date', () => {
      expect(dateToKey(null)).toBe('');
    });

    it('should return "invalid" for invalid dates', () => {
      const invalidDate = new Date('invalid-date');
      expect(dateToKey(invalidDate)).toBe('invalid');
    });

    it('should return ISO string for valid dates', () => {
      const date = new Date(2023, 9, 6);
      expect(dateToKey(date)).toBe(date.toISOString());
    });
  });

  describe('keyToDate', () => {
    it('should return null for empty string', () => {
      expect(keyToDate('')).toBeNull();
    });

    it('should return null for "invalid" string', () => {
      expect(keyToDate('invalid')).toBeNull();
    });

    it('should return date for valid ISO string', () => {
      const date = new Date(2023, 9, 6);
      expect(keyToDate(date.toISOString())).toEqual(date);
    });
  });

  describe('dateToKey and keyToDate correspondence', () => {
    it('should be inverses of each other for valid dates', () => {
      const originalDate = new Date(2023, 9, 6, 23, 45, 12);
      const key = dateToKey(originalDate);
      const revertedDate = keyToDate(key);

      expect(revertedDate?.getTime()).toEqual(originalDate.getTime());
    });

    it('should be inverses of each other for null date', () => {
      const originalDate = null;
      const key = dateToKey(originalDate);
      const revertedDate = keyToDate(key);

      expect(revertedDate).toEqual(originalDate);
    });

    it('should be inverses of each other for invalid dates', () => {
      const originalDate = new Date('invalid-date');
      const key = dateToKey(originalDate);
      const revertedDate = keyToDate(key);

      expect(revertedDate).toBeNull();
    });
  });

  describe('formatDateToTimeString', () => {
    const testDate = new Date(2023, 9, 6, 23, 45, 12);

    it('should format time in 24-hour format without seconds', () => {
      expect(formatDateToTimeString(testDate, { hourCycle: 'h23' })).toBe('23:45');
    });

    it('should format time in 24-hour format with seconds', () => {
      expect(formatDateToTimeString(testDate, { showSeconds: true, hourCycle: 'h23' })).toBe('23:45:12');
    });

    it('should format time in 12-hour format with seconds', () => {
      expect(formatDateToTimeString(testDate, { showSeconds: true, hourCycle: 'h11' })).toBe('11:45:12 PM');
    });

    it('should format midnight correctly in 24-hour format', () => {
      const midnight = new Date(2023, 9, 7, 0, 0, 0);
      expect(formatDateToTimeString(midnight, { hourCycle: 'h23' })).toBe('00:00');
    });

    it('should format time in Japanese locale', () => {
      const { toLocaleTimeString } = Date.prototype;
      const toLocaleTimeStringMock = jest.spyOn(Date.prototype, 'toLocaleTimeString');
      // Mock toLocaleTimeString to simulate running in a Japanese locale
      toLocaleTimeStringMock.mockImplementationOnce(function (this: Date, _locales, options) {
        return toLocaleTimeString.call(this, 'ja-JP', { ...options, timeZone: 'Japan' });
      });

      expect(
        formatDateToTimeString(new Date(Date.UTC(2023, 9, 6, 14, 45, 12)), { showSeconds: true, hourCycle: 'h11' }),
      ).toBe('午後11:45:12');

      toLocaleTimeStringMock.mockClear();
    });

    it('should format time without prefix 0 in US local', () => {
      const { toLocaleTimeString } = Date.prototype;
      const toLocaleTimeStringMock = jest.spyOn(Date.prototype, 'toLocaleTimeString');
      // Mock toLocaleTimeString to simulate running in PST locale
      toLocaleTimeStringMock.mockImplementationOnce(function (this: Date, _locales, options) {
        return toLocaleTimeString.call(this, 'en-US', { ...options, timeZone: 'America/Los_Angeles' });
      });

      expect(formatDateToTimeString(new Date(Date.UTC(2023, 9, 6, 15, 45, 12)))).toBe('8:45 AM');

      toLocaleTimeStringMock.mockClear();
    });
  });

  describe('Anchor Date Calculations', () => {
    it('should calculate the correct start anchor date', () => {
      const date = new Date(2023, 9, 6);
      const result = getDateStartAnchor(date, 5);
      expect(result.getHours()).toBe(5);
    });

    it('should calculate the correct end anchor date (same day)', () => {
      const date = new Date(2023, 9, 6);
      const result = getDateEndAnchor(date, 5, 10);
      expect(result.getHours()).toBe(10);
    });

    it('should calculate the correct end anchor date (next day)', () => {
      const date = new Date(2023, 9, 6);
      const result = getDateEndAnchor(date, 10, 5);
      expect(result.getHours()).toBe(5);
      expect(result.getDate()).toBe(7);
    });

    it('should handle the endHour being 24 correctly', () => {
      const date = new Date(2023, 9, 6);
      const result = getDateEndAnchor(date, 10, 24);
      expect(result.getHours()).toBe(0);
      expect(result.getDate()).toBe(7);
    });
  });

  describe('getTimesBetween', () => {
    it('should return correct Date objects with 15-minute increment', () => {
      const start = new Date('January 1, 2023 10:00:00');
      const end = new Date('January 1, 2023 11:00:00');
      const result = getTimesBetween(start, end, 15);

      expect(result.length).toBe(4);
      result.forEach((date, i) => expect(date.getMinutes()).toBe(15 * i));
    });

    it('should return correct Date objects spanning across midnight with 30-minute increment', () => {
      const start = new Date('January 1, 2023 23:30:00');
      const end = new Date('January 2, 2023 00:30:00');
      const result = getTimesBetween(start, end, 30);

      expect(result.length).toBe(2);
      expect([result[0].getHours(), result[0].getMinutes()]).toEqual([23, 30]);
      expect([result[1].getHours(), result[1].getMinutes()]).toEqual([0, 0]);
    });

    it('should return correct Date objects for day light saving', () => {
      const start = new Date('2023-11-05T01:00:00-07:00'); // UTC-7 is PDT
      const end = new Date('2023-11-05T03:00:00-08:00'); // UTC-8 is PST
      const result = getTimesBetween(start, end, 60);

      expect(result.length).toBe(3);
      expect(
        result.map(date => date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', timeZoneName: 'short' })),
      ).toMatchInlineSnapshot(`
        Array [
          "11/5/2023, 1:00:00 AM PDT",
          "11/5/2023, 1:00:00 AM PST",
          "11/5/2023, 2:00:00 AM PST",
        ]
      `);
    });

    it.each([0, -30, 0.5, NaN, Infinity])('should return no dates and log an error for increment %p', increment => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const start = new Date('January 1, 2023 10:00:00');
      const end = new Date('January 1, 2023 11:00:00');

      expect(getTimesBetween(start, end, increment)).toEqual([]);
      expect(consoleError).toHaveBeenCalledTimes(1);

      consoleError.mockRestore();
    });

    it('should return only the start when the increment is larger than the range', () => {
      const start = new Date('January 1, 2023 10:00:00');
      const end = new Date('January 1, 2023 11:00:00');

      expect(getTimesBetween(start, end, 90)).toEqual([start]);
    });
  });

  describe('getDateFromTimeString', () => {
    const dateStartAnchor = new Date('November 25, 2023 12:00:00');
    const dateEndAnchor = new Date('November 26, 2023 12:00:00');

    it('returns a valid date when given a valid time string', () => {
      const result = getDateFromTimeString('2:30 PM', dateStartAnchor, dateEndAnchor, {
        hourCycle: 'h11',
        showSeconds: false,
      });
      expect(result.date?.getHours()).toBe(14);
      expect(result.date?.getMinutes()).toBe(30);
      expect(result.errorType).toBeUndefined();
    });

    it('returns an errorType when no time string is provided', () => {
      const result = getDateFromTimeString(undefined, dateStartAnchor, dateEndAnchor, {});
      expect(result.date).toBeNull();
      expect(result.errorType).toBe('required-input');
    });

    it('returns an errorType for an invalid time string', () => {
      const result = getDateFromTimeString('25:30', dateStartAnchor, dateEndAnchor, {});
      expect(result.date).toBeNull();
      expect(result.errorType).toBe('invalid-input');
    });

    it('returns a date in the next day and an out-of-bounds errorType when the time is before the dateStartAnchor', () => {
      const result = getDateFromTimeString('11:30 AM', dateStartAnchor, new Date('November 25, 2023 13:00:00'), {
        hourCycle: 'h11',
        showSeconds: false,
      });
      expect(result.date?.getDate()).toBe(26);
      expect(result.date?.getHours()).toBe(11);
      expect(result.date?.getMinutes()).toBe(30);
      expect(result.errorType).toBe('out-of-bounds');
    });

    it('returns an out-of-bounds errorType when the time is same as the dateEndAnchor', () => {
      const result = getDateFromTimeString('1:00 PM', dateStartAnchor, new Date('November 25, 2023 13:00:00'), {
        hourCycle: 'h11',
        showSeconds: false,
      });
      expect(result.date?.getHours()).toBe(13);
      expect(result.date?.getMinutes()).toBe(0);
      expect(result.errorType).toBe('out-of-bounds');
    });

    describe('resolved hour cycle', () => {
      it('uses the hourCycle option when set', () => {
        expect(getResolvedHourCycle('h24')).toBe('h24');
      });

      it('falls back to the locale hour cycle', () => {
        const expected = (
          new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions() as { hourCycle?: string }
        ).hourCycle;
        expect(getResolvedHourCycle()).toBe(expected);
      });

      it('round-trips the default formatter output without an explicit hourCycle', () => {
        const date = new Date('November 25, 2023 14:30:00');
        const text = formatDateToTimeString(date);
        const result = getDateFromTimeString(text, dateStartAnchor, dateEndAnchor, {});
        expect(result.errorType).toBeUndefined();
        expect(result.date?.getTime()).toBe(date.getTime());
      });

      it('round-trips the default formatter output with seconds', () => {
        const date = new Date('November 25, 2023 14:30:45');
        const text = formatDateToTimeString(date, { showSeconds: true });
        const result = getDateFromTimeString(text, dateStartAnchor, dateEndAnchor, { showSeconds: true });
        expect(result.date?.getTime()).toBe(date.getTime());
      });
    });

    describe('accepted input per hour cycle', () => {
      const day = new Date('January 1, 2023 00:00:00');
      const nextDay = new Date('January 2, 2023 00:00:00');
      const parse = (time: string, hourCycle: 'h11' | 'h12' | 'h23' | 'h24', showSeconds = false) =>
        getDateFromTimeString(time, day, nextDay, { hourCycle, showSeconds });

      it.each`
        time          | hourCycle | hours | minutes
        ${'0:30'}     | ${'h23'}  | ${0}  | ${30}
        ${'23:30'}    | ${'h23'}  | ${23} | ${30}
        ${'1:30'}     | ${'h24'}  | ${1}  | ${30}
        ${'24:30'}    | ${'h24'}  | ${0}  | ${30}
        ${'12:30 AM'} | ${'h12'}  | ${0}  | ${30}
        ${'12:30 PM'} | ${'h12'}  | ${12} | ${30}
        ${'1:30 pm'}  | ${'h12'}  | ${13} | ${30}
        ${'0:30 AM'}  | ${'h11'}  | ${0}  | ${30}
        ${'0:30 PM'}  | ${'h11'}  | ${12} | ${30}
        ${'11:30 PM'} | ${'h11'}  | ${23} | ${30}
        ${' 9:15 '}   | ${'h23'}  | ${9}  | ${15}
      `('accepts $time in $hourCycle', ({ time, hourCycle, hours, minutes }) => {
        const result = parse(time, hourCycle);
        expect(result.errorType).toBeUndefined();
        expect(result.date?.getDate()).toBe(1);
        expect([result.date?.getHours(), result.date?.getMinutes()]).toEqual([hours, minutes]);
      });

      it.each`
        time          | hourCycle
        ${'24:00'}    | ${'h23'}
        ${'0:30'}     | ${'h24'}
        ${'0:30 AM'}  | ${'h12'}
        ${'13:30 PM'} | ${'h12'}
        ${'12:30 PM'} | ${'h11'}
        ${'2:30'}     | ${'h12'}
        ${'2:30\tPM'} | ${'h12'}
        ${'2:30  PM'} | ${'h12'}
        ${'2.30'}     | ${'h23'}
        ${'2:30:15'}  | ${'h23'}
        ${'2:30 PM'}  | ${'h23'}
      `('rejects $time in $hourCycle', ({ time, hourCycle }) => {
        expect(parse(time, hourCycle)).toEqual({ date: null, errorType: 'invalid-input' });
      });

      it('requires seconds only with showSeconds', () => {
        expect(parse('2:30:15', 'h23', true).date?.getSeconds()).toBe(15);
        expect(parse('2:30', 'h23', true).errorType).toBe('invalid-input');
        expect(parse('2:30:15 PM', 'h12', true).date?.getHours()).toBe(14);
      });
    });

    describe('daylight saving transitions', () => {
      const inLosAngeles = Intl.DateTimeFormat().resolvedOptions().timeZone === 'America/Los_Angeles';
      const itInLosAngeles = inLosAngeles ? it : it.skip;

      itInLosAngeles('keeps the clock time when it does not exist on the anchor day but does on the next', () => {
        // 02:30 does not exist on March 12, 2023 in Los Angeles (spring forward).
        const start = new Date('2023-03-12T12:00:00-08:00');
        const end = new Date('2023-03-13T12:00:00-07:00');
        const result = getDateFromTimeString('2:30', start, end, { hourCycle: 'h23' });
        expect(result.errorType).toBeUndefined();
        expect(result.date?.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })).toBe('3/13/2023, 2:30:00 AM');
      });

      itInLosAngeles('moves a clock time that does not exist on the anchor day to the next day', () => {
        const start = new Date('2023-03-12T00:00:00-08:00');
        const end = new Date('2023-03-12T12:00:00-07:00');
        const result = getDateFromTimeString('2:30', start, end, { hourCycle: 'h23' });
        expect(result.errorType).toBe('out-of-bounds');
        expect(result.date?.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })).toBe('3/13/2023, 2:30:00 AM');
      });

      itInLosAngeles('resolves a repeated clock time to the occurrence inside the range', () => {
        // 01:45 occurs twice on November 5, 2023 in Los Angeles (fall back); only the PST one is in range.
        const start = new Date('2023-11-05T01:30:00-08:00');
        const end = new Date('2023-11-05T03:00:00-08:00');
        const result = getDateFromTimeString('1:45', start, end, { hourCycle: 'h23' });
        expect(result.errorType).toBeUndefined();
        expect(result.date?.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', timeZoneName: 'short' })).toBe(
          '11/5/2023, 1:45:00 AM PST',
        );
      });
    });
  });
});

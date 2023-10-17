import {
  dateToKey,
  keyToDate,
  formatDateToTimeString,
  getDateEndAnchor,
  getDateStartAnchor,
  getTimesBetween,
} from './timeMath';

describe('Time Utilities', () => {
  describe('dateToKey', () => {
    it('should return empty string for undefined date', () => {
      expect(dateToKey()).toBe('');
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
    it('should return undefined for empty string', () => {
      expect(keyToDate('')).toBeUndefined();
    });

    it('should return undefined for "invalid" string', () => {
      expect(keyToDate('invalid')).toBeUndefined();
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

    it('should be inverses of each other for undefined date', () => {
      const originalDate = undefined;
      const key = dateToKey(originalDate);
      const revertedDate = keyToDate(key);

      expect(revertedDate).toEqual(originalDate);
    });

    it('should be inverses of each other for invalid dates', () => {
      const originalDate = new Date('invalid-date');
      const key = dateToKey(originalDate);
      const revertedDate = keyToDate(key);

      expect(revertedDate).toBeUndefined();
    });
  });

  describe('formatDateToTimeString', () => {
    const testDate = new Date(2023, 9, 6, 23, 45, 12);

    it('should format time in 24-hour format without seconds', () => {
      expect(formatDateToTimeString(testDate)).toBe('23:45');
    });

    it('should format time in 24-hour format with seconds', () => {
      expect(formatDateToTimeString(testDate, { showSeconds: true })).toBe('23:45:12');
    });

    it('should format time in 12-hour format with seconds', () => {
      expect(formatDateToTimeString(testDate, { showSeconds: true, hour12: true })).toBe('11:45:12 PM');
    });

    it('should format midnight correctly in 24-hour format', () => {
      const midnight = new Date(2023, 9, 7, 0, 0, 0);
      expect(formatDateToTimeString(midnight)).toBe('00:00');
    });

    it('should format time in Japanese locale', () => {
      const { toLocaleTimeString } = Date.prototype;
      const toLocaleTimeStringMock = jest.spyOn(Date.prototype, 'toLocaleTimeString');
      // Mock toLocaleTimeString to simulate running in a Japanese locale
      toLocaleTimeStringMock.mockImplementation(function (this: Date, _locales, options) {
        return toLocaleTimeString.call(this, 'ja-JP', options);
      });

      expect(formatDateToTimeString(testDate, { showSeconds: true, hour12: true })).toBe('午後11:45:12');

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
      const start = new Date(2023, 0, 1, 10, 0); // Jan 1, 2023 10:00:00 AM
      const end = new Date(2023, 0, 1, 11, 0); // Jan 1, 2023 11:00:00 AM
      const result = getTimesBetween(start, end, 15);

      expect(result.length).toBe(4);
      result.forEach((date, i) => expect(date.getMinutes()).toBe(15 * i));
    });

    it('should return correct Date objects spanning across midnight with 30-minute increment', () => {
      const start = new Date(2023, 0, 1, 23, 30); // Jan 1, 2023 11:30:00 PM
      const end = new Date(2023, 0, 2, 0, 30); // Jan 2, 2023 00:30:00 AM
      const result = getTimesBetween(start, end, 30);

      expect(result.length).toBe(2);
      expect(result[0].getHours()).toBe(23);
      expect(result[0].getMinutes()).toBe(30);
      expect(result[1].getHours()).toBe(0);
      expect(result[1].getMinutes()).toBe(0);
    });
  });
});

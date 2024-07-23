import { clamp } from './clamp';

describe('SpinButton Clamp Util', () => {
  describe('clamp', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      /**
       * clamp() logs errors when:
       * 1) not in production mode
       * 2) min > max
       * Mocking it to suppress the error messages during test
       */
      spy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('should clamp when both min and max are defined', () => {
      expect(clamp(0, 1, 10)).toBe(1);
      expect(clamp(11, 1, 10)).toBe(10);
    });

    it('should clamp when only min is defined', () => {
      expect(clamp(0, 1, undefined)).toBe(1);
      expect(clamp(10, 1, undefined)).toBe(10);
    });

    it('should clamp when only max is defined', () => {
      expect(clamp(11, undefined, 10)).toBe(10);
      expect(clamp(1, undefined, 10)).toBe(1);
    });

    it('should clamp when min and max are the same', () => {
      expect(clamp(4, 5, 5)).toBe(5);
      expect(clamp(6, 5, 5)).toBe(5);
      expect(clamp(5, 5, 5)).toBe(5);
    });

    it('should not clamp when min is greater than max', () => {
      expect(clamp(5, 10, 7)).toBe(5);
    });

    it('should not clamp when min and max are undefined', () => {
      expect(clamp(1, undefined, undefined)).toBe(1);
    });
  });
});

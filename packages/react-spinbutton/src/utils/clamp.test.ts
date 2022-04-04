import { clampWhenInRange } from './clamp';

describe('SpinButton Clamp Util', () => {
  describe('clampWhenInRange', () => {
    it('should clamp the new value', () => {
      expect(clampWhenInRange(5, 0, 1, 10)).toBe(1);
      expect(clampWhenInRange(5, 11, 1, 10)).toBe(10);
      expect(clampWhenInRange(1, 0, 1, 10)).toBe(1);
      expect(clampWhenInRange(10, 11, 1, 10)).toBe(10);

      expect(clampWhenInRange(5, 0, 1, undefined)).toBe(1);
      expect(clampWhenInRange(5, 11, undefined, 10)).toBe(10);
      expect(clampWhenInRange(1, 0, 1, undefined)).toBe(1);
      expect(clampWhenInRange(10, 11, undefined, 10)).toBe(10);

      expect(clampWhenInRange(5, 4, 5, 5)).toBe(5);
      expect(clampWhenInRange(5, 6, 5, 5)).toBe(5);
      expect(clampWhenInRange(4, 5, 5, 5)).toBe(5);
      expect(clampWhenInRange(6, 5, 5, 5)).toBe(5);
    });

    it('should not clamp the new value', () => {
      expect(clampWhenInRange(0, -1, 1, 10)).toBe(-1);
      expect(clampWhenInRange(11, 12, 1, 10)).toBe(12);

      expect(clampWhenInRange(0, 1, undefined, undefined)).toBe(1);
      expect(clampWhenInRange(0, -1, undefined, 10)).toBe(-1);
      expect(clampWhenInRange(11, 12, 1, undefined)).toBe(12);

      expect(clampWhenInRange(4, 3, 5, 5)).toBe(3);
      expect(clampWhenInRange(6, 7, 5, 5)).toBe(7);

      expect(clampWhenInRange(4, 5, 10, 7)).toBe(5);
    });
  });
});

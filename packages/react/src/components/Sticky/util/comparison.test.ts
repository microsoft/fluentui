import { isLessThanInRange } from './comparison';

describe('Stick comparison utils', () => {
  describe('isLessThanInRange', () => {
    describe('less than', () => {
      it('should be in range', () => {
        expect(isLessThanInRange(5, 5, 1)).toBe(false);
        expect(isLessThanInRange(4, 5, 1)).toBe(false);

        expect(isLessThanInRange(5, 5, 0)).toBe(false);
        expect(isLessThanInRange(4, 5, 0)).toBe(true);

        expect(isLessThanInRange(5, 5, -1)).toBe(false);
        expect(isLessThanInRange(4, 5, -1)).toBe(true);
      });

      it('should be out of range', () => {
        expect(isLessThanInRange(3, 5, 1)).toBe(true);
        expect(isLessThanInRange(1, 5, 1)).toBe(true);

        expect(isLessThanInRange(3, 5, 0)).toBe(true);
        expect(isLessThanInRange(1, 5, 0)).toBe(true);

        expect(isLessThanInRange(3, 5, -1)).toBe(true);
        expect(isLessThanInRange(1, 5, -1)).toBe(true);
      });
    });

    describe('greater than', () => {
      it('should be in range', () => {
        expect(isLessThanInRange(6, 5, 1)).toBe(false);
        expect(isLessThanInRange(6, 5, 0)).toBe(false);
        expect(isLessThanInRange(6, 5, -1)).toBe(false);
      });

      it('should be out of range', () => {
        expect(isLessThanInRange(7, 5, 1)).toBe(false);
        expect(isLessThanInRange(7, 5, 0)).toBe(false);
        expect(isLessThanInRange(7, 5, -1)).toBe(false);
      });
    });

    describe('equal to', () => {
      it('should be in range', () => {
        expect(isLessThanInRange(5, 5, 1)).toBe(false);
        expect(isLessThanInRange(5, 5, 0)).toBe(false);
        expect(isLessThanInRange(5, 5, -1)).toBe(false);
      });
    });
  });
});

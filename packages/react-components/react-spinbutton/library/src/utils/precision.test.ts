import { calculatePrecision, precisionRound } from './precision';

describe('SpinButton Precision Util', () => {
  describe('calculatePrecision', () => {
    it('caluclatePrecision should work as intended', () => {
      expect(calculatePrecision(0)).toEqual(0);
      expect(calculatePrecision(1)).toEqual(0);
      expect(calculatePrecision('1')).toEqual(0);

      expect(calculatePrecision(200)).toEqual(-2);
      expect(calculatePrecision(32100012300000)).toEqual(-5);

      expect(calculatePrecision(231.0)).toEqual(0);
      expect(calculatePrecision('231.00')).toEqual(2);
      expect(calculatePrecision(321.00002)).toEqual(5);
      expect(calculatePrecision('321.00002')).toEqual(5);

      expect(calculatePrecision(0.002)).toEqual(3);
      expect(calculatePrecision('.002')).toEqual(3);
    });
  });

  describe('precisionRound', () => {
    it('precisionRound should work as intended', () => {
      expect(precisionRound(1234, 0)).toEqual(1234);
      expect(precisionRound(1234, -1)).toEqual(1230);
      expect(precisionRound(1234, -3)).toEqual(1000);

      expect(precisionRound(1234.5678, 0)).toEqual(1235);
      expect(precisionRound(1234.5678, 1)).toEqual(1234.6);
      expect(precisionRound(1234.5678, 5)).toEqual(1234.5678);

      expect(precisionRound(1234.555, 2)).toEqual(1234.56);
      expect(precisionRound(1234.554, 2)).toEqual(1234.55);
      expect(precisionRound(1250, -2)).toEqual(1300);
      expect(precisionRound(1249, -2)).toEqual(1200);

      // Different bases
      expect(precisionRound(1234.5, -2, 2)).toEqual(1236);
      expect(precisionRound(1234.5, -2, 16)).toEqual(1280);
      expect(precisionRound(1234.5, -2, 8)).toEqual(1216);
      expect(precisionRound(1234.5, -2, 7)).toEqual(1225);
    });
  });
});

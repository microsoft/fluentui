import { getDocumentRemSize, pxToRem, round } from 'src/utils/fontSizeUtility';

describe('fontSizeUtility', () => {
  describe('round', () => {
    it('rounds values to 4 decimals', () => {
      expect(round(3)).toBe(3);
      expect(round(3.14)).toBe(3.14);
      expect(round(3.14159265359)).toBe(3.1416);
      expect(round(-3.14159265359)).toBe(-3.1416);
    });
  });

  describe('pxToRem', () => {
    it('returns 1rem for 16px with a default HTML font size of 16px', () => {
      expect(pxToRem(16)).toEqual('1rem');
    });

    it('returns 1rem with base font size of 10px', () => {
      expect(pxToRem(10, 10)).toEqual('1rem');
    });

    it('returns 0.714rem with a base font size of 14px', () => {
      expect(pxToRem(10, 14)).toEqual('0.7143rem');
    });

    it('returns 1.25rem with a base font size of 8px', () => {
      expect(pxToRem(10, 8)).toEqual('1.25rem');
    });

    it('returns 0rem when pxToRem is called with 0', () => {
      expect(pxToRem(0)).toEqual('0rem');
    });

    it('should handle negative input values and return negative conversion result', () => {
      expect(pxToRem(-16, 16)).toEqual('-1rem');
    });
  });

  describe('getDocumentRemSize', () => {
    it('fallbacks to a default value when "documentElement" contains an invalid entry', () => {
      Object.defineProperty(document, 'documentElement', {
        configurable: true,
        get() {
          return null;
        },
      });

      expect(document.documentElement).toBe(null);
      expect(getDocumentRemSize()).toEqual(16);
    });
  });
});

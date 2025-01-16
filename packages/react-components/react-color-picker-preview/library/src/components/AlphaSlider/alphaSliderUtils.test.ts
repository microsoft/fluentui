import { adjustToTransparency, calculateTransparencyValue, getSliderDirection } from './alphaSliderUtils';

describe('AlphaSlider Utils', () => {
  describe('adjustToTransparency', () => {
    it('should return 100 - value when transparency is true', () => {
      expect(adjustToTransparency(30, true)).toBe(70);
    });

    it('should return value when transparency is false', () => {
      expect(adjustToTransparency(30, false)).toBe(30);
    });
  });

  describe('calculateTransparencyValue', () => {
    it('should return adjusted value when value is provided and transparency is true', () => {
      expect(calculateTransparencyValue(true, 0.3)).toBe(70);
    });

    it('should return adjusted value when value is provided and transparency is false', () => {
      expect(calculateTransparencyValue(false, 0.3)).toBe(30);
    });

    it('should return undefined when value is not provided', () => {
      expect(calculateTransparencyValue(true)).toBeUndefined();
      expect(calculateTransparencyValue(false)).toBeUndefined();
    });
  });

  describe('getSliderDirection', () => {
    it('should return "180deg" when vertical is true and transparency is true', () => {
      expect(getSliderDirection('ltr', true, true)).toBe('180deg');
    });

    it('should return "0deg" when vertical is true and transparency is false', () => {
      expect(getSliderDirection('ltr', true, false)).toBe('0deg');
    });

    it('should return "90deg" when dir is "ltr" and transparency is false', () => {
      expect(getSliderDirection('ltr', false, false)).toBe('90deg');
    });

    it('should return "-90deg" when dir is "ltr" and transparency is true', () => {
      expect(getSliderDirection('ltr', false, true)).toBe('-90deg');
    });

    it('should return "-90deg" when dir is "rtl" and transparency is false', () => {
      expect(getSliderDirection('rtl', false, false)).toBe('-90deg');
    });

    it('should return "-90deg" when dir is "rtl" and transparency is true', () => {
      expect(getSliderDirection('rtl', false, true)).toBe('-90deg');
    });
  });
});

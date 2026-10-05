import { createHslColor, createHslColorString } from './createHslColor';

describe('createHslColor', () => {
  it('should create a black HSL color with default values', () => {
    expect(createHslColor({})).toEqual({ h: 0, s: 0, l: 0, a: 1 });
  });

  it('should convert an HSV color to HSL', () => {
    expect(createHslColor({ h: 0, s: 1, v: 1 })).toEqual({ h: 0, s: 1, l: 0.5, a: 1 });
  });

  it('should preserve hue and alpha', () => {
    const color = createHslColor({ h: 210, s: 0.5, v: 0.8, a: 0.4 });

    expect(color.h).toBe(210);
    expect(color.s).toBeCloseTo(0.5);
    expect(color.l).toBeCloseTo(0.6);
    expect(color.a).toBe(0.4);
  });

  it('should create an achromatic HSL color from white', () => {
    expect(createHslColor({ h: 120, s: 0, v: 1 })).toEqual({ h: 120, s: 0, l: 1, a: 1 });
  });

  it('should create an HSLA color string', () => {
    expect(createHslColorString({ h: 210, s: 0.5, v: 0.8, a: 0.4 })).toBe('hsla(210, 50%, 60%, 0.4)');
  });
});

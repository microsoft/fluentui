import {
  cssColor,
  rgb2hex,
  hsv2hex,
  rgb2hsv,
  hsl2hsv,
  hsv2hsl,
  hsl2rgb,
  hsv2rgb,
  getColorFromString,
  getColorFromRGBA,
  getColorFromHSV,
  getFullColorString,
  updateSV,
  updateH,
  updateRGB,
  updateA,
  correctRGB,
  correctHSV,
  correctHex,
  clamp,
} from './colors';
import { updateT } from './updateT';
import type { IColor } from './colors';

describe('color utilities', () => {
  const testColor: IColor = {
    r: 0,
    g: 21,
    b: 255,
    h: 235,
    s: 100,
    v: 100,
    a: 100,
    t: 0,
    hex: '0015ff',
    str: '#0015ff',
  };
  const testColorAlpha: IColor = { ...testColor, a: 30, t: 70, str: 'rgba(0, 21, 255, 0.3)' };
  const testColorNoAlpha: IColor = { ...testColor, a: undefined, t: undefined };

  describe('rgb2hex', () => {
    it('works', () => {
      expect(rgb2hex(0, 0, 0)).toEqual('000000');
      expect(rgb2hex(255, 255, 255)).toEqual('ffffff');
      expect(rgb2hex(171, 205, 239)).toEqual('abcdef');
      expect(rgb2hex(1, 0, 0)).toEqual('010000');
      expect(rgb2hex(14, 0, 0)).toEqual('0e0000');
    });
  });

  describe('rgb2hsv', () => {
    it('works', () => {
      expect(rgb2hsv(0, 0, 0)).toEqual({ h: 0, s: 0, v: 0 });
      expect(rgb2hsv(255, 255, 255)).toEqual({ h: 0, s: 0, v: 100 });
      expect(rgb2hsv(255, 0, 0)).toEqual({ h: 0, s: 100, v: 100 });
      expect(rgb2hsv(0, 255, 0)).toEqual({ h: 120, s: 100, v: 100 });
      expect(rgb2hsv(0, 0, 255)).toEqual({ h: 240, s: 100, v: 100 });
      expect(rgb2hsv(235, 33, 10)).toEqual({ h: 6, s: 96, v: 92 });
    });
  });

  describe('hsv2hex', () => {
    it('works', () => {
      expect(hsv2hex(0, 0, 0)).toEqual('000000');
      expect(hsv2hex(0, 100, 100)).toEqual('ff0000');
      expect(hsv2hex(359, 100, 100)).toEqual('ff0004');
      expect(hsv2hex(0, 50, 100)).toEqual('ff8080');
      expect(hsv2hex(0, 100, 50)).toEqual('800000');
      expect(hsv2hex(0, 50, 50)).toEqual('804040');
      expect(hsv2hex(221, 61, 50)).toEqual('324a80');
      expect(hsv2hex(221, 0, 100)).toEqual('ffffff');
      expect(hsv2hex(253, 100, 0)).toEqual('000000');
    });
  });

  describe('hsl2hsv', () => {
    it('works', () => {
      expect(hsl2hsv(0, 0, 0)).toEqual({ h: 0, s: 0, v: 0 });
      expect(hsl2hsv(359, 100, 100)).toEqual({ h: 359, s: 0, v: 100 });
      expect(hsl2hsv(50, 100, 25)).toEqual({ h: 50, s: 100, v: 50 });
      expect(hsl2hsv(50, 100, 75)).toEqual({ h: 50, s: 50, v: 100 });
      const result = hsl2hsv(205, 55, 32);
      result.s = Math.round(result.s);
      result.v = Math.round(result.v);
      expect(result).toEqual({ h: 205, s: 71, v: 50 });
    });
  });

  describe('hsv2hsl', () => {
    it('works', () => {
      expect(hsv2hsl(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 });
      expect(hsv2hsl(359, 100, 100)).toEqual({ h: 359, s: 100, l: 50 });
      expect(hsv2hsl(0, 100, 50)).toEqual({ h: 0, s: 100, l: 25 });
      expect(hsv2hsl(0, 50, 100)).toEqual({ h: 0, s: 100, l: 75 });
      const result = hsv2hsl(205, 71, 50);
      result.s = Math.round(result.s);
      result.l = Math.round(result.l);
      expect(result).toEqual({ h: 205, s: 55, l: 32 });
    });
  });

  describe('hsv2rgb', () => {
    it('works', () => {
      expect(hsv2rgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
      expect(hsv2rgb(50, 100, 0)).toEqual({ r: 0, g: 0, b: 0 });
      expect(hsv2rgb(50, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
      expect(hsv2rgb(50, 100, 100)).toEqual({ r: 255, g: 213, b: 0 });
      expect(hsv2rgb(50, 50, 100)).toEqual({ r: 255, g: 234, b: 128 });
      expect(hsv2rgb(50, 100, 50)).toEqual({ r: 128, g: 106, b: 0 });
      expect(hsv2rgb(262, 77, 63)).toEqual({ r: 82, g: 37, b: 161 });
    });
  });

  describe('hsl2rgb', () => {
    it('works', () => {
      expect(hsl2rgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
      expect(hsl2rgb(50, 100, 0)).toEqual({ r: 0, g: 0, b: 0 });
      expect(hsl2rgb(50, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
      expect(hsl2rgb(50, 100, 100)).toEqual({ r: 255, g: 255, b: 255 });
      expect(hsl2rgb(50, 100, 50)).toEqual({ r: 255, g: 213, b: 0 });
      expect(hsl2rgb(262, 77, 63)).toEqual({ r: 141, g: 88, b: 233 });
    });
  });

  describe('getColorFromRGBA', () => {
    it('works without alpha', () => {
      const result = getColorFromRGBA({ r: 0, g: 0, b: 0 });
      expect(result.a).toEqual(100);
      expect(result.hex).toEqual('000000');
      expect(result.str).toEqual('#000000');
    });

    it('works with alpha', () => {
      const result = getColorFromRGBA({ r: 0, g: 0, b: 0, a: 50 });
      expect(result.a).toEqual(50);
      expect(result.hex).toEqual('000000');
      expect(result.str).toEqual('rgba(0, 0, 0, 0.5)');
    });

    it('works all-up', () => {
      expect(getColorFromRGBA({ r: testColor.r, g: testColor.g, b: testColor.b })).toEqual(testColor);
    });
  });

  describe('cssColor', () => {
    // cssColor uses getComputedStyle() under the covers, which is incompletely implemented in headless browsers
    // thus, we cannot fully test all cases here, such as for named colors

    it('handles invalid hex input', () => {
      expect(cssColor(undefined as any)).toBeUndefined();
      expect(cssColor(null as any)).toBeUndefined();
      expect(cssColor('')).toBeUndefined();
      expect(cssColor('000')).toBeUndefined(); // missing #
      expect(cssColor('#00000')).toBeUndefined(); // wrong length
      expect(cssColor('000000')).toBeUndefined(); // missing #
      expect(cssColor('#qwerty')).toBeUndefined(); // invalid chars
      expect(cssColor('')).toBeUndefined();
    });

    it('handles valid hex input', () => {
      expect(cssColor('#000')).toEqual({ r: 0, g: 0, b: 0, a: 100 });
      expect(cssColor('#000000')).toEqual({ r: 0, g: 0, b: 0, a: 100 });
      expect(cssColor('#abc')).toEqual({ r: 170, g: 187, b: 204, a: 100 });
      expect(cssColor('#ABC')).toEqual({ r: 170, g: 187, b: 204, a: 100 });
      expect(cssColor('#123456')).toEqual({ r: 18, g: 52, b: 86, a: 100 });
    });

    it('handles invalid rgba input', () => {
      expect(cssColor('rgb(0)')).toBeUndefined(); // not enough numbers
      expect(cssColor('rgb(0, 0, 0, 0)')).toBeUndefined(); // too many numbers for rgb non-a
      expect(cssColor('rgb(foo)')).toBeUndefined();
      expect(cssColor('rgba(0, 0, 0)')).toBeUndefined(); // not enough numbers for rgba
      expect(cssColor('rgb(0, 0, 0, 0, 0)')).toBeUndefined(); // too many numbers
    });

    it('handles valid rgba input', () => {
      expect(cssColor('rgb(0, 0, 0)')).toEqual({ r: 0, g: 0, b: 0, a: 100 });
      expect(cssColor('rgb(0,0,0)')).toEqual({ r: 0, g: 0, b: 0, a: 100 });
      expect(cssColor('rgb(18, 52, 86)')).toEqual({ r: 18, g: 52, b: 86, a: 100 });
      expect(cssColor('rgba(0, 0, 0, 1.0)')).toEqual({ r: 0, g: 0, b: 0, a: 100 });
      expect(cssColor('rgba(0, 0, 0, 0.5)')).toEqual({ r: 0, g: 0, b: 0, a: 50 });
    });

    it('handles invalid hsla input', () => {
      expect(cssColor('hsl(0)')).toBeUndefined(); // not enough numbers
      expect(cssColor('hsl(0, 0, 0, 0)')).toBeUndefined(); // too many numbers for hsl non-a
      expect(cssColor('hsl(foo)')).toBeUndefined();
      expect(cssColor('hsla(0, 0, 0)')).toBeUndefined(); // not enough numbers for hsla
      expect(cssColor('hsl(0, 0, 0, 0, 0)')).toBeUndefined(); // too many numbers
    });

    it('handles valid hsla input', () => {
      expect(cssColor('hsl(0, 0, 0)')).toEqual({ r: 0, g: 0, b: 0, a: 100 });
      expect(cssColor('hsl(0,0,0)')).toEqual({ r: 0, g: 0, b: 0, a: 100 });
      expect(cssColor('hsl(18, 52, 50)')).toEqual({ r: 194, g: 101, b: 61, a: 100 });
      expect(cssColor('hsla(0, 0, 0, 1.0)')).toEqual({ r: 0, g: 0, b: 0, a: 100 });
      expect(cssColor('hsla(0, 0, 0, 0.5)')).toEqual({ r: 0, g: 0, b: 0, a: 50 });
    });
  });

  describe('getColorFromString', () => {
    // not testing this in detail since it's mostly just a composition of other things already tested
    it('works', () => {
      expect(getColorFromString('000')).toBeUndefined();
      expect(getColorFromString('#000')).toBeTruthy();
      expect(getColorFromString(testColor.str)).toEqual(testColor);

      expect(getColorFromString(testColorAlpha.str)).toEqual(testColorAlpha);
    });

    it('preserves exact string passed in', () => {
      // usually we generate lowercase full-length hex values
      expect(getColorFromString('#EEE')!.str).toEqual('#EEE');
      // our generated RGB values don't have weird spacing
      // (and we generate hex values not rgb() for colors without alpha)
      expect(getColorFromString('rgb(0 ,0,          0)')!.str).toEqual('rgb(0 ,0,          0)');
    });
  });

  describe('getColorFromHSV', () => {
    it('works without alpha', () => {
      expect(getColorFromHSV({ h: testColor.h, s: testColor.s, v: testColor.v })).toEqual(testColor);
    });

    it('works with alpha', () => {
      const result = getColorFromHSV({ h: testColor.h, s: testColor.s, v: testColor.v }, testColorAlpha.a);
      expect(result).toEqual(testColorAlpha);
    });
  });

  describe('getFullColorString', () => {
    it('works', () => {
      // despite the name, this function returns an HTML color string based on *only* the hue
      expect(getFullColorString({ h: 0, s: 50, v: 50 } as IColor)).toEqual('#ff0000');
      expect(getFullColorString({ h: testColor.h, s: 50, v: 50, a: 30 } as IColor)).toEqual(testColor.str);
    });
  });

  describe('updateSV', () => {
    it('works', () => {
      expect(updateSV({ h: testColor.h, s: 50, v: 50 } as IColor, 100, 100)).toEqual(testColorNoAlpha);

      expect(updateSV({ h: testColor.h, s: 50, v: 50, a: 30, t: 70 } as IColor, 100, 100)).toEqual(testColorAlpha);
    });
  });

  describe('updateH', () => {
    it('works', () => {
      expect(updateH({ h: 15, s: testColor.s, v: testColor.v } as IColor, testColor.h)).toEqual(testColorNoAlpha);

      expect(
        updateH(
          { h: 15, s: testColor.s, v: testColor.v, a: testColorAlpha.a, t: testColorAlpha.t } as IColor,
          testColor.h,
        ),
      ).toEqual(testColorAlpha);
    });
  });

  describe('updateRGB', () => {
    it('works', () => {
      // this uses getColorFromRGBA() internally, so not much to test
      const expected: IColor = {
        r: 0,
        g: 21,
        b: 255,
        h: 235,
        s: 100,
        v: 100,
        a: 100,
        t: 0,
        hex: '0015ff',
        str: '#0015ff',
      };
      expect(updateRGB({ r: 255, g: 21, b: 255 } as IColor, 'r', 0)).toEqual(expected);
      expect(updateRGB({ r: 0, g: 255, b: 255 } as IColor, 'g', 21)).toEqual(expected);
      expect(updateRGB({ r: 0, g: 21, b: 0 } as IColor, 'b', 255)).toEqual(expected);

      expected.a = 30;
      expected.t = 70;
      expected.str = 'rgba(0, 21, 255, 0.3)';
      expect(updateRGB({ r: 0, g: 21, b: 255 } as IColor, 'a', 30)).toEqual(expected);
      expect(updateRGB({ r: 0, g: 21, b: 255, a: 25 } as IColor, 'a', 30)).toEqual(expected);
    });
  });

  describe('updateA', () => {
    it('works', () => {
      expect(updateA(testColor, testColorAlpha.a!)).toEqual(testColorAlpha);
    });
  });

  describe('updateT', () => {
    it('works', () => {
      expect(updateT(testColor, testColorAlpha.t!)).toEqual(testColorAlpha);
    });
  });

  describe('clamp', () => {
    it('works', () => {
      expect(clamp(-1, 10)).toEqual(0);
      expect(clamp(0, 10)).toEqual(0);
      expect(clamp(-1, 10, 2)).toEqual(2);
      expect(clamp(-1, 10, -1)).toEqual(-1);
      expect(clamp(5, 10)).toEqual(5);
      expect(clamp(11, 10)).toEqual(10);
    });
  });

  describe('correctRGB', () => {
    it('works', () => {
      expect(correctRGB({ r: -4, g: 300, b: 150 })).toEqual({ r: 0, g: 255, b: 150 });
      expect(correctRGB({ r: -4, g: 300, b: 150, a: 200 })).toEqual({ r: 0, g: 255, b: 150, a: 100 });
    });
  });

  describe('correctHSV', () => {
    it('works', () => {
      expect(correctHSV({ h: 400, s: -1, v: 30 })).toEqual({ h: 359, s: 0, v: 30 });
    });
  });

  describe('correctHex', () => {
    it('works', () => {
      expect(correctHex('1234567')).toBe('123456');
      expect(correctHex('123456')).toBe('123456');
      expect(correctHex('1234')).toBe('123');
      expect(correctHex('123')).toBe('123');
      expect(correctHex('12')).toBe('ffffff');
      expect(correctHex('')).toBe('ffffff');
      expect(correctHex(undefined as any)).toBe('ffffff');

      // documenting: it does NOT check the input for valid characters
      expect(correctHex('hello world')).toBe('hello ');
      // or handle hex values starting with #
      expect(correctHex('#123456')).toBe('#12345');
    });
  });
});

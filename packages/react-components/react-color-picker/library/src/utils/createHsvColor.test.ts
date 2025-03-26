import { createHsvColor } from './createHsvColor';
import { HsvColor } from '../types/color';

describe('createHsvColor', () => {
  it('should create an HSV color with default values', () => {
    const color: HsvColor = createHsvColor({});
    expect(color).toEqual({ h: 0, s: 0, v: 0, a: 1 });
  });

  it('should create an HSV color with specified hue', () => {
    const color: HsvColor = createHsvColor({ h: 120 });
    expect(color).toEqual({ h: 120, s: 0, v: 0, a: 1 });
  });

  it('should create an HSV color with specified saturation', () => {
    const color: HsvColor = createHsvColor({ s: 50 });
    expect(color).toEqual({ h: 0, s: 50, v: 0, a: 1 });
  });

  it('should create an HSV color with specified value', () => {
    const color: HsvColor = createHsvColor({ v: 75 });
    expect(color).toEqual({ h: 0, s: 0, v: 75, a: 1 });
  });

  it('should create an HSV color with specified alpha', () => {
    const color: HsvColor = createHsvColor({ a: 0.5 });
    expect(color).toEqual({ h: 0, s: 0, v: 0, a: 0.5 });
  });

  it('should create an HSV color with all specified components', () => {
    const color: HsvColor = createHsvColor({ h: 180, s: 100, v: 100, a: 0.8 });
    expect(color).toEqual({ h: 180, s: 100, v: 100, a: 0.8 });
  });
});

import { HsvColor } from '../types/color';

export function createHsvColor({ h = 0, s = 0, v = 0, a = 1 }: Partial<HsvColor>): HsvColor {
  return { h, s, v, a };
}

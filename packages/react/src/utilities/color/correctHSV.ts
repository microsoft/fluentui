import { MAX_COLOR_HUE, MAX_COLOR_SATURATION, MAX_COLOR_VALUE } from './consts';
import { clamp } from './clamp';
import type { IHSV } from './interfaces';

/** Corrects an HSV color to fall within the valid range. */
export function correctHSV(color: IHSV): IHSV {
  return {
    h: clamp(color.h, MAX_COLOR_HUE),
    s: clamp(color.s, MAX_COLOR_SATURATION),
    v: clamp(color.v, MAX_COLOR_VALUE),
  };
}

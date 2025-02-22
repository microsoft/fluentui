import { tinycolor } from '@ctrl/tinycolor';

export const MIN = 0;
export const MAX = 100;
export const HUE_MAX = 360;
export const INITIAL_COLOR = '#FFF';
export const INITIAL_COLOR_HSV = tinycolor(INITIAL_COLOR).toHsv();

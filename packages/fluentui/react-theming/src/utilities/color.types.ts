/**
 * An rgb value, generally values range from 0 to 255
 */
export interface IRGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface IHSL {
  /** hue, a value from 0 to 360 representing position on a color wheel */
  h: number;

  /** saturation value, ranges from 0 to 1 */
  s: number;

  /** lightness value, ranges from 0 to 1 */
  l: number;
}

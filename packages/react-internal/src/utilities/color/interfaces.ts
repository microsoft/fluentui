/** RGB color with optional alpha value. */
export interface IRGB {
  /** Red, range 0-255. */
  r: number;
  /** Green, range 0-255. */
  g: number;
  /** Blue, range 0-255. */
  b: number;
  /** Alpha, range 0 (transparent)-100. Usually assumed to be 100 if not specified. */
  a?: number;
}

export interface IHSV {
  /** Hue, range 0-359. */
  h: number;
  /** Saturation, range 0-100. */
  s: number;
  /** Value, range 0-100. */
  v: number;
}

export interface IHSL {
  /** Hue, range 0-359. */
  h: number;
  /** Saturation, range 0-100. */
  s: number;
  /** Lightness, range 0-100. */
  l: number;
}

export interface IColor extends IRGB, IHSV {
  /** Hex string for the color (excluding alpha component), *not* prefixed with #. */
  hex: string;

  /** CSS color string. If a hex value, it must be prefixed with #. */
  str: string;

  /** Transparency value, range 0 (opaque) to 100 (transparent). Usually assumed to be 0 if not specified. */
  t?: number;
}

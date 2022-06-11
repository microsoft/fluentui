/** RGB color with optional alpha value. */
export interface RGB {
  /** Red, range 0-255. */
  r: number;
  /** Green, range 0-255. */
  g: number;
  /** Blue, range 0-255. */
  b: number;
  /** Alpha, range 0 (transparent)-100. Usually assumed to be 100 if not specified. */
  a?: number;
}

export interface HSV {
  /** Hue, range 0-359. */
  h: number;
  /** Saturation, range 0-100. */
  s: number;
  /** Value, range 0-100. */
  v: number;
}

export interface HSL {
  /** Hue, range 0-359. */
  h: number;
  /** Saturation, range 0-100. */
  s: number;
  /** Lightness, range 0-100. */
  l: number;
}

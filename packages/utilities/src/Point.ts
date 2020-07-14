/**
 * Point interface.
 *
 * @public
 * {@docCategory Point}
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Point {
  left?: number;
  top?: number;
  /** @deprecated Use `left` instead */
  x?: number;
  /** @deprecated Use `top` instead */
  y?: number;
}

/**
 * Point interface.
 *
 * @public
 * @deprecated Use `Point` instead.
 * {@docCategory Point}
 */
export interface IPoint extends Point {}

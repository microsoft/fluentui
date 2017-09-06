import { IPoint } from './IPoint';
import { ISize } from './ISize';

/**
 * Determines the distance between two points.
 *
 * @public
 */
export function getDistanceBetweenPoints(point1: IPoint, point2: IPoint): number {
  let distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));

  return distance;
}

/**
 * The available fit modes. These should match the fit modes for CSS.
 */
export type FitMode = 'contain' | 'cover';

/**
 * Options for fitting content sizes into bounding sizes.
 *
 * @export
 * @interface IFitContentToBoundsOptions
 */
export interface IFitContentToBoundsOptions {
  /**
   * The size of the content to fit to the bounds.
   * The output will be proportional to this value.
   *
   * @type {ISize}
   * @memberof IFitContentToBoundsOptions
   */
  contentSize: ISize;
  /**
   * The size of the bounds.
   *
   * @type {ISize}
   * @memberof IFitContentToBoundsOptions
   */
  boundsSize: ISize;
  /**
   * The fit mode to apply, either 'contain' or 'cover'.
   *
   * @type {FitMode}
   * @memberof IFitContentToBoundsOptions
   */
  mode: FitMode;
  /**
   * An optional maximum scale factor to apply. The default is 1.
   * Use Infinity for an unbounded resize.
   *
   * @type {number}
   * @memberof IFitContentToBoundsOptions
   */
  maxScale?: number;
}

/**
 * Produces a proportionally-scaled version of an input content size when fit to a bounding size.
 * Given a `contentSize` and a `boundsSize`, this function scales `contentSize` proportionally
 * using either `contain` or `cover` fit behaviors.
 * Use this function to pre-calculate the layout for the CSS `object-fit` and `background-fit` behaviors.
 * With `contain`, the output size must be the largest it can be while completely within the `boundsSize`.
 * With `cover`, the output size must be the smallest it can be while completely around the `boundsSize`.
 * By default, there is a `maxScale` value of 1, which prevents the `contentSize` from being scaled larger.
 *
 * @param options the options for the bounds fit operation
 */
export function fitContentToBounds(options: IFitContentToBoundsOptions): ISize {
  const {
    contentSize,
    boundsSize,
    mode = 'contain',
    maxScale = 1
  } = options;

  const contentAspectRatio = contentSize.width / contentSize.height;
  const boundsAspectRatio = boundsSize.width / boundsSize.height;

  let scale: number;

  if (mode === 'contain' ? contentAspectRatio > boundsAspectRatio : contentAspectRatio < boundsAspectRatio) {
    scale = boundsSize.width / contentSize.width;
  } else {
    scale = boundsSize.height / contentSize.height;
  }

  const finalScale = Math.min(maxScale, scale);

  return {
    width: contentSize.width * finalScale,
    height: contentSize.height * finalScale
  };
}

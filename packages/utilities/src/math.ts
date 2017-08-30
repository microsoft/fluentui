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

export type FitMode = 'contain' | 'cover';

export interface IFitContentToBoundsOptions {
  contentSize: ISize;
  boundsSize: ISize;
  mode: FitMode;
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

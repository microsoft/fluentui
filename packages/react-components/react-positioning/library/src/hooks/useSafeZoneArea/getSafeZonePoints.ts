import type { Point } from './types';

type RectCorners = Record<'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft', Point>;

/**
 * Returns the mouse anchor and the container corners facing it.
 *
 * @internal
 */
export function getSafeZonePoints(mouseAnchor: Point, containerCorners: RectCorners): Point[] {
  const { topLeft, topRight, bottomRight, bottomLeft } = containerCorners;
  const isAbove = mouseAnchor[1] < topLeft[1];
  const isBelow = mouseAnchor[1] > bottomLeft[1];
  const isLeft = mouseAnchor[0] < topLeft[0];
  const isRight = mouseAnchor[0] > topRight[0];

  if (isAbove) {
    if (isLeft) {
      return [mouseAnchor, bottomLeft, topLeft, topRight];
    }

    if (isRight) {
      return [mouseAnchor, topLeft, topRight, bottomRight];
    }

    return [mouseAnchor, topLeft, topRight];
  }

  if (isBelow) {
    if (isLeft) {
      return [mouseAnchor, topLeft, bottomLeft, bottomRight];
    }

    if (isRight) {
      return [mouseAnchor, topRight, bottomRight, bottomLeft];
    }

    return [mouseAnchor, bottomRight, bottomLeft];
  }

  if (isLeft) {
    return [mouseAnchor, bottomLeft, topLeft];
  }

  if (isRight) {
    return [mouseAnchor, topRight, bottomRight];
  }

  return [];
}

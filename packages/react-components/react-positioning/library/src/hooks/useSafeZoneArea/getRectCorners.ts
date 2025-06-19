import type { Point } from './types';

/**
 * Calculates the corners of a rectangle based on its DOMRect and an offset.
 *
 * @internal
 */
export function getRectCorners(
  rect: DOMRect,
  offset: Point,
): Record<'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft', Point> {
  return {
    topLeft: [rect.left - offset[0], rect.top - offset[1]],
    topRight: [rect.right - offset[0], rect.top - offset[1]],
    bottomRight: [rect.right - offset[0], rect.bottom - offset[1]],
    bottomLeft: [rect.left - offset[0], rect.bottom - offset[1]],
  };
}

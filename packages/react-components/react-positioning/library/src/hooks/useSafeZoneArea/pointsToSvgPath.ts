import type { Point } from './types';

/**
 * Calculates the corners of a rectangle based on its DOMRect and an offset.
 *
 * @internal
 */
export function pointsToSvgPath(points: Point[]): string {
  return `M ${points} z`;
}

import type { Point } from './types';

const OFFSET_DISTANCE = 20;

/**
 * Measures the distance between two points in a 2D space.
 */
export function measureDistance(a: Point, b: Point): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

/**
 * Returns a unit vector pointing from point `b` to point `a`.
 * If the distance is zero, returns a zero vector.
 */
export function getUnitVector(a: Point, b: Point): Point {
  const distance = measureDistance(a, b);

  if (distance === 0) {
    return [0, 0];
  }

  return [(a[0] - b[0]) / distance, (a[1] - b[1]) / distance];
}

/**
 * Calculates the anchor point for a mouse position within a container defined by its top-left and bottom-right corners.
 * The anchor point is calculated as an offset from the center of the container in the direction of the mouse position.
 *
 * @internal
 */
export function getMouseAnchor(topLeftCorner: Point, bottomRightCorner: Point, mouseCoordinates: Point): Point {
  const containerCenter: Point = [
    (topLeftCorner[0] + bottomRightCorner[0]) / 2,
    (topLeftCorner[1] + bottomRightCorner[1]) / 2,
  ];

  const unitVector = getUnitVector(
    [mouseCoordinates[0], mouseCoordinates[1]],
    [containerCenter[0], containerCenter[1]],
  );
  const distance = measureDistance(
    [containerCenter[0], containerCenter[1]],
    [mouseCoordinates[0], mouseCoordinates[1]],
  );

  return [
    containerCenter[0] + unitVector[0] * (distance + OFFSET_DISTANCE),
    containerCenter[1] + unitVector[1] * (distance + OFFSET_DISTANCE),
  ];
}

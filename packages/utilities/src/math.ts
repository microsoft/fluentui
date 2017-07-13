import { IPoint } from './IPoint';
/**
 * Determines the distance between two points.
 *
 * @public
 */
export function getDistanceBetweenPoints(point1: IPoint, point2: IPoint): number {
  let distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));

  return distance;
}
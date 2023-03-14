/* eslint-disable @typescript-eslint/naming-convention */
import { Curve, CurvePath, Vec3 } from './types';

const curveResolution = 128;

// Many of these functions are ported from ThreeJS, which is distributed under
// the MIT license. Retrieved from https://github.com/mrdoob/three.js on
// 14 October 2021.

function distanceTo(v1: Vec3, v2: Vec3) {
  return Math.sqrt(distanceToSquared(v1, v2));
}

function distanceToSquared(v1: Vec3, v2: Vec3) {
  const dx = v1[0] - v2[0];
  const dy = v1[1] - v2[1];
  const dz = v1[2] - v2[2];
  return dx * dx + dy * dy + dz * dz;
}

function equals(v1: Vec3, v2: Vec3) {
  return v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2];
}

function QuadraticBezierP0(t: number, p: number): number {
  const k = 1 - t;
  return k * k * p;
}

function QuadraticBezierP1(t: number, p: number): number {
  return 2 * (1 - t) * t * p;
}

function QuadraticBezierP2(t: number, p: number): number {
  return t * t * p;
}

function QuadraticBezier(t: number, p0: number, p1: number, p2: number): number {
  return QuadraticBezierP0(t, p0) + QuadraticBezierP1(t, p1) + QuadraticBezierP2(t, p2);
}

function getPointOnCurve(curve: Curve, t: number) {
  const [v0, v1, v2] = curve.points;
  return [
    QuadraticBezier(t, v0[0], v1[0], v2[0]),
    QuadraticBezier(t, v0[1], v1[1], v2[1]),
    QuadraticBezier(t, v0[2], v1[2], v2[2]),
  ] as Vec3;
}

function getPointsOnCurve(curve: Curve, divisions: number): Vec3[] {
  const points = [];
  for (let d = 0; d <= divisions; d++) {
    points.push(getPointOnCurve(curve, d / divisions));
  }
  return points;
}

function getCurvePathLength(curvePath: CurvePath) {
  const lengths = getCurvePathLengths(curvePath);
  return lengths[lengths.length - 1];
}

function getCurvePathLengths(curvePath: CurvePath) {
  if (curvePath.cacheLengths && curvePath.cacheLengths.length === curvePath.curves.length) {
    return curvePath.cacheLengths;
  }
  // Get length of sub-curve
  // Push sums into cached array
  const lengths = [];
  let sums = 0;
  for (let i = 0, l = curvePath.curves.length; i < l; i++) {
    sums += getCurveLength(curvePath.curves[i]);
    lengths.push(sums);
  }
  curvePath.cacheLengths = lengths;
  return lengths;
}

function getCurveLength(curve: Curve) {
  const lengths = getCurveLengths(curve);
  return lengths[lengths.length - 1];
}

function getCurveLengths(curve: Curve, divisions = curveResolution) {
  if (curve.cacheArcLengths && curve.cacheArcLengths.length === divisions + 1) {
    return curve.cacheArcLengths;
  }

  const cache = [];
  let current;
  let last = getPointOnCurve(curve, 0);
  let sum = 0;

  cache.push(0);

  for (let p = 1; p <= divisions; p++) {
    current = getPointOnCurve(curve, p / divisions);
    sum += distanceTo(current, last);
    cache.push(sum);
    last = current;
  }

  curve.cacheArcLengths = cache;

  return cache; // { sums: cache, sum: sum }; Sum is in the last element.
}

function getCurveUtoTMapping(curve: Curve, u: number, distance?: number) {
  const arcLengths = getCurveLengths(curve);
  let i = 0;
  const il = arcLengths.length;
  let targetArcLength; // The targeted u distance value to get

  if (distance) {
    targetArcLength = distance;
  } else {
    targetArcLength = u * arcLengths[il - 1];
  }

  // binary search for the index with largest value smaller than target u distance

  let low = 0;
  let high = il - 1;
  let comparison;

  while (low <= high) {
    i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats
    comparison = arcLengths[i] - targetArcLength;

    if (comparison < 0) {
      low = i + 1;
    } else if (comparison > 0) {
      high = i - 1;
    } else {
      high = i;
      break;
    }
  }

  i = high;

  if (arcLengths[i] === targetArcLength) {
    return i / (il - 1);
  }

  // we could get finer grain at lengths, or use simple interpolation between two points
  const lengthBefore = arcLengths[i];
  const lengthAfter = arcLengths[i + 1];

  const segmentLength = lengthAfter - lengthBefore;

  // determine where we are between the 'before' and 'after' points
  const segmentFraction = (targetArcLength - lengthBefore) / segmentLength;

  // add that fractional amount to t
  const t = (i + segmentFraction) / (il - 1);

  return t;
}

function getPointOnCurveAt(curve: Curve, u: number) {
  return getPointOnCurve(curve, getCurveUtoTMapping(curve, u));
}

export function getPointOnCurvePath(curvePath: CurvePath, t: number): Vec3 | null {
  const d = t * getCurvePathLength(curvePath);
  const curveLengths = getCurvePathLengths(curvePath);
  let i = 0;

  while (i < curveLengths.length) {
    if (curveLengths[i] >= d) {
      const diff = curveLengths[i] - d;
      const curve = curvePath.curves[i];

      const segmentLength = getCurveLength(curve);
      const u = segmentLength === 0 ? 0 : 1 - diff / segmentLength;

      return getPointOnCurveAt(curve, u);
    }
    i++;
  }
  return null;
}

export function getPointsOnCurvePath(curvePath: CurvePath, divisions = curveResolution): Vec3[] {
  const points = [];
  let last;

  for (let i = 0, curves = curvePath.curves; i < curves.length; i++) {
    const curve = curves[i];
    const pts = getPointsOnCurve(curve, divisions);

    for (const point of pts) {
      if (last && equals(last, point)) {
        // ensures no consecutive points are duplicates
        continue;
      }

      points.push(point);
      last = point;
    }
  }

  return points;
}

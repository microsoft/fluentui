/**
 * we need to make sure that if we add any property to this, then
 * we need to also add that in  pointTypes below and vise-versa
 */

import { DataPointShape, LegendShape } from '../components/Legends/Legends.types';

export enum Points {
  circle,
  square,
  triangle,
  diamond,
  pyramid,
  hexagon,
  pentagon,
  octagon,
  cross,
  x,
  star,
  hexagram,
  triangleup,
  triangledown,
  triangleleft,
  triangleright,
  hexagon2,
  startriangleup,
  startriangledown,
  starsquare,
  stardiamond,
}

export enum CustomPoints {
  dottedLine,
}

export type PointTypes = {
  [key in number]: {
    /**
     * For certian shapes like pentagon, hexagon and octagon.
     * the width of the bouding box increase by the time of the
     * length of the side, so when we want to render a pentagon
     * having each side of length 7 units we need to decrease it's
     * units by width ratio so that the bounding box width of the pentagon
     * stays as 7
     */
    widthRatio: number;
  };
};

/**
 * we need to make sure that if we add any property to this, then
 * we need to also add that in enum Point and vise-versa
 */

export const pointTypes: PointTypes = {
  [Points.circle]: {
    widthRatio: 1,
  },
  [Points.square]: {
    widthRatio: 1,
  },
  [Points.triangle]: {
    widthRatio: 1,
  },
  [Points.diamond]: {
    widthRatio: 1,
  },
  [Points.pyramid]: {
    widthRatio: 1,
  },
  [Points.hexagon]: {
    widthRatio: 2,
  },
  [Points.pentagon]: {
    widthRatio: 1.168,
  },
  [Points.octagon]: {
    widthRatio: 2.414,
  },
};

export const pointPaths: { [key: string]: string } = {
  // Basic shapes
  circle: 'M1 6 A5 5 0 1 0  12 6 ' + 'M1 6 A5 5 0 0 1  12 6',
  square: 'M1 1 L12 1 L12 12 L1 12 L1 1 Z',
  triangle: 'M6 10L8.74228e-07 -1.04907e-06L12 0L6 10Z',
  pyramid: 'M6 10L8.74228e-07 -1.04907e-06L12 0L6 10Z',
  diamond: 'M2 2 L10 2 L10 10  L2 10 L2 2 Z',
  hexagon: 'M9 0H3L0 5L3 10H9L12 5L9 0Z',
  pentagon: 'M6.06061 0L0 4.21277L2.30303 11H9.69697L12 4.21277L6.06061 0Z',
  octagon: 'M7.08333 0H2.91667L0 2.91667V7.08333L2.91667 10H7.08333L10 7.08333V2.91667L7.08333 0Z',
  cross:
    'M 10.9 7.3 L 7.3 7.3 L 7.3 10.9 L 3.7 10.9 L 3.7 7.3 L 0.09999999999999964 7.3 L ' +
    '0.09999999999999964 3.7 L 3.7 3.7 L 3.7 0.09999999999999964 L 7.3 0.09999999999999964 L ' +
    '7.3 3.7 L 10.9 3.7 Z',
  x:
    'M 5.5 8.05 L 8.05 10.6 L 10.6 8.05 L 8.05 5.5 L 10.6 2.95 L 8.05 0.40000000000000036 L ' +
    '5.5 2.95 L 2.95 0.40000000000000036 L 0.40000000000000036 2.95 L 2.95 5.5 L 0.40000000000000036 8.05 ' +
    'L 2.95 10.6 Z',
  // Additional shapes
  star:
    'M 6.92 4.1499999999999995 L 11.49 4.1499999999999995 L 7.79 6.84 L 9.2 11.2 L 5.5 8.51 L ' +
    '1.7999999999999998 11.2 L 3.21 6.84 L -0.4900000000000002 4.1499999999999995 L 4.08 4.1499999999999995 L 5.5 ' +
    '-0.20000000000000018 Z',
  hexagram:
    'M 2.08 5.5 L 0.3700000000000001 2.53 L 3.79 2.53 L 5.5 -0.4400000000000004 L 7.21 2.53 L ' +
    '10.629999999999999 2.53 L 8.92 5.5 L 10.629999999999999 8.47 L 7.21 8.47 L 5.5 11.440000000000001 L ' +
    '3.79 8.47 L 0.3700000000000001 8.47 Z',
  triangleup: 'M 0.2999999999999998 8.875 L 10.7 8.875 L 5.5 2.125 Z',
  triangledown: 'M 0.2999999999999998 2.125 L 10.7 2.125 L 5.5 8.875 Z',
  triangleleft: 'M 8.875 0.2999999999999998 L 8.875 10.7 L 2.125 5.5 Z',
  triangleright: 'M 2.125 0.2999999999999998 L 2.125 10.7 L 8.875 5.5 Z',
  hexagon2: 'M 3.25 9.4 L 7.75 9.4 L 10 5.5 L 7.75 1.6 L 3.25 1.6 L 1 5.5 Z',
  startriangleup:
    'M -0.7400000000000002 10.9 A 18 18 0 0 1 11.74 10.9 A 18 18 0 0 1 5.5 0.09999999999999964 A 18 18 0 0 1 ' +
    '-0.7400000000000002 10.9 Z',
  startriangledown:
    'M 11.74 0.10000000000000009 A 18 18 0 0 1 -0.7400000000000002 0.10000000000000009 A 18 18 0 0 1 5.5 10.9 ' +
    'A 18 18 0 0 1 11.74 0.10000000000000009 Z',
  starsquare:
    'M 0.5499999999999998 0.5499999999999998 A 9 9 0 0 1 0.5499999999999998 10.45 A 9 9 0 0 1 10.45 10.45 A 9 9 ' +
    '0 0 1 10.45 0.5499999999999998 A 9 9 0 0 1 0.5499999999999998 0.5499999999999998 Z',
  stardiamond:
    'M -0.7999999999999998 5.5 A 8.55 8.55 0 0 1 5.5 11.8 A 8.55 8.55 0 0 1 11.8 5.5 A 8.55 8.55 0 0 1 5.5 ' +
    '-0.7999999999999998 A 8.55 8.55 0 0 1 -0.7999999999999998 5.5 Z',
  // Legacy shapes
  dottedLine: 'M0 6 H3 M5 6 H8 M10 6 H13',
};

export function getShapePath(shape: DataPointShape | undefined): string {
  if (!shape || shape === 'default') {
    return pointPaths.circle;
  }

  let mappedShape = String(shape).toLowerCase().includes('open')
    ? String(shape).toLowerCase().replace('-open', '')
    : String(shape).toLowerCase();

  mappedShape = !(mappedShape in pointPaths) ? 'circle' : mappedShape;

  return pointPaths[mappedShape] || pointPaths.circle;
}

export function isOpenShape(shape?: LegendShape | DataPointShape): boolean {
  return Boolean(String(shape)?.toLowerCase().includes('open'));
}

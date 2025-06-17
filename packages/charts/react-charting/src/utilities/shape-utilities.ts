/**
 * we need to make sure that if we add any property to this, then
 * we need to also add that in  pointTypes below and vise-versa
 */

import { DataPointShape } from '../components/Legends/Legends.types';

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
  circle: 'M4,0A4,4 0 1,1 0,-4A4,4 0 0,1 4,0Z',
  square: 'M4,4H-4V-4H4Z',
  triangle: 'M-4.62,2H4.62L0,-4Z',
  pyramid: 'M6 2 L11 10 L1 10 Z M6 2 L6 10',
  diamond: 'M5.2,0L0,5.2L-5.2,0L0,-5.2Z',
  hexagon: 'M3.46,-2V2L0,4L-3.46,2V-2L0,-4Z',
  pentagon: 'M3.8,-1.24L2.35,3.24H-2.35L-3.8,-1.24L0,-4Z',
  octagon: 'M-1.53,-3.7H1.53L3.7,-1.53V1.53L1.53,3.7H-1.53L-3.7,1.53V-1.53Z',
  cross: 'M4.8,1.6H1.6V4.8H-1.6V1.6H-4.8V-1.6H-1.6V-4.8H1.6V-1.6H4.8Z',
  x:
    'M0,2.26l2.26,2.26l2.26,-2.26l-2.26,-2.26l2.26,-2.26l-2.26,-2.26l-2.26,2.26l-2.26,-2.26l-2.26,2.26l2.26,' +
    '2.26l-2.26,2.26l2.26,2.26Z',
  // Additional shapes
  star: 'M1.26,-1.73H5.33L2.03,0.66L3.29,4.53L0,2.14L-3.29,4.53L-2.03,0.66L-5.33,-1.73H-1.26L0,-5.6Z',
  hexagram:
    'M-3.04,0l-1.52,-2.64h3.04l1.52,-2.64l1.52,2.64h3.04l-1.52,2.64l1.52,2.64h-3.04l-1.52,2.64l-1.52,-2.64h-3.04Z',
  triangleup: 'M-4.62,2H4.62L0,-4Z',
  triangledown: 'M-4.62,-2H4.62L0,4Z',
  triangleleft: 'M2,-4.62V4.62L-4,0Z',
  triangleright: 'M-2,-4.62V4.62L4,0Z',
  hexagon2: 'M-2,3.46H2L4,0L2,-3.46H-2L-4,0Z',
  startriangleup: 'M-5.54,3.2A 16,16 0 0 1 5.54,3.2A 16,16 0 0 1 0,-6.4A 16,16 0 0 1 -5.54,3.2Z',
  startriangledown: 'M5.54,-3.2A 16,16 0 0 1 -5.54,-3.2A 16,16 0 0 1 0,6.4A 16,16 0 0 1 5.54,-3.2Z',
  starsquare: 'M-4.4,-4.4A 8,8 0 0 1 -4.4,4.4A 8,8 0 0 1 4.4,4.4A 8,8 0 0 1 4.4,-4.4A 8,8 0 0 1 -4.4,-4.4Z',
  stardiamond: 'M-5.6,0A 7.6,7.6 0 0 1 0,5.6A 7.6,7.6 0 0 1 5.6,0A 7.6,7.6 0 0 1 0,-5.6A 7.6,7.6 0 0 1 -5.6,0Z',
  // Legacy shapes
  dottedLine: 'M0 6 H3 M5 6 H8 M10 6 H13',
};

export function getShapePath(shape: DataPointShape | undefined): string {
  if (!shape || shape === 'default') {
    return pointPaths.circle;
  }

  let mappedShape = String(shape).toLowerCase().includes('open')
    ? String(shape).toLowerCase().replace('open', '')
    : String(shape).toLowerCase();

  mappedShape = !(mappedShape in pointPaths) ? 'circle' : mappedShape;

  return pointPaths[mappedShape] || pointPaths.circle;
}

export function isOpenShape(shape?: DataPointShape): boolean {
  return Boolean(String(shape)?.toLowerCase().includes('open'));
}

export function getSecureProps(props: Record<string, any> = {}): Record<string, any> {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== undefined && props[key] !== null) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as Record<string, any>);
}

import type {
  Alignment,
  Axis,
  ClientRectObject,
  Coords,
  ElementRects,
  Length,
  Padding,
  Placement,
  Rect,
  Side,
  SideObject,
} from './types';

export const sides: Side[] = ['top', 'right', 'bottom', 'left'];

export const min = Math.min;
export const max = Math.max;
export const round = Math.round;
export const createCoords = (v: number): Coords => ({ x: v, y: v });

const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};

const oppositeAlignmentMap = {
  start: 'end',
  end: 'start',
};

export function clamp(start: number, value: number, end: number): number {
  return max(start, min(value, end));
}

export function evaluate<T, P>(value: T | ((param: P) => T), param: P): T {
  return typeof value === 'function' ? (value as (param: P) => T)(param) : value;
}

export function getSide(placement: Placement): Side {
  return placement.split('-')[0] as Side;
}

export function getAlignment(placement: Placement): Alignment | undefined {
  return placement.split('-')[1] as Alignment | undefined;
}

export function getOppositeAxis(axis: Axis): Axis {
  return axis === 'x' ? 'y' : 'x';
}

export function getAxisLength(axis: Axis): Length {
  return axis === 'y' ? 'height' : 'width';
}

export function getSideAxis(placement: Placement): Axis {
  const side = getSide(placement);
  return side === 'top' || side === 'bottom' ? 'y' : 'x';
}

export function getAlignmentAxis(placement: Placement): Axis {
  return getOppositeAxis(getSideAxis(placement));
}

export function getOppositePlacement<T extends string>(placement: T): T {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side as Side]) as T;
}

export function getOppositeAlignmentPlacement<T extends string>(placement: T): T {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment as Alignment]) as T;
}

export function getAlignmentSides(placement: Placement, rects: ElementRects, rtl: boolean): [Side, Side] {
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);

  let mainAlignmentSide: Side =
    alignmentAxis === 'x'
      ? alignment === (rtl ? 'end' : 'start')
        ? 'right'
        : 'left'
      : alignment === 'start'
      ? 'bottom'
      : 'top';

  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }

  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}

export function getExpandedPlacements(placement: Placement): Placement[] {
  const oppositePlacement = getOppositePlacement(placement);

  return [
    getOppositeAlignmentPlacement(placement),
    oppositePlacement,
    getOppositeAlignmentPlacement(oppositePlacement),
  ];
}

export function getPaddingObject(padding: Padding): SideObject {
  return typeof padding !== 'number'
    ? { top: 0, right: 0, bottom: 0, left: 0, ...padding }
    : { top: padding, right: padding, bottom: padding, left: padding };
}

export function rectToClientRect(rect: Rect): ClientRectObject {
  const { x, y, width, height } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y,
  };
}

import type { Placement, Coords, Middleware, ElementRects, Side, Axis } from '@floating-ui/core';
import { Offset } from '../types';

function getSide(placement: Placement): Side {
  return placement.split('-')[0] as Side;
}

function getMainAxisFromPlacement(placement: Placement): Axis {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'x' : 'y';
}

export function convertValueToCoords(placement: Placement, rects: ElementRects, value: Offset, rtl = false): Coords {
  const side = getSide(placement);
  const isVertical = getMainAxisFromPlacement(placement) === 'x';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;

  let crossAxisMulti = 1;
  if (rtl && isVertical) {
    crossAxisMulti *= -1;
  }

  const rawValue = typeof value === 'function' ? value({ ...rects, placement }) : value;
  const { mainAxis, crossAxis } =
    typeof rawValue === 'number' ? { mainAxis: rawValue, crossAxis: 0 } : { mainAxis: 0, crossAxis: 0, ...rawValue };

  return isVertical
    ? { x: crossAxis * crossAxisMulti, y: mainAxis * mainAxisMulti }
    : { x: mainAxis * mainAxisMulti, y: crossAxis * crossAxisMulti };
}

/**
 * Displaces the floating element from its reference element.
 * @see https://floating-ui.com/docs/offset
 */
export const offset = (value: Offset = 0): Middleware => ({
  name: 'offset',
  options: value,
  async fn(middlewareArguments) {
    const { x, y, placement, rects, platform, elements } = middlewareArguments;

    const diffCoords = convertValueToCoords(placement, rects, value, await platform.isRTL?.(elements.floating));

    return {
      x: x + diffCoords.x,
      y: y + diffCoords.y,
      data: diffCoords,
    };
  },
});

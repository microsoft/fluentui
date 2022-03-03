import type { Placement, Coords, Middleware, ElementRects } from '@floating-ui/dom';
import { Offset } from '../types';
import { getBasePlacement } from '../utils/getBasePlacement';

function convertValueToCoords(placement: Placement, rects: ElementRects, value: Offset, rtl = false): Coords {
  const side = getBasePlacement(placement);
  const isVertical = ['top', 'bottom'].includes(getBasePlacement(placement));
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;

  const crossAxisMulti = rtl && isVertical ? -1 : 1;

  const rawValue = typeof value === 'function' ? value({ ...rects, placement }) : value;
  const { mainAxis, crossAxis } =
    typeof rawValue === 'number' ? { mainAxis: rawValue, crossAxis: 0 } : { mainAxis: 0, crossAxis: 0, ...rawValue };

  return isVertical
    ? { x: crossAxis * crossAxisMulti, y: mainAxis * mainAxisMulti }
    : { x: mainAxis * mainAxisMulti, y: crossAxis * crossAxisMulti };
}

/**
 * Displaces the floating element from its reference element.
 * Middleware copied because of differences in popper v2
 * @see https://github.com/floating-ui/floating-ui/issues/1560
 * @see https://floating-ui.com/docs/offset
 * @see https://github.com/floating-ui/floating-ui/blob/master/packages/core/src/middleware/offset.ts#L37-L40
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

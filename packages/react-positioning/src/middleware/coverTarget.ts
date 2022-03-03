import { Middleware } from '@floating-ui/dom';
import { getBasePlacement } from '../utils/getBasePlacement';

export function coverTarget(): Middleware {
  return {
    name: 'coverTarget',
    fn: middlewareArguments => {
      const { placement, rects, x, y } = middlewareArguments;
      const basePlacement = getBasePlacement(placement);
      const newCoords = { x, y };

      switch (basePlacement) {
        case 'bottom':
          newCoords.y -= rects.reference.height;
          break;
        case 'top':
          newCoords.y += rects.reference.height;
          break;
        case 'left':
          newCoords.x += rects.reference.width;
          break;
        case 'right':
          newCoords.x -= rects.reference.width;
          break;
      }

      return newCoords;
    },
  };
}

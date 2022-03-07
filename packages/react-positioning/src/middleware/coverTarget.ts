import type { Middleware } from '@floating-ui/dom';
import { getSide } from '../utils/getSide';

export function coverTarget(): Middleware {
  return {
    name: 'coverTarget',
    fn: middlewareArguments => {
      const { placement, rects, x, y } = middlewareArguments;
      const basePlacement = getSide(placement);
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

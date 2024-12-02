import type { Middleware, MiddlewareArguments } from '@floating-ui/dom';
import { detectOverflow } from '@floating-ui/dom';
import { getBoundary, parseFloatingUIPlacement, toFloatingUIPadding } from '../utils/index';
import { PositioningOptions } from '../types';

const getCoverTargetCoords = (middlewareArguments: MiddlewareArguments) => {
  const { placement, rects, x, y } = middlewareArguments;
  const basePlacement = parseFloatingUIPlacement(placement).side;
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
};

export function coverTarget(): Middleware {
  return {
    name: 'coverTarget',
    fn: getCoverTargetCoords,
  };
}

export interface CoverTargetOnOverflowMiddlewareOptions
  extends Pick<PositioningOptions, 'overflowBoundary' | 'overflowBoundaryPadding'> {
  container: HTMLElement | null;
  isRtl: boolean;
}

export function coverTargetOnOverflow(options: CoverTargetOnOverflowMiddlewareOptions): Middleware {
  return {
    name: 'coverTarget',
    fn: async middlewareArguments => {
      const { container, overflowBoundary, overflowBoundaryPadding, isRtl } = options;
      const overflow = await detectOverflow(middlewareArguments, {
        ...(overflowBoundaryPadding && { padding: toFloatingUIPadding(overflowBoundaryPadding, isRtl) }),
        ...(overflowBoundary && { altBoundary: false, boundary: getBoundary(container, overflowBoundary) }),
      });
      console.log('coverTargetOnOverflow overflow', overflow);

      const hasOverflow = Object.values(overflow).some(v => v > 0);
      if (hasOverflow) {
        return getCoverTargetCoords(middlewareArguments);
      }
      return {};
    },
  };
}

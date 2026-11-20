import type { Middleware } from '@floating-ui/dom';
import { shift as baseShift, limitShift } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary, toFloatingUIPadding } from '../utils/index';

export interface ShiftMiddlewareOptions
  extends Pick<PositioningOptions, 'overflowBoundary' | 'overflowBoundaryPadding' | 'shiftToCoverTarget'> {
  disableTether?: PositioningOptions['unstable_disableTether'];
  container: HTMLElement | null;
  isRtl: boolean;
}

/**
 * Wraps the floating UI shift middleware for easier usage of our options
 */
export function shift(options: ShiftMiddlewareOptions): Middleware {
  const { shiftToCoverTarget, disableTether, overflowBoundary, container, overflowBoundaryPadding, isRtl } = options;

  // Without `overflowBoundary`, Floating UI's default boundary ('clippingAncestors') already accounts for scroll parents.
  return baseShift({
    ...(shiftToCoverTarget && {
      crossAxis: true,
      limiter: limitShift({ crossAxis: true, mainAxis: false }),
    }),
    ...(disableTether && {
      crossAxis: disableTether === 'all',
      limiter: limitShift({ crossAxis: disableTether !== 'all', mainAxis: false }),
    }),
    ...(overflowBoundaryPadding && { padding: toFloatingUIPadding(overflowBoundaryPadding, isRtl) }),
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
  });
}

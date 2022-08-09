import { shift as baseShift, limitShift } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary } from '../utils/index';

export interface ShiftMiddlewareOptions extends Pick<PositioningOptions, 'overflowBoundary'> {
  hasScrollableElement?: boolean;
  disableTether?: PositioningOptions['unstable_disableTether'];
  container: HTMLElement | null;
}

/**
 * Wraps the floating UI shift middleware for easier usage of our options
 */
export function shift(options: ShiftMiddlewareOptions) {
  const { hasScrollableElement, disableTether, overflowBoundary, container } = options;

  return baseShift({
    ...(hasScrollableElement && { boundary: 'clippingAncestors' }),
    ...(disableTether && {
      crossAxis: disableTether === 'all',
      limiter: limitShift({ crossAxis: disableTether !== 'all', mainAxis: false }),
    }),
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
  });
}

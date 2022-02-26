import { shift as middleware, limitShift } from '@floating-ui/dom';
import { Boundary } from '../types';
import { getBoundary } from '../utils/getBoundary';

export interface ShiftMiddlewareOptions {
  hasScrollableElement?: boolean;
  disableTether?: boolean | 'all';
  overflowBoundary?: Boundary;
  container: HTMLElement | null;
}

export function shift(options: ShiftMiddlewareOptions) {
  const { hasScrollableElement, disableTether, overflowBoundary, container } = options;

  return middleware({
    ...(hasScrollableElement && { boundary: 'clippingParents' }),
    ...(disableTether && {
      crossAxis: disableTether === 'all',
      limiter: limitShift({ crossAxis: disableTether !== 'all', mainAxis: false }),
    }),
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
  });
}

import { shift as middleware, limitShift } from '@floating-ui/dom';
import { Boundary } from '../types';
import { getBoundary } from '../utils/getBoundary';

export interface ShiftMiddlewareOptions {
  hasScrollableElement?: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  disableTether?: boolean | 'all';
  overflowBoundary?: Boundary;
  container: HTMLElement | null;
}

export function shift(options: ShiftMiddlewareOptions) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { hasScrollableElement, disableTether, overflowBoundary, container } = options;

  return middleware({
    ...(hasScrollableElement && { boundary: 'clippingParents' }),
    ...(disableTether && { limiter: limitShift({ crossAxis: true, mainAxis: true }) }),
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
  });
}

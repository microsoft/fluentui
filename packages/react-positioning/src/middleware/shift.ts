import { shift as middleware, limitShift } from '@floating-ui/dom';
import { getBoundary } from '../utils/getBoundary';

export interface ShiftMiddlewareOptions {
  hasScrollableElement?: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  unstable_disableTether?: boolean;
  overflowBoundary?: HTMLElement;
  container: HTMLElement | null;
}

export function shift(options: ShiftMiddlewareOptions) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { hasScrollableElement, unstable_disableTether, overflowBoundary, container } = options;

  return middleware({
    ...(hasScrollableElement && { boundary: 'clippingParents' }),
    ...(unstable_disableTether && { limiter: limitShift({ crossAxis: false, mainAxis: false }) }),
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
  });
}

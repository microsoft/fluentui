import { flip as baseFlip } from '@floating-ui/dom';
import { Boundary } from '../types';
import { getBoundary } from '../utils/getBoundary';

export interface FlipMiddlewareOptions {
  hasScrollableElement?: boolean;
  flipBoundary?: Boundary;
  container: HTMLElement | null;
}

export function flip(options: FlipMiddlewareOptions) {
  const { hasScrollableElement, flipBoundary, container } = options;

  return baseFlip({
    ...(hasScrollableElement && { boundary: 'clippingAncestors' }),
    ...(flipBoundary && { altBoundary: true, boundary: getBoundary(container, flipBoundary) }),
    fallbackStrategy: 'bestFit',
  });
}

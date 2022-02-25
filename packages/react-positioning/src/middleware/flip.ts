import { flip as middleware } from '@floating-ui/dom';
import { Boundary } from '../types';
import { getBoundary } from '../utils/getBoundary';

export interface FlipMiddlewareOptions {
  hasScrollableElement?: boolean;
  flipBoundary?: Boundary;
  container: HTMLElement | null;
}

export function flip(options: FlipMiddlewareOptions) {
  const { hasScrollableElement, flipBoundary, container } = options;

  const opts = { ...(flipBoundary && { boundary: getBoundary(container, flipBoundary) }) };
  return middleware({
    ...(hasScrollableElement && { boundary: 'clippingParents' }),
    ...(flipBoundary && { altBoundary: true, boundary: getBoundary(container, flipBoundary) }),
    fallbackStrategy: 'bestFit',
  });
}

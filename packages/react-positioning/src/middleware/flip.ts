import { flip as middleware } from '@floating-ui/dom';
import { Boundary } from '../types';
import { getBoundary } from '../utils/getBoundary';

export interface FlipMiddlewareOptions {
  disabled?: boolean;
  hasScrollableElement?: boolean;
  flipBoundary?: Boundary;
  container: HTMLElement | null;
}

export function flip(options: FlipMiddlewareOptions) {
  const { disabled, hasScrollableElement, flipBoundary, container } = options;
  if (disabled) {
    return { fn: () => ({}) };
  }

  return middleware({
    ...(hasScrollableElement && { boundary: 'clippingParents' }),
    ...(flipBoundary && { altBoundary: true, boundary: getBoundary(container, flipBoundary) }),
    fallbackStrategy: 'bestFit',
  });
}

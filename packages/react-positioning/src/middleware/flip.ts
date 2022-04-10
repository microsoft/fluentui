import { flip as baseFlip } from '@floating-ui/dom';
import type { FloatingUIOptions } from '../types';
import { getBoundary } from '../utils/index';

export interface FlipMiddlewareOptions extends Pick<FloatingUIOptions, 'flipBoundary'> {
  hasScrollableElement?: boolean;
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

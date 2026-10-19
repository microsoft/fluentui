import type { Boundary as FloatingUIBoundary } from '@floating-ui/dom';
import type { PositioningBoundary } from '../types';
import { getScrollAncestors } from '../engine/geometry';

export function getBoundary(
  element: HTMLElement | null,
  boundary?: PositioningBoundary,
): FloatingUIBoundary | undefined {
  if (!element) {
    return boundary === 'clippingParents' ? 'clippingAncestors' : undefined;
  }

  if (boundary === 'window') {
    return element.ownerDocument.documentElement;
  }

  if (boundary === 'clippingParents') {
    return 'clippingAncestors';
  }

  if (boundary === 'scrollParent') {
    return getScrollAncestors(element)[0] ?? element.ownerDocument.documentElement;
  }

  return boundary;
}

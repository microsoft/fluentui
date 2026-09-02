import type { Boundary as FloatingUIBoundary } from '@floating-ui/dom';

import { getScrollParent } from './getScrollParent';
import type { PositioningBoundary, TargetElement } from '../types';

/**
 * Allows to mimic a behavior from V1 of Popper and accept `window` and `scrollParent` as strings.
 */
export function getBoundary(
  element: TargetElement | null,
  boundary?: PositioningBoundary,
): FloatingUIBoundary | undefined {
  const boundaryElement = element && 'contextElement' in element ? element.contextElement : element;

  if (boundary === 'window') {
    return boundaryElement?.ownerDocument!.documentElement;
  }

  if (boundary === 'clippingParents') {
    return 'clippingAncestors';
  }

  if (boundary === 'scrollParent') {
    let boundariesNode: HTMLElement | undefined = getScrollParent(boundaryElement ?? null);

    if (boundariesNode.nodeName === 'BODY') {
      boundariesNode = boundaryElement?.ownerDocument!.documentElement;
    }

    return boundariesNode;
  }

  return boundary;
}

import type { Boundary as FloatingUIBoundary } from '@floating-ui/dom';

import { getScrollParent } from './getScrollParent';
import type { Boundary } from '../types';

/**
 * Allows to mimic a behavior from V1 of Popper and accept `window` and `scrollParent` as strings.
 */
export function getBoundary(element: HTMLElement | null, boundary?: Boundary): FloatingUIBoundary | undefined {
  if (boundary === 'window') {
    return element?.ownerDocument!.documentElement;
  }

  if (boundary === 'clippingParents') {
    return 'clippingAncestors';
  }

  if (boundary === 'scrollParent') {
    let boundariesNode: HTMLElement | undefined = getScrollParent(element);

    if (boundariesNode.nodeName === 'BODY') {
      boundariesNode = element?.ownerDocument!.documentElement;
    }

    return boundariesNode;
  }

  return boundary;
}

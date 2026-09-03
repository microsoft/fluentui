import type { Boundary as FloatingUIBoundary } from '@floating-ui/dom';

import { getScrollParent } from './getScrollParent';
import type { PositioningBoundary, TargetElement } from '../types';

const isElement = (node: TargetElement | Element | null | undefined): node is Element =>
  node !== null && node !== undefined && 'nodeType' in node && node.nodeType === 1;

/**
 * Allows to mimic a behavior from V1 of Popper and accept `window` and `scrollParent` as strings.
 */
export function getBoundary(
  element: TargetElement | null,
  boundary?: PositioningBoundary,
): FloatingUIBoundary | undefined {
  const boundaryElement = element && 'contextElement' in element ? element.contextElement : element;
  const targetElement = isElement(boundaryElement) ? boundaryElement : undefined;

  if (boundary === 'window') {
    return targetElement?.ownerDocument?.documentElement;
  }

  if (boundary === 'clippingParents') {
    return 'clippingAncestors';
  }
  if (boundary === 'scrollParent') {
    const boundariesNode = targetElement && getScrollParent(targetElement);

    if (!boundariesNode || boundariesNode.nodeName === 'BODY') {
      return [];
    }

    return boundariesNode;
  }

  return boundary;
}

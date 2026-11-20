import type { Boundary as FloatingUIBoundary } from '@floating-ui/dom';

import { getRoot } from '../engine/platform';
import { listScrollParents } from './listScrollParents';
import type { PositioningBoundary } from '../types';

/**
 * Allows to mimic a behavior from V1 of Popper and accept `window` and `scrollParent` as strings.
 */
export const getBoundary = (
  element: HTMLElement | null,
  boundary?: PositioningBoundary,
): FloatingUIBoundary | undefined => {
  const root = element ? getRoot(element) : undefined;
  // The closest scroll parent, the root when it's the body
  const scrollParent = boundary === 'scrollParent' && element && listScrollParents(element)[0];

  return boundary === 'clippingParents'
    ? 'clippingAncestors'
    : boundary === 'window' || boundary === 'scrollParent'
    ? (scrollParent && scrollParent.nodeName !== 'BODY' && scrollParent) || root
    : boundary;
};

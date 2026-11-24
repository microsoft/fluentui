import type { ClippingBoundary, PositioningBoundary } from '../types';
import { getRoot } from './domGeometry';
import { listScrollParents } from './listScrollParents';

/**
 * Allows to mimic a behavior from V1 of Popper and accept `window` and `scrollParent` as strings.
 */
export const getBoundary = (
  element: HTMLElement | null,
  boundary?: PositioningBoundary,
): ClippingBoundary | undefined => {
  const root = element ? getRoot(element) : undefined;
  // The closest scroll parent, the root when it's the body
  const scrollParent = boundary === 'scrollParent' && element && listScrollParents(element)[0];

  return boundary === 'clippingParents'
    ? 'clippingAncestors'
    : boundary === 'window' || boundary === 'scrollParent'
    ? (scrollParent && scrollParent.nodeName !== 'BODY' && scrollParent) || root
    : boundary;
};

'use client';

import type * as React from 'react';

import { usePortal } from './usePortal';
import { renderPortal } from './renderPortal';
import type { PortalProps } from './Portal.types';

/**
 * Portal renders its children into a DOM node that exists outside the DOM
 * hierarchy of the parent component.
 *
 * Defaults to mounting on `targetDocument.body` from the parent Fluent context.
 * Links the portalled subtree to its React parent via `setVirtualParent` so
 * DOM-walking utilities (click-outside, focus traps, `elementContains`) keep
 * working across the portal boundary.
 */
export const Portal: React.FC<PortalProps> = props => {
  const state = usePortal(props);
  return renderPortal(state);
};

Portal.displayName = 'Portal';

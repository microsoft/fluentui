import * as React from 'react';

import { usePortal_unstable } from './usePortal';
import { renderPortal } from './renderPortal';
import type { PortalProps } from './Portal.types';

/**
 * A portal provides a way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
export const Portal: React.FC<PortalProps> = props => {
  const state = usePortal_unstable(props);

  return renderPortal(state);
};

Portal.displayName = 'Portal';

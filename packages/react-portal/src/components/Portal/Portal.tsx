import * as React from 'react';

import { usePortal } from './usePortal';
import { renderPortal } from './renderPortal';
import type { PortalProps } from './Portal.types';

/**
 * Component that renders children in a React portal
 */
export const Portal: React.FC<PortalProps> = props => {
  const state = usePortal(props);

  return renderPortal(state);
};

Portal.displayName = 'Portal';

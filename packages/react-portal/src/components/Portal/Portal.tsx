import * as React from 'react';

import { usePortal } from './usePortal';
import { PortalProps } from './Portal.types';
import { renderPortal } from './renderPortal';

/**
 * Component that renders a slot in a React portal
 */
export const Portal: React.FC<PortalProps> = props => {
  const state = usePortal(props);

  return renderPortal(state);
};

Portal.displayName = 'Portal';

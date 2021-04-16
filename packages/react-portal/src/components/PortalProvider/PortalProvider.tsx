import * as React from 'react';
import { usePortalProvider } from './usePortalProvider';
import { PortalProviderProps } from './PortalProvider.types';
import { renderPortalProvider } from './renderPortalProvider';

/**
 * {@docCategory PortalProvider }
 *
 * Renders a node on document body and passes the node down through context
 * Portals under this component will all be rendered to the same node
 */
export const PortalProvider = React.forwardRef<HTMLElement, PortalProviderProps>((props, ref) => {
  const state = usePortalProvider(props, ref);

  return renderPortalProvider(state);
});

PortalProvider.displayName = 'PortalProvider';

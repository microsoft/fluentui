import * as React from 'react';
import { usePortalProvider } from './usePortalProvider';
import { PortalProviderProps } from './PortalProvider.types';
import { renderPortalProvider } from './renderPortalProvider';

/**
 * Renders a node on body and passes it down through context
 * Portals in the tree be rendered to the same node
 */
export const PortalProvider: React.FC = (props: PortalProviderProps) => {
  const state = usePortalProvider(props);

  return renderPortalProvider(state);
};

PortalProvider.displayName = 'PortalProvider';

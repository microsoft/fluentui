import * as React from 'react';
import { PortalProviderState } from './PortalProvider.types';
import { PortalContext } from '../../portalContext';

/**
 * Render the final JSX of PortalProvider
 */
export const renderPortalProvider = (state: PortalProviderState) => {
  return <PortalContext.Provider value={state.mountNode}>{state.children}</PortalContext.Provider>;
};

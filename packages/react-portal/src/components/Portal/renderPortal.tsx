import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PortalState } from './Portal.types';

/**
 * Render the final JSX of Portal
 */
export const renderPortal: React.FC<PortalState> = (state: PortalState) => {
  if (state.mountNode) {
    return ReactDOM.createPortal(state.children, state.mountNode);
  }

  return null;
};

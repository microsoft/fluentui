import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PortalState } from './Portal.types';

/**
 * Render the final JSX of Portal
 */
export const renderPortal = (state: PortalState): React.ReactPortal | null => {
  if (state.shouldRender && state.mountNode) {
    return ReactDOM.createPortal(state.children, state.mountNode);
  }

  return null;
};

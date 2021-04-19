import * as ReactDOM from 'react-dom';
import { PortalState } from './Portal.types';

/**
 * Render the final JSX of Portal
 */
export const renderPortal = (state: PortalState) => {
  if (state.mountNode) {
    return ReactDOM.createPortal(state.children, state.mountNode);
  }

  return null;
};

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PortalState } from './Portal.types';

/**
 * Render the final JSX of Portal
 */
export const renderPortal = (state: PortalState): React.ReactElement => {
  return (
    <span hidden ref={state.virtualParentRootRef}>
      {state.shouldRender && state.mountNode && ReactDOM.createPortal(state.children, state.mountNode)}
    </span>
  );
};

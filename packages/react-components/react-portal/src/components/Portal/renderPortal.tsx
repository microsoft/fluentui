import * as ReactDOM from 'react-dom';
import * as React from 'react';
import type { PortalState } from './Portal.types';

/**
 * Render the final JSX of Portal
 */
export const renderPortal_unstable = (state: PortalState): React.ReactElement => {
  const portal = state.mountNode ? ReactDOM.createPortal(state.children, state.mountNode) : null;
  if (state.noVirtualParent) {
    return <>{portal}</>;
  }

  return (
    <span hidden ref={state.virtualParentRootRef}>
      {portal}
    </span>
  );
};

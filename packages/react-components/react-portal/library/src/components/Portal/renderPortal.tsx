/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

import type { PortalState, PortalInternalSlots } from './Portal.types';

/**
 * Render the final JSX of Portal
 */
export const renderPortal_unstable = (state: PortalState): React.ReactElement => {
  assertSlots<PortalInternalSlots>(state);

  return (
    <>
      <span hidden ref={state.virtualParentRootRef} />
      {state.mountNode &&
        ReactDOM.createPortal(state.root ? <state.root>{state.children}</state.root> : state.children, state.mountNode)}
    </>
  );
};

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PortalState } from './Portal.types';
import { getSlots } from '@fluentui/react-utilities';

/**
 * Render the final JSX of Portal
 * {@docCategory Portal }
 */
export const renderPortal = (state: PortalState) => {
  const { slots, slotProps } = getSlots(state);

  const content = <slots.root {...slotProps.root}>{state.children}</slots.root>;

  if (state.mountNode) {
    return ReactDOM.createPortal(content, state.mountNode);
  }

  return null;
};

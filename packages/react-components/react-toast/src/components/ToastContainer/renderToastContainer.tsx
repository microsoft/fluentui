/** @jsxRuntime classic */
/** @jsxFrag React.Fragment */
/** @jsx createElement */

import * as React from 'react';
import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { ToastContainerState, ToastContainerSlots, ToastContainerContextValues } from './ToastContainer.types';
import { ToastContainerContextProvider } from '../../contexts/toastContainerContext';

/**
 * Render the final JSX of ToastContainer
 */
export const renderToastContainer_unstable = (
  state: ToastContainerState,
  contextValues: ToastContainerContextValues,
) => {
  const { onTransitionEntering, visible, transitionTimeout, remove, nodeRef } = state;
  const { slots, slotProps } = getSlotsNext<ToastContainerSlots>(state);

  return (
    <ToastContainerContextProvider value={contextValues.toast}>
      {state.shouldRender && (
        <>
          <slots.root {...slotProps.root} />
          <slots.timer {...slotProps.timer} />
        </>
      )}
    </ToastContainerContextProvider>
  );
};

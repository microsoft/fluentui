/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import { Transition } from 'react-transition-group';
import type { ToastContainerState, ToastContainerSlots, ToastContainerContextValues } from './ToastContainer.types';
import { ToastContainerContextProvider } from '../../contexts/toastContainerContext';

/**
 * Render the final JSX of ToastContainer
 */
export const renderToastContainer_unstable = (
  state: ToastContainerState,
  contextValues: ToastContainerContextValues,
) => {
  const { onTransitionEntering, visible, transitionTimeout, remove, nodeRef, shouldRender } = state;
  assertSlots<ToastContainerSlots>(state);

  if (shouldRender) {
    return (
      <ToastContainerContextProvider value={contextValues.toast}>
        <state.root />
        <state.timer />
      </ToastContainerContextProvider>
    );
  }

  return null;

  return (
    <Transition
      in={visible}
      appear
      unmountOnExit
      timeout={transitionTimeout}
      onExited={remove}
      onEntering={onTransitionEntering}
      nodeRef={nodeRef}
    >
      <ToastContainerContextProvider value={contextValues.toast}>
        <state.root />
        <state.timer />
      </ToastContainerContextProvider>
    </Transition>
  );
};

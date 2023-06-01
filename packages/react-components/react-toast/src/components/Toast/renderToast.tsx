/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { Transition } from 'react-transition-group';
import type { ToastState, ToastSlots, ToastContextValues } from './Toast.types';
import { ToastContextProvider } from '../../contexts/toastContext';

/**
 * Render the final JSX of Toast
 */
export const renderToast_unstable = (state: ToastState, contextValues: ToastContextValues) => {
  const { onTransitionEntering, visible, transitionTimeout, remove, nodeRef } = state;
  const { slots, slotProps } = getSlotsNext<ToastSlots>(state);

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
      <ToastContextProvider value={contextValues.toast}>
        <slots.root {...slotProps.root} />
        <slots.timer {...slotProps.timer} />
      </ToastContextProvider>
    </Transition>
  );
};

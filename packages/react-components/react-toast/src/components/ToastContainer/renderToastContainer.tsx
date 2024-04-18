/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
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
  const { onTransitionEntering, visible, transitionTimeout, remove, nodeRef, updateId } = state;
  assertSlots<ToastContainerSlots>(state);

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
        <state.timer key={updateId} />
      </ToastContainerContextProvider>
    </Transition>
  );
};

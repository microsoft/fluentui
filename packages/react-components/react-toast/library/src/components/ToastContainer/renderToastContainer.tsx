/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToastContainerState, ToastContainerSlots, ToastContainerContextValues } from './ToastContainer.types';
import { ToastContainerContextProvider } from '../../contexts/toastContainerContext';
import { CollapseDelayed } from '@fluentui/react-motion-components-preview';

/**
 * Render the final JSX of ToastContainer
 */
export const renderToastContainer_unstable = (
  state: ToastContainerState,
  contextValues: ToastContainerContextValues,
): JSXElement => {
  const { onMotionFinish, visible, updateId } = state;
  assertSlots<ToastContainerSlots>(state);

  return (
    <ToastContainerContextProvider value={contextValues.toast}>
      <CollapseDelayed appear onMotionFinish={onMotionFinish} visible={visible} unmountOnExit>
        <state.root>
          {state.root.children}
          <state.timer key={updateId} />
        </state.root>
      </CollapseDelayed>
    </ToastContainerContextProvider>
  );
};

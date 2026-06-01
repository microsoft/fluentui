/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { ToastContainerContextProvider } from '@fluentui/react-toast';
import type { ToastContainerContextValues, ToastContainerSlots, ToastContainerState } from './ToastContainer.types';

/**
 * Renders the final JSX of the ToastContainer component.
 */
export const renderToastContainer = (
  state: ToastContainerState,
  contextValues: ToastContainerContextValues,
): JSXElement => {
  assertSlots<ToastContainerSlots>(state);

  return (
    <ToastContainerContextProvider value={contextValues.toast}>
      <state.root />
    </ToastContainerContextProvider>
  );
};

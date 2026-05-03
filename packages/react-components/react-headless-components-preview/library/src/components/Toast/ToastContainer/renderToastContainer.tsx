/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToastContainerContextValues, ToastContainerSlots, ToastContainerState } from './ToastContainer.types';
import { ToastContext } from '../toastContext';

export const renderToastContainer = (
  state: ToastContainerState,
  contextValues: ToastContainerContextValues,
): JSXElement => {
  assertSlots<ToastContainerSlots>(state);

  return (
    <ToastContext.Provider value={contextValues.toast}>
      <state.root />
    </ToastContext.Provider>
  );
};

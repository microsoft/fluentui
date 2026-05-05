/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToastContextValues, ToastSlots, ToastState } from './Toast.types';
import { ToastContext } from './toastContext';

export const renderToast = (state: ToastState, contextValues: ToastContextValues): JSXElement => {
  assertSlots<ToastSlots>(state);

  return (
    <ToastContext.Provider value={contextValues.toast}>
      <state.root />
    </ToastContext.Provider>
  );
};

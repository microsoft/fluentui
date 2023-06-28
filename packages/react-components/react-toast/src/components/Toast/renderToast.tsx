/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { ToastState, ToastSlots, ToastContextValues } from './Toast.types';
import { ToastContextProvider } from '../../contexts/toastContext';

/**
 * Render the final JSX of Toast
 */
export const renderToast_unstable = (state: ToastState, contexts: ToastContextValues) => {
  const { slots, slotProps } = getSlotsNext<ToastSlots>(state);

  return (
    <ToastContextProvider value={contexts.toast}>
      <slots.root {...slotProps.root} />
    </ToastContextProvider>
  );
};

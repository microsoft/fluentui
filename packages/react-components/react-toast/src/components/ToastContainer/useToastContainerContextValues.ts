import * as React from 'react';
import { ToastContainerContextValues, ToastContainerState } from './ToastContainer.types';

export function useToastContainerContextValues_unstable(state: ToastContainerState): ToastContainerContextValues {
  const { close, intent } = state;

  const toastContainerContext = React.useMemo(
    () => ({
      close,
      intent,
    }),
    [close, intent],
  );

  return {
    toast: toastContainerContext,
  };
}

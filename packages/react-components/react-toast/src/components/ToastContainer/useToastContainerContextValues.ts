import * as React from 'react';
import { ToastContainerContextValues, ToastContainerState } from './ToastContainer.types';

export function useToastContainerContextValues_unstable(state: ToastContainerState): ToastContainerContextValues {
  const { close } = state;

  const toastContext = React.useMemo(
    () => ({
      close,
    }),
    [close],
  );

  return {
    toast: toastContext,
  };
}

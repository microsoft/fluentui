import * as React from 'react';
import { ToastContainerContextValues, ToastContainerState } from './ToastContainer.types';

export function useToastContainerContextValues_unstable(state: ToastContainerState): ToastContainerContextValues {
  const { close, intent, titleId } = state;

  const toastContext = React.useMemo(
    () => ({
      close,
      intent,
      titleId,
    }),
    [close, intent, titleId],
  );

  return {
    toast: toastContext,
  };
}

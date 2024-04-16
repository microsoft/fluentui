import * as React from 'react';
import { ToastContainerContextValues, ToastContainerState } from './ToastContainer.types';

export function useToastContainerContextValues_unstable(state: ToastContainerState): ToastContainerContextValues {
  const { close, intent, titleId, bodyId } = state;

  const toastContainerContext = React.useMemo(
    () => ({
      close,
      intent,
      titleId,
      bodyId,
    }),
    [close, intent, titleId, bodyId],
  );

  return {
    toast: toastContainerContext,
  };
}

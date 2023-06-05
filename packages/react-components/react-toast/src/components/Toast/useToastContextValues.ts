import * as React from 'react';
import { ToastContextValues, ToastState } from './Toast.types';

export function useToastContextValues_unstable(state: ToastState): ToastContextValues {
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

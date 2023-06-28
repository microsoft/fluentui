import * as React from 'react';
import { ToastContextValues, ToastState } from './Toast.types';

export function useToastContextValues_unstable(state: ToastState): ToastContextValues {
  const { appearance } = state;

  const toastContext = React.useMemo(
    () => ({
      appearance,
    }),
    [appearance],
  );

  return {
    toast: toastContext,
  };
}

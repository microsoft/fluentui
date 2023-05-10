import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { dispatchToast as dispatchToastVanilla, dismissToast as dismissToastVanilla } from './vanilla';
import * as React from 'react';
import { ToastId, ToastOptions } from './types';

export function useToastController() {
  const { targetDocument } = useFluent();

  const dispatchToast = React.useCallback(
    (content: React.ReactNode, options?: ToastOptions) => {
      if (targetDocument) {
        dispatchToastVanilla(content, options, targetDocument);
      }
    },
    [targetDocument],
  );

  const dismissToast = React.useCallback(
    (toastId?: ToastId) => {
      if (targetDocument) {
        dismissToastVanilla(toastId, targetDocument);
      }
    },
    [targetDocument],
  );

  return {
    dispatchToast,
    dismissToast,
  };
}

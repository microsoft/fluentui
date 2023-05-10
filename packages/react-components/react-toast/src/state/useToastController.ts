import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { dispatchToast as dispatchToastVanilla } from './vanilla/dispatchToast';
import * as React from 'react';
import { ToastOptions } from './types';

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

  return {
    dispatchToast,
  };
}

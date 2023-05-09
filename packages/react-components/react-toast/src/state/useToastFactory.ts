import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { createToast as createToastVanilla } from './vanilla/createToast';
import * as React from 'react';
import { ToastOptions } from './types';

export function useToastFactory() {
  const { targetDocument } = useFluent();

  const createToast = React.useCallback(
    (content: React.ReactNode, options?: ToastOptions) => {
      if (targetDocument) {
        createToastVanilla(content, options, targetDocument);
      }
    },
    [targetDocument],
  );

  return {
    createToast,
  };
}

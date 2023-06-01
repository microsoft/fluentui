import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  dispatchToast as dispatchToastVanilla,
  dismissToast as dismissToastVanilla,
  dismissAllToasts as dismissAllToastsVanilla,
  updateToast as updateToastVanilla,
} from './vanilla';
import { ToastId, ToastOptions, ToasterId, UpdateToastEventDetail } from './types';

const noop = () => undefined;

export function useToastController(toasterId?: ToasterId) {
  const { targetDocument } = useFluent();

  return React.useMemo(() => {
    if (!targetDocument) {
      return {
        dispatchToast: noop,
        dismissToast: noop,
        dismissAllToasts: noop,
        updateToast: noop,
      };
    }

    return {
      dispatchToast: (content: React.ReactNode, options?: Partial<Omit<ToastOptions, 'toasterId'>>) => {
        dispatchToastVanilla(content, { ...options, toasterId }, targetDocument);
      },
      dismissToast: (toastId: ToastId) => {
        dismissToastVanilla(toastId, toasterId, targetDocument);
      },
      dismissAllToasts: () => {
        dismissAllToastsVanilla(toasterId, targetDocument);
      },
      updateToast: (options: UpdateToastEventDetail) => {
        updateToastVanilla({ ...options, toasterId }, targetDocument);
      },
    };
  }, [targetDocument, toasterId]);
}

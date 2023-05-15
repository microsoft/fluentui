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

export function useToastController() {
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
      dispatchToast: (content: React.ReactNode, options?: Partial<ToastOptions>) => {
        dispatchToastVanilla(content, options, targetDocument);
      },
      dismissToast: (toastId: ToastId, toasterId?: ToasterId) => {
        dismissToastVanilla(toastId, toasterId, targetDocument);
      },
      dismissAllToasts: (toasterId?: ToasterId) => {
        dismissAllToastsVanilla(toasterId, targetDocument);
      },
      updateToast: (options: UpdateToastEventDetail) => {
        updateToastVanilla(options, targetDocument);
      },
    };
  }, [targetDocument]);
}

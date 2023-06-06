import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  dispatchToast as dispatchToastVanilla,
  dismissToast as dismissToastVanilla,
  dismissAllToasts as dismissAllToastsVanilla,
  updateToast as updateToastVanilla,
} from './vanilla';
import { DispatchToastOptions, ToastId, ToasterId, UpdateToastOptions } from './types';

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
      dispatchToast: (content: React.ReactNode, options?: DispatchToastOptions) => {
        dispatchToastVanilla(content, { ...options, toasterId, data: { root: options?.root } }, targetDocument);
      },
      dismissToast: (toastId: ToastId) => {
        dismissToastVanilla(toastId, toasterId, targetDocument);
      },
      dismissAllToasts: () => {
        dismissAllToastsVanilla(toasterId, targetDocument);
      },
      updateToast: (options: UpdateToastOptions) => {
        updateToastVanilla({ ...options, data: { root: options.root }, toasterId }, targetDocument);
      },
    };
  }, [targetDocument, toasterId]);
}

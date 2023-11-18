import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  dispatchToast as dispatchToastVanilla,
  dismissToast as dismissToastVanilla,
  dismissAllToasts as dismissAllToastsVanilla,
  updateToast as updateToastVanilla,
  playToast as playToastVanilla,
  pauseToast as pauseToastVanilla,
} from './vanilla';
import { DispatchToastOptions, ToastId, ToasterId, UpdateToastOptions } from './types';

const noop = () => undefined;

/**
 * @param toasterId - If an id is provided all imperative methods control that specific toaster
 * @returns Imperative methods to control toasts
 */
export function useToastController(toasterId?: ToasterId) {
  const { targetDocument } = useFluent();

  return React.useMemo(() => {
    if (!targetDocument) {
      return {
        dispatchToast: noop,
        dismissToast: noop,
        dismissAllToasts: noop,
        updateToast: noop,
        pauseToast: noop,
        playToast: noop,
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
      pauseToast: (toastId: ToastId) => {
        pauseToastVanilla(toastId, toasterId, targetDocument);
      },
      playToast: (toastId: ToastId) => {
        playToastVanilla(toastId, toasterId, targetDocument);
      },
    };
  }, [targetDocument, toasterId]);
}

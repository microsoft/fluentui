import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  dispatchToast as dispatchToastVanilla,
  dismissToast as dismissToastVanilla,
  updateToast as updateToastVanilla,
} from './vanilla';
import { ToastId, ToastOptions, UpdateToastEventDetail } from './types';

const noop = () => undefined;

export function useToastController() {
  const { targetDocument } = useFluent();

  return React.useMemo(() => {
    if (!targetDocument) {
      return {
        dispatchToast: noop,
        dismissToast: noop,
        updateToast: noop,
      };
    }

    return {
      dispatchToast: (content: React.ReactNode, options?: Partial<ToastOptions>) => {
        dispatchToastVanilla(content, options, targetDocument);
      },
      dismissToast: (toastId?: Partial<ToastId>) => {
        dismissToastVanilla(toastId, targetDocument);
      },
      updateToast: (options: UpdateToastEventDetail) => {
        updateToastVanilla(options, targetDocument);
      },
    };
  }, [targetDocument]);
}

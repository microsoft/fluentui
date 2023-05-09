import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';
import { Toaster } from './vanilla/toaster';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { Toast, ToastId, ToastPosition } from './types';

export function useToaster() {
  const { targetDocument } = useFluent();
  const [_, forceRender] = React.useReducer(() => ({}), {});
  const [toaster] = React.useState(() => (targetDocument ? new Toaster(targetDocument) : undefined));

  useIsomorphicLayoutEffect(() => {
    if (toaster) {
      toaster.onUpdate = forceRender;
    }

    return () => toaster?.dispose();
  }, [toaster]);

  const getToastToRender = React.useCallback(
    <T>(cb: (position: ToastPosition, toasts: Toast[]) => T) => {
      if (!toaster) {
        return [];
      }

      const toRender = new Map<ToastPosition, Toast[]>();
      const toasts = Array.from(toaster.toasts.values());

      toasts.forEach(toast => {
        const { position } = toast;
        toRender.has(position) || toRender.set(position, []);
        toRender.get(position)!.push(toast);
      });

      return Array.from(toRender, ([position, toastsToRender]) => {
        if (position.startsWith('top')) {
          toastsToRender.reverse();
        }

        return cb(position, toastsToRender);
      });
    },
    [toaster],
  );

  return {
    isToastVisible: (toastId: ToastId) => !!toaster?.isToastVisible(toastId),
    getToastToRender,
  };
}

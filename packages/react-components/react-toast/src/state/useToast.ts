import * as React from 'react';
import { useForceUpdate } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { Toast } from './vanilla/toast';
import { ValidatedToastOptions } from './types';

export function useToast(options: ValidatedToastOptions) {
  const forceRender = useForceUpdate();
  const { targetDocument } = useFluent();
  const [toast] = React.useState(() => {
    if (targetDocument) {
      const newToast = new Toast(targetDocument, options);
      newToast.onUpdate = forceRender;
      return newToast;
    }
  });

  const toastRef = React.useCallback(
    (el: HTMLElement | null) => {
      if (el && toast) {
        toast.setToastElement(el);
      }
    },
    [toast],
  );

  const play = React.useCallback(() => {
    if (toast) {
      toast.play();
    }
  }, [toast]);

  const pause = React.useCallback(() => {
    if (toast) {
      toast.pause();
    }
  }, [toast]);

  return {
    toastRef,
    play,
    pause,
    running: toast?.running ?? false,
  };
}

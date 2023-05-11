import * as React from 'react';
import { useForceUpdate } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { Toast } from './vanilla/toast';
import { ValidatedToastOptions } from './types';

export function useToast(options: ValidatedToastOptions) {
  const toastOptions = useToastOptions(options);
  const forceRender = useForceUpdate();
  const { targetDocument } = useFluent();
  const [toast] = React.useState(() => {
    if (targetDocument) {
      const newToast = new Toast(targetDocument, toastOptions);
      newToast.onUpdate = forceRender;
      return newToast;
    }
  });

  React.useEffect(() => {
    return () => toast?.dispose();
  }, [toast]);

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

function useToastOptions(options: ValidatedToastOptions) {
  const { pauseOnHover, pauseOnWindowBlur, position, timeout } = options;

  return React.useMemo<ValidatedToastOptions>(
    () => ({
      pauseOnHover,
      pauseOnWindowBlur,
      position,
      timeout,
    }),
    [pauseOnHover, pauseOnWindowBlur, position, timeout],
  );
}

import * as React from 'react';
import { useForceUpdate } from '@fluentui/react-utilities';
import { Toast } from './vanilla/toast';
import { ValidatedToastOptions } from './types';

const noop = () => null;

export function useToast<TElement extends HTMLElement>(options: ValidatedToastOptions) {
  const toastOptions = useToastOptions(options);
  const forceRender = useForceUpdate();
  const [toast] = React.useState(() => new Toast());

  const toastRef = React.useRef<TElement>(null);

  React.useEffect(() => {
    if (toast && toastRef.current) {
      toast.onUpdate = forceRender;
      toast.connectToDOM(toastRef.current, toastOptions);
      return () => toast.disconnect();
    }
  }, [toast, toastOptions, forceRender]);

  if (!toast) {
    return {
      toastRef,
      play: noop,
      pause: noop,
      running: false,
    };
  }

  return {
    toastRef,
    play: toast.play,
    pause: toast.pause,
    running: toast.running,
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

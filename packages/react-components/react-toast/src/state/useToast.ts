import * as React from 'react';
import { useForceUpdate } from '@fluentui/react-utilities';
import { Toast } from './vanilla/toast';
import { Toast as ToastProps } from './types';

const noop = () => null;

export function useToast<TElement extends HTMLElement>(options: ToastProps) {
  const { pauseOnHover, pauseOnWindowBlur } = options;

  const forceRender = useForceUpdate();
  const [toast] = React.useState(() => new Toast());

  const toastRef = React.useRef<TElement>(null);

  React.useEffect(() => {
    if (toast && toastRef.current) {
      toast.onUpdate = forceRender;
      toast.connectToDOM(toastRef.current, {
        pauseOnHover,
        pauseOnWindowBlur,
      });

      return () => toast.disconnect();
    }
  }, [toast, pauseOnWindowBlur, pauseOnHover, forceRender]);

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

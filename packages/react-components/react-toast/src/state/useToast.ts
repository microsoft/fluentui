import * as React from 'react';
import { useForceUpdate } from '@fluentui/react-utilities';
import { Toast } from './vanilla/toast';
import { Toast as ToastProps } from './types';

const noop = () => null;

interface UseToastOptions extends Pick<ToastProps, 'pauseOnHover' | 'pauseOnWindowBlur'> {
  visible: boolean;
}

export function useToast<TElement extends HTMLElement>(options: UseToastOptions) {
  const { pauseOnHover, pauseOnWindowBlur, visible } = options;

  const forceRender = useForceUpdate();
  const [toast] = React.useState(() => new Toast());

  const toastRef = React.useRef<TElement>(null);

  React.useEffect(() => {
    if (visible && toast && toastRef.current) {
      toast.onUpdate = forceRender;
      toast.connectToDOM(toastRef.current, {
        pauseOnHover,
        pauseOnWindowBlur,
      });

      return () => toast.disconnect();
    }
  }, [toast, pauseOnWindowBlur, pauseOnHover, forceRender, visible]);

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

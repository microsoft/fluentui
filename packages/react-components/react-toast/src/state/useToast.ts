import * as React from 'react';
import { Toast } from './vanilla/toast';
import { useForceUpdate } from '@fluentui/react-utilities';

export function useToast() {
  const forceRender = useForceUpdate();
  const [toast] = React.useState(() => {
    const newToast = new Toast();
    newToast.onUpdate = forceRender;
    return newToast;
  });

  const play = React.useCallback(() => {
    toast.play();
  }, [toast]);

  const pause = React.useCallback(() => {
    toast.pause();
  }, [toast]);

  return {
    play,
    pause,
    running: toast.running,
  };
}

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

  return {
    play: toast.play,
    pause: toast.pause,
    running: toast.running,
  };
}

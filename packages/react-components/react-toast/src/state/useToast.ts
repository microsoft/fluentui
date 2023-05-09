import * as React from 'react';
import { Toast } from './vanilla/toast';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

export function useToast() {
  const [toast] = React.useState(() => new Toast());
  const [_, forceRender] = React.useReducer(() => ({}), {});
  useIsomorphicLayoutEffect(() => {
    toast.onUpdate = forceRender;
  }, [toast]);

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

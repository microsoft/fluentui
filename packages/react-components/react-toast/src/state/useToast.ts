import * as React from 'react';

import { ToastProps } from './types';

export function useToast(props: ToastProps) {
  const [isRunning, setIsRunning] = React.useState(false);
  const toastRef = React.useRef<HTMLDivElement>(null);

  const syncProps = React.useRef(props);
  const { autoClose, pauseOnHover, closeToast, closeOnClick, targetDocument } = props;

  const playToast = React.useCallback(() => {
    setIsRunning(true);
  }, [setIsRunning]);

  const pauseToast = React.useCallback(() => {
    setIsRunning(false);
  }, [setIsRunning]);

  React.useEffect(() => {
    syncProps.current = props;
  });

  React.useEffect(() => {
    if (!props.pauseOnFocusLoss) {
      return;
    }

    if (!targetDocument?.hasFocus()) {
      pauseToast();
    }
    const win = targetDocument?.defaultView;

    win?.addEventListener('focus', playToast);
    win?.addEventListener('blur', pauseToast);

    return () => {
      win?.removeEventListener('focus', playToast);
      win?.removeEventListener('blur', pauseToast);
    };
  }, [props.pauseOnFocusLoss, playToast, pauseToast, targetDocument]);

  const eventHandlers: React.DOMAttributes<HTMLElement> = {};

  if (autoClose && pauseOnHover) {
    eventHandlers.onMouseEnter = pauseToast;
    eventHandlers.onMouseLeave = playToast;
  }

  if (closeOnClick) {
    eventHandlers.onClick = closeToast;
  }

  return {
    playToast,
    pauseToast,
    isRunning,
    toastRef,
    eventHandlers,
  };
}

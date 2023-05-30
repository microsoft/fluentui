/**
 * ⚠️ This is temporary and WILL be removed
 */

import * as React from 'react';
import { Transition } from 'react-transition-group';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import { useToast, Toast as ToastProps } from '../state';
import { Timer } from './Timer';
import { Announce } from '../AriaLive';
import { useToastStyles } from './Toast.styles';
import { ToastContextProvider } from '../contexts/toastContext';

export const Toast: React.FC<ToastProps & { visible: boolean; announce: Announce }> = props => {
  const styles = useToastStyles();

  const { visible, children, close, remove, updateId, announce, ...toastOptions } = props;
  const { timeout, politeness } = toastOptions;
  const { play, running, toastRef } = useToast<HTMLDivElement>({ ...props, content: children });

  // start the toast once it's fully in
  useIsomorphicLayoutEffect(() => {
    if (toastRef.current) {
      const toast = toastRef.current;
      toast.addEventListener('animationend', play, {
        once: true,
      });
    }
  }, [play, toastRef]);

  React.useEffect(() => {
    if (visible) {
      announce(toastRef.current?.textContent ?? '', { politeness });
    }
  }, [announce, politeness, toastRef, visible, updateId]);

  const onEntering = () => {
    if (!toastRef.current) {
      return;
    }

    const element = toastRef.current;
    element.style.setProperty('--fui-toast-height', `${element.scrollHeight}px`);
  };

  const contextValue = React.useMemo(
    () => ({
      close,
    }),
    [close],
  );

  return (
    <Transition
      in={visible}
      appear
      unmountOnExit
      timeout={500}
      onExited={remove}
      // eslint-disable-next-line react/jsx-no-bind
      onEntering={onEntering}
      nodeRef={toastRef}
    >
      <ToastContextProvider value={contextValue}>
        <div ref={toastRef} className={mergeClasses(styles.toast, visible && styles.enter, !visible && styles.exit)}>
          {children}
          <Timer key={updateId} onTimeout={close} timeout={timeout ?? -1} running={running} />
        </div>
      </ToastContextProvider>
    </Transition>
  );
};

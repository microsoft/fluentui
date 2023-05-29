/**
 * ⚠️ This is temporary and WILL be removed
 */

import * as React from 'react';
import { Transition } from 'react-transition-group';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useToast, Toast as ToastProps } from '../state';
import { Timer } from './Timer';
import { Announce } from '../AriaLive';

const useStyles = makeStyles({
  toast: {
    boxSizing: 'border-box',
    marginTop: '16px',
    minHeight: '44px',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    '--fui-toast-height': '44px',
  },
  enter: {
    animationDuration: '200ms, 400ms',
    animationDelay: '0ms, 200ms',
    animationName: [
      {
        from: {
          maxHeight: 0,
          opacity: 0,
          marginTop: 0,
        },
        to: {
          marginTop: '16px',
          opacity: 0,
          maxHeight: 'var(--fui-toast-height)',
        },
      },
      {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    ],
  },

  exit: {
    animationDuration: '400ms, 200ms',
    animationDelay: '0ms, 400ms',
    animationName: [
      {
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      },
      {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 0,
          marginTop: 0,
          maxHeight: 0,
        },
      },
    ],
  },
});

export const Toast: React.FC<ToastProps & { visible: boolean; announce: Announce }> = props => {
  const styles = useStyles();
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
      <div ref={toastRef} className={mergeClasses(styles.toast, visible && styles.enter, !visible && styles.exit)}>
        {children}
        <Timer key={updateId} onTimeout={close} timeout={timeout ?? -1} running={running} />
      </div>
    </Transition>
  );
};

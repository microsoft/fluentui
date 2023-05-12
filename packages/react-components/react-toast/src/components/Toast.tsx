/**
 * ⚠️ This is temporary and WILL be removed
 */

import * as React from 'react';
import { Transition } from 'react-transition-group';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useToast, Toast as ToastProps } from '../state';
import { Timer } from './Timer';

const useStyles = makeStyles({
  toast: {
    ...shorthands.border('2px', 'dashed', 'red'),
    ...shorthands.padding('4px'),
    display: 'flex',
    minHeight: '40px',
    maxHeight: '40px',
    minWidth: '200px',
    maxWidth: '200px',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  slide: {
    animationDuration: '200ms, 400ms',
    animationDelay: '0ms, 200ms',
    animationName: [
      {
        from: {
          height: '0',
          minHeight: '0',
          maxHeight: '0',
          opacity: 0,
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
          opacity: 1,
        },
      },
    ],
  },

  fadeOut: {
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
          height: 0,
          maxHeight: 0,
          minHeight: 0,
        },
      },
    ],
  },
});

export const Toast: React.FC<ToastProps & { visible: boolean }> = props => {
  const styles = useStyles();
  const { visible, children, close, remove, updateId, ...toastOptions } = props;
  const { timeout } = toastOptions;
  const { play, running, toastRef } = useToast<HTMLDivElement>({ ...toastOptions, content: children });

  // start the toast once it's fully in
  useIsomorphicLayoutEffect(() => {
    if (toastRef.current) {
      const toast = toastRef.current;
      toast.addEventListener('animationend', play, {
        once: true,
      });

      return () => {
        toast.removeEventListener('animationend', play);
      };
    }
  }, [play, toastRef]);

  return (
    <Transition in={visible} unmountOnExit mountOnEnter timeout={500} onExited={remove} nodeRef={toastRef}>
      <div ref={toastRef} className={mergeClasses(styles.toast, visible && styles.slide, !visible && styles.fadeOut)}>
        {children}
        <Timer key={updateId} onTimeout={close} timeout={timeout ?? -1} running={running} />
      </div>
    </Transition>
  );
};

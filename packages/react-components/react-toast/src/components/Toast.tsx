/**
 * ⚠️ This is temporary and WILL be removed
 */

import * as React from 'react';
import { Transition } from 'react-transition-group';
import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useToast, ToastProps } from '../state';
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

export const Toast: React.FC<ToastProps> = props => {
  const styles = useStyles();
  const { isIn, children, closeToast, deleteToast, autoClose } = props;
  const { eventHandlers, toastRef, playToast, isRunning } = useToast(props);
  const nodeRef = React.useRef<HTMLDivElement>(null);

  // start the toast once it's fully in
  useIsomorphicLayoutEffect(() => {
    if (toastRef.current) {
      const toast = toastRef.current;
      toast.addEventListener('animationend', playToast, {
        once: true,
      });

      return () => {
        toast.removeEventListener('animationend', playToast);
      };
    }
  }, [playToast, toastRef]);

  return (
    <Transition in={isIn} unmountOnExit mountOnEnter timeout={500} onExited={deleteToast} nodeRef={nodeRef}>
      <div
        ref={useMergedRefs(nodeRef, toastRef)}
        className={mergeClasses(styles.toast, isIn && styles.slide, !isIn && styles.fadeOut)}
        {...eventHandlers}
      >
        {children as React.ReactNode}
        <Timer onTimeout={closeToast} timeout={!autoClose ? -1 : autoClose} isRunning={isRunning} />
      </div>
    </Transition>
  );
};

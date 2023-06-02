import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ToastSlots, ToastState } from './Toast.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toastClassNames: SlotClassNames<ToastSlots> = {
  root: 'fui-Toast',
  timer: 'fui-Toast__timer',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    marginTop: '16px',
    minHeight: '44px',
    pointerEvents: 'all',
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

/**
 * Apply styling to the Toast slots based on the state
 */
export const useToastStyles_unstable = (state: ToastState): ToastState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    toastClassNames.root,
    state.visible ? styles.enter : styles.exit,
    styles.root,
    state.root.className,
  );

  return state;
};

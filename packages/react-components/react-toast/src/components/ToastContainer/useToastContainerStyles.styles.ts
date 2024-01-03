import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { ToastContainerSlots, ToastContainerState } from './ToastContainer.types';

export const toastContainerClassNames: SlotClassNames<ToastContainerSlots> = {
  root: 'fui-ToastContainer',
  timer: 'fui-ToastContainer__timer',
};

const useRootBaseClassName = makeResetStyles({
  boxSizing: 'border-box',
  marginTop: '16px',
  minHeight: '44px',
  pointerEvents: 'all',
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  '--fui-toast-height': '44px',
  ...createCustomFocusIndicatorStyle({
    ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
  }),
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
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
 * Apply styling to the ToastContainer slots based on the state
 */
export const useToastContainerStyles_unstable = (state: ToastContainerState): ToastContainerState => {
  const rootBaseClassName = useRootBaseClassName();
  const styles = useStyles();
  state.root.className = mergeClasses(
    toastContainerClassNames.root,
    rootBaseClassName,
    state.visible ? styles.enter : styles.exit,
    state.root.className,
  );

  return state;
};

import { makeStyles, mergeClasses } from '@griffel/react';
import type { DrawerOverlaySlots, DrawerOverlayState } from './DrawerOverlay.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { getDrawerBaseClassNames, useDrawerBaseStyles } from '../../util/useDrawerBaseStyles.styles';
import { tokens } from '@fluentui/react-theme';
import { HTMLAttributes } from 'react';

export const drawerOverlayClassNames: SlotClassNames<DrawerOverlaySlots> = {
  root: 'fui-DrawerOverlay',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    transitionProperty: 'transform',
    willChange: 'transform',
  },

  /* Positioning */
  left: {
    transform: 'translate3D(calc(var(--fui-Drawer--size) * -1), 0, 0)',
  },
  right: {
    transform: 'translate3D(calc(var(--fui-Drawer--size) * 1), 0, 0)',
  },

  /* Visible */
  visible: {
    transform: 'translate3D(0, 0, 0)',
  },

  /* Backdrop */
  backdrop: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    willChange: 'opacity',
    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
  backdropVisible: {
    opacity: 1,
  },
});

/**
 * Apply styling to the DrawerOverlay slots based on the state
 */
export const useDrawerOverlayStyles_unstable = (state: DrawerOverlayState): DrawerOverlayState => {
  const baseStyles = useDrawerBaseStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    drawerOverlayClassNames.root,
    baseStyles.root,
    styles.root,
    getDrawerBaseClassNames(state, baseStyles),
    state.position && styles[state.position],
    state.visible && styles.visible,
    state.root.className,
  );

  const backdrop = state.root.backdrop as HTMLAttributes<HTMLDivElement>;

  if (backdrop) {
    backdrop.className = mergeClasses(
      backdrop.className,
      styles.backdrop,
      state.backdropVisible && styles.backdropVisible,
    );
  }

  return state;
};

import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { DrawerOverlaySlots, DrawerOverlayState } from './DrawerOverlay.types';
import { useDrawerBaseClassNames, drawerCSSVars, useDrawerDurationStyles } from '../../util/useDrawerBaseStyles.styles';

export const drawerOverlayClassNames: SlotClassNames<DrawerOverlaySlots> = {
  root: 'fui-DrawerOverlay',
  backdrop: 'fui-DrawerOverlay__backdrop',
};

/**
 * Styles for the root slot
 */
const useDrawerRootStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    opacity: 0,
    boxShadow: '0px transparent',
    transitionProperty: 'transform, box-shadow, opacity',
    willChange: 'transform, box-shadow, opacity',
  },

  /* Positioning */
  start: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
  },
  end: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * 1), 0, 0)`,
  },

  /* Visible */
  visible: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0)',
    boxShadow: tokens.shadow64,
  },
});

/**
 * Styles for the backdrop slot
 */
const useBackdropMotionStyles = makeStyles({
  backdrop: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionTimingFunction: tokens.curveEasyEase,
    willChange: 'opacity',
  },

  visible: {
    opacity: 1,
  },
});

/**
 * Apply styling to the DrawerOverlay slots based on the state
 */
export const useDrawerOverlayStyles_unstable = (state: DrawerOverlayState): DrawerOverlayState => {
  const baseClassNames = useDrawerBaseClassNames(state);
  const rootStyles = useDrawerRootStyles();
  const backdropMotionStyles = useBackdropMotionStyles();
  const durationStyles = useDrawerDurationStyles();

  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement> | undefined;

  state.root.className = mergeClasses(
    drawerOverlayClassNames.root,
    baseClassNames,
    rootStyles.root,
    rootStyles[state.position],
    state.motion.active && rootStyles.visible,
    state.root.className,
  );

  if (backdrop) {
    backdrop.className = mergeClasses(
      drawerOverlayClassNames.backdrop,
      backdropMotionStyles.backdrop,
      durationStyles[state.size],
      state.backdropMotion.active && backdropMotionStyles.visible,
      backdrop.className,
    );
  }

  return state;
};

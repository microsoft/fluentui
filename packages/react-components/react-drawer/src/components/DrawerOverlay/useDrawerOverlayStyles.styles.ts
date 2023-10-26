import * as React from 'react';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

import type { DrawerOverlayState } from './DrawerOverlay.types';
import { DrawerOverlaySurfaceSlots } from './DrawerOverlaySurface/DrawerOverlaySurface.types';
import {
  drawerCSSVars,
  drawerDefaultStyles,
  useDrawerBaseClassNames,
  useDrawerDurationStyles,
} from '../../shared/useDrawerBaseStyles.styles';

export const drawerOverlayClassNames: SlotClassNames<DrawerOverlaySurfaceSlots> = {
  root: 'fui-DrawerOverlay',
  backdrop: 'fui-DrawerOverlay__backdrop',
};

/**
 * Styles for the root slot
 */
const useDrawerResetStyles = makeResetStyles({
  ...createFocusOutlineStyle(),
  ...drawerDefaultStyles,
  position: 'fixed',
  top: 0,
  bottom: 0,
  opacity: 0,
  boxShadow: `0px ${tokens.colorTransparentBackground}`,
  transitionProperty: 'transform, box-shadow, opacity',
  willChange: 'transform, box-shadow, opacity',
});

const useDrawerRootStyles = makeStyles({
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
const useBackdropStyles = makeStyles({
  backdrop: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionTimingFunction: tokens.curveEasyEase,
    willChange: 'opacity',

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.001ms',
    },
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
  const resetStyles = useDrawerResetStyles();
  const rootStyles = useDrawerRootStyles();
  const backdropStyles = useBackdropStyles();
  const durationStyles = useDrawerDurationStyles();

  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement> | undefined;

  state.root.className = mergeClasses(
    drawerOverlayClassNames.root,
    baseClassNames,
    resetStyles,
    rootStyles[state.position],
    state.motion.active && rootStyles.visible,
    state.root.className,
  );

  if (backdrop) {
    backdrop.className = mergeClasses(
      drawerOverlayClassNames.backdrop,
      backdropStyles.backdrop,
      durationStyles[state.size],
      state.backdropMotion.active && backdropStyles.visible,
      backdrop.className,
    );
  }

  return state;
};

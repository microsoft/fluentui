import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { DrawerOverlaySlots, DrawerOverlayState } from './DrawerOverlay.types';
import { getDrawerBaseClassNames, useDrawerBaseStyles, drawerCSSVars } from '../../util/useDrawerBaseStyles.styles';

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
    transitionProperty: 'transform, box-shadow',
    willChange: 'transform, box-shadow',
    boxShadow: '0px transparent',
  },

  /* Positioning */
  left: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
  },
  right: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * 1), 0, 0)`,
  },

  /* Visible */
  visible: {
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
  },

  backdropVisible: {
    opacity: 1,
  },

  // Transition duration based on size
  small: {
    transitionDuration: tokens.durationNormal,
  },
  medium: {
    transitionDuration: tokens.durationSlow,
  },
  large: {
    transitionDuration: tokens.durationSlower,
  },
  full: {
    transitionDuration: tokens.durationUltraSlow,
  },
});

/**
 * Apply styling to the DrawerOverlay slots based on the state
 */
export const useDrawerOverlayStyles_unstable = (state: DrawerOverlayState): DrawerOverlayState => {
  const baseStyles = useDrawerBaseStyles();
  const rootStyles = useDrawerRootStyles();
  const backdropStyles = useBackdropStyles();

  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement> | undefined;

  state.root.className = mergeClasses(
    drawerOverlayClassNames.root,
    baseStyles.root,
    rootStyles.root,
    getDrawerBaseClassNames(state, baseStyles),
    state.position && rootStyles[state.position],
    state.visible && rootStyles.visible,
    state.root.className,
  );

  if (backdrop) {
    backdrop.className = mergeClasses(
      drawerOverlayClassNames.backdrop,
      backdropStyles.backdrop,
      state.backdropVisible && backdropStyles.backdropVisible,
      state.size && backdropStyles[state.size],
      backdrop.className,
    );
  }

  return state;
};

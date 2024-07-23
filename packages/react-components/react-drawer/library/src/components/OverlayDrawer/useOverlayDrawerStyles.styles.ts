import * as React from 'react';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

import type { OverlayDrawerState } from './OverlayDrawer.types';
import { OverlayDrawerSurfaceSlots } from './OverlayDrawerSurface/OverlayDrawerSurface.types';
import {
  drawerCSSVars,
  drawerDefaultStyles,
  useDrawerBaseClassNames,
  useDrawerDurationStyles,
} from '../../shared/useDrawerBaseStyles.styles';
import { useMotionClassNames } from '@fluentui/react-motion-preview';

export const overlayDrawerClassNames: SlotClassNames<OverlayDrawerSurfaceSlots> = {
  root: 'fui-OverlayDrawer',
  backdrop: 'fui-OverlayDrawer__backdrop',
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
});

const useDrawerRootStyles = makeStyles({
  /* Positioning */
  start: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
  },
  end: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * 1), 0, 0)`,
  },
  bottom: {
    transform: `translate3D(0, calc(var(${drawerCSSVars.drawerSizeVar}) * 1), 0)`,
    top: 'auto',
    height: `var(${drawerCSSVars.drawerSizeVar})`,
    width: '100vw',
  },
});

const useDrawerMotionStyles = makeStyles({
  default: {
    opacity: 0,
    boxShadow: `0px ${tokens.colorTransparentBackground}`,
    transitionProperty: 'transform, box-shadow, opacity',
    willChange: 'transform, box-shadow, opacity',
  },
  enter: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0)',
    boxShadow: tokens.shadow64,
  },
});

/**
 * Styles for the backdrop slot
 */
const useBackdropMotionStyles = makeStyles({
  default: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionTimingFunction: tokens.curveEasyEase,
    willChange: 'opacity',
  },

  enter: {
    opacity: 1,
  },
});

/**
 * Apply styling to the OverlayDrawer slots based on the state
 */
export const useOverlayDrawerStyles_unstable = (state: OverlayDrawerState): OverlayDrawerState => {
  'use no memo';

  const baseClassNames = useDrawerBaseClassNames(state);
  const resetStyles = useDrawerResetStyles();
  const rootStyles = useDrawerRootStyles();
  const durationStyles = useDrawerDurationStyles();

  const drawerMotionClassNames = useMotionClassNames(state.motion, useDrawerMotionStyles());
  const backdropMotionClassNames = useMotionClassNames(state.motion, useBackdropMotionStyles());

  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement> | undefined;

  state.root.className = mergeClasses(
    overlayDrawerClassNames.root,
    baseClassNames,
    resetStyles,
    rootStyles[state.position],
    drawerMotionClassNames,
    state.root.className,
  );

  if (backdrop) {
    backdrop.className = mergeClasses(
      overlayDrawerClassNames.backdrop,
      backdropMotionClassNames,
      durationStyles[state.size],
      backdrop.className,
    );
  }

  return state;
};

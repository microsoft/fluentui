import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { DrawerOverlaySlots, DrawerOverlayState } from './DrawerOverlay.types';
import {
  useDrawerBaseClassNames,
  useDrawerBaseStyles,
  drawerCSSVars,
  useDrawerDurationStyles,
} from '../../util/useDrawerBaseStyles.styles';

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
    boxShadow: tokens.shadow64,
  },
});

/**
 * Styles for the root slot when motion is enabled
 */
const useDrawerRootMotionStyles = makeStyles({
  root: {
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
const useBackdropMotionStyles = makeStyles({
  backdrop: {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionTimingFunction: tokens.curveLinear,
    willChange: 'opacity',
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
  const durationStyles = useDrawerDurationStyles();
  const rootStyles = useDrawerRootStyles();
  const rootMotionStyles = useDrawerRootMotionStyles();
  const backdropMotionStyles = useBackdropMotionStyles();

  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement> | undefined;

  const motionClasses = React.useMemo(() => {
    return mergeClasses(
      state.position && rootMotionStyles[state.position],
      state.size && durationStyles[state.size],
      state.motion.isActive() && rootMotionStyles.visible,
      state.root.className,
    );
  }, [durationStyles, rootMotionStyles, state.motion, state.position, state.root.className, state.size]);

  const backdropMotionClasses = React.useMemo(() => {
    return mergeClasses(
      backdropMotionStyles.backdrop,
      state.backdropMotion.isActive() && backdropMotionStyles.backdropVisible,
      state.size && durationStyles[state.size],
    );
  }, [
    backdropMotionStyles.backdrop,
    backdropMotionStyles.backdropVisible,
    durationStyles,
    state.backdropMotion,
    state.size,
  ]);

  state.root.className = mergeClasses(
    drawerOverlayClassNames.root,
    useDrawerBaseClassNames(state, baseStyles),
    rootStyles.root,
    state.motion.hasInternalMotion && motionClasses,
    state.root.className,
  );

  if (backdrop) {
    backdrop.className = mergeClasses(
      drawerOverlayClassNames.backdrop,
      state.backdropMotion.hasInternalMotion && backdropMotionClasses,
      backdrop.className,
    );
  }

  return state;
};

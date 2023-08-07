import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { DrawerBaseProps, DrawerBaseState } from './DrawerBase.types';

/**
 * CSS variable names used internally for uniform styling in Drawer.
 */
export const drawerCSSVars = {
  drawerSizeVar: '--fui-Drawer--size',
};

/**
 * Styles for the root slot
 */
export const useDrawerBaseStyles = makeStyles({
  root: {
    ...shorthands.padding(0),
    ...shorthands.overflow('hidden'),
    ...shorthands.borderRadius(0),
    ...shorthands.border(0),

    width: `var(${drawerCSSVars.drawerSizeVar})`,
    maxWidth: '100vw',
    height: 'auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  /* Reduced motion */
  reducedMotion: {
    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.001ms',
    },
  },

  /* Positioning */
  left: {
    left: 0,
    right: 'auto',
  },
  right: {
    right: 0,
    left: 'auto',
  },

  /* Motion */
  entering: {
    transitionTimingFunction: tokens.curveDecelerateMid,
  },
  exiting: {
    transitionTimingFunction: tokens.curveAccelerateMin,
  },

  /* Sizes */
  small: {
    [drawerCSSVars.drawerSizeVar]: '320px',
  },
  medium: {
    [drawerCSSVars.drawerSizeVar]: '592px',
  },
  large: {
    [drawerCSSVars.drawerSizeVar]: '940px',
  },
  full: {
    [drawerCSSVars.drawerSizeVar]: '100vw',
  },
});

export const useDrawerDurationStyles = makeStyles({
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

export const getDrawerBaseClassNames = (
  { position, size, motionState }: DrawerBaseState & DrawerBaseProps,
  baseStyles: ReturnType<typeof useDrawerBaseStyles>,
) => {
  return mergeClasses(
    baseStyles.reducedMotion,
    position && baseStyles[position],
    size && baseStyles[size],
    motionState === 'entering' && baseStyles.entering,
    motionState === 'exiting' && baseStyles.exiting,
  );
};

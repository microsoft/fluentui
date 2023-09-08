import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

import { DrawerBaseState } from './DrawerBase.types';

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

  /* Motion */
  entering: {
    transitionTimingFunction: tokens.curveDecelerateMid,
  },
  exiting: {
    transitionTimingFunction: tokens.curveAccelerateMin,
  },
  reducedMotion: {
    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.001ms',
    },
  },

  /* Positioning */
  start: {
    left: 0,
    right: 'auto',
  },
  end: {
    right: 0,
    left: 'auto',
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
    transitionDuration: tokens.durationGentle,
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

export const useDrawerBaseClassNames = ({ position, size, motion }: DrawerBaseState) => {
  const baseStyles = useDrawerBaseStyles();
  const durationStyles = useDrawerDurationStyles();

  return mergeClasses(
    baseStyles.root,
    baseStyles[position],
    durationStyles[size],
    baseStyles[size],
    baseStyles.reducedMotion,
    motion.type === 'entering' && baseStyles.entering,
    motion.type === 'exiting' && baseStyles.exiting,
  );
};

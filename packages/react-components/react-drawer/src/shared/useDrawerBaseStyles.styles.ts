import { GriffelStyle, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

import { DrawerBaseState } from './DrawerBase.types';

/**
 * CSS variable names used internally for uniform styling in Drawer.
 */
export const drawerCSSVars = {
  drawerSizeVar: '--fui-Drawer--size',
};

/**
 * Default shared styles for the Drawer component
 */
export const drawerDefaultStyles: GriffelStyle = {
  ...shorthands.overflow('hidden'),

  width: `var(${drawerCSSVars.drawerSizeVar})`,
  maxWidth: '100vw',
  height: 'auto',
  maxHeight: '100vh',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
};

/**
 * Shared dynamic styles for the Drawer component
 */
const useDrawerStyles = makeStyles({
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
  const baseStyles = useDrawerStyles();
  const durationStyles = useDrawerDurationStyles();

  return mergeClasses(
    baseStyles[position],
    durationStyles[size],
    baseStyles[size],
    baseStyles.reducedMotion,
    motion.type === 'entering' && baseStyles.entering,
    motion.type === 'exiting' && baseStyles.exiting,
  );
};

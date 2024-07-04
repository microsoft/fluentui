import { type GriffelResetStyle, makeStyles, mergeClasses } from '@griffel/react';
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
export const drawerDefaultStyles: GriffelResetStyle = {
  overflow: 'hidden',

  width: `var(${drawerCSSVars.drawerSizeVar})`,
  maxWidth: '100vw',
  height: 'auto',
  maxHeight: '100vh',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  backgroundColor: `var(--ctrl-token-DrawerBase-1, var(--semantic-token-DrawerBase-2, ${tokens.colorNeutralBackground1}))`,
  color: `var(--ctrl-token-DrawerBase-3, var(--semantic-token-DrawerBase-4, ${tokens.colorNeutralForeground1}))`,
};

/**
 * Shared dynamic styles for the Drawer component
 */
const useDrawerStyles = makeStyles({
  /* Motion */
  entering: {
    transitionTimingFunction: `var(--ctrl-token-DrawerBase-5, var(--semantic-token-DrawerBase-6, ${tokens.curveDecelerateMid}))`,
  },
  exiting: {
    transitionTimingFunction: `var(--ctrl-token-DrawerBase-7, var(--semantic-token-DrawerBase-8, ${tokens.curveAccelerateMin}))`,
  },
  reducedMotion: {
    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.001ms',
    },
  },

  /* Positioning */
  start: {
    borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,

    left: 0,
    right: 'auto',
  },
  end: {
    borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,

    right: 0,
    left: 'auto',
  },
  bottom: {
    bottom: 0,
    top: 'auto',
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

export const useDrawerBottomBaseStyles = makeStyles({
  /* Sizes for position bottom */
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
    [drawerCSSVars.drawerSizeVar]: '100vh',
  },
});

export const useDrawerDurationStyles = makeStyles({
  small: {
    transitionDuration: `var(--ctrl-token-DrawerBase-9, var(--semantic-token-DrawerBase-10, ${tokens.durationGentle}))`,
  },
  medium: {
    transitionDuration: `var(--ctrl-token-DrawerBase-11, var(--semantic-token-DrawerBase-12, ${tokens.durationSlow}))`,
  },
  large: {
    transitionDuration: `var(--ctrl-token-DrawerBase-13, var(--semantic-token-DrawerBase-14, ${tokens.durationSlower}))`,
  },
  full: {
    transitionDuration: `var(--ctrl-token-DrawerBase-15, var(--semantic-token-DrawerBase-16, ${tokens.durationUltraSlow}))`,
  },
});

export const useDrawerBaseClassNames = ({ position, size, motion }: DrawerBaseState) => {
  const baseStyles = useDrawerStyles();
  const bottomBaseStyles = useDrawerBottomBaseStyles();
  const durationStyles = useDrawerDurationStyles();

  return mergeClasses(
    baseStyles[position],
    position === 'bottom' && bottomBaseStyles[size],
    durationStyles[size],
    position !== 'bottom' && baseStyles[size],
    baseStyles.reducedMotion,
    motion.type === 'entering' && baseStyles.entering,
    motion.type === 'exiting' && baseStyles.exiting,
  );
};

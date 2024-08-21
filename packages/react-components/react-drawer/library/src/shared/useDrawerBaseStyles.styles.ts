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
  backgroundColor: `var(--1, var(--2, ${tokens.colorNeutralBackground1}))`,
  color: `var(--3, var(--4, ${tokens.colorNeutralForeground1}))`,
};

/**
 * Shared dynamic styles for the Drawer component
 */
const useDrawerStyles = makeStyles({
  /* Motion */
  entering: {
    transitionTimingFunction: `var(--5, var(--6, ${tokens.curveDecelerateMid}))`,
  },
  exiting: {
    transitionTimingFunction: `var(--7, var(--8, ${tokens.curveAccelerateMin}))`,
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
    [drawerCSSVars.drawerSizeVar]: '100%',
  },
});

export const useDrawerDurationStyles = makeStyles({
  small: {
    transitionDuration: `var(--9, var(--10, ${tokens.durationGentle}))`,
  },
  medium: {
    transitionDuration: `var(--11, var(--12, ${tokens.durationSlow}))`,
  },
  large: {
    transitionDuration: `var(--13, var(--14, ${tokens.durationSlower}))`,
  },
  full: {
    transitionDuration: `var(--15, var(--16, ${tokens.durationUltraSlow}))`,
  },
});

export const useDrawerBaseClassNames = ({ position, size, motion }: DrawerBaseState) => {
  const baseStyles = useDrawerStyles();
  const bottomBaseStyles = useDrawerBottomBaseStyles();

  return mergeClasses(
    baseStyles[position],
    position === 'bottom' && bottomBaseStyles[size],
    position !== 'bottom' && baseStyles[size],
  );
};

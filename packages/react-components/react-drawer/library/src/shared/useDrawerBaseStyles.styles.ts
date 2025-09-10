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
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
};

/**
 * Shared dynamic styles for the Drawer component
 */
const useDrawerStyles = makeStyles({
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

export const useDrawerBaseClassNames = ({ position, size }: DrawerBaseState): string => {
  const baseStyles = useDrawerStyles();
  const bottomBaseStyles = useDrawerBottomBaseStyles();

  return mergeClasses(
    baseStyles[position],
    position === 'bottom' && bottomBaseStyles[size],
    position !== 'bottom' && baseStyles[size],
  );
};

import { type GriffelResetStyle, makeStyles, mergeClasses } from '@griffel/react';
import { DrawerBaseState } from './DrawerBase.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
  backgroundColor: semanticTokens.backgroundFlyoutSolid,
  color: semanticTokens.foregroundContentNeutralPrimary,
};

/**
 * Shared dynamic styles for the Drawer component
 */
const useDrawerStyles = makeStyles({
  /* Positioning */
  start: {
    borderRight: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.nullColor}`,

    left: 0,
    right: 'auto',
    borderEndEndRadius: semanticTokens.cornerFlyoutRest,
    borderStartEndRadius: semanticTokens.cornerFlyoutRest,
  },
  end: {
    borderLeft: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.nullColor}`,

    right: 0,
    left: 'auto',
    borderStartStartRadius: semanticTokens.cornerFlyoutRest,
    borderEndStartRadius: semanticTokens.cornerFlyoutRest,
  },
  bottom: {
    bottom: 0,
    top: 'auto',
    borderTopRightRadius: semanticTokens.cornerFlyoutRest,
    borderTopLeftRadius: semanticTokens.cornerFlyoutRest,
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

export const useDrawerBaseClassNames = ({ position, size }: DrawerBaseState) => {
  const baseStyles = useDrawerStyles();
  const bottomBaseStyles = useDrawerBottomBaseStyles();

  return mergeClasses(
    baseStyles[position],
    position === 'bottom' && bottomBaseStyles[size],
    position !== 'bottom' && baseStyles[size],
  );
};

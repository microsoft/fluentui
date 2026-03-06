import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { MenuButtonState } from '@fluentui/react-components';
import { useCapButtonStyles } from './useCapButtonStyles';

const useMenuIconStyles = makeStyles({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  small: {
    fontSize: tokens.fontSizeBase200,
    height: '16px',
    width: '16px',
  },
  medium: {
    fontSize: tokens.fontSizeBase400,
    height: '20px',
    lineHeight: tokens.lineHeightBase400,
    width: '20px',
  },
  large: {
    fontSize: tokens.fontSizeBase400,
    height: '20px',
    lineHeight: tokens.lineHeightBase400,
    width: '20px',
  },

  notIconOnly: {
    marginLeft: tokens.spacingHorizontalSNudge,
  },
});

export const useCapMenuButtonStyles = (state: MenuButtonState): void => {
  // Apply base button CAP overrides (borderRadius, colors, sizes, etc.)
  useCapButtonStyles({ ...state, iconPosition: 'before' });

  const menuIconStyles = useMenuIconStyles();

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      state.menuIcon.className,
      menuIconStyles.base,
      menuIconStyles[state.size],
      !state.iconOnly && menuIconStyles.notIconOnly,
    );
  }
};

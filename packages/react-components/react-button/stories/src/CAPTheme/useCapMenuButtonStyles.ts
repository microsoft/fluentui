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
    lineHeight: tokens.lineHeightBase200,
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

  noIconOnly: {
    marginLeft: tokens.spacingHorizontalSNudge,
  },
});

export const useCapMenuButtonStyles = (state: MenuButtonState): MenuButtonState => {
  const menuIconStyles = useMenuIconStyles();

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      state.menuIcon.className,
      menuIconStyles.base,
      menuIconStyles[state.size],
      !state.iconOnly && menuIconStyles.noIconOnly,
    );
  }

  useCapButtonStyles({ ...state, iconPosition: 'before' });
  return state;
};

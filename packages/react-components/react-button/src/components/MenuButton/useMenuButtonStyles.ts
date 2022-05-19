import { mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useButtonStyles_unstable } from '../Button/useButtonStyles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuButtonSlots, MenuButtonState } from './MenuButton.types';

export const menuButtonClassNames: SlotClassNames<MenuButtonSlots> = {
  root: 'fui-MenuButton',
  icon: 'fui-MenuButton__icon',
  menuIcon: 'fui-MenuButton__menuIcon',
};

/**
 * @deprecated Use `menuButtonClassName.root` instead.
 */
export const menuButtonClassName = menuButtonClassNames.root;

const useMenuIconStyles = makeStyles({
  base: {
    lineHeight: 0,
  },

  // Size appearance
  small: {
    fontSize: '12px',
    height: '12px',
    lineHeight: tokens.lineHeightBase200,
    width: '12px',
  },
  medium: {
    fontSize: '12px',
    height: '12px',
    lineHeight: tokens.lineHeightBase200,
    width: '12px',
  },
  large: {
    fontSize: '16px',
    height: '16px',
    lineHeight: tokens.lineHeightBase400,
    width: '16px',
  },

  // Not-icon only
  notIconOnly: {
    marginLeft: tokens.spacingHorizontalXS,
  },
});

export const useMenuButtonStyles_unstable = (state: MenuButtonState): MenuButtonState => {
  const menuIconStyles = useMenuIconStyles();

  state.root.className = mergeClasses(menuButtonClassNames.root, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(menuButtonClassNames.icon, state.icon.className);
  }

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      menuButtonClassNames.menuIcon,
      menuIconStyles.base,
      menuIconStyles[state.size],
      !state.iconOnly && menuIconStyles.notIconOnly,
      state.menuIcon.className,
    );
  }

  useButtonStyles_unstable({ ...state, iconPosition: 'before' });

  return state;
};

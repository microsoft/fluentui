import { mergeClasses, makeStyles } from '@griffel/react';
import { ButtonState } from '../Button/Button.types';
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
  // Size appearance
  small: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  medium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
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
      menuIconStyles[state.size],
      state.menuIcon.className,
    );
  }

  useButtonStyles_unstable(state as ButtonState);

  return state;
};

import { mergeClasses, makeStyles } from '@griffel/react';
import { ButtonState } from '../Button/Button.types';
import { useButtonStyles_unstable } from '../Button/useButtonStyles';
import type { MenuButtonState } from './MenuButton.types';

export const menuButtonClassName = 'fui-MenuButton';

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

  state.root.className = mergeClasses(menuButtonClassName, state.root.className);

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(menuIconStyles[state.size], state.menuIcon.className);
  }

  useButtonStyles_unstable(state as ButtonState);

  return state;
};

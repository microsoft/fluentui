import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { ButtonState } from '../Button';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { MenuButtonState } from './MenuButton.types';

const useMenuIconStyles = makeStyles({
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

export const useMenuButtonStyles = (state: MenuButtonState): MenuButtonState => {
  const menuIconStyles = useMenuIconStyles();
  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(menuIconStyles[state.size], state.menuIcon.className);
  }

  useButtonStyles(state as ButtonState);

  return state;
};

import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { useButtonStyles } from '../Button/useButtonStyles';
import { MenuButtonState } from './MenuButton.types';

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

  state.menuIcon.className = mergeClasses(menuIconStyles[state.size], state.menuIcon.className);

  useButtonStyles(state);

  return state;
};

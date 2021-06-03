import { MenuButtonState } from './MenuButton.types';
import { useButtonState } from '../Button/useButtonState';

export const useMenuButtonState = (state: MenuButtonState): MenuButtonState => {
  // It behaves like a button.
  useButtonState(state);

  return state;
};

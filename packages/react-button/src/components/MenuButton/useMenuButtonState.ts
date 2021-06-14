import { useButtonState } from '../Button/useButtonState';
import { MenuButtonState } from './MenuButton.types';

export const useMenuButtonState = (state: MenuButtonState): MenuButtonState => {
  // It behaves like a button.
  useButtonState(state);

  return state;
};

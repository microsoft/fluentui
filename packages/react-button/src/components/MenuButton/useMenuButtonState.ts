import { MenuButtonState } from './MenuButton.types';
import { useButtonState } from '../Button/useButtonState';
import { useExpanded } from './useExpanded';

export const useMenuButtonState = (state: MenuButtonState) => {
  // It behaves like a button.
  useButtonState(state);

  // It can be expanded.
  useExpanded(state);
};

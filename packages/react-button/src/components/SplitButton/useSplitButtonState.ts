import { SplitButtonState } from './SplitButton.types';
import { useButtonState } from '../Button/useButtonState';
import { useExpanded } from '../MenuButton/useExpanded';

export const useSplitButtonState = (state: SplitButtonState) => {
  // It behaves like a button.
  useButtonState(state);
  const onButtonClick = state.onClick;

  // It can be expanded.
  useExpanded(state);
  const { button, expanded, menuButton, onClick: onMenuButtonClick, onKeyDown } = state;

  state.button = {
    ...button,
    onClick: onButtonClick,
    onKeyDown: onKeyDown,
    tabIndex: -1,
  };

  state.menuButton = {
    ...menuButton,
    'aria-expanded': expanded,
    onClick: onMenuButtonClick,
    onKeyDown: state.onKeyDown,
    tabIndex: -1,
  };
};

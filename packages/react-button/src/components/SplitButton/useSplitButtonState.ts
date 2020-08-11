import { SplitButtonState } from './SplitButton.types';
import { useButtonState } from '../Button/useButtonState';
import { useExpanded } from '../MenuButton/useExpanded';

export const useSplitButtonState = (state: SplitButtonState) => {
  // It behaves like a button.
  useButtonState(state);
  const onButtonClick = state.onClick;

  // It can be expanded.
  useExpanded(state);

  const { expanded, onClick: onMenuButtonClick, onKeyDown } = state;

  state.onClick = onButtonClick;

  state.button.onClick = onButtonClick;
  state.button.onKeyDown = onKeyDown;

  state.menuButton['aria-expanded'] = expanded;
  state.menuButton['aria-haspopup'] = true;
  state.menuButton.onClick = onMenuButtonClick;
  state.menuButton.onKeyDown = onKeyDown;
};

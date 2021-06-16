import { ButtonState } from './Button.types';
import { useARIAButton } from '@fluentui/react-aria';

/**
 * The useButton hook processes the Button draft state.
 * @param state - Button draft state to mutate.
 */
export const useButtonState = (state: ButtonState): ButtonState => {
  const { children, icon } = state;

  const receivedChildren = !!children?.children;
  const receivedIcon = !!icon?.children;
  state.iconOnly = receivedIcon && !receivedChildren;

  useARIAButton(state);

  return state;
};

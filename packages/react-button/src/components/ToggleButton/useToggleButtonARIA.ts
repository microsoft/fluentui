import * as React from 'react';
import { ButtonState, ButtonProps } from '../Button';
import { useButtonARIA } from '../Button/useButtonAria';

/**
 * Modifies state to include aria props and keyboard navigation handlers.
 * @param state - Computed state for ToggleButtonState.
 * @param props - User provided props to the ToggleButtonState component.
 * @param ref - User provided ref to be passed to the ToggleButtonState component.
 */
export const useToggleButtonARIA = (
  state: ButtonState,
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  useButtonARIA(state, props, ref);
};

import * as React from 'react';
import { ButtonState, ButtonProps } from '../Button';
import { useButtonARIA } from '../Button/useButtonAria';

/**
 * Modifies state to include aria props and keyboard navigation handlers.
 * @param state - Computed state for CompoundButtonState.
 * @param props - User provided props to the CompoundButtonState component.
 * @param ref - User provided ref to be passed to the CompoundButtonState component.
 */
export const useCompoundButtonARIA = (
  state: ButtonState,
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  useButtonARIA(state, props, ref);
};

import * as React from 'react';
import { useButtonARIA } from '../Button/useButtonAria';
import type { MenuButtonState, MenuButtonProps, ButtonState } from '@fluentui/react-button';

/**
 * Modifies state to include aria props and keyboard navigation handlers.
 * @param state - Computed state for MenuButtonState.
 * @param props - User provided props to the MenuButtonState component.
 * @param ref - User provided ref to be passed to the MenuButtonState component.
 */
export const useMenuButtonARIA = (
  state: MenuButtonState,
  props: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  // HEADS UP!
  // ButtonState requires an iconPosition but MenuButton doesn't define it.
  //
  // We can't do { ...state, iconPosition } because we break object references and
  // the popover menu becomes misaligned with the menu button.
  const buttonState = state as ButtonState;
  buttonState.iconPosition = 'before';

  useButtonARIA(buttonState, props, ref);
};

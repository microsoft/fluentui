import * as React from 'react';
import { useButtonARIA } from '../Button/useButtonAria';
import type { MenuButtonState, MenuButtonProps } from '@fluentui/react-button';

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
  // state: ButtonState requires an iconPosition even though MenuButton doesn't need it
  useButtonARIA({ ...state, iconPosition: 'before' }, props, ref);
};

import * as React from 'react';
import { getCode, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import type { LinkState } from './Link.types';

/**
 * The useLink hook processes the Link draft state.root.
 * @param state - Link draft state to mutate.
 */
export const useLinkState = (state: LinkState): LinkState => {
  const { disabled, disabledFocusable } = state;
  const { onClick, onKeyDown, role, type } = state.root;

  // Add href and tabIndex=0 for anchor elements.
  if (state.root.as === 'a') {
    state.root.href = disabled ? undefined : state.root.href;
    state.root.tabIndex = disabled && !disabledFocusable ? undefined : 0;
  }
  // Add 'role=link' and 'type=button' for button elements.
  else {
    state.root.role = role || 'link';
    state.root.type = type || 'button';
  }

  // Disallow click event when component is disabled and eat events when disabledFocusable is set to true.
  state.root.onClick = (ev: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || disabledFocusable) {
      ev.preventDefault();
    } else {
      onClick?.(ev);
    }
  };

  // Disallow keydown event when component is disabled and eat events when disabledFocusable is set to true.
  state.root.onKeyDown = (ev: React.KeyboardEvent<HTMLAnchorElement> & React.KeyboardEvent<HTMLButtonElement>) => {
    const keyCode = getCode(ev);
    if ((disabled || disabledFocusable) && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onKeyDown?.(ev);
    }
  };

  // Set the aria-disabled and disabled props correctly.
  state.root['aria-disabled'] = disabled || disabledFocusable;
  if (state.root.as === 'button') {
    state.root.disabled = disabled && !disabledFocusable;
  }

  return state;
};

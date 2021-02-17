import * as React from 'react';
import { getCode, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { LinkState } from './Link.types';

/**
 * The useLink hook processes the Link draft state.
 * @param state - Link draft state to mutate.
 */
export const useLinkState = (state: LinkState) => {
  const { as, disabled, disabledFocusable, href, onClick, onKeyDown: onKeyDownCallback, type } = state;

  state.onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    if (disabled) {
      ev.preventDefault();
    } else {
      onClick?.(ev);
    }
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    const keyCode = getCode(ev);
    const isEnterOrSpaceKey = keyCode === EnterKey || keyCode === SpacebarKey;
    if (disabled && isEnterOrSpaceKey) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onKeyDownCallback?.(ev);

      if (onClick && isEnterOrSpaceKey) {
        onClick((ev as unknown) as React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>);
      }
    }
  };

  // Adjust props depending on the root type.
  if (typeof as === 'string') {
    if (as === 'a') {
      state.href = disabled ? undefined : href;
      state.tabIndex = disabled && !disabledFocusable ? undefined : 0;
    } else {
      // Remove the href, rel and target props for all non-anchor elements.
      state.href = undefined;
      state.rel = undefined;
      state.target = undefined;

      // Add the type="button" prop for button elements
      if (as === 'button') {
        state.type = type ? type : 'button';
      }
      // Add keydown event handler for all other elements
      else {
        state.onKeyDown = onKeyDown;
      }
    }
  }
  // Add keydown event handler for all other elements
  else {
    state.onKeyDown = onKeyDown;
  }

  // Add aria attributes
  state['aria-disabled'] = disabled || disabledFocusable;
  state.disabled = as === 'a' || as === 'button' ? disabled && !disabledFocusable : undefined;
};

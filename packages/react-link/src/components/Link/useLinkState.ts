import * as React from 'react';
import { getCode, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { LinkState } from './Link.types';

/**
 * The useLink hook processes the Link draft state.
 * @param state - Link draft state to mutate.
 */
export const useLinkState = (state: LinkState): LinkState => {
  const { as, disabled, disabledFocusable, href, onClick, onKeyDown: onKeyDownCallback, type } = state;

  const onNonAnchorOrButtonKeyDown = (ev: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    onKeyDownCallback?.(ev);

    const keyCode = getCode(ev);
    if (!ev.defaultPrevented && onClick && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      // Translate the keydown enter/space to a click.
      ev.preventDefault();
      ev.stopPropagation();

      onClick((ev as unknown) as React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>);
    }
  };

  // Adjust props depending on the root type.
  if (typeof as === 'string') {
    if (as === 'a') {
      state.href = disabled ? undefined : href;
      state.tabIndex = disabled && !disabledFocusable ? undefined : 0;
    }
    // Remove the href, rel and target props for all non-anchor elements.
    else {
      state.href = undefined;
      state.rel = undefined;
      state.target = undefined;

      // Add 'role=link' for all non-anchor elements.
      state.role = 'link';

      // Add the type="button" prop for button elements.
      if (as === 'button') {
        state.type = type ? type : 'button';
      }
      // Add keydown event handler and 'tabIndex=0' for all other elements.
      else {
        state.onKeyDown = onNonAnchorOrButtonKeyDown;
        state.tabIndex = disabled && !disabledFocusable ? undefined : 0;
      }
    }
  }
  // Add keydown event handler, 'role=link' and 'tabIndex=0' for all other elements.
  else {
    state.onKeyDown = onNonAnchorOrButtonKeyDown;
    state.role = 'link';
    state.tabIndex = disabled && !disabledFocusable ? undefined : 0;
  }

  // Disallow click event when component is disabled and eat events when disabledFocusable is set to true.
  state.onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    if (disabled) {
      ev.preventDefault();
    } else {
      onClick?.(ev);
    }
  };

  // Disallow keydown event when component is disabled and eat events when disabledFocusable is set to true.
  const { onKeyDown } = state;
  state.onKeyDown = (ev: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    const keyCode = getCode(ev);
    if (disabled && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onKeyDown?.(ev);
    }
  };

  // Set the aria-disabled and disabled props correctly.
  state['aria-disabled'] = disabled || disabledFocusable;
  state.disabled = as === 'button' ? disabled && !disabledFocusable : undefined;

  return state;
};

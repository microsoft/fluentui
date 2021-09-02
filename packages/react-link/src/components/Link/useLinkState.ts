import * as React from 'react';
import { getCode, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import type { LinkState } from './Link.types';

/**
 * The useLink hook processes the Link draft state.root.
 * @param state - Link draft state to mutate.
 */
export const useLinkState = (state: LinkState): LinkState => {
  const { disabled, disabledFocusable } = state;
  const { href, onClick, onKeyDown: onKeyDownCallback, type } = state.root;
  const as = state.components?.root;

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
      state.root;
      state.root.href = disabled ? undefined : href;
      state.root.tabIndex = disabled && !disabledFocusable ? undefined : 0;
    }
    // Remove the href, rel and target props for all non-anchor elements.
    else {
      state.root.href = undefined;
      state.root.rel = undefined;
      state.root.target = undefined;

      // Add 'role=link' for all non-anchor elements.
      state.root.role = 'link';

      // Add the type="button" prop for button elements.
      if (as === 'button') {
        state.root.type = type ? type : 'button';
      }
      // Add keydown event handler and 'tabIndex=0' for all other elements.
      else {
        state.root.onKeyDown = onNonAnchorOrButtonKeyDown;
        state.root.tabIndex = disabled && !disabledFocusable ? undefined : 0;
      }
    }
  }
  // Add keydown event handler, 'role=link' and 'tabIndex=0' for all other elements.
  else {
    state.root.onKeyDown = onNonAnchorOrButtonKeyDown;
    state.root.role = 'link';
    state.root.tabIndex = disabled && !disabledFocusable ? undefined : 0;
  }

  // Disallow click event when component is disabled and eat events when disabledFocusable is set to true.
  state.root.onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    if (disabled || disabledFocusable) {
      ev.preventDefault();
    } else {
      onClick?.(ev);
    }
  };

  // Disallow keydown event when component is disabled and eat events when disabledFocusable is set to true.
  const { onKeyDown } = state;
  state.root.onKeyDown = (ev: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    const keyCode = getCode(ev);
    if ((disabled || disabledFocusable) && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onKeyDown?.(ev);
    }
  };

  // Set the aria-disabled and disabled props correctly.
  state['aria-disabled'] = disabled || disabledFocusable;
  state.root.disabled = as === 'button' ? disabled && !disabledFocusable : undefined;

  return state;
};

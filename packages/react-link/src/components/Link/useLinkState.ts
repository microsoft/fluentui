import * as React from 'react';
import { LinkState } from './Link.types';

/**
 * The useLink hook processes the Link draft state.
 * @param state - Link draft state to mutate.
 */
export const useLinkState = (state: LinkState) => {
  const { as, disabled, disabledFocusable, href, onClick, type } = state;

  state.onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    if (disabled) {
      ev.preventDefault();
    } else {
      onClick?.(ev);
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
    }
  }
  // Add aria attributes
  state['aria-disabled'] = disabled || disabledFocusable;
  state.disabled = as === 'a' || as === 'button' ? disabled && !disabledFocusable : undefined;
};

import * as React from 'react';
import { LinkState } from './Link.types';

/**
 * The useLink hook processes the Link draft state.
 * @param draftState - Link draft state to mutate.
 */
export const useLinkState = (draftState: LinkState) => {
  const { as, disabled, disabledFocusable, href, onClick, type } = draftState;

  draftState.onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => {
    if (disabled) {
      ev.preventDefault();
    } else {
      onClick?.(ev);
    }
  };

  // Adjust props depending on the root type.
  if (typeof as === 'string') {
    if (as === 'a') {
      draftState.href = disabled ? undefined : href;
      draftState.tabIndex = disabled && !disabledFocusable ? undefined : 0;
    } else {
      // Remove the href, rel and target props for all non-anchor elements.
      draftState.href = undefined;
      draftState.rel = undefined;
      draftState.target = undefined;

      // Add the type="button" prop for button elements
      if (as === 'button') {
        draftState.type = type ? type : 'button';
      }
    }
  }
  // Add aria attributes
  draftState['aria-disabled'] = disabled || disabledFocusable;
  draftState.disabled = as === 'a' || as === 'button' ? disabled && !disabledFocusable : undefined;
};

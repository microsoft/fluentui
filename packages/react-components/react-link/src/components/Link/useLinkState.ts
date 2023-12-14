import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import type { LinkState } from './Link.types';

/**
 * The useLinkState_unstable hook processes the Link state.
 * @param state - Link state to mutate.
 */
export const useLinkState_unstable = (state: LinkState): LinkState => {
  const { disabled, disabledFocusable } = state;
  const { onClick, onKeyDown, role, tabIndex } = state.root;

  // Add href for anchor elements.
  if (state.root.as === 'a') {
    state.root.href = disabled ? undefined : state.root.href;

    // Add role="link" for disabled and disabledFocusable links.
    if (disabled || disabledFocusable) {
      state.root.role = role || 'link';
    }
  }

  // Add tabIndex=0 for anchor and span elements.
  if (state.root.as === 'a' || state.root.as === 'span') {
    state.root.tabIndex = tabIndex ?? (disabled && !disabledFocusable ? undefined : 0);
  }

  // Disallow click event when component is disabled and eat events when disabledFocusable is set to true.
  state.root.onClick = (ev: React.MouseEvent<HTMLAnchorElement & HTMLButtonElement>) => {
    if (disabled || disabledFocusable) {
      ev.preventDefault();
    } else {
      onClick?.(ev);
    }
  };

  // Disallow keydown event when component is disabled and eat events when disabledFocusable is set to true.
  state.root.onKeyDown = (ev: React.KeyboardEvent<HTMLAnchorElement & HTMLButtonElement>) => {
    if ((disabled || disabledFocusable) && (ev.key === Enter || ev.key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onKeyDown?.(ev);
    }
  };

  // Set the aria-disabled and disabled props correctly.
  state.disabled = disabled || disabledFocusable;
  state.root['aria-disabled'] = disabled || disabledFocusable || undefined;
  if (state.root.as === 'button') {
    state.root.disabled = disabled && !disabledFocusable;
  }

  return state;
};

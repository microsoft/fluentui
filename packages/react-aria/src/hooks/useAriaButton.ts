import * as React from 'react';
import { ObjectShorthandProps, useEventCallback } from '@fluentui/react-utilities';

export function useARIAButton(shorthand: ObjectShorthandProps<React.ButtonHTMLAttributes<HTMLElement>>) {
  if (!shorthand.hasOwnProperty('as')) {
    shorthand.as = 'button';
  }
  if (!shorthand.hasOwnProperty('children')) {
    shorthand.children = null;
  }

  const { onClick, onKeyDown, onKeyUp, as, disabled } = shorthand;

  const onClickHandler = useEventCallback((ev: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      ev.preventDefault();
    } else {
      onClick?.(ev);
    }
  });

  const onKeyDownHandler = useEventCallback((ev: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(ev);
    if (ev.isDefaultPrevented()) {
      return;
    }
    if (disabled && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (ev.key === ' ') {
      ev.preventDefault();
    }
    // If enter is pressed, activate the button
    else if (ev.key === 'Enter') {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  const onKeyupHandler = useEventCallback((ev: React.KeyboardEvent<HTMLElement>) => {
    onKeyUp?.(ev);
    if (ev.isDefaultPrevented()) {
      return;
    }
    if (disabled && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (ev.key === ' ') {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  /**
   * TODO: Ideally this is unnecessary after implementation of as-prop RFC.
   * The way to go is to have an assertion method to ensure types,
   * in the case of button we'd like to limit it for: button, div, span, a
   */
  if (typeof as === 'string') {
    // Add 'role=button' and 'tabIndex=0' for all non-button elements.
    if (as !== 'button') {
      if (!shorthand.hasOwnProperty('role')) {
        shorthand.role = 'button';
      }

      shorthand.onClick = onClickHandler;

      // Add keydown event handler for all other non-anchor elements.
      if (as !== 'a') {
        if (!shorthand.hasOwnProperty('tabIndex')) {
          shorthand.tabIndex = disabled ? undefined : 0;
        }
        shorthand.onKeyDown = onKeyDownHandler;
        shorthand.onKeyUp = onKeyupHandler;
      }
    }
  }
  // Add keydown event handler, 'role=button' and 'tabIndex=0' for all other elements.
  else {
    shorthand.onClick = onClickHandler;
    shorthand.onKeyDown = onKeyDownHandler;
    shorthand.onKeyUp = onKeyupHandler;
    if (!shorthand.hasOwnProperty('role')) {
      shorthand.role = 'button';
    }
    if (!shorthand.hasOwnProperty('tabIndex')) {
      shorthand.tabIndex = disabled ? undefined : 0;
    }
  }
}

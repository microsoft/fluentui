import * as React from 'react';
import { ObjectShorthandProps, useEventCallback } from '@fluentui/react-utilities';

/** @internal */
enum KeyboardEventKeys {
  SPACE_BAR = ' ',
  ENTER = 'Enter',
}

export function useARIAButton(shorthand: ObjectShorthandProps<React.ButtonHTMLAttributes<HTMLElement>>) {
  const { onClick, onKeyDown, onKeyUp, disabled } = shorthand;

  const onClickHandler = useEventCallback((ev: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      ev.preventDefault();
    } else {
      if (typeof onClick === 'function') {
        onClick(ev);
      }
    }
  });

  const onKeyDownHandler = useEventCallback((ev: React.KeyboardEvent<HTMLElement>) => {
    if (typeof onKeyDown === 'function') {
      onKeyDown(ev);
    }
    if (ev.isDefaultPrevented()) {
      return;
    }
    if (disabled && (ev.key === KeyboardEventKeys.ENTER || ev.key === KeyboardEventKeys.SPACE_BAR)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (ev.key === KeyboardEventKeys.SPACE_BAR) {
      ev.preventDefault();
      return;
    }
    // If enter is pressed, activate the button
    else if (ev.key === KeyboardEventKeys.ENTER) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  const onKeyupHandler = useEventCallback((ev: React.KeyboardEvent<HTMLElement>) => {
    if (typeof onKeyUp === 'function') {
      onKeyUp(ev);
    }
    if (ev.isDefaultPrevented()) {
      return;
    }
    if (disabled && (ev.key === KeyboardEventKeys.ENTER || ev.key === KeyboardEventKeys.SPACE_BAR)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (ev.key === KeyboardEventKeys.SPACE_BAR) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  if (!shorthand.hasOwnProperty('as') || shorthand.as === 'button') {
    shorthand.as = 'button';
    return; // there's nothing to be done if as prop === 'button'
  }
  if (!shorthand.hasOwnProperty('children')) {
    shorthand.children = null;
  }
  /**
   * TODO: Ideally this is unnecessary after implementation of as-prop RFC.
   * The way to go is to have an assertion method to ensure types,
   * in the case of button we'd like to limit it for: button, div, span, a
   */
  if (typeof shorthand.as === 'string') {
    // Add 'role=button' and 'tabIndex=0' for all non-button elements.
    if (!shorthand.hasOwnProperty('role')) {
      shorthand.role = 'button';
    }

    shorthand.onClick = onClickHandler;

    // Add keydown event handler for all other non-anchor elements.
    if (shorthand.as !== 'a') {
      if (!shorthand.hasOwnProperty('tabIndex')) {
        shorthand.tabIndex = disabled ? undefined : 0;
      }
      shorthand.onKeyDown = onKeyDownHandler;
      shorthand.onKeyUp = onKeyupHandler;
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

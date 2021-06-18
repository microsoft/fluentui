import * as React from 'react';
import { ObjectShorthandProps, useEventCallback } from '@fluentui/react-utilities';
import { getCode, SpacebarKey, EnterKey } from '@fluentui/keyboard-key';

/**
 * button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required
 */
export function useARIAButton(
  shorthand: ObjectShorthandProps<React.ButtonHTMLAttributes<HTMLElement>>,
): ObjectShorthandProps<React.ButtonHTMLAttributes<HTMLElement>> {
  const { onClick, onKeyDown, onKeyUp, disabled: defaultDisabled, ['aria-disabled']: ariaDisabled } = shorthand;
  const disabled = mergeARIADisabled(defaultDisabled ?? ariaDisabled);

  const onClickHandler = useEventCallback((ev: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      if (typeof onClick === 'function') {
        onClick(ev);
      }
    }
  });

  const onKeyDownHandler = useEventCallback((ev: React.KeyboardEvent<HTMLElement>) => {
    const code = getCode(ev);
    if (typeof onKeyDown === 'function') {
      onKeyDown(ev);
    }
    if (ev.isDefaultPrevented()) {
      return;
    }
    if (disabled && (code === EnterKey || code === SpacebarKey)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (code === SpacebarKey) {
      ev.preventDefault();
      return;
    }
    // If enter is pressed, activate the button
    else if (code === EnterKey) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  const onKeyupHandler = useEventCallback((ev: React.KeyboardEvent<HTMLElement>) => {
    const code = getCode(ev);
    if (typeof onKeyUp === 'function') {
      onKeyUp(ev);
    }
    if (ev.isDefaultPrevented()) {
      return;
    }
    if (disabled && (code === EnterKey || code === SpacebarKey)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (code === SpacebarKey) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  if (!shorthand.hasOwnProperty('children')) {
    shorthand.children = null;
  }

  if (!shorthand.hasOwnProperty('as') || shorthand.as === 'button') {
    shorthand.as = 'button';
    return shorthand; // there's nothing to be done if as prop === 'button'
  }

  /**
   * TODO: Ideally this is unnecessary after implementation of as-prop RFC.
   * The way to go is to have an assertion method to ensure types,
   * in the case of button we'd like to limit it for: button, div, span, a
   */
  if (typeof shorthand.as !== 'string') {
    return shorthand;
  }

  if (!shorthand.hasOwnProperty('role')) {
    shorthand.role = 'button';
  }
  if (!shorthand.hasOwnProperty('aria-disabled')) {
    shorthand['aria-disabled'] = disabled;
  }

  shorthand.onClick = onClickHandler;
  shorthand.onKeyDown = onKeyDownHandler;
  shorthand.onKeyUp = onKeyupHandler;

  // Add keydown event handler for all other non-anchor elements.
  if (shorthand.as !== 'a') {
    if (!shorthand.hasOwnProperty('tabIndex')) {
      shorthand.tabIndex = disabled ? undefined : 0;
    }
  }
  return shorthand;
}

function mergeARIADisabled(disabled?: boolean | 'false' | 'true'): boolean {
  if (typeof disabled === 'string') {
    return disabled === 'false' ? false : true;
  }
  return disabled ?? false;
}

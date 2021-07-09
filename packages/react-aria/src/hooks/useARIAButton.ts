import * as React from 'react';
import { ObjectShorthandProps, resolveShorthand, ShorthandProps, useEventCallback } from '@fluentui/react-utilities';
import { EnterKey, getCode, SpacebarKey } from '@fluentui/keyboard-key';

function mergeARIADisabled(disabled?: boolean | 'false' | 'true'): boolean {
  if (typeof disabled === 'string') {
    return disabled === 'false' ? false : true;
  }
  return disabled ?? false;
}

/**
 * button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required
 */
export function useARIAButton<T extends React.ButtonHTMLAttributes<HTMLElement>>(
  value: ShorthandProps<T>,
  defaultProps?: T,
): ObjectShorthandProps<T> {
  const shorthand = resolveShorthand(value, defaultProps);

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

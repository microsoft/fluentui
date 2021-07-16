import * as React from 'react';
import { ObjectShorthandProps, resolveShorthand, ShorthandProps, useEventCallback } from '@fluentui/react-utilities';
import { EnterKey, getCode, SpacebarKey } from '@fluentui/keyboard-key';

function mergeARIADisabled(disabled?: boolean | 'false' | 'true'): boolean {
  if (typeof disabled === 'string') {
    return disabled === 'false' ? false : true;
  }
  return disabled ?? false;
}

export type ARIAButtonAsButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
export type ARIAButtonAsElementProps = React.HTMLAttributes<HTMLElement> & { as: 'div' | 'span' };
export type ARIAButtonAsAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

export type ARIAButtonProps = ARIAButtonAsButtonProps | ARIAButtonAsElementProps | ARIAButtonAsAnchorProps;

/**
 * button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required
 */
export function useARIAButton(
  value: ShorthandProps<ARIAButtonProps>,
  defaultProps?: ARIAButtonProps,
): ObjectShorthandProps<ARIAButtonProps> {
  const shorthand = resolveShorthand(value, defaultProps);

  const { onClick, onKeyDown, onKeyUp, ['aria-disabled']: ariaDisabled } = shorthand;

  const disabled = mergeARIADisabled((shorthand.as === 'button' ? shorthand.disabled : undefined) ?? ariaDisabled);

  const onClickHandler: ARIAButtonProps['onClick'] = useEventCallback(ev => {
    if (disabled) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      if (typeof onClick === 'function') {
        onClick(ev);
      }
    }
  });

  const onKeyDownHandler: ARIAButtonProps['onKeyDown'] = useEventCallback(ev => {
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

  const onKeyupHandler: ARIAButtonProps['onKeyUp'] = useEventCallback(ev => {
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

  if (shorthand.as === 'button' || shorthand.as === undefined) {
    return shorthand; // there's nothing to be done if as prop === 'button' or undefined
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

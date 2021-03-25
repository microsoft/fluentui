import * as React from 'react';
import { getCode, SpacebarKey, EnterKey } from '@fluentui/keyboard-key';

export interface UseOverrideNativeKeyboardClickOptions {
  /**
   * Callback called before click
   */
  beforeClick?: () => void;
  /**
   * Callback called after click
   */
  afterClick?: () => void;
}

export interface UseOverrideNativeKeyboardClickReturnValue {
  /**
   * Keydown handler, returns boolean if native click is handled
   */
  onOverrideClickKeyDown: (e: React.KeyboardEvent) => boolean;
  /**
   * Keyup handler, returns boolean if native click is handled
   */
  onOverrideClickKeyUp: (e: React.KeyboardEvent) => boolean;
}

/**
 * Returns onKeyDown and onKeyUp handlers that will override native click mapping to Space and Enter keys
 * Useful when the element that you are dealing with is not guaranteed to be native button/anchor element
 *
 * Returns onKeyDown and onKeyup callbacks that must both be used to emulate native behaviour.
 * The callbacks return boolean values indicating whether this is a native click event
 *
 * NOTE: native button will continue to trigger click events if the Enter key is held, this is not supported currently
 */
export const useOverrideNativeKeyboardClick = ({
  beforeClick,
  afterClick,
}: UseOverrideNativeKeyboardClickOptions = {}): UseOverrideNativeKeyboardClickReturnValue => {
  const isKeyboardClickEvent = (e: KeyboardEvent | React.KeyboardEvent) => {
    const code = getCode(e);
    const target: HTMLElement | undefined = e.target as HTMLElement;

    const matchesByKey = code === SpacebarKey || code === EnterKey;

    if (target?.tagName === 'A') {
      return code === SpacebarKey;
    }

    const ignoredByTag =
      target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable === true;

    return matchesByKey && !ignoredByTag;
  };

  const onKeyDown = (e: React.KeyboardEvent): boolean => {
    if (isKeyboardClickEvent(e)) {
      // There is no guarantee that trigger element will/won't be a button
      // Prevent native behaviour that maps these keys to button click and handle them in onKeyUp
      e.preventDefault();
      e.stopPropagation();
      return true;
    }

    return false;
  };

  // Native click events are triggered on keyup
  const onKeyUp = (e: React.KeyboardEvent): boolean => {
    if (isKeyboardClickEvent(e)) {
      beforeClick?.();
      (e.target as HTMLElement).click();
      afterClick?.();
      return true;
    }

    return false;
  };

  return {
    onOverrideClickKeyDown: onKeyDown,
    onOverrideClickKeyUp: onKeyUp,
  };
};

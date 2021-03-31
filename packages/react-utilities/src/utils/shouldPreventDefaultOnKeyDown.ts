import { getCode, SpacebarKey, EnterKey } from '@fluentui/keyboard-key';
import * as React from 'react';

/**
 * Checks if the keyboard event should preventDefault() for Enter and Spacebar keys
 *
 * Useful for situations where a keydown needs to be transformed to a click event
 */
export function shouldPreventDefaultOnKeyDown(e: KeyboardEvent | React.KeyboardEvent) {
  const code = getCode(e);
  const target: HTMLElement | undefined = e.target as HTMLElement;

  const matchesByKey = code === SpacebarKey || code === EnterKey;

  if (target?.tagName === 'A') {
    return code === SpacebarKey;
  }

  const ignoredByTag =
    target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable === true;

  return matchesByKey && !ignoredByTag;
}

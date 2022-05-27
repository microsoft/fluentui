import { Space, Enter } from '@fluentui/keyboard-keys';
import * as React from 'react';

/**
 * Checks if the keyboard event should preventDefault() for Enter and Spacebar keys
 *
 * Useful for situations where a keydown needs to be transformed to a click event
 */
export function shouldPreventDefaultOnKeyDown(e: KeyboardEvent | React.KeyboardEvent) {
  if (e.defaultPrevented) {
    return false;
  }

  const key = e.key;
  const target: HTMLElement | undefined = e.target as HTMLElement;

  const matchesByKey = key === Space || key === Enter;

  if (target?.tagName === 'A') {
    return key === Space;
  }

  const ignoredByTag =
    target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable === true;

  return matchesByKey && !ignoredByTag;
}

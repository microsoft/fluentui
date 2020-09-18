import { getCode, SpacebarKey, EnterKey } from '@fluentui/keyboard-key';
import * as React from 'react';

/**
 * Checks if `preventDefault()` should be called for a passed keyboard event.
 */
export function shouldPreventDefaultOnKeyDown(e: KeyboardEvent | React.KeyboardEvent) {
  const code = getCode(e);
  const target: HTMLElement | undefined = e.target as HTMLElement;

  const matchesByKey = code === SpacebarKey || code === EnterKey;
  const ignoredByTag =
    target?.tagName === 'INPUT' ||
    target?.tagName === 'TEXTAREA' ||
    target?.isContentEditable === true ||
    (target?.tagName === 'A' && code !== SpacebarKey);

  return matchesByKey && !ignoredByTag;
}

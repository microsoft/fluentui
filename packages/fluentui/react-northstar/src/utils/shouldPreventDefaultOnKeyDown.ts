import { getCode, SpacebarKey, EnterKey } from '@fluentui/keyboard-key';
import * as React from 'react';

/**
 * Checks if `preventDefault()` should be called for a passed keyboard event.
 */
export function shouldPreventDefaultOnKeyDown(e: React.KeyboardEvent) {
  const code = getCode(e);
  const target = e.target as HTMLElement;

  const matchesByKey = code === SpacebarKey || code === EnterKey;
  const ignoredByTag = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable === true;

  return matchesByKey && !ignoredByTag;
}

'use client';

import * as React from 'react';
import { FOCUSABLE_GROUP_ATTRIBUTE, FOCUSABLE_GROUP_IGNORE_ATTRIBUTE, useFocusManager } from './focusManager';

export interface UseFocusableGroupOptions {
  /**
   * Behavior for the Tab key.
   * - `unlimited`: the content of the group is part of the Tab sequence.
   * - `limited`: Tab skips the content of the group until it is entered with Enter; once entered, Tab moves
   *   through the content and leaves the group after the last element.
   * - `limited-trap-focus`: like `limited`, but once entered, Tab cycles inside the group until Escape.
   *
   * In every mode Enter on the group moves focus inside and Escape moves focus back to the group.
   * The group element must be focusable (e.g. `tabIndex={0}`) for Escape and the limited modes to work.
   *
   * @default unlimited
   */
  tabBehavior?: 'unlimited' | 'limited' | 'limited-trap-focus';

  /**
   * Keys the group must not handle, e.g. to keep Escape for dismissing a toast.
   */
  ignoreDefaultKeydown?: Partial<Record<'Tab' | 'Enter' | 'Escape', boolean>>;
}

export type FocusableGroupAttributes = {
  [FOCUSABLE_GROUP_ATTRIBUTE]: NonNullable<UseFocusableGroupOptions['tabBehavior']>;
  [FOCUSABLE_GROUP_IGNORE_ATTRIBUTE]?: string;
};

/**
 * Returns the DOM attributes that turn an element into a focusable group: Enter moves focus into the group,
 * Escape moves it back to the group, and `tabBehavior` controls how Tab treats the group's content.
 *
 * @param options - Options to configure keyboard navigation
 */
export const useFocusableGroup = (options: UseFocusableGroupOptions = {}): FocusableGroupAttributes => {
  const { tabBehavior = 'unlimited', ignoreDefaultKeydown } = options;
  useFocusManager();

  const ignoredKeys = ignoreDefaultKeydown
    ? (['Tab', 'Enter', 'Escape'] as const).filter(key => ignoreDefaultKeydown[key]).join(' ')
    : '';

  return React.useMemo(
    () => ({
      [FOCUSABLE_GROUP_ATTRIBUTE]: tabBehavior,
      ...(ignoredKeys && { [FOCUSABLE_GROUP_IGNORE_ATTRIBUTE]: ignoredKeys }),
    }),
    [tabBehavior, ignoredKeys],
  );
};

'use client';

import { GroupperTabbabilities } from 'tabster/lite/groupper';
import type { TabsterDOMAttribute } from './useTabsterAttributes';
import { useTabsterAttributes } from './useTabsterAttributes';

export interface UseFocusableGroupOptions {
  /**
   * Behavior for the Tab key.
   */
  tabBehavior?: 'unlimited' | 'limited' | 'limited-trap-focus';

  /**
   * Tabster should ignore default handling of keydown events.
   */
  ignoreDefaultKeydown?: Record<string, boolean>;
}

/**
 * A hook that returns the necessary tabster attributes to support groupping.
 * @param options - Options to configure keyboard navigation
 */
export const useFocusableGroup = (options?: UseFocusableGroupOptions): TabsterDOMAttribute => {
  return useTabsterAttributes({
    groupper: {
      tabbability: getTabbability(options?.tabBehavior),
    },
    ...(options?.ignoreDefaultKeydown ? { focusable: { ignoreKeydown: options.ignoreDefaultKeydown } } : {}),
  });
};

const getTabbability = (tabBehavior?: UseFocusableGroupOptions['tabBehavior']): number | undefined => {
  switch (tabBehavior) {
    case 'unlimited':
      return GroupperTabbabilities.Unlimited;
    case 'limited':
      return GroupperTabbabilities.Limited;
    case 'limited-trap-focus':
      return GroupperTabbabilities.LimitedTrapFocus;
    default:
      return undefined;
  }
};

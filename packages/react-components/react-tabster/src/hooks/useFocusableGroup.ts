'use client';

import { type TabsterDOMAttribute } from '../focus-navigation/types';
import { useTabsterAttributes } from './useTabsterAttributes';

export interface UseFocusableGroupOptions {
  /**
   * Behavior for the Tab key.
   */
  tabBehavior?: 'unlimited' | 'limited' | 'limited-trap-focus';

  /**
   * Navigation manager can ignore default handling of keydown events
   */
  ignoreDefaultKeydown?: Record<string, boolean>;
}

/**
 * A hook that returns the necessary attributes to support focus grouping.
 * @param options - Options to configure keyboard navigation
 */
export const useFocusableGroup = (options?: UseFocusableGroupOptions): TabsterDOMAttribute => {
  return useTabsterAttributes({
    groupper: {
      tabbability: toGroupperTabbability(options?.tabBehavior),
    },
    focusable: {
      ignoreKeydown: options?.ignoreDefaultKeydown,
    },
  });
};

function toGroupperTabbability(
  tabBehavior: UseFocusableGroupOptions['tabBehavior'],
): 'unlimited' | 'limited' | 'limited-trap' | undefined {
  switch (tabBehavior) {
    case 'unlimited':
      return 'unlimited';
    case 'limited':
      return 'limited';
    case 'limited-trap-focus':
      return 'limited-trap';
    default:
      return undefined;
  }
}

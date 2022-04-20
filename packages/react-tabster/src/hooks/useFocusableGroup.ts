import { Types, getGroupper } from 'tabster';
import { useTabsterAttributes } from './useTabsterAttributes';
import { useTabster } from './useTabster';

export interface UseFocusableGroupOptions {
  /**
   * Behavior for the Tab key.
   */
  tabBehavior?: 'unlimited' | 'limited' | 'limitedTrapFocus';
}

/**
 * A hook that returns the necessary tabster attributes to support groupping.
 * @param options - Options to configure keyboard navigation
 */
export const useFocusableGroup = (options?: UseFocusableGroupOptions): Types.TabsterDOMAttribute => {
  const tabster = useTabster();

  if (tabster) {
    getGroupper(tabster);
  }

  return useTabsterAttributes({
    groupper: {
      tabbability: getTabbability(options?.tabBehavior),
    },
  });
};

const getTabbability = (
  tabBehavior?: UseFocusableGroupOptions['tabBehavior'],
): Types.GroupperTabbability | undefined => {
  switch (tabBehavior) {
    case 'unlimited':
      return Types.GroupperTabbabilities.Unlimited;
    case 'limited':
      return Types.GroupperTabbabilities.Limited;
    case 'limitedTrapFocus':
      return Types.GroupperTabbabilities.LimitedTrapFocus;
    default:
      return undefined;
  }
};

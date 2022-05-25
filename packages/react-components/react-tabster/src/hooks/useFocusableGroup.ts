import { Types, getGrouper } from 'tabster';
import { useTabsterAttributes } from './useTabsterAttributes';
import { useTabster } from './useTabster';

export interface UseFocusableGroupOptions {
  /**
   * Behavior for the Tab key.
   */
  tabBehavior?: 'unlimited' | 'limited' | 'limited-trap-focus';
}

/**
 * A hook that returns the necessary tabster attributes to support grouping.
 * @param options - Options to configure keyboard navigation
 */
export const useFocusableGroup = (options?: UseFocusableGroupOptions): Types.TabsterDOMAttribute => {
  const tabster = useTabster();

  if (tabster) {
    getGrouper(tabster);
  }

  return useTabsterAttributes({
    grouper: {
      tabbability: getTabbability(options?.tabBehavior),
    },
  });
};

const getTabbability = (
  tabBehavior?: UseFocusableGroupOptions['tabBehavior'],
): Types.GrouperTabbability | undefined => {
  switch (tabBehavior) {
    case 'unlimited':
      return Types.GrouperTabbabilities.Unlimited;
    case 'limited':
      return Types.GrouperTabbabilities.Limited;
    case 'limited-trap-focus':
      return Types.GrouperTabbabilities.LimitedTrapFocus;
    default:
      return undefined;
  }
};

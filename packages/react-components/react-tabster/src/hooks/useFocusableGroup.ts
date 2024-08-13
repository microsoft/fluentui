import { Types, getGroupper, GroupperTabbabilities } from 'tabster';
import { useTabsterAttributes } from './useTabsterAttributes';
import { useTabster } from './useTabster';

export interface UseFocusableGroupOptions {
  /**
   * Behavior for the Tab key.
   */
  tabBehavior?: 'unlimited' | 'limited' | 'limited-trap-focus';

  /**
   * Tabster can ignore default handling of keydown events
   */
  ignoreDefaultKeydown?: Types.FocusableProps['ignoreKeydown'];
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
    focusable: {
      ignoreKeydown: options?.ignoreDefaultKeydown,
    },
  });
};

const getTabbability = (
  tabBehavior?: UseFocusableGroupOptions['tabBehavior'],
): Types.GroupperTabbability | undefined => {
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

import { Types, getGroupper } from 'tabster';
import { useTabsterAttributes } from './useTabsterAttributes';
import { useTabster } from './useTabster';

export enum GroupperTabbability {
  /**
   * Tab will cycle into and out of the groupper content.
   */
  Unlimited = Types.GroupperTabbabilities.Unlimited,
  /**
   * Tab will cycle out of the container, but not into it.
   */
  Limited = Types.GroupperTabbabilities.Limited,
  /**
   * Tab only cycles the inner elements.
   */
  LimitedTrapFocus = Types.GroupperTabbabilities.LimitedTrapFocus,
}

export interface UseFocusableGroupOptions {
  /**
   * Type of TAB key interaction.
   */
  tabbability?: GroupperTabbability;
}

/**
 * A hook that returns the necessary tabster attributes to support groupping.
 * @param options - Options to configure keyboard navigation
 */
export const useFocusableGroup = (options?: UseFocusableGroupOptions) => {
  const tabster = useTabster();

  if (tabster) {
    getGroupper(tabster);
  }

  return useTabsterAttributes({
    groupper: {
      tabbability: options?.tabbability as Types.GroupperTabbability,
    },
  });
};

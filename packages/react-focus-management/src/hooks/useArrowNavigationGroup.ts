import { getAbilityHelpersAttribute, Types as AHTypes } from 'ability-helpers';

export interface UseArrowNavigationGroupOptions {
  /**
   * Focus will cycle to the first/last elements of the group without stopping
   */
  circular?: boolean;
}

/**
 * A hook that returns the necessary ability-helpers attributes to support arrow key navigation
 * @param options - Options to configure keyboard navigation
 */
export const useArrowNavigationGroup = (options: UseArrowNavigationGroupOptions = {}) => {
  const ahOptions = {
    focusable: {
      mover: {
        navigationType: AHTypes.MoverKeys.Arrows,
        cyclic: !!options.circular,
      },
    },
  };

  return getAbilityHelpersAttribute(ahOptions);
};

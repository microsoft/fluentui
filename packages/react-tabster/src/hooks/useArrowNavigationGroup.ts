import { getTabsterAttribute, Types } from 'tabster';

export interface UseArrowNavigationGroupOptions {
  /**
   * Focus will navigate vertically or horizontally, defaults to horizontally
   */
  axis?: 'vertical' | 'horizontal';
  /**
   * Focus will cycle to the first/last elements of the group without stopping
   */
  circular?: boolean;
}

/**
 * A hook that returns the necessary ability-helpers attributes to support arrow key navigation
 * @param options - Options to configure keyboard navigation
 */
export const useArrowNavigationGroup = (options?: UseArrowNavigationGroupOptions) => {
  return getTabsterAttribute({
    focusable: {
      mover: {
        axis: axisToMoverAxis(options?.axis ?? 'horizontal'),
        navigationType: Types.MoverKeys.Arrows,
        cyclic: !!options?.circular,
      },
    },
  });
};

function axisToMoverAxis(axis: UseArrowNavigationGroupOptions['axis']) {
  switch (axis) {
    case 'vertical':
      return Types.MoverAxis.Vertical;
    case 'horizontal':
    default:
      return Types.MoverAxis.Horizontal;
  }
}

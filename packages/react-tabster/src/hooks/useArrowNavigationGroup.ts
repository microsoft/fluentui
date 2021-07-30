import { Types, getMover } from 'tabster';
import { useTabster } from './useTabster';
import { useTabsterAttributes } from './useTabsterAttributes';

export interface UseArrowNavigationGroupOptions {
  /**
   * Focus will navigate vertically or horizontally, defaults to horizontally
   * @defaultValue vertical
   */
  axis?: 'vertical' | 'horizontal';
  /**
   * Focus will cycle to the first/last elements of the group without stopping
   */
  circular?: boolean;
}

/**
 * A hook that returns the necessary tabster attributes to support arrow key navigation
 * @param options - Options to configure keyboard navigation
 */
export const useArrowNavigationGroup = (options?: UseArrowNavigationGroupOptions) => {
  const tabster = useTabster();
  if (tabster) {
    getMover(tabster);
  }
  return useTabsterAttributes({
    mover: {
      cyclic: !!options?.circular,
      direction: axisToMoverDirection(options?.axis ?? 'vertical'),
    },
  });
};

function axisToMoverDirection(axis: UseArrowNavigationGroupOptions['axis']) {
  switch (axis) {
    case 'horizontal':
      return Types.MoverDirections.Horizontal;
    case 'vertical':
    default:
      return Types.MoverDirections.Vertical;
  }
}

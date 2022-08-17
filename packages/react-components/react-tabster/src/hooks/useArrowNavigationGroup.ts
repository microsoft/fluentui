import { Types, getMover } from 'tabster';
import { useTabsterAttributes } from './useTabsterAttributes';
import { useTabster } from './useTabster';

export interface UseArrowNavigationGroupOptions {
  /**
   * Focus will navigate vertically, horizontally or in both directions (grid), defaults to horizontally
   * @defaultValue vertical
   */
  axis?: 'vertical' | 'horizontal' | 'grid';
  /**
   * Focus will cycle to the first/last elements of the group without stopping
   */
  circular?: boolean;
  /**
   * Last focused element in the group will be remembered and focused (if still
   * available) when tabbing from outside of the group
   */
  memorizeCurrent?: boolean;
  /**
   * Allow tabbing within the arrow navigation group items.
   */
  tabbable?: boolean;
  /**
   * Tabster should ignore default handling of keydown events
   */
  ignoreDefaultKeydown?: Types.FocusableProps['ignoreKeydown'];
}

/**
 * A hook that returns the necessary tabster attributes to support arrow key navigation
 * @param options - Options to configure keyboard navigation
 */
export const useArrowNavigationGroup = (options: UseArrowNavigationGroupOptions = {}): Types.TabsterDOMAttribute => {
  const { circular, axis, memorizeCurrent, tabbable, ignoreDefaultKeydown } = options;
  const tabster = useTabster();

  if (tabster) {
    getMover(tabster);
  }

  return useTabsterAttributes({
    mover: {
      cyclic: !!circular,
      direction: axisToMoverDirection(axis ?? 'vertical'),
      memorizeCurrent: memorizeCurrent,
      tabbable: tabbable,
    },
    ...(ignoreDefaultKeydown && {
      focusable: {
        ignoreKeydown: ignoreDefaultKeydown,
      },
    }),
  });
};

function axisToMoverDirection(axis: UseArrowNavigationGroupOptions['axis']): Types.MoverDirection {
  switch (axis) {
    case 'horizontal':
      return Types.MoverDirections.Horizontal;
    case 'grid':
      return Types.MoverDirections.Grid;

    case 'vertical':
    default:
      return Types.MoverDirections.Vertical;
  }
}

'use client';

import { MoverDirections } from 'tabster/lite/mover';
import type { TabsterDOMAttribute } from './useTabsterAttributes';
import { useTabsterAttributes } from './useTabsterAttributes';

export interface UseArrowNavigationGroupOptions {
  /**
   * Focus will navigate vertically, horizontally or in both directions (grid), defaults to horizontally
   * @defaultValue vertical
   */
  axis?: 'vertical' | 'horizontal' | 'grid' | 'grid-linear' | 'both';
  /**
   * Focus will cycle to the first/last elements of the group without stopping
   */
  circular?: boolean;
  /**
   * Last focused element in the group will be remembered and focused (if still
   * available) when tabbing from outside of the group
   * @default true
   */
  memorizeCurrent?: boolean;
  /**
   * Allow tabbing within the arrow navigation group items.
   */
  tabbable?: boolean;
  /**
   * Tabster should ignore default handling of keydown events.
   */
  ignoreDefaultKeydown?: Record<string, boolean>;
  /**
   * The default focusable item in the group will be an element with Focusable.isDefault property.
   * Note that there is no way in \@fluentui/react-tabster to set default focusable element,
   * and this option is currently for internal testing purposes only.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  unstable_hasDefault?: boolean;
}

/**
 * A hook that returns the necessary tabster attributes to support arrow key navigation
 * @param options - Options to configure keyboard navigation
 */
export const useArrowNavigationGroup = (options: UseArrowNavigationGroupOptions = {}): TabsterDOMAttribute => {
  const { circular, axis, memorizeCurrent = true, tabbable, ignoreDefaultKeydown, unstable_hasDefault } = options;

  return useTabsterAttributes({
    mover: {
      cyclic: !!circular,
      direction: axisToMoverDirection(axis ?? 'vertical'),
      memorizeCurrent,
      hasDefault: unstable_hasDefault,
      tabbable,
    },
    ...(ignoreDefaultKeydown ? { focusable: { ignoreKeydown: ignoreDefaultKeydown } } : {}),
  });
};

function axisToMoverDirection(axis: UseArrowNavigationGroupOptions['axis']): number {
  switch (axis) {
    case 'horizontal':
      return MoverDirections.Horizontal;
    case 'grid':
      return MoverDirections.Grid;
    case 'grid-linear':
      return MoverDirections.GridLinear;
    case 'both':
      return MoverDirections.Both;
    case 'vertical':
    default:
      return MoverDirections.Vertical;
  }
}

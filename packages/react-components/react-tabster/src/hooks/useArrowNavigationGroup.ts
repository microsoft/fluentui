'use client';

import { type TabsterDOMAttribute } from '../focus-navigation/types';
import { useTabsterAttributes } from './useTabsterAttributes';

export interface UseArrowNavigationGroupOptions {
  /**
   * Focus will navigate vertically, horizontally or in both directions (grid), defaults to vertical
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
   * Navigation manager should ignore default handling of keydown events
   */
  ignoreDefaultKeydown?: Record<string, boolean>;
  /**
   * The default focusable item in the group will be an element with the `data-fui-default` attribute.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  unstable_hasDefault?: boolean;
}

/**
 * A hook that returns the necessary attributes to support arrow key navigation
 * @param options - Options to configure keyboard navigation
 */
export const useArrowNavigationGroup = (options: UseArrowNavigationGroupOptions = {}): TabsterDOMAttribute => {
  const {
    circular,
    axis,
    memorizeCurrent = true,
    tabbable,
    ignoreDefaultKeydown,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault,
  } = options;

  return useTabsterAttributes({
    mover: {
      cyclic: !!circular,
      direction: axisToDirection(axis ?? 'vertical'),
      memorizeCurrent,
      tabbable,
      hasDefault: unstable_hasDefault,
    },
    ...(ignoreDefaultKeydown && {
      focusable: { ignoreKeydown: ignoreDefaultKeydown },
    }),
  });
};

function axisToDirection(
  axis: UseArrowNavigationGroupOptions['axis'],
): 'vertical' | 'horizontal' | 'grid' | 'gridLinear' | 'both' {
  switch (axis) {
    case 'horizontal':
      return 'horizontal';
    case 'grid':
      return 'grid';
    case 'grid-linear':
      return 'gridLinear';
    case 'both':
      return 'both';
    case 'vertical':
    default:
      return 'vertical';
  }
}

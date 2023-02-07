import { Types as TabsterTypes, getMover } from 'tabster';
import { useTabsterAttributes } from './useTabsterAttributes';
import { useTabster } from './useTabster';
import { axisToMoverDirection, UseArrowNavigationGroupOptions } from './useArrowNavigationGroup';

/**
 * A hook that returns the necessary tabster attributes to support arrow key navigation with default focusable item.
 * Default focusable element will be the first element to receive focus when user enters the arrow navigation group.
 *
 * @param options - Options to configure keyboard navigation
 */
export const useArrowNavigationGroupWithDefaultFocus_unstable = (
  options: UseArrowNavigationGroupOptions = {},
): {
  defaultFocusableAttributes: TabsterTypes.TabsterDOMAttribute;
  arrowNavigationGroupAttributes: TabsterTypes.TabsterDOMAttribute;
} => {
  const { circular, axis, memorizeCurrent, tabbable, ignoreDefaultKeydown } = options;
  const tabster = useTabster();

  if (tabster) {
    getMover(tabster);
  }

  const defaultFocusableAttributes = useTabsterAttributes({
    focusable: { isDefault: true },
  });

  const arrowNavigationGroupAttributes = useTabsterAttributes({
    mover: {
      cyclic: !!circular,
      direction: axisToMoverDirection(axis ?? 'vertical'),
      memorizeCurrent,
      tabbable,
      hasDefault: true,
    },
    ...(ignoreDefaultKeydown && {
      focusable: {
        ignoreKeydown: ignoreDefaultKeydown,
      },
    }),
  });

  return { defaultFocusableAttributes, arrowNavigationGroupAttributes };
};

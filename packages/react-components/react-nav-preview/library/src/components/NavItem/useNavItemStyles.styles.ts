import { mergeClasses } from '@griffel/react';
import {
  useContentStyles,
  useIconStyles,
  useIndicatorStyles,
  useRootDefaultClassName,
  useSmallStyles,
} from '../sharedNavStyles.styles';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavItemSlots, NavItemState } from './NavItem.types';
export const navItemClassNames: SlotClassNames<NavItemSlots> = {
  root: 'fui-NavItem',
  icon: 'fui-NavItem__icon',
};

/**
 * Apply styling to the NavItem slots based on the state
 */
export const useNavItemStyles_unstable = (state: NavItemState): NavItemState => {
  'use no memo';

  const rootDefaultClassName = useRootDefaultClassName();
  const smallStyles = useSmallStyles();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const iconStyles = useIconStyles();

  const { selected, size } = state;

  state.root.className = mergeClasses(
    navItemClassNames.root,
    rootDefaultClassName,
    size === 'small' && smallStyles.root,
    selected && indicatorStyles.base,
    selected && contentStyles.selected,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      navItemClassNames.icon,
      iconStyles.base,
      selected && iconStyles.selected,
      state.icon.className,
    );
  }

  return state;
};

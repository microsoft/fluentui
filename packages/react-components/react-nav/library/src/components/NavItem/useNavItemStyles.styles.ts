'use client';

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
  const rootDefaultClassName = useRootDefaultClassName();
  const smallStyles = useSmallStyles();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const iconStyles = useIconStyles();

  const { selected, density } = state;

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    navItemClassNames.root,
    rootDefaultClassName,
    density === 'small' && smallStyles.root,
    selected && indicatorStyles.base,
    selected && contentStyles.selected,
    state.root.className,
  );

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = mergeClasses(
      navItemClassNames.icon,
      iconStyles.base,
      selected && iconStyles.selected,
      state.icon.className,
    );
  }

  return state;
};

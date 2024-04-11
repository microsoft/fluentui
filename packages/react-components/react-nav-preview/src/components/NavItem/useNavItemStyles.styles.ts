import { mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavItemSlots, NavItemState } from './NavItem.types';
import {
  useContentStyles,
  useIconStyles,
  useIndicatorStyles,
  useRootDefaultClassName,
} from '../sharedNavStyles.styles';

export const navItemClassNames: SlotClassNames<NavItemSlots> = {
  root: 'fui-NavItem',
  content: 'fui-NavItem__content',
  icon: 'fui-NavItem__icon',
};

/**
 * Apply styling to the NavItem slots based on the state
 */
export const useNavItemStyles_unstable = (state: NavItemState): NavItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const iconStyles = useIconStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navItemClassNames.root,
    rootDefaultClassName,
    selected && indicatorStyles.base,
    state.root.className,
  );

  state.content.className = mergeClasses(
    navItemClassNames.content,
    selected && contentStyles.selected,
    state.content.className,
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

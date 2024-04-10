import { makeResetStyles, mergeClasses } from '@griffel/react';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemSlots, NavSubItemState } from './NavSubItem.types';
import { useContentStyles, useIndicatorStyles, useRootDefaultClassName } from '../NavItem/useNavItemStyles.styles';

export const navSubItemClassNames: SlotClassNames<NavSubItemSlots> = {
  root: 'fui-NavSubItem',
  content: 'fui-NavSubItem__content',
};
/**
 * Styles for the content slot (children)
 */
const useNavSubItemSpecificClassNames = makeResetStyles({
  paddingInlineStart: '36px',
});

/**
 * Apply styling to the NavSubItem slots based on the state
 */
export const useNavSubItemStyles_unstable = (state: NavSubItemState): NavSubItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const navSubItemSpecificClassNames = useNavSubItemSpecificClassNames();

  const { selected } = state;

  state.root.className = mergeClasses(
    navSubItemClassNames.root,
    rootDefaultClassName,
    selected && indicatorStyles.base,
    state.root.className,
  );

  state.content.className = mergeClasses(
    navSubItemClassNames.content,
    navSubItemSpecificClassNames,
    selected && contentStyles.selected,
    state.content.className,
  );

  return state;
};

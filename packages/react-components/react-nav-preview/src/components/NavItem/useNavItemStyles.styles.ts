import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavItemSlots, NavItemState } from './NavItem.types';
import { typographyStyles } from '@fluentui/react-theme';

export const navItemClassNames: SlotClassNames<NavItemSlots> = {
  root: 'fui-NavItem',
  content: 'fui-NavItem__content',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'flex',
  ...typographyStyles.body1,
});

/**
 * Styles for the content slot (children)
 */
const useContentStyles = makeStyles({
  selected: {
    ...typographyStyles.body1Strong,
  },
});

/**
 * Apply styling to the NavItem slots based on the state
 */
export const useNavItemStyles_unstable = (state: NavItemState): NavItemState => {
  const rootStyles = useStyles();
  const contentStyles = useContentStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navItemClassNames.root,
    rootStyles,

    state.root.className,
  );

  state.content.className = mergeClasses(
    navItemClassNames.content,
    selected && contentStyles.selected,
    state.content.className,
  );

  return state;
};

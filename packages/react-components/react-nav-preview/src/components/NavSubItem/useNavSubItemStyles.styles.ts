import { makeStyles, mergeClasses } from '@griffel/react';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemSlots, NavSubItemState } from './NavSubItem.types';
import {
  navItemTokens,
  useContentStyles,
  useIndicatorStyles,
  useRootDefaultClassName,
} from '../sharedNavStyles.styles';

export const navSubItemClassNames: SlotClassNames<NavSubItemSlots> = {
  root: 'fui-NavSubItem',
};
/**
 * Styles for the content slot (children)
 */
const useNavSubItemSpecificStyles = makeStyles({
  base: {
    paddingInlineStart: '36px',
  },
  selectedIndicator: {
    '::after': {
      marginInlineStart: `-${navItemTokens.indicatorOffset + 24}px`,
    },
  },
});

/**
 * Apply styling to the NavSubItem slots based on the state
 */
export const useNavSubItemStyles_unstable = (state: NavSubItemState): NavSubItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const navSubItemSpecificStyles = useNavSubItemSpecificStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navSubItemClassNames.root,
    rootDefaultClassName,
    navSubItemSpecificStyles.base,
    selected && indicatorStyles.base,
    selected && contentStyles.selected,
    selected && navSubItemSpecificStyles.selectedIndicator,
    state.root.className,
  );

  return state;
};

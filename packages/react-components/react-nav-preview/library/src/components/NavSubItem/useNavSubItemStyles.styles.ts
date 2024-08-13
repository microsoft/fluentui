import { makeStyles, mergeClasses } from '@griffel/react';
import {
  navItemTokens,
  useContentStyles,
  useIndicatorStyles,
  useRootDefaultClassName,
  useSmallStyles,
} from '../sharedNavStyles.styles';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemSlots, NavSubItemState } from './NavSubItem.types';

export const navSubItemClassNames: SlotClassNames<NavSubItemSlots> = {
  root: 'fui-NavSubItem',
};
/**
 * Styles for the content slot (children)
 */
const useNavSubItemSpecificStyles = makeStyles({
  base: {
    paddingInlineStart: '46px',
  },
  smallBase: {
    paddingInlineStart: '40px',
  },
  selectedIndicator: {
    '::after': {
      marginInlineStart: `-${navItemTokens.indicatorOffset + 36}px`,
    },
  },
});

/**
 * Apply styling to the NavSubItem slots based on the state
 */
export const useNavSubItemStyles_unstable = (state: NavSubItemState): NavSubItemState => {
  'use no memo';

  const rootDefaultClassName = useRootDefaultClassName();
  const smallStyles = useSmallStyles();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const navSubItemSpecificStyles = useNavSubItemSpecificStyles();

  const { selected, size } = state;

  state.root.className = mergeClasses(
    navSubItemClassNames.root,
    rootDefaultClassName,
    size === 'small' && smallStyles.root,
    size === 'small' && navSubItemSpecificStyles.smallBase,
    navSubItemSpecificStyles.base,
    selected && indicatorStyles.base,
    selected && contentStyles.selected,
    selected && navSubItemSpecificStyles.selectedIndicator,
    state.root.className,
  );

  return state;
};

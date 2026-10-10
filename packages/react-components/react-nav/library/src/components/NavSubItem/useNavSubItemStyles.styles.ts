'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import {
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

const subItemMediumIndent = `calc(${tokens.spacingHorizontalXXXL} + ${tokens.spacingHorizontalXS})`;
const subItemSmallIndent = `calc(${tokens.spacingHorizontalXXL} + ${tokens.spacingHorizontalSNudge})`;

/**
 * Styles for the content slot (children)
 */
const useNavSubItemSpecificStyles = makeStyles({
  base: {
    paddingInlineStart: `calc(${tokens.spacingHorizontalMNudge} + ${subItemMediumIndent})`,
  },
  smallBase: {
    paddingInlineStart: `calc(${tokens.spacingHorizontalMNudge} + ${subItemSmallIndent})`,
  },
  selectedIndicator: {
    '::after': {
      marginInlineStart: `calc(-1 * (${tokens.spacingHorizontalMNudge} + ${subItemMediumIndent} + ${tokens.spacingHorizontalSNudge}))`,
    },
  },
  smallSelectedIndicator: {
    '::after': {
      marginInlineStart: `calc(-1 * (${tokens.spacingHorizontalMNudge} + ${subItemSmallIndent} + ${tokens.spacingHorizontalSNudge}))`,
    },
  },
});

/**
 * Apply styling to the NavSubItem slots based on the state
 */
export const useNavSubItemStyles_unstable = (state: NavSubItemState): NavSubItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  const smallStyles = useSmallStyles();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const navSubItemSpecificStyles = useNavSubItemSpecificStyles();

  const { selected, density } = state;
  const isSmallDensity = density === 'small';

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    navSubItemClassNames.root,
    rootDefaultClassName,
    isSmallDensity && smallStyles.root,
    navSubItemSpecificStyles.base,
    isSmallDensity && navSubItemSpecificStyles.smallBase,
    selected && indicatorStyles.base,
    selected && contentStyles.selected,
    selected &&
      (isSmallDensity ? navSubItemSpecificStyles.smallSelectedIndicator : navSubItemSpecificStyles.selectedIndicator),
    state.root.className,
  );

  return state;
};

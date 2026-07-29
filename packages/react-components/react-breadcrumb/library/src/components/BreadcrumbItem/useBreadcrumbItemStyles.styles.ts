'use client';

import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbItemSlots, BreadcrumbItemState } from './BreadcrumbItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const breadcrumbItemClassNames: SlotClassNames<BreadcrumbItemSlots> = {
  root: 'fui-BreadcrumbItem',
};

const useBreadcrumbItemResetStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  color: tokens.colorNeutralForeground2,
  boxSizing: 'border-box',
  textWrap: 'nowrap',
});

/**
 * Apply styling to the BreadcrumbItem slots based on the state
 */
export const useBreadcrumbItemStyles_unstable = (state: BreadcrumbItemState): BreadcrumbItemState => {
  const resetStyles = useBreadcrumbItemResetStyles();

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(breadcrumbItemClassNames.root, resetStyles, state.root.className);

  return state;
};

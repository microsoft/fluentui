'use client';

import * as React from 'react';
import { useNavContext_unstable } from '../NavContext';

import type { NavCategoryBaseProps, NavCategoryBaseState, NavCategoryProps, NavCategoryState } from './NavCategory.types';

/**
 * Create the state required to render NavCategory.
 *
 * The returned state can be modified with hooks such as useNavCategoryStyles_unstable,
 * before being passed to renderNavCategory_unstable.
 *
 * @param props - props from this instance of NavCategory
 * @param ref - reference to root HTMLDivElement of NavCategory
 */
export const useNavCategory_unstable = (props: NavCategoryProps, ref: React.Ref<HTMLDivElement>): NavCategoryState => {
  return useNavCategoryBase_unstable(props, ref);
};

/**
 * Base hook for NavCategory component. Manages the open/closed state of a category
 * by reading from the Nav context.
 *
 * @param props - props from this instance of NavCategory
 * @param ref - reference to root HTMLDivElement of NavCategory
 */
export const useNavCategoryBase_unstable = (
  props: NavCategoryBaseProps,
  ref: React.Ref<HTMLDivElement>,
): NavCategoryBaseState => {
  const { value, children } = props;

  const { openCategories } = useNavContext_unstable();

  const open: boolean = openCategories?.includes(value);

  return {
    open,
    value,
    children: children ?? null,
  };
};

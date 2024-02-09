import * as React from 'react';
import type { NavCategoryProps, NavCategoryState } from './NavCategory.types';
import { useNavContext_unstable } from '../NavContext';

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
  const { value, children } = props;

  const { openItems } = useNavContext_unstable();

  const open: boolean = openItems?.includes(value);

  return {
    open,
    value,
    children,
  };
};

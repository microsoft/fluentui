import type * as React from 'react';
import type { NavItemValue } from '../NavContext.types';
import type { NavCategoryContextValue } from '../NavCategoryContext';

/**
 * NavCategory Props
 */
export type NavCategoryProps = {
  /**
   * Required value that identifies this item inside an Nav component.
   */
  value: NavItemValue;

  /**
   * Children of the NavCategory
   */
  children?: React.ReactNode | null;
};

/**
 * State used in rendering NavCategory
 */
export type NavCategoryState = NavCategoryContextValue & Required<NavCategoryProps>;

import * as React from 'react';
import { NavItemValue } from '../NavContext.types';
import { NavCategoryContextValue } from '../NavCategoryContext';

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
 * NavCategory base props — same as NavCategoryProps (no design-only props).
 */
export type NavCategoryBaseProps = NavCategoryProps;

/**
 * State used in rendering NavCategory
 */
export type NavCategoryState = NavCategoryContextValue & Required<NavCategoryProps>;

/**
 * NavCategory base state — same as NavCategoryState (no design-only state).
 */
export type NavCategoryBaseState = NavCategoryState;

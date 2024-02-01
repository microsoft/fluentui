import * as React from 'react';
import { NavItemValue } from '../NavContext.types';
import { NavCategoryContextValue } from '../NavCategoryContext';
import { ComponentProps } from '@fluentui/react-utilities';

export type NavCategorySlots = {};

/**
 * NavCategory Props
 */
export type NavCategoryProps = ComponentProps<NavCategorySlots> & {
  /**
   * Required value that identifies this item inside an Nav component.
   */
  value: NavItemValue;

  /**
   * Children of the NavCategory
   */
  children?: React.ReactNode;
};

/**
 * State used in rendering NavCategory
 */
export type NavCategoryState = NavCategoryContextValue & NavCategoryProps;

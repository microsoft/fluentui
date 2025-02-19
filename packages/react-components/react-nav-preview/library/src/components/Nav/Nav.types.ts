import * as React from 'react';

import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { NavContextValue, NavItemValue } from '../NavContext.types';

export type NavSlots = {
  root: NonNullable<Slot<'div'>>;
};

/***
 * Indicates the vertical density of the Nav content.
 * This does not affect horizontal spacing.
 */
export type NavDensity = 'small' | 'medium';

/**
 * Nav Props
 */
export type NavProps = ComponentProps<NavSlots> & {
  /**
   * The value of the navItem to be selected by default.
   * Typically useful when the selectedValue is uncontrolled.
   * Mutually exclusive with selectedValue.
   * Empty string indicates no selection.
   */
  defaultSelectedValue?: NavItemValue;

  /**
   * The value of the navCategory to be selected by default.
   * Typically useful when the selectedValue is uncontrolled.
   * Mutually exclusive with selectedValue.
   * Empty string indicates no selection.
   */
  defaultSelectedCategoryValue?: NavItemValue;

  /**
   * Set of categories that are opened by default.
   * Typically useful when the openCategories is uncontrolled.
   */
  defaultOpenCategories?: NavItemValue[];

  /**
   * Controls the open categories.
   * For use in controlled scenarios.
   */
  openCategories?: NavItemValue[];

  /**
   * Raised when a navItem is selected.
   * If the navItem is child of a category, the categoryValue will be provided
   */
  onNavItemSelect?: EventHandler<OnNavItemSelectData>;

  /**
   * The value of the currently selected navItem.
   * Mutually exclusive with defaultSelectedValue.
   * @default undefined
   */
  selectedValue?: NavItemValue;

  /**
   * Indicates a category that has a selected child
   * Will show the category as selected if it is closed.
   * @default undefined
   */
  selectedCategoryValue?: NavItemValue;

  /**
   * Indicates if Nav supports multiple open Categories at the same time.
   * @default true, indicating that multiple categories can be open at the same time.
   */
  multiple?: boolean;

  /**
   * Callback raised when a NavCategoryItem is toggled.
   */
  onNavCategoryItemToggle?: EventHandler<OnNavItemSelectData>;

  /**
   * The vertical density of the Nav and it's children
   * @default 'medium'
   */
  density?: NavDensity;
};

export type OnNavItemSelectData = EventData<'click', React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>> & {
  /**
   * The value of the selected navItem.
   * In the case of a category selection, this will be the value of the selected category.
   */
  value: NavItemValue;

  /**
   * The parent value of the selected navSubItem
   * Null if not a child of a category
   */
  categoryValue?: NavItemValue;
};

/**
 * State used in rendering Nav
 */
export type NavState = ComponentState<NavSlots> & NavContextValue;
